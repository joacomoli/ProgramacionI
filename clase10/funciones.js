console.log("Estamos conectados");
const supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
var tareas = [];
var proximoId = 1;
var ordenDescendiente = true;

// REFERENCIAS AL DOM
const campoDeEscritura = document.getElementById("campoDeEscritura");
const botonEnviar = document.getElementById("botonEnviar");
const listaDeTareas = document.getElementById("lista-tareas");
const botonOrdenar = document.getElementById("botonOrdenar");

async function fetchTareas(){
    const { data, error} = await supabase
    .from('tasks')
    .select('*')
    .order('created_at',{ascending:false});
    if(error){
        console.error(error);
        alert('error al cargar tareas');
        return[];
    }
    return data;
}

function render(){
    contenedorLista.innerHTML = "";
    
}
function mostrarValor(){
    var valorIngresado = campoDeEscritura.value;
    console.log(valorIngresado);
    if (valorIngresado != ''){
        var tarea = {
            id:proximoId,
            texto:valorIngresado,
            completada: false
        };
        tareas.push(tarea);
        proximoId++;
        campoDeEscritura.value = '';
        console.log(tareas);
        mostrarTareas();
    }else{
        alert('Escribe una tarea primero');
        return;
    }
}

function mostrarTareas(){
    const contenedorLista = document.getElementById("contenedor-lista");
    contenedorLista.innerHTML = '';
    for (var i = 0; i < tareas.length;i++){
        var tarea = tareas[i];
        var div = document.createElement('div');
        div.className='tarea';
        if (tarea.completada == true){
            div.className +=' completada';
        }
        div.innerHTML = ` <span> ${tarea.id}. ${tarea.texto}</span> <button onclick=completarTarea(${tarea.id})>✓</button> <button onclick=editarTarea(${tarea.id})>Editar tarea</button> <button onclick=eliminarTarea(${tarea.id})>Eliminar Tarea</button>`;
        contenedorLista.appendChild(div);
    }

}

function completarTarea(id){
    for (var i = 0; i < tareas.length; i++){
        if (tareas[i].id === id){
            tareas[i].completada = true;
            break
        }
    }
    mostrarTareas();
}

function eliminarTarea(id){
        for (var i = 0; i < tareas.length; i++){
            if (tareas[i].id === id){
               tareas.splice(i,1);
                break
            }
        }
    
    mostrarTareas();
}

function editarTarea(id){
        for (var i = 0; i < tareas.length; i++){
            if (tareas[i].id === id){
                var nuevoTexto = prompt('Editar tarea:', tareas[i].texto);
                if(nuevoTexto !== null && nuevoTexto.trim() !==''){
                    tareas[i].texto = nuevoTexto.trim();
                }
                break;
            }
        }
    
    mostrarTareas();

}


function ordenarMayorAMenor(){
    tareas.sort(function(a,b){
        return ordenDescendiente ? ( b.id- a.id) : ( a.id- b.id) ;
    });
    mostrarTareas();
    ordenDescendiente = !ordenDescendiente;
    botonOrdenar.textContent = ordenDescendiente ? 'Ordenar Mayor a menor' : 'Ordenar Menor a Mayor';
}
campoDeEscritura.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        mostrarValor();
    }
})