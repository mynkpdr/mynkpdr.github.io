// ==================== DOM Elements ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navbar = document.querySelector('.navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// ==================== Custom Cursor ====================
document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 100);
    }
});

document.addEventListener('mousedown', () => {
    if (cursor) cursor.style.transform = 'scale(0.8)';
    if (cursorFollower) cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    if (cursor) cursor.style.transform = 'scale(1)';
    if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
});

// Hide cursor when leaving the document
document.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.opacity = '0';
    if (cursorFollower) cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.opacity = '1';
    if (cursorFollower) cursorFollower.style.opacity = '0.5';
});

// Add hover effect to links and buttons
document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorFollower) {
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.opacity = '0.3';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorFollower) {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.opacity = '0.5';
        }
    });
});

// ==================== Navigation ====================
// Hamburger Menu Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar scroll effect
function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
}

// ==================== Typewriter Effect ====================
const typewriterElement = document.getElementById('typewriter');
const roles = [
    'Tech Enthusiast',
    'LLM Engineer',
    'Data Scientist',
    'Penetration Tester',
    'Full Stack Developer',
    'Gamer',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typewriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        if (typewriterElement) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        }
        charIndex--;
        typingSpeed = 50;
    } else {
        if (typewriterElement) {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        }
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before new word
    }
    
    setTimeout(typewriter, typingSpeed);
}

// ==================== Counter Animation ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ==================== Skill Progress Bars ====================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ==================== Skills Tabs ====================
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId)?.classList.add('active');
        
        // Animate skill bars when tab is switched
        setTimeout(animateSkillBars, 100);
    });
});

// ==================== Project Filters ====================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==================== Contact Form ====================
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// ==================== Back to Top Button ====================
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
}

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Scroll Animations ====================
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// ==================== Particle Effect ====================
function createParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        
        // Random delay
        particle.style.animationDelay = (Math.random() * 10) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particleContainer.appendChild(particle);
    }
}

// ==================== Year in Footer ====================
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
            
            // Animate counters when hero section is visible
            if (entry.target.id === 'home') {
                setTimeout(animateCounters, 500);
            }
        }
    });
}, observerOptions);

// Observe sections
sections.forEach(section => {
    observer.observe(section);
});

// ==================== Smooth Reveal Animation ====================
function revealElements() {
    const containers = document.querySelectorAll('.skills-grid, .courses-grid, .projects-grid, .interests-grid, .security-grid, .tools-grid, .contact-info, .soft-skills-grid');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.skill-card, .project-card, .interest-card, .course-card, .security-card, .info-card, .tool-item, .soft-skill-item');
                elements.forEach((element, index) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 80);
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    containers.forEach(container => {
        revealObserver.observe(container);
    });
}

// ==================== Scroll Events ====================
window.addEventListener('scroll', () => {
    highlightNavLink();
    handleNavScroll();
    handleBackToTop();
    animateOnScroll();
});

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    setCurrentYear();
    
    // Start typewriter effect
    setTimeout(typewriter, 1000);
    
    // Create particle effect
    createParticles();
    
    // Initialize reveal animations
    revealElements();
    
    // Initial animations
    setTimeout(() => {
        animateCounters();
        animateSkillBars();
    }, 500);
    
    // Initial nav check
    highlightNavLink();
    handleNavScroll();
});

// ==================== Preloader (Optional) ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.loading');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ==================== Easter Egg: Konami Code ====================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==================== Console Easter Egg ====================
console.log(`
%c╔══════════════════════════════════════════╗
%c║   👋 Hey there, curious developer!       ║
%c║   Thanks for checking out my code!       ║
%c║   Let's connect and build cool stuff!    ║
%c╚══════════════════════════════════════════╝
`, 
'color: #6c5ce7; font-weight: bold;',
'color: #00cec9; font-weight: bold;',
'color: #fd79a8; font-weight: bold;',
'color: #00b894; font-weight: bold;',
'color: #6c5ce7; font-weight: bold;'
);
