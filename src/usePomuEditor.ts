import { MutableRefObject, RefObject, useCallback, useRef } from "react";

import { POMU_ITEMS } from "./pomus/catalog";
import { PomuItem } from "./usePomuItems";
import { CursorEvent } from "./types";

export type PomuEditType = "select" | "translate" | "rotate" | "scale";

export type PomuEditAction = {
  index: number;
  type: PomuEditType;
  start: [number, number];
  translateOffset: [number, number];
  scaleCorner: [number, number];
};

const ASPECT = 16 / 9;
const MIN_SCALE = 0.1;

export default function usePomuEditor(
  editorRef: RefObject<HTMLDivElement>,
  itemsRef: MutableRefObject<PomuItem[]>,
  editItem: (index: number, update: Partial<PomuItem>) => void,
  snap: boolean
): {
  onEditStart: (
    event: CursorEvent<HTMLElement>,
    index: number,
    editType: PomuEditType
  ) => void;
  onEditMove: (event: CursorEvent<HTMLElement>) => void;
  onEditEnd: (event: CursorEvent<HTMLElement>) => void;
  onEditStop: (event: CursorEvent<HTMLElement>) => void;
  editActionRef: MutableRefObject<PomuEditAction | null>;
} {
  const editActionRef = useRef<PomuEditAction | null>(null);

  const onEditStart = useCallback(
    (
      event: CursorEvent<HTMLElement>,
      index: number,
      editType: PomuEditType
    ) => {
      if (editorRef.current == null) {
        return;
      }
      const item = itemsRef.current[index];
      if (item == null) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const x = "clientX" in event ? event.clientX : event.touches[0].clientX;
      const y = "clientY" in event ? event.clientY : event.touches[0].clientY;

      const editorRect = editorRef.current.getBoundingClientRect();
      const mouse: [number, number] = [
        (x - editorRect.left) / editorRect.width,
        (y - editorRect.top) / editorRect.height,
      ];
      const corner: [number, number] = [0, 0];
      const translateOffset: [number, number] = [
        mouse[0] - item.position[0],
        mouse[1] - item.position[1],
      ];
      if (editType === "scale") {
        const rotated = [
          Math.cos(-item.rotation) * translateOffset[0] -
            Math.sin(-item.rotation) * translateOffset[1],
          Math.sin(-item.rotation) * translateOffset[0] +
            Math.cos(-item.rotation) * translateOffset[1],
        ];
        const angle = Math.atan2(rotated[1], rotated[0]);
        if (angle < -Math.PI / 2) {
          corner[0] = -1;
          corner[1] = -1;
        } else if (angle < 0) {
          corner[0] = 1;
          corner[1] = -1;
        } else if (angle < Math.PI / 2) {
          corner[0] = 1;
          corner[1] = 1;
        } else {
          corner[0] = -1;
          corner[1] = 1;
        }
      }
      // Mutate the existing ref if the index matches
      if (editActionRef.current?.index === index) {
        editActionRef.current.type = editType;
        editActionRef.current.start = mouse;
        editActionRef.current.translateOffset = translateOffset;
        editActionRef.current.scaleCorner = corner;
      } else {
        editActionRef.current = {
          index,
          type: editType,
          start: mouse,
          translateOffset,
          scaleCorner: corner,
        };
      }
    },
    [editorRef, itemsRef]
  );

  const onEditMove = useCallback(
    (event: CursorEvent<HTMLElement>) => {
      if (editorRef.current == null || editActionRef.current == null) {
        return;
      }
      const item = itemsRef.current[editActionRef.current.index];
      if (item == null) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      const x = "clientX" in event ? event.clientX : event.touches[0].clientX;
      const y = "clientY" in event ? event.clientY : event.touches[0].clientY;

      const editorRect = editorRef.current.getBoundingClientRect();
      const shouldSnap = snap || event.shiftKey;
      const mouse: [number, number] = [
        (x - editorRect.left) / editorRect.width,
        (y - editorRect.top) / editorRect.height,
      ];
      switch (editActionRef.current.type) {
        case "translate":
          let x = mouse[0] - editActionRef.current.translateOffset[0];
          if (shouldSnap) {
            x = (Math.round((x * 1920) / 32) * 32) / 1920;
          }
          let y = mouse[1] - editActionRef.current.translateOffset[1];
          if (shouldSnap) {
            y = (Math.round((y * 1080) / 32) * 32) / 1080;
          }
          editItem(editActionRef.current.index, {
            position: [x, y],
          });
          break;
        case "scale":
          const def = POMU_ITEMS[item.id];
          const offset = [
            mouse[0] - item.position[0],
            mouse[1] - item.position[1],
          ];
          let rotation =
            Math.atan2(offset[1], offset[0] * ASPECT) -
            Math.atan2(
              editActionRef.current.scaleCorner[1] * def.size[1],
              editActionRef.current.scaleCorner[0] * def.size[0] * ASPECT
            );
          if (shouldSnap) {
            rotation = Math.round(rotation / (Math.PI / 36)) * (Math.PI / 36);
          }
          let scale = Math.max(
            (Math.sqrt(
              offset[0] * offset[0] * ASPECT * ASPECT + offset[1] * offset[1]
            ) /
              Math.sqrt(
                def.size[0] * def.size[0] * ASPECT * ASPECT +
                  def.size[1] * def.size[1]
              )) *
              2,
            MIN_SCALE
          );
          if (shouldSnap) {
            scale = Math.round(scale / MIN_SCALE) * MIN_SCALE;
          }
          editItem(editActionRef.current.index, {
            rotation,
            scale,
          });
          break;
        default:
          break;
      }
    },
    [editorRef, editItem, itemsRef, snap]
  );

  const onEditEnd = useCallback((event: CursorEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (editActionRef.current == null) {
      return;
    }
    editActionRef.current.type = "select";
  }, []);

  const onEditStop = useCallback((event: CursorEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    editActionRef.current = null;
  }, []);

  return { onEditStart, onEditMove, onEditEnd, onEditStop, editActionRef };
}
