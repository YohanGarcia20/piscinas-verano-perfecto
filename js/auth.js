// ==================== GESTIÓN DE AUTENTICACIÓN Y VISTAS ====================

let currentUser = null;
let currentView = 'login-view';

/**
 * Cambiar entre vistas
 */
function switchView(viewId) {
    // Guardar vista actual
    currentView = viewId;

    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Mostrar vista solicitada
    const view = document.getElementById(viewId);
    if (view) {
        view.classList.add('active');

        // Ejecutar acciones según la vista
        if (viewId === 'admin-view') {
            initAdminView();
        } else if (viewId === 'tech-view') {
            initTechView();
        }
    } else {
        console.warn('Vista no encontrada:', viewId);
    }
}

/**
 * Autenticar usuario como Administrador
 */
function loginAsAdmin() {
    const rutInput = document.querySelector('input[placeholder*="RUT"]');
    const passInput = document.querySelector('input[placeholder*="Contraseña"]');

    if (rutInput.value && passInput.value) {
        currentUser = {
            id: generateId(),
            role: 'admin',
            rut: rutInput.value,
            name: 'Administrador',
            email: 'admin@piscinas.cl',
            loginTime: new Date()
        };

        Storage.set('currentUser', currentUser);
        switchView('admin-view');
        showNotification('✅ Bienvenido al Panel de Administración', 'success');
    } else {
        showNotification('Por favor completa todos los campos', 'warning');
    }
}

/**
 * Autenticar usuario como Técnico
 */
function loginAsTech() {
    const rutInput = document.querySelector('input[placeholder*="RUT"]');
    const passInput = document.querySelector('input[placeholder*="Contraseña"]');

    if (rutInput.value && passInput.value) {
        currentUser = {
            id: generateId(),
            role: 'tech',
            rut: rutInput.value,
            name: 'Diego Vásquez',
            email: 'diego@piscinas.cl',
            loginTime: new Date()
        };

        Storage.set('currentUser', currentUser);
        switchView('tech-view');
        showNotification('✅ Bienvenido al Sistema de Rutas', 'success');
    } else {
        showNotification('Por favor completa todos los campos', 'warning');
    }
}

/**
 * Cerrar sesión
 */
function logout() {
    if (confirm('¿Deseas cerrar sesión?')) {
        currentUser = null;
        Storage.remove('currentUser');
        switchView('login-view');
        showNotification('Sesión cerrada correctamente', 'info');
    }
}

/**
 * Inicializar vista de Admin
 */
function initAdminView() {
    // Actualizar nombre de usuario
    const userProfile = document.querySelector('.user-profile');
    if (userProfile && currentUser) {
        userProfile.innerHTML = `
            <div class="avatar">${currentUser.name.charAt(0)}</div>
            <span>${currentUser.name}</span>
        `;
    }

    // Cargar dashboard por defecto
    switchAdminSection('dashboard');
}

/**
 * Inicializar vista de Técnico
 */
function initTechView() {
    // Actualizar nombre del técnico
    const mobileHeader = document.querySelector('.mobile-header');
    if (mobileHeader && currentUser) {
        mobileHeader.innerHTML = `
            <div>
                <h3 style="font-size: 18px; margin-bottom: 4px;">Hola, ${currentUser.name.split(' ')[0]}</h3>
                <p style="font-size: 13px; color: #cbd5e1;">Ruta del día: 3 visitas</p>
            </div>
            <div class="avatar" style="background-color: white; color: var(--primary);">${currentUser.name.split(' ').map(n => n.charAt(0)).join('')}</div>
        `;
    }

    // Cargar rutas por defecto
    switchTecnicSection('ruta', document.querySelector('.mobile-nav-item.active'));
}

// Manejar eventos del formulario de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#login-view form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    // Permitir Enter en inputs de login
    const loginInputs = document.querySelectorAll('#login-view input');
    loginInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = e.target.closest('form').querySelector('.btn-admin');
                if (button) button.click();
            }
        });
    });

    // Actualizar botones de login
    const btnAdmin = document.querySelector('.btn-admin');
    const btnTech = document.querySelector('.btn-tech');

    if (btnAdmin) {
        btnAdmin.onclick = loginAsAdmin;
    }
    if (btnTech) {
        btnTech.onclick = loginAsTech;
    }

    // Restaurar sesión si existe
    const savedUser = Storage.get('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        switchView(savedUser.role === 'admin' ? 'admin-view' : 'tech-view');
    }
});
