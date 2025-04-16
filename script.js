// Кнопка Play
document.querySelector('.play-button').addEventListener('click', () => {
  console.log('Play button clicked');
});

// Меню
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

// ======== COINS + ENERGY + LEVELS ========

// 1. Дані зберігаються в localStorage
let currentCoins = parseInt(localStorage.getItem('coins')) || 0;
let currentEnergy = parseInt(localStorage.getItem('energy')) || 0;
let progress = parseInt(localStorage.getItem('progress')) || 0;

// 2. Рівні: 0, 333, 666, 999
const levelThresholds = [0, 333, 666, 999];
let currentLevel = 1;
let allLevelsUnlocked = false;

// 3. Форматування числа
function formatBalance(value) {
  if (value < 1000) return value.toString();
  if (value < 1000000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
  return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
}

// 4. Оновлення чисел на екрані
function updateBalanceDisplay() {
  const coinEl = document.querySelector('.balance-value.coins');
  const energyEl = document.querySelector('.balance-value.energy');

  if (coinEl) coinEl.textContent = formatBalance(currentCoins);
  if (energyEl) energyEl.textContent = formatBalance(currentEnergy);
}

// 5. Оновлення рівня
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
  const levelEl = document.querySelector('.level-text');
  if (levelEl) levelEl.textContent = 'Lvl ' + currentLevel;
}

// 6. Прохід перешкоди
function onPassObstacle() {
  progress += 1;
  currentCoins += 1;

  localStorage.setItem('coins', currentCoins);
  localStorage.setItem('progress', progress);

  updateBalanceDisplay();
  updateLevelStatus();
  console.log(`+1 монета! Всього: ${currentCoins}, Прогрес: ${progress}`);
}

// 7. Вибір рівня вручну після відкриття
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
  updateLevelStatus();
  console.log(`Обрано рівень: ${currentLevel}`);
}

// 8. Початковий рендер
updateBalanceDisplay();
updateLevelStatus();

// ======= ТЕСТОВІ ДАНІ =======
currentCoins = 10000;
currentEnergy = 10000;
updateBalanceDisplay();
