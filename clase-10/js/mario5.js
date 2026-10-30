const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables de nuestro "Mario"
let mario = { x: 50, y: 300, width: 30, height: 30, vy: 0, jumping: false };
let plataforma = { x: 300, y: 300, width: mario.width * 3, height: 8 };
let gravity = 0.5;
let keys = {};

// Valor global que se puede modificar para cambiar los puntos de la moneda
let valorMoneda = 20;

// Puntaje total acumulado por Mario
let puntaje = 0;

// Moneda y texto que aparece al recogerla
let monedas = [
    { x: 220, y: 340, radius: 12, visible: true },
    { x: 345, y: 265, radius: 12, visible: true },
    { x: 480, y: 340, radius: 12, visible: true }
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
                textosPuntos.push({
                    x: moneda.x,
                    y: moneda.y,
                    valor: valorMoneda,
                    tiempo: 60
                });
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
    ctx.fillStyle = "#8b5a2b";
    ctx.fillRect(plataforma.x, plataforma.y, plataforma.width, plataforma.height);

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
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();