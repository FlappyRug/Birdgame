// ========== GAME SCRIPT ==========

// --- Старт гри ---
function startGame() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  const bgImg = new Image();
  bgImg.src = 'images/bg-game.png';

  const owlImg = new Image();
  owlImg.src = 'images/owl.png';

  const pipeTopImg = new Image();
  pipeTopImg.src = 'images/pipe-top.png';

  const pipeBottomImg = new Image();
  pipeBottomImg.src = 'images/pipe-bottom.png';

  let owlX = 80;
  let owlY = 250;
  let owlVelocity = 0;
  const gravity = 0.5;
  const jumpForce = -8;

  const pipeGap = 160;
  const pipeWidth = 60;
  const pipeSpacing = 240;
  const pipes = [];
  let frameCount = 0;
  let score = 0;
  let gameOver = false;

  function createPipe() {
    const topHeight = Math.floor(Math.random() * 200) + 100;
    pipes.push({
      x: canvas.width,
      topY: 0,
      topH: topHeight,
      bottomY: topHeight + pipeGap,
      bottomH: canvas.height - (topHeight + pipeGap),
      counted: false
    });
  }

  function checkCollision(pipe) {
    const owlW = 64;
    const owlH = 64;

    const owlLeft = owlX;
    const owlRight = owlX + owlW;
    const owlTop = owlY;
    const owlBottom = owlY + owlH;

    const topPipeBottom = pipe.topY + pipe.topH;
    if (
      owlRight > pipe.x &&
      owlLeft < pipe.x + pipeWidth &&
      owlTop < topPipeBottom
    ) {
      return true;
    }

    if (
      owlRight > pipe.x &&
      owlLeft < pipe.x + pipeWidth &&
      owlBottom > pipe.bottomY
    ) {
      return true;
    }

    return false;
  }

  function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    owlVelocity += gravity;
    owlY += owlVelocity;

    if (owlY > canvas.height || owlY < -64) {
      gameOver = true;
      console.log('Ви програли!');
      return;
    }

    ctx.drawImage(owlImg, owlX, owlY, 64, 64);

    pipes.forEach(pipe => {
      pipe.x -= 2;

      ctx.drawImage(pipeTopImg, pipe.x, pipe.topY, pipeWidth, pipe.topH);
      ctx.drawImage(pipeBottomImg, pipe.x, pipe.bottomY, pipeWidth, pipe.bottomH);

      if (checkCollision(pipe)) {
        gameOver = true;
        console.log('Сова вдарилась! Гра завершена.');
      }

      if (!pipe.counted && pipe.x + pipeWidth < owlX) {
        pipe.counted = true;
        score += 1;
        onPassObstacle();
        console.log(`Очки: ${score}`);
      }
    });

    while (pipes.length && pipes[0].x < -pipeWidth) {
      pipes.shift();
    }

    if (frameCount % pipeSpacing === 0) {
      createPipe();
    }

    frameCount++;
    requestAnimationFrame(gameLoop);
  }

  canvas.addEventListener('click', () => {
    owlVelocity = jumpForce;
  });
  canvas.addEventListener('touchstart', () => {
    owlVelocity = jumpForce;
  });

  const allImages = [bgImg, owlImg, pipeTopImg, pipeBottomImg];
  let loadedImages = 0;

  allImages.forEach(img => {
    img.onload = () => {
      loadedImages++;
      if (loadedImages === allImages.length) {
        gameLoop();
      }
    };
  });

  console.log('Game started with pipes and physics!');
}

// --- Кнопка Play ---
document.querySelector('.play-button').addEventListener('click', () => {
  document.querySelector('.top-bar').style.display = 'none';
  document.querySelector('.character-container').style.display = 'none';
  document.querySelector('.play-button').style.display = 'none';
  document.querySelector('.bottom-menu').style.display = 'none';

  document.getElementById('game-screen').style.display = 'block';

  startGame();
});

// --- Меню ---
document.querySelectorAll('.menu-button').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    switch (i) {
      case 0: console.log('Customize'); break;
      case 1: console.log('Quests'); break;
      case 2: console.log('Friends'); break;
      case 3: console.log('Leaderboard'); break;
      case 4: console.log('Shop'); break;
    }
  });
});

// --- Дані користувача ---
let currentCoins = parseInt(localStorage.getItem('coins')) || 0;
let currentEnergy = parseInt(localStorage.getItem('energy')) || 0;
let progress = parseInt(localStorage.getItem('progress')) || 0;

// --- Рівні ---
const levelThresholds = [0, 333, 666, 999];
let currentLevel = 1;
let allLevelsUnlocked = false;

// --- Формат чисел з HTML (100 + маленьке "k") ---
function formatBalanceHTML(value) {
  if (value < 1000) return `<span>${value}</span>`;
  if (value < 1000000) {
    const num = Math.floor(value / 1000);
    return `<span>${num}</span><span class="small-k">k</span>`;
  }
  const num = Math.floor(value / 1000000);
  return `<span>${num}</span><span class="small-k">M</span>`;
}

// --- Оновити баланс на екрані ---
function updateBalanceDisplay() {
  const coinEl = document.querySelector('.coin-value');
  const energyEl = document.querySelector('.energy-value');

  if (coinEl) coinEl.innerHTML = formatBalanceHTML(currentCoins);
  if (energyEl) energyEl.innerHTML = formatBalanceHTML(currentEnergy);
}

// --- Оновити рівень ---
function updateLevelStatus() {
  if (progress >= levelThresholds[3]) {
    allLevelsUnlocked = true;
    currentLevel = 3;
    console.log("Ви пройшли всі рівні! Доступна вільна гра.");
  } else if (progress >= levelThresholds[2]) {
    currentLevel = 3;
  } else if (progress >= levelThresholds[1]) {
    currentLevel = 2;
  } else {
    currentLevel = 1;
  }
  document.querySelector('.level-text').textContent = `Lvl ${currentLevel}`;
  console.log(`Ваш рівень: ${currentLevel}`);
}

// --- Коли гравець проходить перешкоду ---
function onPassObstacle() {
  progress += 1;
  currentCoins += 1;

  localStorage.setItem('coins', currentCoins);
  localStorage.setItem('progress', progress);

  updateBalanceDisplay();
  updateLevelStatus();

  console.log(`+1 монета! Всього: ${currentCoins}, Прогрес: ${progress}`);
}

// --- Вибір рівня вручну ---
function chooseLevel(lvl) {
  if (!allLevelsUnlocked) {
    console.log("Ще не доступно. Спочатку потрібно пройти всі рівні.");
    return;
  }
  if (lvl < 1 || lvl > 3) {
    console.log("Невірний рівень.");
    return;
  }
  currentLevel = lvl;
  console.log(`Обрано рівень: ${currentLevel}`);
  updateLevelStatus();
}

// --- Початкове відображення ---
updateBalanceDisplay();
updateLevelStatus();
