// Sistema completo de animaciones para Trail Valle de Arbas
document.addEventListener('DOMContentLoaded', () => {
  // Marcar que JavaScript está habilitado
  document.body.classList.add('js-enabled');
  
  // Inicializar animaciones
  initScrollAnimations();
  initButtonEffects();
  initPageTransitions();
  initHoverEffects();
  initTextAnimations();
  initCounterAnimations();
});

// Función para inicializar las animaciones activadas por scroll
function initScrollAnimations() {
  try {
    // Opciones para el observador de intersección
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
  
    // Crear un observador para elementos con clase reveal-element o reveal-on-scroll
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Desconectar después de animar una vez para mejorar el rendimiento
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    // Observar todos los elementos con la clase reveal-element o reveal-on-scroll
    document.querySelectorAll('.reveal-element, .reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  
    // También agregamos clase a los elementos dentro de secciones
    document.querySelectorAll('.scroll-reveal-section').forEach(section => {
      // Para cada sección, configuramos sus hijos para animación
      Array.from(section.children).forEach((child, index) => {
        try {
          const htmlEl = child;
          
          // Solo aplicar si JavaScript está activo
          if (document.body.classList.contains('js-enabled')) {
            htmlEl.style.opacity = '0';
            htmlEl.style.transform = 'translateY(30px)';
            htmlEl.style.transition = `all 0.5s ease ${index * 0.1}s`;
            
            // Añadir clase para facilitar selección
            child.classList.add('reveal-on-scroll');
          }
          
          // Observar el elemento
          observer.observe(child);
        } catch (error) {
          console.error('Error al configurar animación de hijo en sección:', error);
        }
      });
    });
    
    // Animación para elementos fade-in-up que no tengan ya la clase animated
    document.querySelectorAll('.fade-in-up:not(.animated)').forEach(el => {
      el.classList.add('animated');
      observer.observe(el);
    });
    
    // Animación para elementos staggered (en secuencia)
    document.querySelectorAll('.stagger-reveal').forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      
      items.forEach((item, index) => {
        try {
          if (document.body.classList.contains('js-enabled')) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.4s ease ${index * 0.08}s`;
          }
          
          observer.observe(item);
        } catch (error) {
          console.error('Error al configurar animación stagger:', error);
        }
      });
    });
    
    // Configuración para animaciones específicas
    setupSpecialAnimations();
  } catch (error) {
    console.error('Error al inicializar animaciones de scroll:', error);
    
    // Plan de respaldo: hacer todos los elementos visibles
    document.querySelectorAll('.reveal-element, .reveal-on-scroll, .fade-in-up, .scroll-reveal-section > *, .stagger-item').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}

// Función auxiliar para configurar animaciones especiales
function setupSpecialAnimations() {
  // Animación para tarjetas con efecto de elevación al scroll
  document.querySelectorAll('.card-rise').forEach((card, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregar animación con delay basado en índice
          setTimeout(() => {
            card.classList.add('card-risen');
          }, index * 100);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(card);
  });
  
  // Animación para líneas divisoras que se expanden
  document.querySelectorAll('.expanding-line').forEach((line) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          line.classList.add('line-expanded');
          observer.unobserve(line);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(line);
  });
}

// Función para inicializar efectos en botones
function initButtonEffects() {
  try {
    // Añadir efecto de ondas a botones con clase ripple-button
    const rippleButtons = document.querySelectorAll('.ripple-button');
    
    rippleButtons.forEach(button => {
      // Solo agregar el evento si no tiene ya uno
      if (!button.hasAttribute('data-ripple-initialized')) {
        button.setAttribute('data-ripple-initialized', 'true');
        
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
      }
    });
    
    // Efecto de pulso para botones CTA
    document.querySelectorAll('.btn-animated, .cta-button').forEach(button => {
      if (!button.hasAttribute('data-pulse-initialized')) {
        button.setAttribute('data-pulse-initialized', 'true');
        
        button.addEventListener('mouseover', function() {
          this.classList.add('pulse-once');
          setTimeout(() => {
            this.classList.remove('pulse-once');
          }, 600);
        });
      }
    });
    
    // Efectos de hover para botones
    document.querySelectorAll('.hover-effect-button').forEach(button => {
      if (!button.hasAttribute('data-hover-initialized')) {
        button.setAttribute('data-hover-initialized', 'true');
        
        const createGlowElement = () => {
          const glow = document.createElement('span');
          glow.classList.add('button-glow');
          button.appendChild(glow);
          return glow;
        };
        
        let glow = button.querySelector('.button-glow') || createGlowElement();
        
        button.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          glow.style.left = `${x}px`;
          glow.style.top = `${y}px`;
          glow.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
          glow.style.opacity = '0';
        });
      }
    });
  } catch (error) {
    console.error('Error al inicializar efectos de botones:', error);
  }
}

// Función para manejar transiciones entre páginas
function initPageTransitions() {
  try {
    // Crear el elemento de transición si no existe
    let pageTransition = document.querySelector('.page-transition');
    if (!pageTransition) {
      pageTransition = document.createElement('div');
      pageTransition.className = 'page-transition';
      document.body.appendChild(pageTransition);
    }
    
    // Marcar como cargada después de un breve retraso
    setTimeout(() => {
      pageTransition.classList.add('loaded');
    }, 50);
    
    // Gestión de eventos de navegación con Astro
    if (typeof document.addEventListener === 'function') {
      // Evento antes de cambiar de página
      document.addEventListener('astro:before-swap', () => {
        if (pageTransition) {
          pageTransition.classList.remove('loaded');
        }
      });
      
      // Evento después de cambiar de página
      document.addEventListener('astro:after-swap', () => {
        // Reinicializar las transiciones y otras animaciones
        setTimeout(() => {
          const newPageTransition = document.querySelector('.page-transition');
          if (newPageTransition) {
            newPageTransition.classList.add('loaded');
          }
          
          // Reasignar eventos a enlaces
          addLinkTransitions();
          
          // Reinicializar otras animaciones
          initScrollAnimations();
          initButtonEffects();
          initHoverEffects();
          initTextAnimations();
          initCounterAnimations();
        }, 50);
      });
    }
    
    // Para navegadores que no soportan la API View Transitions
    addLinkTransitions();
    
  } catch (error) {
    console.error('Error al inicializar transiciones de página:', error);
  }
}

// Función auxiliar para añadir eventos de transición a enlaces
function addLinkTransitions() {
  document.querySelectorAll('a').forEach(link => {
    // Solo aplicar a enlaces internos (misma página o dominio) y que no tengan ya el evento
    if (link.href && 
        (link.href.startsWith(window.location.origin) || link.href.startsWith('/')) && 
        !link.hasAttribute('data-transition')) {
      
      link.setAttribute('data-transition', 'true');
      
      link.addEventListener('click', e => {
        // Si no es un modificador (como Ctrl+click para abrir en nueva pestaña)
        // y no es un enlace de anclaje interno (#)
        if (!e.ctrlKey && !e.metaKey && !link.href.endsWith('#') && 
            !(link.getAttribute('href') && link.getAttribute('href').startsWith('#'))) {
          
          e.preventDefault();
          
          // Añadir animación de salida
          document.body.classList.add('page-transition-out');
          
          // Animación adicional en elemento de transición
          const pageTransition = document.querySelector('.page-transition');
          if (pageTransition) {
            pageTransition.classList.remove('loaded');
          }
          
          // Navegar después de un retraso breve
          setTimeout(() => {
            window.location.href = link.href;
          }, 400);
        }
      });
    }
  });
}

// Función para añadir efectos parallax
function initParallaxEffects() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Aplicar a elementos con clase parallax
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = el.dataset.speed || 0.2;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

// Efectos hover mejorados
function initHoverEffects() {
  try {
    // Tarjetas con efecto hover
    document.querySelectorAll('.card-hover').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('hovering');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hovering');
      });
    });
    
    // Imágenes con zoom
    document.querySelectorAll('.img-zoom').forEach(container => {
      const img = container.querySelector('img');
      if (img) {
        container.addEventListener('mouseenter', () => {
          img.style.transform = 'scale(1.05)';
        });
        
        container.addEventListener('mouseleave', () => {
          img.style.transform = 'scale(1)';
        });
      }
    });
    
    // Texto con subrayado en hover
    document.querySelectorAll('.highlight-text').forEach(text => {
      text.addEventListener('mouseenter', function() {
        const underline = this.querySelector('.highlight-underline');
        if (underline) {
          underline.style.width = '100%';
        }
      });
      
      text.addEventListener('mouseleave', function() {
        const underline = this.querySelector('.highlight-underline');
        if (underline) {
          underline.style.width = '0';
        }
      });
    });
  } catch (error) {
    console.error('Error al inicializar efectos hover:', error);
  }
}

// Animaciones para textos
function initTextAnimations() {
  try {
    // Texto con efecto de máquina de escribir
    document.querySelectorAll('.typewriter').forEach(element => {
      const text = element.textContent;
      const speed = element.dataset.speed || 50; // milisegundos por caracter
      
      if (element.dataset.animated !== 'true') {
        element.dataset.animated = 'true';
        element.textContent = '';
        
        let i = 0;
        function typeWriter() {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
        
        // Iniciar efecto cuando sea visible
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              typeWriter();
              observer.unobserve(element);
            }
          });
        });
        
        observer.observe(element);
      }
    });
    
    // Texto con revelado gradual de caracteres
    document.querySelectorAll('.char-reveal').forEach(element => {
      if (element.dataset.animated !== 'true') {
        element.dataset.animated = 'true';
        
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement('span');
          span.textContent = text[i];
          span.style.opacity = '0';
          span.style.transition = `opacity 0.03s ease ${i * 0.03}s`;
          element.appendChild(span);
        }
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              Array.from(element.children).forEach(span => {
                span.style.opacity = '1';
              });
              observer.unobserve(element);
            }
          });
        });
        
        observer.observe(element);
      }
    });
  } catch (error) {
    console.error('Error al inicializar animaciones de texto:', error);
  }
}

// Animaciones de contador
function initCounterAnimations() {
  try {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = parseInt(counter.getAttribute('data-duration') || '2000', 10);
      const countTo = parseInt(counter.innerText, 10) || 0;
      
      if (counter.dataset.animated !== 'true' && !isNaN(target)) {
        counter.dataset.animated = 'true';
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              let current = countTo;
              const increment = (target - countTo) / (duration / 16);
              const timer = setInterval(() => {
                current += increment;
                counter.innerText = Math.floor(current);
                
                if (current >= target) {
                  counter.innerText = target;
                  clearInterval(timer);
                }
              }, 16);
              
              observer.unobserve(counter);
            }
          });
        });
        
        observer.observe(counter);
      }
    });
  } catch (error) {
    console.error('Error al inicializar animaciones de contador:', error);
  }
}

// Función para inicializar las animaciones de subrayado
function initUnderlineAnimations() {
  try {
    // Opciones para el observador de intersección
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    // Crear un observador para elementos con clase title-underline
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Desconectar después de animar una vez
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observar todos los elementos con la clase title-underline
    document.querySelectorAll('.title-underline').forEach(el => {
      observer.observe(el);
    });
    
    // Animación para líneas expandibles
    document.querySelectorAll('.expanding-line').forEach(line => {
      const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            line.classList.add('line-expanded');
            lineObserver.unobserve(line);
          }
        });
      }, options);
      
      lineObserver.observe(line);
    });
  } catch (error) {
    console.error('Error al inicializar animaciones de subrayado:', error);
    
    // Plan de respaldo: hacer todos los elementos visibles
    document.querySelectorAll('.title-underline, .expanding-line').forEach(el => {
      if (el.classList.contains('title-underline')) {
        el.classList.add('visible');
      } else if (el.classList.contains('expanding-line')) {
        el.classList.add('line-expanded');
      }
    });
  }
}

// Exportar funciones para uso en componentes específicos
export { 
  initScrollAnimations, 
  initButtonEffects, 
  initPageTransitions, 
  initParallaxEffects,
  initHoverEffects,
  initTextAnimations,
  initCounterAnimations,
  initUnderlineAnimations
};
