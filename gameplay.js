
// let GAME_OVER = false;

// let CLICK_TIME = 20_000;
// let MOVE_DISTANCE = 0; // how far it moves per click

// const MAX_HEALTH = 5_000;
// let health = MAX_HEALTH;

// const RANDOMNESS = true; // optional randomness toggle
// function DIFFICULTY_CHANGE() {
//   const thresholds = [5000, 4000, 3000, 2000, 1000];

//   let level = 0;

//   for (let i = 0; i < thresholds.length; i++) {
//     if (health <= thresholds[i]) {
//       level = i;
//     }
//   }

//   // first 1k chunk (level 0) = no movement
//   if (level === 0) {
//     MOVE_DISTANCE = 0;
//   } else {
//     MOVE_DISTANCE = 20 * level;
//   }

//   const maxTime = 20_000;
//   const minTime = 3_000;

//   const progress = level / (thresholds.length - 1);
//   CLICK_TIME = Math.floor(maxTime - (maxTime - minTime) * progress);
// }

// let punchBuffers = [];
// let sowrdVolume = 0.5;

// const healthFill = document.getElementById('healthFill');
// const healthText = document.getElementById('healthText');
// const healthContainer = document.querySelector('.health-container');

// const antiHeroGameplay = document.getElementById('anti-hero');

// function updateHealth() {
//   if (GAME_OVER) return;

//   healthFill.style.width = `${(health / MAX_HEALTH) * 100}%`;
//   healthText.textContent = `${health} / ${MAX_HEALTH} HP`;
// }

// async function loadPunchSounds() {
//   const files = [
//     'assets/sounds/punch_1.mp3',
//     'assets/sounds/punch_2.mp3',
//     'assets/sounds/punch_3.mp3',
//     // 'assets/sounds/sword-hit.mp3',
//   ];

//   for (const file of files) {
//     const res = await fetch(file);
//     const arrayBuffer = await res.arrayBuffer();
//     const buffer = await audioContext.decodeAudioData(arrayBuffer);
//     punchBuffers.push(buffer);
//   }
// }

// loadPunchSounds();

// function playPunchSound() {
//   if (!punchBuffers.length) return;

//   const source = audioContext.createBufferSource();
//   source.buffer = punchBuffers[Math.floor(Math.random() * punchBuffers.length)];

//   const gainNode = audioContext.createGain();
//   gainNode.gain.value = sowrdVolume;

//   source.connect(gainNode);
//   gainNode.connect(audioContext.destination);

//   source.start(0);
// }

// function flashDamage() {
//   if (!antiHeroGameplay) return;

//   antiHeroGameplay.classList.add('damage');

//   setTimeout(() => {
//     antiHeroGameplay.classList.remove('damage');
//   }, 200);
//   // alert('hello');
// }

// function endGame() {
//   alert('Главный бой был побежден!');
//   GAME_OVER = true;

//   // hide health bar
//   if (healthContainer) {
//     healthContainer.style.display = 'none';
//     antiHero.style.display = 'none';
//   }

//   // remove all targets
//   document.querySelectorAll('.target').forEach(t => t.remove());
// }

// function spawnTarget() {
//   if (GAME_OVER) return;

//   const target = document.createElement('div');
//   target.className = 'target';

//   target.innerHTML = `
//     <div class="logo">
//       <img src="./assets/images/svg/loading.svg" class="spin" alt="">
//       <img src="./assets/images/svg/loading_2.svg" class="spin-reverse" alt="">
//     </div>
//   `;

//   if (is_started) {
//     target.style.display = 'block';
//   }

//   const size = 100;
//   const x = Math.random() * (window.innerWidth - size);
//   const y = Math.random() * (window.innerHeight - size);

//   target.style.left = `${x}px`;
//   target.style.top = `${y}px`;

//   document.body.appendChild(target);

//   const clickHandler = e => {
//     if (GAME_OVER) return;

//     playPunchSound();

//     const rect = target.getBoundingClientRect();

//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     const distance = Math.hypot(clickX - centerX, clickY - centerY);

//     let damage = 1;

//     if (distance <= 20) {
//       damage = 15;
//       health = Math.max(0, health - damage);
//     } else if (distance <= 50) {
//       damage = 5;
//       health = Math.max(0, health - damage);
//     } else {
//       health = Math.min(MAX_HEALTH, health + 30);
//     }

//     DIFFICULTY_CHANGE();

//     updateHealth();
//     flashDamage();

//     let CAN_TAKE_DAMAGE_TIMES = Math.floor(Math.random() * 3) + 1;

//     let x = rect.left;
//     let y = rect.top;

//     const dirX = RANDOMNESS
//       ? Math.random() < 0.5
//         ? -MOVE_DISTANCE
//         : MOVE_DISTANCE
//       : MOVE_DISTANCE;

//     const dirY = RANDOMNESS
//       ? Math.random() < 0.5
//         ? -MOVE_DISTANCE
//         : MOVE_DISTANCE
//       : MOVE_DISTANCE;

//     x += dirX;
//     y += dirY;

//     x = Math.max(0, Math.min(window.innerWidth - 150, x));
//     y = Math.max(0, Math.min(window.innerHeight - 150, y));

//     CAN_TAKE_DAMAGE_TIMES--;

//     if (!CAN_TAKE_DAMAGE_TIMES) {
//       target.style.left = `${x}px`;
//       target.style.top = `${y}px`;

//       CAN_TAKE_DAMAGE_TIMES = Math.floor(Math.random() * 3) + 1;
//     }

//     if (health === 0) {
//       endGame();
//     }
//   };

//   target.addEventListener('click', clickHandler);

//   setTimeout(() => {
//     target.removeEventListener('click', clickHandler);
//     if (target.isConnected) target.remove();

//     scheduleNextTarget();
//   }, CLICK_TIME);
// }

// function scheduleNextTarget() {
//   if (GAME_OVER) return;

//   const delay = 2000 + Math.random() * 1000;

//   setTimeout(() => {
//     spawnTarget();
//   }, delay);
// }

// updateHealth();
// // spawnTarget();
