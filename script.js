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

const prefersReducedMotion = true;

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

// Navbar scroll effect (throttled)
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }

        if (!prefersReducedMotion) {
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = window.pageYOffset * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        }

        scrollTicking = false;
    });
});

// Intersection Observer for animations
if (!prefersReducedMotion) {
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
}

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
            reset();
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

// Typing animation disabled for stability

// Skill tag hover effects disabled for stability

// Project card tilt effect (disabled for stability)

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

// Counter animations disabled for stability

// Loading animations disabled for stability

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

const PROJECT_DETAILS = {
    'databricks-lakehouse-platform': {
        overview: 'CloudFormation-first, multi-account AWS lakehouse with Unity Catalog governance, medallion architecture, and workflow-based extraction for scale.',
        highlights: [
            'Nested CloudFormation stacks for VPC, IAM, and data lake provisioning',
            'Unity Catalog setup with external locations and RBAC automation',
            'Workflows to replace Lambda timeouts on large extractions',
            'CloudWatch dashboards, alarms, and SNS alerting'
        ],
        stack: ['AWS', 'CloudFormation', 'Databricks', 'Unity Catalog', 'Delta Lake', 'Iceberg'],
        useCases: ['Multi-account data platform', 'Governed analytics', 'Cross-account data access'],
        architecture: 'Gov and Commercial AWS accounts with cross-account IAM, S3 bronze/silver/gold layers, Databricks workflows, and Unity Catalog control plane.',
        impact: 'Eliminated pipeline timeouts, unified governance, and enabled scalable analytics and AI workloads.'
    },
    'azure-etl-onprem-to-cloud': {
        overview: 'Enterprise Azure ETL program migrating on‑prem data to cloud with ADF + SHIR ingestion, ADLS Gen2 medallion storage, Databricks/Spark processing, and AI Search + OpenAI RAG for retrieval‑augmented analytics.',
        highlights: [
            'Self‑Hosted Integration Runtime for secure on‑prem connectivity and controlled egress',
            'Medallion architecture (Bronze/Silver/Gold) in ADLS Gen2 with Delta Lake',
            'Terraform modules covering ADF, Key Vault, AI Search, OpenAI, and monitoring',
            'RAG UI + API with vector search, citations, and filters for governance',
            'OpenAI embeddings for semantic retrieval and summarization',
            'RAG pipelines delivering grounded answers with citations',
            'Operational monitoring via Log Analytics + Azure Monitor alerts'
        ],
        stack: ['Azure Data Factory', 'SHIR', 'ADLS Gen2', 'Databricks', 'Terraform', 'Key Vault', 'Azure AI Search', 'OpenAI'],
        useCases: ['On‑prem to cloud migration', 'Enterprise ETL governance', 'RAG‑powered analytics'],
        architecture: 'ADF orchestrates ingestion through SHIR into ADLS Gen2 (Bronze/Silver/Gold). Databricks cleans and curates Delta tables. Key Vault secures secrets. Azure AI Search indexes curated data and OpenAI generates grounded responses with citations.',
        impact: 'Accelerated migration timelines, improved data reliability, and enabled AI‑assisted discovery for business stakeholders.'
    },
    'zero-trust-k8s-idp': {
        overview: 'Enterprise-grade internal developer platform on GKE using GitOps, policy-as-code, and zero-trust security controls.',
        highlights: [
            'App-of-Apps GitOps with ArgoCD',
            'Workload Identity, Binary Authorization, and Kyverno policies',
            'Full observability stack (LGTM)',
            'TLS automation with cert-manager'
        ],
        stack: ['GKE', 'ArgoCD', 'Kyverno', 'Prometheus', 'Grafana', 'Vault'],
        useCases: ['Internal developer platform', 'Secure Kubernetes governance', 'GitOps automation'],
        architecture: 'GKE clusters with GitOps orchestration, security guardrails, and centralized observability for platform teams.',
        impact: 'Reduced deployment time from hours to minutes while improving security posture.'
    },
    'databricks-gcp': {
        overview: 'Databricks-based analytics platform on GCP with streaming ingestion, ML orchestration, and cost-optimized clusters.',
        highlights: [
            'Kafka streaming ingestion and real-time processing',
            'MLflow pipelines with reproducible experiments',
            'Delta Lake ACID tables and time travel',
            'Terraform-based infrastructure automation'
        ],
        stack: ['GCP', 'Databricks', 'Kafka', 'MLflow', 'Delta Lake', 'Terraform'],
        useCases: ['Real-time analytics', 'MLOps pipelines', 'Cost-optimized compute'],
        architecture: 'GCP services for networking and storage, Databricks for compute, Kafka for streaming, and MLflow for MLOps.',
        impact: 'Enabled real-time analytics and improved data quality with standardized pipelines.'
    },
    'aws-devops-agent': {
        overview: 'Autonomous incident investigation platform for detecting issues, correlating signals, and accelerating root-cause analysis.',
        highlights: [
            'Automated incident detection and correlation workflows',
            'Kubernetes and CloudWatch integration',
            'Security-compliant IAM role architecture',
            'Runbook-driven remediation guidance'
        ],
        stack: ['AWS', 'CloudWatch', 'Lambda', 'Kubernetes', 'IAM'],
        useCases: ['Incident response automation', 'Operational visibility', 'Root-cause analysis'],
        architecture: 'Event-driven workflows across AWS services with automation hooks for investigation and reporting.',
        impact: 'Reduced MTTR and improved operational visibility across services.'
    },
    'platformtoolkit-records': {
        overview: 'Cross-platform toolkit for automating developer tool installation, updates, and environment configuration.',
        highlights: [
            'Windows MSI installer with WiX Toolset',
            'macOS automation via Homebrew',
            'User-level installs with rollback support',
            'Version tracking and update orchestration'
        ],
        stack: ['PowerShell', 'Bash', 'WiX Toolset', 'Homebrew'],
        useCases: ['Developer onboarding', 'Toolchain standardization', 'Automated updates'],
        architecture: 'Installer pipelines with platform-specific runtimes and shared configuration data.',
        impact: 'Cut onboarding time from days to minutes with consistent toolchains.'
    }
};

