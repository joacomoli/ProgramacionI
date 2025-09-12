// Ejercicios de Async/Await - JavaScript Asíncrono
// Archivo: 02-async-await.js

// ========================================
// EJERCICIO 1: ASYNC/AWAIT BÁSICO
// ========================================
// Este ejercicio enseña la sintaxis básica de async/await vs Promises

async function simularObtenerUsuario(id) {
    // Simular una petición HTTP que tarda 1 segundo
    // await hace que JavaScript espere a que se complete la Promise
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retornar un objeto con datos del usuario
    return {
        id: id,
        nombre: "Juan Pérez",
        email: "juan@ejemplo.com"
    };
}

// Función que ejecuta el ejercicio 1 y demuestra async/await
async function ejecutarEjercicio1() {
    const resultado = document.getElementById('resultado1');
    resultado.textContent = "Obteniendo usuario...";
    
    try {
        // await hace que esperemos a que la función async termine
        // El código se pausa aquí hasta que simularObtenerUsuario termine
        const usuario = await simularObtenerUsuario(123);
        
        // Una vez que tenemos el usuario, mostrar la información
        resultado.textContent = `Usuario obtenido: ${usuario.nombre} (${usuario.email})`;
    } catch (error) {
        // Si algo sale mal, mostrar el error
        resultado.textContent = "Error: " + error.message;
    }
}

// ========================================
// EJERCICIO 2: OPERACIONES SECUENCIALES
// ========================================
// Este ejercicio enseña cómo ejecutar operaciones una después de otra
// Función que simula la validación de un pedido
async function validarPedido(pedidoId) {
    // Simular tiempo de validación (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Retornar datos del pedido validado
    return {
        id: pedidoId,
        productos: ["laptop", "mouse", "teclado"],
        total: 1500,
        email: "cliente@ejemplo.com"
    };
}

// Función que simula la verificación de inventario
async function verificarInventario(productos) {
    // Simular tiempo de verificación (600ms)
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Retornar estado de disponibilidad para cada producto
    return productos.map(p => ({ producto: p, disponible: true }));
}

// Función que simula el procesamiento de pago
async function procesarPago(total) {
    // Simular tiempo de procesamiento de pago (1200ms)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Retornar información de la transacción
    return { 
        transaccionId: "TXN123456", 
        monto: total, 
        estado: "aprobado" 
    };
}

// Función que simula el envío de confirmación por email
async function enviarConfirmacion(email) {
    // Simular tiempo de envío de email (500ms)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Retornar confirmación de envío
    return { email: email, enviado: true };
}

async function procesarPedido(pedidoId) {
    try {
        console.log("1. Validando pedido...");
        const pedido = await validarPedido(pedidoId);
        
        console.log("2. Verificando inventario...");
        const inventario = await verificarInventario(pedido.productos);
        
        console.log("3. Procesando pago...");
        const pago = await procesarPago(pedido.total);
        
        console.log("4. Enviando confirmación...");
        await enviarConfirmacion(pedido.email);
        
        return {
            pedido: pedido,
            inventario: inventario,
            pago: pago,
            estado: "completado"
        };
    } catch (error) {
        console.error("Error en el procesamiento:", error);
        throw error;
    }
}

async function ejecutarEjercicio2() {
    const resultado = document.getElementById('resultado2');
    resultado.textContent = "Procesando pedido...";
    
    try {
        const resultadoPedido = await procesarPedido("PED001");
        resultado.textContent = `Pedido ${resultadoPedido.pedido.id} procesado exitosamente. Estado: ${resultadoPedido.estado}`;
    } catch (error) {
        resultado.textContent = "Error: " + error.message;
    }
}

// Ejercicio 3: Operaciones paralelas
async function obtenerUsuario(usuarioId) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { id: usuarioId, nombre: "María García" };
}

async function obtenerPedidos(usuarioId) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [{ id: "PED001", total: 150 }, { id: "PED002", total: 200 }];
}

async function obtenerProductosRecomendados(usuarioId) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return ["Producto A", "Producto B", "Producto C"];
}

async function obtenerNotificaciones(usuarioId) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [{ mensaje: "Nueva oferta disponible" }, { mensaje: "Pedido enviado" }];
}

