// The Rome wasn't built in a single day
// Warning! This project even has no copyright, all rights is reveiced by Author!
// Please be CAUTIOUS of using this code!
// Thanks for attention! Fork the code, thanks :thumbs-up
// Good luck with yor coding

const VERSION = "0.7.8.7.2.0"; // The begining

//hero-settings
// const heroPositionBoosterX = 0.8;
// const heroPositionBoosterY = 0.8;

//Hero settings
const heroParalaxSpeed = {
  x: 40, //px
  y: 10, //px
}; // default X position -> 60 px
//default Y position -> 30 px

//resource
const THE_QUESTION_MARK_LINK = "https://www.youtube.com/watch?v=jEDaVHmw7r4";

//setting-variables
const VOLUME = 0.8; // 0.2 is defualt ->0.5 -> 1.0
const VOLUME_BACKGROUN = 0.6;

// Other Volume Settings.
const backgroudVolume = VOLUME * VOLUME_BACKGROUN;
const originalVolume = VOLUME;
const fadeDuration = 2;

let speed = 40; //30 is default -> 60 -> 40 -> 35

//speed-variables
let snowSpeed = 15; //snow-setting 20 is default -> 10 -> 20

//conditional-variables
const isCanvasFlipped = false;
const isChangeColor = true;
const isDefaultAnimation = true;
const AntiHeroAnimation = true;
const isCanFlip = true;

//setting-color
const COLOR_OBJ = {
  color_1: 250, // Red //250 -> 0 ->250
  color_2: 250, // Green //250 -> 55->47 -> 250
  color_3: 250, // Blue //250 ->255 -> 250
};

// default X position -> 60 px
//default Y position -> 60 px

//Anti-hero settings

//theme-song-settings
let songs = [
  "MONTAGEM RUGADA.m4a",
  "Odnogo Tatyana Kurtukova.mp3",
  // "MONTAGEM XONADA.m4a",
  // "MVSTERIOUS, bear bear  friends  VILLAGE FUNK.m4a",
  // "MVSTERIOUS, Hxmr, yngastrobeatz, EVO  SLAVA FUNK.mp3",
];

let song_name = songs.length > 0 ? songs[songs.length - songs.length] : null;
song_name = songs[0];

//imported elements
const bodyElement = document.querySelector("body");
const heroElement = document.getElementById("hero");
const bg = document.getElementById("background");
const hero = document.getElementById("hero");
const antiHero = document.getElementById("anti-hero");
const building = document.getElementById("buildings");
const checkbox = document.querySelector(".anti-hero-checkbox input");

const model = document.getElementById("model");
const swear = document.getElementById("swear");
const backgroundElement = document.getElementById("background");

//letter-settings
let WORD_STORAGE = ["#Thinkin'", "#Working", "#Thinking..."];
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//others
const swearWords = WORD_STORAGE[0]; //"а, ты кто!?";
const UNHOVER_TEXT = "упс...";

// antiHero.classList.add("hidden");
swear.innerText = swearWords;

const hints = [
  "Нажми на CTRL + на кнопку обновить ↻ для чистки кеша",
  "Не забудь f11 для вайба",
  // song_name,
];

const develoerMode = {
  debug: false,
  mode: false,
  inverse: false,
  devmodeEnterCount: 0,
  develoerModeEnter: 10,
}; // voice_down: false, <- for the future.

if (develoerMode.debug) {
  develoerMode.develoerModeEnter = 0;
}

// //Days left 'till new breath
// function daysLeftUntilFeb7_2026() {
//   const today = new Date();
//   const targetDate = new Date(2026, 1, 7); // Month is 0-based (1 = February)

//   // Remove time portion to avoid partial-day issues
//   today.setHours(0, 0, 0, 0);
//   targetDate.setHours(0, 0, 0, 0);

