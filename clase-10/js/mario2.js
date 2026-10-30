const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables de nuestro "Mario"
let mario = { x: 50, y: 300, width: 30, height: 30, vy: 0, jumping: false };
let gravity = 0.5;
let keys = {};

// Valor global que se puede modificar para cambiar los puntos de la moneda
let valorMoneda = 20;

// Moneda y texto que aparece al recogerla
let moneda = { x: 220, y: 340, radius: 12, visible: true };
let textoPuntos = { x: 0, y: 0, valor: 0, tiempo: 0, visible: false };

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

function update() {
    // Movimiento lateral - el 4 es constante aunque puede modificarse si se necesita un cambio en la velocidad final
    if (keys["ArrowRight"]) mario.x += 4;
    if (keys["ArrowLeft"]) mario.x -= 4;

    // Salto (solo si no está saltando ya)
    if (keys["Space"] && !mario.jumping) {
        mario.vy = -10;
        mario.jumping = true;
    }

    // Aplicar gravedad
    mario.vy += gravity;
    mario.y += mario.vy;

    // Colisión con el suelo (Y = 350)
    if (mario.y > 350) {
        mario.y = 350;
        mario.vy = 0;
        mario.jumping = false; //Mario no esta saltando ahora mismo
    }

    // Colisión entre el rectángulo de Mario y la moneda circular. Hay que calcular la area del cuadrado para confirmar de verdad que la colision
    if (moneda.visible) {
        let puntoCercanoX = Math.max(mario.x, Math.min(moneda.x, mario.x + mario.width));
        let puntoCercanoY = Math.max(mario.y, Math.min(moneda.y, mario.y + mario.height));
        let distanciaX = moneda.x - puntoCercanoX;
        let distanciaY = moneda.y - puntoCercanoY;

        if (distanciaX * distanciaX + distanciaY * distanciaY <= moneda.radius * moneda.radius) {
            moneda.visible = false;
            textoPuntos.x = moneda.x;
            textoPuntos.y = moneda.y;
            textoPuntos.valor = valorMoneda;
            textoPuntos.tiempo = 60;
            textoPuntos.visible = true;
        }
    }

    // Hacer que el número suba durante un segundo aproximadamente
    if (textoPuntos.visible) {
        textoPuntos.y -= 0.5;
        textoPuntos.tiempo--;

        if (textoPuntos.tiempo <= 0) {
            textoPuntos.visible = false;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Suelo
    ctx.fillStyle = "#fcb47c";
    ctx.fillRect(0, 380, canvas.width, 20);

    // Dibujar a Mario (un bloque rojo temporal)
    ctx.fillStyle = "red";
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);

    // Dibujar la moneda mientras no haya sido recogida
    if (moneda.visible) {
        ctx.beginPath();
        ctx.arc(moneda.x, moneda.y, moneda.radius, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();
        ctx.strokeStyle = "#c98b00";
        ctx.stroke();
    }

    // Dibujar el valor de la moneda después de la colisión
    if (textoPuntos.visible) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(textoPuntos.valor, textoPuntos.x, textoPuntos.y);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();