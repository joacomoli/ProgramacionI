var boton = document.getElementById("boton");
var cartas = document.getElementsByTagName("div");
var contenedor = document.getElementsByClassName("container");
var campo = document.getElementById("nombre");
var botonEnviar = document.getElementById("botonEnviar");
function saludar (){
    console.log("Hola pepito!");
    var valorDelUsuario = campo.value;
    cartas[2].textContent = valorDelUsuario;
};
cartas[1].textContent="Hola a Agus 1";
cartas[2].innerHTML="Hola a gaby";
cartas[3].innerHTML="Hola a Agus 2";
botonEnviar.addEventListener("click",saludar);
console.log(cartas);

var etiquetaDiv = document.createElement("div");
contenedor[0].appendChild(etiquetaDiv);
console.log(etiquetaDiv);