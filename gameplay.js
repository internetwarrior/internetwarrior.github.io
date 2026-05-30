let GAME_OVER = false;

const CLICK_TIME = 3000;

const MAX_HEALTH = 100;
let health = MAX_HEALTH;

const MOVE_DISTANCE = 60; // how far it moves per click
const RANDOMNESS = true; // optional randomness toggle

const healthFill = document.getElementById('healthFill');
const healthText = document.getElementById('healthText');
const healthContainer = document.querySelector('.health-container');

const antiHeroGameplay = document.getElementById('anti-hero');

function updateHealth() {
  if (GAME_OVER) return;

  healthFill.style.width = `${(health / MAX_HEALTH) * 100}%`;
  healthText.textContent = `${health} / ${MAX_HEALTH}`;
}

function flashDamage() {
  if (!antiHeroGameplay) return;

  antiHeroGameplay.classList.add('damage');

  setTimeout(() => {
    antiHeroGameplay.classList.remove('damage');
  }, 200);
  // alert('hello');
}

function endGame() {
  alert('Главный бой был побежден!');
  GAME_OVER = true;

  // hide health bar
  if (healthContainer) {
    healthContainer.style.display = 'none';
    antiHero.style.display = 'none';
  }

  // remove all targets
  document.querySelectorAll('.target').forEach(t => t.remove());
}

function spawnTarget() {
  if (GAME_OVER) return;

  const target = document.createElement('div');
  target.className = 'target';

  target.innerHTML = `
    <div class="logo">
      <img src="./assets/images/svg/loading.svg" class="spin" alt="">
      <img src="./assets/images/svg/loading_2.svg" class="spin-reverse" alt="">
    </div>
  `;

  if (is_started) {
    target.style.display = 'block';
  }

  const size = 100;
  const x = Math.random() * (window.innerWidth - size);
  const y = Math.random() * (window.innerHeight - size);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  document.body.appendChild(target);

  const clickHandler = () => {
    if (GAME_OVER) return;

    health = Math.max(0, health - 1);
    updateHealth();
    flashDamage();

    const rect = target.getBoundingClientRect();

    let x = rect.left;
    let y = rect.top;

    const dirX = RANDOMNESS
      ? Math.random() < 0.5
        ? -MOVE_DISTANCE
        : MOVE_DISTANCE
      : MOVE_DISTANCE;

    const dirY = RANDOMNESS
      ? Math.random() < 0.5
        ? -MOVE_DISTANCE
        : MOVE_DISTANCE
      : MOVE_DISTANCE;

    x += dirX;
    y += dirY;

    x = Math.max(0, Math.min(window.innerWidth - 100, x));
    y = Math.max(0, Math.min(window.innerHeight - 100, y));

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    if (health === 0) {
      endGame();
      return;
    }
  };

  target.addEventListener('click', clickHandler);

  setTimeout(() => {
    target.removeEventListener('click', clickHandler);
    if (target.isConnected) target.remove();

    scheduleNextTarget();
  }, CLICK_TIME);
}

function scheduleNextTarget() {
  if (GAME_OVER) return;

  const delay = 5000 + Math.random() * 1000;

  setTimeout(() => {
    spawnTarget();
  }, delay);
}

updateHealth();
// spawnTarget();
