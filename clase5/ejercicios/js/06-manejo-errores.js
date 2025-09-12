// Ejercicios de Manejo de Errores y APIs - JavaScript Asíncrono
// Archivo: 06-manejo-errores.js

// ========================================
// EJERCICIO 1: CÓDIGOS DE ESTADO HTTP
// ========================================
// Este ejercicio enseña los diferentes códigos de estado HTTP y cómo manejarlos

// Objeto que contiene todos los códigos de estado HTTP importantes
const codigosEstado = {
    200: "Ejecución exitosa, todo OK",
    400: "El pedido era correcto, pero falló en un parámetro",
    401: "No nos autenticamos correctamente",
    403: "Prohibido, no tenemos permisos suficientes",
    404: "Escribimos mal la API por lo tanto no existe",
    429: "Demasiados pedidos, se saturó la API",
    500: "Error del lado del servidor"
};

// Función que ejecuta el ejercicio 1 y muestra todos los códigos de estado
function ejecutarEjercicio1() {
    const resultado = document.getElementById('resultado1');
    let html = '<h4>Códigos de Estado HTTP:</h4>';
    
    // Iterar sobre todos los códigos y crear elementos visuales
    Object.entries(codigosEstado).forEach(([codigo, descripcion]) => {
        // Crear elemento con clase CSS según el tipo de código
        html += `<div><span class="status-code status-${codigo}">${codigo}</span> ${descripcion}</div>`;
    });
    
    resultado.innerHTML = html;
}

// ========================================
// EJERCICIO 2: MANEJO DE ERRORES CON TRY/CATCH
// ========================================
// Este ejercicio enseña cómo usar try/catch para capturar y manejar errores

// Función que realiza operaciones que pueden fallar
async function realizarOperacionRiesgosa(tipo) {
    try {
        // Usar switch para diferentes tipos de operaciones que pueden fallar
        switch(tipo) {
            case 'division':
                // Simular división por cero
                const resultado = 10 / 0; // Esto resulta en Infinity
                if (!isFinite(resultado)) {
                    throw new Error("División por cero no permitida");
                }
                return resultado;
                
            case 'json':
                // Simular JSON inválido
                const jsonInvalido = "{ nombre: 'Juan' }"; // JSON inválido (falta comillas)
                return JSON.parse(jsonInvalido); // Esto lanzará SyntaxError
                
            case 'fetch':
                // Simular petición a API inexistente
                const response = await fetch('https://api-inexistente.com/datos');
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return await response.json();
                
            case 'array':
                // Simular acceso a índice fuera de rango
                const array = [1, 2, 3];
                return array[10]; // Índice fuera de rango
                
            default:
                throw new Error("Tipo de operación no válido");
        }
    } catch (error) {
        // Registrar el error en la consola para debugging
        console.error("Error capturado:", error);
        throw error; // Re-lanzar el error para que lo maneje el llamador
    }
}

// Función que maneja diferentes tipos de errores de forma centralizada
function manejarError(error) {
    // Verificar el tipo de error y retornar mensaje apropiado
    if (error instanceof TypeError) {
        return "Error de tipo: " + error.message;
    } else if (error instanceof SyntaxError) {
        return "Error de sintaxis: " + error.message;
    } else if (error instanceof ReferenceError) {
        return "Error de referencia: " + error.message;
    } else {
        return "Error general: " + error.message;
    }
}

// Función que ejecuta el ejercicio 2
async function ejecutarEjercicio2(tipo) {
    const resultado = document.getElementById('resultado2');
    resultado.innerHTML = '<div class="loading"></div> Procesando...';
    
    try {
        // Intentar realizar la operación riesgosa
        const resultadoOperacion = await realizarOperacionRiesgosa(tipo);
        resultado.innerHTML = `<div class="success-message">Operación exitosa: ${JSON.stringify(resultadoOperacion)}</div>`;
    } catch (error) {
        // Si hay error, usar la función de manejo centralizado
        const mensajeError = manejarError(error);
        resultado.innerHTML = `<div class="error-message">${mensajeError}</div>`;
    }
}

// ========================================
// EJERCICIO 3: VALIDACIÓN DE FORMULARIOS
// ========================================
// Este ejercicio enseña cómo implementar validación robusta con manejo de errores específicos

// Clase que maneja la validación de formularios
class ValidadorFormulario {
    constructor() {
        this.errores = []; // Array para almacenar errores encontrados
    }
    
