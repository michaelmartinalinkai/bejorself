/* =============================================
   BE JORSELF - JavaScript
   Scroll animations, navigation and interactions
   FIX: Parallax disabled on mobile (Safari crash)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initScrollAnimations();

    // FIX: Skip parallax entirely on mobile — the continuous
    // requestAnimationFrame loop + transform updates drain
    // GPU memory and crash Safari iOS
    if (window.innerWidth > 768) {
        initParallax();
    }

    initMobileMenu();
    initActiveMenuHighlight();
});

/**
 * Header transparency on scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Fade-in animations on scroll using Intersection Observer
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));

    const cards = document.querySelectorAll('.aanbod-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(cards).indexOf(entry.target);
                const delay = index * 140;
                setTimeout(() => {
                    entry.target.classList.add('slide-in-active');
                }, delay);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.15 });
    cards.forEach(card => cardObserver.observe(card));

    const botanicals = document.querySelectorAll('.botanical-decor-left, .botanical-decor-right');
    const botanicalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                botanicalObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });
    botanicals.forEach(el => botanicalObserver.observe(el));

    const reflectieLeft = document.getElementById('reflectie-left');
    const reflectieCenter = document.getElementById('reflectie-center');
    const reflectieRight = document.getElementById('reflectie-right');
    const specificReflectieCards = [];
    if (reflectieLeft) specificReflectieCards.push(reflectieLeft);
    if (reflectieCenter) specificReflectieCards.push(reflectieCenter);
    if (reflectieRight) specificReflectieCards.push(reflectieRight);

    const specificReflectieObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-active');
                specificReflectieObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.15 });
    specificReflectieCards.forEach(card => specificReflectieObserver.observe(card));

    const aboutLeft = document.getElementById('about-left');
    const aboutRight = document.getElementById('about-right');
    const aboutElements = [];
    if (aboutLeft) aboutElements.push(aboutLeft);
    if (aboutRight) aboutElements.push(aboutRight);

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-active');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.15 });
    aboutElements.forEach(el => aboutObserver.observe(el));
}

/**
 * Parallax effect — ONLY runs on desktop (>768px)
 */
function initParallax() {
    const layers = document.querySelectorAll('.bg-layer');
    if (layers.length) {
        let scrollY = window.pageYOffset;
        let mouseX = 0;
        let mouseY = 0;
        let currentScrollY = scrollY;
        let currentMouseX = 0;
        let currentMouseY = 0;

        window.addEventListener('scroll', () => {
            scrollY = window.pageYOffset;
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });

        function easeParallax() {
            currentScrollY += (scrollY - currentScrollY) * 0.1;
            currentMouseX += (mouseX - currentMouseX) * 0.05;
            currentMouseY += (mouseY - currentMouseY) * 0.05;

            layers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
                const yPos = currentScrollY * speed * 0.5;
                const xOffset = currentMouseX * 50 * speed;
                const yOffset = currentMouseY * 50 * speed;
                layer.style.transform = `translate3d(${xOffset}px, ${yPos + yOffset}px, 0)`;
            });

            requestAnimationFrame(easeParallax);
        }

        easeParallax();
    }
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
}

/**
 * Active menu highlight based on scroll position
 */
function initActiveMenuHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;

    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + headerHeight + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            const nav = document.querySelector('.nav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        }
    });
});

/**
 * Form submission handler
 */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        alert(`Bedankt ${name}! Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.`);
        this.reset();
    });
}
