document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.querySelector(".play-button");
  const backButton = document.getElementById("back-to-menu");
  const mainMenu = document.getElementById("main-menu");
  const gameScreen = document.getElementById("game-screen");

  playButton.addEventListener("click", () => {
    mainMenu.style.display = "none";
    gameScreen.style.display = "block";
    startGame();
  });

  backButton.addEventListener("click", () => {
    mainMenu.style.display = "block";
    gameScreen.style.display = "none";
    cancelAnimationFrame(gameLoopId);
  });

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const label = item.querySelector(".label").textContent;
      console.log(`${label} button clicked`);

      if (label === "BIRD") {
        const progress = getProgress();
        document.getElementById("bird-points").textContent = progress.totalPoints;
        document.getElementById("bird-level").textContent = progress.birdLevel;
        document.getElementById("bird-modal").style.display = "flex";
      }
    });
  });

  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();
  }
});

function closeBirdModal() {
  document.getElementById("bird-modal").style.display = "none";
}