import { DragEvent, MouseEvent, TouchEvent, PointerEvent } from "react";

export type CursorEvent<T> =
  | DragEvent<T>
  | MouseEvent<T>
  | TouchEvent<T>
  | PointerEvent<T>;
