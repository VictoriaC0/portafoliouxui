# Portafolio UX/UI - María Victoria

## 📋 Descripción del Proyecto

Portafolio personal modularizado con JavaScript Vanilla que mantiene la navegación consistente y el sistema de scroll personalizado entre todas las páginas.

## 🏗️ Estructura del Proyecto

```
portafoliouxui/
├── index.html                 # Página principal
├── proyecto-1.html           # Caso de estudio: Digitalización
├── proyecto-2.html           # Caso de estudio: App Financiera
├── proyecto-3.html           # Caso de estudio: E-learning
├── caso-digitalizacion.html  # Caso original (legacy)
├── templates/                # Templates reutilizables
│   ├── navigation.html       # Navegación unificada
│   ├── project-card.html     # Tarjeta de proyecto
│   └── case-template.html    # Plantilla para casos
├── js/
│   ├── modules/              # Módulos JavaScript
│   │   ├── TemplateLoader.js # Carga de templates
│   │   ├── Navigation.js     # Gestión de navegación
│   │   └── ProjectManager.js # Gestión de proyectos
│   └── script.js            # Script principal
├── css/
│   └── styles.css           # Estilos principales
└── assets/                  # Recursos estáticos
    ├── images/              # Imágenes
    └── documentos/          # Documentos
```

## 🚀 Características Implementadas

### ✅ Modularización Completa
- **Templates reutilizables**: Navegación, tarjetas de proyectos, plantillas de casos
- **Módulos JavaScript**: Sistema modular para cargar contenido dinámicamente
- **Navegación consistente**: Misma navegación en todas las páginas

### ✅ Sistema de Scroll Personalizado
- **Desktop**: Scroll horizontal entre secciones
- **Mobile**: Scroll vertical tradicional
- **Navegación por teclado**: Flechas, espacio, números
- **Touch gestures**: Swipe para navegación

### ✅ Páginas de Proyectos
- **3 casos de estudio completos** con datos realistas
- **Navegación entre casos** con botones anterior/siguiente
- **Métricas visuales** con diseño glassmorphism
- **Responsive design** para todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS y glassmorphism
- **JavaScript ES6+** - Módulos y clases
- **Bootstrap 5** - Framework CSS
- **Phosphor Icons** - Iconografía

## 📱 Funcionalidades

### Navegación
- Sidebar flotante en desktop
- Top navigation en mobile
- Estados activos automáticos
- Enlaces entre páginas y secciones

### Proyectos
- Tarjetas interactivas en la página principal
- Páginas individuales con casos completos
- Métricas de éxito visuales
- Navegación entre casos

### Responsive
- Breakpoints optimizados
- Navegación adaptativa
- Contenido escalable
- Touch-friendly en mobile

## 🔧 Cómo Usar

### Desarrollo Local
1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. Navega entre secciones y proyectos

### Agregar Nuevos Proyectos
1. Crea una nueva página HTML basada en `proyecto-1.html`
2. Agrega los datos del proyecto en `ProjectManager.js`
3. Actualiza los enlaces de navegación

### Personalizar Templates
1. Modifica los archivos en `/templates/`
2. Los cambios se aplicarán automáticamente
3. Usa placeholders `{{VARIABLE}}` para contenido dinámico

## 🎨 Personalización

### Colores
Modifica las variables CSS en `styles.css`:
```css
:root {
    --bg-primary: #1E1E1E;
    --accent-blue: #72EBFF;
    --accent-purple: #8a2be2;
    --accent-green: #3cb371;
}
```

### Contenido
- **Proyectos**: Edita `ProjectManager.js`
- **Navegación**: Modifica `templates/navigation.html`
- **Estilos**: Personaliza `css/styles.css`

## 📊 Beneficios de la Modularización

### ✅ Mantenimiento
- **Código DRY**: Sin duplicación de HTML/CSS
- **Cambios centralizados**: Un solo lugar para modificar navegación
- **Fácil debugging**: Módulos independientes

### ✅ Escalabilidad
- **Agregar proyectos**: Solo crear nueva página y datos
- **Nuevas funcionalidades**: Módulos reutilizables
- **Templates flexibles**: Sistema de placeholders

### ✅ Performance
- **Carga optimizada**: Templates cacheados
- **Navegación fluida**: Sin recargas innecesarias
- **Responsive nativo**: CSS optimizado

## 🔄 Comparación: Antes vs Después

### Antes (Original)
- ❌ Código duplicado entre páginas
- ❌ Navegación hardcodeada
- ❌ Difícil mantenimiento
- ❌ Solo 1 caso de estudio

### Después (Modularizado)
- ✅ Templates reutilizables
- ✅ Navegación dinámica
- ✅ Fácil mantenimiento
- ✅ 3 casos completos
- ✅ Sistema escalable

## 🚀 Próximos Pasos Sugeridos

1. **Agregar más proyectos** usando el sistema existente
2. **Implementar lazy loading** para imágenes
3. **Agregar animaciones** más avanzadas
4. **Optimizar SEO** con meta tags dinámicos
5. **Implementar analytics** para tracking de proyectos

## 📞 Contacto

**María Victoria** - Diseñadora UX/UI
- Email: maria.victoria@email.com
- LinkedIn: linkedin.com/in/mariavictoria
- Teléfono: +56 9 1234 5678

---

*Desarrollado con ❤️ usando JavaScript Vanilla y mejores prácticas de UX/UI*
