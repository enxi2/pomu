import { MutableRefObject, RefObject, useCallback, useRef } from "react";

import { PomuItemId } from "./pomus/catalog";
import { PomuItem } from "./usePomuItems";
import { CursorEvent } from "./types";

export default function usePomuToolbox(
  editorRef: RefObject<HTMLDivElement>,
  addItem: (item: PomuItem) => void
): {
  onDragStart: (event: CursorEvent<HTMLElement>, id: PomuItemId) => void;
  onDragMove: (event: CursorEvent<HTMLElement>) => void;
  onDragStop: (event: CursorEvent<HTMLElement>) => void;
  tempItemRef: MutableRefObject<PomuItem | null>;
} {
  const tempItemRef = useRef<PomuItem | null>(null);

  const onDragStart = useCallback(
    (event: CursorEvent<HTMLElement>, id: PomuItemId) => {
      if (editorRef.current == null) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      const x = "clientX" in event ? event.clientX : event.touches[0].clientX;
      const y = "clientY" in event ? event.clientY : event.touches[0].clientY;

      const editorRect = editorRef.current.getBoundingClientRect();
      tempItemRef.current = {
        id,
        position: [
          (x - editorRect.left) / editorRect.width,
          (y - editorRect.top) / editorRect.height,
        ],
        rotation: 0,
        scale: 1,
      };
    },
    [editorRef]
  );

  const onDragMove = useCallback(
    (event: CursorEvent<HTMLElement>) => {
      if (editorRef.current == null || tempItemRef.current == null) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      const x = "clientX" in event ? event.clientX : event.touches[0].clientX;
      const y = "clientY" in event ? event.clientY : event.touches[0].clientY;

      const editorRect = editorRef.current.getBoundingClientRect();
      tempItemRef.current.position[0] =
        (x - editorRect.left) / editorRect.width;
      tempItemRef.current.position[1] =
        (y - editorRect.top) / editorRect.height;
    },
    [editorRef]
  );

  const onDragStop = useCallback(
    (event: CursorEvent<HTMLElement>) => {
      if (editorRef.current == null || tempItemRef.current == null) {
        return;
      }
      const x = "clientX" in event ? event.clientX : event.touches[0].clientX;
      const y = "clientY" in event ? event.clientY : event.touches[0].clientY;

      const editorRect = editorRef.current.getBoundingClientRect();
      if (
        editorRect.left <= x &&
        x <= editorRect.right &&
        editorRect.top <= y &&
        y <= editorRect.bottom
      ) {
        addItem(tempItemRef.current);
      }
      tempItemRef.current = null;
    },
    [editorRef, addItem]
  );

  return { onDragStart, onDragMove, onDragStop, tempItemRef };
}
