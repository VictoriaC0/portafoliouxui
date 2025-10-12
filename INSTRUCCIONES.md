# 🚀 Instrucciones de Uso - Portafolio Modularizado

## ✅ Problema de CORS Solucionado

He solucionado el problema de CORS que estabas experimentando. El error ocurría porque los navegadores bloquean las peticiones `fetch()` cuando abres archivos HTML directamente desde el sistema de archivos (`file://`).

## 🔧 Solución Implementada

### 1. **Templates Embebidos como Fallback**
- Agregué templates HTML embebidos directamente en el código JavaScript
- El sistema intenta cargar templates desde archivos, pero si falla (por CORS), usa los templates embebidos
- **Resultado**: Funciona sin necesidad de servidor web

### 2. **Navegación Estática en Páginas**
- Agregué navegación HTML estática directamente en cada página de proyecto
- Esto asegura que la navegación siempre funcione, independientemente de los módulos JavaScript

### 3. **Imágenes Placeholder**
- Reemplacé las rutas locales de imágenes con placeholders de `via.placeholder.com`
- Las imágenes se cargan desde internet, evitando problemas de CORS

## 🎯 Cómo Funciona Ahora

### **Página Principal (index.html)**
1. ✅ Carga normalmente desde archivo local
2. ✅ Muestra las 3 tarjetas de proyectos con imágenes placeholder
3. ✅ Navegación funcional con scroll personalizado
4. ✅ Click en proyectos navega a páginas individuales

### **Páginas de Proyectos (proyecto-1.html, etc.)**
1. ✅ Navegación estática embebida (siempre funciona)
2. ✅ Sistema de scroll personalizado preservado
3. ✅ Enlaces de navegación entre proyectos
4. ✅ Botones "Volver a Proyectos" funcionales

## 🚀 Para Probar el Portafolio

### **Opción 1: Archivos Locales (Recomendado)**
1. Abre `index.html` directamente en tu navegador
2. Navega entre secciones con scroll/teclado
3. Haz click en las tarjetas de proyectos
4. Explora los casos de estudio individuales

### **Opción 2: Con Servidor Local (Opcional)**
Si quieres usar un servidor local para desarrollo:

```bash
# Opción A: Python (si tienes Python instalado)
cd C:\Users\maria\Desktop\Repos\portafoliouxui
python -m http.server 8000

# Opción B: Node.js (si tienes Node instalado)
npx serve .

# Opción C: Live Server (extensión de VS Code)
# Click derecho en index.html → "Open with Live Server"
```

Luego abre: `http://localhost:8000`

## 📱 Funcionalidades Disponibles

### ✅ **Navegación**
- **Desktop**: Sidebar flotante + scroll horizontal con teclado/mouse
- **Mobile**: Top navigation + scroll vertical
- **Enlaces**: Navegación entre páginas y secciones

### ✅ **Proyectos**
- **3 casos completos** con datos realistas
- **Tarjetas interactivas** en página principal
- **Páginas individuales** con métricas y resultados
- **Navegación entre casos** (anterior/siguiente)

### ✅ **Responsive Design**
- **Breakpoints optimizados** para desktop/mobile
- **Navegación adaptativa** según dispositivo
- **Scroll personalizado** mantenido en todas las páginas

## 🎨 Personalización Fácil

### **Agregar Nuevos Proyectos**
1. Crea nueva página HTML (copia `proyecto-1.html`)
2. Agrega datos en `js/modules/ProjectManager.js`:
```javascript
{
    id: 'proyecto-4',
    title: 'Tu Nuevo Proyecto',
    description: 'Descripción del proyecto...',
    image: 'https://via.placeholder.com/400x300/72EBFF/1E1E1E?text=Nuevo+Proyecto',
    tags: ['Tag1', 'Tag2'],
    link: 'proyecto-4.html',
    caseData: { /* datos del caso */ }
}
```
3. ¡Listo! El sistema se encarga del resto

### **Cambiar Imágenes**
Reemplaza las URLs de placeholder con tus imágenes:
```javascript
image: 'https://via.placeholder.com/400x300/72EBFF/1E1E1E?text=Tu+Proyecto'
// Por:
image: 'assets/images/tu-imagen.jpg'
```

### **Modificar Navegación**
Edita la navegación en cualquier página HTML o en `TemplateLoader.js` (templates embebidos).

## 🔍 Debugging

### **Si Algo No Funciona**
1. **Abre la consola del navegador** (F12)
2. **Busca errores** en rojo
3. **Verifica que los archivos** estén en las rutas correctas

### **Mensajes Esperados en Consola**
```
Warning: Error loading template navigation from file, using embedded template
```
**Esto es normal** - significa que está usando el sistema de fallback.

## 📊 Estado Actual

### ✅ **Funcionando**
- ✅ Navegación completa
- ✅ Sistema de scroll personalizado
- ✅ 3 proyectos con casos completos
- ✅ Responsive design
- ✅ Navegación entre páginas
- ✅ Imágenes placeholder
- ✅ Sin errores de CORS

### 🎯 **Listo para Usar**
Tu portafolio está completamente funcional y listo para mostrar. Puedes:
- Abrir `index.html` directamente
- Navegar entre secciones y proyectos
- Mostrar casos de estudio completos
- Personalizar contenido fácilmente

## 🚀 Próximos Pasos Sugeridos

1. **Reemplazar imágenes placeholder** con tus imágenes reales
2. **Personalizar contenido** de los proyectos
3. **Agregar más proyectos** usando el sistema existente
4. **Optimizar para producción** (minificar CSS/JS)

---

**¡Tu portafolio modularizado está listo para usar! 🎉**
