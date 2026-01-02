const timer = document.getElementById("ny-timer");
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function getNextNewYear() {
  const now = new Date();
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
}

function updateTimer() {
  const now = new Date();
  const target = getNextNewYear();
  const diff = target - now;

  if (diff <= 0) {
    timer.textContent = "🎉 С Новым Годом!";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  timer.innerHTML = `До Нового Года ⏳:    <br/> <div class="timer">${days}д ${hours}ч ${minutes}м ${seconds}с</div> `;
}

setInterval(updateTimer, 1000);
updateTimer();
