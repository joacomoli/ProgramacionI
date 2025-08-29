var nombre = document.getElementById("nombreDelUsuario");
var apellido = document.getElementById("apellidoDelUsuario");
var boton = document.getElementById("enviar");
var mensaje = document.getElementById("mensaje");


boton.addEventListener("click", function (){ 
    var valorNombre = nombre.value;
    var valorApellido = apellido.value;
    if(valorNombre != ""){
       mensaje.innerHTML = "Hola! " + valorNombre + " " + valorApellido;
    }else{
        window.alert("no se completó el campo");
    }
    
});