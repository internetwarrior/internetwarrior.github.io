const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval;
const el = document.querySelector(".swear");

// Ensure data-value exists, if not, set a default
el.addEventListener("mouseover", (event) => {
  clearInterval(interval); // Clear any previous letter shuffling

  // Get a random new tip from WORD_STORAGE each time the user hovers
  const randomTip =
    WORD_STORAGE[Math.floor(Math.random() * WORD_STORAGE.length)];

  // Set this random tip as the element's text
  event.target.innerText = randomTip;
  event.target.dataset.value = randomTip; // Update the data-value for consistency
});

el.addEventListener("mouseleave", (event) => {
  let iteration = 0;
  let state = false;

  // Ensure there's a fallback for data-value on mouse leave
  const value = event.target.dataset.value || "Default Tip"; // Fallback to "Default Tip"

  // Start letter-changing effect when mouse leaves
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return value[index];
        }
        return letters[Math.floor(Math.random() * 26)]; // Random letters
      })
      .join("");

    if (iteration >= value.length) {
      clearInterval(interval); // Stop when the original text is reached
    }

    iteration += 1 / 3; // Adjust the speed of the letter change
  }, speed);
});

// Make sure to set an initial value for the element
el.innerText = WORD_STORAGE[Math.floor(Math.random() * WORD_STORAGE.length)];

WORD_STORAGE = [
  "#THINK",
  "#WORK",
  "#UPGRADE",
  "#NOTCH",
  "#LOOSE",
  "#SAMEAGAIN",
  "#GETBACK",
  "#KNOWLEDGE",
  "#LIMITS",
  "#BECAREFUL",
  "#IMPROVE",
  "#JUSTMAKEITDONE",
  "#BEAFRAID",
  "#DON'T MISTAKE",
  "#PERFECT",
  "#THINKFAST",
  "#GIVE_UP",
  "#DON'T_UP",
];

// Function to change the color to red after 20 seconds
function changeColorAfterDelay() {
  setTimeout(() => {
    // Change the COLOR_OBJ values to red (in case they're changed later)
    COLOR_OBJ.color_1 = 255; // Red
    COLOR_OBJ.color_2 = 255; // Green
    COLOR_OBJ.color_2 = 0; // Blue

    // Apply the red color
    applyBackgroundColor();
  }, 10000); // 20000 milliseconds = 20 seconds
}

// Call the function to start the timer
changeColorAfterDelay();

// return `rgb(${r}, ${g}, ${b})`;

// WORD_STORAGE = ["the S-Shield is", 'symbol for "hope"'];
// WORD_STORAGE = [
//   undefined,
//   NaN,
//   "error",
//   daysLeftTill2026((state = true)),
//   "777",
// ];

// lyrics.addEventListener("wheel", (e) => {
//   e.preventDefault();
//   // Reduce scroll by 50%
//   lyrics.scrollTop += e.deltaY * 0.4;
// });

//lyrics-functions

// lyrics.addEventListener("mousedown", (e) => {
//   if (e.button !== 0) return;

//   if (index >= 0) {
//     items[index].style.background = "";
//     items[index].style.color = "";
//   }

//   index = (index + 1) % items.length;
//   const current = items[index];

//   current.style.background = "white";

//   current.style.color = "black";

//   current.scrollIntoView({
//     behavior: "smooth",
//     block: "start",
//   });
// });

let WORD_STORAGE = [
  // "-Привет",
  // "Как делишки?",
  // "-А, меня зовут... 😊",
  // "#You-Dirty-Bustered!😆",
  daysLeftTill2026(),
];

const wish_to_say_and_get = [
  "Привет...",
  "Как дела?",
  "Как твои родители?",
  "-Привет",
  "-Хорошо, спасибо.",
  // "Пошла на хуй!",
  "-Прости за все боли 😕",
];

let WORD_STORAGE = [
  // "-Привет",
  // "Как делишки?",
  // "-А, меня зовут... 😊",
  // "#You-Dirty-Bustered!😆",
  daysLeftTill2026(),
];

// "-Привет",
// "Как делишки?",
// "-А, меня зовут... 😊",
// "#You-Dirty-Bustered!😆",

// // check every 30 sec and save time spent
// setInterval(() => {
//   const spent = Math.floor((Date.now() - start) / 1000);
//   if (spent >= 1) stayedLongEnough = true;
// }, intervalCheck);

// if (!stayedLongEnough) {
//   alert("Откроется через 10 секунд.");
//   return;
// }

// document.addEventListener("keydown", (e) => {
//   const key = Number(e.key);
//   if (key >= 1 && key <= songs.length) {
//     if (develoerMode.devmodeEnterCount >= develoerMode.develoerModeEnter) {
//       song_name = songs[key - 1];
//       console.log("Selected:", song_name);
//       develoerMode.inverse = true;
//       develoerMode.mode = true;
//       alert(
//         "Alert! Developer mode is activated! <- Try not over use it! Song changed to:" +
//           song_name
//       );
//     }
//     if (develoerMode.devmodeEnterCount == develoerMode.develoerModeEnter - 3) {
//       alert(`После дополнительных 3-попыток, у вас будет developer-mode.`);
//       develoerMode.devmodeEnterCount += 1;
//     } else {
//       develoerMode.devmodeEnterCount += 1;
//       console.warn(
//         "DEVELOPER-MODE-IS-BEING-ACTIVATED! Attempt: " +
//           develoerMode.devmodeEnterCount +
//           "/" +
//           develoerMode.develoerModeEnter
//       );
//     }
//   }
// }); // <- Developer mode! Try don't over use it mother-father!
