// Ejercicios de setTimeout y setInterval - JavaScript Asíncrono
// Archivo: 05-setTimeout-setInterval.js

// ========================================
// EJERCICIO 1: SETTIMEOUT BÁSICO
// ========================================
// Este ejercicio enseña cómo usar setTimeout para ejecutar código después de un tiempo

// Variables globales para controlar los timeouts
let timeoutId; // Variable para almacenar el ID del timeout (para poder cancelarlo)

// Función que ejecuta el ejercicio 1 con múltiples setTimeout
function ejecutarEjercicio1() {
    const resultado = document.getElementById('resultado1');
    resultado.innerHTML = 'Ejecutando timeouts...<br>';
    
    // Primer setTimeout: se ejecuta después de 1 segundo
    setTimeout(() => {
        resultado.innerHTML += '1. Función ejecutada después de 1 segundo<br>';
    }, 1000); // 1000 milisegundos = 1 segundo
    
    // Segundo setTimeout: se ejecuta después de 1.5 segundos
    setTimeout(() => {
        resultado.innerHTML += '2. ¡Hola Juan! (después de 1.5s)<br>';
    }, 4000); // 1500 milisegundos = 1.5 segundos
    
    // Tercer setTimeout: se ejecuta después de 2 segundos
    // Guardamos el ID para poder cancelarlo después
    timeoutId = setTimeout(() => {
        resultado.innerHTML += '3. Función ejecutada después de 2 segundos<br>';
    }, 2000);
    
    // Cuarto setTimeout: se ejecuta después de 2.5 segundos
    setTimeout(() => {
        resultado.innerHTML += '<strong>Todos los timeouts completados</strong>';
    }, 2500);
}

// Función para cancelar el timeout (demuestra clearTimeout)
function cancelarTimeout() {
    if (timeoutId) {
        // clearTimeout cancela el timeout antes de que se ejecute
        clearTimeout(timeoutId);
        document.getElementById('resultado1').innerHTML += '<br><strong style="color: red;">Timeout cancelado</strong>';
    }
}

// ========================================
// EJERCICIO 2: SETINTERVAL BÁSICO
// ========================================
// Este ejercicio enseña cómo usar setInterval para ejecutar código repetitivamente

// Variables globales para el cronómetro
let cronometroInterval; // ID del intervalo del cronómetro
let segundosCronometro = 0; // Contador de segundos

// Función que ejecuta el ejercicio 2 (iniciar cronómetro)
function ejecutarEjercicio2() {
    // Si ya hay un cronómetro corriendo, detenerlo primero
    if (cronometroInterval) {
        clearInterval(cronometroInterval);
    }
    
    // Resetear el contador
    segundosCronometro = 0;
    
    // Crear un nuevo intervalo que se ejecuta cada 1000ms (1 segundo)
    cronometroInterval = setInterval(() => {
        segundosCronometro++; // Incrementar contador
        actualizarCronometro(segundosCronometro); // Actualizar la pantalla
    }, 1000);
    
    document.getElementById('resultado2').innerHTML = 'Cronómetro iniciado...';
}

// Función para detener el cronómetro
function detenerCronometro() {
    if (cronometroInterval) {
        // clearInterval detiene el intervalo
        clearInterval(cronometroInterval);
        document.getElementById('resultado2').innerHTML = `Cronómetro detenido en: ${document.getElementById('cronometro').textContent}`;
    }
}

// Función para resetear el cronómetro
function resetearCronometro() {
    if (cronometroInterval) {
        clearInterval(cronometroInterval);
    }
    segundosCronometro = 0;
    document.getElementById('cronometro').textContent = '00:00';
    document.getElementById('resultado2').innerHTML = 'Cronómetro reseteado';
}

// Función auxiliar para formatear y mostrar el tiempo del cronómetro
function actualizarCronometro(segundos) {
    // Convertir segundos a minutos y segundos
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    
    // Formatear como MM:SS (con ceros a la izquierda si es necesario)
    const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    
    // Actualizar el elemento HTML
    document.getElementById('cronometro').textContent = tiempoFormateado;
}

// ========================================
// EJERCICIO 3: CONTADOR VISUAL
// ========================================
// Este ejercicio enseña cómo crear un contador visual que cambia de color

