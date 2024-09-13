const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const plane = {
    x: 100,
    y: 250,
    width: 50,
    height: 30,
    speed: 5,
    dy: 0
};

const wind = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 20,
    height: 20
};

const gravity = 0.2;
let isGameOver = false;

// キーボードの入力を記録
const keys = {};

// 飛行機の画像を読み込み
const planeImage = new Image();
planeImage.src = 'plane.png';  // ピクセルアートの飛行機画像を用意する

// キー操作
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

function drawPlane() {
    ctx.drawImage(planeImage, plane.x, plane.y, plane.width, plane.height);
}

function drawWind() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(wind.x, wind.y, wind.width, wind.height);
}

function update() {
    if (keys['ArrowUp']) plane.y -= plane.speed;
    if (keys['ArrowDown']) plane.y += plane.speed;
    if (keys['ArrowLeft']) plane.x -= plane.speed;
    if (keys['ArrowRight']) plane.x += plane.speed;

    plane.dy += gravity; // 重力を適用
    plane.y += plane.dy;

    // 風を掴んだかどうか
    if (plane.x < wind.x + wind.width &&
        plane.x + plane.width > wind.x &&
        plane.y < wind.y + wind.height &&
        plane.height + plane.y > wind.y) {
        plane.dy = -5;  // 風を掴むと飛行機が上昇する
        wind.x = Math.random() * canvas.width;  // 新しい風をランダムな位置に生成
        wind.y = Math.random() * canvas.height;
    }

    // ゲームオーバー条件
    if (plane.y + plane.height > canvas.height) {
        isGameOver = true;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver) {
        drawPlane();
        drawWind();
        update();
        requestAnimationFrame(gameLoop);
    } else {
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    }
}

planeImage.onload = () => {
    gameLoop();
};
