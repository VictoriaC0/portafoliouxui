/**
 * ProjectManager - Módulo para gestionar los proyectos del portafolio
 */
class ProjectManager {
    constructor() {
        this.templateLoader = new TemplateLoader();
        this.projects = [];
        this.currentProject = null;
        this.currentProjectIndex = -1;
        this.currentProjectSection = 0;
        this.projectSections = ["resumen", "proceso", "solucion", "resultados"];
        this.isScrolling = false;
    }

    /**
     * Inicializa el gestor de proyectos
     */
    async init() {
        this.projects = [
            {
                id: "proyecto-1",
                title: "Digitalización de Procesos",
                description: "Transformación digital de procesos administrativos para mejorar la eficiencia operacional y la experiencia del usuario.",
                image: "https://via.placeholder.com/400x300/72EBFF/1E1E1E?text=Digitalización",
                tags: ["UX Research", "Process Design", "Digital Transformation"],
                link: "project.html?id=proyecto-1",
                caseData: {
                    CASE_TITLE: "Digitalización de Procesos",
                    CASE_SUBTITLE: "Transformación digital de procesos administrativos",
                    CONTEXT: "Una empresa tradicional necesitaba modernizar sus procesos administrativos para mejorar la eficiencia y reducir errores.",
                    CHALLENGE: "Migrar procesos analógicos a digitales manteniendo la usabilidad y aceptación del usuario.",
                    METHODOLOGY: "Design Thinking con enfoque en investigación de usuarios y prototipado iterativo.",
                    RESEARCH: "Entrevistas con usuarios, análisis de tareas y mapeo de procesos actuales.",
                    SOLUTION_DESCRIPTION: "Diseñamos una plataforma digital intuitiva que digitaliza los procesos clave manteniendo la simplicidad de uso.",
                    FEATURES_LIST: "<li>Interfaz intuitiva y accesible</li><li>Automatización de tareas repetitivas</li><li>Dashboard de seguimiento en tiempo real</li>",
                    KEY_IMPACT: "Reducción del 60% en tiempo de procesamiento y mejora del 80% en satisfacción del usuario.",
                    METRICS: '<div class="metric-item"><h5>60%</h5><p>Reducción de tiempo</p></div><div class="metric-item"><h5>80%</h5><p>Satisfacción usuario</p></div>',
                    LEARNINGS: "La clave está en mantener la simplicidad mientras se agrega funcionalidad avanzada.",
                    NEXT_STEPS: "Implementar funcionalidades de análisis predictivo y expandir a otros departamentos.",
                    PREV_PROJECT_LINK: "project.html?id=proyecto-3",
                    NEXT_PROJECT_LINK: "project.html?id=proyecto-2"
                }
            },
            {
                id: "proyecto-2",
                title: "App de Gestión Financiera",
                description: "Aplicación móvil para gestión personal de finanzas con enfoque en educación financiera y control de gastos.",
                image: "https://via.placeholder.com/400x300/8a2be2/1E1E1E?text=App+Financiera",
                tags: ["Mobile Design", "Financial UX", "Data Visualization"],
                link: "project.html?id=proyecto-2",
                caseData: {
                    CASE_TITLE: "App de Gestión Financiera",
                    CASE_SUBTITLE: "Control financiero personal al alcance de todos",
                    CONTEXT: "Crear una aplicación que ayude a las personas a gestionar sus finanzas personales de manera simple y educativa.",
                    CHALLENGE: "Simplificar conceptos financieros complejos y crear una experiencia motivadora para el usuario.",
                    METHODOLOGY: "Diseño Centrado en el Usuario con énfasis en investigación cualitativa y testing de usabilidad.",
                    RESEARCH: "Entrevistas con usuarios de diferentes perfiles financieros y análisis de apps competidoras.",
                    SOLUTION_DESCRIPTION: "Una app que combina gestión práctica con educación financiera a través de micro-interacciones.",
                    FEATURES_LIST: "<li>Categorización automática de gastos</li><li>Metas financieras visuales</li><li>Educación financiera gamificada</li>",
                    KEY_IMPACT: "Aumento del 45% en el ahorro de usuarios y mejora del 70% en conocimiento financiero.",
                    METRICS: '<div class="metric-item"><h5>45%</h5><p>Aumento en ahorro</p></div><div class="metric-item"><h5>70%</h5><p>Mejora en conocimiento</p></div>',
                    LEARNINGS: "La gamificación y la educación son clave para mantener el engagement en apps financieras.",
                    NEXT_STEPS: "Desarrollar funcionalidades de inversión y expandir a mercados internacionales.",
                    PREV_PROJECT_LINK: "project.html?id=proyecto-1",
                    NEXT_PROJECT_LINK: "project.html?id=proyecto-3"
                }
            },
            {
                id: "proyecto-3",
                title: "Plataforma de E-learning",
                description: "Plataforma web para educación online con herramientas de colaboración y seguimiento del progreso estudiantil.",
                image: "https://via.placeholder.com/400x300/3cb371/1E1E1E?text=E-learning",
                tags: ["Web Platform", "Educational UX", "Collaboration Tools"],
                link: "project.html?id=proyecto-3",
                caseData: {
                    CASE_TITLE: "Plataforma de E-learning",
                    CASE_SUBTITLE: "Educación online colaborativa y efectiva",
                    CONTEXT: "Una institución educativa necesitaba una plataforma para ofrecer cursos online con herramientas de colaboración.",
                    CHALLENGE: "Crear una experiencia de aprendizaje online que mantenga la participación y colaboración entre estudiantes.",
                    METHODOLOGY: "Diseño de Experiencia de Usuario (UX) con investigación en educación digital y testing iterativo.",
                    RESEARCH: "Análisis de plataformas existentes, entrevistas con educadores y estudiantes, y estudios de engagement.",
                    SOLUTION_DESCRIPTION: "Una plataforma que combina contenido educativo con herramientas sociales y de colaboración.",
                    FEATURES_LIST: "<li>Sistema de progreso visual</li><li>Herramientas de colaboración en tiempo real</li><li>Contenido interactivo y multimedia</li>",
                    KEY_IMPACT: "Incremento del 85% en completion rate y mejora del 60% en satisfacción estudiantil.",
                    METRICS: '<div class="metric-item"><h5>85%</h5><p>Completion rate</p></div><div class="metric-item"><h5>60%</h5><p>Satisfacción estudiantil</p></div>',
                    LEARNINGS: "La colaboración y el feedback inmediato son fundamentales para el éxito en educación online.",
                    NEXT_STEPS: "Implementar IA para personalización de contenido y expandir herramientas de evaluación.",
                    PREV_PROJECT_LINK: "project.html?id=proyecto-2",
                    NEXT_PROJECT_LINK: "project.html?id=proyecto-1"
                }
            }
        ];

        if (getCurrentPageName() === "index") {
            await this.renderProjects();
        }
    }