// Variables globales para el contador visual
let contadorVisual = 0; // Valor actual del contador
let intervalVisual; // ID del intervalo del contador

// Función que ejecuta el ejercicio 3 (iniciar contador visual)
function iniciarContadorVisual() {
    // Si ya hay un contador corriendo, detenerlo primero
    if (intervalVisual) {
        clearInterval(intervalVisual);
    }
    
    // Resetear contador
    contadorVisual = 0;
    
    // Crear intervalo que se ejecuta cada 500ms (medio segundo)
    intervalVisual = setInterval(() => {
        contadorVisual++; // Incrementar contador
        actualizarContadorVisual(contadorVisual); // Actualizar visualmente
        
        // Cambiar velocidad según el valor del contador
        if (contadorVisual > 20) {
            // Si el contador supera 20, acelerar el intervalo
            clearInterval(intervalVisual);
            intervalVisual = setInterval(() => {
                contadorVisual++;
                actualizarContadorVisual(contadorVisual);
            }, 100); // Cambiar a 100ms (más rápido)
        }
    }, 500); // Intervalo inicial de 500ms
    
    document.getElementById('resultado3').innerHTML = 'Contador iniciado...';
}

// Función para detener el contador visual
function detenerContadorVisual() {
    if (intervalVisual) {
        clearInterval(intervalVisual);
        document.getElementById('resultado3').innerHTML = `Contador detenido en: ${contadorVisual}`;
    }
}

// Función para resetear el contador visual
function resetearContadorVisual() {
    if (intervalVisual) {
        clearInterval(intervalVisual);
    }
    contadorVisual = 0;
    actualizarContadorVisual(contadorVisual);
    document.getElementById('resultado3').innerHTML = 'Contador reseteado';
}

// Función auxiliar para actualizar la apariencia visual del contador
function actualizarContadorVisual(valor) {
    const elemento = document.getElementById('contadorVisual');
    elemento.textContent = valor; // Mostrar el valor
    
    // Cambiar color según el valor
    if (valor < 10) {
        elemento.className = 'contador'; // Color azul (por defecto)
    } else if (valor < 20) {
        elemento.className = 'contador amarillo'; // Color amarillo
    } else {
        elemento.className = 'contador rojo'; // Color rojo
    }
}

// ========================================
// EJERCICIO 4: SISTEMA DE NOTIFICACIONES
// ========================================
// Este ejercicio enseña cómo crear notificaciones que aparecen y desaparecen automáticamente

// Función que muestra una notificación temporal
function mostrarNotificacion(mensaje, tipo = 'success', duracion = 3000) {
    // Crear elemento div para la notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`; // Aplicar clases CSS
    notificacion.textContent = mensaje; // Establecer el texto
    
    // Agregar la notificación al body del documento
    document.body.appendChild(notificacion);
    
    // Mostrar con animación después de un pequeño delay
    setTimeout(() => {
        notificacion.classList.add('mostrar'); // Agregar clase para animación
    }, 100);
    
    // Ocultar después del tiempo especificado
    setTimeout(() => {
        notificacion.classList.remove('mostrar'); // Quitar clase de animación
        // Remover del DOM después de que termine la animación
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 300); // Esperar 300ms para que termine la animación CSS
    }, duracion);
}

// Función que muestra una notificación aleatoria
function mostrarNotificacionAleatoria() {
    // Arrays con mensajes y tipos aleatorios
    const mensajes = [
        "Nueva actualización disponible",
        "Archivo guardado correctamente",
        "Conexión perdida",
        "Sincronización completada",
        "Error de validación"
    ];
    
    const tipos = ['success', 'error', 'warning'];
    
    // Seleccionar mensaje y tipo aleatorios
    const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    
    // Mostrar la notificación
    mostrarNotificacion(mensaje, tipo);
}

// ========================================
// EJERCICIO 5: SLIDER AUTOMÁTICO
// ========================================
// Este ejercicio enseña cómo crear un slider que cambia automáticamente

// Variables globales para el slider
let intervalSlider; // ID del intervalo del slider
let slideActual = 0; // Índice del slide actual

