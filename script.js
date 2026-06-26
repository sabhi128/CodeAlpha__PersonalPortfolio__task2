/* ==========================================================================
   LUXURY PORTFOLIO INTERACTIBILITY & UX LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize UX modules
    initCustomCursor();
    initThemeManager();
    initHeaderScroll();
    initMobileNav();
    initScrollReveal();
    initProjectFilter();
    initContactForm();
    initStatsCounter();
});

/* --------------------------------------------------------------------------
   1. CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0, mouseY = 0; // Current mouse position
    let cursorX = 0, cursorY = 0; // Inner dot position
    let outerX = 0, outerY = 0; // Outer ring position (for damping delay)
    
    let isVisible = false;
    
    // Damping factor for smooth follow (lower = smoother/slower)
    const innerDamping = 0.2;
    const outerDamping = 0.08;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor elements on first movement
        if (!isVisible) {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
            isVisible = true;
        }
    });

    // Animation Loop
    function animateCursor() {
        // Linear interpolation (lerp)
        cursorX += (mouseX - cursorX) * innerDamping;
        cursorY += (mouseY - cursorY) * innerDamping;
        
        outerX += (mouseX - outerX) * outerDamping;
        outerY += (mouseY - outerY) * outerDamping;
        
        cursorDot.style.left = `${cursorX}px`;
        cursorDot.style.top = `${cursorY}px`;
        
        cursor.style.left = `${outerX}px`;
        cursor.style.top = `${outerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);
    
    // Hide cursor when leaving viewport
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        isVisible = false;
    });

    // Cursor hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-media, .filter-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/* --------------------------------------------------------------------------
   2. THEME MANAGER (Dark / Light Switcher)
   -------------------------------------------------------------------------- */
function initThemeManager() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check system preference or stored setting
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark mode unless light is explicitly set
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');
    document.documentElement.setAttribute('data-theme', initialTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply luxury page fade transition during theme switch
        document.body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* --------------------------------------------------------------------------
   3. HEADER SHOW / HIDE ON SCROLL
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Only hide after scroll past 100px

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ignore negative scroll values (like iOS rubber-banding)
        if (scrollTop < 0) return;
        
        if (scrollTop > scrollThreshold) {
            // Scrolling down -> hide header
            if (scrollTop > lastScrollTop) {
                header.classList.add('header-hidden');
            } 
            // Scrolling up -> show header
            else {
                header.classList.remove('header-hidden');
            }
        } else {
            // Keep header visible at the top
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

/* --------------------------------------------------------------------------
   4. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggle = document.getElementById('mobileNavToggle');
    const nav = document.getElementById('mobileNav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        nav.classList.toggle('active', isActive);
        
        // Prevent body scroll when menu is active
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    // Close mobile nav when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* --------------------------------------------------------------------------
   5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length === 0) return;
    
    const revealConfig = {
        root: null,
        rootMargin: '-5% 0px -5% 0px', // Trigger slightly inside the screen
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            } else {
                // Remove to allow smooth exit animations when scrolling away/up
                entry.target.classList.remove('reveal-active');
            }
        });
    }, revealConfig);
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/* --------------------------------------------------------------------------
   6. SELECTED WORKS CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset card displays with a neat visual fade-out/fade-in
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (category === 'all' || cardCategory === category) {
                        card.classList.remove('filter-hide');
                        
                        // Small timeout to allow transition engines to trigger after display change
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.classList.add('filter-hide');
                    }
                }, 300); // Duration matches fade-out
            });
        });
    });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM VALIDATION & SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const messageInput = document.getElementById('formMessage');
    const successOverlay = document.getElementById('formSuccess');
    
    if (!form) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        
        // 1. Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isFormValid = false;
        } else {
            clearError(nameInput);
        }
        
        // 2. Validate Email
        if (emailInput.value.trim() === '' || !emailRegex.test(emailInput.value.trim())) {
            showError(emailInput);
            isFormValid = false;
        } else {
            clearError(emailInput);
        }
        
        // 3. Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput);
            isFormValid = false;
        } else {
            clearError(messageInput);
        }
        
        if (isFormValid) {
            submitForm();
        }
    });
    
    // Live validation check on input focus-out & typing
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                showError(input);
            } else if (input === emailInput && !emailRegex.test(input.value.trim())) {
                showError(input);
            } else {
                clearError(input);
            }
        });
        
        // Remove error outline instantly upon typing valid characters
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                if (input === emailInput) {
                    if (emailRegex.test(input.value.trim())) {
                        clearError(input);
                    }
                } else {
                    clearError(input);
                }
            }
        });
    });
    
    function showError(input) {
        const group = input.parentElement;
        group.classList.add('invalid');
    }
    
    function clearError(input) {
        const group = input.parentElement;
        group.classList.remove('invalid');
    }
    
    function submitForm() {
        const submitBtn = form.querySelector('.btn-submit');
        const initialText = submitBtn.innerHTML;
        
        // Visual indicator of sending state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            Sending...
            <svg class="spinner-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                <path d="M12 2v4"></path>
            </svg>
        `;
        
        // Simulate network call delays
        setTimeout(() => {
            // Transition form out and show success overlay
            successOverlay.classList.add('active');
            
            // Clear inputs
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            
            // Reset button after success display triggers
            submitBtn.disabled = false;
            submitBtn.innerHTML = initialText;
            
            // Close success overlay after 8 seconds
            setTimeout(() => {
                successOverlay.classList.remove('active');
            }, 8000);
            
        }, 1800);
    }
}

/* --------------------------------------------------------------------------
   8. STATS COUNTER ANIMATION (Odometer Effect)
   -------------------------------------------------------------------------- */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-num');
    const statsRow = document.querySelector('.stats-row');
    if (stats.length === 0 || !statsRow) return;

    let animated = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true; // Only animate once
            }
        });
    }, { threshold: 0.5 });

    countObserver.observe(statsRow);

    function animateCounters() {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easeProgress * target);
                
                // Format with leading zero if original had it
                const formattedValue = currentValue < 10 ? `0${currentValue}` : currentValue;
                stat.innerText = `${formattedValue}+`;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = `${target < 10 ? '0' + target : target}+`;
                }
            }

            requestAnimationFrame(updateCount);
        });
    }
}
