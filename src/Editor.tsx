import { useCallback, useEffect, useRef, useState } from "react";

import Header from "./Header";
import InfoModal from "./InfoModal";
import ShareModal from "./ShareModal";
import Stage from "./Stage";
import Toolbox from "./Toolbox";
import usePomuEditor from "./usePomuEditor";
import usePomuItems from "./usePomuItems";
import usePomuSettings from "./usePomuSettings";
import usePomuToolbox from "./usePomuToolbox";

import styles from "./Editor.module.scss";

declare global {
  interface Window {
    POMU: any;
  }
}

window.POMU = {};

export default function Editor(): JSX.Element {
  const audio = useRef<HTMLAudioElement>(null);

  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.2);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);

  const editorRef = useRef<HTMLDivElement>(null);

  const { background, setBackground, snap, setSnap } = usePomuSettings();
  const { itemsRef, availableItems, addItem, editItem, deleteItem, clearAll } =
    usePomuItems();
  const {
    onDragStart: onDragStartToolbox,
    onDragMove: onDragMoveToolbox,
    onDragStop: onDragStopToolbox,
    tempItemRef,
  } = usePomuToolbox(editorRef, addItem);
  const { onEditStart, onEditMove, onEditEnd, onEditStop, editActionRef } =
    usePomuEditor(editorRef, itemsRef, editItem, snap);

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
    <div
      className={styles.editor}
      onPointerMove={(e) => {
        onDragMoveToolbox(e);
        onEditMove(e);
      }}
      onPointerUp={(e) => {
        onDragStopToolbox(e);
        onEditEnd(e);
      }}
      onPointerLeave={(e) => {
        onDragStopToolbox(e);
        onEditEnd(e);
      }}
    >
      <header>
        <Header
          audioPlaying={audioPlaying}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          audioVolume={audioVolume}
          setAudioVolume={setAudioVolume}
          setInfoModalOpen={setInfoModalOpen}
          setShareModalOpen={setShareModalOpen}
        />
      </header>
      <main>
        <div className={styles.stage}>
          <Stage
            editorRef={editorRef}
            background={background}
            itemsRef={itemsRef}
            editActionRef={editActionRef}
            tempItemRef={tempItemRef}
            onEditStart={onEditStart}
            onEditEnd={onEditEnd}
            onEditStop={onEditStop}
            deleteItem={deleteItem}
          />
        </div>
        <div className={styles.toolbox}>
          <Toolbox
            availableItems={availableItems}
            clearAll={clearAll}
            onDragStart={onDragStartToolbox}
            onEditStop={onEditStop}
            background={background}
            setBackground={setBackground}
            snap={snap}
            setSnap={setSnap}
          />
        </div>
      </main>
      <audio
        autoPlay={true}
        loop={true}
        src={`${process.env.PUBLIC_URL}/media/sheep.mp3`}
        ref={audio}
      />
      <InfoModal isOpen={infoModalOpen} setIsOpen={setInfoModalOpen} />
      <ShareModal
        isOpen={shareModalOpen}
        setIsOpen={setShareModalOpen}
        background={background}
        itemsRef={itemsRef}
      />
    </div>
  );
}
