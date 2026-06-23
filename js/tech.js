// ==================== GESTIÓN DE VISTAS TÉCNICO ====================

let techData = {
    routes: [
        { 
            id: 1, 
            title: 'Familia Soto', 
            time: '11:30 AM', 
            address: 'Las Perdices 450, Macul',
            client: 'Familia Soto',
            poolSize: '10x5 m',
            chemicalType: 'Cloro + Alcalinidad',
            notes: 'Piscina residencial',
            completed: false
        },
        { 
            id: 2, 
            title: 'Edificio Alto Macul', 
            time: '14:00 PM', 
            address: 'Av. Consistorial 2000',
            client: 'Edificio Alto Macul',
            poolSize: '25x12 m',
            chemicalType: 'Cloro + pH + Alcalinidad',
            notes: 'Piscina comunitaria',
            completed: false
        },
        { 
            id: 3, 
            title: 'Condominio Los Robles', 
            time: '16:30 PM', 
            address: 'Av. Macul 1234',
            client: 'Condominio Los Robles',
            poolSize: '15x8 m',
            chemicalType: 'Cloro + pH',
            notes: 'Piscina temperada',
            completed: false
        }
    ],
    inventory: [
        { product: 'Cloro Fial', current: 10, total: 20, unit: 'kg', color: '#0ea5e9' },
        { product: 'Carbonato de Sodio', current: 25, total: 30, unit: 'kg', color: '#0ea5e9' },
        { product: 'Ácido Muriático', current: 5, total: 20, unit: 'L', color: '#f59e0b' }
    ]
};

/**
 * Cambiar sección en la vista del técnico
 */
function switchTecnicSection(section, element) {
    // Actualizar nav activo
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }

    // Cambiar contenido
    const routeList = document.querySelector('.route-list');
    switch (section) {
        case 'ruta':
            routeList.innerHTML = getRutaContent();
            break;
        case 'insumos':
            routeList.innerHTML = getInsumosContent();
            break;
    }
}

/**
 * Contenido de Rutas
 */
function getRutaContent() {
    return `
        <h4 style="margin-bottom: 15px; color: var(--text-dark); font-size: 16px; font-weight: 700;">
            <i class="fa-solid fa-list-check" style="color: var(--accent); margin-right: 8px;"></i>
            Pendientes Hoy (${techData.routes.filter(r => !r.completed).length})
        </h4>
        
        ${techData.routes.map(route => `
            <div class="route-card ${route.completed ? 'completed' : ''}" id="task-${route.id}">
                <div class="route-header">
                    <span class="route-title">${route.title}</span>
                    <span class="route-time">${route.time}</span>
                </div>
                <div class="route-address">
                    <i class="fa-solid fa-location-dot"></i>
                    <div>
                        <div>${route.address}</div>
                        <div style="font-size: 12px; color: var(--text-light); margin-top: 4px;">
                            <i class="fa-solid fa-ruler"></i> ${route.poolSize} | ${route.chemicalType}
                        </div>
                    </div>
                </div>
                <button class="btn-action ${route.completed ? 'done' : ''}" id="btn-${route.id}" 
                        onclick="marcarCompletada('task-${route.id}', 'btn-${route.id}')" 
                        ${route.completed ? 'disabled' : ''}>
                    <i class="fa-solid fa-${route.completed ? 'check' : 'camera'}"></i> 
                    ${route.completed ? 'Finalizada (Sincronizada)' : 'Registrar Mantención'}
                </button>
            </div>
        `).join('')}
    `;
}

/**
 * Contenido de Insumos
 */
function getInsumosContent() {
    return `
        <h4 style="margin-bottom: 15px; color: var(--text-dark); font-size: 16px; font-weight: 700;">
            <i class="fa-solid fa-box" style="color: var(--accent); margin-right: 8px;"></i>
            Insumos Disponibles en Ruta
        </h4>
        
        ${techData.inventory.map(item => {
            const percentage = (item.current / item.total) * 100;
            const isLow = percentage < 50;
            return `
                <div class="inventory-item">
                    <div class="inventory-header">
                        <span class="inventory-name">${item.product}</span>
                        <span class="inventory-quantity" style="color: ${isLow ? '#f59e0b' : '#10b981'};">
                            ${item.current} / ${item.total} ${item.unit}
                        </span>
                    </div>
                    <div class="inventory-bar">
                        <div class="inventory-bar-fill" style="width: ${percentage}%; background: ${item.color};"></div>
                    </div>
                    ${isLow ? `<div style="font-size: 12px; color: #f59e0b; margin-top: 8px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Stock bajo
                    </div>` : ''}
                </div>
            `;
        }).join('')}

        <button type="button" class="btn-action" onclick="solicitarInsumos()" style="margin-top: 20px;">
            <i class="fa-solid fa-truck"></i> Solicitar Reabastecimiento
        </button>
    `;
}

/**
 * Marcar ruta como completada
 */
function marcarCompletada(cardId, btnId) {
    const card = document.getElementById(cardId);
    const btn = document.getElementById(btnId);
    const routeId = parseInt(cardId.replace('task-', ''));
    
    if (card && btn) {
        // Actualizar datos
        const route = techData.routes.find(r => r.id === routeId);
        if (route) {
            route.completed = true;
        }

        // Actualizar UI
        card.classList.add('completed');
        btn.classList.add('done');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Finalizada (Sincronizada)';
        btn.disabled = true;
        
        showNotification('✅ Mantención registrada. Stock de químicos actualizado.', 'success');

        // Simular actualización de inventario
        updateInventoryAfterCompletion();
    }
}

/**
 * Actualizar inventario después de completar una mantención
 */
function updateInventoryAfterCompletion() {
    // Simular consumo de químicos
    const cloro = techData.inventory.find(i => i.product === 'Cloro Fial');
    const alcalinidad = techData.inventory.find(i => i.product === 'Carbonato de Sodio');
    
    if (cloro && cloro.current > 2) cloro.current -= 2;
    if (alcalinidad && alcalinidad.current > 1.5) alcalinidad.current -= 1.5;
}

/**
 * Solicitar reabastecimiento
 */
function solicitarInsumos() {
    showNotification('📦 Solicitud de reabastecimiento enviada al administrador.', 'success');
}

/**
 * Ver detalles de una tarea
 */
function verDetalles(routeId) {
    const route = techData.routes.find(r => r.id === parseInt(routeId));
    if (route) {
        const details = `
            Cliente: ${route.client}
            Hora: ${route.time}
            Tamaño: ${route.poolSize}
            Químicos: ${route.chemicalType}
            Notas: ${route.notes}
        `;
        showNotification(`📍 ${route.title}\n${details}`, 'info');
    }
}
