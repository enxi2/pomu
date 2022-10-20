import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import useSize from "@react-hook/size";
import cx from "classnames";
import gsap from "gsap";
import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { MakeTimelineFn, PomuBackground, POMU_ITEMS } from "./pomus/catalog";
import { useRaf, useRefMemo } from "./RafUtils";
import { PomuEditAction, PomuEditType } from "./usePomuEditor";
import { makeBackground, PomuItem } from "./usePomuItems";
import { CursorEvent } from "./types";

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
  editorRef: RefObject<HTMLDivElement>;
  background: PomuBackground;
  itemsRef: MutableRefObject<PomuItem[]>;
  editActionRef: MutableRefObject<PomuEditAction | null>;
  tempItemRef: MutableRefObject<PomuItem | null>;
  onEditStart: (
    event: CursorEvent<HTMLElement>,
    index: number,
    editType: PomuEditType
  ) => void;
  onEditEnd: (event: CursorEvent<HTMLElement>) => void;
  onEditStop: (event: CursorEvent<HTMLElement>) => void;
  deleteItem: (index: number) => void;
}

export default function Stage(props: StageProps): JSX.Element {
  const {
    editorRef,
    background,
    itemsRef,
    editActionRef,
    tempItemRef,
    onEditStart,
    onEditEnd,
    onEditStop,
    deleteItem,
  } = props;

  const timeline = useRef<gsap.core.Timeline>(new gsap.core.Timeline());
  const containerRef = useRef<HTMLDivElement>(null);

  const [width, height] = useSize(containerRef);

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

  const foregroundNodes = useRefMemo(
    useCallback(
      (items: PomuItem[]): RenderedNode[] => {
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
                onPointerDown={(e) => {
                  onEditStart(e, itemIndex, "translate");
                }}
              >
                <img src={POMU_ITEMS[item.id].src} alt="Pomu" />
              </div>
            ),
            timelineFn: null,
          };
        });
      },
      [onEditStart]
    ),
    itemsRef
  );

  const editNode = useRefMemo(
    useCallback(
      (editAction: PomuEditAction | null): JSX.Element | null => {
        if (editAction == null) {
          return null;
        }

        const item = itemsRef.current[editAction.index];
        if (item == null) {
          return null;
        }

        const id = "edit";
        return (
          <div
            key={id}
            id={id}
            className={cx(styles.editKnobs, styles.draggable)}
            style={{ ...getStyles(item) }}
            onPointerDown={(e) => {
              onEditStart(e, editAction.index, "translate");
            }}
            onPointerUp={onEditEnd}
          >
            <div
              className={cx(styles.scale, styles.corner0, styles.draggable)}
              onPointerDown={(e) => onEditStart(e, editAction.index, "scale")}
            ></div>
            <div
              className={cx(styles.scale, styles.corner1, styles.draggable)}
              onPointerDown={(e) => onEditStart(e, editAction.index, "scale")}
            ></div>
            <div
              className={cx(styles.scale, styles.corner2, styles.draggable)}
              onPointerDown={(e) => onEditStart(e, editAction.index, "scale")}
            ></div>
            <div
              className={cx(styles.scale, styles.corner3, styles.draggable)}
              onPointerDown={(e) => onEditStart(e, editAction.index, "scale")}
            ></div>
            <div
              className={cx(styles.delete)}
              onPointerDown={(e) => {
                deleteItem(editAction.index);
                onEditStop(e);
              }}
            >
              <TrashIcon />
            </div>
          </div>
        );
      },
      [itemsRef, onEditStart, onEditEnd, onEditStop, deleteItem]
    ),
    editActionRef
  );

  const tempNode = useRefMemo(
    useCallback((item: PomuItem | null): RenderedNode | null => {
      if (item == null) {
        return null;
      }
      const id = "temp";
      return {
        domId: id,
        element: (
          <div
            key={id}
            id={id}
            className={styles.tempObject}
            style={{ ...getStyles(item) }}
          >
            <img src={POMU_ITEMS[item.id].src} alt="Pomu" />
          </div>
        ),
        timelineFn: null,
      };
    }, []),
    tempItemRef
  );

  const [adjustedWidth, adjustedHeight] = useMemo(() => {
    if (width / height > 16 / 9) {
      return [(height * 16) / 9, height];
    } else {
      return [width, (width * 9) / 16];
    }
  }, [width, height]);

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

  // Foreground nodes
  useRaf(
    useCallback(() => {
      for (let i = 0; i < itemsRef.current.length; i++) {
        const item = itemsRef.current[i];
        const node = foregroundNodes[i];
        if (item == null || node == null) {
          continue;
        }
        const domElement = document.getElementById(node.domId);
        if (domElement == null) {
          continue;
        }

        const styles = getStyles(item);
        for (const style in styles) {
          (domElement.style as any)[style] = styles[style];
        }
      }
    }, [foregroundNodes, itemsRef])
  );

  // Edit node when modifying objects
  useRaf(
    useCallback(() => {
      if (editActionRef.current == null) {
        return;
      }
      const item = itemsRef.current[editActionRef.current.index];
      if (item == null) {
        return;
      }
      const domElement = document.getElementById("edit");
      if (domElement == null) {
        return;
      }

      const styles = getStyles(item);
      for (const style in styles) {
        (domElement.style as any)[style] = styles[style];
      }
    }, [editActionRef, itemsRef])
  );

  // Temp node when dragging in new objects
  useRaf(
    useCallback(() => {
      if (tempItemRef.current != null && tempNode != null) {
        const domElement = document.getElementById(tempNode.domId);
        if (domElement != null) {
          const styles = getStyles(tempItemRef.current);
          for (const style in styles) {
            (domElement.style as any)[style] = styles[style];
          }
        }
      }
    }, [tempNode, tempItemRef])
  );

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onPointerDown={(e) => {
        onEditStop(e);
      }}
    >
      <div
        className={styles.stage}
        style={{
          width: `${adjustedWidth}px`,
          height: `${adjustedHeight}px`,
        }}
        ref={editorRef}
      >
        <div className={styles.background}>
          {backgroundNodes.map((node) => node.element)}
        </div>
        <div
          className={styles.foreground}
          onPointerDown={(e) => {
            onEditStop(e);
          }}
        >
          {foregroundNodes.map((node) => node.element)}
        </div>
        {editNode}
        {tempNode?.element}
      </div>
    </div>
  );
}
