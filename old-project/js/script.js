/* eslint-disable no-unused-vars */

// ===== VARIABLES GLOBALES =====
let currentSection = 0;
const sections = ["inicio", "casos", "acerca", "contacto"];
const projectSections = ["resumen", "proceso", "solucion", "resultados"]; // Secciones dentro de un caso de estudio
let isScrolling = false;
let touchStartX = 0;
let touchStartY = 0;

// ===== UTILIDADES =====
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split("/").pop();
    return filename.replace(".html", "") || "index";
}

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
    };
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

// ===== INICIALIZACIÓN DE MÓDULOS =====
async function initializeModules() {
    if (typeof TemplateLoader !== "undefined") {
        window.templateLoader = new TemplateLoader();
    }
    if (typeof Navigation !== "undefined") {
        window.navigation = new Navigation();
        await window.navigation.init();
    }
    if (typeof ProjectManager !== "undefined") {
        window.projectManager = new ProjectManager();
        await window.projectManager.init();
    }
}

// ===== NAVEGACIÓN UNIFICADA (PARA index.html) =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll(".nav-link[data-section]");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute("data-section");
            navigateToSection(targetSection);
        });
    });
}

function navigateToSection(sectionId) {
    const sectionIndex = sections.indexOf(sectionId);
    if (sectionIndex === -1) return;
    
    currentSection = sectionIndex;
    
    if (window.innerWidth >= 992) {
        scrollToHorizontalSection(sectionIndex);
    } else {
        scrollToVerticalSection(sectionId);
    }
    
    updateActiveSection(sectionId);
    updateArrowStates();
}

function updateActiveSection(sectionId) {
    document.querySelectorAll(".sidebar .nav-link, .topnav .nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
        }
    });
}

// ===== NAVEGACIÓN RESPONSIVE (PARA index.html) =====
function initializeResponsiveNavigation() {
    if (window.innerWidth >= 992) {
        initializeDesktopNavigation();
    } else {
        initializeMobileNavigation();
    }
}

function initializeDesktopNavigation() {
    document.addEventListener("wheel", function(e) {
        if (window.innerWidth < 992) return;
        e.preventDefault();
        if (isScrolling) return;
        const delta = e.deltaY || e.deltaX;
        const threshold = 50;
        if (Math.abs(delta) > threshold) {
            if (delta > 0 && currentSection < sections.length - 1) {
                currentSection++;
                navigateToSection(sections[currentSection]);
            } else if (delta < 0 && currentSection > 0) {
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        }
    }, { passive: false });
    
    document.addEventListener("keydown", function(e) {
        if (window.innerWidth < 992) return;
        switch(e.key) {
            case "ArrowRight":
            case "ArrowDown":
            case " ": 
                e.preventDefault();
                if (currentSection < sections.length - 1) {
                    currentSection++;
                    navigateToSection(sections[currentSection]);
                }
                break;
            case "ArrowLeft":
            case "ArrowUp":
                e.preventDefault();
                if (currentSection > 0) {
                    currentSection--;
                    navigateToSection(sections[currentSection]);
                }
                break;
            case "Home":
                e.preventDefault();
                currentSection = 0;
                navigateToSection(sections[currentSection]);
                break;
            case "End":
                e.preventDefault();
                currentSection = sections.length - 1;
                navigateToSection(sections[currentSection]);
                break;
        }
    });
    
    document.addEventListener("touchstart", function(e) {
        if (window.innerWidth < 992) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener("touchend", function(e) {
        if (window.innerWidth < 992) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSection < sections.length - 1) {
                currentSection++;
                navigateToSection(sections[currentSection]);
            } else if (diffX < 0 && currentSection > 0) {
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
            if (diffY > 0 && currentSection < sections.length - 1) {
                currentSection++;
                navigateToSection(sections[currentSection]);
            } else if (diffY < 0 && currentSection > 0) {
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        }
    }, { passive: true });
}

function scrollToHorizontalSection(index) {
    const sectionsContainer = document.querySelector(".sections-container");
    if (!sectionsContainer) return;
    isScrolling = true;
    const translateX = -index * 100;
    sectionsContainer.style.transform = `translateX(${translateX}vw)`;
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

function initializeMobileNavigation() {
    window.addEventListener("scroll", throttle(updateActiveSectionOnScroll, 100));
}

function scrollToVerticalSection(sectionId) {
    const targetElement = document.querySelector(`#${sectionId}`);
    if (!targetElement) return;
    const offsetTop = targetElement.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
    });
}

function updateActiveSectionOnScroll() {
    if (window.innerWidth >= 992) return;
    const scrollPosition = window.scrollY + 100;
    const mobileSections = document.querySelectorAll(".section[data-section]");
    let activeSection = "inicio";
    mobileSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = section.getAttribute("data-section");
        }
    });
    updateActiveSection(activeSection);
    const sectionIndex = sections.indexOf(activeSection);
    if (sectionIndex !== -1) {
        currentSection = sectionIndex;
    }
}

