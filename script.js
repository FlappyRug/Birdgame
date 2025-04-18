// ========== GAME SCRIPT ==========

// --- Кнопка Play ---
document.querySelector('.play-button').addEventListener('click', () => {
  console.log('Play button clicked');
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


// 5. Початкове відображення
updateBalanceDisplay();

