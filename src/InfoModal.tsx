import { ReactNode, useCallback } from "react";
import ReactModal from "react-modal";

function Link(props: { children?: ReactNode; src: string }): JSX.Element {
  const { children, src } = props;

  return (
    <a href={src} target="_blank">
      {children ?? src}
    </a>
  );
}

export default function (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}): JSX.Element {
  const { isOpen, setIsOpen } = props;

  const close = useCallback((): void => setIsOpen(false), [setIsOpen]);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={close} className="info-modal">
      <div className="container">
        <button className="close" onClick={close}>
          close
        </button>
        <h1>About these Pomus</h1>
        <p>
          This project explores{" "}
          <Link src="https://www.nijisanji.jp/en/members/pomu-rainpuff">
            Pomu Rainpuff
          </Link>
          's ever growing opening sequence.
        </p>
        <p>
          Source: <Link src="https://github.com/erinxi/pomu" />
        </p>
        <p>
          Questions or if you would like your artwork removed, contact{" "}
          <Link src="https://discordapp.com/users/659617582298562570">
            enxi#0410
          </Link>{" "}
          or{" "}
          <Link src="mailto:erin.xi@outlook.com">erin.xi at outlook.com</Link>
        </p>
        <h2>Artwork and media credits</h2>
        <ul>
          <li>Nijisanji</li>
          <li>
            DOVA-SYNDROME (
            <Link src="https://www.youtube.com/c/DOVASYNDROMEYouTubeOfficial">
              YouTube
            </Link>
            )
            <ul>
              <li>
                <Link src="https://www.youtube.com/watch?v=tof9BX4lixc">
                  逃げろ!ひつじの大群だ!
                </Link>
              </li>
            </ul>
          </li>
          <li>
            Walfie (<Link src="https://twitter.com/walfieee">@walfieee</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/walfieee/status/1394080386431524868" />
              </li>
              <li>
                <Link src="https://twitter.com/walfieee/status/1414435834246406150" />
              </li>
              <li>
                <Link src="https://twitter.com/walfieee/status/1408645860813119489" />
              </li>
              <li>
                <Link src="https://twitter.com/walfieee/status/1395616635327848449" />
              </li>
              <li>
                <Link src="https://twitter.com/walfieee/status/1409004073647493120" />
              </li>
              <li>
                <Link src="https://twitter.com/walfieee/status/1427020493127815170" />
              </li>
              <li>
                <Link src="https://twitter.com/walfieee/status/1407137606828187652" />
              </li>
            </ul>
          </li>
          <li>
            Tuna (
            <Link src="https://twitter.com/RoamingTuna">@RoamingTuna</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/RoamingTuna/status/1419452403506552834" />
              </li>
            </ul>
          </li>
          <li>
            Mimi (
            <Link src="https://twitter.com/fumikoreturn">@fumikoreturn</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/fumikoreturn/status/1420562421039644673" />
              </li>
            </ul>
          </li>
          <li>
            suminoja (<Link src="https://twitter.com/suminoja">@suminoja</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/suminoja/status/1425370317740855299" />
              </li>
            </ul>
          </li>
          <li>
            rinrinz (
            <Link src="https://twitter.com/hikikomorinz">@hikikomorinz</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/hikikomorinz/status/1420678509714833411" />
              </li>
            </ul>
          </li>
          <li>
            Coal (<Link src="https://twitter.com/Coal">@Coal</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/Coal/status/1396994013576634368" />
              </li>
            </ul>
          </li>
          <li>
            Melonbread (
            <Link src="https://twitter.com/MelonbreadFBP">@MelonbreadFBP</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/MelonbreadFBP/status/1405559538284064772" />
              </li>
            </ul>
          </li>
          <li>
            Chroneco (
            <Link src="https://twitter.com/chrone_co">@chrone_co</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/chrone_co/status/1414492689286926337" />
              </li>
            </ul>
          </li>
          <li>
            YoHo (<Link src="https://twitter.com/Hyn_yoho">@Hyn_yoho</Link>)
            <ul>
              <li>
                <Link src="https://twitter.com/Hyn_yoho/status/1414194171720593414" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </ReactModal>
  );
}