//   const msPerDay = 1000 * 60 * 60 * 24;
//   const diffInMs = targetDate - today;
//   const result = Math.ceil(diffInMs / msPerDay);
//   return NaN;
// }

//const startDelay = 3; for the future!
const inverse = false;
let inverseMouseButtons = develoerMode.inverse;

BAR_WIDTH = 0.2;

IS_PLAYING = false;

IS_FIRST_CLICK = true;

//randomizer <- For the future updates
const getRandomNumberByGivenAttribute = (giveNumber) => {
  return Math.floor(Math.random() * giveNumber);
};

let interval = 1;

//native-conditions

if (isCanvasFlipped) {
  document.querySelector("#canvas").classList.toggle("flip-y");
}

if (AntiHeroAnimation) {
  checkbox.checked = true;
}

//hint-function

document.querySelector(".hint").innerText =
  hints[Math.floor(Math.random() * hints.length)];

let theLastHint = null;
const HINT_TIMER_TIME = 3_000;

setInterval(() => {
  let theRandomHint = Math.floor(Math.random() * hints.length);
  let theHintElement = document.querySelector(".hint");

  if (theLastHint === theRandomHint) {
    theHintElement.innerText = "Loading...";
    theLastHint = null;
    console.log("while loading:", theRandomHint);
  } else {
    theHintElement.innerText = hints[theRandomHint];
    theLastHint = theRandomHint;
  }
}, HINT_TIMER_TIME);

//keydowns

document.addEventListener("keydown", (e) => {
  if (e.key === "i") {
    // Press 'i' to toggle inverse mode
    inverse = !inverse;
  }
});

// Add an event listener for the 'keydown' event on the document
document.addEventListener("keydown", exitFullScreenOnEscape);

// Function to apply the background color from COLOR_OBJ
function applyBackgroundColor() {
  const rgbColor = `rgb(${COLOR_OBJ.color_1}, ${COLOR_OBJ.color_2}, ${COLOR_OBJ.color_3})`;
  document.body.style.backgroundColor = rgbColor;
}

if (bodyElement) {
  bodyElement.addEventListener("click", function () {
    if (IS_FIRST_CLICK) {
      IS_FIRST_CLICK = false;
      return;
    }

    if (!inverseMouseButtons) {
      console.log("Left-clicked");
      bodyElement.style.backgroundColor = getRandomColor((leftButton = true));
    } else {
      console.log("Right-clicked (inverted)");

      document.querySelector("#canvas").classList.toggle("flip-y");
      bodyElement.style.backgroundColor = getRandomColor((leftButton = true));
    }
  });

  bodyElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();

    if (!inverseMouseButtons) {
      console.log("Right-clicked");
      if (isCanFlip) {
        document.querySelector("#canvas").classList.toggle("flip-y");
      }

      bodyElement.style.backgroundColor = getRandomColor();
    } else {
      console.log("Left-clicked (inverted)");

      return;
      bodyElement.style.backgroundColor = getRandomColor();
    }
  });
}

// Function to generate a random color
function getRandomColor(leftButton = false) {
  if (!isChangeColor) {
    return;
  }
  if (!leftButton) {
    return;
  }
  COLOR_OBJ.color_1 = Math.floor(Math.random() * 256); // Random number between 0 and 255
  COLOR_OBJ.color_2 = Math.floor(Math.random() * 256); // Random number between 0 and 255
  COLOR_OBJ.color_3 = Math.floor(Math.random() * 256); // Random number between 0 and 255
}

function getRandomContent() {
  return THE_QUESTION_MARK_LINK;
}

