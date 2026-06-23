# Piscinas Verano Perfecto - Sistema de Gestión V3.0

## 📋 Descripción del Proyecto

Sistema web completo de gestión integral para empresas de mantenimiento de piscinas, con dos interfaces:
- **Admin**: Panel de control desktop para administradores
- **Técnico**: Interfaz mobile para técnicos en terreno

## 🗂️ Estructura del Proyecto

```
piscinas-verano-perfecto-1/
├── index.html              # Archivo HTML principal (limpio)
├── css/
│   └── styles.css         # Estilos CSS organizados y modularizados
├── js/
│   ├── utils.js           # Funciones auxiliares y utilidades
│   ├── auth.js            # Autenticación y gestión de vistas
│   ├── admin.js           # Funcionalidades del módulo admin
│   └── tech.js            # Funcionalidades del módulo técnico
└── README.md              # Este archivo
```

## ✨ Mejoras Implementadas

### 1. **Estructura Organizada**
- ✅ Separación de HTML, CSS y JavaScript
- ✅ CSS modularizado en un archivo separado
- ✅ JavaScript dividido en módulos temáticos
- ✅ Código limpio y comentado

### 2. **Mejoras Visuales**
- ✅ Animaciones suaves (fadeIn, slideIn)
- ✅ Gradientes mejorados
- ✅ Hover effects más intuitivos
- ✅ Responsive design mejorado
- ✅ Sombras y espaciados optimizados
- ✅ Scrollbar personalizado
- ✅ Notificaciones estilizadas

### 3. **Nuevas Funcionalidades**
- ✅ Sistema de notificaciones en tiempo real
- ✅ Almacenamiento local (localStorage)
- ✅ Sesiones persistentes de usuario
- ✅ Datos dinámicos en tablas
- ✅ Inventario interactivo con barras de progreso
- ✅ Información detallada de rutas
- ✅ Estado de químicos en tiempo real

### 4. **Características Mejoradas**
- ✅ Mejor manejo de estados (completado, pendiente, crítico)
- ✅ Sistema de autenticación mejorado
- ✅ Navegación más intuitiva
- ✅ Botones con iconos mejor diseñados
- ✅ Tablas con datos dinámicos

## 🎨 Paleta de Colores

| Color | Uso |
|-------|-----|
| `#0f172a` | Primario (Navy Dark) |
| `#0ea5e9` | Acento (Light Blue) |
| `#10b981` | Éxito (Verde) |
| `#f59e0b` | Advertencia (Naranja) |
| `#ef4444` | Peligro (Rojo) |

## 🚀 Cómo Usar

### Credenciales de Demo
- **RUT**: `76.123.456-7`
- **Contraseña**: `123456`

### Roles Disponibles
1. **Admin**: Acceso completo a todas las secciones
2. **Técnico**: Vista mobile para gestión de rutas

### Secciones del Admin
- Dashboard: Vista general con KPIs
- Clientes: Gestión de clientes
- Planificación: Planificación de rutas
- Facturación: Gestión de facturas
- Inventario: Control de químicos

### Secciones del Técnico
- Rutas: Tareas pendientes del día
- Insumos: Control de inventario en ruta

## 📱 Responsive Design

- **Desktop**: Layout completo con sidebar
- **Tablet**: Adaptación fluida
- **Mobile**: Vista optimizada para técnicos en terreno

## 🔧 Archivos Principales

### `index.html`
HTML limpio con solo la estructura, referencias a archivos externos.

### `css/styles.css`
- Variables CSS para colores y estilos
- Componentes reutilizables
- Animaciones
- Responsive breakpoints

### `js/utils.js`
- `showNotification()`: Sistema de notificaciones
- `Storage`: Gestión de localStorage
- `formatDate()`, `formatTime()`: Utilidades de fecha
- `generateId()`: Generador de IDs únicos

### `js/auth.js`
- `switchView()`: Cambio entre vistas
- `loginAsAdmin()`: Autenticación admin
- `loginAsTech()`: Autenticación técnico
- `logout()`: Cierre de sesión

### `js/admin.js`
- `switchAdminSection()`: Cambio de secciones
- Funciones de contenido dinámico
- Gestión de datos del admin

### `js/tech.js`
- `switchTecnicSection()`: Cambio de secciones
- `marcarCompletada()`: Marcar tareas completadas
- Gestión de inventario

## 🎯 Próximas Mejoras Sugeridas

- [ ] Backend con base de datos
- [ ] Autenticación real con JWT
- [ ] Geolocalización para técnicos
- [ ] Cámara para capturar evidencia
- [ ] Reportes PDF
- [ ] Gráficos de estadísticas
- [ ] Sincronización en tiempo real
- [ ] Soporte offline
- [ ] Push notifications

## 📝 Licencia

Proyecto educativo - 2024
