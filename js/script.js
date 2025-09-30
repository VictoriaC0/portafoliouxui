// ===== VARIABLES GLOBALES =====
let currentSection = 0;
const sections = ['inicio', 'exploraciones', 'acerca', 'contacto', 'traduccion'];
let isScrolling = false;
let touchStartX = 0;
let touchStartY = 0;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeResponsiveNavigation();
    initializeNavigationArrows();
    
    // Establecer sección activa inicial
    updateActiveSection('inicio');
    updateArrowStates();
    
    // Configurar overflow inicial según el tamaño de pantalla
    handleResponsiveLayout();
});

// ===== NAVEGACIÓN UNIFICADA =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            navigateToSection(targetSection);
        });
    });
}

function navigateToSection(sectionId) {
    const sectionIndex = sections.indexOf(sectionId);
    if (sectionIndex === -1) return;
    
    currentSection = sectionIndex;
    
    if (window.innerWidth >= 992) {
        // Desktop: scroll horizontal
        scrollToHorizontalSection(sectionIndex);
    } else {
        // Mobile: scroll vertical
        scrollToVerticalSection(sectionId);
    }
    
    updateActiveSection(sectionId);
    updateArrowStates();
}

function updateActiveSection(sectionId) {
    // Actualizar enlaces del sidebar (desktop)
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Actualizar enlaces del top nav (mobile)
    document.querySelectorAll('.topnav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// ===== NAVEGACIÓN RESPONSIVE =====
function initializeResponsiveNavigation() {
    if (window.innerWidth >= 992) {
        initializeDesktopNavigation();
    } else {
        initializeMobileNavigation();
    }
}

// ===== NAVEGACIÓN DESKTOP (HORIZONTAL) =====
function initializeDesktopNavigation() {
    // Prevenir scroll por defecto y convertir a horizontal
    document.addEventListener('wheel', function(e) {
        if (window.innerWidth < 992) return;
        
        e.preventDefault();
        
        if (isScrolling) return;
        
        const delta = e.deltaY || e.deltaX;
        const threshold = 50;
        
        if (Math.abs(delta) > threshold) {
            if (delta > 0 && currentSection < sections.length - 1) {
                // Scroll hacia abajo/derecha
                currentSection++;
                navigateToSection(sections[currentSection]);
            } else if (delta < 0 && currentSection > 0) {
                // Scroll hacia arriba/izquierda
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        }
    }, { passive: false });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (window.innerWidth < 992) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Spacebar
                e.preventDefault();
                if (currentSection < sections.length - 1) {
                    currentSection++;
                    navigateToSection(sections[currentSection]);
                }
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                if (currentSection > 0) {
                    currentSection--;
                    navigateToSection(sections[currentSection]);
                }
                break;
            case 'Home':
                e.preventDefault();
                currentSection = 0;
                navigateToSection(sections[currentSection]);
                break;
            case 'End':
                e.preventDefault();
                currentSection = sections.length - 1;
                navigateToSection(sections[currentSection]);
                break;
        }
    });
    
    // Touch gestures para desktop
    document.addEventListener('touchstart', function(e) {
        if (window.innerWidth < 992) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (window.innerWidth < 992) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Detectar swipe horizontal
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSection < sections.length - 1) {
                // Swipe left (next section)
                currentSection++;
                navigateToSection(sections[currentSection]);
            } else if (diffX < 0 && currentSection > 0) {
                // Swipe right (previous section)
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        }
        // Detectar swipe vertical
        else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
            if (diffY > 0 && currentSection < sections.length - 1) {
                // Swipe up (next section)
                currentSection++;
                navigateToSection(sections[currentSection]);
            } else if (diffY < 0 && currentSection > 0) {
                // Swipe down (previous section)
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        }
    }, { passive: true });
}

function scrollToHorizontalSection(index) {
    const sectionsContainer = document.querySelector('.sections-container');
    if (!sectionsContainer) return;
    
    isScrolling = true;
    const translateX = -index * 100; // -100vw per section
    
    sectionsContainer.style.transform = `translateX(${translateX}vw)`;
    
    // Reset scrolling flag after animation
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// ===== NAVEGACIÓN MÓVIL (VERTICAL) =====
function initializeMobileNavigation() {
    // Detectar sección activa en scroll vertical
    window.addEventListener('scroll', throttle(updateActiveSectionOnScroll, 100));
}

function scrollToVerticalSection(sectionId) {
    const targetElement = document.querySelector(`#${sectionId}`);
    if (!targetElement) return;
    
    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

function updateActiveSectionOnScroll() {
    if (window.innerWidth >= 992) return;
    
    const scrollPosition = window.scrollY + 100;
    const mobileSections = document.querySelectorAll('.section[data-section]');
    
    let activeSection = 'inicio';
    
    mobileSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = section.getAttribute('data-section');
        }
    });
    
    updateActiveSection(activeSection);
    
    // Actualizar currentSection para consistencia
    const sectionIndex = sections.indexOf(activeSection);
    if (sectionIndex !== -1) {
        currentSection = sectionIndex;
    }
}

