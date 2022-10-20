import { MutableRefObject, useCallback, useMemo, useRef } from "react";

import {
  ObjectGroupGsap,
  OBJECT_GROUPS_GSAP,
  PomuBackground,
  PomuItemId,
} from "./pomus/catalog";

export type PomuBackgroundItem = {
  group: ObjectGroupGsap;
  position: [u: number, v: number];
};

export function makeBackground(
  background: PomuBackground
): PomuBackgroundItem[] {
  switch (background) {
    case PomuBackground.CLASSIC:
      return [
        { group: OBJECT_GROUPS_GSAP["bg"], position: [0, 0] },
        { group: OBJECT_GROUPS_GSAP["bg_text"], position: [0, 0] },
        { group: OBJECT_GROUPS_GSAP["original_pomus"], position: [0, 0] },
      ];
    case PomuBackground.POMU_LOADING:
      return [
        { group: OBJECT_GROUPS_GSAP["bg2"], position: [0, 0] },
        { group: OBJECT_GROUPS_GSAP["pomu_loading"], position: [0, 0] },
      ];
  }
}

export type PomuItem = {
  id: PomuItemId;
  position: [u: number, v: number];
  rotation: number;
  scale: number;
};

// TODO initialItems parameter
export default function usePomuItems(): {
  itemsRef: MutableRefObject<PomuItem[]>;
  availableItems: PomuItemId[];
  addItem: (item: PomuItem) => void;
  editItem: (index: number, update: Partial<PomuItem>) => void;
  deleteItem: (index: number) => void;
  clearAll: () => void;
} {
  const itemsRef = useRef<PomuItem[]>([]);

  const availableItems = useMemo(
    (): PomuItemId[] => [
      PomuItemId.WALFIE_POMU_CHIBI_1,
      PomuItemId.WALFIE_POMU_CHIBI_2,
      PomuItemId.WALFIE_POMU_CHIBI_3,
      PomuItemId.WALFIE_POMU_CHIBI_4,
      PomuItemId.WALFIE_POMU_CHIBI_5,
      PomuItemId.WALFIE_POMU_CHIBI_6,
      PomuItemId.WALFIE_FINANA_CHIBI_1,
      PomuItemId.ROAMINGTUNA_POMU_1,
      PomuItemId.SUMI_POMU_POPCORN,
      PomuItemId.RINRINZ_POMU_SLEEPING,
      PomuItemId.COAL_POMU_SAND,
      PomuItemId.MELONBREAD_POMU_COPTER,
      PomuItemId.CHRONECO_POMU_JUMPING,
      PomuItemId.SUMI_POMU_JAZZ,
      PomuItemId.CLAIREGUA_POMU_DUCK,
      PomuItemId.WALFIE_POMU_CHIBI_7,
      PomuItemId.WALFIE_POMU_CHIBI_8,
      PomuItemId.COAL_POMU_JUMPING,
      PomuItemId.KRA_POMU_1,
      PomuItemId.KRA_POMU_BUBBLE_TEA,
      PomuItemId.ROAMINGTUNA_POMU_2,
      PomuItemId.KELPIEBOYE_POMU_1,
      PomuItemId.SUMI_POMU_WAVY_ARMS,
      PomuItemId.SUMI_POMIES,
      PomuItemId.SUMI_POMU_POMPOM,
      PomuItemId.SUMI_POMU_POMUSKE,
      PomuItemId.SUMI_POMU_NOT_SCARY,
      PomuItemId.KAYYU_POMU_PIXEL,
      PomuItemId.JAMESCHOO_POMU_TPOSE,
      PomuItemId.KUKIENYAN_BONGOS,
      PomuItemId.SUMI_POMU_FU,
      PomuItemId.SUMI_POMU_PARTY,
    ],
    []
  );

  const addItem = useCallback((item: PomuItem) => {
    itemsRef.current = itemsRef.current.concat([item]);
  }, []);

  const editItem = useCallback((index: number, update: Partial<PomuItem>) => {
    const item = itemsRef.current[index];
    if (item == null) {
      console.warn(`Cannot move: unknown index (index=${index})`);
      return;
    }

    if (update.position != null) {
      item.position = update.position;
    }
    if (update.rotation != null) {
      item.rotation = update.rotation;
    }
    if (update.scale != null) {
      item.scale = update.scale;
    }
  }, []);

  const deleteItem = useCallback((index: number) => {
    itemsRef.current.splice(index, 1);
    itemsRef.current = [...itemsRef.current];
  }, []);

  const clearAll = useCallback(() => {
    itemsRef.current = [];
  }, []);

  return {
    itemsRef,
    availableItems,
    addItem,
    editItem,
    deleteItem,
    clearAll,
  };
}
