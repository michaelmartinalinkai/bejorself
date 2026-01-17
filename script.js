/* =============================================
   BE JORSELF - JavaScript
   Scroll animations, navigation and interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    initHeaderScroll();

    // Intersection Observer for fade-in animations
    initScrollAnimations();

    // Parallax effect for botanical elements
    initParallax();

    // Mobile menu toggle
    initMobileMenu();

    // Active menu highlighting based on scroll
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
 * Handles standard fade-ins and staggered fly-ins
 */
function initScrollAnimations() {
    // 1. Standard Fade In elements
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

    // 2. Staggered Slide-In Cards (Aanbod) - Right to Left
    const cards = document.querySelectorAll('.aanbod-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine index for stagger delay
                const index = Array.from(cards).indexOf(entry.target);
                // Stagger: 0ms, 140ms, 280ms... as requested
                const delay = index * 140;

                setTimeout(() => {
                    entry.target.classList.add('slide-in-active');
                }, delay);

                cardObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.15 });

    cards.forEach(card => cardObserver.observe(card));

    // 3. Botanical Decorations Fade-In
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

    // 4. Reflectie Section Animations (Specific Directions)
    // IDs: reflectie-left, reflectie-center, reflectie-right
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

    // Duplicate block removed

    // 5. About Section Animations (Left/Right Slide-in)
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
 * Subtle parallax effect for botanical background elements
 */
/**
 * Subtle parallax effect for Global Background System
 * Uses requestAnimationFrame for smooth GPU performance
 */
function initParallax() {
    // 4. Enhanced Parallax Effect (Scroll + Mouse)
    const layers = document.querySelectorAll('.bg-layer');
    if (layers.length) {
        let scrollY = window.pageYOffset;
        let mouseX = 0;
        let mouseY = 0;
        // Dampening factors for smoother movement
        let currentScrollY = scrollY;
        let currentMouseX = 0;
        let currentMouseY = 0;

        // Track scroll position
        window.addEventListener('scroll', () => {
            scrollY = window.pageYOffset;
        });

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            // Normalize mouse position from -1 to 1
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });

        // Animation loop for smooth physics
        function easeParallax() {
            // Smoothly interpolate current values towards target values
            // The 0.1 factor controls the "lag" or "weight" (lower = smoother/slower)
            currentScrollY += (scrollY - currentScrollY) * 0.1;
            currentMouseX += (mouseX - currentMouseX) * 0.05;
            currentMouseY += (mouseY - currentMouseY) * 0.05;

            layers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;

                // Calculate movement
                // Y-axis: Scroll + slight mouse influence
                // X-axis: Mouse influence
                const yPos = currentScrollY * speed * 0.5; // Adjusted scale
                const xOffset = currentMouseX * 50 * speed; // Mouse horizontal parallax
                const yOffset = currentMouseY * 50 * speed; // Mouse vertical parallax

                // Apply transform
                layer.style.transform = `translate3d(${xOffset}px, ${yPos + yOffset}px, 0)`;
            });

            requestAnimationFrame(easeParallax);
        }

        // Start the loop
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
    updateActiveLink(); // Run on load
}

/**
 * Smooth scroll for anchor links with precise header offset
 * Ensures titles and cards are perfectly aligned when scrolling
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // Get precise header height + extra breathing room
            const headerHeight = document.getElementById('header').offsetHeight;
            const extraPadding = 0; // Extra space so title isn't jammed against header
            const targetPosition = target.offsetTop - headerHeight - extraPadding;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
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
 * Form submission handler (placeholder)
 */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');

        // Show simple confirmation (replace with actual form handling)
        alert(`Bedankt ${name}! Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.`);

        // Reset form
        this.reset();
    });
}
