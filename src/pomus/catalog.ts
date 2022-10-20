import gsap from "gsap";
import { HTMLAttributes } from "react";

import bg from "./bg.png";
import please_wait from "./0/please_wait.png";
import puffing_the_pomus from "./0/puffing_the_pomus.png";
import p1 from "./1/p1.png";
import bg2 from "./bg2.png";
import pomu_loading from "./pomu_loading.png";
// https://twitter.com/walfieee/status/1394080386431524868
import walfie_pomu_chibi_1 from "./walfie_pomu_chibi_1.gif";
// https://twitter.com/walfieee/status/1414435834246406150
import walfie_pomu_chibi_2 from "./walfie_pomu_chibi_2.gif";
// https://twitter.com/walfieee/status/1408645860813119489
import walfie_pomu_chibi_3 from "./walfie_pomu_chibi_3.gif";
// https://twitter.com/walfieee/status/1395616635327848449
import walfie_pomu_chibi_4 from "./walfie_pomu_chibi_4.gif";
// https://twitter.com/walfieee/status/1409004073647493120
import walfie_pomu_chibi_5 from "./walfie_pomu_chibi_5.gif";
// https://twitter.com/walfieee/status/1427020493127815170
import walfie_pomu_chibi_6 from "./walfie_pomu_chibi_6.gif";
// https://twitter.com/walfieee/status/1407137606828187652
import walfie_finana_chibi_1 from "./walfie_finana_chibi_1.gif";
// https://twitter.com/RoamingTuna/status/1419452403506552834
import roamingtuna_pomu_1 from "./roamingtuna_pomu_1.gif";
// https://twitter.com/suminoja/status/1425370317740855299
import sumi_pomu_popcorn from "./sumi_pomu_popcorn.gif";
// https://twitter.com/hikikomorinz/status/1420678509714833411
import rinrinz_pomu_sleeping from "./rinrinz_pomu_sleeping.gif";
// https://twitter.com/Coal/status/1397011258172272642
import coal_pomu_sand from "./coal_pomu_sand.gif";
// https://twitter.com/MelonbreadFBP/status/1405559538284064772
import melonbread_pomu_copter from "./melonbread_pomu_copter.gif";
// https://twitter.com/chrone_co/status/1414492689286926337
import chroneco_pomu_jumping from "./chroneco_pomu_jumping.gif";
// https://twitter.com/Hyn_yoho/status/1414194171720593414
import yoho_pomu_birthday from "./yoho_pomu_birthday.gif";
// https://twitter.com/suminoja/status/1477525490856517632
import sumi_pomu_jazz from "./sumi_pomu_jazz.gif";
// https://twitter.com/Claire_ovo/status/1564232056615288832
import clairegua_pomu_duck from "./clairegua_pomu_duck.gif";
// https://twitter.com/walfieee/status/1440899906634489856
import walfie_pomu_chibi_7 from "./walfie_pomu_chibi_7.gif";
// https://twitter.com/walfieee/status/1447773462362210306
import walfie_pomu_chibi_8 from "./walfie_pomu_chibi_8.gif";
// https://twitter.com/Coal/status/1449841903365595140
import coal_pomu_jumping from "./coal_pomu_jumping.gif";
// https://twitter.com/Shalesa_max/status/1460679032928833541
import kra_pomu_1 from "./kra_pomu_1.gif";
// https://twitter.com/Shalesa_max/status/1428790208972034051
import kra_pomu_bubble_tea from "./kra_pomu_bubble_tea.gif";
// https://twitter.com/roamingtuna/status/1432129480143691780
import roamingtuna_pomu_2 from "./roamingtuna_pomu_2.gif";
// https://www.reddit.com/r/Nijisanji/comments/w3ucsr/
import kelpieboye_pomu_1 from "./kelpieboye_pomu_1.gif";
// https://twitter.com/suminoja/status/1440225623352299526
import sumi_pomu_wavy_arms from "./sumi_pomu_wavy_arms.gif";
// https://twitter.com/suminoja/status/1509006633648590849
import sumi_pomies from "./sumi_pomies.gif";
// https://twitter.com/suminoja/status/1456542779836825603
import sumi_pomu_pompom from "./sumi_pomu_pompom.gif";
// https://twitter.com/suminoja/status/1435122204253982722
import sumi_pomu_pomuske from "./sumi_pomu_pomuske.gif";
// https://twitter.com/suminoja/status/1510499572203761668
import sumi_pomu_not_scary from "./sumi_pomu_not_scary.gif";
// https://twitter.com/kaynimatic/status/1493463869368385540
import kayyu_pomu_pixel from "./kayyu_pomu_pixel.gif";
// https://twitter.com/jameschoo_004/status/1432680740378988545
import jameschoo_pomu_tpose from "./jameschoo_pomu_tpose.gif";
// https://twitter.com/kukie_nyan/status/1437899549998084100
import kukienyan_bongos from "./kukienyan_bongos.gif";
// https://twitter.com/suminoja/status/1447400343151677442
import sumi_pomu_fu from "./sumi_pomu_fu.gif";
// https://twitter.com/suminoja/status/1452185809935867904
import sumi_pomu_party from "./sumi_pomu_party.gif";