async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        const projects = await response.json();
        
        // Featured projects that should appear first
        const featuredRepos = [
            'zero-trust-k8s-idp',
            'databricks-gcp',
            'databricks-lakehouse-platform',
            'azure-etl-onprem-to-cloud',
            'aws-devops-agent',
            'platformtoolkit-records'
        ];

        const manualFeaturedProjects = [
            {
                name: 'azure-etl-onprem-to-cloud',
                html_url: 'https://github.com/leonix33/azure-etl-onprem-to-cloud',
                description: 'End-to-end Azure ETL platform with ADF, SHIR, Key Vault, and monitoring. Includes AI Search + OpenAI RAG.',
                language: 'Terraform',
                topics: ['azure', 'data-factory', 'etl', 'databricks', 'rag'],
                stargazers_count: 0,
                forks_count: 0,
                watchers_count: 0,
                updated_at: new Date().toISOString(),
                license: { spdx_id: 'MIT' },
                size: 0,
                open_issues_count: 0,
                private: false,
                homepage: ''
            }
        ];
        
        // Filter and categorize projects
        const repoMap = new Map();
        projects.forEach(project => repoMap.set(project.name, project));
        manualFeaturedProjects.forEach(project => {
            if (!repoMap.has(project.name)) {
                repoMap.set(project.name, project);
            }
        });

        const categorizedProjects = Array.from(repoMap.values()).map(project => {
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

    const limitedProjects = filteredProjects.slice(0, 24);
    
    limitedProjects.forEach(project => {
        const languages = project.language ? [project.language] : [];
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        
        // Add featured badge
        const featuredBadge = project.isFeatured 
            ? '<span class="featured-badge">Featured</span>' 
            : '';
        
        const description = project.description || 'A GitHub project by leonix33';
        const details = getProjectDetails(project);
        const updatedLabel = formatDate(project.updated_at);
        const licenseLabel = project.license?.spdx_id && project.license.spdx_id !== 'NOASSERTION'
            ? project.license.spdx_id
            : 'No license';
        const sizeLabel = project.size ? formatSize(project.size) : 'n/a';
        const issuesLabel = project.open_issues_count ?? 0;
        const hasHomepage = project.homepage && project.homepage.trim().length > 0;
        
        card.innerHTML = `
            <div class="project-header">
                ${featuredBadge}
                <div class="project-icon">
                    ${getCategoryIcon(project.category)}
                </div>
                <div class="project-meta">
                    <h3>${project.name}</h3>
                    <p class="project-type">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                    <div class="project-badges">
                        <span class="badge">Updated ${updatedLabel}</span>
                        <span class="badge">${licenseLabel}</span>
                    </div>
                </div>
            </div>
            <div class="project-description">
                <p>${description.substring(0, 150)}${description.length > 150 ? '...' : ''}</p>
            </div>
            <div class="project-details" aria-hidden="true">
                <div class="details-section">
                    <h4 class="details-title">Overview</h4>
                    <p>${details.overview}</p>
                </div>
                <div class="details-section">
                    <h4 class="details-title">Key Highlights</h4>
                    <ul class="details-list">
                        ${details.highlights.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="details-section">
                    <h4 class="details-title">Stack</h4>
                    <div class="details-tags">
                        ${details.stack.map(item => `<span>${item}</span>`).join('')}
                    </div>
                </div>
                <div class="details-section">
                    <h4 class="details-title">Use Cases</h4>
                    <ul class="details-list">
                        ${details.useCases.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="details-section">
                    <h4 class="details-title">Architecture</h4>
                    <p>${details.architecture}</p>
                </div>
                <div class="details-section">
                    <h4 class="details-title">Impact</h4>
                    <p>${details.impact}</p>
                </div>
            </div>
            <div class="tech-stack">
                ${languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                ${project.topics?.slice(0, 3).map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
            </div>
            <div class="project-kpis">
                <div class="kpi">
                    <span class="kpi-label">Size</span>
                    <span class="kpi-value">${sizeLabel}</span>
                </div>
                <div class="kpi">
                    <span class="kpi-label">Issues</span>
                    <span class="kpi-value">${issuesLabel}</span>
                </div>
                <div class="kpi">
                    <span class="kpi-label">Visibility</span>
                    <span class="kpi-value">${project.private ? 'Private' : 'Public'}</span>
                </div>
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
                ${hasHomepage ? `<a href="${project.homepage}" target="_blank" class="btn btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>` : ''}
                <button class="btn btn-secondary details-toggle" type="button" aria-expanded="false">Read more</button>
            </div>
        `;
        
        grid.appendChild(card);
    });

    setupDetailsToggle();
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

function formatDate(isoDate) {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatSize(sizeInKb) {
    if (!sizeInKb && sizeInKb !== 0) return 'n/a';
    if (sizeInKb < 1024) return `${sizeInKb} KB`;
    const mb = (sizeInKb / 1024).toFixed(1);
    return `${mb} MB`;
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

function getProjectDetails(project) {
    const baseDetails = PROJECT_DETAILS[project.name];
    if (baseDetails) return baseDetails;

    const topics = project.topics?.slice(0, 6) || [];
    const topicHighlights = topics.length
        ? topics.slice(0, 4).map(topic => `Focus area: ${topic}`)
        : ['Infrastructure automation and platform enablement', 'Security and governance guardrails', 'Operational monitoring and reliability', 'Scalable, reusable delivery patterns'];

    const stack = [];
    if (project.language) stack.push(project.language);
    topics.slice(0, 5).forEach(topic => stack.push(topic));
    const uniqueStack = [...new Set(stack)].slice(0, 6);
    const fallbackStack = uniqueStack.length ? uniqueStack : ['Terraform', 'Cloud', 'Automation', 'Observability'];

    const useCasesByCategory = {
        infrastructure: ['Infrastructure automation', 'Environment provisioning', 'Cost optimization'],
        devops: ['CI/CD enablement', 'Release automation', 'Operational reliability'],
        data: ['Data pipelines', 'Analytics enablement', 'AI/ML workflows'],
        security: ['Security posture improvement', 'Policy enforcement', 'Access governance'],
        web: ['Personal branding', 'UI/UX delivery', 'Content publishing'],
        other: ['Automation acceleration', 'Reusable tooling', 'Platform enablement']
    };

    const fallbackUseCases = useCasesByCategory[project.category] || useCasesByCategory.other;

    return {
        overview: project.description || 'Project focused on infrastructure, automation, and platform enablement.',
        highlights: topicHighlights,
        stack: fallbackStack,
        useCases: fallbackUseCases,
        architecture: 'Designed with modular components, infrastructure as code, and reusable workflows for consistent delivery.',
        impact: 'Improves delivery speed, reduces operational toil, and strengthens governance across environments.'
    };
}

function setupDetailsToggle() {
    const grid = document.getElementById('projects-grid');
    if (!grid || grid.dataset.detailsBound === 'true') return;

    grid.addEventListener('click', (event) => {
        const button = event.target.closest('.details-toggle');
        if (!button) return;

        const card = button.closest('.project-card');
        if (!card) return;

        const details = card.querySelector('.project-details');
        if (!details) return;

        const isOpen = details.classList.toggle('is-open');
        details.setAttribute('aria-hidden', String(!isOpen));
        button.setAttribute('aria-expanded', String(isOpen));
        button.textContent = isOpen ? 'Hide details' : 'Read more';
    });

    grid.dataset.detailsBound = 'true';
}

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
