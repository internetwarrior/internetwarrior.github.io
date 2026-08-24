import React, { useEffect, useState } from "react";
import { useApp } from "../app/context/GlobalContext";
import TheLyrics from "./Lyrics.json";

type Lyric = {
  time: number;
  lines: [string, string];
};

export default function LyricsPlayer() {
  const [hoverEffect, setHoverEffect] = useState(true);
  const { isMusicReady } = useApp();

  const lyrics = TheLyrics as Lyric[];

  const [time, setTime] = useState(0);
  const [active, setActive] = useState<Lyric | null>(lyrics[0]);

  const toggleHoverEffect = () => {
    setHoverEffect((prev) => !prev);
  };

  useEffect(() => {
    if (!isMusicReady) return;

    const timer = setInterval(() => {
      setTime((prev) => Number((prev + 0.1).toFixed(2)));
    }, 100);

    return () => clearInterval(timer);
  }, [isMusicReady]);

  useEffect(() => {
    const current = lyrics.find((item) => time <= item.time);

    setActive(current || null);
  }, [time]);

  if (!isMusicReady) return null;

  if (!hoverEffect)
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center ">
        <button
          className="bg-transparent text-white font-semibold !p-2 opacity-10 hover:opacity-100 transition-opacity duration-500"
          onClick={toggleHoverEffect}
        >
          Включить Hover Effect
        </button>
        <div className="text-center text-white text-5xl font-bold drop-shadow-lg pointer-events-none">
          <div>{active?.lines[0]}</div>
          <div>{active?.lines[1]}</div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center ">
      <button
        className="bg-transparent text-white font-semibold !p-2 opacity-10 hover:opacity-100 transition-opacity duration-500"
        onClick={toggleHoverEffect}
      >
        Отключить Hover Effect
      </button>
      <div className="text-center text-white text-5xl font-bold drop-shadow-lg">
        <div>
          {active?.lines[0]?.split(" ").map((word, i, arr) => (
            <React.Fragment key={i}>
              <span className="hover:bg-black transition-colors">{word}</span>
              {i < arr.length - 1 && " "}
            </React.Fragment>
          ))}
        </div>{" "}
        <div>
          {active?.lines[1]?.split(" ").map((word, i, arr) => (
            <React.Fragment key={i}>
              <span className="hover:bg-black transition-colors">{word}</span>
              {i < arr.length - 1 && " "}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
