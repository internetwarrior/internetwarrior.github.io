import { useState, useRef, useEffect } from "react";
import { useApp } from "../app/context/GlobalContext";

type RecordedLine = {
  time: number;
  lines: [string, string];
};

const createPairs = (text: string): [string, string][] => {
  const arr = text.split("\n").filter(Boolean);

  const result: [string, string][] = [];

  for (let i = 0; i < arr.length; i += 2) {
    result.push([arr[i], arr[i + 1] || ""]);
  }

  return result;
};

export default function LyricsRecorder() {
  const { isMusicReady } = useApp();
  const [lyrics, setLyrics] = useState(TheLyrics);

  const [lines, setLines] = useState<[string, string][]>(
    createPairs(TheLyrics),
  );

  const [current, setCurrent] = useState(0);
  const [recorded, setRecorded] = useState<RecordedLine[]>([]);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  const startTime = useRef(0);
  const offset = useRef(0);
  const timer = useRef<number>();

  useEffect(() => {
    if (running) {
      timer.current = window.setInterval(() => {
        setTime(
          Number(
            (
              (performance.now() - startTime.current + offset.current) /
              1000
            ).toFixed(2),
          ),
        );
      }, 50);
    }

    return () => clearInterval(timer.current);
  }, [running]);
  useEffect(() => {
    if (isMusicReady && !running) {
      start();
    }
  }, [isMusicReady, running]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        mark();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [running, current, time]);

  const start = () => {
    setRecorded([]);
    setCurrent(0);
    setTime(0);

    offset.current = 0;
    startTime.current = performance.now();

    setRunning(true);
  };

  const pause = () => {
    offset.current += performance.now() - startTime.current;
    setRunning(false);
  };

  const resume = () => {
    startTime.current = performance.now();
    setRunning(true);
  };

  const mark = () => {
    if (!running || !lines[current]) return;

    setRecorded((prev) => [
      ...prev,
      {
        time,
        lines: lines[current],
      },
    ]);

    setCurrent((v) => v + 1);
  };

  const undo = () => {
    setRecorded((prev) => {
      const copy = [...prev];
      copy.pop();
      return copy;
    });

    setCurrent((v) => Math.max(0, v - 1));
  };

  const exportJSON = async () => {
    const json = JSON.stringify(recorded, null, 2);

    await navigator.clipboard.writeText(json);

    console.log(json);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center text-white">
      <div className="w-[900px] space-y-5">
        <div className="text-5xl text-center font-bold">{time}s</div>

        <textarea
          className="w-full h-40 text-black p-3"
          value={lyrics}
          onChange={(e) => {
            setLyrics(e.target.value);
            setLines(createPairs(e.target.value));
          }}
        />

        <div className="text-center text-4xl min-h-24">
          <div>{lines[current]?.[0]}</div>
          <div>{lines[current]?.[1]}</div>
        </div>

        <div className="flex justify-center gap-3 z-[99999] relative">
          {!running && !time && <button onClick={start}>Start (Enter)</button>}

          {running && <button onClick={pause}>Pause</button>}

          {!running && time > 0 && <button onClick={resume}>Resume</button>}

          <button onClick={mark}>Next (Space)</button>

          <button onClick={undo}>Undo</button>

          <button onClick={exportJSON}>Copy JSON</button>
        </div>

        <div className="h-60 overflow-auto text-sm">
          {recorded.map((item, i) => (
            <div key={i}>
              <div>{item.time}s</div>
              <div>{item.lines[0]}</div>
              <div>{item.lines[1]}</div>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const TheLyrics = `

Да, у меня ветер в голове
Зато я счастливая, а вы — нет
С первого взгляда не влюблюсь
Если обидишь — я сделаю кусь
Ты хотел купить меня, но ты беден
У тебя нет ничего, кроме денег
У меня этих денег самой — дожди
А ты меня жди, жди, жди

Я экспонат, ты мой фанат
Бриллиант на тысячу карат
Носи меня на руках
И я растаю в них, как шоколад
Я экспонат, ты мой фанат
На тысячу карат
Носи меня на руках
И я растаю в них, как шоколад

Уляля, что за киса!
По ней плачет телевизор
Исполняются капризы
Для кого же станет призом
Про неё не сказать и не спеть
Ну нереальная, просто жесть
Трогать нельзя — только смотреть, смотреть

Он сильный — я красивая
Он умный — я красивая
Он пашет — я красивая
И говорит, что я красивая

Я экспонат, ты мой фанат
Бриллиант на тысячу карат
Носи меня на руках
И я растаю в них, как шоколад
Я экспонат, ты мой фанат
На тысячу карат
Носи меня на руках
И я растаю в них, как шоколад

Я растаю, шоколад
Я растаю, шоколад

`;
