import React, { useEffect, useRef, useState } from "react";
import { useDomRefs } from "../app/context/RefContext";
import { useApp } from "../app/context/GlobalContext";

function StartComponent() {
  const appVersion = "0.8.0";
  const [visible, setVisible] = useState(true);
  const { setIsPlaying, loadDefaultAudio, setIsStarted } = useApp();

  const heroParalaxSpeed = {
    x: 80, //px
    y: 10, //px
  };

  const { hero, background, antiHero } = useDomRefs();

  const hintRef = useRef(null);
  const hints = [
    "Нажми на ПКМ для смены героя",
    "Победите главного босса!",
    "Нажми на CTRL + на кнопку обновить ↻ для чистки кеша",
    "Не забудь f11 для вайба",
    // song_name,
  ];

  function onStart() {
    setVisible(false);
    setIsPlaying(true);
    setIsStarted(true);

    loadDefaultAudio();

    background.current.style.opacity = "0.5";
    antiHero.current.style.transition = "top 2s  ease-in-out"; // Ensure smooth transition
    antiHero.current.style.top = "0%";
  }

  useEffect(() => {
    if (visible) return;

    if (!background || !hero || !antiHero) return;

    function onMouseMove(e) {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      hero.current.style.transform = `translate(${x * heroParalaxSpeed.x}px, ${y * heroParalaxSpeed.y}px)`;
      // healthContainerIndex.style.transform = `translate(${x * -5}px, ${y * -5}px)`;

      background.current.style.transform = `translate(${x * -30}px, ${y * -30}px) scale(1.05)`;

      antiHero.current.style.transform = `translate(${x * -120}px, ${y * -60}px)`;
      // building.current.style.transform = `translate(${x * 40}px, ${y * 20}px)`; // Parallax for building
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [visible]);

  useEffect(() => {
    if (!background) return;

    function onMouseMove(e) {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      background.current.style.transform = `
      translate(${x * -30}px, ${y * -30}px)
      scale(1.05)
    `;
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    hintRef.innerText = hints[Math.floor(Math.random() * hints.length)];

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
  }, []);

  if (!visible) return null;

  return (
    <div
      style={!visible ? { opacity: 0 } : undefined}
      className="fixed w-full h-full bg-black/80 flex justify-center items-center transition-opacity duration-300 ease-in-out z-110"
    >
      <div
        onClick={onStart}
        className="p-10 rounded-2xl cursor-pointer font-bold text-white flex flex-col items-center justify-center"
      >
        <div className=" text-base text-center text-[#848484]!">
          Подсказка:{" "}
          <small>
            <span className="hint" ref={hintRef}></span>
          </small>
        </div>

        <p className="text-[32px]">нажми, чтобы начать...</p>
        <small className="!text-[rgb(132,132,132)] text-center text-[10px]">
          +16 Warning! Это чисто сугубо креативность автора! build:
          <span className="version"></span>
        </small>
        <div id="news">
          <small>
            <br />
            <span className="text-[16px]">
              <b>
                {" "}
                Что нового <span>({appVersion})</span>?
              </b>
            </span>
            - Кнопка <b>Анимация</b> даёт анти-героям фиксированную анимацию и
            позицию.
            <br />
            <br />
          </small>
        </div>

        <br />
      </div>
    </div>
  );
}

export default StartComponent;
