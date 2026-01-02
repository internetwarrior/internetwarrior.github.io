//New_year settings

const songs = [
  "Somewhere in My Memory, Home Alone, John Williams.mp3",
  "Kendrick Lamar  SZA - All the Stars.mp3",
  "MVSTERIOUS, bear bear  friends  VILLAGE FUNK.m4a",
  "Smash Mouth - All Star.mp3",
  "MrMoMMusic - Phao  2 Phut Hon KAIZ Remix  Animatio.mp3",
  "Odnogo Tatyana Kurtukova.mp3",
  "EMIN - Kamin Lyric Video.mp3",
  "Natali - O Bozhe Kakoj Muzhchina.mp3",
];

document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  if (inverse) {
    // Inverted transformations
    bg.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(0.95)`;
    antiHero.style.transform = `translate(${x * 80}px, ${y * 80}px)`;
    hero.style.transform = `translate(${x * -120}px, ${y * -40}px)`;
    building.style.transform = `translate(${x * -50}px, ${y * -50}px)`; // Parallax for building
  } else {
    // Normal transformations
    bg.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(1.05)`;
    antiHero.style.transform = `translate(${x * -10}px, ${y * -20}px)`;
    hero.style.transform = `translate(${x * -40}px, ${y * 20}px)`;
    building.style.transform = `translate(${x * 40}px, ${y * 20}px)`; // Parallax for building
  }
});

function daysLeftTill2026(state = false) {
  const now = new Date();
  const newYear = new Date("2026-01-01T00:00:00");
  const diff = newYear - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (state) {
    return `Осталось ${days} дней до НГ!`;
  }
  return `Осталось ${days} дня до НГ `; //🥳;
}
