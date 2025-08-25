// Script para manejar animaciones en toda la página
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initButtonEffects();
  initPageTransitions();
});

// Función para inicializar las animaciones activadas por scroll
function initScrollAnimations() {
  // Opciones para el observador de intersección
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  // Crear un observador para elementos con la clase reveal-on-scroll
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, options);

  // Observar todos los elementos con la clase reveal-on-scroll
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // También agregamos clase a los elementos dentro de secciones
  document.querySelectorAll('.scroll-reveal-section').forEach(section => {
    // Para cada sección, añadimos la clase reveal-on-scroll a sus hijos
    Array.from(section.children).forEach((child, index) => {
      child.classList.add('reveal-on-scroll');
      // Añadimos un delay incremental para efecto en cascada
      if (child instanceof HTMLElement) {
        child.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  });

  // Volvemos a buscar todos los elementos con la clase añadida
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Función para inicializar efectos en botones
function initButtonEffects() {
  // Añadir efecto de ondas a botones con clase ripple-button
  const rippleButtons = document.querySelectorAll('.ripple-button');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - this.getBoundingClientRect().left;
      const y = e.clientY - this.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Función para manejar transiciones entre páginas
function initPageTransitions() {
  // Añadir clase a todos los enlaces internos para la transición de página
  document.querySelectorAll('a').forEach(link => {
    // Solo aplicar a enlaces internos (misma página o dominio)
    if (link.href && (link.href.startsWith(window.location.origin) || link.href.startsWith('/'))) {
      link.addEventListener('click', e => {
        // Si no es un modificador (como Ctrl+click para abrir en nueva pestaña)
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          
          // Añadir animación de salida
          document.body.classList.add('page-transition-out');
          
          // Navegar después de un retraso breve
          setTimeout(() => {
            window.location.href = link.href;
          }, 300);
        }
      });
    }
  });
  
  // Añadir animación de entrada al cargar la página
  window.addEventListener('pageshow', () => {
    document.body.classList.add('page-transition-in');
  });
}

// Para asegurar compatibilidad con navegadores antiguos
if (!('IntersectionObserver' in window)) {
  // Fallback para navegadores sin soporte
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('visible');
  });
}
