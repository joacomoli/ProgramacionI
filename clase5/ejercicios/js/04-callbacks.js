// Ejercicios de Callbacks - JavaScript Asíncrono
// Archivo: 04-callbacks.js

// ========================================
// EJERCICIO 1: CALLBACKS CON FOREACH
// ========================================
// Este ejercicio enseña la diferencia entre bucles tradicionales y callbacks

// Función que ejecuta el ejercicio 1 y muestra la comparación
function ejecutarEjercicio1() {
    // Obtener el elemento HTML donde mostraremos el resultado
    const resultado = document.getElementById('resultado1');
    resultado.innerHTML = '<h4>Comparación de resultados:</h4>';
    
    // Array de ejemplo para demostrar los diferentes enfoques
    const list = ["A", "B", "C"];
    
    // Mostrar resultados del bucle tradicional
    resultado.innerHTML += '<h5>Bucle Tradicional:</h5>';
    for (let i = 0; i < list.length; i++) {
        resultado.innerHTML += `<div>i= ${i}, list= ${list[i]}</div>`;
    }


    // Mostrar resultados usando forEach con callback
    resultado.innerHTML += '<h5>Con Callbacks (forEach):</h5>';
    list.forEach((element, index) => {
        resultado.innerHTML += `<div>i= ${index}, list= ${element}</div>`;
    });
}

// Ejercicio 2: Callbacks con setTimeout
function ejecutarEjercicio2() {
    const resultado = document.getElementById('resultado2');
    resultado.innerHTML = 'Ejecutando timeouts...<br>';
    
    setTimeout(() => {
        resultado.innerHTML += '1. Función ejecutada después de 1 segundo<br>';
    }, 1000);
    
    setTimeout(() => {
        resultado.innerHTML += '2. ¡Hola Juan! (después de 1.5s)<br>';
    }, 1500);
    
    setTimeout(() => {
        resultado.innerHTML += '3. Función ejecutada después de 2 segundos<br>';
    }, 2000);
    
    setTimeout(() => {
        resultado.innerHTML += '<strong>Todos los timeouts completados</strong>';
    }, 2500);
}

// ========================================
// EJERCICIO 3: CALLBACKS CON MANEJO DE ERRORES (JUEGO DE DADOS)
// ========================================
// Este ejercicio está basado en el juego de dados del PDF de la clase
// Demuestra el patrón "error-first callback"

// Función que simula el juego de dados del PDF
// Basada en el código: const doTask = (iterations, callback) => { ... }
const doTask = (iterations, callback) => {
    const numbers = []; // Array para almacenar los números de los dados
    const dadosContainer = document.getElementById('dados'); // Contenedor visual
    dadosContainer.innerHTML = ''; // Limpiar dados anteriores

    // Lanzar el dado 'iterations' veces
    for (let i = 0; i < iterations; i++) {
        // Generar número aleatorio del 1 al 6 (como un dado real)
        const number = 1 + Math.floor(Math.random() * 6);
        numbers.push(number); // Agregar a nuestro array
        
        // Crear elemento visual para mostrar el dado
        const dado = document.createElement('div');
        dado.className = 'dado';
        dado.textContent = number;
        
        // Si sale 6, marcar el dado como rojo (perdedor)
        if (number === 6) {
            dado.classList.add('rojo');
        }
        
        // Agregar el dado visual al contenedor
        dadosContainer.appendChild(dado);
        
        // Si sale 6, el juego termina con error (como en el PDF)
        if (number === 6) {
            // Llamar al callback con error (patrón error-first)
            callback({
                error: true,
                message: "Se ha sacado un 6"
            });
            return; // Salir de la función inmediatamente
        }
    }

    // Si llegamos aquí, no se sacó ningún 6
    // Llamar al callback con éxito (primer parámetro null = sin error)
    callback(null, {
        error: false,
        value: numbers
    });
}

function ejecutarEjercicio3() {
    const resultado = document.getElementById('resultado3');
    resultado.innerHTML = 'Lanzando dados...';
    
    doTask(5, function(err, result) {
        if (err) {
            resultado.innerHTML = `<strong style="color: red;">Error: ${err.message}</strong>`;
        } else {
            resultado.innerHTML = `<strong style="color: green;">¡Éxito! Números obtenidos: ${result.value.join(', ')}</strong>`;
        }
    });
}

// Ejercicio 4: Callbacks anidados
function obtenerUsuario(id, callback) {
    setTimeout(() => {
        callback(null, { id: id, nombre: "Usuario " + id });
    }, 1000);
}

function obtenerPedidos(usuarioId, callback) {
    setTimeout(() => {
        callback(null, [
            { id: 1, usuarioId: usuarioId, total: 100 },
            { id: 2, usuarioId: usuarioId, total: 200 }
        ]);
    }, 800);
}

function obtenerDetallesPedido(pedidoId, callback) {
    setTimeout(() => {
        callback(null, { 
            id: pedidoId, 
            productos: ["Producto A", "Producto B"] 
        });
    }, 600);
}

