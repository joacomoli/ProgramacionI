// Variables globales
var productos = [];
var proximoId = 1;

// Función para AGREGAR producto
function agregarProducto() {
    var inputNombre = document.getElementById('nombre-producto');
    var inputCantidad = document.getElementById('cantidad-producto');
    
    var nombre = inputNombre.value.trim();
    var cantidad = parseInt(inputCantidad.value);
    
    // Validaciones
    if (nombre === '') {
        alert('❌ Por favor, escribe el nombre del producto');
        inputNombre.focus();
        return;
    }
    
    if (isNaN(cantidad) || cantidad < 1) {
        alert('❌ La cantidad debe ser un número mayor a 0');
        inputCantidad.focus();
        return;
    }
    
    // Crear el nuevo producto
    var producto = {
        id: proximoId,
        nombre: nombre,
        cantidad: cantidad,
        comprado: false
    };
    
    // Agregar al array y actualizar
    productos.push(producto);
    proximoId++;
    
    // Limpiar inputs y actualizar vista
    inputNombre.value = '';
    inputCantidad.value = '1';
    inputNombre.focus();
    
    mostrarProductos();
    actualizarResumen();
}

// Función para MOSTRAR todos los productos
function mostrarProductos() {
    var lista = document.getElementById('lista-productos');
    lista.innerHTML = '';
    
    // Si no hay productos, mostrar mensaje
    if (productos.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Tu lista de compras está vacía</p>';
        return;
    }
    
    // Recorrer y mostrar cada producto
    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        
        var div = document.createElement('div');
        div.className = 'producto';
        if (producto.comprado) {
            div.className += ' comprado';
        }
        
        div.innerHTML = `
            <div class="info-producto">
                <span class="nombre-producto">${producto.nombre}</span>
                <span class="cantidad-producto">${producto.cantidad}</span>
            </div>
            <div class="acciones-producto">
                <button class="btn-comprar" onclick="marcarComprado(${producto.id})">
                    ${producto.comprado ? '↶ Deshacer' : '✓ Comprar'}
                </button>
                <button class="btn-editar" onclick="editarProducto(${producto.id})">✏️ Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">🗑️ Eliminar</button>
            </div>
        `;
        
        lista.appendChild(div);
    }
}

// Función para MARCAR como comprado/descomprado
function marcarComprado(id) {
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            productos[i].comprado = !productos[i].comprado;
            break;
        }
    }
    mostrarProductos();
    actualizarResumen();
}

// Función para ELIMINAR producto
function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        return;
    }
    
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            productos.splice(i, 1);
            break;
        }
    }
    mostrarProductos();
    actualizarResumen();
}

// Función para EDITAR producto
function editarProducto(id) {
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            var producto = productos[i];
            
            var nuevoNombre = prompt('Editar nombre del producto:', producto.nombre);
            if (nuevoNombre === null) return; // Usuario canceló
            
            var nuevaCantidad = prompt('Editar cantidad:', producto.cantidad);
            if (nuevaCantidad === null) return;
            
            // Validar nueva cantidad
            nuevaCantidad = parseInt(nuevaCantidad);
            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                alert('❌ La cantidad debe ser un número mayor a 0');
                return;
            }
            
            // Actualizar producto
            productos[i].nombre = nuevoNombre.trim();
            productos[i].cantidad = nuevaCantidad;
            
            break;
        }
    }
    mostrarProductos();
    actualizarResumen();
}

// Función para ACTUALIZAR el resumen
function actualizarResumen() {
    var resumen = document.getElementById('resumen');
    
    var totalProductos = productos.length;
    var productosComprados = 0;
    var totalUnidades = 0;
    
    // Calcular estadísticas
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].comprado) {
            productosComprados++;
        }
        totalUnidades += productos[i].cantidad;
    }
    
    var productosPendientes = totalProductos - productosComprados;
    
    resumen.innerHTML = `
        <h3>📊 Resumen de Compra</h3>
        <div id="detalles-resumen">
            <div class="item-resumen">
                <div class="numero">${totalProductos}</div>
                <div>Productos</div>
            </div>
            <div class="item-resumen">
                <div class="numero" style="color: #4CAF50;">${productosComprados}</div>
                <div>Comprados</div>
            </div>
            <div class="item-resumen">
                <div class="numero" style="color: #FF9800;">${productosPendientes}</div>
                <div>Pendientes</div>
            </div>
            <div class="item-resumen">
                <div class="numero" style="color: #2196F3;">${totalUnidades}</div>
                <div>Unidades</div>
            </div>
        </div>
    `;
}

// Función para permitir agregar con Enter
document.getElementById('nombre-producto').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarProducto();
    }
});

document.getElementById('cantidad-producto').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarProducto();
    }
});

// Inicializar con algunos productos de ejemplo
function inicializarEjemplos() {
    productos = [
        { id: 1, nombre: "Manzanas", cantidad: 5, comprado: false },
        { id: 2, nombre: "Leche", cantidad: 2, comprado: true },
        { id: 3, nombre: "Pan", cantidad: 1, comprado: false }
    ];
    proximoId = 4;
    mostrarProductos();
    actualizarResumen();
}

// Iniciar la aplicación cuando se carga la página
window.onload = inicializarEjemplos;