// Función que ejecuta el ejercicio 5 (iniciar slider)
function iniciarSlider() {
    // Si ya hay un slider corriendo, detenerlo primero
    if (intervalSlider) {
        clearInterval(intervalSlider);
    }
    
    // Crear intervalo que cambia de slide cada 2 segundos
    intervalSlider = setInterval(() => {
        siguienteSlide(); // Cambiar al siguiente slide
    }, 2000);
    
    document.getElementById('resultado5').innerHTML = 'Slider iniciado...';
}

// Función para detener el slider
function detenerSlider() {
    if (intervalSlider) {
        clearInterval(intervalSlider);
        document.getElementById('resultado5').innerHTML = 'Slider detenido';
    }
}

// Función para reiniciar el slider
function reiniciarSlider() {
    detenerSlider(); // Detener el slider actual
    slideActual = 0; // Volver al primer slide
    
    // Resetear todos los slides visualmente
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('activo', index === 0); // Solo el primer slide activo
    });
    
    iniciarSlider(); // Iniciar nuevamente
}

// Función auxiliar para cambiar al siguiente slide
function siguienteSlide() {
    const slides = document.querySelectorAll('.slide');
    
    // Quitar clase activa del slide actual
    slides[slideActual].classList.remove('activo');
    
    // Calcular índice del siguiente slide (con wraparound)
    slideActual = (slideActual + 1) % slides.length;
    
    // Agregar clase activa al siguiente slide
    slides[slideActual].classList.add('activo');
}

// ========================================
// EJERCICIO 6: TEMPORIZADOR DE CUENTA REGRESIVA
// ========================================
// Este ejercicio enseña cómo crear un temporizador que cuenta hacia atrás

// Variables globales para la cuenta regresiva
let tiempoRestante = 0; // Tiempo restante en segundos
let intervalCuentaRegresiva; // ID del intervalo de cuenta regresiva

// Función que ejecuta el ejercicio 6 (iniciar cuenta regresiva)
function iniciarCuentaRegresiva(segundos) {
    // Si ya hay una cuenta regresiva corriendo, detenerla primero
    if (intervalCuentaRegresiva) {
        clearInterval(intervalCuentaRegresiva);
    }
    
    // Establecer tiempo inicial
    tiempoRestante = segundos;
    actualizarCuentaRegresiva(tiempoRestante); // Mostrar tiempo inicial
    
    // Crear intervalo que se ejecuta cada segundo
    intervalCuentaRegresiva = setInterval(() => {
        tiempoRestante--; // Decrementar tiempo restante
        actualizarCuentaRegresiva(tiempoRestante); // Actualizar visualmente
        
        // Verificar si el tiempo se agotó
        if (tiempoRestante <= 0) {
            clearInterval(intervalCuentaRegresiva); // Detener intervalo
            mostrarNotificacion("¡Tiempo agotado!", "error"); // Mostrar notificación
            document.getElementById('resultado6').innerHTML = '<strong style="color: red;">¡Tiempo agotado!</strong>';
        }
    }, 1000); // Ejecutar cada 1000ms (1 segundo)
    
    document.getElementById('resultado6').innerHTML = `Cuenta regresiva iniciada: ${segundos} segundos`;
}

// Función para detener la cuenta regresiva
function detenerCuentaRegresiva() {
    if (intervalCuentaRegresiva) {
        clearInterval(intervalCuentaRegresiva);
        document.getElementById('resultado6').innerHTML = `Cuenta regresiva detenida en: ${document.getElementById('cuentaRegresiva').textContent}`;
    }
}

// Función auxiliar para actualizar la visualización de la cuenta regresiva
function actualizarCuentaRegresiva(segundos) {
    // Convertir segundos a minutos y segundos
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    
    // Formatear como MM:SS
    const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    
    // Actualizar elemento HTML
    const elemento = document.getElementById('cuentaRegresiva');
    elemento.textContent = tiempoFormateado;
    
    // Cambiar color según el tiempo restante
    if (segundos > 30) {
        elemento.style.color = '#28a745'; // Verde (mucho tiempo)
    } else if (segundos > 10) {
        elemento.style.color = '#ffc107'; // Amarillo (tiempo medio)
    } else {
        elemento.style.color = '#dc3545'; // Rojo (poco tiempo)
    }
}
