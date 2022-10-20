import useSize from "@react-hook/size";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

import { MakeTimelineFn, PomuBackground, POMU_ITEMS } from "./pomus/catalog";
import { makeBackground, PomuItem } from "./usePomuItems";

import styles from "./Stage.module.scss";

function getStyles(item: PomuItem): Record<string, string> {
  const def = POMU_ITEMS[item.id];
  return {
    width: `${def.size[0] * item.scale * 100}%`,
    height: `${def.size[1] * item.scale * 100}%`,
    left: `${item.position[0] * 100}%`,
    top: `${item.position[1] * 100}%`,
    transform: `translate(-50%, -50%) rotate(${item.rotation}rad)`,
  };
}

type RenderedNode = {
  domId: string;
  element: JSX.Element;
  timelineFn: MakeTimelineFn | null;
};

interface StageProps {
  background: PomuBackground;
  items: PomuItem[];
}

export default function Stage(props: StageProps): JSX.Element {
  const { background, items } = props;

  const timeline = useRef<gsap.core.Timeline>(new gsap.core.Timeline());
  const containerRef = useRef<HTMLDivElement>(null);

  const [width, height] = useSize(containerRef);

  const [adjustedWidth, adjustedHeight] = useMemo(() => {
    if (width / height > 16 / 9) {
      return [(height * 16) / 9, height];
    } else {
      return [width, (width * 9) / 16];
    }
  }, [width, height]);

  const backgroundNodes = useMemo((): RenderedNode[] => {
    const bgItems = makeBackground(background);

    return bgItems.flatMap((item, itemIndex) => {
      return item.group.map((object, objectIndex) => {
        const id = `bg-${itemIndex}-${objectIndex}`;
        return {
          domId: id,
          element: (
            <div
              key={id}
              id={id}
              className={styles.backgroundObject}
              {...object.props}
            >
              <img src={object.src} alt="Pomu" />
            </div>
          ),
          timelineFn: object.makeTimeline,
        };
      });
    });
  }, [background]);

  const foregroundNodes = useMemo((): RenderedNode[] => {
    return items.flatMap((item, itemIndex) => {
      const id: string = `fg-${itemIndex}`;
      return {
        domId: id,
        element: (
          <div
            key={id}
            id={id}
            className={styles.foregroundObject}
            style={{ ...getStyles(item) }}
          >
            <img src={POMU_ITEMS[item.id].src} alt="Pomu" />
          </div>
        ),
        timelineFn: null,
      };
    });
  }, [items]);

  useEffect(() => {
    timeline.current.clear();
    for (const node of backgroundNodes) {
      if (node.timelineFn != null) {
        timeline.current.add(node.timelineFn(`#${node.domId}`), 0);
      }
    }
    for (const node of foregroundNodes) {
      if (node.timelineFn != null) {
        timeline.current.add(node.timelineFn(`#${node.domId}`), 0);
      }
    }
  }, [backgroundNodes, foregroundNodes]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.stage}
        style={{
          width: `${adjustedWidth}px`,
          height: `${adjustedHeight}px`,
        }}
      >
        <div className={styles.background}>
          {backgroundNodes.map((node) => node.element)}
        </div>
        <div className={styles.foreground}>
          {foregroundNodes.map((node) => node.element)}
        </div>
      </div>
    </div>
  );
}
