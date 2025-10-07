var botonBuscar = document.getElementById("botonBuscar");
var inputNombre = document.getElementById("buscadorPokemon");
var campoNombre = document.getElementById("nombre");
var campoDescripcion = document.getElementById("descripcion");
var campoElemento = document.getElementById("elemento");
var campoPeso = document.getElementById("peso");

botonBuscar.addEventListener("click",()=>{
    var nombrePokemon = inputNombre.value;
    buscarPokemon(nombrePokemon);
});



function buscarPokemon(nombre){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Pokemon no encontrado");
            }
            return response.json();
        })
        .then((data)=>{
            console.log("Nombre: "+ data.name);
            console.log("Peso: "+ data.weight);
            mostrarPokemon(data);
        })
        .catch((error)=>{
            console.error("Error: ", error.message);
            window.alert("Error de programacion")
        })
}

function mostrarPokemon(pokemon){
    campoNombre.innerHTML = pokemon.name;
    campoElemento.innerHTML = pokemon.height;
    campoDescripcion.innerHTML = pokemon.id;
}
