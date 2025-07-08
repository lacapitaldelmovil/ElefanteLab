// Performance optimization utilities
(function() {
    'use strict';
    
    // Critical rendering path optimization
    function optimizeCriticalRenderingPath() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
        fontLink.as = 'style';
        fontLink.onload = function() {
            this.onload = null;
            this.rel = 'stylesheet';
        };
        document.head.appendChild(fontLink);
        
        // Lazy load non-critical CSS
        const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        nonCriticalStyles.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
    }
    
    // Image optimization
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading attribute for browsers that support it
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
            
            // Add error handling
            img.onerror = function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            };
            
            // Optimize image sizes based on viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Add responsive behavior
                        if (window.innerWidth < 768) {
                            img.style.maxWidth = '100%';
                            img.style.height = 'auto';
                        }
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            observer.observe(img);
        });
    }
    
    // Memory usage optimization
    function optimizeMemory() {
        // Clean up unused event listeners
        const cleanupFunctions = [];
        
        // Store cleanup functions for later use
        window.addEventListener('beforeunload', () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        });
        
        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        
        window.onscroll = function(e) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) {
                    originalScrollHandler.call(this, e);
                }
            }, 16); // ~60fps
        };
    }
    
    // Network optimization
    function optimizeNetwork() {
        // Prefetch likely next pages
        const prefetchLinks = [
            '/casos.html',
            '/como-trabajamos.html',
            '/porque-elefante.html'
        ];
        
        prefetchLinks.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
        
        // Connection warming
        const warmConnections = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        warmConnections.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    // Performance monitoring
    function monitorPerformance() {
        // Web Vitals monitoring
        const vitals = {
            FCP: 0,
            LCP: 0,
            FID: 0,
            CLS: 0
        };
        
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    vitals.FCP = entry.startTime;
                    console.log('FCP:', vitals.FCP);
                }
            });
        });
        
        try {
            fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
            console.warn('Paint timing not supported');
        }
        
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.LCP = lastEntry.startTime;
            console.log('LCP:', vitals.LCP);
        });
        
        try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('LCP timing not supported');
        }
        
        // Report performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const metrics = {
                    loadTime: navigation.loadEventEnd - navigation.navigationStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
                    firstByte: navigation.responseStart - navigation.navigationStart,
                    vitals: vitals
                };
                
                console.log('Performance metrics:', metrics);
                
                // Alert for slow performance
                if (metrics.loadTime > 3000) {
                    console.warn('Page load time is slow:', metrics.loadTime + 'ms');
                }
            }, 0);
        });
    }
    
    // Initialize performance optimizations
    function initPerformanceOptimizations() {
        optimizeCriticalRenderingPath();
        optimizeImages();
        optimizeMemory();
        optimizeNetwork();
        monitorPerformance();
        
        console.log('Performance optimizations initialized');
    }
    
    // Start optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
    } else {
        initPerformanceOptimizations();
    }
})();