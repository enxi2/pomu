import { HTMLMotionProps } from "framer-motion";
import gsap from "gsap";
import { HTMLAttributes, useMemo } from "react";

import please_wait from "./pomus/0/please_wait.png";
import puffing_the_pomus from "./pomus/0/puffing_the_pomus.png";
import p1 from "./pomus/1/p1.png";
import walfie_pomu_chibi_1 from "./pomus/2/walfie_pomu_chibi_1.gif";
import walfie_pomu_chibi_2 from "./pomus/3/walfie_pomu_chibi_2.gif";
import walfie_pomu_chibi_3 from "./pomus/4/walfie_pomu_chibi_3.gif";
import walfie_finana_chibi_1 from "./pomus/walfie_finana_chibi_1.gif";

type AnimatedObject = {
  src: string;
  props: HTMLMotionProps<"div">;
};

type MakeTimelineFn = (selector: string) => gsap.core.Timeline;

type AnimatedObjectGsap = {
  src: string;
  makeTimeline: MakeTimelineFn;
  props?: HTMLAttributes<HTMLDivElement>;
};

const NO_TIMELINE = () => new gsap.core.Timeline();

function pct(n: number): string {
  return `${n * 100}%`;
}

function ltdim(
  left: number,
  top: number,
  width: number,
  height: number
): {
  left: string;
  top: string;
  width: string;
  height: string;
} {
  return {
    left: pct(left / 1920),
    top: pct(top / 1080),
    width: pct(width / 1920),
    height: pct(height / 1080),
  };
}

function cdim(
  x: number,
  y: number,
  width: number,
  height: number
): {
  left: string;
  top: string;
  width: string;
  height: string;
} {
  return ltdim(x - width / 2, y - height / 2, width, height);
}

// cx, cy, width, height, rotation
type TransformInput = [number, number, number, number, string];

function animateTransform(transforms: ReadonlyArray<TransformInput>): {
  left: string[];
  top: string[];
  width: string[];
  height: string[];
  rotate: string[];
} {
  const left = [];
  const top = [];
  const width = [];
  const height = [];
  const rotate = [];
  for (const transform of transforms) {
    const style = cdim(transform[0], transform[1], transform[2], transform[3]);
    left.push(style.left);
    top.push(style.top);
    width.push(style.width);
    height.push(style.height);
    rotate.push(transform[4]);
  }

  return {
    left,
    top,
    width,
    height,
    rotate,
  };
}

const OBJECT_GROUP_KEYS = [
  "bg_text",
  "original_pomus",
  "walfie_pomu_chibi_1",
  "walfie_pomu_chibi_2",
  "walfie_pomu_chibi_3",
  "walfie_finana_chibi_1",
  "walfie_pomu_chibi_3b",
] as const;

type ObjectGroupKey = typeof OBJECT_GROUP_KEYS[number];

type ObjectGroup = ReadonlyArray<AnimatedObject>;

