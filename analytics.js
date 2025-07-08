// Analytics and Performance Monitoring for ElefanteLab
(function() {
    'use strict';
    
    // Performance monitoring
    function monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                    
                    console.log('Page load time:', loadTime, 'ms');
                    
                    // Send to analytics if needed
                    if (loadTime > 3000) {
                        console.warn('Page load time is slow:', loadTime, 'ms');
                    }
                }, 0);
            });
        }
    }
    
    // Error tracking
    function trackErrors() {
        window.addEventListener('error', (event) => {
            console.error('JavaScript error:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }
    
    // User interaction tracking
    function trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (event) => {
            if (event.target.matches('.btn, .trust-card, .everything-card')) {
                const elementText = event.target.textContent?.slice(0, 50) || 'Unknown';
                console.log('User interaction:', elementText);
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (event) => {
            console.log('Form submitted:', event.target.action || 'No action');
        });
        
        // Track dropdown usage
        document.addEventListener('click', (event) => {
            if (event.target.matches('.dropdown-toggle')) {
                console.log('Dropdown opened:', event.target.textContent);
            }
        });
    }
    
    // Viewport tracking
    function trackViewport() {
        const viewportInfo = {
            width: window.innerWidth,
            height: window.innerHeight,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform
        };
        
        console.log('Viewport info:', viewportInfo);
    }
    
    // Core Web Vitals monitoring
    function monitorCoreWebVitals() {
        if ('web-vital' in window) {
            // This would typically use the web-vitals library
            // For now, we'll monitor basic metrics
            
            // Largest Contentful Paint
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            
            try {
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('LCP monitoring not supported');
            }
        }
    }
    
    // Initialize analytics
    function initAnalytics() {
        monitorPerformance();
        trackErrors();
        trackUserInteractions();
        trackViewport();
        monitorCoreWebVitals();
        
        console.log('ElefanteLab analytics initialized');
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnalytics);
    } else {
        initAnalytics();
    }
})();