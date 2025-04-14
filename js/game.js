const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;

const bird = new Image();
bird.src = 'images/bird.png';

const bg = new Image();
bg.src = 'images/level-bg.png';

const pipeTop = new Image();
pipeTop.src = 'images/pipe-top.png';
const pipeBottom = new Image();
pipeBottom.src = 'images/pipe-bottom.png';

let pipes = [];
pipes[0] = {
    x: canvas.width,
    y: 0
};

let birdY = canvas.height / 2;
let gravity = 2;

function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pipes.length; i++) {
        let gap = 200;
        let constant = pipeTop.height + gap;
        ctx.drawImage(pipeTop, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + constant);
        pipes[i].x -= 2;

        if (pipes[i].x == 300) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            });
        }

        if (pipes[i].x == bird.x) {
            score++;
        }

        if (
            birdY + bird.height >= canvas.height ||
            birdY <= 0 ||
            (bird.x + bird.width >= pipes[i].x &&
                bird.x <= pipes[i].x + pipeTop.width &&
                (birdY <= pipes[i].y + pipeTop.height ||
                    birdY + bird.height >= pipes[i].y + constant))
        ) {
            localStorage.setItem('coins', score);
            location.href = 'index.html';
        }
    }

    ctx.drawImage(bird, canvas.width / 4, birdY);
    birdY += gravity;

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', () => {
    birdY -= 50;
});

draw();
