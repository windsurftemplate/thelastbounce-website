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

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.problem-card, .platform-card, .tech-card, .solution-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to stats
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });

    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Mobile menu toggle (for future implementation)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-wrapper');
    const menu = document.querySelector('.nav-menu');

    if (window.innerWidth <= 768) {
        if (!document.querySelector('.menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = 'background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text);';

            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });

            nav.appendChild(toggle);
        }
    }
};

// Initialize on load
window.addEventListener('load', () => {
    createMobileMenu();
});

// Reinitialize on resize
window.addEventListener('resize', () => {
    createMobileMenu();
});

// Add animation to callout on scroll
const callout = document.querySelector('.callout');
if (callout) {
    const calloutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });

    calloutObserver.observe(callout);
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }

    .nav-menu a.active {
        color: var(--color-primary);
        position: relative;
    }

    .nav-menu a.active::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .nav-menu.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);
