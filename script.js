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

// ======== COINS + LEVELS ========

// 1. Монети зберігаються в localStorage
let currentCoins = parseInt(localStorage.getItem('coins')) || 0;

// 2. Прогрес балок зберігається
let progress = parseInt(localStorage.getItem('progress')) || 0;

// 3. Рівні: 0, 333, 666, 999
const levelThresholds = [0, 333, 666, 999];
let currentLevel = 1;
let allLevelsUnlocked = false;

// 4. Форматування монет
function formatBalance(value) {
  if (value < 1000) return value.toString();
  if (value < 1000000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
  return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
}

// 5. Оновлення монет на екрані
function updateBalanceDisplay(10000) {
  const el = document.querySelector('.balance-value');
  if (el) el.textContent = formatBalance(currentCoins);
}

// 6. Оновлення рівня
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
  console.log(`Ваш рівень: ${currentLevel}`);
}

// 7. Прохід перешкоди
function onPassObstacle() {
  progress += 1; // 1 балка = 1 бал і 1 монета
  currentCoins += 1;

  localStorage.setItem('coins', currentCoins);
  localStorage.setItem('progress', progress);

  updateBalanceDisplay();
  updateLevelStatus();

  console.log(`+1 монета! Всього: ${currentCoins}, Прогрес: ${progress}`);
}

// 8. Вибір рівня після завершення
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

// 9. Початкове відображення
updateBalanceDisplay();
updateLevelStatus();


// 5. Початкове відображення
updateBalanceDisplay();

