const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const SINGING_SPEED = 0.06; // Default: 0.06
const HEAD_MOVEMENT_SPEED = 0.5;

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let eyeMovement = { x: 0, y: 0 };

let isSinging = false;
let singingTime = 0;

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

resize();
window.addEventListener("resize", resize);

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousedown", (e) => {
  if (e.button === 0) isSinging = true;
});

window.addEventListener("mouseup", (e) => {
  if (e.button === 0) isSinging = false;
});

window.addEventListener("blur", () => {
  isSinging = false;
});

function roundedRect(x, y, w, h, r, color) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawEye(x, y, radius, offsetX, offsetY) {
  ctx.save();

  ctx.beginPath();
  ctx.ellipse(x, y, radius, radius * 0.68, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.clip();

  ctx.beginPath();
  ctx.arc(x + offsetX, y + offsetY, radius * 0.39, 0, Math.PI * 2);
  ctx.fillStyle = "#6B4936";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x + offsetX, y + offsetY, radius * 0.21, 0, Math.PI * 2);
  ctx.fillStyle = "#171717";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    x + offsetX - radius * 0.08,
    y + offsetY - radius * 0.12,
    radius * 0.09,
    0,
    Math.PI * 2,
  );
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.restore();
}

function drawFace() {
  const w = innerWidth;
  const h = innerHeight;

  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  const s = Math.min(w, h) / 650;

  // Singing animation
  // Singing animation
  let mouthOpen = 0;
  let headTilt = 0;

  if (isSinging) {
    singingTime += SINGING_SPEED;

    mouthOpen = Math.max(0, Math.sin(singingTime * 2.5));
    headTilt = Math.sin(singingTime * HEAD_MOVEMENT_SPEED) * 0.035;
  } else {
    singingTime = 0;
  }
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(headTilt);
  ctx.scale(s, s);

  // Neck
  roundedRect(-45, 125, 90, 130, 25, "#D99C78");

  // Ears
  ctx.fillStyle = "#D99C78";

  ctx.beginPath();
  ctx.ellipse(-137, -5, 25, 42, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(137, -5, 25, 42, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair behind head
  ctx.beginPath();
  ctx.ellipse(0, -28, 145, 170, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#38251E";
  ctx.fill();

  // Face
  ctx.beginPath();
  ctx.moveTo(-125, -95);
  ctx.bezierCurveTo(-145, 15, -115, 130, 0, 155);
  ctx.bezierCurveTo(115, 130, 145, 15, 125, -95);
  ctx.bezierCurveTo(105, -175, -105, -175, -125, -95);
  ctx.closePath();
  ctx.fillStyle = "#E8AD89";
  ctx.fill();

  // Hair
  ctx.beginPath();
  ctx.moveTo(-130, -75);
  ctx.bezierCurveTo(-155, -180, -65, -195, 0, -180);
  ctx.bezierCurveTo(100, -195, 150, -135, 130, -55);
  ctx.bezierCurveTo(95, -100, 45, -115, 10, -135);
  ctx.bezierCurveTo(-35, -100, -80, -85, -130, -75);
  ctx.closePath();
  ctx.fillStyle = "#38251E";
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = "#493027";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(-90, -55);
  ctx.quadraticCurveTo(-55, -75, -25, -55);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(25, -55);
  ctx.quadraticCurveTo(55, -75, 90, -55);
  ctx.stroke();

  // Eyes follow mouse
  const dx = mouse.x - cx;
  const dy = mouse.y - cy;

  const angle = Math.atan2(dy, dx);
  const distance = Math.min(Math.hypot(dx, dy), 300);
  const movement = (distance / 300) * 11;

  const targetX = Math.cos(angle) * movement;
  const targetY = Math.sin(angle) * movement;

  eyeMovement.x += (targetX - eyeMovement.x) * 0.12;
  eyeMovement.y += (targetY - eyeMovement.y) * 0.12;

  drawEye(-55, -15, 33, eyeMovement.x, eyeMovement.y);
  drawEye(55, -15, 33, eyeMovement.x, eyeMovement.y);

  // Nose
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.quadraticCurveTo(-5, 35, -12, 48);
  ctx.quadraticCurveTo(0, 57, 12, 48);
  ctx.strokeStyle = "#BF8063";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.stroke();

  // Cheeks
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#E97878";

  ctx.beginPath();
  ctx.ellipse(-85, 55, 24, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(85, 55, 24, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;

  // Mouth
  if (isSinging) {
    const mouthHeight = 5 + mouthOpen * 32;

    ctx.beginPath();
    ctx.ellipse(
      0,
      85 + mouthOpen * 3,
      22 + mouthOpen * 5,
      mouthHeight,
      0,
      0,
      Math.PI * 2,
    );

    ctx.fillStyle = "#672D32";
    ctx.fill();

    // Tongue
    if (mouthOpen > 0.4) {
      ctx.beginPath();
      ctx.ellipse(
        0,
        85 + mouthOpen * 3 + mouthHeight * 0.55,
        11,
        4 + mouthOpen * 3,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#E98289";
      ctx.fill();
    }
  } else {
    // Normal smile
    ctx.beginPath();
    ctx.moveTo(-40, 78);
    ctx.quadraticCurveTo(0, 110, 40, 78);
    ctx.strokeStyle = "#994E48";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  ctx.restore();
}

function animate() {
  drawFace();
  requestAnimationFrame(animate);
}

animate();
