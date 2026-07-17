// Mobile optimizations and touch interactions
document.addEventListener('DOMContentLoaded', function() {

    // ── Scroll reveal ───────────────────────────────────────────
    (function initReveal() {
        const revealEls = document.querySelectorAll(
            '.section, .service-card, .trust-card, .everything-card, ' +
            '.case-block, .hero-stats, .step-card, .process-step, ' +
            '.feature-item, .tech-card, .target-card, .timeline-item, ' +
            '.pricing-card, .faq-item, .testimonial-card, .stats-grid, ' +
            '.soluciones-grid > *, .services-grid > *'
        );
        revealEls.forEach((el, i) => {
            if (!el.classList.contains('hero') && !el.closest('.nav') && !el.closest('.footer')) {
                el.classList.add('reveal');
                // Stagger cards within grids
                if (el.closest('.services-grid, .soluciones-grid, .trust-grid, .stats-grid')) {
                    el.style.transitionDelay = (i % 6) * 0.07 + 's';
                }
            }
        });

        // Sin IntersectionObserver: mostrar todo, nunca dejar contenido oculto
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal--visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.02, rootMargin: '0px 0px 120px 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    })();

    // ── Animated counters ───────────────────────────────────────
    (function initCounters() {
        function parseNum(str) {
            const clean = str.replace(/[^0-9.]/g, '');
            return parseFloat(clean) || 0;
        }
        function formatNum(n, original) {
            const prefix = original.match(/^[^0-9]*/)[0];
            const suffix = original.match(/[^0-9.]*$/)[0];
            const decimals = (original.match(/\.(\d+)/) || ['', ''])[1].length;
            return prefix + n.toFixed(decimals) + suffix;
        }

        const counterEls = document.querySelectorAll(
            '.hero-stat-num, .stat-number, .case-result-num, .counter'
        );

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                if (el.dataset.counted) return;
                el.dataset.counted = '1';

                const original = el.textContent.trim();
                const target = parseNum(original);
                if (target === 0) return;

                const duration = 1400;
                const start = performance.now();
                const easeOut = t => 1 - Math.pow(1 - t, 3);

                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    el.textContent = formatNum(target * easeOut(progress), original);
                    if (progress < 1) requestAnimationFrame(tick);
                    else el.textContent = original; // restore exact text
                }
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            });
        }, { threshold: 0.5 });

        counterEls.forEach(el => counterObserver.observe(el));
    })();

    // ── Scroll-to-top button ─────────────────────────────────────
    (function initScrollTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.setAttribute('aria-label', 'Volver arriba');
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
        document.body.appendChild(btn);

        let visible = false;
        window.addEventListener('scroll', () => {
            const should = window.scrollY > 320;
            if (should !== visible) {
                visible = should;
                btn.classList.toggle('scroll-top-btn--visible', visible);
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (navigator.vibrate) navigator.vibrate(20);
        });
    })();


    // Smooth scrolling for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── Hamburger / mobile nav ──────────────────────────────────
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav ul');

    function closeNav() {
        if (!navMenu) return;
        navMenu.classList.remove('nav-open');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('nav-open');
            mobileMenuToggle.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu when a leaf link (not dropdown toggle) is tapped
        navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    // ── Dropdown menus ──────────────────────────────────────────
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        function toggleDropdown(e) {
            e.preventDefault();
            const isActive = dropdown.classList.contains('active');
            // Close all others
            dropdowns.forEach(other => other !== dropdown && other.classList.remove('active'));
            // Toggle this one
            dropdown.classList.toggle('active', !isActive);
            if (navigator.vibrate) navigator.vibrate(20);
        }

        toggle.addEventListener('click', toggleDropdown);

        // Separate touchend handler to avoid ghost-click on mobile
        let touchMoved = false;
        toggle.addEventListener('touchstart', () => { touchMoved = false; }, { passive: true });
        toggle.addEventListener('touchmove',  () => { touchMoved = true;  }, { passive: true });
        toggle.addEventListener('touchend', function(e) {
            if (!touchMoved) {
                e.preventDefault();
                toggleDropdown(e);
            }
        });
    });

    // Close dropdowns when clicking/tapping outside (desktop only — on mobile menu covers page)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768 && !e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
    
    // Enhanced scroll behavior for mobile
    let ticking = false;
    
    function updateScrollBehavior() {
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollBehavior);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // El feedback táctil (scale al pulsar) ahora es CSS puro con :active en styles.css —
    // el antiguo handler de touchstart encogía las tarjetas al arrastrar el dedo para
    // hacer scroll y pisaba el transform de las animaciones reveal.

    // iOS-style elastic scrolling
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Form mobile optimizations – prevent zoom on iOS (font-size >= 16px)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (window.innerWidth < 768) {
                    this.style.fontSize = '16px';
                }
            }, { passive: true });
        });
    });
    
    // Mobile viewport height fix (fixes iOS 100vh bug)
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight, { passive: true });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalImages = [
        'logo-elefante-final.png',
    ];
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Service Worker – Network First, auto-actualización inmediata
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js?v=8')
                .then(reg => {
                    reg.addEventListener('updatefound', () => {
                        const newSW = reg.installing;
                        if (!newSW) return;
                        newSW.addEventListener('statechange', () => {
                            if (newSW.state === 'activated') {
                                window.location.reload();
                            }
                        });
                    });
                    reg.update();
                })
                .catch(err => console.warn('SW registration failed:', err));

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });
        });
    }
});