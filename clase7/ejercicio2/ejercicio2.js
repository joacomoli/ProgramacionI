const inputNombre = document.getElementById("nombreProducto");
const inputPrecio = document.getElementById("precioProducto");
const boton = document.getElementById("boton");
const listaProductos = document.getElementById("listaProductos");

function agregarProducto(){
    var nombreProducto = inputNombre.value;
    var valorProducto = inputPrecio.value;
    const li = document.createElement("li");
    li.textContent =`${nombreProducto} - $${valorProducto}`;
    listaProductos.appendChild(li);
}
boton.addEventListener("click",agregarProducto )