const OBJECT_GROUPS: { [key in ObjectGroupKey]: ObjectGroup } = {
  // Base text animated on the background
  bg_text: [
    {
      src: puffing_the_pomus,
      props: {
        initial: { opacity: 0 },
        animate: { opacity: [0, 1, 1, 0, 0] },
        transition: {
          duration: 10,
          repeat: Infinity,
          times: [0, 0.1, 0.35, 0.45, 1],
        },
        style: {
          position: "absolute",
          x: "0%",
          y: "0%",
          width: "100%",
          height: "100%",
        },
      },
    },
    {
      src: please_wait,
      props: {
        initial: { opacity: 0 },
        animate: { opacity: [0, 1, 1, 0, 0] },
        transition: {
          repeat: Infinity,
          duration: 10,
          times: [0.55, 0.65, 0.9, 1, 1],
        },
        style: {
          position: "absolute",
          x: "0%",
          y: "0%",
          width: "100%",
          height: "100%",
        },
      },
    },
  ],
  // Original pomus since the debut stream
  // https://www.youtube.com/watch?v=e0KSfSf7BuQ
  original_pomus: [
    {
      src: p1,
      props: {
        style: {
          ...cdim(328, 698, 508, 699),
        },
        animate: {
          rotate: ["15deg", "-15deg"],
        },
        transition: {
          duration: 1.2,
          repeat: Infinity,
          ease: (t: number): number => (t < 0.5 ? 0 : 1),
        },
      },
    },
    {
      src: p1,
      props: {
        style: {
          scaleX: -1,
        },
        animate: {
          ...animateTransform([
            [1170, 1188, 508, 699, "165deg"],
            [1170, 1188, 508, 699, "-165deg"],
            [1170, 1188, 508, 699, "165deg"],
            [1170, 1188, 508, 699, "-165deg"],
            [1170, 1188, 508, 699, "165deg"],
            [1170, 1188, 508, 699, "-165deg"],
            [1170, 1188, 508, 699, "165deg"],
            [1170, 1188, 508, 699, "-165deg"],
            [1809, 498, 508, 699, "65deg"],
            [1809, 498, 508, 699, "115deg"],
            [1809, 498, 508, 699, "65deg"],
            [1809, 498, 508, 699, "115deg"],
            [1809, 498, 508, 699, "65deg"],
            [1809, 498, 508, 699, "115deg"],
            [1809, 498, 508, 699, "65deg"],
            [1809, 498, 508, 699, "115deg"],
            [730, 703, 508, 699, "165deg"],
            [730, 703, 508, 699, "-165deg"],
            [730, 703, 508, 699, "165deg"],
            [730, 703, 508, 699, "-165deg"],
            [730, 703, 508, 699, "165deg"],
            [730, 703, 508, 699, "-165deg"],
            [730, 703, 508, 699, "165deg"],
            [730, 703, 508, 699, "-165deg"],
          ]),
        },
        transition: {
          duration: 1.2 * 4 * 3,
          repeat: Infinity,
          ease: (t: number): number => (t < 0.5 ? 0 : 1),
        },
      },
    },
  ],
  // Chibi Pomu from @walfieee
  // https://twitter.com/walfieee/status/1394080386431524868
  // https://www.youtube.com/watch?v=FgoO57-TGkM
  walfie_pomu_chibi_1: [
    {
      src: walfie_pomu_chibi_1,
      props: {
        style: {
          ...ltdim(1343, 548, 576, 576),
        },
      },
    },
  ],
  // Birthday chibi Pomu
  // https://twitter.com/walfieee/status/1414435834246406150
  walfie_pomu_chibi_2: [
    {
      src: walfie_pomu_chibi_2,
      props: {
        style: {
          ...ltdim(1348, 536, 544, 544),
        },
      },
    },
  ],
  // Money tossing chibi Pomu
  // https://twitter.com/walfieee/status/1408645860813119489
  walfie_pomu_chibi_3: [
    {
      src: walfie_pomu_chibi_3,
      props: {
        style: {
          ...ltdim(987, 469, 568, 568),
        },
      },
    },
  ],
  // Birthday chips eating chibi Finana
  // https://twitter.com/walfieee/status/1407137606828187652
  walfie_finana_chibi_1: [
    {
      src: walfie_finana_chibi_1,
      props: {
        style: {
          ...ltdim(687, 599, 440, 450),
        },
      },
    },
  ],
  // Money tossing chibi Pomu but in the bottom right
  walfie_pomu_chibi_3b: [
    {
      src: walfie_pomu_chibi_3,
      props: {
        style: {
          ...ltdim(1352, 512, 567, 567),
        },
      },
    },
  ],
};

type ObjectGroupGsap = ReadonlyArray<AnimatedObjectGsap>;

