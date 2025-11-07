// URL y clave API de nuestro proyecto Supabase (REEMPLAZAR con las credenciales reales de tu proyecto)
const SUPABASE_URL = "https://xlgdbxgivwvkeqlmaroi.supabase.co";       // <TU_PROYECTO>: Identificador de tu instancia de Supabase
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZ2RieGdpdnd2a2VxbG1hcm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MzYwNjksImV4cCI6MjA3NzUxMjA2OX0.YeHDjbh0SW6LHwUO3NzhzrSoavti7UUNvPOfqzNbznE";                     // <TU_ANON_KEY>: Clave anónima (anon public key) de tu proyecto Supabase

// Endpoint base de la API de Supabase para la tabla de tareas.
// Supongamos que tenemos una tabla llamada "tareas" en la base de datos.
const API_URL = SUPABASE_URL + "/rest/v1";
const TASKS_ENDPOINT = API_URL + "/tareas";

// Referencias a elementos del DOM para manipular la interfaz
const formTarea = document.getElementById('form-tarea');      // Formulario para nueva tarea
const inputTarea = document.getElementById('input-tarea');    // Campo de texto de la nueva tarea
const listaTareas = document.getElementById('lista-tareas');  // Lista UL donde van las tareas

/**
 * Función para cargar todas las tareas desde la base de datos (API REST de Supabase).
 * Obtiene las tareas con una solicitud GET y actualiza la lista en la interfaz.
 */
async function cargarTareas() {
  try {
    // Realizar la petición GET a la API para obtener todas las tareas.
    // Usamos query param ?select=* para indicar que queremos todos los campos de cada tarea.
    const res = await fetch(TASKS_ENDPOINT + '?select=*', {
      headers: {
        apikey: SUPABASE_ANON_KEY,              // Clave pública anónima para autenticar la solicitud
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY  // Autorización Bearer con la misma clave
      }
    });
    // Si la respuesta no es OK (código HTTP distinto de 200-299), lanzamos un error para que salte al catch.
    if (!res.ok) {
      throw new Error('Error HTTP ' + res.status);
    }
    // Parsear la respuesta como JSON (esto devuelve un array de tareas desde la API).
    const tareas = await res.json();
    console.log("Tareas obtenidas:", tareas);  // Log de las tareas para verificar en consola (opcional)

    // Limpiar cualquier contenido previo de la lista en el DOM antes de repintar
    listaTareas.innerHTML = "";

    // Recorrer el array de tareas y agregarlas a la lista del DOM
    for (let tarea of tareas) {
      // Crear un elemento <li> para cada tarea
      const li = document.createElement('li');                 // Elemento de lista para contener la tarea
      // Crear un elemento <span> para el texto/descripcion de la tarea
      const spanTexto = document.createElement('span');
      spanTexto.textContent = tarea.tarea;                     // Establecer el texto del span con la descripción de la tarea
      spanTexto.className = 'tarea-texto';                     // Asignar una clase para poder aplicar estilos (definida en CSS)

      // Crear botón de "Editar" para la tarea
      const btnEditar = document.createElement('button');
      btnEditar.textContent = "Editar";
      btnEditar.className = 'boton-editar';
      // Evento al hacer click en "Editar": solicitar nuevo texto y actualizar la tarea
      btnEditar.addEventListener('click', () => {
        // Pedir al usuario que ingrese el nuevo texto de la tarea (prellenado con el texto actual)
        const nuevoTexto = prompt("Editar tarea:", tarea.tarea);
        if (nuevoTexto !== null) {  // Si el usuario no canceló el prompt
          const textoLimpio = nuevoTexto.trim();
          if (textoLimpio !== "") {
            // Llamar a la función de actualización de la tarea con el ID y el nuevo texto
            actualizarTarea(tarea.id, textoLimpio);
          }
        }
      });

      // Crear botón de "Eliminar" para la tarea
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = 'boton-eliminar';
      // Evento al hacer click en "Eliminar": confirmar y eliminar la tarea
      btnEliminar.addEventListener('click', () => {
        // Pedir confirmación al usuario antes de eliminar
        const confirmar = confirm("¿Seguro que deseas eliminar esta tarea?");
        if (confirmar) {
          // Llamar a la función de eliminación de la tarea con su ID
          eliminarTarea(tarea.id);
        }
      });

      // Agregar el texto y los botones al elemento <li>
      li.appendChild(spanTexto);
      li.appendChild(btnEditar);
      li.appendChild(btnEliminar);
      // Finalmente, agregar el <li> completo a la lista UL en el DOM
      listaTareas.appendChild(li);
    }
  } catch (error) {
    // Si ocurre algún error en el fetch o en el proceso, lo mostramos en la consola.
    console.error("Falló la carga de tareas:", error);
  }
}

