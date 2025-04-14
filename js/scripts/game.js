
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let frames = 0;
let score = 0;
let pipes = [];

const bird = {
  x: 50,
  y: 150,
  width: 34,
  height: 26,
  gravity: 0.25,
  jump: 4.6,
  velocity: 0,
  draw() {
    ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
  },
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y + this.height >= canvas.height) {
      saveAndExit();
    }
  },
  flap() {
    this.velocity = -this.jump;
  }
};

const pipeGap = 100;
const pipeWidth = 52;
const pipeMaxHeight = 320;
const pipeMinHeight = 50;

function spawnPipe() {
  const top = Math.floor(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight);
  pipes.push({
    x: canvas.width,
    top,
    bottom: canvas.height - top - pipeGap
  });
}

function updatePipes() {
  if (frames % 90 === 0) spawnPipe();
  pipes.forEach(p => p.x -= 2);
  if (pipes.length && pipes[0].x + pipeWidth < 0) {
    pipes.shift();
    score++;
  }
}

function drawPipes() {
  pipes.forEach(p => {
    ctx.drawImage(pipeTopImg, p.x, 0, pipeWidth, p.top);
    ctx.drawImage(pipeBottomImg, p.x, canvas.height - p.bottom, pipeWidth, p.bottom);
  });
}

function saveAndExit() {
  const prev = parseInt(localStorage.getItem("flappy_coins") || "0");
  localStorage.setItem("flappy_coins", prev + score);
  window.location.href = "index.html";
}

canvas.addEventListener("click", () => bird.flap());

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.draw();
  drawPipes();
}

function update() {
  bird.update();
  updatePipes();
}

function loop() {
  update();
  draw();
  frames++;
  requestAnimationFrame(loop);
}

const birdImg = new Image();
birdImg.src = "images/bird.png";
const pipeTopImg = new Image();
pipeTopImg.src = "images/pipe_top.png";
const pipeBottomImg = new Image();
pipeBottomImg.src = "images/pipe_bottom.png";

pipeBottomImg.onload = () => loop();
