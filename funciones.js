console.log("Hola mundoooo");
var usuario = {
    nombre: "Cande",
    precio:200
}
var usuarios = [ {nombre:"joaco",apellido:"molinos"},{nombre:"abril"},{nombre:"cande"},{nombre:"sol"},{nombre:"maria"},{nombre:"pepe"} ]
var nombreProducto = document.getElementById("titulo");
var frutas = ["tomate","frutilla","Kiwi","durazno","Banana","Manzana"];
function buscarFrutas (){
    for(let vueltas = 0; vueltas < frutas.length-1 ; vueltas++){
        if (frutas[vueltas]=="frutilla") {
            return "Hay frutillas";
        };
    }
    nombreProducto.innerHTML = "No hay frutillas";
}
buscarFrutas()
var listaDeUsuarios ="";
for(let i = 0; i < usuarios.length-1; i++){
    listaDeUsuarios +=  usuarios[i].nombre;
    
}
nombreProducto.innerHTML ="<h2>" + listaDeUsuarios + "</h2>";

// nombreProducto.innerHTML = usuario.nombre;
//camelCaseUnCamello
var perfiles = [{nombre:"joaco",colorPreferido:"Azul",Club:"Boca"},{nombre:"abril",colorPreferido:"Rojo",Club:"River"},{nombre:"cande",colorPreferido:"Azul",Club:"River"},{nombre:"sol",colorPreferido:"Verde",Club:"CSF"},{nombre:"maria",colorPreferido:"Dorado",Club:"Boca"},{nombre:"pepe",colorPreferido:"Celeste",Club:"Racing"}];
var numeroAleatorio = Math.floor(Math.random() * perfiles.length);
console.log(numeroAleatorio);
var nombreUsuario = document.getElementById("nombreUsuario");
var clubUsuario = document.getElementById("clubUsuario");
var colorUsuario = document.getElementById("colorUsuario");
nombreUsuario.innerHTML= perfiles[numeroAleatorio].nombre;
clubUsuario.innerHTML= perfiles[numeroAleatorio].Club;
