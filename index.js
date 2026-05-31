// The Rome wasn't built in a single day
// Warning! This project even has no copyright, all rights is reveiced by Author!
// Please be CAUTIOUS of using this code!
// Thanks for attention! Fork the code, thanks :thumbs-up
// Good luck with yor coding

const VERSION = '0.8.0'; // The begining

let is_started = false;

//Hero settings
const heroParalaxSpeed = {
  x: 80, //px
  y: 10, //px
};

//resource
const THE_QUESTION_MARK_LINK =
  'https://www.youtube.com/watch?v=2Ep6VmdKjGE&list=RD2Ep6VmdKjGE&start_radio=1';

//setting-variables
const VOLUME = 0.15; // 0.2 is defualt ->0.5 -> 1.0
const VOLUME_BACKGROUN = 0.6;

let currentSongIndex = 0;
let source;

// Other Volume Settings.
const backgroudVolume = VOLUME * VOLUME_BACKGROUN;
const originalVolume = VOLUME;
const fadeDuration = 2;

let speed = 40; //30 is default -> 60 -> 40 -> 35

let snowSpeed = 15; //snow-setting 20 is default -> 10 -> 20

const isCanvasFlipped = false;
const isChangeColor = true;
const isDefaultAnimation = false;
const AntiHeroAnimation = false;
const isCanFlip = true;

const COLOR_OBJ = {
  color_1: 250, // Red //250 -> 0 ->250
  color_2: 250, // Green //250 -> 55->47 -> 250
  color_3: 250, // Blue //250 ->255 -> 250
};

let songs = ['MONTAGEM-ALQUIMIA.mp3', 'REVENGE.mp3'];

let song_name = songs.length > 0 ? songs[songs.length - songs.length] : null;
song_name = songs[0];

const bodyElement = document.querySelector('body');
const heroElement = document.getElementById('hero');
const bg = document.getElementById('background');
const hero = document.getElementById('hero');
const antiHero = document.getElementById('anti-hero');
const building = document.getElementById('buildings');
const checkbox = document.querySelector('.anti-hero-checkbox input');

const model = document.getElementById('model');
const swear = document.getElementById('swear');
const backgroundElement = document.getElementById('background');

const healthContainerIndex = document.querySelector('.health-bar');
const targetContainerIndext = document.querySelector('.target');

//letter-settings
let WORD_STORAGE = ['-Привет', '-Как дела?', '-Давай, до свидание'];
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//others
const swearWords = WORD_STORAGE[0]; //"а, ты кто!?";
const UNHOVER_TEXT = 'упс...';

// antiHero.classList.add("hidden");
swear.innerText = swearWords;

const hints = [
  'Победы главного босса!',
  'Нажми на CTRL + на кнопку обновить ↻ для чистки кеша',
  'Не забудь f11 для вайба',
  // song_name,
];

const develoerMode = {
  debug: false,
  mode: false,
  inverse: false,
  devmodeEnterCount: 0,
  develoerModeEnter: 10,
};

if (develoerMode.debug) {
  develoerMode.develoerModeEnter = 0;
}

const inverse = false;
let inverseMouseButtons = develoerMode.inverse;

BAR_WIDTH = 0.2;

IS_PLAYING = false;

IS_FIRST_CLICK = true;

//randomizer <- For the future updates
const getRandomNumberByGivenAttribute = giveNumber => {
  return Math.floor(Math.random() * giveNumber);
};

let interval = 1;

//native-conditions

if (isCanvasFlipped) {
  document.querySelector('#canvas').classList.toggle('flip-y');
}

if (AntiHeroAnimation) {
  checkbox.checked = true;
}

//hint-function

document.querySelector('.hint').innerText =
  hints[Math.floor(Math.random() * hints.length)];

let theLastHint = null;
const HINT_TIMER_TIME = 3_000;

setInterval(() => {
  let theRandomHint = Math.floor(Math.random() * hints.length);
  let theHintElement = document.querySelector('.hint');

  if (theLastHint === theRandomHint) {
    theHintElement.innerText = 'Loading...';
    theLastHint = null;
    console.log('while loading:', theRandomHint);
  } else {
    theHintElement.innerText = hints[theRandomHint];
    theLastHint = theRandomHint;
  }
}, HINT_TIMER_TIME);