export enum PomuBackground {
  CLASSIC = 0,
  POMU_LOADING = 1,
}

export enum PomuItemId {
  UNKNOWN = 0,
  WALFIE_POMU_CHIBI_1,
  WALFIE_POMU_CHIBI_2,
  WALFIE_POMU_CHIBI_3,
  WALFIE_POMU_CHIBI_4,
  WALFIE_POMU_CHIBI_5,
  WALFIE_POMU_CHIBI_6,
  WALFIE_FINANA_CHIBI_1,
  ROAMINGTUNA_POMU_1,
  SUMI_POMU_POPCORN,
  RINRINZ_POMU_SLEEPING,
  COAL_POMU_SAND,
  MELONBREAD_POMU_COPTER,
  CHRONECO_POMU_JUMPING,
  YOHO_POMU_BIRTHDAY,
  SUMI_POMU_JAZZ,
  CLAIREGUA_POMU_DUCK,
  WALFIE_POMU_CHIBI_7,
  WALFIE_POMU_CHIBI_8,
  COAL_POMU_JUMPING,
  KRA_POMU_1,
  KRA_POMU_BUBBLE_TEA,
  ROAMINGTUNA_POMU_2,
  KELPIEBOYE_POMU_1,
  SUMI_POMU_WAVY_ARMS,
  SUMI_POMIES,
  SUMI_POMU_POMPOM,
  SUMI_POMU_POMUSKE,
  SUMI_POMU_NOT_SCARY,
  KAYYU_POMU_PIXEL,
  JAMESCHOO_POMU_TPOSE,
  KUKIENYAN_BONGOS,
  SUMI_POMU_FU,
  SUMI_POMU_PARTY,
}

export type PomuItemDef = {
  src: string;
  size: [width: number, height: number];
  source: string;
};

function psize(w: number, h: number): [number, number] {
  return [w / 1920, h / 1080];
}

