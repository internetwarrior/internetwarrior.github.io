import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDomRefs } from "./RefContext";

type AppContextType = {
  theme: "light" | "dark";
  setTheme: (v: "light" | "dark") => void;
  isStarted: boolean;
  setIsStarted: (v: boolean) => void;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  isMusicReady: boolean;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicReady, setIsMusicReady] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isStarted, setIsStarted] = useState(false);

  const { hero, background, canvasRef } = useDomRefs();

  let source;

  const VOLUME = 0.15; // 0.2 is defualt ->0.5 -> 1.0
  const VOLUME_BACKGROUN = 0.6;

  let BAR_WIDTH = 0.2;

  const backgroudVolume = VOLUME * VOLUME_BACKGROUN;
  const originalVolume = VOLUME;
  const fadeDuration = 2;

  const body = document.body;

  const colorRef = useRef({
    color_1: 250,
    color_2: 250,
    color_3: 250,
  });

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    colorRef.current.color_1 = r;
    colorRef.current.color_2 = g;
    colorRef.current.color_3 = b;

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }

  useEffect(() => {
    const handleClick = () => {
      console.log("Left-clicked");
      document.body.style.backgroundColor = getRandomColor();
    };

    const handleContextMenu = (event: MouseEvent) => {
      return;
      event.preventDefault();
      canvasRef.current?.classList.toggle("flip-y");
    };

    document.body.addEventListener("click", handleClick);
    document.body.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.body.removeEventListener("click", handleClick);
      document.body.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [isPlaying]);

  function processArrayBuffer(arrayBuffer) {
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = originalVolume;

    audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
      visualize(audioBuffer, audioContext, gainNode);
    });

    // Function to smoothly fade volume to 0
    function fadeToZero() {
      const currentTime = audioContext.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      gainNode.gain.linearRampToValueAtTime(
        backgroudVolume,
        currentTime + fadeDuration,
      );
    }

    // Function to restore volume back to original
    function restoreVolume() {
      const currentTime = audioContext.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      gainNode.gain.linearRampToValueAtTime(
        originalVolume,
        currentTime + fadeDuration,
      );
    }

    // Listen for window focus and blur events
    window.addEventListener("blur", fadeToZero); // When window loses focus, fade to 0
    window.addEventListener("focus", restoreVolume); // When window gains focus, restore volume
  }

  async function loadDefaultAudio() {
    hero.current.style.animation = "none";
    if (isPlaying) return;

    const response = await fetch(`/songs/theme.m4a`);

    const arrayBuffer = await response.arrayBuffer();
    processArrayBuffer(arrayBuffer);
    // IS_PLAYING = true;
  }

  function visualize(audioBuffer, audioContext, gainNode) {
    let canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const frequencyBufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(frequencyBufferLength);

    function animateBassScale() {
      requestAnimationFrame(animateBassScale);

      analyser.getByteFrequencyData(frequencyData);

      let bass = 0;
      const bassRange = 10; // lower frequencies

      for (let i = 0; i < bassRange; i++) {
        bass += frequencyData[i];
      }

      bass /= bassRange;
      bass /= 255;

      const scale = 1 + bass * 0.1; // max +15%
      const heroScale = 1 + bass * 0.2; // max +15%

      body.style.transform = `scale(${scale})`;
      // hero.current.style.transform = `scale(${heroScale})`;
      body.style.transformOrigin = "center center";
    }

    animateBassScale();

    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);

    source.start();
    setIsMusicReady(true);

    source.onended = async () => {
      setIsMusicReady(false);

      currentSongIndex++;

      if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
      }

      const response = await fetch(`./assets/song/${songs[currentSongIndex]}`);
      const arrayBuffer = await response.arrayBuffer();

      processArrayBuffer(arrayBuffer);
    };

    const canvasContext = canvas.getContext("2d");
    const barWidth = canvas.width / frequencyBufferLength;
    const midX = canvas.width / 1;
    const midX_2 = canvas.width / 2;

    function draw() {
      requestAnimationFrame(draw);
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(frequencyData);
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < frequencyBufferLength; i++) {
        const value = frequencyData[i];

        const { color_1, color_2, color_3 } = colorRef.current;

        const color = `rgb(${color_1 + value}, ${color_2}, ${color_3})`;
        canvasContext.fillStyle = color;

        const rightX = midX + i * barWidth - canvas.width / 2;
        canvasContext.fillRect(
          rightX,
          canvas.height - value / 1.2,
          barWidth - BAR_WIDTH,
          value,
        );

        const leftX = midX_2 - i * barWidth;
        canvasContext.fillRect(
          leftX,
          canvas.height - value / 1.2,
          barWidth - BAR_WIDTH,
          value,
        );
      }
    }

    draw();
  }

  const data = {
    loadDefaultAudio,
    isPlaying,
    setIsPlaying,
    isMusicReady,
    theme,
    setTheme,
    isStarted,
    setIsStarted,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
