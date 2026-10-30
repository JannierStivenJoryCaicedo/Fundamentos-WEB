const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables de nuestro "Mario"
let mario = { x: 50, y: 300, width: 30, height: 30, vy: 0, jumping: false };
let gravity = 0.5;
let keys = {};

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
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Suelo
    ctx.fillStyle = "#fcb47c";
    ctx.fillRect(0, 380, canvas.width, 20);

    // Dibujar a Mario (un bloque rojo temporal)
    ctx.fillStyle = "red";
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();