    async renderProjects() {
        const container = document.querySelector("#casos .row.mt-5");
        if (!container) return;
        container.innerHTML = "";
        for (const project of this.projects) {
            const projectData = {
                PROJECT_ID: project.id,
                PROJECT_TITLE: project.title,
                PROJECT_DESCRIPTION: project.description,
                PROJECT_IMAGE: project.image,
                PROJECT_TAGS: project.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join(""),
                PROJECT_LINK: project.link
            };
            const projectHTML = await this.templateLoader.renderTemplate("project-card", projectData);
            container.insertAdjacentHTML("beforeend", projectHTML);
        }
        this.attachProjectEvents();
    }

    attachProjectEvents() {
        const projectCards = document.querySelectorAll(".project-card[data-project]");
        projectCards.forEach(card => {
            const viewButton = card.querySelector(".view-project");
            if (viewButton) {
                viewButton.addEventListener("click", (e) => {
                    e.preventDefault(); 
                    const projectId = viewButton.getAttribute("data-project");
                    if (projectId) {
                        window.location.href = `project.html?id=${projectId}`;
                    }
                });
            }
        });
    }

    getProjectData(projectId) {
        return this.projects.find(project => project.id === projectId) || null;
    }

    async loadProjectContent(projectId) {
        const project = this.getProjectData(projectId);
        if (!project) {
            console.error(`Project ${projectId} not found`);
            return;
        }

        this.currentProject = project;
        this.currentProjectIndex = this.projects.findIndex(p => p.id === projectId);

        try {
            const templateContent = await fetch("templates/case-template.html").then(res => res.text());
            if (!templateContent) {
                console.error("Failed to load case template");
                return;
            }

            let content = templateContent;
            Object.entries(project.caseData).forEach(([key, value]) => {
                content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
            });

            const sectionsContainer = document.querySelector(".sections-container");
            if (sectionsContainer) {
                sectionsContainer.innerHTML = content;
                this.initializeProjectNavigation();
            }

            this.initializeProjectNavigationButtons();
            this.updateProjectNavigationButtons();
            this.handleProjectResponsiveLayout();

        } catch (error) {
            console.error("Error loading project template:", error);
        }
    }

