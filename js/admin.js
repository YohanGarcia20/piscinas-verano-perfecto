// ==================== GESTIÓN DE SECCIONES ADMIN ====================

let adminData = {
    routes: [
        { id: 1, client: 'Condominio Los Robles', address: 'Av. Macul 1234', tech: 'Juan Pérez', time: '09:00 AM', status: 'done' },
        { id: 2, client: 'Familia Soto (Piscina 10x5)', address: 'Las Perdices 450', tech: 'Diego V.', time: '11:30 AM', status: 'pending' },
        { id: 3, client: 'Edificio Vista Andes', address: 'Av. Ossa 990', tech: 'Juan Pérez', time: '15:00 PM', status: 'pending' }
    ],
    clients: [
        { id: 1, name: 'Familia Soto', rut: '12.345.678-9', phone: '+56 9 1234 5678', email: 'soto@email.com', frequency: 'Semanal' },
        { id: 2, name: 'Condominio Los Robles', rut: '76.123.456-7', phone: '+56 2 2234 5678', email: 'admin@robles.cl', frequency: 'Quincenal' }
    ],
    inventory: [
        { id: 1, product: 'Cloro Fial', current: 5, minimum: 20, provider: 'Química Chilena S.A.', status: 'critical' },
        { id: 2, product: 'Carbonato de Sodio', current: 40, minimum: 15, provider: 'Química Chilena S.A.', status: 'normal' }
    ]
};

/**
 * Cambiar sección del admin
 */
function switchAdminSection(section) {
    // Actualizar nav activo
    document.querySelectorAll('.nav-links li').forEach(li => {
        li.classList.remove('active');
    });

    // Encontrar y activar el elemento correcto
    const navItems = document.querySelectorAll('.nav-links li');
    const sectionMap = { 'dashboard': 0, 'clientes': 1, 'planificacion': 2, 'facturacion': 3, 'inventario': 4 };
    if (sectionMap[section] !== undefined) {
        navItems[sectionMap[section]].classList.add('active');
    }

    // Cambiar contenido
    const content = document.querySelector('.dashboard-content');
    switch (section) {
        case 'dashboard':
            content.innerHTML = getDashboardContent();
            break;
        case 'clientes':
            content.innerHTML = getClientesContent();
            break;
        case 'planificacion':
            content.innerHTML = getPlanificacionContent();
            break;
        case 'facturacion':
            content.innerHTML = getFacturacionContent();
            break;
        case 'inventario':
            content.innerHTML = getInventarioContent();
            break;
    }
}

/**
 * Dashboard - Contenido principal
 */
