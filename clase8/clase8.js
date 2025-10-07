function procesarUsuario(nombre, callback){
    console.log(`Procesando usuario: ${nombre}`);
        setTimeout(function() {
        console.log(`✅ Descarga completada`);
        // Ejecutar callback cuando termine
         callback(nombre);
    }, 3000);
    console.log(`1`);
    console.log(`2`);
    console.log(`3`);

   
}

function mostrarMensaje(nombre){
    console.log(`Se ejecutó el callback`);
    console.log(`Hola ${nombre} Bienvenenido al sistema. `);

}

procesarUsuario("Ana",mostrarMensaje);