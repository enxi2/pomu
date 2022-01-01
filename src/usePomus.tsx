import gsap from "gsap";
import { HTMLAttributes, useMemo } from "react";

import please_wait from "./pomus/0/please_wait.png";
import puffing_the_pomus from "./pomus/0/puffing_the_pomus.png";
import p1 from "./pomus/1/p1.png";
// https://twitter.com/walfieee/status/1394080386431524868
import walfie_pomu_chibi_1 from "./pomus/walfie_pomu_chibi_1.gif";
// // https://twitter.com/walfieee/status/1414435834246406150
import walfie_pomu_chibi_2 from "./pomus/walfie_pomu_chibi_2.gif";
// https://twitter.com/walfieee/status/1408645860813119489
import walfie_pomu_chibi_3 from "./pomus/walfie_pomu_chibi_3.gif";
// https://twitter.com/walfieee/status/1395616635327848449
import walfie_pomu_chibi_4 from "./pomus/walfie_pomu_chibi_4.gif";
// https://twitter.com/walfieee/status/1409004073647493120
import walfie_pomu_chibi_5 from "./pomus/walfie_pomu_chibi_5.gif";
// https://twitter.com/walfieee/status/1427020493127815170
import walfie_pomu_chibi_6 from "./pomus/walfie_pomu_chibi_6.gif";
// https://twitter.com/walfieee/status/1407137606828187652
import walfie_finana_chibi_1 from "./pomus/walfie_finana_chibi_1.gif";

/*
type AnimatedObject = {
  src: string;
  props: HTMLMotionProps<"div">;
};
*/

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

/*
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
*/

const OBJECT_GROUP_KEYS = [
  "bg_text",
  "original_pomus",
  "walfie_pomu_chibi_1",
  "walfie_pomu_chibi_2",
  "walfie_pomu_chibi_3",
  "walfie_finana_chibi_1",
  "walfie_pomu_chibi_3b",
  "walfie_pomu_chibis_1",
  "pomus_1",
] as const;

type ObjectGroupKey = typeof OBJECT_GROUP_KEYS[number];