function obtenerInformacionCompleta(usuarioId) {
    const resultado = document.getElementById('resultado4');
    resultado.innerHTML = 'Obteniendo información...';
    
    obtenerUsuario(usuarioId, (err, usuario) => {
        if (err) return resultado.innerHTML = 'Error: ' + err;
        
        resultado.innerHTML += '<br>Usuario obtenido: ' + usuario.nombre;
        
        obtenerPedidos(usuario.id, (err, pedidos) => {
            if (err) return resultado.innerHTML += '<br>Error: ' + err;
            
            resultado.innerHTML += '<br>Pedidos obtenidos: ' + pedidos.length;
            
            obtenerDetallesPedido(pedidos[0].id, (err, detalles) => {
                if (err) return resultado.innerHTML += '<br>Error: ' + err;
                
                resultado.innerHTML += '<br>Detalles obtenidos: ' + detalles.productos.join(', ');
                resultado.innerHTML += '<br><strong>Información completa obtenida exitosamente</strong>';
            });
        });
    });
}

function ejecutarEjercicio4() {
    obtenerInformacionCompleta(123);
}

// Ejercicio 5: Callbacks con métodos de array
function ejecutarEjercicio5() {
    const resultado = document.getElementById('resultado5');
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    const cuadrados = numeros.map(numero => numero * numero);
    const pares = numeros.filter(numero => numero % 2 === 0);
    const suma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
    const mayorQue5 = numeros.find(numero => numero > 5);
    const todosPositivos = numeros.every(numero => numero > 0);
    const hayNegativos = numeros.some(numero => numero < 0);
    
    resultado.innerHTML = `
        <strong>Array original:</strong> [${numeros.join(', ')}]<br>
        <strong>Cuadrados (map):</strong> [${cuadrados.join(', ')}]<br>
        <strong>Números pares (filter):</strong> [${pares.join(', ')}]<br>
        <strong>Suma total (reduce):</strong> ${suma}<br>
        <strong>Primer número > 5 (find):</strong> ${mayorQue5}<br>
        <strong>Todos positivos (every):</strong> ${todosPositivos}<br>
        <strong>Hay negativos (some):</strong> ${hayNegativos}
    `;
}

// Ejercicio 6: Callbacks personalizados
function procesarTexto(texto, callback) {
    setTimeout(() => {
        const resultado = {
            original: texto,
            mayusculas: texto.toUpperCase(),
            minusculas: texto.toLowerCase(),
            longitud: texto.length,
            palabras: texto.split(' ').length
        };
        
        callback(null, resultado);
    }, 1000);
}

function validarFormulario(datos, callback) {
    const errores = [];
    
    if (!datos.nombre) errores.push("Nombre es requerido");
    if (!datos.email) errores.push("Email es requerido");
    if (!datos.email.includes('@')) errores.push("Email inválido");
    if (datos.edad < 18) errores.push("Debe ser mayor de edad");
    
    if (errores.length > 0) {
        callback(errores, null);
    } else {
        callback(null, { mensaje: "Formulario válido", datos: datos });
    }
}

function buscarEnBaseDeDatos(consulta, callback) {
    setTimeout(() => {
        const resultados = [
            { id: 1, titulo: "Resultado 1", relevancia: 0.9 },
            { id: 2, titulo: "Resultado 2", relevancia: 0.7 },
            { id: 3, titulo: "Resultado 3", relevancia: 0.5 }
        ];
        
        callback(null, resultados);
    }, 1500);
}

function ejecutarEjercicio6(tipo) {
    const resultado = document.getElementById('resultado6');
    
    switch(tipo) {
        case 'texto':
            resultado.innerHTML = 'Procesando texto...';
            procesarTexto("Hola Mundo JavaScript", (err, data) => {
                if (err) {
                    resultado.innerHTML = 'Error: ' + err;
                } else {
                    resultado.innerHTML = `
                        <strong>Texto procesado:</strong><br>
                        Original: ${data.original}<br>
                        Mayúsculas: ${data.mayusculas}<br>
                        Minúsculas: ${data.minusculas}<br>
                        Longitud: ${data.longitud} caracteres<br>
                        Palabras: ${data.palabras}
                    `;
                }
            });
            break;
            
        case 'formulario':
            resultado.innerHTML = 'Validando formulario...';
            const datosFormulario = {
                nombre: "Juan Pérez",
                email: "juan@ejemplo.com",
                edad: 25
            };
            
            validarFormulario(datosFormulario, (err, data) => {
                if (err) {
                    resultado.innerHTML = `<strong style="color: red;">Errores encontrados:</strong><br>${err.join('<br>')}`;
                } else {
                    resultado.innerHTML = `<strong style="color: green;">${data.mensaje}</strong><br>Datos: ${JSON.stringify(data.datos)}`;
                }
            });
            break;
            
        case 'busqueda':
            resultado.innerHTML = 'Buscando en base de datos...';
            buscarEnBaseDeDatos("JavaScript", (err, data) => {
                if (err) {
                    resultado.innerHTML = 'Error: ' + err;
                } else {
                    resultado.innerHTML = `
                        <strong>Resultados de búsqueda:</strong><br>
                        ${data.map(r => `${r.titulo} (relevancia: ${r.relevancia})`).join('<br>')}
                    `;
                }
            });
            break;
    }
}
