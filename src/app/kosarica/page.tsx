import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = { title: "Košarica" };

export default function CartPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <CartView />
    </main>
  );
}
