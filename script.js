// ======= INIT =======

// Кнопка Play
const playBtn = document.querySelector('.play-button');
playBtn.addEventListener('click', () => {
  console.log('Play button clicked');
});

// Меню
const menuButtons = document.querySelectorAll('.menu-button');
menuButtons.forEach((btn, i) => {
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

// ======= COINS / ENERGY / LEVELS =======

let currentCoins = parseInt(localStorage.getItem('coins')) || 0;
let currentEnergy = parseInt(localStorage.getItem('energy')) || 0;
let progress = parseInt(localStorage.getItem('progress')) || 0;

const levelThresholds = [0, 333, 666, 999];
let currentLevel = 1;
let allLevelsUnlocked = false;

function formatBalance(value) {
  if (value < 1000) return value.toString();
  if (value < 1000000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
  return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
}

function updateBalanceDisplay() {
  const coinEl = document.querySelector('.coin-value');
  const energyEl = document.querySelector('.energy-value');
  if (coinEl) coinEl.textContent = formatBalance(currentCoins);
  if (energyEl) energyEl.textContent = formatBalance(currentEnergy);
}

function updateLevelStatus() {
  if (progress >= levelThresholds[3]) {
    allLevelsUnlocked = true;
    currentLevel = 3;
  } else if (progress >= levelThresholds[2]) {
    currentLevel = 3;
  } else if (progress >= levelThresholds[1]) {
    currentLevel = 2;
  } else {
    currentLevel = 1;
  }
  const levelText = document.querySelector('.level-text');
  if (levelText) levelText.textContent = `Lvl ${currentLevel}`;
}

function onPassObstacle() {
  progress += 1;
  currentCoins += 1;

  localStorage.setItem('coins', currentCoins);
  localStorage.setItem('progress', progress);

  updateBalanceDisplay();
  updateLevelStatus();
}

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
}

updateBalanceDisplay();
updateLevelStatus();

// ======= TEST MODE =======
currentCoins = 10000;
currentEnergy = 10000;
updateBalanceDisplay();
