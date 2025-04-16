document.querySelector('.play-button').addEventListener('click', () => {
  console.log('Play button clicked');
});
document.querySelectorAll('.menu-button').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    switch(i) {
      case 0: console.log('Customize'); break;
      case 1: console.log('Quests'); break;
      case 2: console.log('Friends'); break;
      case 3: console.log('Leaderboard'); break;
      case 4: console.log('Shop'); break;
    }
  });
});
let currentCoins = 0;

function formatBalance(value) {
  if (value < 1000) return value.toString();
  if (value < 1000000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
  return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
}

function updateBalanceDisplay() {
  const el = document.querySelector('.balance-value');
  if (el) el.textContent = formatBalance(currentCoins);
}

// Викликати цю функцію щоразу, коли персонаж проходить балку:
function onPassObstacle() {
  currentCoins += 10;
  updateBalanceDisplay();
  console.log(`+10 coins! Total: ${currentCoins}`);
}

// Початкове відображення балансу
updateBalanceDisplay();

// Поки що для тесту – видалиш пізніше:
setInterval(onPassObstacle, 3000);
