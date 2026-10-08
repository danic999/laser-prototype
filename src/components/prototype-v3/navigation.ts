export type View =
  | { page: "home" }
  | { page: "categories" }
  | { page: "listing"; query?: string; saleOnly?: boolean }
  | { page: "product"; id: string }
  | { page: "cart" };

export type Navigate = (view: View) => void;
