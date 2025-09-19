var botonBuscar = document.getElementById("botonBuscar");
var campoDeBusqueda = document.getElementById("buscador");
var resultado = document.getElementById("resultado");
var contenedorDeProductos = document.getElementById("contenedorDeProductos");
var carrito = [];
var productos = [
    {idProducto: 1,nombre: "Remera oversize",precio: 30000,color: "azul"},
    {idProducto:2,nombre:"Zapatillas airforce", precio: 400000,color:"negro"},
    {idProducto:3,nombre:"Masbooks",precio:20000, color:"plateado"},
    {idProducto:4,nombre:"bermuda baggy 3/4 ",precio:20000000, color:"grido"}

]


function mostrarResultado (nombreDelProducto){
    for (var indice = 0; indice < productos.length; indice++){
        if( productos[indice].nombre == nombreDelProducto){
            console.log(productos[indice].nombre);
            resultado.innerHTML = "El producto encontrado es: " + productos[indice].nombre + " su precio es: $" + productos[indice].precio
            }
        
    }
}


function mostrarTodosLosProductos(){
    var tarjetaDeProductos = "";
    for ( var i =0; i < productos.length; i++){
        tarjetaDeProductos +=  ` <div style="border:1px #ccc;margin:5px; padding:10px; border-radius:5px;">
        <h3> ${productos[i].nombre} </h3>
        <p> Precio: $ ${productos[i].precio}</p>
        <p> Color: $${productos[i].color}</p>
        <button class="btn-agregar" data-id="${productos[i].idProducto}" onclick="agregarAlCarrito(${productos[i].idProducto})"> Agregar al carrito </button>
        </div>`
    }
    contenedorDeProductos.innerHTML = tarjetaDeProductos;
}
function agregarAlCarrito(id){
    var producto = null;
    for ( var i =0; i < productos.length; i++){
        if (productos[i].idProducto == id){
            producto = productos[i];
        }
    }
    if (producto !== null){
        carrito.push(producto);
        console.log("carrito acual: ", carrito);

    }
}
mostrarTodosLosProductos();
botonBuscar.addEventListener("click",()=>{
    var productoBuscado = campoDeBusqueda.value ; 
    mostrarResultado(productoBuscado)})
