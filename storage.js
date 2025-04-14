function getProgress() {
  return {
    totalPoints: Number(localStorage.getItem("totalPoints") || 0),
    birdLevel: Number(localStorage.getItem("birdLevel") || 1)
  };
}

function saveProgress(points) {
  localStorage.setItem("totalPoints", points);

  let level = 1;
  if (points >= 1500) level = 3;
  else if (points >= 150) level = 2;

  localStorage.setItem("birdLevel", level);
}