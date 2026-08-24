import React, { useState } from "react";
import SongPlayer from "../../components/SongPlayer";
import StartComponent from "../../components/StartComponent";
import RainEffect from "../../components/RainEffect";
import Hero from "../../components/Hero";
import Background from "../../components/Background";
import AntiHero from "../../components/AntiHero";
import LyricsRecorder from "../../components/LyricsRecord";
import LyricsPlayer from "../../components/LyricsPlayer";
import Header from "../../components/Header";
import EditVideo from "../../components/EditVideo";

function Home() {
  const HERO_IMAGES = [
    "/images/png/hero_v2.png",
    "/images/png/hero.png",
    "/images/png/hero_v3.png",
    "/images/png/hero_v4.png",
    "/images/png/hero_v5.png",
  ];

  const [time, setTime] = useState(0);
  return (
    <div className="bg-wrap">
      <Header />
      {/* <RainEffect /> */}
      <StartComponent />
      {/* <LyricsRecorder /> */}
      <LyricsPlayer />;
      <EditVideo />
      <SongPlayer />
      <Background />
      <Hero className="" images={[HERO_IMAGES[4]]} alt="Hero" />;
      {/* <AntiHero src="/images/png/angel.png" alt="Background" /> */}
      <footer></footer>
    </div>
  );
}

export default Home;