/**
 * Función para agregar una nueva tarea a la base de datos.
 * @param {string} texto - El texto/descripción de la nueva tarea a agregar.
 */
async function agregarTarea(texto) {
  try {
    // Construir el objeto de la nueva tarea según la estructura de la tabla.
    // Suponemos que la tabla "tareas" tiene una columna "tarea" de tipo texto donde guardamos la descripción.
    const nuevaTarea = { tarea: texto };

    // Realizar la petición POST a la API para insertar la nueva tarea
    const res = await fetch(TASKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',    // Indicamos que el cuerpo del pedido está en formato JSON
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY
      },
      body: JSON.stringify(nuevaTarea)         // Convertir el objeto de nueva tarea a JSON para enviarlo
    });
    if (!res.ok) {
      throw new Error('Error HTTP ' + res.status);
    }
    console.log("Tarea agregada con éxito");
    // Limpiar el campo de entrada de texto y recargar la lista de tareas para incluir la nueva
    inputTarea.value = "";
    cargarTareas();  // Volver a obtener todas las tareas para actualizar la lista
  } catch (error) {
    console.error("Falló al agregar tarea:", error);
  }
}

/**
 * Función para actualizar (editar) el texto de una tarea existente en la base de datos.
 * @param {number} id - El ID de la tarea a actualizar.
 * @param {string} nuevoTexto - El nuevo texto (descripción) para la tarea.
 */
async function actualizarTarea(id, nuevoTexto) {
  try {
    // Construir el objeto con el campo a actualizar
    const datosActualizados = { tarea: nuevoTexto };

    // Realizar la petición PATCH (actualización parcial) filtrando por el ID de la tarea
    const res = await fetch(`${TASKS_ENDPOINT}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY
      },
      body: JSON.stringify(datosActualizados)
    });
    if (!res.ok) {
      throw new Error('Error HTTP ' + res.status);
    }
    console.log(`Tarea ${id} actualizada con éxito`);
    // Volver a cargar la lista de tareas para reflejar los cambios en la interfaz
    cargarTareas();
  } catch (error) {
    console.error("Falló la actualización de la tarea:", error);
  }
}

/**
 * Función para eliminar una tarea de la base de datos.
 * @param {number} id - El ID de la tarea a eliminar.
 */
async function eliminarTarea(id) {
  try {
    // Realizar la petición DELETE a la API filtrando la tarea por ID
    const res = await fetch(`${TASKS_ENDPOINT}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY
      }
    });
    if (!res.ok) {
      throw new Error('Error HTTP ' + res.status);
    }
    console.log(`Tarea ${id} eliminada con éxito`);
    // Volver a cargar la lista para quitar la tarea eliminada de la interfaz
    cargarTareas();
  } catch (error) {
    console.error("Falló al eliminar la tarea:", error);
  }
}

// ** Inicialización ** – Al cargar la página, obtenemos la lista de tareas existente
cargarTareas();

// Manejador del evento "submit" del formulario de nueva tarea.
// Cuando se envía el formulario, se agrega la tarea nueva.
formTarea.addEventListener('submit', async (event) => {
  event.preventDefault();                      // Evitar recarga de página por el formulario
  const texto = inputTarea.value.trim();       // Obtener y limpiar el texto ingresado
  if (texto !== "") {
    await agregarTarea(texto);                 // Llamar a la función para agregar la nueva tarea (esperamos a que termine)
    // (El campo de texto se limpia dentro de agregarTarea() en caso de éxito)
  }
});
