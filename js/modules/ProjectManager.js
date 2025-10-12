/**
 * ProjectManager - Módulo para gestionar los proyectos del portafolio
 */
class ProjectManager {
    constructor() {
        this.templateLoader = new TemplateLoader();
        this.projects = [];
        this.currentProject = null;
    }

    /**
     * Inicializa el gestor de proyectos
     */
    async init() {
        // Definir los proyectos
        this.projects = [
            {
                id: 'proyecto-1',
                title: 'Digitalización de Procesos',
                description: 'Transformación digital de procesos administrativos para mejorar la eficiencia operacional y la experiencia del usuario.',
                image: 'https://via.placeholder.com/400x300/72EBFF/1E1E1E?text=Digitalización',
                tags: ['UX Research', 'Process Design', 'Digital Transformation'],
                link: 'proyecto-1.html',
                caseData: {
                    CASE_TITLE: 'Digitalización de Procesos',
                    CASE_SUBTITLE: 'Transformación digital de procesos administrativos',
                    CONTEXT: 'Una empresa tradicional necesitaba modernizar sus procesos administrativos para mejorar la eficiencia y reducir errores.',
                    CHALLENGE: 'Migrar procesos analógicos a digitales manteniendo la usabilidad y aceptación del usuario.',
                    METHODOLOGY: 'Design Thinking con enfoque en investigación de usuarios y prototipado iterativo.',
                    RESEARCH: 'Entrevistas con usuarios, análisis de tareas y mapeo de procesos actuales.',
                    SOLUTION_DESCRIPTION: 'Diseñamos una plataforma digital intuitiva que digitaliza los procesos clave manteniendo la simplicidad de uso.',
                    FEATURES_LIST: '<li>Interfaz intuitiva y accesible</li><li>Automatización de tareas repetitivas</li><li>Dashboard de seguimiento en tiempo real</li>',
                    KEY_IMPACT: 'Reducción del 60% en tiempo de procesamiento y mejora del 80% en satisfacción del usuario.',
                    METRICS: '<div class="metric-item"><h5>60%</h5><p>Reducción de tiempo</p></div><div class="metric-item"><h5>80%</h5><p>Satisfacción usuario</p></div>',
                    LEARNINGS: 'La clave está en mantener la simplicidad mientras se agrega funcionalidad avanzada.',
                    NEXT_STEPS: 'Implementar funcionalidades de análisis predictivo y expandir a otros departamentos.',
                    NEXT_PROJECT_LINK: 'proyecto-2.html'
                }
            },
            {
                id: 'proyecto-2',
                title: 'App de Gestión Financiera',
                description: 'Aplicación móvil para gestión personal de finanzas con enfoque en educación financiera y control de gastos.',
                image: 'https://via.placeholder.com/400x300/8a2be2/1E1E1E?text=App+Financiera',
                tags: ['Mobile Design', 'Financial UX', 'Data Visualization'],
                link: 'proyecto-2.html',
                caseData: {
                    CASE_TITLE: 'App de Gestión Financiera',
                    CASE_SUBTITLE: 'Control financiero personal al alcance de todos',
                    CONTEXT: 'Crear una aplicación que ayude a las personas a gestionar sus finanzas personales de manera simple y educativa.',
                    CHALLENGE: 'Simplificar conceptos financieros complejos y crear una experiencia motivadora para el usuario.',
                    METHODOLOGY: 'Design Centrado en el Usuario con énfasis en investigación cualitativa y testing de usabilidad.',
                    RESEARCH: 'Entrevistas con usuarios de diferentes perfiles financieros y análisis de apps competidoras.',
                    SOLUTION_DESCRIPTION: 'Una app que combina gestión práctica con educación financiera a través de micro-interacciones.',
                    FEATURES_LIST: '<li>Categorización automática de gastos</li><li>Metas financieras visuales</li><li>Educación financiera gamificada</li>',
                    KEY_IMPACT: 'Aumento del 45% en el ahorro de usuarios y mejora del 70% en conocimiento financiero.',
                    METRICS: '<div class="metric-item"><h5>45%</h5><p>Aumento en ahorro</p></div><div class="metric-item"><h5>70%</h5><p>Mejora en conocimiento</p></div>',
                    LEARNINGS: 'La gamificación y la educación son clave para mantener el engagement en apps financieras.',
                    NEXT_STEPS: 'Desarrollar funcionalidades de inversión y expandir a mercados internacionales.',
                    NEXT_PROJECT_LINK: 'proyecto-3.html'
                }
            },
            {
                id: 'proyecto-3',
                title: 'Plataforma de E-learning',
                description: 'Plataforma web para educación online con herramientas de colaboración y seguimiento del progreso estudiantil.',
                image: 'https://via.placeholder.com/400x300/3cb371/1E1E1E?text=E-learning',
                tags: ['Web Platform', 'Educational UX', 'Collaboration Tools'],
                link: 'proyecto-3.html',
                caseData: {
                    CASE_TITLE: 'Plataforma de E-learning',
                    CASE_SUBTITLE: 'Educación online colaborativa y efectiva',
                    CONTEXT: 'Una institución educativa necesitaba una plataforma para ofrecer cursos online con herramientas de colaboración.',
                    CHALLENGE: 'Crear una experiencia de aprendizaje online que mantenga la participación y colaboración entre estudiantes.',
                    METHODOLOGY: 'Diseño de Experiencia de Usuario (UX) con investigación en educación digital y testing iterativo.',
                    RESEARCH: 'Análisis de plataformas existentes, entrevistas con educadores y estudiantes, y estudios de engagement.',
                    SOLUTION_DESCRIPTION: 'Una plataforma que combina contenido educativo con herramientas sociales y de colaboración.',
                    FEATURES_LIST: '<li>Sistema de progreso visual</li><li>Herramientas de colaboración en tiempo real</li><li>Contenido interactivo y multimedia</li>',
                    KEY_IMPACT: 'Incremento del 85% en completion rate y mejora del 60% en satisfacción estudiantil.',
                    METRICS: '<div class="metric-item"><h5>85%</h5><p>Completion rate</p></div><div class="metric-item"><h5>60%</h5><p>Satisfacción estudiantil</p></div>',
                    LEARNINGS: 'La colaboración y el feedback inmediato son fundamentales para el éxito en educación online.',
                    NEXT_STEPS: 'Implementar IA para personalización de contenido y expandir herramientas de evaluación.',
                    NEXT_PROJECT_LINK: 'proyecto-1.html'
                }
            }
        ];

        // Renderizar proyectos en la página principal si estamos en index
        if (this.getCurrentPage() === 'index') {
            await this.renderProjects();
        }
    }

