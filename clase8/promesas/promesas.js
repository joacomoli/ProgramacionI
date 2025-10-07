var edad = 20;
let promesaBasica = new Promise( (resolve, reject)=>{
    setTimeout(()=>{
        if(edad > 18){
            resolve("¡Promesa cumplida despues de 2 segundos, es mayor que 20");

        }else{
            reject("No se cumplio la promesa, tiene menos de 20");
        }
        

    }, 2000);
} );

function primeraTarea(){
    return new Promise((resolve)=>{
        setTimeout(()=>{console.log("Primera tarea completada");
            resolve(10);
        },1000)
    });
}

function segundaTarea(numero){
    return new Promise((resolve)=> {
        setTimeout(()=>{
            console.log("Segunda tarea completada");
            resolve(numero*2);
        },3000)
    })
}
function terceraTarea(numero){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Tercera tarea completada");
            resolve(numero + 5);
        },1000);
    })
}
promesaBasica
    .then((mensaje)=>{
        console.log(mensaje);
    })
    .catch((error)=>{
        console.error(error);
    });

console.log("El tiempo pasa...");

primeraTarea()
    .then(segundaTarea)
    .then(terceraTarea)
    .then((resultadoFinal)=>{
        console.log("El resultado es: "+resultadoFinal);
    })
    .catch((error)=>{
        console.error("Error en alguna tarea", error);
    });