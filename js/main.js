function startGame() {
    window.location.href = 'game.html';
}
document.getElementById('coins').textContent = localStorage.getItem('coins') || '0';
