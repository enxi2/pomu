import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import InfoModal from "./InfoModal";
import Header from "./Header";
import * as PomuSerdes from "./PomuSerdes";
import { PomuBackground } from "./pomus/catalog";
import { PomuItem } from "./usePomuItems";
import ReadonlyStage from "./ReadonlyStage";

import styles from "./Editor.module.scss";

export default function Viewer() {
  const params = useParams();

  const audio = useRef<HTMLAudioElement>(null);
  const main = useRef<HTMLDivElement>(null);

  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.2);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  const [background, setBackground] = useState<PomuBackground>(
    PomuBackground.CLASSIC
  );
  const [items, setItems] = useState<PomuItem[]>([]);

  useEffect(() => {
    try {
      const { background, items } = PomuSerdes.deserialize(params["*"] ?? "");
      setBackground(background);
      setItems(items);
    } catch (err) {
      // TODO show error
    }
  }, [params]);

  const playAudio = useCallback((): void => {
    if (audio.current != null) {
      audio.current.play();
      setAudioPlaying(true);
    }
  }, []);

  const pauseAudio = useCallback((): void => {
    if (audio.current != null) {
      audio.current.pause();
      setAudioPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (audio.current != null) {
      audio.current.volume = audioVolume;
    }
  }, [audioVolume]);

  useEffect((): void => {
    setInterval((): void => {
      if (audio.current?.paused) {
        setAudioPlaying(false);
      } else {
        setAudioPlaying(true);
      }
    }, 250);
  }, []);

  return (
    <div className={styles.editor}>
      <header>
        <Header
          audioPlaying={audioPlaying}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          audioVolume={audioVolume}
          setAudioVolume={setAudioVolume}
          setInfoModalOpen={setInfoModalOpen}
        />
      </header>
      <main ref={main}>
        <div className={styles.stage}>
          <ReadonlyStage background={background} items={items} />
        </div>
      </main>
      <audio
        autoPlay={true}
        loop={true}
        src={`${process.env.PUBLIC_URL}/media/sheep.mp3`}
        ref={audio}
      />
      <InfoModal isOpen={infoModalOpen} setIsOpen={setInfoModalOpen} />
    </div>
  );
}