const OBJECT_GROUPS_GSAP: { [key in ObjectGroupKey]: ObjectGroupGsap } = {
  // Base text animated on the background
  bg_text: [
    {
      src: puffing_the_pomus,
      makeTimeline: (selector: string): gsap.core.Timeline => {
        const tl = new gsap.core.Timeline({ repeat: -1 });
        tl.set(selector, { opacity: 0 });
        tl.to(selector, { opacity: 1, duration: 1 }, 0);
        tl.to(selector, { opacity: 0, duration: 1 }, 3.5);
        tl.set(selector, {}, 10);
        return tl;
      },
      props: {
        style: {
          position: "absolute",
          left: "0%",
          top: "0%",
          width: "100%",
          height: "100%",
        },
      },
    },
    {
      src: please_wait,
      makeTimeline: (selector: string): gsap.core.Timeline => {
        const tl = new gsap.core.Timeline({ repeat: -1 });
        tl.set(selector, { opacity: 0 });
        tl.to(selector, { opacity: 1, duration: 1 }, 5.5);
        tl.to(selector, { opacity: 0, duration: 1 }, 9);
        return tl;
      },
      props: {
        style: {
          position: "absolute",
          left: "0%",
          top: "0%",
          width: "100%",
          height: "100%",
        },
      },
    },
  ],
  // Original pomus since the debut stream
  // https://www.youtube.com/watch?v=e0KSfSf7BuQ
  original_pomus: [
    {
      src: p1,
      makeTimeline: (selector: string): gsap.core.Timeline => {
        const tl = new gsap.core.Timeline({ repeat: -1 });
        tl.set(selector, { rotate: "15deg" });
        tl.set(selector, { rotate: "-15deg" }, 0.6);
        tl.set(selector, {}, 1.2);
        return tl;
      },
      props: {
        style: {
          ...cdim(328, 698, 508, 699),
        },
      },
    },
    {
      src: p1,
      makeTimeline: (selector: string): gsap.core.Timeline => {
        const tl = new gsap.core.Timeline({ repeat: -1 });

        const t1 = new gsap.core.Timeline({ repeat: 3 });
        t1.set(selector, { ...cdim(1170, 1188, 508, 699), rotate: "165deg" });
        t1.set(selector, { rotate: "-165deg" }, 0.6);
        t1.set(selector, {}, 1.2);
        tl.add(t1);

        const t2 = new gsap.core.Timeline({ repeat: 3 });
        t2.set(selector, { ...cdim(1809, 498, 508, 699), rotate: "65deg" });
        t2.set(selector, { rotate: "115deg" }, 0.6);
        t2.set(selector, {}, 1.2);
        tl.add(t2);

        const t3 = new gsap.core.Timeline({ repeat: 3 });
        t3.set(selector, { ...cdim(730, 703, 508, 699), rotate: "165deg" });
        t3.set(selector, { rotate: "-165deg" }, 0.6);
        t3.set(selector, {}, 1.2);
        tl.add(t3);

        return tl;
      },
      props: {
        style: {
          scale: "-1",
        },
      },
    },
  ],
  // Chibi Pomu from @walfieee
  // https://twitter.com/walfieee/status/1394080386431524868
  // https://www.youtube.com/watch?v=FgoO57-TGkM
  walfie_pomu_chibi_1: [
    {
      src: walfie_pomu_chibi_1,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...ltdim(1343, 548, 576, 576),
        },
      },
    },
  ],
  // Birthday chibi Pomu
  // https://twitter.com/walfieee/status/1414435834246406150
  walfie_pomu_chibi_2: [
    {
      src: walfie_pomu_chibi_2,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...ltdim(1348, 536, 544, 544),
        },
      },
    },
  ],
  // Money tossing chibi Pomu
  // https://twitter.com/walfieee/status/1408645860813119489
  walfie_pomu_chibi_3: [
    {
      src: walfie_pomu_chibi_3,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...ltdim(987, 469, 568, 568),
        },
      },
    },
  ],
  // Birthday chips eating chibi Finana
  // https://twitter.com/walfieee/status/1407137606828187652
  walfie_finana_chibi_1: [
    {
      src: walfie_finana_chibi_1,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...ltdim(687, 599, 440, 450),
        },
      },
    },
  ],
  // Money tossing chibi Pomu but in the bottom right
  walfie_pomu_chibi_3b: [
    {
      src: walfie_pomu_chibi_3,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...ltdim(1352, 512, 567, 567),
        },
      },
    },
  ],
};