//keydowns

document.addEventListener('keydown', e => {
  if (e.key === 'i') {
    // Press 'i' to toggle inverse mode
    inverse = !inverse;
  }
});

// Add an event listener for the 'keydown' event on the document
document.addEventListener('keydown', exitFullScreenOnEscape);

// Function to apply the background color from COLOR_OBJ
function applyBackgroundColor() {
  const rgbColor = `rgb(${COLOR_OBJ.color_1}, ${COLOR_OBJ.color_2}, ${COLOR_OBJ.color_3})`;
  document.body.style.backgroundColor = rgbColor;
}

if (bodyElement) {
  bodyElement.addEventListener('click', function () {
    if (IS_FIRST_CLICK) {
      IS_FIRST_CLICK = false;
      return;
    }

    if (!inverseMouseButtons) {
      console.log('Left-clicked');
      bodyElement.style.backgroundColor = getRandomColor((leftButton = true));
    } else {
      console.log('Right-clicked (inverted)');

      document.querySelector('#canvas').classList.toggle('flip-y');
      bodyElement.style.backgroundColor = getRandomColor((leftButton = true));
    }
  });

  bodyElement.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    if (!inverseMouseButtons) {
      console.log('Right-clicked');
      if (isCanFlip) {
        document.querySelector('#canvas').classList.toggle('flip-y');
      }

      bodyElement.style.backgroundColor = getRandomColor();
    } else {
      console.log('Left-clicked (inverted)');

      return;
      bodyElement.style.backgroundColor = getRandomColor();
    }
  });
}
bodyElement.style.backgroundColor = getRandomColor((leftButton = true));
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
  if (event.key === 'Escape') {
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
  alert('Soon! SETTINGS-BUTTON');
}
document.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  //hero-settings
  if (inverse) {
    // Inverted transformations
    bg.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(0.95)`;
    antiHero.style.transform = `translate(${x * 80}px, ${y * 80}px)`;
    hero.style.transform = `translate(${x * -120}px, ${y * -40}px)`;
    building.style.transform = `translate(${x * 80}px, ${y * 80}px)`; // Parallax for building
  } else {
    // Regular mode transformations
    bg.style.transform = `translate(${x * -30}px, ${y * -30}px) scale(1.05)`;
    hero.style.transform = `translate(${x * heroParalaxSpeed.x}px, ${y * heroParalaxSpeed.y}px)`;
    healthContainerIndex.style.transform = `translate(${x * -5}px, ${y * -5}px)`;

    antiHero.style.transform = `translate(${x * -120}px, ${y * -60}px)`;
    building.style.transform = `translate(${x * 40}px, ${y * 20}px)`; // Parallax for building
  }
});

function processArrayBuffer(arrayBuffer) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = originalVolume;

  audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
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
  window.addEventListener('blur', fadeToZero); // When window loses focus, fade to 0
  window.addEventListener('focus', restoreVolume); // When window gains focus, restore volume
}

// on-start-fucntion
function moveToTop() {
  healthContainerIndex.style.display = 'block';
  is_started = true;

  setTimeout(() => spawnTarget(), 1000);

  const buildings = document.getElementById('buildings');
  buildings.style.transition = `bottom ${'1s'}  ease-in-out`;
  antiHero.style.transition = 'top 2s  ease-in-out'; // Ensure smooth transition
  if (AntiHeroAnimation) {
    antiHero.style.animation = 'floating-2 4000ms infinite ease alternate';
  }
  lyrics.style.opacity = '1';
  if (song_name !== songs[3]) {
    antiHero.style.top = '-5%'; // Move the element to the top
    buildings.style.bottom = '0%'; // Move the element to the top
  } else {
    WORD_STORAGE = wish_to_say_and_get;
    speed = 100;
  } // Ensure smooth transition
}

checkbox.addEventListener('change', () => {
  antiHero.style.animation = checkbox.checked
    ? 'floating-2 4000ms infinite ease alternate'
    : 'none';
  // hero.style.animation = checkbox.checked
  //   ? "floating-2 4000ms infinite ease alternate"
  //   : "none";
});

async function loadDefaultAudio() {
  hero.style.animation = 'none';
  if (IS_PLAYING) return;
  moveToTop();

  model.style.opacity = '1';

  // backgroundElement.style.filter =
  //   'hue-rotate(270deg) saturate(200%) brightness(110%)';

  // heroElement.style.filter =
  //   'hue-rotate(270deg) saturate(200%) brightness(110%)';

  backgroundElement.style.opacity = '0.5';

  swear.style.animation =
    'borderDisappear var( --animation-duration) forwards ease-out';

  const startElement = document.getElementById('start');
  startElement.style.opacity = '0';
  setTimeout(() => (startElement.style.display = 'none'), 300);

  const response = await fetch(`./assets/song/${songs[currentSongIndex]}`);
  // const response = await fetch("./song_2.mp3");
  const arrayBuffer = await response.arrayBuffer();
  processArrayBuffer(arrayBuffer);
  IS_PLAYING = true;
}

document.getElementById('start').addEventListener('click', loadDefaultAudio);

function visualize(audioBuffer, audioContext, gainNode) {
  const canvas = document.getElementById('canvas');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const frequencyBufferLength = analyser.frequencyBinCount;
  const frequencyData = new Uint8Array(frequencyBufferLength);

  source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  source.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination);

  source.start();

  source.onended = async () => {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }

    const response = await fetch(`./assets/song/${songs[currentSongIndex]}`);

    const arrayBuffer = await response.arrayBuffer();

    processArrayBuffer(arrayBuffer);
  };

  const canvasContext = canvas.getContext('2d');
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
        'rgb(' +
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
const el = document.querySelector('.swear');
el.addEventListener('mouseover', event => {
  let iteration = 0;
  let length = 0;
  clearInterval(interval);

  // Start interval to keep changing letters
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split('')
      .map((letter, index) => {
        // Keep replacing the letters with random ones
        return letters[Math.floor(Math.random() * 26)];
      })
      .join(''); // Keep randomizing the text

    // Optionally, you can limit the number of iterations for how many times the text should update
    iteration += 1 / 3 + length;
  }, speed);
});

el.addEventListener('mouseleave', event => {
  clearInterval(interval);
  event.target.innerText =
    WORD_STORAGE[Math.floor(Math.random() * WORD_STORAGE.length)]; // вернуть нормальный текст
});

window.onload = function () {
  var canvas = document.getElementById('canvas-2');
  var ctx = canvas.getContext('2d');

  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  var mp = 80;
  var particles = [];

  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      l: Math.random() * 10 + 10, // length
      xs: -2 + Math.random() * 2, // horizontal speed (wind)
      ys: 8 + Math.random() * 4, // vertical speed
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(173,216,230,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.xs, p.y + p.l);
    }

    ctx.stroke();
    update();
  }

  function update() {
    for (var i = 0; i < mp; i++) {
      var p = particles[i];

      p.x += p.xs;
      p.y += p.ys;

      if (p.y > H) {
        p.y = -20;
        p.x = Math.random() * W;
      }

      if (p.x > W || p.x < 0) {
        p.x = Math.random() * W;
      }
    }
  }

  setInterval(draw, 30);
};

let start = Date.now();
let stayedLongEnough = false;
const intervalCheck = 10_000;

document.getElementById('ytBtn').onclick = () => {
  window.open(getRandomContent(), '_blank');
};
document.querySelectorAll('.version').forEach(el => {
  el.innerText = '(' + VERSION + ')';
});

const lightning = document.querySelector('.lightning');

function createLightning() {
  const bolt = document.createElement('div');

  bolt.classList.add('bolt');

  bolt.style.left = Math.random() * window.innerWidth + 'px';

  const rotate = Math.random() * 40 - 20;
  bolt.style.transform = `rotate(${rotate}deg)`;

  lightning.appendChild(bolt);

  document.body.classList.add('flash');

  setTimeout(() => {
    document.body.classList.remove('flash');
  }, 500);

  setTimeout(() => {
    bolt.remove();
  }, 500);
}

setInterval(
  () => {
    createLightning();
  },
  Math.random() * 4000 + 2000
);
