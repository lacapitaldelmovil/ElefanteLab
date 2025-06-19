// Animaciones modernas para Elefante Lab

// Intersection Observer para animaciones al scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-on-scroll');
    }
  });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
  // Elementos a animar
  const elementsToAnimate = document.querySelectorAll(
    '.service-card, .section h2, .section p, .section-image'
  );
  
  elementsToAnimate.forEach((el, index) => {
    el.classList.add(`animate-delay-${(index % 4) + 1}`);
    observer.observe(el);
  });

  // Efecto parallax suave en el hero
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
      hero.style.transform = `translateY(${rate}px)`;
    }
    
    if (heroImage && scrolled < hero.offsetHeight) {
      heroImage.style.transform = `translateY(${rate * 0.3}px) scale(${1 + scrolled * 0.0002})`;
    }
  });

  // Navegación dinámica al scroll
  const nav = document.querySelector('.nav');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Auto-hide navigation on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Efecto de tipo typing para el título principal
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid white';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // Animación de contador para números/métricas
  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    
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
      
      observer.observe(counter);
      counter.addEventListener('animationstart', updateCounter);
    });
  };
  
  animateCounters();

  // Smooth scroll para enlaces internos
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

  // Efecto de brillo en botones
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.animation = 'none';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.animation = 'pulse 2s ease-in-out infinite 3s';
    });
  });

  // Efecto de partículas ligero en el hero
  const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float 4s ease-in-out infinite;
        animation-delay: ${i * 0.2}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
      `;
      hero.appendChild(particle);
    }
  };
  
  createParticles();
});

// Agregar clases CSS dinámicamente para mejor rendimiento
const addDynamicStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .hero-particle {
      animation: float 4s ease-in-out infinite;
    }
    
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
};

addDynamicStyles();