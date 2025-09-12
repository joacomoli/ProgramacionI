// Ejercicios de Fetch API - JavaScript Asíncrono
// Archivo: 03-fetch-api.js

// ========================================
// EJERCICIO 1: PETICIÓN GET BÁSICA
// ========================================
// Este ejercicio enseña cómo hacer una petición GET simple para obtener datos

// Función que obtiene usuarios de una API pública
async function obtenerUsuarios() {
    try {
        // fetch() es la función moderna para hacer peticiones HTTP
        // Por defecto hace una petición GET
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Verificar si la respuesta es exitosa (código 200-299)
        if (!response.ok) {
            // Si no es exitosa, lanzar un error con el código de estado
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convertir la respuesta a JSON (JavaScript Object Notation)
        // Esto también es asíncrono, por eso usamos await
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        // Si algo sale mal, registrar el error y relanzarlo
        console.error('Error obteniendo usuarios:', error);
        throw error;
    }
}

// Función que ejecuta el ejercicio 1 y muestra los usuarios
function mostrarUsuarios(usuarios) {
    const resultado = document.getElementById('resultado1');
    // Mostrar solo los primeros 3 usuarios para no saturar la pantalla
    resultado.innerHTML = usuarios.slice(0, 3).map(usuario => 
        `<div><strong>${usuario.name}</strong> - ${usuario.email}</div>`
    ).join('');
}

// Función que ejecuta el ejercicio 1
async function ejecutarEjercicio1() {
    const resultado = document.getElementById('resultado1');
    resultado.innerHTML = '<span class="status-indicator status-loading"></span>Cargando usuarios...';
    
    try {
        // Llamar a la función que obtiene usuarios
        const usuarios = await obtenerUsuarios();
        // Mostrar los usuarios en la página
        mostrarUsuarios(usuarios);
    } catch (error) {
        // Si hay error, mostrar mensaje de error
        resultado.innerHTML = `<span class="status-indicator status-error"></span>Error: ${error.message}`;
    }
}

// ========================================
// EJERCICIO 2: PETICIÓN POST CON DATOS
// ========================================
// Este ejercicio enseña cómo enviar datos a un servidor usando POST

// Función que crea un nuevo post enviando datos al servidor
async function crearPost(titulo, contenido, usuarioId) {
    try {
        // Crear el objeto que vamos a enviar
        const nuevoPost = {
            title: titulo,
            body: contenido,
            userId: parseInt(usuarioId) // Convertir a número
        };
        
        // Hacer petición POST con fetch()
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', // Especificar que es una petición POST
            headers: {
                'Content-Type': 'application/json', // Decir que enviamos JSON
            },
            body: JSON.stringify(nuevoPost) // Convertir objeto a JSON string
        });
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convertir respuesta a JSON y retornarla
        const postCreado = await response.json();
        return postCreado;
    } catch (error) {
        console.error('Error creando post:', error);
        throw error;
    }
}

// Función que ejecuta el ejercicio 2
async function ejecutarEjercicio2() {
    const resultado = document.getElementById('resultado2');
    
    // Obtener los valores de los campos del formulario
    const titulo = document.getElementById('tituloPost').value;
    const contenido = document.getElementById('contenidoPost').value;
    const usuarioId = document.getElementById('usuarioId').value;
    
    resultado.innerHTML = '<span class="status-indicator status-loading"></span>Creando post...';
    
    try {
        // Crear el post con los datos del formulario
        const post = await crearPost(titulo, contenido, usuarioId);
        
        // Mostrar información del post creado
        resultado.innerHTML = `
            <span class="status-indicator status-success"></span>
            <strong>Post creado exitosamente:</strong><br>
            ID: ${post.id}<br>
            Título: ${post.title}<br>
            Usuario ID: ${post.userId}
        `;
    } catch (error) {
        resultado.innerHTML = `<span class="status-indicator status-error"></span>Error: ${error.message}`;
    }
}

// ========================================
// EJERCICIO 3: MANEJO DE DIFERENTES TIPOS DE RESPUESTA
// ========================================
// Este ejercicio enseña cómo manejar diferentes tipos de contenido

// Función que obtiene un recurso y lo procesa según el tipo especificado
async function obtenerRecurso(url, tipoRespuesta = 'json') {
    try {
        // Hacer la petición HTTP
        const response = await fetch(url);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let datos;
        // Procesar la respuesta según el tipo especificado
        switch (tipoRespuesta) {
            case 'json':
                // Convertir a objeto JavaScript
                datos = await response.json();
                break;
            case 'text':
                // Obtener como texto plano
                datos = await response.text();
                break;
            case 'blob':
                // Obtener como blob (archivo binario)
                datos = await response.blob();
                break;
            case 'arrayBuffer':
                // Obtener como ArrayBuffer (datos binarios)
                datos = await response.arrayBuffer();
                break;
            default:
                throw new Error('Tipo de respuesta no soportado');
        }
        
        // Retornar objeto con datos y metadatos
        return {
            datos: datos,
            tipo: tipoRespuesta,
            headers: Object.fromEntries(response.headers.entries()), // Convertir headers a objeto
            status: response.status
        };
    } catch (error) {
        console.error('Error obteniendo recurso:', error);
        throw error;
    }
}