    initializeProjectNavigationButtons() {
        const prevBtn = document.getElementById("prevProjectBtn");
        const nextBtn = document.getElementById("nextProjectBtn");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                const prevProjectIndex = (this.currentProjectIndex - 1 + this.projects.length) % this.projects.length;
                const prevProjectId = this.projects[prevProjectIndex].id;
                window.location.href = `project.html?id=${prevProjectId}`;
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                const nextProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
                const nextProjectId = this.projects[nextProjectIndex].id;
                window.location.href = `project.html?id=${nextProjectId}`;
            });
        }
    }

    updateProjectNavigationButtons() {
        // Esta función puede ser usada para deshabilitar los botones si solo hay un proyecto, por ejemplo.
        // Por ahora, con navegación circular, no es estrictamente necesario.
    }

    initializeProjectNavigation() {
        if (window.innerWidth >= 992) {
            // Manejo del scroll con rueda del mouse
            document.addEventListener("wheel", (e) => {
                if (window.innerWidth < 992) return;
                e.preventDefault();
                if (this.isScrolling) return;

                const delta = e.deltaY || e.deltaX;
                const threshold = 50;

                if (Math.abs(delta) > threshold) {
                    if (delta > 0 && this.currentProjectSection < this.projectSections.length - 1) {
                        this.currentProjectSection++;
                        this.scrollToProjectSection(this.currentProjectSection);
                    } else if (delta < 0 && this.currentProjectSection > 0) {
                        this.currentProjectSection--;
                        this.scrollToProjectSection(this.currentProjectSection);
                    }
                }
            }, { passive: false });

            // Manejo de navegación con teclado
            document.addEventListener("keydown", (e) => {
                if (window.innerWidth < 992) return;
                switch(e.key) {
                    case "ArrowRight":
                    case "ArrowDown":
                        e.preventDefault();
                        if (this.currentProjectSection < this.projectSections.length - 1) {
                            this.currentProjectSection++;
                            this.scrollToProjectSection(this.currentProjectSection);
                        }
                        break;
                    case "ArrowLeft":
                    case "ArrowUp":
                        e.preventDefault();
                        if (this.currentProjectSection > 0) {
                            this.currentProjectSection--;
                            this.scrollToProjectSection(this.currentProjectSection);
                        }
                        break;
                }
            });

            // Manejo de eventos touch
            let touchStartX = 0;
            let touchStartY = 0;

            document.addEventListener("touchstart", (e) => {
                if (window.innerWidth < 992) return;
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            document.addEventListener("touchend", (e) => {
                if (window.innerWidth < 992) return;
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const diffX = touchStartX - touchEndX;
                const diffY = touchStartY - touchEndY;

                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0 && this.currentProjectSection < this.projectSections.length - 1) {
                        this.currentProjectSection++;
                        this.scrollToProjectSection(this.currentProjectSection);
                    } else if (diffX < 0 && this.currentProjectSection > 0) {
                        this.currentProjectSection--;
                        this.scrollToProjectSection(this.currentProjectSection);
                    }
                }
            }, { passive: true });
        }
    }

    scrollToProjectSection(index) {
        const sectionsContainer = document.querySelector(".sections-container");
        if (!sectionsContainer) return;
        
        this.isScrolling = true;
        const translateX = -index * 100;
        sectionsContainer.style.transform = `translateX(${translateX}vw)`;
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);

        this.currentProjectSection = index;
    }

    handleProjectResponsiveLayout() {
        if (window.innerWidth >= 992) {
            // Asegurarse de que la sección actual esté correctamente posicionada
            this.scrollToProjectSection(this.currentProjectSection);
        } else {
            // En móvil, resetear la transformación para permitir scroll vertical
            const sectionsContainer = document.querySelector(".sections-container");
            if (sectionsContainer) {
                sectionsContainer.style.transform = "none";
            }
        }
    }
}

// Exportar para uso global
window.ProjectManager = ProjectManager;