function getDashboardContent() {
    return `
        <div class="cards-grid">
            <div class="card" onclick="handleCardClick('maintenance')">
                <div class="card-icon blue"><i class="fa-solid fa-clipboard-list"></i></div>
                <div class="card-info">
                    <h3>14</h3>
                    <p>Mantenciones Hoy</p>
                </div>
            </div>
            <div class="card" onclick="handleCardClick('completion')">
                <div class="card-icon green"><i class="fa-solid fa-check-double"></i></div>
                <div class="card-info">
                    <h3>85%</h3>
                    <p>Rutas Completadas</p>
                </div>
            </div>
            <div class="card" onclick="handleCardClick('stock')">
                <div class="card-icon orange"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div class="card-info">
                    <h3>Cloro Fial</h3>
                    <p>Stock Crítico</p>
                </div>
            </div>
        </div>

        <div class="data-table-container">
            <div class="table-header">
                <h3>Estado de Rutas - Terreno</h3>
                <button class="btn btn-primary" onclick="showAddRouteModal()">
                    <i class="fa-solid fa-plus"></i> Nueva Ruta
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Dirección</th>
                        <th>Técnico Asignado</th>
                        <th>Hora Prog.</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.routes.map(route => `
                        <tr>
                            <td>${route.client}</td>
                            <td>${route.address}</td>
                            <td>${route.tech}</td>
                            <td>${route.time}</td>
                            <td><span class="status ${route.status}">${route.status === 'done' ? 'Efectuada' : 'Pendiente'}</span></td>
                            <td>
                                <button class="btn btn-accent btn-sm" onclick="editRoute(${route.id})">
                                    <i class="fa-solid fa-pen"></i> Editar
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Gestión de Clientes
 */
function getClientesContent() {
    return `
        <div class="data-table-container">
            <div class="table-header">
                <h3>Gestión de Clientes</h3>
                <button class="btn btn-primary" onclick="showAddClientModal()">
                    <i class="fa-solid fa-plus"></i> Nuevo Cliente
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RUT</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Frecuencia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.clients.map(client => `
                        <tr>
                            <td>${client.name}</td>
                            <td>${client.rut}</td>
                            <td>${client.phone}</td>
                            <td>${client.email}</td>
                            <td>${client.frequency}</td>
                            <td>
                                <button class="btn btn-accent btn-sm" onclick="editClient(${client.id})">
                                    <i class="fa-solid fa-pen"></i> Editar
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Planificación de Rutas
 */
function getPlanificacionContent() {
    return `
        <div class="data-table-container">
            <div class="table-header">
                <h3>Planificación de Rutas</h3>
                <button class="btn btn-primary" onclick="showPlanRouteModal()">
                    <i class="fa-solid fa-map"></i> Planificar Ruta
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Ruta ID</th>
                        <th>Técnico</th>
                        <th>Fecha</th>
                        <th>Paradas</th>
                        <th>Distancia</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>RUTA-2024-001</td>
                        <td>Juan Pérez</td>
                        <td>${formatDate(new Date())}</td>
                        <td>5</td>
                        <td>45 km</td>
                        <td><span class="status done">Completada</span></td>
                    </tr>
                    <tr>
                        <td>RUTA-2024-002</td>
                        <td>Diego V.</td>
                        <td>${formatDate(new Date())}</td>
                        <td>4</td>
                        <td>38 km</td>
                        <td><span class="status pending">En Progreso</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Facturación
 */
function getFacturacionContent() {
    return `
        <div class="data-table-container">
            <div class="table-header">
                <h3>Facturación</h3>
                <button class="btn btn-primary" onclick="showInvoiceModal()">
                    <i class="fa-solid fa-receipt"></i> Generar Factura
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>FAC-001-2024</td>
                        <td>Familia Soto</td>
                        <td>10/05/2024</td>
                        <td>$45,000</td>
                        <td><span class="status done">Pagada</span></td>
                        <td><button class="btn btn-success btn-sm"><i class="fa-solid fa-download"></i> PDF</button></td>
                    </tr>
                    <tr>
                        <td>FAC-002-2024</td>
                        <td>Condominio Los Robles</td>
                        <td>12/05/2024</td>
                        <td>$120,000</td>
                        <td><span class="status pending">Pendiente</span></td>
                        <td><button class="btn btn-warning btn-sm"><i class="fa-solid fa-bell"></i> Cobrar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Inventario
 */
function getInventarioContent() {
    return `
        <div class="data-table-container">
            <div class="table-header">
                <h3>Inventario de Químicos</h3>
                <button class="btn btn-primary" onclick="showAddProductModal()">
                    <i class="fa-solid fa-plus"></i> Nuevo Producto
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Stock Actual</th>
                        <th>Mínimo</th>
                        <th>Proveedor</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${adminData.inventory.map(item => `
                        <tr>
                            <td>${item.product}</td>
                            <td>${item.current} kg</td>
                            <td>${item.minimum} kg</td>
                            <td>${item.provider}</td>
                            <td><span class="status ${item.status === 'critical' ? 'critical' : 'done'}">${item.status === 'critical' ? 'Crítico' : 'Normal'}</span></td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="orderProduct(${item.id})">
                                    <i class="fa-solid fa-truck"></i> Comprar
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ==================== FUNCIONES DE ACCIÓN ====================

function handleCardClick(type) {
    const messages = {
        maintenance: 'Mostrando 14 tareas de mantenimiento para hoy',
        completion: 'Tasa de completación: 85% - 12 de 14 rutas completadas',
        stock: 'Stock crítico de Cloro. Realiza un pedido urgente'
    };
    showNotification(messages[type], 'info');
}

function editRoute(id) {
    showNotification(`Editando ruta #${id}`, 'info');
}

function showAddRouteModal() {
    showNotification('Abriendo formulario para crear nueva ruta...', 'info');
}

function editClient(id) {
    showNotification(`Editando cliente #${id}`, 'info');
}

function showAddClientModal() {
    showNotification('Abriendo formulario para añadir nuevo cliente...', 'info');
}

function showPlanRouteModal() {
    showNotification('Planificando nueva ruta...', 'info');
}

function showInvoiceModal() {
    showNotification('Generando nueva factura...', 'info');
}

function showAddProductModal() {
    showNotification('Abriendo formulario para añadir producto...', 'info');
}

function orderProduct(id) {
    showNotification('Creando orden de compra...', 'success');
}
