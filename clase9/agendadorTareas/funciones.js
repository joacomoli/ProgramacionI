// Array para guardar las tareas
var tareas = [];
var proximoId = 1;  // 👈 Nueva variable para el ID auto-incremental

// Función para AGREGAR tarea
function agregarTarea() {
    var input = document.getElementById('nueva-tarea');
    var texto = input.value.trim();
    
    if (texto === '') {
        alert('Escribe una tarea primero');
        return;
    }
    
    // Crear objeto tarea con ID auto-incremental
    var tarea = {
        id: proximoId,  // 👈 Usamos el próximo ID disponible
        texto: texto,
        completada: false
    };
    
    tareas.push(tarea);
    proximoId++;  // 👈 Incrementamos para la próxima tarea
    input.value = '';
    mostrarTareas();
}

// Función para MOSTRAR tareas
function mostrarTareas() {
    var lista = document.getElementById('lista-tareas');
    lista.innerHTML = '';
    
    for (var i = 0; i < tareas.length; i++) {
        var tarea = tareas[i];
        
        var div = document.createElement('div');
        div.className = 'tarea';
        if (tarea.completada) {
            div.className += ' completada';
        }
        
        div.innerHTML = `
            <span>${tarea.id}. ${tarea.texto}</span>  <!-- 👈 Mostramos el ID -->
            <button onclick="completarTarea(${tarea.id})">✓</button>
            <button onclick="editarTarea(${tarea.id})">✏️</button>
            <button onclick="eliminarTarea(${tarea.id})">🗑️</button>
        `;
        
        lista.appendChild(div);
    }
}

// Las funciones eliminarTarea, completarTarea y editarTarea se mantienen igual
function eliminarTarea(id) {
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas.splice(i, 1);
            break;
        }
    }
    mostrarTareas();
}

function completarTarea(id) {
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas[i].completada = !tareas[i].completada;
            break;
        }
    }
    mostrarTareas();
}

function editarTarea(id) {
    for (var i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            var nuevoTexto = prompt('Editar tarea:', tareas[i].texto);
            if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
                tareas[i].texto = nuevoTexto.trim();
            }
            break;
        }
    }
    mostrarTareas();
}

// Agregar tarea con Enter
document.getElementById('nueva-tarea').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Tareas de ejemplo al cargar (con IDs 1, 2, 3)
tareas = [
    { id: 1, texto: "Aprender JavaScript", completada: false },
    { id: 2, texto: "Hacer ejercicio", completada: false },
    { id: 3, texto: "Leer un libro", completada: true }
];
proximoId = 4;  // 👈 El próximo ID disponible después de las tareas de ejemplo
mostrarTareas();