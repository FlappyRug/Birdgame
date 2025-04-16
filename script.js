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

// --- Формат чисел (0, 999, 1.2k, 1M) ---
function formatBalance(value) {
  if (value < 1000) return value.toString();
  if (value < 1000000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
  return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
}

// --- Оновити баланс на екрані ---
function updateBalanceDisplay() {
  const statSpans = document.querySelectorAll('.balance-value');
  if (statSpans.length >= 2) {
    statSpans[0].textContent = formatBalance(currentCoins);
    statSpans[1].textContent = formatBalance(currentEnergy);
  }
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

// --- Тестові значення ---
currentCoins = 10000;
currentEnergy = 10000;
updateBalanceDisplay();