    // Método para validar el nombre
    validarNombre(nombre) {
        if (!nombre) {
            this.errores.push("El nombre es requerido");
            return false;
        }
        if (nombre.length < 2) {
            this.errores.push("El nombre debe tener al menos 2 caracteres");
            return false;
        }
        // Usar expresión regular para validar que solo contenga letras y espacios
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            this.errores.push("El nombre solo puede contener letras");
            return false;
        }
        return true;
    }
    
    // Método para validar el email
    validarEmail(email) {
        if (!email) {
            this.errores.push("El email es requerido");
            return false;
        }
        // Usar expresión regular para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.errores.push("El formato del email no es válido");
            return false;
        }
        return true;
    }
    
    // Método para validar la edad
    validarEdad(edad) {
        if (!edad) {
            this.errores.push("La edad es requerida");
            return false;
        }
        const edadNum = parseInt(edad);
        if (isNaN(edadNum)) {
            this.errores.push("La edad debe ser un número");
            return false;
        }
        if (edadNum < 18) {
            this.errores.push("Debe ser mayor de 18 años");
            return false;
        }
        if (edadNum > 120) {
            this.errores.push("La edad debe ser menor a 120 años");
            return false;
        }
        return true;
    }
    
    // Método principal que valida todo el formulario
    validarFormulario(datos) {
        this.errores = []; // Limpiar errores anteriores
        
        // Ejecutar todas las validaciones
        const esValido = 
            this.validarNombre(datos.nombre) &&
            this.validarEmail(datos.email) &&
            this.validarEdad(datos.edad);
        
        // Retornar resultado con errores
        return {
            esValido: esValido,
            errores: this.errores
        };
    }
}

// Función que ejecuta el ejercicio 3
function validarFormulario() {
    const resultado = document.getElementById('resultado3');
    const validador = new ValidadorFormulario();
    
    // Obtener datos del formulario
    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        edad: document.getElementById('edad').value
    };
    
    // Validar formulario
    const validacion = validador.validarFormulario(datos);
    
    if (validacion.esValido) {
        resultado.innerHTML = '<div class="success-message">Formulario válido. Todos los datos son correctos.</div>';
    } else {
        // Mostrar errores encontrados
        let html = '<div class="error-message"><strong>Errores encontrados:</strong><ul>';
        validacion.errores.forEach(error => {
            html += `<li>${error}</li>`;
        });
        html += '</ul></div>';
        resultado.innerHTML = html;
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('resultado3').innerHTML = 'Formulario limpiado';
}

// ========================================
// EJERCICIO 4: SIMULACIÓN DE API CON DIFERENTES RESPUESTAS
// ========================================
// Este ejercicio enseña cómo simular diferentes respuestas de API y manejar cada caso

// Clase que simula diferentes tipos de respuestas de API
class SimuladorAPI {
    // Método estático que simula diferentes tipos de respuesta
    static async simularRespuesta(tipoRespuesta) {
        // Simular latencia de red (tiempo de respuesta)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Retornar diferentes respuestas según el tipo
        switch(tipoRespuesta) {
            case 'exito':
                return {
                    status: 200,
                    data: {
                        usuarios: [
                            { id: 1, nombre: "Juan Pérez", email: "juan@ejemplo.com" },
                            { id: 2, nombre: "María García", email: "maria@ejemplo.com" }
                        ],
                        total: 2
                    }
                };
                
            case 'error_validacion':
                return {
                    status: 400,
                    error: {
                        mensaje: "Datos de entrada inválidos",
                        detalles: ["El email es requerido", "La edad debe ser un número"]
                    }
                };
                
            case 'no_autorizado':
                return {
                    status: 401,
                    error: {
                        mensaje: "Token de autenticación inválido o expirado"
                    }
                };
                
            case 'no_encontrado':
                return {
                    status: 404,
                    error: {
                        mensaje: "El recurso solicitado no existe"
                    }
                };
                
            case 'limite_excedido':
                return {
                    status: 429,
                    error: {
                        mensaje: "Demasiadas solicitudes. Intenta nuevamente en 1 minuto"
                    }
                };
                
            case 'error_servidor':
                return {
                    status: 500,
                    error: {
                        mensaje: "Error interno del servidor"
                    }
                };
                
            default:
                throw new Error("Tipo de respuesta no válido");
        }
    }
    