const VERSIONS: ReadonlyArray<ReadonlyArray<ObjectGroupKey>> = [
  // Version 0, base bg text
  ["bg_text"],
  // Version 1, original pomus since debut stream
  // https://www.youtube.com/watch?v=e0KSfSf7BuQ
  ["bg_text", "original_pomus"],
  // Version 2, with chibi Pomu
  // https://www.youtube.com/watch?v=FgoO57-TGkM
  ["bg_text", "original_pomus", "walfie_pomu_chibi_1"],
  // Version 3, with birthday chibi Pomu
  // https://www.youtube.com/watch?v=XsbJK2pINv0
  // TODO: separate birthday stream version?
  // https://www.youtube.com/watch?v=4vrD9dHHwao
  ["bg_text", "original_pomus", "walfie_pomu_chibi_2"],
  // With chibi Finana and chibi money Pomu
  // https://www.youtube.com/watch?v=8zUb1CGCnZ0
  ["bg_text", "original_pomus", "walfie_pomu_chibi_3", "walfie_finana_chibi_1"],
  // Without Finana and chibi moved
  // https://www.youtube.com/watch?v=ZRb4HsiQXc8
  ["bg_text", "original_pomus", "walfie_pomu_chibi_3b"],
  // Oh man it exploded
  // https://www.youtube.com/watch?v=QE7uuTEezR0
  // TODO
  // Things adjusted
  // https://www.youtube.com/watch?v=8_VeRNE7LhQ
  // TODO
  // Added one, readjusted one
  // https://www.youtube.com/watch?v=944mNPsSu6Y
  // TODO
  // Added one, adjustments
  // https://www.youtube.com/watch?v=gTPZMgQ-CRM
  // TODO
];

export const MAX_POMUS = VERSIONS.length - 1;

export default function usePomus(pomus: number): {
  pomuElements: ReadonlyArray<JSX.Element>;
  pomuTimelines: ReadonlyArray<MakeTimelineFn>;
} {
  const objects = useMemo((): ReadonlyArray<
    [ObjectGroupKey, JSX.Element, MakeTimelineFn]
  > => {
    const objects: Array<[ObjectGroupKey, JSX.Element, MakeTimelineFn]> = [];
    let index = 0;
    for (const key of OBJECT_GROUP_KEYS) {
      for (const object of OBJECT_GROUPS_GSAP[key]) {
        const id = `${index++}`;
        const element = (
          <div
            key={id}
            id={`p${id}`}
            className="animated-object"
            {...object.props}
          >
            <img src={object.src} alt="pomu" />
          </div>
        );
        //const timeline = object.makeTimeline(`#${id}`);
        objects.push([key, element, object.makeTimeline]);
      }
    }
    return objects;
  }, []);

  const pomuElements = useMemo((): ReadonlyArray<JSX.Element> => {
    return VERSIONS[pomus].flatMap((key: ObjectGroupKey): JSX.Element[] =>
      objects
        .filter(([objectKey]) => key === objectKey)
        .map(([, element]) => element)
    );
  }, [objects, pomus]);

  // Pass back the timeline constructors instead of actual timelines so that
  // DOM can load the elements first.
  const pomuTimelines = useMemo((): ReadonlyArray<MakeTimelineFn> => {
    return VERSIONS[pomus].flatMap((key: ObjectGroupKey): MakeTimelineFn[] =>
      objects
        .filter(([objectKey]) => key === objectKey)
        .map(([, , makeTimeline]) => makeTimeline)
    );
  }, [objects, pomus]);

  return {
    pomuElements,
    pomuTimelines,
  };
}
