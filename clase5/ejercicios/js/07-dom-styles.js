// Ejercicios de Manipulación del DOM con Estilos
// Archivo: 07-dom-styles.js

// ========================================
// EJERCICIO 1: CAMBIO DE TEMA DINÁMICO
// ========================================
// Este ejercicio enseña cómo modificar estilos CSS usando JavaScript

// Variables globales para mantener el estado del tema
let temaActual = 'claro'; // Variable que guarda el tema actual
let animacionActiva = false; // Variable para evitar animaciones múltiples

// Función que cambia el tema de toda la página
function cambiarTema() {
    // Obtener referencias a los elementos que vamos a modificar
    const body = document.body; // El elemento body de la página
    const botones = document.querySelectorAll('button'); // Todos los botones
    const ejercicios = document.querySelectorAll('.ejercicio'); // Todos los ejercicios
    
    // Verificar qué tema está activo y cambiar al opuesto
    if (temaActual === 'claro') {
        // Cambiar a tema oscuro
        body.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
        body.style.color = '#ffffff'; // Texto blanco
        
        // Cambiar estilos de todos los ejercicios
        ejercicios.forEach(ejercicio => {
            ejercicio.style.backgroundColor = '#2d2d2d'; // Fondo gris oscuro
            ejercicio.style.color = '#ffffff'; // Texto blanco
            ejercicio.style.border = '1px solid #444'; // Borde gris
        });
        
        // Cambiar estilos de todos los botones
        botones.forEach(boton => {
            boton.style.backgroundColor = '#4CAF50'; // Verde
            boton.style.color = '#ffffff'; // Texto blanco
        });
        
        // Actualizar el estado y el texto mostrado
        temaActual = 'oscuro';
        document.getElementById('temaTexto').textContent = 'Tema Oscuro';
    } else {
        // Cambiar a tema claro (código similar pero con colores claros)
        body.style.backgroundColor = '#f5f5f5';
        body.style.color = '#333333';
        
        ejercicios.forEach(ejercicio => {
            ejercicio.style.backgroundColor = '#ffffff';
            ejercicio.style.color = '#333333';
            ejercicio.style.border = 'none';
        });
        
        botones.forEach(boton => {
            boton.style.backgroundColor = '#007bff';
            boton.style.color = '#ffffff';
        });
        
        temaActual = 'claro';
        document.getElementById('temaTexto').textContent = 'Tema Claro';
    }
}

// Ejercicio 2: Animación de elementos
function animarElementos() {
    if (animacionActiva) return;
    
    animacionActiva = true;
    const elementos = document.querySelectorAll('.ejercicio');
    
    elementos.forEach((elemento, index) => {
        // Resetear estilos
        elemento.style.transform = 'translateX(-100px)';
        elemento.style.opacity = '0';
        elemento.style.transition = 'all 0.5s ease';
        
        // Animar con delay
        setTimeout(() => {
            elemento.style.transform = 'translateX(0)';
            elemento.style.opacity = '1';
        }, index * 200);
    });
    
    setTimeout(() => {
        animacionActiva = false;
    }, elementos.length * 200 + 500);
}

// Ejercicio 3: Crear elementos dinámicamente
function crearElementoDinamico() {
    const contenedor = document.getElementById('elementosDinamicos');
    
    // Crear nuevo elemento
    const nuevoElemento = document.createElement('div');
    nuevoElemento.className = 'elemento-dinamico';
    nuevoElemento.style.cssText = `
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 20px;
        margin: 10px 0;
        border-radius: 10px;
        transform: scale(0);
        transition: transform 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    `;
    
    // Agregar contenido
    const numero = contenedor.children.length + 1;
    nuevoElemento.innerHTML = `
        <h4>Elemento Dinámico #${numero}</h4>
        <p>Este elemento fue creado con JavaScript</p>
        <button onclick="eliminarElemento(this)" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Eliminar</button>
    `;
    
    // Agregar efectos hover
    nuevoElemento.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
    });
    
    nuevoElemento.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
    
    // Agregar al contenedor
    contenedor.appendChild(nuevoElemento);
    
    // Animar entrada
    setTimeout(() => {
        nuevoElemento.style.transform = 'scale(1)';
    }, 100);
}

function eliminarElemento(boton) {
    const elemento = boton.parentElement;
    elemento.style.transform = 'scale(0)';
    elemento.style.opacity = '0';
    
    setTimeout(() => {
        elemento.remove();
    }, 300);
}

// Ejercicio 4: Modificar estilos CSS dinámicamente
function modificarEstilosCSS() {
    const estilo = document.getElementById('estilosDinamicos');
    
    if (!estilo) {
        // Crear elemento style si no existe
        const nuevoEstilo = document.createElement('style');
        nuevoEstilo.id = 'estilosDinamicos';
        document.head.appendChild(nuevoEstilo);
        estilo = nuevoEstilo;
    }
    
    // Generar colores aleatorios
    const colores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    
    // Modificar CSS
    estilo.textContent = `
        .ejercicio {
            border-left: 5px solid ${colorAleatorio} !important;
            box-shadow: 0 4px 15px ${colorAleatorio}20 !important;
        }
        
        button {
            background: ${colorAleatorio} !important;
            transition: all 0.3s ease !important;
        }
        
        button:hover {
            background: ${oscurecerColor(colorAleatorio, 20)} !important;
            transform: translateY(-2px) !important;
        }
        
        .resultado {
            border: 2px solid ${colorAleatorio} !important;
            background: ${colorAleatorio}10 !important;
        }
    `;
    
    // Mostrar el color actual
    document.getElementById('colorActual').textContent = `Color actual: ${colorAleatorio}`;
    document.getElementById('colorActual').style.color = colorAleatorio;
}

