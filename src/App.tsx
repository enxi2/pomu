import gsap from "gsap";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import "./App.scss";

import playCircle from "./play_circle_black_24dp.svg";
import usePomus, { MAX_POMUS } from "./usePomus";

type Dimensions = {
  width: number;
  height: number;
};

declare global {
  interface Window {
    POMU: any;
  }
}

window.POMU = {};

export default function App(): JSX.Element {
  const audio = useRef<HTMLAudioElement>(null);
  const main = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const [containerSize, setContainerSize] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const [paused, setPaused] = useState<boolean>(false);
  const [pomus, setPomus] = useState<number>(MAX_POMUS);
  const [shape, setShape] = useState<string>("");
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { pomuElements, pomuTimelines } = usePomus(pomus);

  const play = useCallback((): void => {
    if (audio.current != null) {
      audio.current.play();
      audio.current.volume = 0.3;
    }
  }, []);

  useEffect((): void => {
    setInterval((): void => {
      if (audio.current?.paused) {
        setPaused(true);
      } else {
        setPaused(false);
      }
    }, 250);
  }, []);

  // Track the window size to maintain aspect ratio of the main scene
  useEffect((): (() => void) => {
    let debounce: ReturnType<typeof setTimeout>;
    const handler = (): void => {
      clearTimeout(debounce);
      debounce = setTimeout(
        (): void =>
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          }),
        100
      );
    };

    window.addEventListener("resize", handler);

    return (): void => window.removeEventListener("resize", handler);
  }, []);

  useEffect((): void => {
    // Dummy usage of windowSize to silence the linter
    if (
      main.current != null &&
      windowSize.width >= 0 &&
      windowSize.height >= 0
    ) {
      const mainRatio = main.current.offsetWidth / main.current.offsetHeight;
      if (mainRatio > 16.0 / 9.0) {
        // wide
        setContainerSize({
          width: (main.current.offsetHeight / 9.0) * 16.0,
          height: main.current.offsetHeight,
        });
        setShape("wide");
      } else {
        setContainerSize({
          width: main.current.offsetWidth,
          height: (main.current.offsetWidth / 16.0) * 9.0,
        });
        // narrow
        setShape("narrow");
      }
    }
  }, [windowSize]);

  useEffect(() => {
    const tl = new gsap.core.Timeline();
    for (let i = 0; i < pomuTimelines.length; i++) {
      tl.add(pomuTimelines[i](`#p${i}`), 0);
    }
    window.POMU.timeline = tl;
    return (): void => {
      tl.kill();
    };
  }, [pomuTimelines]);

  return (
    <div className="app">
      <header>
        Pomu Intro Version: {pomus} {/* TODO: change to <select> for mobile */}
        <input
          type="range"
          min={0}
          max={MAX_POMUS}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPomus(parseInt(e.currentTarget.value))
          }
          value={pomus}
        />
        <button>?</button>
      </header>
      <main ref={main} className={shape}>
        {paused ? (
          <img
            src={playCircle}
            alt="play"
            className="play-audio"
            onClick={play}
          />
        ) : null}
        <div
          className="stage"
          ref={stage}
          style={{
            width: `${containerSize.width}px`,
            height: `${containerSize.height}px`,
          }}
        >
          {pomuElements}
        </div>
      </main>
      <audio
        autoPlay={true}
        loop={true}
        src={`${process.env.PUBLIC_URL}/media/sheep.mp3`}
        ref={audio}
      />
    </div>
  );
}
