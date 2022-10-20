import { encode, decode } from "base64-arraybuffer";

import { PomuBackground } from "./pomus/catalog";
import { PomuItem } from "./usePomuItems";

const VERSION = 1;

function floatToShort(range: number, x: number): number {
  const short = Math.round(
    (Math.max(Math.min(x, range), -range) * 32767) / range
  );
  return short;
}

function shortToFloat(range: number, x: number): number {
  return (x * range) / 32767;
}

function parseBackground(x: number): PomuBackground {
  if (x < 0 || x > PomuBackground.POMU_LOADING) {
    throw new Error(`Unknown background ${x}`);
  }
  return x as PomuBackground;
}

function serializeItem(item: PomuItem): number[] {
  return [
    item.id,
    floatToShort(2, item.position[0]),
    floatToShort(2, item.position[1]),
    floatToShort(7, item.rotation),
    floatToShort(20, item.scale),
  ];
}

function parseItem(array: Int16Array, index: number): PomuItem {
  return {
    id: array[index + 0],
    position: [
      shortToFloat(2, array[index + 1]),
      shortToFloat(2, array[index + 2]),
    ],
    rotation: shortToFloat(7, array[index + 3]),
    scale: shortToFloat(20, array[index + 4]),
  };
}

export function serialize(
  background: PomuBackground,
  items: PomuItem[]
): string {
  const array = new Int16Array([
    VERSION,
    background,
    ...items.flatMap((item) => serializeItem(item)),
  ]);
  return encode(array.buffer);
}
export function deserialize(encoded: string): {
  background: PomuBackground;
  items: PomuItem[];
} {
  const buffer = decode(encoded);
  const array = new Int16Array(buffer);
  if (array.length < 2) {
    throw new Error("No data");
  }
  const version = array[0];
  if (version !== VERSION) {
    throw new Error(`Unsupported version ${version}`);
  }
  const background = parseBackground(array[1]);

  const items: PomuItem[] = [];
  let index = 2;
  while (index + 4 < array.length) {
    items.push(parseItem(array, index));
    index += 5;
  }
  return { background, items };
}