function exitFullScreenOnEscape(event) {
  if (event.key === "Escape") {
    // Check if the document is currently in full-screen mode
    if (document.fullscreenElement) {
      // Exit full screen if it's active
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  }
}

function settingsButton() {
  alert("Soon! SETTINGS-BUTTON");
}
document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  //hero-settings
  if (inverse) {
    // Inverted transformations
    bg.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(0.95)`;
    antiHero.style.transform = `translate(${x * 80}px, ${y * 80}px)`;
    hero.style.transform = `translate(${x * -120}px, ${y * -40}px)`;
    building.style.transform = `translate(${x * -50}px, ${y * -50}px)`; // Parallax for building
  } else {
    // Regular mode transformations
    bg.style.transform = `translate(${x * -30}px, ${y * -30}px) scale(1.05)`;
    hero.style.transform = `translate(${x * heroParalaxSpeed.x}px, ${
      y * heroParalaxSpeed.y
    }px)`;

    antiHero.style.transform = `translate(${x * -30}px, ${y * 10}px)`;
    building.style.transform = `translate(${x * 40}px, ${y * 20}px)`; // Parallax for building
  }
});

function processArrayBuffer(arrayBuffer) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = originalVolume;

  audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
    visualize(audioBuffer, audioContext, gainNode);
  });

  // Function to smoothly fade volume to 0
  function fadeToZero() {
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
    gainNode.gain.linearRampToValueAtTime(
      backgroudVolume,
      currentTime + fadeDuration
    );
  }

  // Function to restore volume back to original
  function restoreVolume() {
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
    gainNode.gain.linearRampToValueAtTime(
      originalVolume,
      currentTime + fadeDuration
    );
  }

  // Listen for window focus and blur events
  window.addEventListener("blur", fadeToZero); // When window loses focus, fade to 0
  window.addEventListener("focus", restoreVolume); // When window gains focus, restore volume
}

// on-start-fucntion
function moveToTop() {
  const buildings = document.getElementById("buildings");
  buildings.style.transition = `bottom ${"1s"}  ease-in-out`;
  antiHero.style.transition = "top 2s  ease-in-out"; // Ensure smooth transition
  if (AntiHeroAnimation) {
    antiHero.style.animation = "floating-2 4000ms infinite ease alternate";
  }
  lyrics.style.opacity = "1";
  if (song_name !== songs[3]) {
    antiHero.style.top = "-5%"; // Move the element to the top
    buildings.style.bottom = "0%"; // Move the element to the top
  } else {
    WORD_STORAGE = wish_to_say_and_get;
    speed = 100;
  } // Ensure smooth transition
}

checkbox.addEventListener("change", () => {
  antiHero.style.animation = checkbox.checked
    ? "floating-2 4000ms infinite ease alternate"
    : "none";
  // hero.style.animation = checkbox.checked
  //   ? "floating-2 4000ms infinite ease alternate"
  //   : "none";
});

async function loadDefaultAudio() {
  hero.style.animation = "none";
  if (IS_PLAYING) return;
  moveToTop();

  model.style.opacity = "1";

  // backgroundElement.style.filter =
  //   "hue-rotate(270deg) saturate(200%) brightness(110%)";

  // heroElement.style.filter =
  //   "hue-rotate(270deg) saturate(200%) brightness(110%)";

  backgroundElement.style.opacity = "0.5";

  swear.style.animation =
    "borderDisappear var( --animation-duration) forwards ease-out";

  const startElement = document.getElementById("start");
  startElement.style.opacity = "0";
  setTimeout(() => (startElement.style.display = "none"), 300);

  const response = await fetch(`./assets/song/${song_name}`);
  // const response = await fetch("./song_2.mp3");
  const arrayBuffer = await response.arrayBuffer();
  processArrayBuffer(arrayBuffer);
  IS_PLAYING = true;
}

document.getElementById("start").addEventListener("click", loadDefaultAudio);

function visualize(audioBuffer, audioContext, gainNode) {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const frequencyBufferLength = analyser.frequencyBinCount;
  const frequencyData = new Uint8Array(frequencyBufferLength);

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  source.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination);

  source.start();

  const canvasContext = canvas.getContext("2d");
  const barWidth = canvas.width / frequencyBufferLength;
  const midX = canvas.width / 1;
  const midX_2 = canvas.width / 2;

  function draw() {
    requestAnimationFrame(draw);
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < frequencyBufferLength; i++) {
      const value = frequencyData[i];

      const color =
        "rgb(" +
        (COLOR_OBJ.color_1 + value) +
        `,${COLOR_OBJ.color_2}, ${COLOR_OBJ.color_3})`;

      canvasContext.fillStyle = color;

      const rightX = midX + i * barWidth - canvas.width / 2;
      canvasContext.fillRect(
        rightX,
        canvas.height - value / 1.2,
        barWidth - BAR_WIDTH,
        value
      );

      const leftX = midX_2 - i * barWidth;
      canvasContext.fillRect(
        leftX,
        canvas.height - value / 1.2,
        barWidth - BAR_WIDTH,
        value
      );
    }
  }

  draw();
}

//argument-function
const el = document.querySelector(".swear");
el.addEventListener("mouseover", (event) => {
  let iteration = 0;
  let length = 0;
  clearInterval(interval);

  // Start interval to keep changing letters
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        // Keep replacing the letters with random ones
        return letters[Math.floor(Math.random() * 26)];
      })
      .join(""); // Keep randomizing the text

    // Optionally, you can limit the number of iterations for how many times the text should update
    iteration += 1 / 3 + length;
  }, speed);
});

el.addEventListener("mouseleave", (event) => {
  clearInterval(interval);
  event.target.innerText =
    WORD_STORAGE[Math.floor(Math.random() * WORD_STORAGE.length)]; // вернуть нормальный текст
});

// --- SNOW FALLING EFFECT
window.onload = function () {
  var canvas = document.getElementById("canvas-2");
  var ctx = canvas.getContext("2d");

  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  var mp = 50; // number of particles
  var particles = [];

  // Create particles and give them a random initial direction (dir)
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, // random initial horizontal position
      y: Math.random() * H, // random initial vertical position
      r: Math.random() * 4 + 1, // random radius size
      d: Math.random() * mp, // random dispersion
      dir: (Math.random() - 0.5) * 2, // random direction, -1 or 1
    });
  }

  var angle = 0;
  var mouseX = W / 2; // Default mouseX position

  // Listen for mouse movement to track the mouseX position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255, 255, 255, 1)"; // Snowflake color
    ctx.beginPath();

    // Draw each snowflake (particle)
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();

    update();
  }

  function update() {
    angle += 0.01; // Change angle for vertical movement
    for (var i = 0; i < mp; i++) {
      var p = particles[i];

      // Horizontal movement influenced by mouse position
      var dir = (mouseX - p.x) * 0.002 + p.dir * 0.2; // p.dir is the random direction of the snowflake
      p.x += dir;

      // Vertical movement (falling effect)
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;

      // Reset particles when they move off-screen
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          particles[i] = {
            x: Math.random() * W,
            y: -10,
            r: p.r,
            d: p.d,
            dir: (Math.random() - 0.5) * 2,
          }; // Reset with new direction
        } else {
          if (dir > 0) {
            particles[i] = {
              x: -5,
              y: Math.random() * H,
              r: p.r,
              d: p.d,
              dir: (Math.random() - 0.5) * 2,
            }; // New direction when resetting
          } else {
            particles[i] = {
              x: W + 5,
              y: Math.random() * H,
              r: p.r,
              d: p.d,
              dir: (Math.random() - 0.5) * 2,
            }; // New direction when resetting
          }
        }
      }
    }
  }

  // Start the animation loop
  setInterval(draw, snowSpeed); // Redraw every 33ms
};

let start = Date.now();
let stayedLongEnough = false;
const intervalCheck = 10_000;

document.getElementById("ytBtn").onclick = () => {
  window.open(getRandomContent(), "_blank");
};
document.querySelectorAll(".version").forEach((el) => {
  el.innerText = "(" + VERSION + ")";
});
