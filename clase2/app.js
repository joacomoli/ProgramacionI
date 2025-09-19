// 1) Objeto
const celular = {
    modelo: 'Edge 50 Pro',
    almacenamientoGB: 256,
    sistemaOperativo: 'Android 14',
    ramGB: 12,
    color: 'Negro Carbón',
    marca: 'Motorola',
    precioARS: 999999.99
};
console.log('Objeto celular:');
console.table(celular.modelo);


// 2) Random
const btnRandom = document.getElementById('btn-random');
const randomOut = document.getElementById('random-out');
const btnComprar = document.getElementById('btn-comprar');
const aviso = document.getElementById('aviso');
var fichas = 5;
var eleccionDelUsuario = 17;
function agregarFichas(){
    fichas = 10;
    console.log("agregaste fichas ")
}
function loteria(){
var numeroAleatorio = Math.floor(Math.random() * 101); // entero 0–100
randomOut.innerHTML = numeroAleatorio;

if (numeroAleatorio != eleccionDelUsuario){
    aviso.innerHTML="Perdiste, intenta de nuevo, te quedan "+ fichas + "fichas";
    fichas--;
}else{
    aviso.innerHTML="Ganaste un abrazo de joaco";
};
if (fichas <=0){
    aviso.innerHTML="Perdiste, compra mas fichas";
    btnRandom.removeEventListener("click",loteria);
};


}


btnRandom.addEventListener('click',loteria );
btnComprar.addEventListener('click',agregarFichas);

// 3) DOM muy simple
const btnShowText = document.getElementById('show-text');
const output = document.getElementById('output');


btnShowText.addEventListener('click', function(){
output.textContent = '¡Hola! Este texto fue agregado con JavaScript.';
});