// Optimización móvil para Elefante Lab
document.addEventListener('DOMContentLoaded', function() {
    
    // Mejorar navegación dropdown en móvil
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                // En móvil, alternar el dropdown
                if (window.innerWidth <= 767) {
                    dropdown.classList.toggle('active');
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu && window.innerWidth <= 767) {
                    menu.style.display = 'none';
                }
            });
        }
    });
    
    // Optimizar imágenes para móvil
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
    
    // Mejorar formularios en móvil
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Prevenir zoom en iOS
            if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                input.style.fontSize = '16px';
            }
        });
    });
    
    // Smooth scroll mejorado para móvil
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Optimizar rendimiento en móvil
    if (window.innerWidth <= 768) {
        // Reducir animaciones en dispositivos móviles
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                transition-duration: 0.1s !important;
                animation-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Touch events para mejor UX móvil
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchY;
        
        // Mejorar scroll en iOS
        if (Math.abs(touchDiff) > 10) {
            e.preventDefault = false;
        }
    }, { passive: true });
});

// Función para redimensionar elementos al cambiar orientación
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        // Recalcular alturas después del cambio de orientación
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth <= 768) {
            hero.style.minHeight = window.innerHeight * 0.4 + 'px';
        }
    }, 100);
});

// Optimizar carga de imágenes en móvil
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}