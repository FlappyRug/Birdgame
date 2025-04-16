document.querySelector('.play-button').addEventListener('click', () => {
  console.log('Play button clicked');
  // Тут буде логіка запуску гри
});

// Приклад: для кастомізації чи кнопок меню можна додати свої івенти:
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
