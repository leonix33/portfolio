// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .expertise-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Small delay before starting animation
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Skill tag hover effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Project card tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animations when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat h3');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', ''));
                const suffix = counter.textContent.includes('+') ? '+' : '';
                animateCounter(counter, target);
                // Add suffix back after animation
                setTimeout(() => {
                    counter.textContent = target + suffix;
                }, 2100);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading class to elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToLoad = document.querySelectorAll('.skill-category, .project-card, .expertise-item, .contact-method');
    
    elementsToLoad.forEach((el, index) => {
        el.classList.add('loading');
        // Stagger the animations
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
});

// Copy email to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show a temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Email copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #22c55e;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    });
}

// Add click handler for email
document.addEventListener('DOMContentLoaded', () => {
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(el.dataset.email || el.textContent);
        });
        el.style.cursor = 'pointer';
        el.title = 'Click to copy email';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Print styles optimization
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// GitHub Projects Fetching and Display
const GITHUB_USERNAME = 'leonix33';
const PROJECT_CATEGORIES = {
    'infrastructure': ['terraform', 'gcp', 'aws', 'infrastructure', 'cloud', 'azure', 'etl'],
    'devops': ['devops', 'jenkins', 'k8s', 'kubernetes', 'deployment', 'docker', 'ci/cd'],
    'data': ['databricks', 'kafka', 'spark', 'analytics', 'pipeline', 'data-factory', 'fabric'],
    'security': ['security', 'vault', 'zero-trust', 'threat', 'detection'],
    'web': ['portfolio', 'html', 'website']
};

async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        const projects = await response.json();
        
        // Featured projects that should appear first
        const featuredRepos = [
            'zero-trust-k8s-idp',
            'databricks-gcp',
            'azure-etl-onprem-to-cloud',
            'aws-devops-agent',
            'platformtoolkit-records'
        ];
        
        // Filter and categorize projects
        const categorizedProjects = projects.map(project => {
            let category = 'other';
            const nameAndDesc = `${project.name} ${project.description || ''}`.toLowerCase();
            
            // Special handling for Azure ETL project
            if (project.name === 'azure-etl-onprem-to-cloud') {
                category = 'infrastructure';
            } else {
                for (const [cat, keywords] of Object.entries(PROJECT_CATEGORIES)) {
                    if (keywords.some(keyword => nameAndDesc.includes(keyword))) {
                        category = cat;
                        break;
                    }
                }
            }
            
            return {
                ...project,
                category,
                isFeatured: featuredRepos.includes(project.name)
            };
        }).filter(p => !p.fork || p.stargazers_count > 0); // Show original repos + starred forks
        
        // Sort: featured projects first, then by update date
        categorizedProjects.sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        displayProjects(categorizedProjects);
        setupFilterButtons(categorizedProjects);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

function displayProjects(projects, filter = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);
    
    filteredProjects.forEach(project => {
        const languages = project.language ? [project.language] : [];
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        
        // Add featured badge
        const featuredBadge = project.isFeatured 
            ? '<span class="featured-badge">Featured</span>' 
            : '';
        
        const description = project.description || 'A GitHub project by leonix33';
        
        card.innerHTML = `
            <div class="project-header">
                ${featuredBadge}
                <div class="project-icon">
                    ${getCategoryIcon(project.category)}
                </div>
                <div class="project-meta">
                    <h3>${project.name}</h3>
                    <p class="project-type">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                </div>
            </div>
            <div class="project-description">
                <p>${description.substring(0, 150)}${description.length > 150 ? '...' : ''}</p>
            </div>
            <div class="tech-stack">
                ${languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                ${project.topics?.slice(0, 3).map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
            </div>
            <div class="project-stats">
                <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                <span><i class="fas fa-eye"></i> ${project.watchers_count}</span>
            </div>
            <div class="project-links">
                <a href="${project.html_url}" target="_blank" class="btn btn-outline">
                    <i class="fab fa-github"></i> View Code
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function getCategoryIcon(category) {
    const icons = {
        'infrastructure': '<i class="fas fa-cloud"></i>',
        'devops': '<i class="fas fa-cogs"></i>',
        'data': '<i class="fas fa-database"></i>',
        'security': '<i class="fas fa-shield-alt"></i>',
        'web': '<i class="fas fa-globe"></i>',
        'other': '<i class="fas fa-folder"></i>'
    };
    return icons[category] || icons.other;
}

function setupFilterButtons(projects) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            displayProjects(projects, filter);
        });
    });
}

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
