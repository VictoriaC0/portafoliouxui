/**
 * Navigation - Módulo para gestionar la navegación del sitio
 */
class Navigation {
    constructor() {
        this.templateLoader = new TemplateLoader();
    }

    /**
     * Inicializa la navegación cargando el template
     */
    async init() {
        const container = document.getElementById('navigation-container');
        if (!container) return;

        try {
            // Cargar template de navegación solo si existe el contenedor
            await this.templateLoader.renderTemplate('navigation', {}, 'navigation-container');
            
            // Inicializar eventos de navegación
            this.initializeNavigationEvents();
            
            // Actualizar estado activo según la página actual
            this.updateActiveState();
        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }

    /**
     * Inicializa los eventos de navegación
     */
    initializeNavigationEvents() {
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigationClick(e, link);
            });
        });
    }

    /**
     * Maneja los clicks en los enlaces de navegación
     * @param {Event} e - Evento de click
     * @param {HTMLElement} link - Elemento del enlace
     */
    handleNavigationClick(e, link) {
        const href = link.getAttribute('href');
        const dataSection = link.getAttribute('data-section');
        const currentPage = this.getCurrentPage();

        // Si estamos en una página de proyecto, siempre redirigir al index.html
        if (currentPage.startsWith('proyecto-') || currentPage.startsWith('caso-')) {
            // No prevenir el evento - dejar que el href del enlace funcione normalmente
            // Los enlaces ya tienen href="index.html#seccion"
            return;
        }

        // Si es un enlace interno (empieza con #), manejar con scroll
        if (href.startsWith('#')) {
            e.preventDefault();
            this.scrollToSection(dataSection);
        }
        // Si es un enlace a otra página, permitir navegación normal
        else {
            // No prevenir el comportamiento por defecto
        }
    }

    /**
     * Navega a una sección específica
     * @param {string} sectionId - ID de la sección
     */
    scrollToSection(sectionId) {
        // Usar la función existente del script principal si está disponible
        if (window.portfolioNavigation && window.portfolioNavigation.navigateToSection) {
            window.portfolioNavigation.navigateToSection(sectionId);
        } else {
            // Fallback: scroll suave a la sección
            const targetElement = document.querySelector(`#${sectionId}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    /**
     * Actualiza el estado activo de la navegación
     */
    updateActiveState() {
        const currentPage = this.getCurrentPage();
        const currentSection = this.getCurrentSection();

        // Remover clases activas
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Si estamos en una página de proyecto, marcar "Casos" como activo
        if (currentPage.startsWith('proyecto-') || currentPage.startsWith('caso-')) {
            const casosLink = document.querySelector('[data-section="casos"]');
            if (casosLink) {
                casosLink.classList.add('active');
            }
            return;
        }

        // Agregar clase activa según la página/sección actual (solo en index.html)
        if (currentSection) {
            const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    /**
     * Obtiene la página actual basada en la URL
     * @returns {string} - Nombre de la página actual
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace('.html', '') || 'index';
    }

    /**
     * Obtiene la sección actual basada en el hash de la URL
     * @returns {string} - ID de la sección actual
     */
    getCurrentSection() {
        const hash = window.location.hash.replace('#', '');
        return hash || 'inicio';
    }

    /**
     * Actualiza la navegación cuando cambia la URL
     */
    updateOnUrlChange() {
        window.addEventListener('hashchange', () => {
            this.updateActiveState();
        });
    }

    /**
     * Destruye la navegación y limpia eventos
     */
    destroy() {
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        navLinks.forEach(link => {
            link.removeEventListener('click', this.handleNavigationClick);
        });
        this.isLoaded = false;
    }
}

// Exportar para uso global
window.Navigation = Navigation;