// ===== FLECHAS DE NAVEGACIÓN =====
function initializeNavigationArrows() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSection > 0) {
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentSection < sections.length - 1) {
                currentSection++;
                navigateToSection(sections[currentSection]);
            }
        });
    }
}

function updateArrowStates() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        // Actualizar estado del botón anterior
        if (currentSection === 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '0.7';
        }
        
        // Actualizar estado del botón siguiente
        if (currentSection === sections.length - 1) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.3';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '0.7';
        }
    }
}

// ===== MANEJO RESPONSIVE =====
function handleResponsiveLayout() {
    if (window.innerWidth >= 992) {
        // Desktop mode
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        scrollToHorizontalSection(currentSection);
        updateArrowStates();
    } else {
        // Mobile mode
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        const currentSectionId = sections[currentSection];
        setTimeout(() => {
            scrollToVerticalSection(currentSectionId);
        }, 100);
    }
}

// ===== UTILIDADES =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== RESPONSIVE HANDLING =====
window.addEventListener('resize', debounce(function() {
    // Reinicializar navegación según el tamaño de pantalla
    handleResponsiveLayout();
}, 250));

// ===== ANIMACIONES Y EFECTOS =====
function initializeAnimations() {
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    document.querySelectorAll('.project-card, .contact-info, .translation-services').forEach(el => {
        observer.observe(el);
    });
}

// ===== EFECTOS DE HOVER MEJORADOS =====
function initializeHoverEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Efectos para las flechas de navegación
    const arrows = document.querySelectorAll('.nav-arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-50%) scale(1.1)';
            }
        });
        
        arrow.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-50%) scale(1)';
        });
    });
}

// ===== INICIALIZACIÓN COMPLETA =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeHoverEffects();
});

// ===== PRELOADER (OPCIONAL) =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in inicial
    setTimeout(() => {
        const firstSection = document.querySelector('.section');
        if (firstSection) {
            firstSection.style.opacity = '1';
        }
    }, 100);
});

// ===== PREVENIR SCROLL POR DEFECTO EN DESKTOP =====
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth >= 992) {
        // Prevenir scroll por defecto
        document.addEventListener('scroll', function(e) {
            e.preventDefault();
            window.scrollTo(0, 0);
        }, { passive: false });
        
        // Prevenir scroll con teclas
        document.addEventListener('keydown', function(e) {
            const scrollKeys = ['PageUp', 'PageDown'];
            if (scrollKeys.includes(e.key) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                e.preventDefault();
            }
        });
    }
});

// ===== SMOOTH SCROLLING PARA ENLACES =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            navigateToSection(targetId);
        });
    });
});

// ===== NAVEGACIÓN CON NÚMEROS =====
document.addEventListener('keydown', function(e) {
    if (window.innerWidth < 992) return;
    
    const num = parseInt(e.key);
    if (num >= 1 && num <= sections.length) {
        e.preventDefault();
        currentSection = num - 1;
        navigateToSection(sections[currentSection]);
    }
});

// ===== DETECCIÓN DE DISPOSITIVOS TÁCTILES =====
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// ===== OPTIMIZACIÓN PARA DISPOSITIVOS TÁCTILES =====
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// ===== FUNCIONES PARA IMAGEN DE FONDO =====
function enableBackgroundImage(imageUrl) {
    const body = document.body;
    const backgroundDiv = document.createElement('div');
    
    backgroundDiv.className = 'background-image';
    backgroundDiv.style.backgroundImage = `url(${imageUrl})`;
    
    body.appendChild(backgroundDiv);
    body.classList.add('has-background-image');
}

function disableBackgroundImage() {
    const body = document.body;
    const backgroundDiv = document.querySelector('.background-image');
    
    if (backgroundDiv) {
        backgroundDiv.remove();
    }
    
    body.classList.remove('has-background-image');
}

// ===== EXPORTAR FUNCIONES PARA USO EXTERNO =====
window.portfolioNavigation = {
    navigateToSection,
    enableBackgroundImage,
    disableBackgroundImage,
    getCurrentSection: () => sections[currentSection]
};
