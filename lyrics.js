//The Rome wasn't built in a single day!
const lyrics = document.getElementById("lyrics");

const isLyricsNeeded = false;

// lyrics-settings

if (!isLyricsNeeded) {
  lyrics.classList.add("hidden");
}

const MELODY_SYMBOL = " ♪ ";

let songLyrics = `

 <pre>
 
 
 
 </pre
      >
`;

lyrics.innerHTML = songLyrics;

function preToList(preElement) {
  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";
  ul.style.margin = "0";

  preElement.innerText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    });

  preElement.replaceWith(ul);
  return ul;
}
const pre = lyrics.querySelector("pre");
const ul = preToList(pre);

const items = [...ul.querySelectorAll("li")];
let index = -1;

// Define the class that adds the melody symbols
const MELODY_CLASS = "melody-highlight";

document.addEventListener("keydown", (e) => {
  // Move to the next item
  if (e.code === "Space" && !e.shiftKey) {
    e.preventDefault();

    // Clear the class from the previous item
    if (index >= 0) {
      items[index].classList.remove(MELODY_CLASS);
    }

    // Move to the next item
    index = (index + 1) % items.length;
    const current = items[index];

    // Add the melody class to the current item
    current.classList.add(MELODY_CLASS);

    // Scroll the current item into view
    current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Move to the previous item
  if (e.code === "Space" && e.shiftKey) {
    e.preventDefault();

    // Clear the class from the previous item
    if (index >= 0) {
      items[index].classList.remove(MELODY_CLASS);
    }

    // Move to the previous item
    index = (index - 1 + items.length) % items.length;
    const current = items[index];

    // Add the melody class to the current item
    current.classList.add(MELODY_CLASS);

    // Scroll the current item into view
    current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});