// ===== FLECHAS DE NAVEGACIÓN (PARA index.html) =====
function initializeNavigationArrows() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", function() {
            if (currentSection > 0) {
                currentSection--;
                navigateToSection(sections[currentSection]);
            }
        });
        nextBtn.addEventListener("click", function() {
            if (currentSection < sections.length - 1) {
                currentSection++;
                navigateToSection(sections[currentSection]);
            }
        });
    }
}

function updateArrowStates() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn && nextBtn) {
        if (currentSection === 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = "0.3";
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = "0.7";
        }
        if (currentSection === sections.length - 1) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = "0.3";
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = "0.7";
        }
    }
}

// ===== MANEJO RESPONSIVE GENERAL =====
function handleResponsiveLayout() {
    const currentPage = getCurrentPageName();
    if (currentPage === "index") {
        if (window.innerWidth >= 992) {
            scrollToHorizontalSection(currentSection);
            updateArrowStates();
        } else {
            const currentSectionId = sections[currentSection];
            setTimeout(() => {
                scrollToVerticalSection(currentSectionId);
            }, 100);
        }
    } else if (currentPage === "project") {
        // La navegación de proyectos se maneja dentro de ProjectManager
        // Aquí solo se asegura que el scroll horizontal se aplique si es desktop
        if (window.innerWidth >= 992) {
            // Si estamos en una página de proyecto, el ProjectManager ya se encarga del scroll
            // Pero necesitamos asegurar que el currentSection para projectSections se inicialice
            // Esto se hará en ProjectManager.js
        }
    }
}

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener("DOMContentLoaded", async function() {
    await initializeModules();

    const currentPage = getCurrentPageName();

    if (currentPage === "index") {
        initializeNavigation();
        initializeResponsiveNavigation();
        initializeNavigationArrows();

        const hash = window.location.hash.replace("#", "");
        const targetSection = hash && sections.includes(hash) ? hash : "inicio";
        const sectionIndex = sections.indexOf(targetSection);

        if (sectionIndex !== -1) {
            currentSection = sectionIndex;
        }
        updateActiveSection(targetSection);
        updateArrowStates();
        handleResponsiveLayout();
    } else if (currentPage === "project") {
        // Para páginas de proyecto, la lógica de carga y navegación se maneja en ProjectManager
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get("id");
        if (projectId) {
            await window.projectManager.loadProjectContent(projectId);
        }
        // Inicializar navegación específica de proyecto (flechas, etc.)
        window.projectManager.initializeProjectNavigationButtons();
        window.projectManager.updateProjectNavigationButtons();
    }

    initializeAnimations();
    initializeHoverEffects();
});

window.addEventListener("resize", debounce(function() {
    handleResponsiveLayout();
    // Si estamos en una página de proyecto, también actualizar su layout
    const currentPage = getCurrentPageName();
    if (currentPage === "project") {
        window.projectManager.handleProjectResponsiveLayout();
    }
}, 250));

// ===== ANIMACIONES Y EFECTOS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
            }
        });
    }, observerOptions);
    document.querySelectorAll(".project-card, .contact-info, .translation-services").forEach(el => {
        observer.observe(el);
    });
}

function initializeHoverEffects() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", function() {
            if (!this.classList.contains("active")) {
                this.style.transform = "scale(1.05)";
            }
        });
        link.addEventListener("mouseleave", function() {
            if (!this.classList.contains("active")) {
                this.style.transform = "scale(1)";
            }
        });
    });
}

// Exponer funciones globales si es necesario para otros módulos
window.navigateToSection = navigateToSection;
window.updateActiveSection = updateActiveSection;
window.updateArrowStates = updateArrowStates;
window.getCurrentPageName = getCurrentPageName;

