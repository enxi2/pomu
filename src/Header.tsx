import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import PauseCircleIcon from "@heroicons/react/24/outline/PauseCircleIcon";
import PlayCircleIcon from "@heroicons/react/24/outline/PlayCircleIcon";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";

import styles from "./Header.module.scss";

interface HeaderProps {
  audioPlaying: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
  audioVolume: number;
  setAudioVolume: (audioVolume: number) => void;
  setInfoModalOpen: (open: boolean) => void;
  setShareModalOpen?: (open: boolean) => void;
}

export default function Header(props: HeaderProps): JSX.Element {
  const {
    audioPlaying,
    playAudio,
    pauseAudio,
    audioVolume,
    setAudioVolume,
    setInfoModalOpen,
    setShareModalOpen,
  } = props;

  return (
    <div className={styles.header}>
      <h1>Build your own Pomu intro</h1>
      <div className={styles.actions}>
        <InformationCircleIcon onClick={() => setInfoModalOpen(true)} />
        <label>BGM&nbsp;</label>
        {audioPlaying ? (
          <PauseCircleIcon onClick={() => pauseAudio()} />
        ) : (
          <PlayCircleIcon onClick={() => playAudio()} />
        )}
        <label>Vol&nbsp;</label>
        <input
          className={styles.volume}
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={audioVolume}
          onChange={(e) => setAudioVolume(e.target.valueAsNumber)}
        />
        {setShareModalOpen != null ? (
          <ShareIcon onClick={() => setShareModalOpen(true)} />
        ) : null}
      </div>
    </div>
  );
}
