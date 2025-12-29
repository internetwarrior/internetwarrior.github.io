// object-classes -> for the future
class Story {
  constructor(song, songVolume, inverse, hero, antiHero) {
    this.song = song;
    this.songVolume = songVolume;
    this.inverse = inverse;
    this.hero = hero;
    this.antiHero = antiHero;
  }
}

class Hero {
  constructor(speedX, speedY, img) {
    this.heroSpeedX = speedX;
    this.heroSpeedY = speedY;
    this.img = img;
  }
}

class AntiHero extends Hero {}

const hero1 = new Hero("40px", "40px", "https://img.com/img_1");
const antiHero1 = new AntiHero("40px", "40px", "https://img.com/img_2");

const story = new Story(
  "Kendrick Lamar & SZA - All the Stars.mp3",
  0.2,
  false,
  hero1,
  antiHero1
);
