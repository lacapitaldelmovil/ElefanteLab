// Mobile optimizations and touch interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for mobile
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
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Compact dropdown with smooth animations
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Optimized touch events
        toggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.97)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        toggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
            
            const isActive = dropdown.classList.contains('active');
            
            // Close all dropdowns first
            dropdowns.forEach(other => {
                other.classList.remove('active');
            });
            
            // Toggle current if wasn't active
            if (!isActive) {
                dropdown.classList.add('active');
            }
            
            // Light haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(25);
            }
        });
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isActive = dropdown.classList.contains('active');
            
            // Close all dropdowns first
            dropdowns.forEach(other => {
                other.classList.remove('active');
            });
            
            // Toggle current if wasn't active
            if (!isActive) {
                dropdown.classList.add('active');
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Touch event for closing dropdowns
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
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
        // Add scroll-based optimizations here
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollBehavior);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
    
    // Enhanced native app-style touch feedback
    const buttons = document.querySelectorAll('.btn, .trust-card, .everything-card, .service-card, .nav a');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.touches[0].clientX - rect.left - size / 2;
            const y = e.touches[0].clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Add subtle haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            }, 100);
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';
        });
    });
    
    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add native app-style scroll physics
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            // Add momentum-style scrolling indicators
            document.body.style.setProperty('--scroll-y', window.scrollY + 'px');
        }
        isScrolling = true;
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    });
    
    // Prevent pull-to-refresh on iOS when at top
    let preventPullToRefresh = false;
    document.body.addEventListener('touchstart', e => {
        if (e.touches.length === 1 && window.scrollY === 0) {
            preventPullToRefresh = true;
        }
    });
    
    document.body.addEventListener('touchmove', e => {
        if (preventPullToRefresh) {
            // Prevent the pull-to-refresh action
            e.preventDefault();
        }
    }, { passive: false });
    
    document.body.addEventListener('touchend', () => {
        preventPullToRefresh = false;
    });
    
    // Add iOS-style elastic scrolling
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Form mobile optimizations
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Prevent zoom on iOS
                if (window.innerWidth < 768) {
                    this.style.fontSize = '16px';
                }
            });
        });
    });
    
    // Mobile viewport height fix
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
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
        'attached_assets/imagine@2x-6cf456c9_1750334470030.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Service worker registration for caching
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
});