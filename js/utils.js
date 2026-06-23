// ==================== UTILIDADES ====================

/**
 * Muestra una notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - 'success', 'error', 'info', 'warning'
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid fa-${getIconByType(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Obtiene el ícono según el tipo de notificación
 */
function getIconByType(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'triangle-exclamation',
        info: 'info'
    };
    return icons[type] || 'info';
}

/**
 * Genera un ID único
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Formatea una fecha
 */
function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Formatea una hora
 */
function formatTime(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Almacenamiento local de datos
 */
const Storage = {
    get: (key, defaultValue = null) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
    clear: () => {
        localStorage.clear();
    }
};

// Agregar estilos de notificación dinámicamente
const notificationStyles = document.createElement('style');
notificationStyles.innerHTML = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        background: white;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 400px;
    }

    .notification.show {
        opacity: 1;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-success {
        border-left: 4px solid #10b981;
        background: #f0fdf4;
    }

    .notification-success i {
        color: #10b981;
    }

    .notification-error {
        border-left: 4px solid #ef4444;
        background: #fef2f2;
    }

    .notification-error i {
        color: #ef4444;
    }

    .notification-warning {
        border-left: 4px solid #f59e0b;
        background: #fffbeb;
    }

    .notification-warning i {
        color: #f59e0b;
    }

    .notification-info {
        border-left: 4px solid #0ea5e9;
        background: #f0f9fe;
    }

    .notification-info i {
        color: #0ea5e9;
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(notificationStyles);
