async function mostrarProductos() {
  try {
    console.log("⏳ Cargando productos...");
    const listaDeProductos = await obtenerProductosPromesa();
    console.log("📦 Lista de productos:");
    console.table(listaDeProductos);
  } catch (error) {
    console.error(error);
    
  }
}

mostrarProductos();
