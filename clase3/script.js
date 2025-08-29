// Seleccionamos los elementos del DOM
const inputNombre = document.getElementById('nombre');
const btnMostrar = document.getElementById('btn-mostrar');
const salida = document.getElementById('salida');

// Agregamos un evento al botón
btnMostrar.addEventListener('click', function() {
  // Accedemos al valor escrito por el usuario con .value
  const nombreUsuario = inputNombre.value;

  // Mostramos el resultado en la página
  salida.innerHTML = "¡Hola " + nombreUsuario + "! Bienvenido a la clase de JavaScript.";
});

 var peliculasDeStarwars = [{
    fechaDeLanzamiento : "27/04/2004",
    titulo: "regresoDelJedi",
    valoracion: 5000,
    director: "George Lucas"
 }, {
    fechaDeLanzamiento : "31/07/1980",
    titulo: "El imperio contraataca",
    valoracion: 10000,
    director: "George Lucas"
 }, {
    fechaDeLanzamiento:"19/05/2005",
    titulo: "La venganza de los sith",
    valoracion: 15000,
    director: "George Lucas"
 } ];

/*
for (let indice = 0; indice < peliculasDeStarwars.length; indice++){
    for ( indice2 = 0; indice2 < peliculasDeStarwars.length -1; indice2++){
        if(peliculasDeStarwars[indice2].valoracion > peliculasDeStarwars[indice2 +1]){
            let arrayOrdenado = peliculasDeStarwars[indice2];
            peliculasDeStarwars[indice2] = peliculasDeStarwars[indice2 + 1];
            peliculasDeStarwars[indice2 + 1] = arrayOrdenado;
        }
    }
}
*/

peliculasDeStarwars.sort((a,b) => b.valoracion - a.valoracion  );

console.log("pelis ordenadas por valoracion: ");

// funcion para ver los datos en forma de tabla
console.table(peliculasDeStarwars)
