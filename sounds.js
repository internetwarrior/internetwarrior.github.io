const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let buffer;
let volume = 1;
let particleColor = "255,0,0"; // RGB format
particleColor = "50,255,255"; // cyan 💥
// particleColor = ""; // cyan 💥

async function loadSound() {
  const res = await fetch("assets/sounds/water_drop.mp3");
  const arrayBuffer = await res.arrayBuffer();
  buffer = await audioContext.decodeAudioData(arrayBuffer);
}
loadSound();

function playWithEcho() {
  if (!buffer) return;

  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume;

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  source.start(0);
}

let canvas, ctx;
let particles = [];
let animationId = null;

function createCanvas() {
  if (canvas) return;

  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  ctx = canvas.getContext("2d");
}

function drawHeart(x, y, size) {
  ctx.font = size + "px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("💔", x, y);
}

function explode(x, y) {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: 4,
      radius: Math.random() * 3 + 1,
      life: 100,
    });
  }
}

function animate(centerX, centerY) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawHeart(centerX, centerY, 90);

  particles.forEach((p) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particleColor},${p.life / 100})`;
    ctx.fill();
  });

  particles = particles.filter((p) => p.life > 0);

  if (particles.length > 0) {
    animationId = requestAnimationFrame(() => animate(centerX, centerY));
  } else {
    animationId = null;
  }
}

function waterDrop() {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  playWithEcho();
  createCanvas();

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  explode(centerX, centerY);
  animate(centerX, centerY);
}

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "d") {
    waterDrop();
  }
});
