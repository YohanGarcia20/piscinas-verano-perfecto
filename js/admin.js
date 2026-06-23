// ==================== GESTIÓN DE SECCIONES ADMIN ====================

// Cargar datos del localStorage o usar valores por defecto
let adminData = Storage.get('adminData') || {
    routes: [
        { id: 1, client: 'Condominio Los Robles', address: 'Av. Macul 1234', tech: 'Juan Pérez', time: '09:00 AM', status: 'done', poolSize: '15x8 m' },
        { id: 2, client: 'Familia Soto (Piscina 10x5)', address: 'Las Perdices 450', tech: 'Diego V.', time: '11:30 AM', status: 'pending', poolSize: '10x5 m' },
        { id: 3, client: 'Edificio Vista Andes', address: 'Av. Ossa 990', tech: 'Juan Pérez', time: '15:00 PM', status: 'pending', poolSize: '25x12 m' }
    ],
    clients: [
        { id: 1, name: 'Familia Soto', rut: '12.345.678-9', phone: '+56 9 1234 5678', email: 'soto@email.com', frequency: 'Semanal' },
        { id: 2, name: 'Condominio Los Robles', rut: '76.123.456-7', phone: '+56 2 2234 5678', email: 'admin@robles.cl', frequency: 'Quincenal' }
    ],
    inventory: [
        { id: 1, product: 'Cloro Fial', current: 5, minimum: 20, provider: 'Química Chilena S.A.', status: 'critical', unit: 'kg' },
        { id: 2, product: 'Carbonato de Sodio', current: 40, minimum: 15, provider: 'Química Chilena S.A.', status: 'normal', unit: 'kg' }
    ],
    invoices: [
        { id: 'FAC-001-2024', client: 'Familia Soto', date: '2024-05-10', amount: 45000, status: 'paid' },
        { id: 'FAC-002-2024', client: 'Condominio Los Robles', date: '2024-05-12', amount: 120000, status: 'pending' }
    ],
    nextRouteId: 4,
    nextClientId: 3,
    nextProductId: 3,
    nextInvoiceNum: 3
};

/**
 * Guardar datos en localStorage
 */
