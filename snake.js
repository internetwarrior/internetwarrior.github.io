// --- Snake ---
const segments = 80;
const snake = [];
const heroParent = hero.parentElement;

for (let i = 0; i < segments; i++) {
  const div = document.createElement("div");
  div.className = "segment";

  heroParent.appendChild(div); // same level as hero

  snake.push({
    el: div,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
}
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let snakeActive = false;

const snakeCheckbox = document.getElementById("violinToggle");

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Toggle snake with V key
document.addEventListener("keydown", (e) => {
  if (e.code === "KeyV") {
    snakeActive = !snakeActive;
    snake.forEach((s) => (s.el.style.opacity = snakeActive ? "1" : "0"));
    snakeCheckbox.checked = snakeActive;
  }
});

// Toggle snake with checkbox
snakeCheckbox.addEventListener("change", () => {
  snakeActive = snakeCheckbox.checked;
  snake.forEach((s) => (s.el.style.opacity = snakeActive ? "1" : "0"));
});

// --- Violin Animation ---
const violinCheckbox = document.getElementById("violinToggle");
let violinActive = false;

violinCheckbox.addEventListener("change", () => {
  violinActive = violinCheckbox.checked;
  // Add your violin animation logic here
  console.log("Violin animation:", violinActive);
});

function animateSnake() {
  let targetX = snakeActive ? mouseX : snake[0].x;
  let targetY = snakeActive ? mouseY : snake[0].y;

  snake.forEach((segment, index) => {
    segment.x += (targetX - segment.x) * 0.3;
    segment.y += (targetY - segment.y) * 0.3;

    segment.el.style.left = segment.x + "px";
    segment.el.style.top = segment.y + "px";

    targetX = segment.x;
    targetY = segment.y;

    const scale = 1 - index / segments;
    segment.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
  });

  requestAnimationFrame(animateSnake);
}

animateSnake();
