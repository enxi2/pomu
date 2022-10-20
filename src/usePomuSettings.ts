import { useState } from "react";

import { PomuBackground } from "./pomus/catalog";

export default function usePomuSettings(): {
  background: PomuBackground;
  setBackground: (background: PomuBackground) => void;
  snap: boolean;
  setSnap: (snap: boolean) => void;
} {
  const [background, setBackground] = useState<PomuBackground>(
    PomuBackground.CLASSIC
  );
  const [snap, setSnap] = useState<boolean>(false);

  return { background, setBackground, snap, setSnap };
}
