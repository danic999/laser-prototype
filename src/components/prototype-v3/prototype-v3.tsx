"use client";

import { useCallback, useState } from "react";
import { cn } from "cn";
import { breakFor, findProduct } from "./data";
import { CartPage, type CartLine } from "./cart-page";
import { CategoriesPage } from "./categories-page";
import { HomePage } from "./home-page";
import { ListingPage } from "./listing-page";
import type { Navigate, View } from "./navigation";
import { ProductPage, type AddToCart } from "./product-page";
import { montserrat } from "./shared";
import { V3Footer } from "./v3-footer";
import { V3Header } from "./v3-header";

// The basket from the Figma "Cart" frame, so the prototype opens in the designed state.
const initialCart: CartLine[] = [
  { key: "k002-s:Silver", productId: "k002-s", colour: "Silver", qty: 100, unitPrice: 1.85 },
  { key: "sm-405:", productId: "sm-405", qty: 80, unitPrice: 3.4 },
];

const QUICK_ADD_QTY = 100;

export function PrototypeV3() {
  const [view, setView] = useState<View>({ page: "home" });
  const [cart, setCart] = useState<CartLine[]>(initialCart);

  const navigate = useCallback<Navigate>((next) => {
    setView(next);
    window.scrollTo({ top: 0 });
  }, []);

  const addToCart = useCallback<AddToCart>(
    (line) => {
      const key = `${line.productId}:${line.colour ?? ""}`;
      setCart((current) => {
        const existing = current.find((item) => item.key === key);
        if (!existing) return [...current, { ...line, key }];
        return current.map((item) => (item.key === key ? { ...item, qty: item.qty + line.qty, unitPrice: line.unitPrice } : item));
      });
      navigate({ page: "cart" });
    },
    [navigate],
  );

  const quickAdd = (productId: string) => {
    const product = findProduct(productId);
    addToCart({ productId, colour: product.colours[0]?.name, qty: QUICK_ADD_QTY, unitPrice: breakFor(product, QUICK_ADD_QTY).price });
  };

  const updateQty = (key: string, qty: number) => setCart((current) => current.map((item) => (item.key === key ? { ...item, qty } : item)));
  const removeLine = (key: string) => setCart((current) => current.filter((item) => item.key !== key));
  const viewKey = view.page === "listing" ? `listing:${view.query ?? ""}:${view.saleOnly ? 1 : 0}` : view.page === "product" ? `product:${view.id}` : view.page;

  return (
    <div className={cn(montserrat.variable, "flex min-h-screen flex-col bg-v3-page font-v3 text-v3-ink antialiased [&>main]:flex-1")}>
      <V3Header key={`header:${viewKey}`} view={view} cartCount={cart.length} navigate={navigate} />
      {view.page === "home" ? <HomePage navigate={navigate} onQuickAdd={quickAdd} /> : null}
      {view.page === "categories" ? <CategoriesPage navigate={navigate} /> : null}
      {view.page === "listing" ? <ListingPage key={viewKey} query={view.query} saleOnly={view.saleOnly} navigate={navigate} /> : null}
      {view.page === "product" ? <ProductPage key={viewKey} id={view.id} navigate={navigate} onAdd={addToCart} /> : null}
      {view.page === "cart" ? <CartPage lines={cart} onQty={updateQty} onRemove={removeLine} navigate={navigate} /> : null}
      <V3Footer navigate={navigate} />
    </div>
  );
}
