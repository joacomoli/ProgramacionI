
var nombreDelJugador = document.getElementById("nombreDelJugador");
var campoVidas = document.getElementById("campoVidas");
var botonEnviar = document.getElementById("enviar");
var apuesta = document.getElementById("apuesta");
var campoResultado = document.getElementById("campoResultado");
var usuario = {
    nombre:"Ezequiel",
    edad:"60",
    vidas:"7",
    saldo:"100"
};
nombreDelJugador.innerHTML = usuario.nombre;
campoVidas.innerHTML = usuario.vidas;

function validarGanador (){
    var numeroGanador = Math.floor(Math.random() * 10);
    console.log(apuesta.value);
    campoResultado.innerHTML = numeroGanador;
    if (apuesta.value == numeroGanador){
        window.alert("Ganaste 2 pesos!");
    };
};
function restarVidas (){
    if (usuario.vidas <= 0){
       usuario.vidas = usuario.vidas;
       window.alert("Te quedaste sin vidas paga raton");
    }else {
        usuario.vidas = usuario.vidas - 1;
        campoVidas.innerHTML = usuario.vidas;
        validarGanador();
    }
}
function comprarVidas () {
    if(usuario.saldo > 0){
        usuario.vidas = usuario.vidas + 1;
        usuario.saldo = usuario.saldo - 2;
        campoVidas.innerHTML = usuario.vidas;
        console.log("El saldo es: " + usuario.saldo);
    }else if (usuario.saldo <=0){
        window.alert("Te quedas sin plata");
    }
}
botonEnviar.addEventListener("click", restarVidas);
botonMasVidas.addEventListener("click",comprarVidas);
