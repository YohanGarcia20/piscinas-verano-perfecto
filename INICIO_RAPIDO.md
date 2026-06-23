# 🚀 Guía de Inicio Rápido

## ¿Cómo abrir la aplicación?

### Opción 1: Abrir con VS Code Live Server
1. Abre `index.html` en VS Code
2. Click derecho → "Open with Live Server"
3. Se abrirá automáticamente en `http://localhost:5500`

### Opción 2: Abrir directamente en el navegador
1. Navega hasta la carpeta del proyecto
2. Haz doble click en `index.html`
3. Se abrirá en tu navegador predeterminado

### Opción 3: Servidor local Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Luego abre: `http://localhost:8000`

---

## 👤 Credenciales de Demo

### Usuario: Administrador
- **RUT**: `76.123.456-7`
- **Contraseña**: `123456`
- **Rol**: Admin
- **Acceso**: Panel de control completo

### Usuario: Técnico
- **RUT**: `76.123.456-7`
- **Contraseña**: `123456`
- **Rol**: Técnico
- **Acceso**: App de rutas móvil

> **Nota**: Las credenciales son de demo. En producción implementar autenticación real.

---

## 🎮 Prueba la Aplicación

### 1. Pantalla de Login
- Escribe las credenciales de demo
- Elige tu rol (Admin o Técnico)
- Haz click en el botón correspondiente

### 2. Vista Admin - Dashboard
```
📊 KPIs Principales
├─ 14 Mantenciones Hoy
├─ 85% Rutas Completadas
└─ ⚠️ Stock Crítico: Cloro Fial

📋 Tabla de Rutas
├─ Ver estado de cada ruta
├─ Editar rutas
└─ Crear nuevas rutas

📌 Navegación Lateral
├─ Dashboard
├─ Clientes
├─ Planificación
├─ Facturación
└─ Inventario
```

#### Acciones Admin
- Click en cards para ver detalles
- Click en "Nueva Ruta" para agregar ruta
- Navega por las secciones
- Haz logout

### 3. Vista Técnico - App Móvil
```
📍 Rutas del Día
├─ Familia Soto (11:30 AM)
├─ Edificio Alto Macul (14:00 PM)
└─ Condominio Los Robles (16:30 PM)

📦 Inventario
├─ Cloro Fial (10/20 kg) ✅
├─ Carbonato de Sodio (25/30 kg) ✅
└─ Ácido Muriático (5/20 L) ⚠️

🎯 Acciones Técnico
- Registrar mantención en cada tarea
- Ver detalles de la ruta
- Consultar insumos disponibles
- Solicitar reabastecimiento
```

#### Acciones Técnico
- Click en "Registrar Mantención" para marcar completa
- Navega a "Insumos" para ver inventario
- Haz logout

---

## 🔍 Funcionalidades Clave

### ✅ Sistema de Notificaciones
- Al hacer acciones, verás notificaciones en la esquina superior derecha
- Existen 4 tipos: éxito, error, advertencia, información

### ✅ Gestión de Sesiones
- Tu sesión se guarda automáticamente
- Si recargas la página, mantienes la sesión activa
- Haz logout para cerrar la sesión

### ✅ Cambio de Secciones
- Admin: Usa el sidebar izquierdo
- Técnico: Usa la barra inferior de navegación

### ✅ Datos Dinámicos
- Las tablas actualizan contenido dinámicamente
- El inventario muestra barras de progreso
- Los estados se actualizan en tiempo real

---

## 📁 Estructura de Carpetas

```
piscinas-verano-perfecto-1/
│
├── 📄 index.html              ← Abre este archivo
├── 📄 README.md               ← Documentación general
├── 📄 MEJORAS.md              ← Cambios realizados
├── 📄 INICIO_RAPIDO.md        ← Este archivo
│
├── 📁 css/
│   └── styles.css             ← Todos los estilos
│
├── 📁 js/
│   ├── utils.js               ← Funciones auxiliares
│   ├── auth.js                ← Autenticación y vistas
│   ├── admin.js               ← Lógica del admin
│   └── tech.js                ← Lógica del técnico
│
└── 📁 .git/                   ← Control de versiones
```

---

## 🐛 Debugging

### Ver errores en consola
1. Abre las Developer Tools: `F12` o `Ctrl+Shift+I`
2. Ve a la pestaña "Console"
3. Verás logs de errores y información

### Inspeccionar elementos
1. Click derecho en cualquier elemento → "Inspect"
2. Ver el HTML y CSS en tiempo real

### Ver datos guardados
1. Abre DevTools → "Application" → "Local Storage"
2. Verás los datos de sesión guardados

---

## ⚡ Tips y Trucos

### Keyboard Shortcuts
- `F12`: Abrir DevTools
- `Ctrl+Shift+I`: Inspeccionar elemento
- `Ctrl+Shift+K`: Abrir consola
- `Ctrl+R`: Refrescar página

### Funcionalidades Ocultas
- Recarga la página mantendrá tu sesión (si hiciste login)
- Las rutas completadas se marcan visualmente
- El inventario se actualiza al completar mantenciones
- Las notificaciones desaparecen automáticamente

---

## 🤔 Preguntas Frecuentes

**P: ¿Qué pasa si pierdo mi sesión?**
A: Simplemente haz login nuevamente. Las credenciales de demo siempre funcionarán.

**P: ¿Dónde se guardan mis datos?**
A: En localStorage del navegador. Si limpias el navegador, se perderán.

**P: ¿Puedo crear nuevas rutas?**
A: En esta versión demo, los botones muestran notificaciones. En el futuro tendrán formularios reales.

**P: ¿Funciona sin internet?**
A: Sí, es una aplicación web estática que no requiere conexión.

**P: ¿Puedo usar en mi teléfono?**
A: Sí, la aplicación es responsive. Abre el archivo desde tu teléfono.

---

## 🚀 Próximos Pasos

1. **Explorar el código**: Abre los archivos en la carpeta `js/`
2. **Personalizar**: Modifica colores, textos y datos
3. **Agregar funcionalidades**: Usa como base para tu proyecto
4. **Conectar backend**: Cuando estés listo, agrega autenticación real
5. **Desplegar**: Publica en GitHub Pages, Netlify, Vercel, etc.

---

## 📚 Recursos Útiles

- [MDN Web Docs](https://developer.mozilla.org/)
- [Font Awesome Icons](https://fontawesome.com/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

---

## 💬 Comentarios y Sugerencias

¿Encontraste algo interesante? ¿Tienes sugerencias de mejora?

¡Adelante con el desarrollo! 🎉

---

**Última actualización**: 23 de junio de 2024  
**Versión**: 3.0
