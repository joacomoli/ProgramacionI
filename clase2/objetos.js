/*
var auto = {
    marca: "Audi",
    ruedas:4,
    color: "Rojo",
    Motor: "v8"
}
*/


function autos (marca,ruedas,color,motor){
    {
        this.marca = marca;
        this.ruedas = ruedas;
        this.color = color;
        this.motor = motor;
    }
}
var bicicleta = {
    color: "roja",
    impuestos:200,
    valor:2000,
}
var gol = new autos ("volkswagen", 4,"gris","v-10");
var palio = new autos ("fiat", 4, "rojo", "v8");
var toyota = new autos ("toyota", 4, "amarillo", "xx");

console.log(gol.marca);

palio.precio=30; 

console.log(autos);

console.log(bicicleta.valorConImpuestos);