function saveAdminData() {
    Storage.set('adminData', adminData);
}

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
    const completedRoutes = adminData.routes.filter(r => r.status === 'done').length;
    const totalRoutes = adminData.routes.length;
    const completionRate = totalRoutes > 0 ? Math.round((completedRoutes / totalRoutes) * 100) : 0;
    const criticalInventory = adminData.inventory.filter(i => i.status === 'critical');

    return `
        <div class="cards-grid">
            <div class="card" onclick="handleCardClick('maintenance')">
                <div class="card-icon blue"><i class="fa-solid fa-clipboard-list"></i></div>
                <div class="card-info">
                    <h3>${adminData.routes.length}</h3>
                    <p>Mantenciones Hoy</p>
                </div>
            </div>
            <div class="card" onclick="handleCardClick('completion')">
                <div class="card-icon green"><i class="fa-solid fa-check-double"></i></div>
                <div class="card-info">
                    <h3>${completionRate}%</h3>
                    <p>Rutas Completadas</p>
                </div>
            </div>
            <div class="card" onclick="handleCardClick('stock')">
                <div class="card-icon orange"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div class="card-info">
                    <h3>${criticalInventory.length}</h3>
                    <p>Productos Críticos</p>
                </div>
            </div>
        </div>

        <div class="data-table-container">
            <div class="table-header">
                <h3>Estado de Rutas - Terreno</h3>
                <button class="btn btn-primary" onclick="openAddRouteModal()">
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
                                <button class="btn btn-accent btn-sm" onclick="openEditRouteModal(${route.id})">
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
                <button class="btn btn-primary" onclick="openAddClientModal()">
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
                                <button class="btn btn-accent btn-sm" onclick="openEditClientModal(${client.id})">
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
                <button class="btn btn-primary" onclick="openPlanRouteModal()">
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
                        <td>${adminData.routes.length}</td>
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
                <button class="btn btn-primary" onclick="openInvoiceModal()">
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
                    ${adminData.invoices.map(invoice => `
                        <tr>
                            <td>${invoice.id}</td>
                            <td>${invoice.client}</td>
                            <td>${formatDate(invoice.date)}</td>
                            <td>$${invoice.amount.toLocaleString('es-CL')}</td>
                            <td><span class="status ${invoice.status === 'paid' ? 'done' : 'pending'}">${invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}</span></td>
                            <td>
                                ${invoice.status === 'pending' ? `<button class="btn btn-warning btn-sm" onclick="markInvoiceAsPaid('${invoice.id}')"><i class="fa-solid fa-check"></i> Marcar Pagada</button>` : '<button class="btn btn-success btn-sm"><i class="fa-solid fa-download"></i> PDF</button>'}
                            </td>
                        </tr>
                    `).join('')}
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
                <button class="btn btn-primary" onclick="openAddProductModal()">
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
                            <td>${item.current} ${item.unit}</td>
                            <td>${item.minimum} ${item.unit}</td>
                            <td>${item.provider}</td>
                            <td><span class="status ${item.status === 'critical' ? 'critical' : 'done'}">${item.status === 'critical' ? 'Crítico' : 'Normal'}</span></td>
                            <td>
                                ${item.status === 'critical' ? `<button class="btn btn-danger btn-sm" onclick="openOrderModal(${item.id})"><i class="fa-solid fa-truck"></i> Comprar</button>` : '<button class="btn btn-accent btn-sm"><i class="fa-solid fa-pen"></i> Editar</button>'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ==================== MODALES ====================

let currentModalType = null;
let currentEditId = null;

/**
 * Abrir modal genérico
 */
function openModal(title, content, submitText = 'Guardar') {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    const submitBtn = document.querySelector('.modal-footer button[type="submit"]');
    submitBtn.textContent = submitText;
    overlay.classList.add('active');
}

/**
 * Cerrar modal
 */
function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
    currentModalType = null;
    currentEditId = null;
}

/**
 * Manejar envío de formulario
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (currentModalType === 'route') {
        saveRoute();
    } else if (currentModalType === 'client') {
        saveClient();
    } else if (currentModalType === 'invoice') {
        saveInvoice();
    } else if (currentModalType === 'product') {
        saveProduct();
    } else if (currentModalType === 'plan-route') {
        savePlanRoute();
    } else if (currentModalType === 'order') {
        saveOrder();
    }
}

// ==================== RUTAS ====================

function openAddRouteModal() {
    currentModalType = 'route';
    currentEditId = null;

    const clientOptions = adminData.clients.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    const techOptions = ['Juan Pérez', 'Diego V.', 'Carlos M.', 'Roberto G.'].map(t => `<option value="${t}">${t}</option>`).join('');

    const content = `
        <div class="form-group">
            <label>Cliente</label>
            <select id="route-client" required>
                <option value="">Seleccionar cliente</option>
                ${clientOptions}
            </select>
        </div>
        <div class="form-group">
            <label>Dirección</label>
            <input type="text" id="route-address" placeholder="Ej: Av. Macul 1234" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Técnico Asignado</label>
                <select id="route-tech" required>
                    <option value="">Seleccionar técnico</option>
                    ${techOptions}
                </select>
            </div>
            <div class="form-group">
                <label>Hora Programada</label>
                <input type="time" id="route-time" required>
            </div>
        </div>
        <div class="form-group">
            <label>Tamaño de Piscina</label>
            <input type="text" id="route-poolsize" placeholder="Ej: 10x5 m" required>
        </div>
        <div class="form-group">
            <label>Estado</label>
            <select id="route-status">
                <option value="pending">Pendiente</option>
                <option value="done">Efectuada</option>
            </select>
        </div>
    `;

    openModal('Nueva Ruta', content, 'Crear Ruta');
}

function openEditRouteModal(id) {
    currentModalType = 'route';
    currentEditId = id;
    const route = adminData.routes.find(r => r.id === id);

    const clientOptions = adminData.clients.map(c => `<option value="${c.name}" ${c.name === route.client ? 'selected' : ''}>${c.name}</option>`).join('');
    const techOptions = ['Juan Pérez', 'Diego V.', 'Carlos M.', 'Roberto G.'].map(t => `<option value="${t}" ${t === route.tech ? 'selected' : ''}>${t}</option>`).join('');

    const content = `
        <div class="form-group">
            <label>Cliente</label>
            <select id="route-client" required>
                ${clientOptions}
            </select>
        </div>
        <div class="form-group">
            <label>Dirección</label>
            <input type="text" id="route-address" value="${route.address}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Técnico Asignado</label>
                <select id="route-tech" required>
                    ${techOptions}
                </select>
            </div>
            <div class="form-group">
                <label>Hora Programada</label>
                <input type="time" id="route-time" value="${route.time}" required>
            </div>
        </div>
        <div class="form-group">
            <label>Tamaño de Piscina</label>
            <input type="text" id="route-poolsize" value="${route.poolSize}" required>
        </div>
        <div class="form-group">
            <label>Estado</label>
            <select id="route-status">
                <option value="pending" ${route.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                <option value="done" ${route.status === 'done' ? 'selected' : ''}>Efectuada</option>
            </select>
        </div>
    `;

    openModal('Editar Ruta', content, 'Actualizar Ruta');
}

function saveRoute() {
    const client = document.getElementById('route-client').value;
    const address = document.getElementById('route-address').value;
    const tech = document.getElementById('route-tech').value;
    const time = document.getElementById('route-time').value;
    const poolSize = document.getElementById('route-poolsize').value;
    const status = document.getElementById('route-status').value;

    if (!client || !address || !tech || !time || !poolSize) {
        showNotification('Por favor completa todos los campos', 'warning');
        return;
    }

    if (currentEditId) {
        // Editar ruta existente
        const route = adminData.routes.find(r => r.id === currentEditId);
        if (route) {
            route.client = client;
            route.address = address;
            route.tech = tech;
            route.time = time;
            route.poolSize = poolSize;
            route.status = status;
            showNotification('✅ Ruta actualizada correctamente', 'success');
        }
    } else {
        // Crear nueva ruta
        adminData.routes.push({
            id: adminData.nextRouteId++,
            client,
            address,
            tech,
            time,
            poolSize,
            status
        });
        showNotification('✅ Ruta creada correctamente', 'success');
    }

    saveAdminData();
    closeModal();
    switchAdminSection('dashboard');
}

// ==================== CLIENTES ====================

function openAddClientModal() {
    currentModalType = 'client';
    currentEditId = null;

    const frequencyOptions = ['Semanal', 'Quincenal', 'Mensual', 'Según demanda'].map(f => `<option value="${f}">${f}</option>`).join('');

    const content = `
        <div class="form-group">
            <label>Nombre del Cliente</label>
            <input type="text" id="client-name" placeholder="Ej: Familia García" required>
        </div>
        <div class="form-group">
            <label>RUT</label>
            <input type="text" id="client-rut" placeholder="Ej: 12.345.678-9" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" id="client-phone" placeholder="+56 9 1234 5678" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="client-email" placeholder="cliente@email.com" required>
            </div>
        </div>
        <div class="form-group">
            <label>Frecuencia de Servicio</label>
            <select id="client-frequency" required>
                <option value="">Seleccionar frecuencia</option>
                ${frequencyOptions}
            </select>
        </div>
    `;

    openModal('Nuevo Cliente', content, 'Registrar Cliente');
}

function openEditClientModal(id) {
    currentModalType = 'client';
    currentEditId = id;
    const client = adminData.clients.find(c => c.id === id);

    const frequencyOptions = ['Semanal', 'Quincenal', 'Mensual', 'Según demanda'].map(f => 
        `<option value="${f}" ${f === client.frequency ? 'selected' : ''}>${f}</option>`
    ).join('');

    const content = `
        <div class="form-group">
            <label>Nombre del Cliente</label>
            <input type="text" id="client-name" value="${client.name}" required>
        </div>
        <div class="form-group">
            <label>RUT</label>
            <input type="text" id="client-rut" value="${client.rut}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" id="client-phone" value="${client.phone}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="client-email" value="${client.email}" required>
            </div>
        </div>
        <div class="form-group">
            <label>Frecuencia de Servicio</label>
            <select id="client-frequency" required>
                ${frequencyOptions}
            </select>
        </div>
    `;

    openModal('Editar Cliente', content, 'Actualizar Cliente');
}

function saveClient() {
    const name = document.getElementById('client-name').value;
    const rut = document.getElementById('client-rut').value;
    const phone = document.getElementById('client-phone').value;
    const email = document.getElementById('client-email').value;
    const frequency = document.getElementById('client-frequency').value;

    if (!name || !rut || !phone || !email || !frequency) {
        showNotification('Por favor completa todos los campos', 'warning');
        return;
    }

    if (currentEditId) {
        const client = adminData.clients.find(c => c.id === currentEditId);
        if (client) {
            client.name = name;
            client.rut = rut;
            client.phone = phone;
            client.email = email;
            client.frequency = frequency;
            showNotification('✅ Cliente actualizado correctamente', 'success');
        }
    } else {
        adminData.clients.push({
            id: adminData.nextClientId++,
            name,
            rut,
            phone,
            email,
            frequency
        });
        showNotification('✅ Cliente registrado correctamente', 'success');
    }

    saveAdminData();
    closeModal();
    switchAdminSection('clientes');
}

// ==================== FACTURACIÓN ====================

function openInvoiceModal() {
    currentModalType = 'invoice';
    currentEditId = null;

    const clientOptions = adminData.clients.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

    const content = `
        <div class="form-group">
            <label>Cliente</label>
            <select id="invoice-client" required>
                <option value="">Seleccionar cliente</option>
                ${clientOptions}
            </select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Fecha</label>
                <input type="date" id="invoice-date" value="${new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="form-group">
                <label>Monto (CLP)</label>
                <input type="number" id="invoice-amount" placeholder="Ej: 45000" min="1000" required>
            </div>
        </div>
        <div class="form-group">
            <label>Descripción del Servicio</label>
            <textarea id="invoice-description" placeholder="Ej: Mantención y tratamiento de piscina" required></textarea>
        </div>
    `;

    openModal('Generar Factura', content, 'Crear Factura');
}

function saveInvoice() {
    const client = document.getElementById('invoice-client').value;
    const date = document.getElementById('invoice-date').value;
    const amount = parseInt(document.getElementById('invoice-amount').value);
    const description = document.getElementById('invoice-description').value;

    if (!client || !date || !amount || !description) {
        showNotification('Por favor completa todos los campos', 'warning');
        return;
    }

    const invoiceId = `FAC-${String(adminData.nextInvoiceNum).padStart(3, '0')}-2024`;

    adminData.invoices.push({
        id: invoiceId,
        client,
        date,
        amount,
        description,
        status: 'pending'
    });
    adminData.nextInvoiceNum++;

    showNotification('✅ Factura generada correctamente', 'success');
    saveAdminData();
    closeModal();
    switchAdminSection('facturacion');
}

function markInvoiceAsPaid(invoiceId) {
    const invoice = adminData.invoices.find(i => i.id === invoiceId);
    if (invoice) {
        invoice.status = 'paid';
        saveAdminData();
        showNotification('✅ Factura marcada como pagada', 'success');
        switchAdminSection('facturacion');
    }
}

// ==================== INVENTARIO ====================

function openAddProductModal() {
    currentModalType = 'product';
    currentEditId = null;

    const providerOptions = ['Química Chilena S.A.', 'Hidrolabor', 'Thermoquímica', 'AguaSystem'].map(p => `<option value="${p}">${p}</option>`).join('');
    const unitOptions = ['kg', 'L', 'Litros', 'Kg'].map(u => `<option value="${u}">${u}</option>`).join('');

    const content = `
        <div class="form-group">
            <label>Nombre del Producto</label>
            <input type="text" id="product-name" placeholder="Ej: Cloro Fial" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Stock Actual</label>
                <input type="number" id="product-current" placeholder="10" min="0" required>
            </div>
            <div class="form-group">
                <label>Unidad de Medida</label>
                <select id="product-unit" required>
                    ${unitOptions}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label>Stock Mínimo</label>
            <input type="number" id="product-minimum" placeholder="20" min="1" required>
        </div>
        <div class="form-group">
            <label>Proveedor</label>
            <select id="product-provider" required>
                <option value="">Seleccionar proveedor</option>
                ${providerOptions}
            </select>
        </div>
    `;

    openModal('Nuevo Producto', content, 'Agregar Producto');
}

function saveProduct() {
    const name = document.getElementById('product-name').value;
    const current = parseInt(document.getElementById('product-current').value);
    const unit = document.getElementById('product-unit').value;
    const minimum = parseInt(document.getElementById('product-minimum').value);
    const provider = document.getElementById('product-provider').value;

    if (!name || !current || !unit || !minimum || !provider) {
        showNotification('Por favor completa todos los campos', 'warning');
        return;
    }

    const status = current <= minimum ? 'critical' : 'normal';

    adminData.inventory.push({
        id: adminData.nextProductId++,
        product: name,
        current,
        minimum,
        provider,
        unit,
        status
    });

    showNotification('✅ Producto agregado correctamente', 'success');
    saveAdminData();
    closeModal();
    switchAdminSection('inventario');
}

// ==================== PLANIFICACIÓN ====================

function openPlanRouteModal() {
    currentModalType = 'plan-route';

    const techOptions = ['Juan Pérez', 'Diego V.', 'Carlos M.', 'Roberto G.'].map(t => `<option value="${t}">${t}</option>`).join('');

    const content = `
        <div class="form-group">
            <label>Técnico</label>
            <select id="plan-tech" required>
                <option value="">Seleccionar técnico</option>
                ${techOptions}
            </select>
        </div>
        <div class="form-group">
            <label>Fecha de Planificación</label>
            <input type="date" id="plan-date" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Número de Paradas</label>
                <input type="number" id="plan-stops" min="1" max="10" placeholder="4" required>
            </div>
            <div class="form-group">
                <label>Distancia Total (km)</label>
                <input type="number" id="plan-distance" step="0.1" placeholder="38" required>
            </div>
        </div>
        <div class="form-group">
            <label>Descripción de la Ruta</label>
            <textarea id="plan-description" placeholder="Describe las paradas y detalles de la ruta" required></textarea>
        </div>
    `;

    openModal('Planificar Nueva Ruta', content, 'Planificar');
}

function savePlanRoute() {
    const tech = document.getElementById('plan-tech').value;
    const date = document.getElementById('plan-date').value;
    const stops = document.getElementById('plan-stops').value;
    const distance = document.getElementById('plan-distance').value;
    const description = document.getElementById('plan-description').value;

    if (!tech || !date || !stops || !distance || !description) {
        showNotification('Por favor completa todos los campos', 'warning');
        return;
    }

    showNotification('✅ Ruta planificada correctamente para ' + tech, 'success');
    closeModal();
    switchAdminSection('planificacion');
}

// ==================== ÓRDENES DE COMPRA ====================

function openOrderModal(productId) {
    currentModalType = 'order';
    const product = adminData.inventory.find(p => p.id === productId);

    const content = `
        <div class="form-group">
            <label>Producto</label>
            <input type="text" value="${product.product}" disabled style="background: var(--bg-light);">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Stock Actual</label>
                <input type="number" value="${product.current}" disabled style="background: var(--bg-light);">
            </div>
            <div class="form-group">
                <label>Stock Mínimo</label>
                <input type="number" value="${product.minimum}" disabled style="background: var(--bg-light);">
            </div>
        </div>
        <div class="form-group">
            <label>Cantidad a Comprar</label>
            <input type="number" id="order-quantity" min="1" placeholder="50" required>
        </div>
        <div class="form-group">
            <label>Proveedor</label>
            <input type="text" value="${product.provider}" disabled style="background: var(--bg-light);">
        </div>
        <div class="form-group">
            <label>Notas Adicionales</label>
            <textarea id="order-notes" placeholder="Ej: Entregar antes del viernes"></textarea>
        </div>
    `;

    openModal('Crear Orden de Compra', content, 'Confirmar Compra');
}

function saveOrder() {
    const quantity = document.getElementById('order-quantity').value;
    const notes = document.getElementById('order-notes').value;

    if (!quantity) {
        showNotification('Por favor especifica la cantidad', 'warning');
        return;
    }

    showNotification(`✅ Orden de compra creada por ${quantity} unidades`, 'success');
    closeModal();
    switchAdminSection('inventario');
}

// ==================== ACCIONES GENERALES ====================

function handleCardClick(type) {
    const messages = {
        maintenance: `Tienes ${adminData.routes.length} mantenciones programadas para hoy`,
        completion: `Tasa de completación: ${Math.round((adminData.routes.filter(r => r.status === 'done').length / adminData.routes.length) * 100)}% de rutas completadas`,
        stock: `Tienes ${adminData.inventory.filter(i => i.status === 'critical').length} productos con stock crítico`
    };
    showNotification(messages[type], 'info');
}