// Función que ejecuta el ejercicio 3
async function ejecutarEjercicio3() {
    const resultado = document.getElementById('resultado3');
    const tipoRespuesta = document.getElementById('tipoRespuesta').value;
    
    resultado.innerHTML = '<span class="status-indicator status-loading"></span>Obteniendo recurso...';
    
    try {
        // Obtener recurso con el tipo especificado
        const recurso = await obtenerRecurso('https://jsonplaceholder.typicode.com/posts/1', tipoRespuesta);
        
        let contenido;
        // Formatear el contenido según el tipo
        if (tipoRespuesta === 'json') {
            contenido = JSON.stringify(recurso.datos, null, 2); // JSON formateado
        } else if (tipoRespuesta === 'text') {
            contenido = recurso.datos;
        } else if (tipoRespuesta === 'blob') {
            contenido = `Blob de ${recurso.datos.size} bytes`;
        }
        
        // Mostrar el resultado
        resultado.innerHTML = `
            <span class="status-indicator status-success"></span>
            <strong>Tipo:</strong> ${recurso.tipo}<br>
            <strong>Status:</strong> ${recurso.status}<br>
            <strong>Contenido:</strong><br>
            <div class="json-display">${contenido}</div>
        `;
    } catch (error) {
        resultado.innerHTML = `<span class="status-indicator status-error"></span>Error: ${error.message}`;
    }
}

// ========================================
// EJERCICIO 4: MÚLTIPLES PETICIONES
// ========================================
// Este ejercicio enseña cómo hacer múltiples peticiones en paralelo y secuencial

// Función que obtiene datos en paralelo usando Promise.all
async function obtenerDatosParalelo() {
    try {
        // Promise.all ejecuta todas las peticiones al mismo tiempo
        // Es más rápido pero consume más recursos
        const [usuarios, posts, comentarios] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json())
        ]);
        
        return { usuarios, posts, comentarios };
    } catch (error) {
        console.error('Error en peticiones paralelas:', error);
        throw error;
    }
}

// Función que obtiene datos secuencialmente (una después de otra)
async function obtenerDatosSecuencial() {
    try {
        // Primera petición: usuarios
        const usuariosResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await usuariosResponse.json();
        
        // Segunda petición: posts (solo después de que termine la primera)
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await postsResponse.json();
        
        // Tercera petición: comentarios (solo después de que termine la segunda)
        const comentariosResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        const comentarios = await comentariosResponse.json();
        
        return { usuarios, posts, comentarios };
    } catch (error) {
        console.error('Error en peticiones secuenciales:', error);
        throw error;
    }
}

// Función que ejecuta el ejercicio 4
async function ejecutarEjercicio4(tipo) {
    const resultado = document.getElementById('resultado4');
    resultado.innerHTML = `<span class="status-indicator status-loading"></span>Ejecutando peticiones ${tipo}...`;
    
    const inicio = Date.now(); // Marcar tiempo de inicio
    
    try {
        let datos;
        if (tipo === 'paralelo') {
            datos = await obtenerDatosParalelo();
        } else {
            datos = await obtenerDatosSecuencial();
        }
        
        const tiempo = Date.now() - inicio; // Calcular tiempo transcurrido
        
        // Mostrar resultados con tiempo de ejecución
        resultado.innerHTML = `
            <span class="status-indicator status-success"></span>
            <strong>Peticiones ${tipo} completadas en ${tiempo}ms</strong><br>
            Usuarios: ${datos.usuarios.length}<br>
            Posts: ${datos.posts.length}<br>
            Comentarios: ${datos.comentarios.length}
        `;
    } catch (error) {
        resultado.innerHTML = `<span class="status-indicator status-error"></span>Error: ${error.message}`;
    }
}

// ========================================
// EJERCICIO 5: INTERCEPTORES Y MIDDLEWARE
// ========================================
// Este ejercicio enseña cómo crear un sistema de interceptores para manejar automáticamente headers y errores

// Clase que implementa un sistema de interceptores
class FetchInterceptor {
    constructor() {
        // Array para almacenar interceptores de request y response
        this.interceptors = {
            request: [], // Interceptores que modifican la petición antes de enviarla
            response: [] // Interceptores que procesan la respuesta después de recibirla
        };
    }
    
    // Método para agregar un interceptor de request
    addRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
    }
    
    // Método para agregar un interceptor de response
    addResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
    }
    
    // Método fetch personalizado que aplica los interceptores
    async fetch(url, options = {}) {
        // Aplicar interceptores de request
        let requestOptions = { ...options }; // Copiar las opciones originales
        for (const interceptor of this.interceptors.request) {
            requestOptions = await interceptor(requestOptions);
        }
        
        // Realizar la petición con las opciones modificadas
        const response = await fetch(url, requestOptions);
        
        // Aplicar interceptores de response
        let processedResponse = response;
        for (const interceptor of this.interceptors.response) {
            processedResponse = await interceptor(processedResponse);
        }
        
        return processedResponse;
    }
}

