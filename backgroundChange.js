const heroUrlInputEl = document.getElementById('heroInput');
const backgroundUrlInputEl = document.getElementById('backgroundInput');
const antiHeroUrlInputEl = document.getElementById('antiHeroInput');

const heroImageEl = document.getElementById('hero');
const backgroundImageEl = document.getElementById('background');
const antiHeroImageEl = document.getElementById('anti-hero');

const STORAGE_KEYS = {
  hero: 'app_hero_image',
  background: 'app_background_image',
  antiHero: 'app_anti_hero_image',
};

function isValidImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/* SETTERS WITH VALIDATION + STORAGE */
async function setHero(url) {
  const valid = await isValidImage(url);
  if (!valid) return;

  heroImageEl.src = url;
  localStorage.setItem(STORAGE_KEYS.hero, url);
}

async function setAntiHero(url) {
  const valid = await isValidImage(url);
  if (!valid) return;

  antiHeroImageEl.src = url;
  localStorage.setItem(STORAGE_KEYS.antiHero, url);
}

async function setBackground(url) {
  const valid = await isValidImage(url);
  if (!valid) return;

  backgroundImageEl.src = url;
  localStorage.setItem(STORAGE_KEYS.background, url);
}

/* INPUT EVENTS */
heroUrlInputEl.addEventListener('change', e => {
  setHero(e.target.value);
});

antiHeroUrlInputEl.addEventListener('change', e => {
  setAntiHero(e.target.value);
});

backgroundUrlInputEl.addEventListener('change', e => {
  setBackground(e.target.value);
});

/* LOAD ON START */
window.addEventListener('DOMContentLoaded', async () => {
  const hero = localStorage.getItem(STORAGE_KEYS.hero);
  const bg = localStorage.getItem(STORAGE_KEYS.background);
  const antiHero = localStorage.getItem(STORAGE_KEYS.antiHero);

  if (hero) heroImageEl.src = hero;
  if (bg) backgroundImageEl.src = bg;
  if (antiHero) antiHeroImageEl.src = antiHero;
});