async function obtenerDashboardCompleto(usuarioId) {
    try {
        console.log("Obteniendo datos en paralelo...");
        
        const [usuario, pedidos, productos, notificaciones] = await Promise.all([
            obtenerUsuario(usuarioId),
            obtenerPedidos(usuarioId),
            obtenerProductosRecomendados(usuarioId),
            obtenerNotificaciones(usuarioId)
        ]);
        
        return {
            usuario,
            pedidos,
            productos,
            notificaciones,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error("Error obteniendo dashboard:", error);
        throw error;
    }
}

async function ejecutarEjercicio3() {
    const resultado = document.getElementById('resultado3');
    resultado.textContent = "Obteniendo dashboard...";
    
    try {
        const dashboard = await obtenerDashboardCompleto(123);
        resultado.innerHTML = `
            <strong>Dashboard obtenido:</strong><br>
            Usuario: ${dashboard.usuario.nombre}<br>
            Pedidos: ${dashboard.pedidos.length}<br>
            Productos recomendados: ${dashboard.productos.length}<br>
            Notificaciones: ${dashboard.notificaciones.length}<br>
            Timestamp: ${dashboard.timestamp}
        `;
    } catch (error) {
        resultado.textContent = "Error: " + error.message;
    }
}

// Ejercicio 4: Manejo de errores
async function subirArchivo(archivo) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { url: "https://ejemplo.com/archivo.jpg", id: "ARCH123" };
}

async function subirArchivoConValidacion(archivo) {
    try {
        if (!archivo) {
            throw new Error("No se proporcionó ningún archivo");
        }
        
        if (archivo.size > 5 * 1024 * 1024) {
            throw new Error("El archivo es demasiado grande (máximo 5MB)");
        }
        
        console.log("Validación exitosa, subiendo archivo...");
        const resultado = await subirArchivo(archivo);
        
        console.log("Archivo subido exitosamente");
        return resultado;
        
    } catch (error) {
        if (error.name === 'NetworkError') {
            console.error("Error de red:", error.message);
            return { error: "Error de conexión. Intenta nuevamente." };
        } else if (error.name === 'ValidationError') {
            console.error("Error de validación:", error.message);
            return { error: error.message };
        } else {
            console.error("Error inesperado:", error.message);
            return { error: "Error inesperado. Contacta soporte." };
        }
    }
}

async function ejecutarEjercicio4(valido) {
    const resultado = document.getElementById('resultado4');
    resultado.textContent = "Procesando archivo...";
    
    const archivo = valido ? 
        { name: "documento.pdf", size: 1024 * 1024 } : // 1MB
        { name: "video.mp4", size: 10 * 1024 * 1024 }; // 10MB
    
    const resultadoSubida = await subirArchivoConValidacion(archivo);
    
    if (resultadoSubida.error) {
        resultado.textContent = resultadoSubida.error;
    } else {
        resultado.textContent = `Archivo subido exitosamente: ${resultadoSubida.url}`;
    }
}

// Ejercicio 5: Async/Await en bucles
async function procesarElemento(elemento) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `Procesado: ${elemento}`;
}

async function procesarElementosSecuencial(elementos) {
    const resultados = [];
    
    for (const elemento of elementos) {
        try {
            console.log(`Procesando: ${elemento}`);
            const resultado = await procesarElemento(elemento);
            resultados.push(resultado);
        } catch (error) {
            console.error(`Error procesando ${elemento}:`, error);
            resultados.push({ error: error.message, elemento });
        }
    }
    
    return resultados;
}

async function procesarElementosParalelo(elementos) {
    try {
        const promesas = elementos.map(elemento => procesarElemento(elemento));
        const resultados = await Promise.allSettled(promesas);
        
        return resultados.map((resultado, index) => ({
            elemento: elementos[index],
            resultado: resultado.status === 'fulfilled' ? resultado.value : resultado.reason
        }));
    } catch (error) {
        console.error("Error en procesamiento paralelo:", error);
        throw error;
    }
}

async function ejecutarEjercicio5(tipo) {
    const resultado = document.getElementById('resultado5');
    resultado.textContent = `Procesando elementos (${tipo})...`;
    
    const elementos = ["Elemento A", "Elemento B", "Elemento C"];
    
    try {
        let resultados;
        if (tipo === 'secuencial') {
            resultados = await procesarElementosSecuencial(elementos);
        } else {
            resultados = await procesarElementosParalelo(elementos);
        }
        
        resultado.innerHTML = resultados.map(r => 
            `• ${typeof r === 'string' ? r : r.resultado}`
        ).join('<br>');
    } catch (error) {
        resultado.textContent = "Error: " + error.message;
    }
}