// Función que ejecuta el ejercicio 5
async function ejecutarEjercicio5() {
    const resultado = document.getElementById('resultado5');
    resultado.innerHTML = '<span class="status-indicator status-loading"></span>Probando interceptores...';
    
    try {
        // Crear instancia del interceptor
        const apiClient = new FetchInterceptor();
        
        // Simular token de autenticación en localStorage
        localStorage.setItem('authToken', 'token-simulado-123');
        
        // Agregar interceptor para headers de autenticación
        apiClient.addRequestInterceptor(async (options) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                // Agregar headers de autenticación automáticamente
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                    'X-Custom-Header': 'Valor personalizado'
                };
            }
            return options;
        });
        
        // Agregar interceptor para manejo de errores
        apiClient.addResponseInterceptor(async (response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token expirado, redirigiendo a login...');
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response;
        });
        
        // Usar el cliente personalizado para hacer una petición
        const response = await apiClient.fetch('https://httpbin.org/headers');
        const data = await response.json();
        
        // Mostrar los headers que se enviaron
        resultado.innerHTML = `
            <span class="status-indicator status-success"></span>
            <strong>Interceptores funcionando correctamente</strong><br>
            <div class="json-display">${JSON.stringify(data, null, 2)}</div>
        `;
    } catch (error) {
        resultado.innerHTML = `<span class="status-indicator status-error"></span>Error: ${error.message}`;
    }
}

// ========================================
// EJERCICIO 6: UPLOAD DE ARCHIVOS
// ========================================
// Este ejercicio enseña cómo subir archivos usando FormData y mostrar progreso

// Función que sube un archivo usando fetch (sin progreso)
async function subirArchivo(archivo) {
    try {
        // FormData es necesario para enviar archivos
        const formData = new FormData();
        formData.append('file', archivo); // Agregar el archivo
        formData.append('description', 'Archivo subido desde ejercicio'); // Agregar descripción
        
        // Hacer petición POST con FormData
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData // No necesitamos Content-Type, el navegador lo establece automáticamente
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error('Error subiendo archivo:', error);
        throw error;
    }
}

// Función que sube un archivo con XMLHttpRequest para mostrar progreso
function subirArchivoConProgreso(archivo, onProgress) {
    return new Promise((resolve, reject) => {
        // XMLHttpRequest permite mostrar progreso de upload
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', archivo);
        
        // Evento que se dispara durante el progreso de upload
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                // Calcular porcentaje de progreso
                const porcentaje = (event.loaded / event.total) * 100;
                onProgress(porcentaje); // Llamar función de callback con el progreso
            }
        });
        
        // Evento que se dispara cuando la petición termina exitosamente
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
            }
        });
        
        // Evento que se dispara si hay error de red
        xhr.addEventListener('error', () => {
            reject(new Error('Error de red'));
        });
        
        // Configurar y enviar la petición
        xhr.open('POST', 'https://httpbin.org/post');
        xhr.send(formData);
    });
}

// Función que ejecuta el ejercicio 6
async function ejecutarEjercicio6() {
    const archivoInput = document.getElementById('archivoInput');
    const resultado = document.getElementById('resultado6');
    const progreso = document.getElementById('progreso');
    const barraProgreso = document.getElementById('barraProgreso');
    const porcentajeProgreso = document.getElementById('porcentajeProgreso');
    
    // Verificar que se seleccionó un archivo
    if (!archivoInput.files[0]) {
        resultado.innerHTML = '<span class="status-indicator status-error"></span>Por favor selecciona un archivo';
        return;
    }
    
    const archivo = archivoInput.files[0];
    progreso.style.display = 'block'; // Mostrar barra de progreso
    resultado.innerHTML = '<span class="status-indicator status-loading"></span>Subiendo archivo...';
    
    try {
        // Subir archivo con progreso
        const resultadoSubida = await subirArchivoConProgreso(archivo, (porcentaje) => {
            // Actualizar barra de progreso visualmente
            barraProgreso.style.width = porcentaje + '%';
            porcentajeProgreso.textContent = Math.round(porcentaje) + '%';
        });
        
        // Mostrar resultado exitoso
        resultado.innerHTML = `
            <span class="status-indicator status-success"></span>
            <strong>Archivo subido exitosamente</strong><br>
            Nombre: ${archivo.name}<br>
            Tamaño: ${archivo.size} bytes<br>
            Tipo: ${archivo.type}
        `;
        
        progreso.style.display = 'none'; // Ocultar barra de progreso
    } catch (error) {
        resultado.innerHTML = `<span class="status-indicator status-error"></span>Error: ${error.message}`;
        progreso.style.display = 'none';
    }
}
