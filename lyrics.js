//The Rome wasn't built in a single day!
const lyrics = document.getElementById("lyrics");

const isLyricsNeeded = true;

// lyrics-settings

if (!isLyricsNeeded) {
  lyrics.classList.add("hidden");
}

const MELODY_SYMBOL = " ♪ ";

let songLyrics = `

 <pre>I don't want a lot for Christmas,
there is just one thing I need.
I don't care about the presents
underneath the Christmas tree.
I just want you for my own,
more than you will ever know.
Make my wish come true!


All I want for Christmas is you.
Yeah!

I don't want a lot for Christmas,
there is just one thing I need.
Don't care about those presents underneath the Christmas tree.
I don't need to hang my stocking there upon the fireplace.
Santa Claus won't make me happy with a toy on Christmas day,
I just want you for my own, more than you could ever know.
Make my wish come true,

all I want for Christmas is you!
Ooh, baby.

I won't ask for much this Christmas, I won't even wish for snow.
I'm just gonna keep on waiting
underneath the mistletoe.
I won't make a list and send it to the North Pole for St. Nick.
I won't even stay up late to hear those magical reindeers click.
I just want you here tonight, holdin' on to me so tight!
What more can I do?

All I want for Christmas is you!

Wow, all the lights are shining so brightly everywhere,
and the sound of children's laughter fills the air,
and everyone is singing!
I hear those sleigh bells ringing...
Santa won't you bring me the one I really need, won't you please bring my baby to me?

Oh, I don't want a lot for Christmas,
this is all I'm askin' for.
I just wanna see my baby standin' right outside my door.
I just want you for my own, more than you could ever know.
Make my wish come true,

all I want for Christmas...

is you!
You!
Oh, oh, oh-oh oh-oh-oh.
Wow-oh, oh, oh-oh-oh.
Ooh-ooh, oh...</pre
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
