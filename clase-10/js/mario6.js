const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables de nuestro "Mario"
let mario = { x: 50, y: 300, width: 30, height: 30, vy: 0, jumping: false };

// Tarea: Varias plataformas
let plataformas = [
    { x: 260, y: 300, width: mario.width * 3, height: 8 },
    { x: 380, y: 250, width: mario.width * 3, height: 8 },
    { x: 500, y: 200, width: mario.width * 3, height: 8 }
];
let gravity = 0.5;
let keys = {};

// Valor global que se puede modificar para cambiar los puntos de la moneda
let valorMoneda = 20;

// Puntaje total acumulado por Mario
let puntaje = 0;

//Tarea: El mensajito pa la victoria
let juegoGanado = false;

// Tarea: Contador disminuye recogiendo monedas
let contador = 5;

// Moneda y texto que aparece al recogerla
let monedas = [
    { x: 120, y: 340, radius: 12, visible: true },
    { x: 220, y: 340, radius: 12, visible: true },
    { x: 310, y: 265, radius: 12, visible: true },
    { x: 425, y: 215, radius: 12, visible: true },
    { x: 545, y: 165, radius: 12, visible: true }
];

// Texto que sale al recoger la moneda
let textosPuntos = [];
//{ x: 0, y: 0, valor: 0, tiempo: 0, visible: false };

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

function update() {
    // Movimiento lateral
    if (keys["ArrowRight"]) mario.x += 4;
    if (keys["ArrowLeft"]) mario.x -= 4;

    // Salto (solo si no está saltando ya)
    if (keys["Space"] && !mario.jumping) {
        mario.vy = -10;
        mario.jumping = true;
    }

    // Guardar la posición anterior para detectar si Mario cae sobre la plataforma
    let bordeInferiorAnterior = mario.y + mario.height;

    // Aplicar gravedad
    mario.vy += gravity;
    mario.y += mario.vy;

    let sobreSuperficie = false;

    for (let plataforma of plataformas) {

        // La plataforma solo detiene a Mario cuando está cayendo sobre ella
        let coincideHorizontalmente =
            mario.x + mario.width > plataforma.x &&
            mario.x < plataforma.x + plataforma.width;
        let bordeInferiorActual = mario.y + mario.height;

        if (
            mario.vy >= 0 &&
            coincideHorizontalmente &&
            bordeInferiorAnterior <= plataforma.y &&
            bordeInferiorActual >= plataforma.y
        ) {
            mario.y = plataforma.y - mario.height;
            mario.vy = 0;
            mario.jumping = false;
            sobreSuperficie = true;
        }
    }

    // Colisión con el suelo (Y = 350)
    if (mario.y > 350) {
        mario.y = 350;
        mario.vy = 0;
        mario.jumping = false;
        sobreSuperficie = true;
    }

    // Al salir de la plataforma, Mario vuelve a estar en el aire y cae
    if (!sobreSuperficie) {
        mario.jumping = true;
    }

    // Revisar la colisión de Mario con cada moneda
    for (let moneda of monedas) {
        if (moneda.visible) {
            let puntoCercanoX = Math.max(mario.x, Math.min(moneda.x, mario.x + mario.width));
            let puntoCercanoY = Math.max(mario.y, Math.min(moneda.y, mario.y + mario.height));
            let distanciaX = moneda.x - puntoCercanoX;
            let distanciaY = moneda.y - puntoCercanoY;

            if (distanciaX * distanciaX + distanciaY * distanciaY <= moneda.radius * moneda.radius) {
                moneda.visible = false;
                puntaje += valorMoneda;
                contador--;
                textosPuntos.push({
                    x: moneda.x,
                    y: moneda.y,
                    valor: valorMoneda,
                    tiempo: 60
                });

                //Tarea: Esto activa el mensaje de victoria
                if (contador == 0){
                    juegoGanado = true;
                }
            }
        }
    }

    // Hacer que los números suban durante un segundo aproximadamente
    for (let texto of textosPuntos) {
        texto.y -= 0.5;
        texto.tiempo--;
    }

    // Eliminar los textos cuyo tiempo terminó
    textosPuntos = textosPuntos.filter(texto => texto.tiempo > 0);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Suelo
    ctx.fillStyle = "#fcb47c";
    ctx.fillRect(0, 380, canvas.width, 20);

    // Dibujar la plataforma con un ancho igual a tres veces el de Mario
    for (let plataforma of plataformas) {
        ctx.fillStyle = "#8b5a2b";
        ctx.fillRect(plataforma.x, plataforma.y, plataforma.width, plataforma.height);
    }

    // Dibujar a Mario (un bloque rojo temporal)
    ctx.fillStyle = "red";
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);

    // Dibujar todas las monedas que no hayan sido recogidas
    for (let moneda of monedas) {
        if (moneda.visible) {
            ctx.beginPath();
            ctx.arc(moneda.x, moneda.y, moneda.radius, 0, Math.PI * 2);
            ctx.fillStyle = "gold";
            ctx.fill();
            ctx.strokeStyle = "#c98b00";
            ctx.stroke();
        }
    }

    // Dibujar el valor de la moneda después de la colisión
    for (let texto of textosPuntos) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(texto.valor, texto.x, texto.y);
    }

    // Mostrar permanentemente el puntaje acumulado
    ctx.fillStyle = "#222222";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Puntaje: " + puntaje, 15, 30);
    ctx.fillStyle = "#222222";

    // Mostrar el contador de monedas
    ctx.fillStyle = "#222222";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Monedas: " + contador, 15, 60);
    ctx.fillStyle = "#222222";

    // Mostrar el resultado final al alcanzar la meta
    if (juegoGanado) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "bold 40px Arial";
        ctx.fillText("¡Victoria!", canvas.width / 2, 175);
        ctx.font = "bold 26px Arial";
        ctx.fillText("Puntaje final: " + puntaje, canvas.width / 2, 220);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();