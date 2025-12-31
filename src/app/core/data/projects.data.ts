import { Project } from '../models/project.model';

export const PROJECTS_DATA: Project[] = [
    {
        id: 'proyecto-1',
        title: 'Digitalización de Procesos Internos',
        description: 'Rediseño de flujos administrativos para reducir tiempos de aprobación en un 60%',
        icon: 'file-text',
        tags: [
            { id: 'research', label: 'Research' },
            { id: 'ux', label: 'UX' },
            { id: 'prototyping', label: 'Prototyping' }
        ],
        link: '#/project/proyecto-1',
        order: 1,
        isActive: true,
        caseStudy: {
            title: 'Digitalización de Procesos Internos',
            subtitle: 'Transformación digital de flujos administrativos',
            context: 'Una empresa mediana enfrentaba largos tiempos de aprobación en procesos administrativos debido a flujos manuales y desconectados. Los empleados reportaban frustración y pérdida de productividad.',
            challenge: 'Reducir los tiempos de aprobación en al menos un 50% sin comprometer la trazabilidad ni aumentar significativamente los costos operativos.',
            methodology: 'Design Thinking + Lean UX. Realizamos workshops con stakeholders clave, mapeo de procesos existentes (As-Is), identificación de cuellos de botella, y diseño iterativo con validación continua.',
            research: 'Entrevistas con 15 usuarios internos, análisis de métricas de tiempo (promedio 8 días por aprobación), y benchmarking con soluciones de la industria.',
            solutionDescription: 'Plataforma web centralizada con dashboard unificado, notificaciones automáticas, firma digital, y tracking en tiempo real de cada solicitud.',
            features: [
                {
                    title: 'Dashboard Unificado',
                    description: 'Vista consolidada de todas las solicitudes pendientes con priorización inteligente'
                },
                {
                    title: 'Notificaciones Push',
                    description: 'Alertas instantáneas por email y app para mantener a todos informados'
                },
                {
                    title: 'Firma Digital',
                    description: 'Integración con certificados digitales para aprobaciones legalmente válidas'
                },
                {
                    title: 'Analytics en Tiempo Real',
                    description: 'Métricas de rendimiento y cuellos de botella visibles al instante'
                }
            ],
            keyImpact: 'Reducción del 60% en tiempos de aprobación (de 8 días a 3.2 días promedio)',
            metrics: [
                { label: 'Reducción de tiempo', value: '60%', description: 'De 8 días a 3.2 días promedio' },
                { label: 'Satisfacción del usuario', value: '80%', description: 'Encuesta post-implementación (NPS: 45)' },
                { label: 'Adopción', value: '95%', description: 'De usuarios target en 3 meses' },
                { label: 'ROI', value: '250%', description: 'En el primer año' }
            ],
            learnings: 'La resistencia al cambio fue un desafío importante. Implementamos un programa de capacitación escalonado y embajadores internos que facilitaron la adopción. La iteración temprana con usuarios reales fue clave para ajustar la interfaz.',
            nextSteps: 'Integración con sistemas ERP existentes, módulo de analytics avanzado con IA predictiva para identificar cuellos de botella antes de que ocurran, y expansión a procesos de recursos humanos.'
        }
    },
    {
        id: 'proyecto-2',
        title: 'App de Gestión Financiera Personal',
        description: 'Aplicación móvil para ayudar a usuarios a mejorar sus hábitos de ahorro',
        icon: 'currency-dollar',
        tags: [
            { id: 'mobile', label: 'Mobile' },
            { id: 'ui', label: 'UI' },
            { id: 'gamification', label: 'Gamification' }
        ],
        link: '#/project/proyecto-2',
        order: 2,
        isActive: true,
        caseStudy: {
            title: 'App de Gestión Financiera Personal',
            subtitle: 'Empoderando usuarios para tomar control de sus finanzas',
            context: 'Muchos millennials y gen Z carecen de educación financiera básica y no tienen herramientas accesibles para gestionar su dinero de forma efectiva. El mercado está saturado de apps complejas enfocadas en inversores experimentados.',
            challenge: 'Crear una experiencia simple, educativa y motivadora que ayude a usuarios sin conocimiento financiero a desarrollar hábitos de ahorro sostenibles.',
            methodology: 'User-Centered Design + Behavioral Economics. Investigación etnográfica con usuarios target, análisis de competencia, diseño de prototipos de baja y alta fidelidad, y testing de usabilidad iterativo.',
            research: '30 entrevistas en profundidad con usuarios de 22-35 años, análisis de 500 reseñas de apps competidoras, y diary studies de 2 semanas para entender patrones de gasto.',
            solutionDescription: 'App móvil con onboarding personalizado, presupuestos automáticos basados en ingresos, gamificación con metas y recompensas, y educación financiera contextual.',
            features: [
                {
                    title: 'Onboarding Inteligente',
                    description: 'Quiz personalizado que adapta la experiencia según perfil financiero y objetivos'
                },
                {
                    title: 'Presupuestos Automáticos',
                    description: 'Categorización inteligente de gastos y sugerencias de límites basadas en IA'
                },
                {
                    title: 'Gamificación',
                    description: 'Sistema de puntos, badges y desafíos semanales para mantener motivación'
                },
                {
                    title: 'Educación Contextual',
                    description: 'Tips financieros en el momento exacto cuando el usuario los necesita'
                }
            ],
            keyImpact: 'Aumento del 45% en tasa de ahorro de usuarios en primeros 3 meses',
            metrics: [
                { label: 'Incremento de ahorro', value: '45%', description: 'Promedio en usuarios activos después de 3 meses' },
                { label: 'Retención (30 días)', value: '68%', description: 'Benchmark de la industria: 25%' },
                { label: 'NPS', value: '58', description: 'Net Promoter Score alto para fintech' },
                { label: 'Conocimiento financiero', value: '+70%', description: 'Mejora según pre/post quiz' }
            ],
            learnings: 'La gamificación fue mucho más efectiva de lo esperado para mantener engagement. Sin embargo, algunos usuarios expresaron preocupación por privacidad de datos financieros, lo que nos llevó a añadir una sección de seguridad muy visible en el onboarding.',
            nextSteps: 'Integración con bancos locales para sincronización automática, módulo de asesoría financiera con IA, comunidad de usuarios para compartir tips, y versión web para gestión desde desktop.'
        }
    },
    {
        id: 'proyecto-3',
        title: 'Plataforma de E-learning Corporativo',
        description: 'Sistema de capacitación interna con seguimiento de progreso y certificaciones',
        icon: 'graduation-cap',
        tags: [
            { id: 'elearning', label: 'E-learning' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'admin', label: 'Admin Panel' }
        ],
        link: '#/project/proyecto-3',
        order: 3,
        isActive: true,
        caseStudy: {
            title: 'Plataforma de E-learning Corporativo',
            subtitle: 'Transformando la capacitación interna en experiencia digital',
            context: 'Una corporación multinacional con 5000+ empleados necesitaba modernizar su sistema de capacitación presencial, que era costoso, difícil de escalar y no permitía tracking efectivo del progreso.',
            challenge: 'Diseñar una plataforma que mantuviera la calidad de capacitación presencial pero con la flexibilidad y escalabilidad del formato digital, mientras se asegura alta tasa de completación.',
            methodology: 'Service Design + Agile UX. Mapeo de journey de empleados, co-diseño con instructores internos, sprints de 2 semanas con testing continuo, y análisis de métricas de engagement.',
            research: 'Entrevistas con 40 empleados y 10 instructores, shadowing de sesiones presenciales, análisis de datos de LMS anterior (tasa de completación: 23%), y análisis de mejores prácticas de plataformas MOOC.',
            solutionDescription: 'Plataforma web responsive con biblioteca de cursos multimedia, rutas de aprendizaje personalizadas, evaluaciones interactivas, certificaciones automáticas, y dashboard de admin para seguimiento.',
            features: [
                {
                    title: 'Rutas de Aprendizaje Personalizadas',
                    description: 'Cursos recomendados basados en rol, departamento y objetivos de carrera'
                },
                {
                    title: 'Contenido Multimedia',
                    description: 'Videos, quizzes interactivos, simulaciones y PDFs descargables'
                },
                {
                    title: 'Certificaciones Automáticas',
                    description: 'Generación de certificados digitales al completar cursos con aprobación'
                },
                {
                    title: 'Dashboard de Gestión',
                    description: 'Panel de admin para crear cursos, asignar capacitaciones y ver analytics'
                },
                {
                    title: 'Modo Offline',
                    description: 'Descarga de contenido para aprender sin conexión'
                }
            ],
            keyImpact: 'Tasa de completación de cursos subió de 23% a 85% en 6 meses',
            metrics: [
                { label: 'Tasa de completación', value: '85%', description: 'vs 23% anterior' },
                { label: 'Satisfacción estudiantes', value: '4.6/5', description: 'Promedio de ratings de cursos' },
                { label: 'Reducción de costos', value: '60%', description: 'Comparado con capacitaciones presenciales' },
                { label: 'Time to competency', value: '-40%', description: 'Empleados alcanzan competencias más rápido' }
            ],
            learnings: 'El contenido bite-sized (módulos de 5-10 min) tuvo mucha mejor adopción que cursos largos. También descubrimos que las notificaciones push eran contraproducentes y generaban rechazo, por lo que implementamos recordatorios más sutiles por email.',
            nextSteps: 'Integración con sistema de evaluación de desempeño, módulo de aprendizaje social (foros y peer review), creación de contenido con IA generativa, y gamificación con leaderboards y badges.'
        }
    }
];