export const POMU_ITEMS: { [id in PomuItemId]: PomuItemDef } = {
  [PomuItemId.UNKNOWN]: { src: "", size: [0, 0], source: "" },
  [PomuItemId.WALFIE_POMU_CHIBI_1]: {
    src: walfie_pomu_chibi_1,
    size: psize(200, 200),
    source: "https://twitter.com/walfieee/status/1394080386431524868",
  },
  [PomuItemId.WALFIE_POMU_CHIBI_2]: {
    src: walfie_pomu_chibi_2,
    size: psize(200, 200),
    source: "https://twitter.com/walfieee/status/1414435834246406150",
  },
  [PomuItemId.WALFIE_POMU_CHIBI_3]: {
    src: walfie_pomu_chibi_3,
    size: psize(200, 200),
    source: "https://twitter.com/walfieee/status/1408645860813119489",
  },
  [PomuItemId.WALFIE_POMU_CHIBI_4]: {
    src: walfie_pomu_chibi_4,
    size: psize(166, 200),
    source: "https://twitter.com/walfieee/status/1395616635327848449",
  },
  [PomuItemId.WALFIE_POMU_CHIBI_5]: {
    src: walfie_pomu_chibi_5,
    size: psize(200, 184),
    source: "https://twitter.com/walfieee/status/1409004073647493120",
  },
  [PomuItemId.WALFIE_POMU_CHIBI_6]: {
    src: walfie_pomu_chibi_6,
    size: psize(200, 200),
    source: "https://twitter.com/walfieee/status/1427020493127815170",
  },
  [PomuItemId.WALFIE_FINANA_CHIBI_1]: {
    src: walfie_finana_chibi_1,
    size: psize(176, 180),
    source: "https://twitter.com/walfieee/status/1407137606828187652",
  },
  [PomuItemId.ROAMINGTUNA_POMU_1]: {
    src: roamingtuna_pomu_1,
    size: psize(300, 300),
    source: "https://twitter.com/RoamingTuna/status/1419452403506552834",
  },
  [PomuItemId.SUMI_POMU_POPCORN]: {
    src: sumi_pomu_popcorn,
    size: psize(300, 300),
    source: "https://twitter.com/suminoja/status/1425370317740855299",
  },
  [PomuItemId.RINRINZ_POMU_SLEEPING]: {
    src: rinrinz_pomu_sleeping,
    size: psize(300, 300),
    source: "https://twitter.com/hikikomorinz/status/1420678509714833411",
  },
  [PomuItemId.COAL_POMU_SAND]: {
    src: coal_pomu_sand,
    size: psize(300, 300),
    source: "https://twitter.com/Coal/status/1397011258172272642",
  },
  [PomuItemId.MELONBREAD_POMU_COPTER]: {
    src: melonbread_pomu_copter,
    size: psize(300, 300),
    source: "https://twitter.com/MelonbreadFBP/status/1405559538284064772",
  },
  [PomuItemId.CHRONECO_POMU_JUMPING]: {
    src: chroneco_pomu_jumping,
    size: psize(300, 300),
    source: "https://twitter.com/chrone_co/status/1414492689286926337",
  },
  [PomuItemId.YOHO_POMU_BIRTHDAY]: {
    src: yoho_pomu_birthday,
    size: psize(300, 300),
    source: "https://twitter.com/Hyn_yoho/status/1414194171720593414",
  },
  [PomuItemId.SUMI_POMU_JAZZ]: {
    src: sumi_pomu_jazz,
    size: psize(200, 200),
    source: "https://twitter.com/suminoja/status/1477525490856517632",
  },
  [PomuItemId.CLAIREGUA_POMU_DUCK]: {
    src: clairegua_pomu_duck,
    size: psize(300, 300),
    source: "https://twitter.com/Claire_ovo/status/1564232056615288832",
  },
  [PomuItemId.WALFIE_POMU_CHIBI_7]: {
    src: walfie_pomu_chibi_7,
    size: psize(200, 200),
    source: "https://twitter.com/walfieee/status/1440899906634489856",
  },
  [PomuItemId.WALFIE_POMU_CHIBI_8]: {
    src: walfie_pomu_chibi_8,
    size: psize(200, 200),
    source: "https://twitter.com/walfieee/status/1447773462362210306",
  },
  [PomuItemId.COAL_POMU_JUMPING]: {
    src: coal_pomu_jumping,
    size: psize(300, 300),
    source: "https://twitter.com/Coal/status/1449841903365595140",
  },
  [PomuItemId.KRA_POMU_1]: {
    src: kra_pomu_1,
    size: psize(300, 300),
    source: "https://twitter.com/Shalesa_max/status/1460679032928833541",
  },
  [PomuItemId.KRA_POMU_BUBBLE_TEA]: {
    src: kra_pomu_bubble_tea,
    size: psize(300, 300),
    source: "https://twitter.com/Shalesa_max/status/1428790208972034051",
  },
  [PomuItemId.ROAMINGTUNA_POMU_2]: {
    src: roamingtuna_pomu_2,
    size: psize(300, 300),
    source: "https://twitter.com/roamingtuna/status/1432129480143691780",
  },
  [PomuItemId.KELPIEBOYE_POMU_1]: {
    src: kelpieboye_pomu_1,
    size: psize(300, 300),
    source: "https://www.reddit.com/r/Nijisanji/comments/w3ucsr/",
  },
  [PomuItemId.SUMI_POMU_WAVY_ARMS]: {
    src: sumi_pomu_wavy_arms,
    size: psize(160, 200),
    source: "https://twitter.com/suminoja/status/1440225623352299526",
  },
  [PomuItemId.SUMI_POMIES]: {
    src: sumi_pomies,
    size: psize(200, 160),
    source: "https://twitter.com/suminoja/status/1509006633648590849",
  },
  [PomuItemId.SUMI_POMU_POMPOM]: {
    src: sumi_pomu_pompom,
    size: psize(200, 160),
    source: "https://twitter.com/suminoja/status/1456542779836825603",
  },
  [PomuItemId.SUMI_POMU_POMUSKE]: {
    src: sumi_pomu_pomuske,
    size: psize(220, 160),
    source: "https://twitter.com/suminoja/status/1435122204253982722",
  },
  [PomuItemId.SUMI_POMU_NOT_SCARY]: {
    src: sumi_pomu_not_scary,
    size: psize(200, 160),
    source: "https://twitter.com/suminoja/status/1510499572203761668",
  },
  [PomuItemId.KAYYU_POMU_PIXEL]: {
    src: kayyu_pomu_pixel,
    size: psize(200, 170),
    source: "https://twitter.com/kaynimatic/status/1493463869368385540",
  },
  [PomuItemId.JAMESCHOO_POMU_TPOSE]: {
    src: jameschoo_pomu_tpose,
    size: psize(200, 200),
    source: "https://twitter.com/jameschoo_004/status/1432680740378988545",
  },
  [PomuItemId.KUKIENYAN_BONGOS]: {
    src: kukienyan_bongos,
    size: psize(382, 300),
    source: "https://twitter.com/kukie_nyan/status/1437899549998084100",
  },
  [PomuItemId.SUMI_POMU_FU]: {
    src: sumi_pomu_fu,
    size: psize(200, 160),
    source: "https://twitter.com/suminoja/status/1447400343151677442",
  },
  [PomuItemId.SUMI_POMU_PARTY]: {
    src: sumi_pomu_party,
    size: psize(200, 160),
    source: "https://twitter.com/suminoja/status/1452185809935867904",
  },
};

