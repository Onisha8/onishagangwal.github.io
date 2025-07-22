// Data Portfolio Website JavaScript

// Initialize data structures
let projects = [
    {
        id: 1,
        title: "Customer Segmentation Analysis",
        description: "Advanced customer segmentation using machine learning algorithms to identify distinct customer groups and optimize marketing strategies.",
        tags: ["ML", "Python", "Clustering"],
        tools: "Python, scikit-learn, Pandas",
        githubUrl: "https://github.com/example/customer-segmentation",
        liveUrl: "https://tableau-dashboard.example.com",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    },
    {
        id: 2,
        title: "Sales Forecasting Dashboard",
        description: "Interactive dashboard providing real-time sales forecasts using time series analysis and predictive modeling.",
        tags: ["Forecasting", "Dashboard", "Time Series"],
        tools: "Power BI, R, SQL Server",
        githubUrl: "https://github.com/example/sales-forecasting",
        liveUrl: "https://powerbi.example.com/dashboard",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    },
    {
        id: 3,
        title: "A/B Testing Framework",
        description: "Statistical framework for designing and analyzing A/B tests with proper power analysis and significance testing.",
        tags: ["Statistics", "A/B Testing", "Framework"],
        tools: "Python, scipy, matplotlib",
        githubUrl: "https://github.com/example/ab-testing",
        liveUrl: "",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    }
];

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Load projects
    loadProjects();
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Load and display projects
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    if (projects.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="lead text-muted">No projects available yet.</p>
                <button class="btn btn-primary mt-3" onclick="openProjectModal()">
                    <i class="fas fa-plus me-2"></i>Add Your First Project
                </button>
            </div>
        `;
        return;
    }
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.setAttribute('data-aos', 'fade-up');
    
    const tagsHtml = project.tags.slice(0, 3).map(tag => 
        `<span class="badge bg-light text-dark me-2 mb-2">${tag}</span>`
    ).join('');
    
    const githubLink = project.githubUrl ? 
        `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github fa-lg"></i>
        </a>` : '';
    
    const liveLink = project.liveUrl ? 
        `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt fa-lg"></i>
        </a>` : '';
    
    const imageUrl = project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
    
    col.innerHTML = `
        <div class="project-card position-relative">
            <div class="project-actions">
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <img src="${imageUrl}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <div class="mb-3">
                    ${tagsHtml}
                </div>
                <h5 class="mb-3">${project.title}</h5>
                <p class="text-muted mb-3">${project.description}</p>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="project-links">
                        ${githubLink}
                        ${liveLink}
                    </div>
                    <small class="text-muted">${project.tools}</small>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Project Modal Functions
function openProjectModal(project = null) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const form = document.getElementById('projectForm');
    
    if (project) {
        modalTitle.textContent = 'Edit Project';
        populateProjectForm(project);
    } else {
        modalTitle.textContent = 'Add New Project';
        form.reset();
        document.getElementById('projectId').value = '';
    }
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

function populateProjectForm(project) {
    document.getElementById('projectId').value = project.id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectTags').value = project.tags.join(', ');
    document.getElementById('projectTools').value = project.tools;
    document.getElementById('githubUrl').value = project.githubUrl || '';
    document.getElementById('liveUrl').value = project.liveUrl || '';
    document.getElementById('projectImage').value = project.imageUrl || '';
}

function saveProject() {
    const form = document.getElementById('projectForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const formData = new FormData(form);
    const projectId = document.getElementById('projectId').value;
    
    const projectData = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        tags: document.getElementById('projectTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
        tools: document.getElementById('projectTools').value,
        githubUrl: document.getElementById('githubUrl').value,
        liveUrl: document.getElementById('liveUrl').value,
        imageUrl: document.getElementById('projectImage').value
    };
    
    if (projectId) {
        // Update existing project
        const project = projects.find(p => p.id == projectId);
        if (project) {
            Object.assign(project, projectData);
            showToast('Project updated successfully!', 'success');
        }
    } else {
        // Add new project
        const newProject = {
            id: Date.now(),
            ...projectData
        };
        projects.unshift(newProject);
        showToast('Project added successfully!', 'success');
    }
    
    loadProjects();
    bootstrap.Modal.getInstance(document.getElementById('projectModal')).hide();
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (project) {
        openProjectModal(project);
    }
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        loadProjects();
        showToast('Project deleted successfully!', 'success');
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate API call
    setTimeout(() => {
        console.log('Contact form submitted:', formData);
        
        // Reset form
        e.target.reset();
        
        // Reset button state
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;
        
        // Show success message
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
    }, 2000);
}

// Resume Functions
function downloadResume() {
    showToast('Resume download started!', 'info');
    // In a real application, this would trigger an actual file download
    console.log('Downloading resume...');
}

function previewResume() {
    showToast('Resume preview would open in a new tab', 'info');
    // In a real application, this would open the PDF in a new tab
    console.log('Opening resume preview...');
}

// Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate subscription
    console.log('Newsletter subscription:', email);
    emailInput.value = '';
    showToast('Successfully subscribed to the newsletter!', 'success');
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    const toastId = 'toast-' + Date.now();
    
    const bgClass = {
        'success': 'bg-success',
        'error': 'bg-danger',
        'info': 'bg-primary',
        'warning': 'bg-warning'
    }[type] || 'bg-primary';
    
    const iconClass = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'info': 'fas fa-info-circle',
        'warning': 'fas fa-exclamation-triangle'
    }[type] || 'fas fa-info-circle';
    
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center">
                    <i class="${iconClass} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// Scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.skill-card, .project-card, .blog-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay to allow AOS to initialize first
    setTimeout(observeElements, 1000);
});

// Handle navbar active states on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPos = window.pageYOffset;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Prevent form submissions from actually submitting
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (!form.hasAttribute('data-no-prevent')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
            });
        }
    });
});

// Add loading states to buttons
function addButtonLoadingState() {
    const buttons = document.querySelectorAll('.btn[onclick], .btn[data-action]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('btn-loading')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

// Initialize button effects
document.addEventListener('DOMContentLoaded', addButtonLoadingState);

// Performance optimization: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle any resize-specific logic here
        AOS.refresh();
    }, 250);
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);
