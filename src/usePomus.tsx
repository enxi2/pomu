import { HTMLMotionProps, motion } from "framer-motion";
import { List, Map } from "immutable";
import { Fragment, useMemo } from "react";

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
  pomuElements: List<JSX.Element | null>;
} {
  const objectGroups = useMemo(
    (): Map<ObjectGroupKey, JSX.Element> =>
      Map(
        OBJECT_GROUP_KEYS.map(
          (key: ObjectGroupKey): [ObjectGroupKey, JSX.Element] => [
            key,
            <Fragment key={key}>
              {OBJECT_GROUPS[key].map(
                (object: AnimatedObject, index: number): JSX.Element => (
                  <motion.div
                    key={`${key}-${object.src}-${index}`}
                    className="animated-object"
                    {...object.props}
                  >
                    <img src={object.src} alt="pomu" />
                  </motion.div>
                )
              )}
            </Fragment>,
          ]
        )
      ),
    []
  );

  const pomuElements = useMemo(
    (): List<JSX.Element | null> =>
      List(
        VERSIONS[pomus].map(
          (key: ObjectGroupKey): JSX.Element | null =>
            objectGroups.get(key) ?? null
        )
      ),
    [objectGroups, pomus]
  );

  return {
    pomuElements,
  };
}
