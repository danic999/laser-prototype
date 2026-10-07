"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export type CartLine = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  image: string;
  colorName: string;
  print: string;
  location: string;
  qty: number;
  logo: string | null;
};

type CartContextValue = {
  items: CartLine[];
  count: number;
  addItem: (line: Omit<CartLine, "id">) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "laser-cart";
const serverItems: CartLine[] = [];
const listeners = new Set<() => void>();
let snapshot: CartLine[] = serverItems;
let hydrated = false;

function lineId(line: Pick<CartLine, "slug" | "colorName" | "print" | "location">) {
  return [line.slug, line.colorName, line.print, line.location].join("|");
}

function readStored() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return serverItems;
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : serverItems;
  } catch {
    return serverItems;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (!hydrated) {
    hydrated = true;
    snapshot = readStored();
  }
  return snapshot;
}

function commit(next: CartLine[]) {
  snapshot = next;
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    // A large logo can exceed the browser limit. The cart still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => serverItems);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.length,
      addItem(line) {
        const id = lineId(line);
        const existing = items.find((item) => item.id === id);
        const next = existing
          ? items.map((item) =>
              item.id === id
                ? { ...item, qty: item.qty + line.qty, logo: line.logo ?? item.logo, image: line.image }
                : item,
            )
          : [...items, { ...line, id }];
        commit(next);
      },
      setQty(id, qty) {
        commit(items.map((item) => (item.id === id ? { ...item, qty } : item)));
      },
      removeItem(id) {
        commit(items.filter((item) => item.id !== id));
      },
      clear() {
        commit([]);
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Košarica nije dostupna.");
  return value;
}
