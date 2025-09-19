console.log("nos conectamos bien");
var titulo = document.getElementById("titulo");
function intervenirTitulo(){
    
    titulo.innerHTML = "Hola a todos, me uni con JS" + "me contaste " +contador +" veces";
}
contador= 0;
function contar(){

    console.log("me presionaste "+ contador + " veces");
    contador++;
}

var boton = document.getElementById("boton");
boton.addEventListener("click" , function(){ intervenirTitulo(), contar()} );

var botonCambiarColor = document.getElementById("estilo");


var toggle = ()=>    titulo.classList.toggle("fondoVerde");

botonCambiarColor.addEventListener("click",toggle );
