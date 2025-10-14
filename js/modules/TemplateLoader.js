/**
 * TemplateLoader - Módulo para cargar y renderizar templates HTML
 */
class TemplateLoader {
    constructor() {
        this.templates = new Map();
        this.basePath = './templates/';
        this.embeddedTemplates = new Map();
        this.initializeEmbeddedTemplates();
    }

    /**
     * Inicializa templates embebidos como fallback para archivos locales
     */
    initializeEmbeddedTemplates() {
        // Template de navegación embebido (usar el archivo navigation.html)
        // No hay template embebido - se usa el archivo navigation.html

        // Template de tarjeta de proyecto embebido
        this.embeddedTemplates.set('project-card', `
<div class="col-md-4 mb-4">
    <div class="project-card" data-project="{{PROJECT_ID}}">
        <div class="project-image">
            <img src="{{PROJECT_IMAGE}}" alt="{{PROJECT_TITLE}}" class="img-fluid">
        </div>
        <div class="project-content">
            <h4>{{PROJECT_TITLE}}</h4>
            <p class="project-description">{{PROJECT_DESCRIPTION}}</p>
            <div class="project-tags">
                {{PROJECT_TAGS}}
            </div>
            <a href="{{PROJECT_LINK}}" class="btn btn-outline-light btn-sm mt-3">
                Ver Proyecto <i class="ph ph-arrow-right ms-2" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</div>`);
    }

    /**
     * Carga un template desde un archivo HTML o usa template embebido como fallback
     * @param {string} templateName - Nombre del template (sin extensión)
     * @returns {Promise<string>} - Contenido HTML del template
     */
    async loadTemplate(templateName) {
        if (this.templates.has(templateName)) {
            return this.templates.get(templateName);
        }

        try {
            const response = await fetch(`${this.basePath}${templateName}.html`);
            if (!response.ok) {
                throw new Error(`Error loading template: ${response.status}`);
            }
            
            const templateContent = await response.text();
            this.templates.set(templateName, templateContent);
            return templateContent;
        } catch (error) {
            console.warn(`Error loading template ${templateName} from file, using embedded template:`, error);
            
            // Usar template embebido como fallback
            if (this.embeddedTemplates.has(templateName)) {
                const embeddedTemplate = this.embeddedTemplates.get(templateName);
                this.templates.set(templateName, embeddedTemplate);
                return embeddedTemplate;
            }
            
            console.error(`No embedded template found for ${templateName}`);
            return '';
        }
    }

    /**
     * Renderiza un template con datos específicos
     * @param {string} templateName - Nombre del template
     * @param {Object} data - Datos para reemplazar en el template
     * @param {string} containerId - ID del contenedor donde insertar el template
     */
    async renderTemplate(templateName, data = {}, containerId = null) {
        const templateContent = await this.loadTemplate(templateName);
        if (!templateContent) return;

        let renderedContent = templateContent;

        // Reemplazar placeholders con datos
        Object.keys(data).forEach(key => {
            const placeholder = `{{${key}}}`;
            const value = data[key] || '';
            renderedContent = renderedContent.replace(new RegExp(placeholder, 'g'), value);
        });

        // Si se especifica un contenedor, insertar el contenido
        if (containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = renderedContent;
            }
        }

        return renderedContent;
    }

    /**
     * Renderiza múltiples elementos desde un template
     * @param {string} templateName - Nombre del template
     * @param {Array} dataArray - Array de objetos con datos
     * @param {string} containerId - ID del contenedor donde insertar los elementos
     */
    async renderMultiple(templateName, dataArray, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let renderedContent = '';
        
        for (const data of dataArray) {
            const itemContent = await this.renderTemplate(templateName, data);
            renderedContent += itemContent;
        }

        container.innerHTML = renderedContent;
    }

    /**
     * Limpia el cache de templates
     */
    clearCache() {
        this.templates.clear();
    }

    /**
     * Pre-carga templates específicos
     * @param {Array} templateNames - Array de nombres de templates
     */
    async preloadTemplates(templateNames) {
        const promises = templateNames.map(name => this.loadTemplate(name));
        await Promise.all(promises);
    }
}

// Exportar para uso global
window.TemplateLoader = TemplateLoader;