    // Método estático que procesa la respuesta y maneja errores
    static async procesarRespuesta(tipoRespuesta) {
        try {
            // Obtener respuesta simulada
            const response = await this.simularRespuesta(tipoRespuesta);
            
            // Verificar si la respuesta es exitosa (código 200-299)
            if (response.status >= 200 && response.status < 300) {
                return {
                    exito: true,
                    datos: response.data,
                    mensaje: "Operación exitosa"
                };
            } else {
                // Respuesta con error
                return {
                    exito: false,
                    error: response.error,
                    codigo: response.status
                };
            }
        } catch (error) {
            // Error en la simulación
            return {
                exito: false,
                error: { mensaje: error.message },
                codigo: 0
            };
        }
    }
}

// Función que ejecuta el ejercicio 4
async function simularAPI(tipoRespuesta) {
    const resultado = document.getElementById('resultado4');
    resultado.innerHTML = '<div class="loading"></div> Simulando respuesta de API...';
    
    // Procesar respuesta simulada
    const respuesta = await SimuladorAPI.procesarRespuesta(tipoRespuesta);
    
    if (respuesta.exito) {
        // Mostrar respuesta exitosa
        resultado.innerHTML = `
            <div class="success-message">
                <strong>Respuesta exitosa (${respuesta.codigo || 200})</strong><br>
                <div class="api-response">${JSON.stringify(respuesta.datos, null, 2)}</div>
            </div>
        `;
    } else {
        // Mostrar respuesta con error
        resultado.innerHTML = `
            <div class="error-message">
                <strong>Error (${respuesta.codigo})</strong><br>
                ${respuesta.error.mensaje}
                ${respuesta.error.detalles ? '<br>Detalles: ' + respuesta.error.detalles.join(', ') : ''}
            </div>
        `;
    }
}

// ========================================
// EJERCICIO 5: SISTEMA DE REINTENTOS
// ========================================
// Este ejercicio enseña cómo implementar un sistema de reintentos para operaciones que pueden fallar

