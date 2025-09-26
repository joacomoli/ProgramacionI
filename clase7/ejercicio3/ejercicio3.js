const productos = [
    {
        id:1,
        nombre:"Zapatillas",
        precio: 12000,
        descripcion: "zapatillas deportivas"
    },
        {
        id:2,
        nombre:"Shorts",
        precio: 15000,
        descripcion: "shorts deportivas"
    },
            {
        id:3,
        nombre:"camisetas",
        precio: 30000,
        descripcion: "camisetas deportivas"
    }
];
const contenedorProductos = document.getElementById("contenedor-productos");
const detalleProductos = document.getElementById("detalle-producto");
const detalleNombre = document.getElementById("detalle-nombre");
const detallePrecio = document.getElementById("detalle-precio");
const detalleDescripcion = document.getElementById("detalle-descripcion");

function mostrarProductos(){
    productos.forEach(producto => {
           const columna = document.createElement("div");
            columna.className = "col-md-4";
            columna.innerHTML = `<div class = "card h-100 shodow-sm">
                <div class="card-body d-flex flex-column">
                <h5 class="card-title"> ${producto.nombre}</h5>
                <button class "btn btn-primary mt-auto" id="${producto.id}">Ver detalles</button>
                </div>
                </div>`
            contenedorProductos.appendChild(columna);

    });


 
}

mostrarProductos();