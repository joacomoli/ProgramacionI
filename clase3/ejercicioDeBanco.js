var usuarios = [{
    saldo:500,
    titular:"Messi",
    alias: "sosloMas",
    numero:"000123"
},
{
    saldo:5000000,
    titular:"joaco",
    alias: "joacomoli",
    numero:"000125"
}
]
var botonSumar = document.getElementById("sumar");
var botonRestar = document.getElementById("restar");
var cantBotones = document.querySelectorAll(".botonera")
function mostrarSaldo (){
    console.log("El saldo del usuario es: " + usuario.saldo);
}

function agregarSaldo (monto){
    if (monto > 0){
        usuario.saldo = usuario.saldo + monto;
        mostrarDatos()
    }else if(isNaN(monto) || monto <=0){
        console.log("Monto inválido, larga la plata");
    }
    mostrarSaldo();
}
function mostrarDatos(){
    document.getElementById("saldo").textContent = usuario.saldo;
}
function extraerSaldo (monto ){
    if(monto > 0 && monto <= usuario.saldo){
        usuario.saldo = usuario.saldo - monto;
        console.log("Se extrajeron $" + monto);
        console.log("El saldo restante es $"+usuario.saldo);
    }else{
        console.log("El monto que ingresamos es demasiado alto, la persona es pobre")
    }
}
function leerMonto(){
    var input = document.getElementById("monto");
    var valor = parseFloat(input.value);
    return valor;
}

botonSumar.addEventListener("click",function (){
    var inputMonto = leerMonto();
    agregarSaldo(inputMonto)
});
botonRestar.addEventListener("click", ()=>extraerSaldo(500));

console.log(cantBotones.length);