    /**
     * Renderiza los proyectos en la sección de casos
     */
    async renderProjects() {
        const container = document.querySelector('#casos .row.mt-5');
        if (!container) return;

        // Limpiar contenido existente
        container.innerHTML = '';

        // Renderizar cada proyecto
        for (const project of this.projects) {
            const projectData = {
                PROJECT_ID: project.id,
                PROJECT_TITLE: project.title,
                PROJECT_DESCRIPTION: project.description,
                PROJECT_IMAGE: project.image,
                PROJECT_TAGS: project.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join(''),
                PROJECT_LINK: project.link
            };

            const projectHTML = await this.templateLoader.renderTemplate('project-card', projectData);
            container.insertAdjacentHTML('beforeend', projectHTML);
        }

        // Agregar eventos a las tarjetas de proyectos
        this.attachProjectEvents();
    }

    /**
     * Agrega eventos a las tarjetas de proyectos
     */
    attachProjectEvents() {
        const projectCards = document.querySelectorAll('.project-card[data-project]');
        
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Evitar navegación si se hace click en el botón específico
                if (e.target.closest('.btn')) return;
                
                const projectId = card.getAttribute('data-project');
                const project = this.projects.find(p => p.id === projectId);
                
                if (project) {
                    window.location.href = project.link;
                }
            });

            // Efecto hover mejorado
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    /**
     * Carga los datos de un proyecto específico
     * @param {string} projectId - ID del proyecto
     * @returns {Object|null} - Datos del proyecto o null si no se encuentra
     */
    getProjectData(projectId) {
        return this.projects.find(project => project.id === projectId) || null;
    }

    /**
     * Renderiza una página de caso específica
     * @param {string} projectId - ID del proyecto
     */
    async renderCasePage(projectId) {
        const project = this.getProjectData(projectId);
        if (!project) {
            console.error(`Project ${projectId} not found`);
            return;
        }

        // Renderizar navegación
        const navigation = new Navigation();
        await navigation.init();

        // Aplicar datos del caso a la página
        this.applyCaseData(project.caseData);
    }

    /**
     * Aplica los datos del caso a los elementos de la página
     * @param {Object} caseData - Datos del caso
     */
    applyCaseData(caseData) {
        Object.keys(caseData).forEach(key => {
            const placeholder = `{{${key}}}`;
            const elements = document.querySelectorAll(`*:contains("${placeholder}")`);
            
            // Buscar elementos que contengan el placeholder
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.innerHTML && element.innerHTML.includes(placeholder)) {
                    element.innerHTML = element.innerHTML.replace(new RegExp(placeholder, 'g'), caseData[key]);
                }
            });
        });
    }

    /**
     * Obtiene la página actual
     * @returns {string} - Nombre de la página actual
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace('.html', '') || 'index';
    }
}

// Exportar para uso global
window.ProjectManager = ProjectManager;
