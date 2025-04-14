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
      const label = item.querySelector(".label").textContent.trim().toLowerCase();
      console.log(`${label} button clicked`);

    if (label === "LEADERBOARD") {
      const progress = getProgress();
      document.getElementById("leaderboard-points").textContent = progress.totalPoints;
      document.getElementById("leaderboard-level").textContent = progress.birdLevel;
      document.getElementById("leaderboard-modal").style.display = "flex";
    }

    if (label === "BIRD") {
      const progress = getProgress();
      document.getElementById("bird-points").textContent = progress.totalPoints;
      document.getElementById("bird-level").textContent = progress.birdLevel;
      document.getElementById("bird-modal").style.display = "flex";
      const percent = Math.min(100, (progress.totalPoints / 1500) * 100);
      document.getElementById("progress-fill").style.width = percent + "%";
    }


      if (label === "BIRD") {
        const progress = getProgress();
  document.getElementById("total-points").textContent = progress.totalPoints;
        document.getElementById("bird-points").textContent = progress.totalPoints;
        document.getElementById("bird-level").textContent = progress.birdLevel;
        document.getElementById("bird-modal").style.display = "flex";
    const percent = Math.min(100, (progress.totalPoints / 1500) * 100);
    document.getElementById("progress-fill").style.width = percent + "%";
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


function closeLeaderboard() {
  document.getElementById("leaderboard-modal").style.display = "none";
}