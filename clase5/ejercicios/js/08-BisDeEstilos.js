let estadoModo = "claro";

function cambioDeColor(){
    if (estadoModo == "claro"){
    const body = document.body;
    let contenedorModo = document.getElementById("modo");
    let contenedorTextoModo = document.getElementById("contenedorModo");
    contenedorModo.style.backgroundColor = '#2d2d2d';
    contenedorTextoModo.style.color = 'white';
    estadoModo = "oscuro";
    }else if (estadoModo == "oscuro"){
    const body = document.body;
    let contenedorModo = document.getElementById("modo");
    let contenedorTextoModo = document.getElementById("contenedorModo");
    contenedorModo.style.backgroundColor = 'white';
    contenedorTextoModo.style.color = '#2d2d2d';
    estadoModo = "claro";
    }

}