function oscurecerColor(color, porcentaje) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * porcentaje);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Ejercicio 5: Efectos de transición y animación
function aplicarEfectosTransicion() {
    const elementos = document.querySelectorAll('.ejercicio');
    
    elementos.forEach((elemento, index) => {
        // Agregar clases CSS dinámicamente
        elemento.classList.add('efecto-transicion');
        
        // Crear keyframes dinámicamente
        const estilo = document.createElement('style');
        estilo.textContent = `
            @keyframes slideIn${index} {
                0% {
                    transform: translateX(-100px);
                    opacity: 0;
                }
                50% {
                    transform: translateX(10px);
                }
                100% {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .efecto-transicion {
                animation: slideIn${index} 0.8s ease-out forwards;
            }
        `;
        
        document.head.appendChild(estilo);
        
        // Remover la animación después de completarse
        setTimeout(() => {
            elemento.classList.remove('efecto-transicion');
            estilo.remove();
        }, 800);
    });
}

// Ejercicio 6: Manipulación avanzada del DOM
function manipularDOMAvanzado() {
    const contenedor = document.getElementById('manipulacionAvanzada');
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Crear estructura compleja
    const card = document.createElement('div');
    card.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 25px;
        margin: 20px 0;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transform: perspective(1000px) rotateY(0deg);
        transition: all 0.5s ease;
        cursor: pointer;
    `;
    
    // Crear header
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #eee;
    `;
    
    const titulo = document.createElement('h3');
    titulo.textContent = 'Tarjeta Interactiva';
    titulo.style.cssText = `
        margin: 0;
        color: #333;
        font-size: 1.5em;
    `;
    
    const badge = document.createElement('span');
    badge.textContent = 'NUEVO';
    badge.style.cssText = `
        background: #ff6b6b;
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.8em;
        font-weight: bold;
    `;
    
    header.appendChild(titulo);
    header.appendChild(badge);
    
    // Crear contenido
    const contenido = document.createElement('div');
    contenido.innerHTML = `
        <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            Esta es una tarjeta creada completamente con JavaScript. 
            Puedes interactuar con ella usando el mouse.
        </p>
        <div style="display: flex; gap: 10px;">
            <button onclick="cambiarColorTarjeta(this)" style="background: #4ecdc4; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">Cambiar Color</button>
            <button onclick="agregarEfecto(this)" style="background: #45b7d1; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">Efecto</button>
        </div>
    `;
    
    // Agregar efectos interactivos
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'perspective(1000px) rotateY(5deg) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
    
    // Ensamblar la tarjeta
    card.appendChild(header);
    card.appendChild(contenido);
    contenedor.appendChild(card);
}

function cambiarColorTarjeta(boton) {
    const tarjeta = boton.closest('div');
    const colores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    
    tarjeta.style.background = `linear-gradient(135deg, ${colorAleatorio}, ${oscurecerColor(colorAleatorio, 30)})`;
    tarjeta.style.color = 'white';
    
    // Efecto de pulso
    tarjeta.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
        tarjeta.style.animation = '';
    }, 500);
}

function agregarEfecto(boton) {
    const tarjeta = boton.closest('div');
    
    // Crear efecto de partículas
    for (let i = 0; i < 10; i++) {
        const particula = document.createElement('div');
        particula.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ff6b6b;
            border-radius: 50%;
            pointer-events: none;
            animation: particula 1s ease-out forwards;
        `;
        
        particula.style.left = Math.random() * 100 + '%';
        particula.style.top = Math.random() * 100 + '%';
        
        tarjeta.appendChild(particula);
        
        setTimeout(() => {
            particula.remove();
        }, 1000);
    }
    
    // Agregar CSS para la animación de partículas
    if (!document.getElementById('animacionParticulas')) {
        const estilo = document.createElement('style');
        estilo.id = 'animacionParticulas';
        estilo.textContent = `
            @keyframes particula {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(1) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(estilo);
    }
}

// Función para inicializar todos los efectos
function inicializarEfectos() {
    // Agregar estilos base
    const estilosBase = document.createElement('style');
    estilosBase.textContent = `
        .elemento-dinamico {
            transition: all 0.3s ease;
        }
        
        .elemento-dinamico:hover {
            transform: scale(1.02);
        }
        
        #elementosDinamicos {
            margin: 20px 0;
        }
        
        #manipulacionAvanzada {
            margin: 20px 0;
        }
    `;
    document.head.appendChild(estilosBase);
}
