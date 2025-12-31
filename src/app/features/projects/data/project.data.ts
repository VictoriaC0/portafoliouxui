import { Project } from '../models/project.model';

/**
 * Static project data provider
 * Contains all hardcoded project data migrated from vanilla JS
 */
export const PROJECT_DATA: Readonly<Project[]> = [
    {
        id: 'proyecto-1',
        title: 'Digitalización de Procesos',
        description: 'Transformación digital de procesos administrativos para mejorar la eficiencia operacional y la experiencia del usuario.',
        icon: 'device-mobile',
        tags: ['UX Research', 'Process Design', 'Digital Transformation'],
        link: 'project/proyecto-1',
        featured: true,
        category: 'Enterprise',
        caseData: {
            caseTitle: 'Digitalización de Procesos',
            caseSubtitle: 'Transformación digital de procesos administrativos',
            context: 'Una empresa tradicional necesitaba modernizar sus procesos administrativos para mejorar la eficiencia y reducir errores.',
            challenge: 'Migrar procesos analógicos a digitales manteniendo la usabilidad y aceptación del usuario.',
            methodology: 'Design Thinking con enfoque en investigación de usuarios y prototipado iterativo.',
            research: 'Entrevistas con usuarios, análisis de tareas y mapeo de procesos actuales.',
            solutionDescription: 'Diseñamos una plataforma digital intuitiva que digitaliza los procesos clave manteniendo la simplicidad de uso.',
            featuresList: '<li>Interfaz intuitiva y accesible</li><li>Automatización de tareas repetitivas</li><li>Dashboard de seguimiento en tiempo real</li>',
            keyImpact: 'Reducción del 60% en tiempo de procesamiento y mejora del 80% en satisfacción del usuario.',
            metrics: '<div class="metric-item"><h5>60%</h5><p>Reducción de tiempo</p></div><div class="metric-item"><h5>80%</h5><p>Satisfacción usuario</p></div>',
            learnings: 'La clave está en mantener la simplicidad mientras se agrega funcionalidad avanzada.',
            nextSteps: 'Implementar funcionalidades de análisis predictivo y expandir a otros departamentos.'
        }
    },
    {
        id: 'proyecto-2',
        title: 'App de Gestión Financiera',
        description: 'Aplicación móvil para gestión personal de finanzas con enfoque en educación financiera y control de gastos.',
        icon: 'device-mobile',
        tags: ['Mobile Design', 'Financial UX', 'Data Visualization'],
        link: 'project/proyecto-2',
        featured: true,
        category: 'Mobile',
        caseData: {
            caseTitle: 'App de Gestión Financiera',
            caseSubtitle: 'Control financiero personal al alcance de todos',
            context: 'Crear una aplicación que ayude a las personas a gestionar sus finanzas personales de manera simple y educativa.',
            challenge: 'Simplificar conceptos financieros complejos y crear una experiencia motivadora para el usuario.',
            methodology: 'Diseño Centrado en el Usuario con énfasis en investigación cualitativa y testing de usabilidad.',
            research: 'Entrevistas con usuarios de diferentes perfiles financieros y análisis de apps competidoras.',
            solutionDescription: 'Una app que combina gestión práctica con educación financiera a través de micro-interacciones.',
            featuresList: '<li>Categorización automática de gastos</li><li>Metas financieras visuales</li><li>Educación financiera gamificada</li>',
            keyImpact: 'Aumento del 45% en el ahorro de usuarios y mejora del 70% en conocimiento financiero.',
            metrics: '<div class="metric-item"><h5>45%</h5><p>Aumento en ahorro</p></div><div class="metric-item"><h5>70%</h5><p>Mejora en conocimiento</p></div>',
            learnings: 'La gamificación y la educación son clave para mantener el engagement en apps financieras.',
            nextSteps: 'Desarrollar funcionalidades de inversión y expandir a mercados internacionales.'
        }
    },
    {
        id: 'proyecto-3',
        title: 'Plataforma de E-learning',
        description: 'Plataforma web para educación online con herramientas de colaboración y seguimiento del progreso estudiantil.',
        icon: 'device-mobile',
        tags: ['Web Platform', 'Educational UX', 'Collaboration Tools'],
        link: 'project/proyecto-3',
        featured: false,
        category: 'Web',
        caseData: {
            caseTitle: 'Plataforma de E-learning',
            caseSubtitle: 'Educación online colaborativa y efectiva',
            context: 'Una institución educativa necesitaba una plataforma para ofrecer cursos online con herramientas de colaboración.',
            challenge: 'Crear una experiencia de aprendizaje online que mantenga la participación y colaboración entre estudiantes.',
            methodology: 'Diseño de Experiencia de Usuario (UX) con investigación en educación digital y testing iterativo.',
            research: 'Análisis de plataformas existentes, entrevistas con educadores y estudiantes, y estudios de engagement.',
            solutionDescription: 'Una plataforma que combina contenido educativo con herramientas sociales y de colaboración.',
            featuresList: '<li>Sistema de progreso visual</li><li>Herramientas de colaboración en tiempo real</li><li>Contenido interactivo y multimedia</li>',
            keyImpact: 'Incremento del 85% en completion rate y mejora del 60% en satisfacción estudiantil.',
            metrics: '<div class="metric-item"><h5>85%</h5><p>Completion rate</p></div><div class="metric-item"><h5>60%</h5><p>Satisfacción estudiantil</p></div>',
            learnings: 'La colaboración y el feedback inmediato son fundamentales para el éxito en educación online.',
            nextSteps: 'Implementar IA para personalización de contenido y expandir herramientas de evaluación.'
        }
    }
] as const;

/**
 * Helper to get deep copy of project data
 */
export function getProjectDataCopy(): Project[] {
    return JSON.parse(JSON.stringify(PROJECT_DATA)) as Project[];
}
