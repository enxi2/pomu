import { ReactNode, useCallback } from "react";
import ReactModal from "react-modal";

import styles from "./InfoModal.module.scss";

function Link(props: { children?: ReactNode; src: string }): JSX.Element {
  const { children, src } = props;

  return (
    <a href={src} target="_blank" rel="noreferrer">
      {children ?? src}
    </a>
  );
}

export default function InfoModal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}): JSX.Element {
  const { isOpen, setIsOpen } = props;

  const close = useCallback((): void => setIsOpen(false), [setIsOpen]);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={close} className={styles.info}>
      <div>
        <h1>About</h1>
        <button onClick={close}>Close</button>
        <hr />
        <p>
          Build your own{" "}
          <Link src="https://www.nijisanji.jp/en/members/pomu-rainpuff">
            Pomu Rainpuff
          </Link>{" "}
          intro screen
        </p>
        <p>
          Source: <Link src="https://github.com/enxi2/pomu" />
        </p>
        <p>
          If you would like your artwork removed, message{" "}
          <Link src="https://discordapp.com/users/659617582298562570">
            enxi#0410
          </Link>{" "}
          or{" "}
          <Link src="mailto:erin.xi@outlook.com">erin.xi at outlook.com</Link>
        </p>
        <h2>Artwork and media sources</h2>
        <ul>
          <li>
            <Link src="https://www.nijisanji.jp/en/members/pomu-rainpuff">
              Pomu Rainpuff
            </Link>
          </li>
          <li>
            Audio: DOVA-SYNDROME (
            <Link src="https://www.youtube.com/c/DOVASYNDROMEYouTubeOfficial">
              YouTube
            </Link>
            ) -
            <Link src="https://www.youtube.com/watch?v=tof9BX4lixc">
              逃げろ!ひつじの大群だ!
            </Link>
          </li>
          <li>
            Walfie (<Link src="https://twitter.com/walfieee">@walfieee</Link>)
          </li>
          <li>
            Roaming Tuna (
            <Link src="https://twitter.com/RoamingTuna">@RoamingTuna</Link>)
          </li>
          <li>
            sumi (<Link src="https://twitter.com/suminoja">@suminoja</Link>)
          </li>
          <li>
            rinrinz (
            <Link src="https://twitter.com/hikikomorinz">@hikikomorinz</Link>)
          </li>
          <li>
            Coal (<Link src="https://twitter.com/Coal">@Coal</Link>)
          </li>
          <li>
            Melonbread (
            <Link src="https://twitter.com/MelonbreadFBP">@MelonbreadFBP</Link>)
          </li>
          <li>
            Chroneco (
            <Link src="https://twitter.com/chrone_co">@chrone_co</Link>)
          </li>
          <li>
            YoHo (<Link src="https://twitter.com/Hyn_yoho">@Hyn_yoho</Link>)
          </li>
          <li>
            Kra (<Link src="https://twitter.com/Shalesa_max">@Shalesa_max</Link>
            )
          </li>
          <li>
            KelpieBoye (
            <Link src="https://twitter.com/KelpieBoye">@KelpieBoye</Link>)
          </li>
          <li>
            James Choo (
            <Link src="https://twitter.com/jameschoo_004">@jameschoo_004</Link>)
          </li>
          <li>
            Kay Yu (
            <Link src="https://twitter.com/kaynimatic">@kaynimatic</Link>)
          </li>
          <li>
            KukieNyan (
            <Link src="https://twitter.com/Kukie_nyan">@Kukie_nyan</Link>)
          </li>
          <li>
            ClaireGua (
            <Link src="https://twitter.com/Claire_ovo">@Claire_ovo</Link>)
          </li>
        </ul>
      </div>
    </ReactModal>
  );
}