// Clase que maneja el sistema de reintentos
class SistemaReintentos {
    // Método estático que ejecuta una operación con reintentos
    static async ejecutarConReintentos(operacion, maxReintentos = 3, delay = 1000) {
        let ultimoError; // Variable para guardar el último error
        
        // Intentar la operación hasta maxReintentos veces
        for (let intento = 1; intento <= maxReintentos; intento++) {
            try {
                console.log(`Intento ${intento} de ${maxReintentos}`);
                // Ejecutar la operación
                const resultado = await operacion();
                return {
                    exito: true,
                    resultado: resultado,
                    intentos: intento
                };
            } catch (error) {
                ultimoError = error;
                console.log(`Intento ${intento} falló:`, error.message);
                
                // Si no es el último intento, esperar antes del siguiente
                if (intento < maxReintentos) {
                    console.log(`Esperando ${delay}ms antes del siguiente intento...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Backoff exponencial (doblar el delay)
                }
            }
        }
        
        // Si llegamos aquí, todos los intentos fallaron
        return {
            exito: false,
            error: ultimoError,
            intentos: maxReintentos
        };
    }
    
    // Método estático que simula una operación inestable
    static async operacionInestable() {
        const probabilidadExito = 0.3; // 30% de probabilidad de éxito
        const random = Math.random();
        
        if (random < probabilidadExito) {
            return { mensaje: "Operación exitosa", timestamp: new Date().toISOString() };
        } else {
            throw new Error("La operación falló aleatoriamente");
        }
    }
    
    // Método estático que simula una operación con timeout
    static async operacionConTimeout() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const exito = Math.random() > 0.5;
                if (exito) {
                    resolve({ mensaje: "Operación completada" });
                } else {
                    reject(new Error("Timeout en la operación"));
                }
            }, 2000);
        });
    }
}

// Función que ejecuta el ejercicio 5
async function ejecutarReintentos(tipo) {
    const resultado = document.getElementById('resultado5');
    resultado.innerHTML = '<div class="loading"></div> Ejecutando con reintentos...';
    
    // Seleccionar operación según el tipo
    let operacion;
    switch(tipo) {
        case 'inestable':
            operacion = SistemaReintentos.operacionInestable;
            break;
        case 'timeout':
            operacion = SistemaReintentos.operacionConTimeout;
            break;
        case 'fetch':
            operacion = async () => {
                const response = await fetch('https://api-inexistente.com/datos');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.json();
            };
            break;
    }
    
    // Ejecutar con sistema de reintentos
    const resultadoReintentos = await SistemaReintentos.ejecutarConReintentos(operacion);
    
    if (resultadoReintentos.exito) {
        resultado.innerHTML = `
            <div class="success-message">
                <strong>Operación exitosa después de ${resultadoReintentos.intentos} intentos</strong><br>
                Resultado: ${JSON.stringify(resultadoReintentos.resultado)}
            </div>
        `;
    } else {
        resultado.innerHTML = `
            <div class="error-message">
                <strong>Operación falló después de ${resultadoReintentos.intentos} intentos</strong><br>
                Error: ${resultadoReintentos.error.message}
            </div>
        `;
    }
}

// ========================================
// EJERCICIO 6: LOGGING Y MONITOREO DE ERRORES
// ========================================
// Este ejercicio enseña cómo implementar un sistema de logging para monitorear errores

// Clase que maneja el sistema de logging
class LoggerErrores {
    constructor() {
        this.logs = []; // Array para almacenar todos los logs
        this.niveles = {
            INFO: 'info',
            WARNING: 'warning',
            ERROR: 'error',
            CRITICAL: 'critical'
        };
    }
    
    // Método principal para crear logs
    log(nivel, mensaje, contexto = {}) {
        // Crear objeto de log con toda la información
        const logEntry = {
            timestamp: new Date().toISOString(), // Timestamp ISO
            nivel: nivel,
            mensaje: mensaje,
            contexto: contexto,
            userAgent: navigator.userAgent, // Información del navegador
            url: window.location.href // URL actual
        };
        
        // Agregar a array de logs
        this.logs.push(logEntry);
        
        // Mostrar en consola para debugging
        console.log(`[${nivel.toUpperCase()}] ${mensaje}`, contexto);
        
        // En un entorno real, aquí enviarías el log a un servicio externo
        this.enviarLogExterno(logEntry);
    }
    
    // Métodos específicos para cada nivel de log
    info(mensaje, contexto) {
        this.log(this.niveles.INFO, mensaje, contexto);
    }
    
    warning(mensaje, contexto) {
        this.log(this.niveles.WARNING, mensaje, contexto);
    }
    
    error(mensaje, contexto) {
        this.log(this.niveles.ERROR, mensaje, contexto);
    }
    
    critical(mensaje, contexto) {
        this.log(this.niveles.CRITICAL, mensaje, contexto);
    }
    
    // Método que simula envío a servicio externo
    enviarLogExterno(logEntry) {
        console.log("Enviando log a servicio externo:", logEntry);
    }
    
    // Método para obtener logs filtrados por nivel
    obtenerLogs(nivel = null) {
        if (nivel) {
            return this.logs.filter(log => log.nivel === nivel);
        }
        return this.logs;
    }
    
    // Método para limpiar todos los logs
    limpiarLogs() {
        this.logs = [];
    }
}

// Crear instancia global del logger
const logger = new LoggerErrores();

// Función que genera logs de prueba
function generarLogs() {
    logger.info("Usuario inició sesión", { userId: 123 });
    logger.warning("Conexión lenta detectada", { responseTime: 5000 });
    logger.error("Error al cargar datos", { error: "Network timeout" });
    logger.critical("Sistema de pagos no disponible", { service: "payment-gateway" });
    
    document.getElementById('resultado6').innerHTML = '<div class="success-message">Logs de prueba generados. Revisa la consola.</div>';
}

// Función que muestra logs filtrados
function mostrarLogs(nivel = null) {
    const logs = logger.obtenerLogs(nivel);
    const resultado = document.getElementById('resultado6');
    
    if (logs.length === 0) {
        resultado.innerHTML = '<div class="warning-message">No hay logs disponibles</div>';
        return;
    }
    
    let html = `<h4>Logs ${nivel ? `(${nivel})` : '(todos)'}:</h4>`;
    logs.forEach(log => {
        // Determinar clase CSS según el nivel
        const clase = log.nivel === 'error' || log.nivel === 'critical' ? 'error-message' : 
                     log.nivel === 'warning' ? 'warning-message' : 'success-message';
        
        html += `
            <div class="${clase}">
                <strong>[${log.nivel.toUpperCase()}]</strong> ${log.mensaje}<br>
                <small>${log.timestamp}</small>
            </div>
        `;
    });
    
    resultado.innerHTML = html;
}

// Función para limpiar todos los logs
function limpiarLogs() {
    logger.limpiarLogs();
    document.getElementById('resultado6').innerHTML = '<div class="success-message">Logs limpiados</div>';
}
