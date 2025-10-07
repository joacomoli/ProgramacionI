// Función que simula pedir productos a un "servidor"
function obtenerProductos(callback) {
  console.log("⏳ Buscando productos...");

  // Simulamos un retraso de 2 segundos (como si fuera una petición al servidor)
  setTimeout(
    () => {
    const productos = [
      { id: 1, nombre: "Remera", precio: 5000 },
      { id: 2, nombre: "Pantalón", precio: 9000 },
      { id: 3, nombre: "Zapatillas", precio: 15000 },
    ];
    console.log("✅ Productos encontrados");
    
    // Ejecutamos el callback y le pasamos la lista de productos
    callback(productos);
  }
  , 2000);
}

// Uso de la función con callback
obtenerProductos(function(listaDeProductos) {
  console.log("📦 Lista de productos:");
  console.table(listaDeProductos);
});
