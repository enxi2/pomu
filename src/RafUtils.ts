import { MutableRefObject, useEffect, useState } from "react";

export function useRefMemo<T, U>(
  callback: (value: T) => U,
  ref: MutableRefObject<T>
): U {
  const [state, setState] = useState<U>(() => callback(ref.current));

  useEffect(() => {
    let lastValue = ref.current;
    setState(callback(lastValue));
    let handle = -1;
    let running = true;

    const loop = () => {
      if (!running) {
        return;
      }
      handle = requestAnimationFrame(loop);

      const newValue = ref.current;
      if (newValue !== lastValue) {
        const newState = callback(newValue);
        lastValue = newValue;
        setState(newState);
      }
    };

    handle = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(handle);
      running = false;
    };
  }, [callback, ref]);

  return state;
}

export function useRaf(callback: () => void): void {
  useEffect(() => {
    let handle = -1;
    let running = true;

    const loop = () => {
      if (!running) {
        return;
      }
      handle = requestAnimationFrame(loop);
      callback();
    };

    loop();

    return () => {
      cancelAnimationFrame(handle);
      running = false;
    };
  }, [callback]);
}
