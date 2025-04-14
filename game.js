let canvas, ctx;
let bird, pipes, frame, score, isGameOver;
let gameLoopId;

function startGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  bird = {
    x: 80,
    y: 200,
    width: 30,
    height: 30,
    velocity: 0,
    gravity: 0.6,
    jumpStrength: -10
  };

  pipes = [];
  frame = 0;
  score = 0;
  isGameOver = false;

  document.addEventListener("keydown", jump);
  canvas.addEventListener("click", jump);

  gameLoop();
}

function jump() {
  if (isGameOver) {
    startGame(); // restart
  } else {
    bird.velocity = bird.jumpStrength;
  }
}

function drawBird() {
  ctx.fillStyle = "orange";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
  });
}

function updatePipes() {
  if (frame % 100 === 0) {
    const gap = 140;
    const top = Math.floor(Math.random() * 250) + 50;
    pipes.push({
      x: canvas.width,
      width: 50,
      top,
      bottom: top + gap,
      passed: false
    });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function checkCollision() {
  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    isGameOver = true;
  }

  pipes.forEach(pipe => {
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      isGameOver = true;
    }

    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      pipe.passed = true;
      score++;
    }
  });
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 20, 40);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.y += bird.velocity;
  bird.velocity += bird.gravity;

  updatePipes();
  drawPipes();
  drawBird();
  drawScore();

  checkCollision();

  if (!isGameOver) {
    frame++;
    gameLoopId = requestAnimationFrame(gameLoop);
  } else {
    ctx.fillStyle = "red";
    ctx.font = "32px Arial";
    ctx.fillText("Game Over", 120, 300);
    ctx.font = "20px Arial";
    ctx.fillText("Tap or key to restart", 100, 340);
  }
}
