"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "cn";
import { printMethods } from "./data";
import { CartPage, type CartLine } from "./cart-page";
import { HomePage } from "./home-page";
import { ListingPage } from "./listing-page";
import type { Navigate, View } from "./navigation";
import { ProductPage, type AddToCart } from "./product-page";
import { montserrat } from "./shared";
import { V2Footer } from "./v2-footer";
import { V2Header } from "./v2-header";

// The basket from the Figma "Cart" frame, so the prototype opens in the designed state.
const initialCart: CartLine[] = [
  { key: "athos:#1F264C:digital", productId: "athos", colour: "#1F264C", print: "digital", printSize: "50 × 7 mm", qty: 1000, unitPrice: 0.09 },
  { key: "sirius:#4F7A5E:pad", productId: "sirius", colour: "#4F7A5E", print: "pad", printSize: "40 × 20 mm", qty: 100, unitPrice: 1.42 },
];

export function PrototypeV2() {
  const [view, setView] = useState<View>({ page: "home" });
  const pendingAnchor = useRef<string | null>(null);
  const [cart, setCart] = useState<CartLine[]>(initialCart);

  const navigate = useCallback<Navigate>((next, anchor) => {
    pendingAnchor.current = anchor ?? null;
    setView(next);
    if (!anchor) window.scrollTo({ top: 0 });
  }, []);

  // Scroll once the new screen has rendered the anchor target.
  useEffect(() => {
    if (!pendingAnchor.current) return;
    document.getElementById(pendingAnchor.current)?.scrollIntoView({ behavior: "smooth" });
    pendingAnchor.current = null;
  }, [view]);

  const addToCart = useCallback<AddToCart>(
    (line) => {
      const key = `${line.productId}:${line.colour}:${line.print}`;
      const printSize = printMethods.find((method) => method.id === line.print)?.size ?? "";
      setCart((current) => {
        const existing = current.find((item) => item.key === key);
        if (!existing) return [...current, { ...line, key, printSize }];
        return current.map((item) => (item.key === key ? { ...item, qty: item.qty + line.qty, unitPrice: line.unitPrice } : item));
      });
      navigate({ page: "cart" });
    },
    [navigate],
  );

  const updateQty = (key: string, qty: number) =>
    setCart((current) => current.map((item) => (item.key === key ? { ...item, qty } : item)));
  const removeLine = (key: string) => setCart((current) => current.filter((item) => item.key !== key));

  return (
    <div className={cn(montserrat.variable, "min-h-screen bg-white font-v2 text-v2-ink antialiased")}>
      <V2Header key={view.page === "listing" ? `listing:${view.query ?? ""}` : view.page} view={view} cartCount={cart.length} navigate={navigate} />
      {view.page === "home" ? <HomePage navigate={navigate} /> : null}
      {view.page === "listing" ? <ListingPage key={view.query ?? ""} query={view.query} navigate={navigate} /> : null}
      {view.page === "product" ? <ProductPage key={view.id} id={view.id} navigate={navigate} onAdd={addToCart} /> : null}
      {view.page === "cart" ? <CartPage lines={cart} onQty={updateQty} onRemove={removeLine} navigate={navigate} /> : null}
      <V2Footer navigate={navigate} />
    </div>
  );
}
