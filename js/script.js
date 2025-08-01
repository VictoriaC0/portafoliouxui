// Funcionalidad para las tabs
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tabs
    initializeTabs();
    
    // Inicializar navegación
    initializeNavigation();
    
    // Inicializar efectos de hover
    initializeHoverEffects();
});

/**
 * Inicializa la funcionalidad de las tabs
 */
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todas las tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Agregar clase active a la tab clickeada
            this.classList.add('active');
            
            // Obtener el contenido de la tab
            const tabContent = this.textContent.trim();
            
            // Aquí podrías agregar lógica para mostrar/ocultar contenido específico
            handleTabChange(tabContent);
            
            console.log('Tab seleccionada:', tabContent);
        });
        
        // Agregar soporte para navegación con teclado
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Maneja el cambio de tabs
 * @param {string} tabContent - Contenido de la tab seleccionada
 */
function handleTabChange(tabContent) {
    // Aquí puedes agregar lógica específica para cada tab
    switch(tabContent) {
        case 'Proyectos UX / UI':
            showUXUIProjects();
            break;
        case 'Proyectos de Identidad Visual':
            showVisualIdentityProjects();
            break;
        default:
            console.log('Tab no reconocida:', tabContent);
    }
}

/**
 * Muestra proyectos UX/UI
 */
function showUXUIProjects() {
    // Lógica para mostrar proyectos UX/UI
    console.log('Mostrando proyectos UX/UI');
    // Aquí podrías filtrar o cambiar el contenido de las tarjetas
}

/**
 * Muestra proyectos de identidad visual
 */
function showVisualIdentityProjects() {
    // Lógica para mostrar proyectos de identidad visual
    console.log('Mostrando proyectos de identidad visual');
    // Aquí podrías filtrar o cambiar el contenido de las tarjetas
}

/**
 * Inicializa la funcionalidad de navegación
 */
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            const navContent = this.textContent.trim();
            console.log('Navegación seleccionada:', navContent);
            
            // Aquí podrías agregar navegación real o scroll a secciones
            handleNavigation(navContent);
        });
    });
}

/**
 * Maneja la navegación
 * @param {string} navContent - Contenido del elemento de navegación
 */
function handleNavigation(navContent) {
    switch(navContent) {
        case 'UMV':
            // Scroll al inicio o página principal
            scrollToTop();
            break;
        case 'Exploraciones':
            // Navegar a sección de exploraciones
            console.log('Navegando a Exploraciones');
            break;
        case 'Contacto':
            // Navegar a sección de contacto
            console.log('Navegando a Contacto');
            break;
        default:
            console.log('Navegación no reconocida:', navContent);
    }
}

/**
 * Scroll suave al inicio de la página
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Inicializa efectos de hover y animaciones
 */
function initializeHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Efecto al pasar el mouse
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Efecto al quitar el mouse
            this.style.transform = 'translateY(0)';
        });
        
        // Agregar funcionalidad de click a las tarjetas
        card.addEventListener('click', function() {
            const projectName = this.querySelector('.project-name').textContent;
            console.log('Proyecto seleccionado:', projectName);
            // Aquí podrías abrir un modal o navegar a la página del proyecto
        });
    });
}

/**
 * Función utilitaria para detectar dispositivos móviles
 */
function isMobileDevice() {
    return window.innerWidth <= 768;
}

/**
 * Función para manejar cambios de tamaño de ventana
 */
window.addEventListener('resize', function() {
    // Ajustar comportamiento según el tamaño de pantalla
    if (isMobileDevice()) {
        console.log('Vista móvil activada');
        // Lógica específica para móviles
    } else {
        console.log('Vista desktop activada');
        // Lógica específica para desktop
    }
});

/**
 * Función para manejar errores de carga de imágenes
 */
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Imagen de placeholder en caso de error
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjMyMSIgdmlld0JveD0iMCAwIDM2MCAzMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNjAiIGhlaWdodD0iMzIxIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE4MCIgeT0iMTYwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
            this.alt = 'Imagen no disponible';
        });
    });
});

// Exportar funciones para uso externo si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTabs,
        initializeNavigation,
        initializeHoverEffects,
        handleTabChange,
        handleNavigation
    };
}

