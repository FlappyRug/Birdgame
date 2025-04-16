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

// 1. Монети зберігаються в localStorage
let currentCoins = parseInt(localStorage.getItem('coins')) || 0;

// 2. Форматування: 0, 999, 1.2k, 3M
function formatBalance(value) {
  if (value < 1000) return value.toString();
  if (value < 1000000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
  return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
}

// 3. Оновлення балансу на екрані
function updateBalanceDisplay() {
  const el = document.querySelector('.stat span');
  if (el) el.textContent = formatBalance(currentCoins);
}

// 4. Викликати при проходженні балок у грі
function onPassObstacle() {
  currentCoins += 10;
  localStorage.setItem('coins', currentCoins);
  updateBalanceDisplay();
  console.log(`+10 coins! Total: ${currentCoins}`);
}

// 5. Початкове відображення
updateBalanceDisplay();

