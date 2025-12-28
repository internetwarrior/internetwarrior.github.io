//The Rome wasn't built in a single day!
const lyrics = document.getElementById("lyrics");

let songLyrics = `

 <pre>
Love, let's talk about love
Is it anything and everything you hoped for?
Or do the feeling haunt you?
I know the feeling haunt you

This may be the night that my dreams might let me know
All the stars approach you
All the stars approach you
All the stars approach you

This may be the night that my dreams might let me know
All the stars are closer
All the stars are closer
All the stars are closer

Tell me what you gon' do to me
Confrontation ain't nothin' new to me
You can bring a bullet, bring a sword, bring a morgue
But you can't bring the truth to me
Fuck you and all your expectations
I don't even want your congratulations
I recognize your false confidence
And calculated promises all in your conversation
I hate people that feel entitled
Look at me crazy 'cause I ain't invite you
Oh, you important?
You the moral to the story? You endorsin'?
Motherfucker, I don't even like you
Corrupt a man's heart with a gift
That's how you find out who you dealin' with
A small percentage who I'm buildin' with
I want the credit if I'm losin' or I'm winnin'
On my momma, that's the realest shit

Love, let's talk about love
Is it anything and everything you hoped for?
Or do the feeling haunt you?
I know the feeling haunt you

This may be the night that my dreams might let me know
All the stars approach you
All the stars approach you
All the stars approach you

This may be the night that my dreams might let me know
All the stars are closer
All the stars are closer
All the stars are closer

Skin covered in ego
Get to talkin', I get involved, like a rebound
No control, no off switch
And the way that you bringin' me down
It's a turn on, get it away from me
Know you mean wrong, keep away from me
And it's all wrong, get it away from me, yeah
I, I just cry for no reason
I just pray for no reason
I just thank for the life, for the day
For the hours and another life breathin'
I did it all 'cause it feel good
You could live it all if you feel bad
Better live your life, we were runnin' out of time

Love, let's talk about love
Is it anything and everything you hoped for?
Or do the feeling haunt you?
I know the feeling haunt you

This may be the night that my dreams might let me know
All the stars approach you
All the stars approach you
All the stars approach you

This may be the night that my dreams might let me know
All the stars are closer
All the stars are closer
All the stars are closer</pre
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

document.addEventListener("keydown", (e) => {
  // debugger;
  if (e.code === "Space" && !e.shiftKey) {
    e.preventDefault();

    if (index >= 0) {
      items[index].style.background = "";
      items[index].style.color = "";
    }

    index = (index + 1) % items.length;
    const current = items[index];

    current.style.background = "white";
    current.style.color = "black";

    current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (e.code === "Space" && e.shiftKey) {
    e.preventDefault();

    if (index >= 0) {
      items[index].style.background = "";
      items[index].style.color = "";
    }

    index = (index - 1 + items.length) % items.length;
    const current = items[index];

    current.style.background = "white";
    current.style.color = "black";

    current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});
