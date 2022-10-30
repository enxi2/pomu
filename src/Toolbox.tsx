import { useCallback } from "react";

import { PomuBackground, PomuItemId, POMU_ITEMS } from "./pomus/catalog";
import { CursorEvent } from "./types";

import styles from "./Toolbox.module.scss";

function Checkbox(props: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) {
  const { checked, setChecked } = props;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.currentTarget.checked)}
    />
  );
}

interface ToolboxProps {
  availableItems: PomuItemId[];
  clearAll: () => void;
  onDragStart: (event: CursorEvent<HTMLDivElement>, id: PomuItemId) => void;
  onEditStop: (event: CursorEvent<HTMLElement>) => void;
  background: PomuBackground;
  setBackground: (background: PomuBackground) => void;
  snap: boolean;
  setSnap: (snap: boolean) => void;
}

export default function Toolbox(props: ToolboxProps): JSX.Element {
  const {
    availableItems,
    onDragStart,
    onEditStop,
    background,
    setBackground,
    snap,
    setSnap,
    clearAll,
  } = props;

  const confirmClearAll = useCallback(() => {
    const confirm = window.confirm(
      "Are you SURE you want to clear all the Pomus?"
    );
    if (confirm) {
      clearAll();
    }
  }, [clearAll]);
  return (
    <div className={styles.toolbox}>
      <div className={styles.options}>
        <label title="prior to the Fateful Findings watchalong stream">
          <Checkbox
            checked={background === PomuBackground.CLASSIC}
            setChecked={(checked: boolean) =>
              setBackground(
                checked ? PomuBackground.CLASSIC : PomuBackground.POMU_LOADING
              )
            }
          />
          Classic Background
        </label>
        <label>
          <Checkbox checked={snap} setChecked={setSnap} />
          Snap (shift)
        </label>
        <button onClick={confirmClearAll}>Clear all</button>
      </div>
      <div className={styles.itemsDrawer}>
        <p>Click and drag into the editor</p>
        {availableItems.map((id) => (
          <div key={id} className={styles.item}>
            <img
              key={id}
              src={POMU_ITEMS[id].src}
              alt=""
              onPointerDown={(e) => {
                onDragStart(e, id);
                onEditStop(e);
              }}
              style={{ touchAction: "none" }}
            />
            <a href={POMU_ITEMS[id].source} target="_blank" rel="noreferrer">
              source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