export type MakeTimelineFn = (selector: string) => gsap.core.Timeline;

export type AnimatedObjectGsap = {
  src: string;
  makeTimeline: MakeTimelineFn;
  props?: HTMLAttributes<HTMLDivElement>;
};

export const NO_TIMELINE = () => new gsap.core.Timeline();

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

export const OBJECT_GROUP_KEYS = [
  "bg",
  "bg_text",
  "original_pomus",
  "walfie_pomu_chibi_1",
  "walfie_pomu_chibi_2",
  "walfie_pomu_chibi_3",
  "walfie_finana_chibi_1",
  "walfie_pomu_chibi_3b",
  "walfie_pomu_chibis_1",
  "bg2",
  "pomu_loading",
] as const;

export type ObjectGroupKey = typeof OBJECT_GROUP_KEYS[number];

export type ObjectGroupGsap = ReadonlyArray<AnimatedObjectGsap>;

export const OBJECT_GROUPS_GSAP: { [key in ObjectGroupKey]: ObjectGroupGsap } =
  {
    // Background
    bg: [
      {
        src: bg,
        makeTimeline: NO_TIMELINE,
        props: {
          style: {
            ...ltdim(0, 0, 1920, 1080),
          },
        },
      },
    ],
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
    // https://twitter.com/suminoja/status/1425370317740855299
    // https://twitter.com/hikikomorinz/status/1420678509714833411
    // https://twitter.com/Coal/status/1396994013576634368
    // https://twitter.com/MelonbreadFBP/status/1405559538284064772
    // https://twitter.com/chrone_co/status/1414492689286926337
    // https://twitter.com/Hyn_yoho/status/1414194171720593414
    // Background
    bg2: [
      {
        src: bg2,
        makeTimeline: NO_TIMELINE,
        props: {
          style: {
            ...ltdim(0, 0, 1920, 1080),
          },
        },
      },
    ],
    pomu_loading: [
      {
        src: pomu_loading,
        makeTimeline: (selector: string): gsap.core.Timeline => {
          const tl = new gsap.core.Timeline({ repeat: -1 });
          tl.set(selector, { opacity: 0 });
          tl.to(selector, { opacity: 1, duration: 1 }, 0);
          tl.to(selector, { opacity: 0, duration: 1 }, 3.5);
          tl.set(selector, {}, 5);
          return tl;
        },
        props: {
          style: {
            ...ltdim(0, 0, 1920, 1080),
          },
        },
      },
    ],
  };

export const VERSIONS: ReadonlyArray<ReadonlyArray<ObjectGroupKey>> = [
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
