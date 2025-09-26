let titulo = document.getElementById("titulo");
var boton = document.getElementById("boton");
var campo = document.getElementById("campo");

function cambiarTitulo(){
    var valorDelCampo = campo.value;
    if (campo.value != ""){
        titulo.innerHTML= "Gracias por visitarnos " + valorDelCampo ;
    }else{
         titulo.innerHTML= "Gracias por visitarnos!"
    }
    

}

boton.addEventListener("click", cambiarTitulo);