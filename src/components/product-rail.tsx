"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";

export function ProductRail({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  function measure() {
    const el = scroller.current;
    if (!el) return;
    const count = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    const current = Math.round(el.scrollLeft / el.clientWidth);
    setPages(count);
    setPage(Math.min(current, count - 1));
  }

  useEffect(() => {
    measure();
  }, [products.length]);

  function move(direction: number) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scroller}
        onScroll={measure}
        className="flex snap-x snap-mandatory gap-px overflow-x-auto [scrollbar-width:none]"
      >
        {products.map((product) => (
          <div key={product.slug} className="w-[calc(50%-1px)] shrink-0 snap-start sm:w-[calc(33.33%-1px)] lg:w-[calc(25%-1px)]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Prethodni artikli"
          onClick={() => move(-1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-bass bg-white"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: pages }).map((_, index) => (
            <span key={index} className={`size-1.5 rounded-full ${index === page ? "bg-bass" : "bg-steel"}`} />
          ))}
        </div>
        <button
          type="button"
          aria-label="Sljedeći artikli"
          onClick={() => move(1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-bass bg-white"
        >
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
