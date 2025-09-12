// Ejercicios de Promises - JavaScript Asíncrono
// Archivo: 01-promises.js

// ========================================
// EJERCICIO 1: PROMISE BÁSICA
// ========================================
// Este ejercicio enseña cómo crear una Promise simple que siempre se cumple exitosamente

function crearPromiseBasica() {
    // Crear una nueva Promise con el constructor Promise()
    // Recibe una función con dos parámetros: resolve y reject
    return new Promise((resolve, reject) => {
        // setTimeout simula una operación asíncrona (como una petición HTTP)
        setTimeout(() => {
            // resolve() se llama cuando la operación es exitosa
            // El valor que pasamos será recibido por .then()
            resolve("¡Operación completada exitosamente!");
        }, 2000); // Esperar 2 segundos antes de resolver
    });
}

// Función que ejecuta el ejercicio 1 y muestra el resultado en la página
function ejecutarEjercicio1() {
    // Obtener el elemento HTML donde mostraremos el resultado
    const resultado = document.getElementById('resultado1');
    // Mostrar mensaje de "cargando" mientras esperamos
    resultado.textContent = "Ejecutando...";
    
    // Llamar a la función que crea la Promise
    crearPromiseBasica()
        // .then() se ejecuta cuando la Promise se cumple exitosamente
        .then(resultadoTexto => {
            // Mostrar el resultado en la página
            resultado.textContent = resultadoTexto;
        })
        // .catch() se ejecuta si la Promise es rechazada (aunque aquí no pasa)
        .catch(error => {
            resultado.textContent = "Error: " + error.message;
        });
}

// ========================================
// EJERCICIO 2: PROMISE CON MANEJO DE ERRORES
// ========================================
// Este ejercicio enseña cómo crear una Promise que puede fallar y cómo manejar errores
function crearPromiseConError(exito = true) {
    // Crear una Promise que puede fallar o tener éxito
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Usar el parámetro 'exito' para decidir qué hacer
            if (exito) {
                // Si exito es true, resolver la Promise exitosamente
                resolve("¡Operación exitosa!");
            } else {
                // Si exito es false, rechazar la Promise con un error
                // reject() se llama cuando algo sale mal
                reject(new Error("Algo salió mal"));
            }
        }, 1500); // Esperar 1.5 segundos
    });
}

// Función que ejecuta el ejercicio 2 con diferentes parámetros
function ejecutarEjercicio2(exito) {
    const resultado = document.getElementById('resultado2');
    resultado.textContent = "Ejecutando...";
    
    // Llamar a la función con el parámetro de éxito/fallo
    crearPromiseConError(exito)
        .then(resultadoTexto => {
            // Si la Promise se cumple, mostrar el mensaje de éxito
            resultado.textContent = resultadoTexto;
        })
        .catch(error => {
            // Si la Promise es rechazada, mostrar el error
            resultado.textContent = "Error: " + error.message;
        });
}

// ========================================
// EJERCICIO 3: PROMISE.ALL
// ========================================
// Este ejercicio enseña cómo ejecutar múltiples Promises en paralelo
function simularDescarga(archivo, tiempo) {
    // Función que simula la descarga de un archivo
    // Recibe el nombre del archivo y el tiempo que tardará
    return new Promise((resolve) => {
        setTimeout(() => {
            // Resolver con un mensaje indicando que el archivo se descargó
            resolve(`Archivo ${archivo} descargado`);
        }, tiempo); // El tiempo simula la velocidad de descarga
    });
}

// Función que ejecuta el ejercicio 3 usando Promise.all
function ejecutarEjercicio3() {
    const resultado = document.getElementById('resultado3');
    resultado.textContent = "Descargando archivos...";
    
    // Promise.all() ejecuta múltiples Promises en paralelo
    // Todas las Promises deben completarse exitosamente
    Promise.all([
        simularDescarga("imagen1.jpg", 1000), // Descarga rápida (1 segundo)
        simularDescarga("imagen2.jpg", 1500), // Descarga media (1.5 segundos)
        simularDescarga("imagen3.jpg", 2000)  // Descarga lenta (2 segundos)
    ])
    .then(resultados => {
        // Cuando TODAS las Promises se completan, recibimos un array con los resultados
        // Los resultados están en el mismo orden que las Promises
        resultado.innerHTML = resultados.map(r => `• ${r}`).join('<br>');
    })
    .catch(error => {
        // Si CUALQUIERA de las Promises falla, toda la operación falla
        resultado.textContent = "Error: " + error.message;
    });
}

// ========================================
// EJERCICIO 4: PROMISE.RACE
// ========================================
// Este ejercicio enseña cómo obtener el resultado de la Promise más rápida
function simularConexion(servidor, tiempo) {
    // Función que simula una conexión a un servidor
    // Recibe el nombre del servidor y el tiempo de respuesta
    return new Promise((resolve) => {
        setTimeout(() => {
            // Resolver con un mensaje de conexión exitosa
            resolve(`Conectado a ${servidor}`);
        }, tiempo); // El tiempo simula la latencia del servidor
    });
}

// Función que ejecuta el ejercicio 4 usando Promise.race
function ejecutarEjercicio4() {
    const resultado = document.getElementById('resultado4');
    resultado.textContent = "Probando conexiones...";
    
    // Promise.race() ejecuta múltiples Promises en paralelo
    // Pero solo espera al resultado de la PRIMERA que se complete
    Promise.race([
        simularConexion("Servidor A", 3000), // Servidor lento (3 segundos)
        simularConexion("Servidor B", 1500), // Servidor rápido (1.5 segundos) - ¡Este ganará!
        simularConexion("Servidor C", 2000)  // Servidor medio (2 segundos)
    ])
    .then(resultadoTexto => {
        // Solo recibimos el resultado de la Promise más rápida
        // Las demás Promises se ignoran (pero siguen ejecutándose en segundo plano)
        resultado.textContent = resultadoTexto;
    })
    .catch(error => {
        // Si la Promise más rápida falla, toda la operación falla
        resultado.textContent = "Error: " + error.message;
    });
}