/*
type ObjectGroup = ReadonlyArray<AnimatedObject>;

// Old framer motion transitions
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
*/

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
        tl.set(selector, { rotate: "-15deg" });
        tl.set(selector, { rotate: "15deg" }, 0.6);
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
        t1.set(selector, {
          ...cdim(1170, 1188, 508, 699),
          scaleX: -1,
          rotate: "165deg",
        });
        t1.set(selector, { rotate: "-165deg" }, 0.6);
        t1.set(selector, {}, 1.2);
        tl.add(t1);

        const t2 = new gsap.core.Timeline({ repeat: 3 });
        t2.set(selector, {
          ...cdim(1809, 498, 508, 699),
          scaleX: 1,
          rotate: "-65deg",
        });
        t2.set(selector, { rotate: "-115deg" }, 0.6);
        t2.set(selector, {}, 1.2);
        tl.add(t2);

        const t3 = new gsap.core.Timeline();
        t3.set(selector, {
          ...cdim(730, 703, 508, 699),
          scaleX: -1,
          rotate: "165deg",
        });
        t3.set(selector, { rotate: "-165deg" }, 0.6);
        t3.set(selector, { rotate: "165deg" }, 1.2);
        t3.set(selector, {}, 1.8);
        tl.add(t3);

        const t4 = new gsap.core.Timeline({ repeat: 1 });
        t4.set(selector, {
          ...cdim(480, 58, 508, 699),
          scaleX: -1,
          rotate: "-165deg",
        });
        t4.set(selector, { rotate: "165deg" }, 0.6);
        t4.set(selector, {}, 1.2);
        tl.add(t4);

        const t5 = new gsap.core.Timeline();
        t5.set(selector, {
          ...cdim(1495, 125, 508, 699),
          scaleX: -1,
          rotate: "-165deg",
        });
        t5.set(selector, { rotate: "165deg" }, 0.6);
        t5.set(selector, { rotate: "-165deg" }, 1.2);
        t5.set(selector, { rotate: "165deg" }, 1.8);
        t5.set(selector, { rotate: "-165deg" }, 2.4);
        t5.set(selector, {}, 3.0);
        tl.add(t5);

        const t6 = new gsap.core.Timeline();
        t6.set(selector, {
          ...cdim(125, -30, 508, 699),
          scaleX: -1,
          rotate: "165deg ",
        });
        t6.set(selector, { rotate: "-165deg" }, 0.6);
        t6.set(selector, { rotate: "165deg" }, 1.2);
        t6.set(selector, { rotate: "-165deg" }, 1.8);
        t6.set(selector, { rotate: "165deg" }, 2.4);
        t6.set(selector, {}, 3.0);
        tl.add(t6);

        const t7 = new gsap.core.Timeline();
        t7.set(selector, {
          ...cdim(1247, 1227, 1533, 2109),
          scaleX: 1,
          rotate: "15deg ",
        });
        t7.set(selector, { rotate: "-15deg" }, 0.6);
        t7.set(selector, { rotate: "15deg" }, 1.2);
        t7.set(selector, { rotate: "-15deg" }, 1.8);
        t7.set(selector, { rotate: "15deg" }, 2.4);
        t7.set(selector, { rotate: "-15deg" }, 3.0);
        t7.set(selector, { rotate: "15deg" }, 3.6);
        t7.set(selector, {}, 4.2);
        tl.add(t7);

        const t8 = new gsap.core.Timeline();
        t8.set(selector, {
          ...cdim(1017, 519, 508, 699),
          scaleX: -1,
          rotate: "165deg",
        });
        t8.set(selector, { rotate: "-165deg" }, 0.6);
        t8.set(selector, { rotate: "165deg" }, 1.2);
        t8.set(selector, {}, 1.8);
        tl.add(t8);

        const t9 = new gsap.core.Timeline({ repeat: 6 });
        t9.set(selector, {
          ...cdim(1495, 125, 508, 699),
          scaleX: -1,
          rotate: "-165deg",
        });
        t9.set(selector, { rotate: "165deg" }, 0.6);
        t9.set(selector, {}, 1.2);
        tl.add(t9);

        const t10 = new gsap.core.Timeline();
        t10.set(selector, { rotate: "-165deg" });
        t10.set(selector, {}, 0.6);
        tl.add(t10);

        const t11 = new gsap.core.Timeline();
        t11.set(selector, {
          ...cdim(332, 124, 508, 699),
          scaleX: -1,
          rotate: "165deg",
        });
        t11.set(selector, { rotate: "-165deg" }, 0.6);
        t11.set(selector, { rotate: "165deg" }, 1.2);
        t11.set(selector, {}, 1.8);
        tl.add(t11);

        const t12 = new gsap.core.Timeline();
        t12.set(selector, {
          ...cdim(329, 703, 508, 699),
          scaleX: -1,
          rotate: "-165deg",
        });
        t12.set(selector, { rotate: "165deg" }, 0.6);
        t12.set(selector, { rotate: "-165deg" }, 1.2);
        t12.set(selector, {}, 1.8);
        tl.add(t12);

        return tl;
      },
      props: {
        style: {},
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
  // A bunch of chibi Pomus
  walfie_pomu_chibis_1: [
    {
      src: walfie_pomu_chibi_3,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...cdim(670, 384, 204, 204),
        },
      },
    },
    {
      src: walfie_pomu_chibi_1,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...cdim(831, 395, 184, 184),
        },
      },
    },
    {
      src: walfie_pomu_chibi_2,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...cdim(991, 384, 183, 183),
        },
      },
    },
    {
      src: walfie_pomu_chibi_4,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...cdim(1140, 391, 153, 184),
        },
      },
    },
    {
      src: walfie_pomu_chibi_5,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...cdim(1282, 394, 184, 169),
        },
      },
    },
    {
      src: walfie_pomu_chibi_6,
      makeTimeline: NO_TIMELINE,
      props: {
        style: {
          ...cdim(1466, 399, 179, 179),
        },
      },
    },
  ],
  // Assorted other animated Pomus
  // https://twitter.com/RoamingTuna/status/1419452403506552834
  // https://twitter.com/fumikoreturn/status/1420562421039644673
  // https://twitter.com/suminoja/status/1425370317740855299
  // https://twitter.com/hikikomorinz/status/1420678509714833411
  // https://twitter.com/Coal/status/1396994013576634368
  // https://twitter.com/MelonbreadFBP/status/1405559538284064772
  // https://twitter.com/chrone_co/status/1414492689286926337
  // https://twitter.com/Hyn_yoho/status/1414194171720593414
  pomus_1: [],
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
  ["bg_text", "original_pomus", "walfie_pomu_chibis_1"],
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
