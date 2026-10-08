export type View =
  | { page: "home" }
  | { page: "listing"; query?: string }
  | { page: "product"; id: string }
  | { page: "cart" };

/** Switches the v2 screen; `anchor` scrolls to an element id on the new screen. */
export type Navigate = (view: View, anchor?: string) => void;
