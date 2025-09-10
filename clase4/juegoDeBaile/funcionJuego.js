/*
  Tenés dos arrays: 
    hombres = ["Juan", "Carlos", "Pedro"]
    mujeres = ["Ana", "Laura", "Marta"]
  Creá una función que forme parejas aleatorias:
  - Cada persona solo puede bailar una vez
  - Mostrar las parejas: "Juan baila con Ana"
*/
var hombres = ["juan", "Carlos", "joaco"];

var mujeres = ["Ana", "Agustina", "Gaby"];

for (i = 0; i < hombres.length; i++){
    for ( x = 0; x < mujeres.length; x++){
        console.log(hombres[i]+ "baila con "+ mujeres[x]);
    };
};
