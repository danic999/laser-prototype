"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories, floorTier, formatKm, type Category, type Product } from "@/lib/catalog";

export function CatalogView({
  products,
  title,
  intro,
  query = "",
  category,
  activeSub,
}: {
  products: Product[];
  title: string;
  intro?: string;
  query?: string;
  category?: Category;
  activeSub?: string;
}) {
  const [sort, setSort] = useState("preporuceno");
  const [stored, setStored] = useState<{
    key: string;
    print: string | null;
    range: { low: number; high: number } | null;
  } | null>(null);

  const priceBounds = useMemo(() => {
    if (products.length === 0) return null;
    const values = products.map((product) => floorTier(product).unit);
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [products]);

  const printChoices = useMemo(() => {
    const names = new Set<string>();
    for (const product of products) {
      for (const name of product.prints) {
        if (name !== "Bez tiska") names.add(name);
      }
    }
    return [...names];
  }, [products]);

  const filterKey = `${priceBounds?.min ?? "x"}|${priceBounds?.max ?? "x"}|${printChoices.join(",")}`;
  const print = stored?.key === filterKey ? stored.print : null;
  const range = stored?.key === filterKey ? stored.range : null;

  function setPrint(next: string | null) {
    setStored({ key: filterKey, print: next, range });
  }

  function setRange(next: { low: number; high: number } | null) {
    setStored({ key: filterKey, print, range: next });
  }

  const low = range?.low ?? priceBounds?.min ?? 0;
  const high = range?.high ?? priceBounds?.max ?? 0;

  const visible = useMemo(() => {
    let list = products.filter((product) => {
      const unit = floorTier(product).unit;
      const matchesPrint = !print || product.prints.includes(print);
      const matchesPrice = unit >= low - 0.001 && unit <= high + 0.001;
      return matchesPrint && matchesPrice;
    });
    if (sort === "cijena") {
      list = [...list].sort((a, b) => floorTier(a).unit - floorTier(b).unit);
    }
    if (sort === "naziv") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "bs"));
    }
    return list;
  }, [products, print, low, high, sort]);

  const priceMoved =
    priceBounds != null && (low > priceBounds.min + 0.001 || high < priceBounds.max - 0.001);
  const filtersActive = print != null || priceMoved;

  function resetFilters() {
    setStored({ key: filterKey, print: null, range: null });
  }

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="text-[12px] tracking-[-0.014em] text-[#787574]">Kategorije</p>
        <ul className="mt-2">
          {categories.map((item) => {
            const open = category?.slug === item.slug;
            return (
              <li key={item.slug}>
                <Link
                  href={`/kategorija/${item.slug}`}
                  className={`block py-1.5 text-[14px] leading-[1.3] tracking-[-0.014em] ${open ? "font-medium text-black" : "text-black/75 hover:text-black"}`}
                  aria-current={open && !activeSub ? "page" : undefined}
                >
                  {item.name}
                </Link>
                {open ? (
                  <ul className="mb-1 ml-3 border-l border-[#ebebeb] pl-3">
                    <li>
                      <Link
                        href={`/kategorija/${item.slug}`}
                        className={`block py-1 text-[14px] leading-[1.3] tracking-[-0.014em] ${!activeSub ? "font-medium text-black" : "text-[#787574] hover:text-black"}`}
                      >
                        Sve
                      </Link>
                    </li>
                    {item.subs.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={`/kategorija/${item.slug}/${sub.slug}`}
                          className={`block py-1 text-[14px] leading-[1.3] tracking-[-0.014em] ${activeSub === sub.slug ? "font-medium text-black" : "text-[#787574] hover:text-black"}`}
                          aria-current={activeSub === sub.slug ? "page" : undefined}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
      {printChoices.length > 0 ? (
        <div>
          <label htmlFor="tisak" className="text-[12px] tracking-[-0.014em] text-[#787574]">
            Tisak
          </label>
          <select
            id="tisak"
            value={print ?? ""}
            onChange={(event) => setPrint(event.target.value || null)}
            className="mt-2 h-9 w-full rounded-full border border-[#ebebeb] bg-white px-3 text-[14px] tracking-[-0.014em] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          >
            <option value="">Sve tehnike</option>
            {printChoices.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      {priceBounds && priceBounds.max > priceBounds.min ? (
        <PriceSlider
          min={priceBounds.min}
          max={priceBounds.max}
          low={low}
          high={high}
          onChange={(nextLow, nextHigh) => setRange({ low: nextLow, high: nextHigh })}
        />
      ) : null}
    </div>
  );

  return (
    <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto pr-1 [scrollbar-width:thin]">
          {filters}
        </div>
      </aside>
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">{title}</h1>
            {intro ? <p className="mt-2 max-w-2xl text-[16px] leading-[1.33] text-[#787574]">{intro}</p> : null}
            {query ? (
              <p className="mt-2 text-[16px] tracking-[-0.031em]">
                Upit: <span className="font-medium">{query}</span>
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 text-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:hidden">
                <SlidersHorizontal className="size-4" />
                Filteri
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto bg-white">
                <SheetHeader>
                  <SheetTitle className="tracking-[-0.03em]">Filteri</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6">{filters}</div>
              </SheetContent>
            </Sheet>
            <label className="text-[14px]">
              <span className="sr-only">Sortiranje</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-10 rounded-full border border-[#ebebeb] bg-white px-4 tracking-[-0.014em] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <option value="preporuceno">Preporučeno</option>
                <option value="cijena">Cijena, od niže</option>
                <option value="naziv">Naziv</option>
              </select>
            </label>
          </div>
        </div>
        <p className="mt-4 text-[14px] text-[#787574]">
          {visible.length} artikala
          {filtersActive ? (
            <button type="button" onClick={resetFilters} className="ml-3 text-black underline-offset-2 hover:underline">
              Poništi
            </button>
          ) : null}
        </p>
        {visible.length === 0 ? (
          <div className="mt-8 rounded-[28px] bg-white px-6 py-16 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <p className="font-medium tracking-[-0.02em]">Nema artikala za ovaj odabir.</p>
            <p className="mt-2 text-[14px] text-[#787574]">Probaj širi raspon cijene ili drugu tehniku tiska.</p>
            <Button className="mt-4" variant="outline" onClick={resetFilters}>
              Poništi filtere
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PriceSlider({
  min,
  max,
  low,
  high,
  onChange,
}: {
  min: number;
  max: number;
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
}) {
  const step = stepFor(min, max);
  const span = max - min || 1;
  const left = ((low - min) / span) * 100;
  const right = 100 - ((high - min) / span) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[12px] tracking-[-0.014em] text-[#787574]">Cijena</p>
        <p className="text-[14px] tracking-[-0.014em]">
          {formatKm(low)} – {formatKm(high)}
        </p>
      </div>
      <div className="relative mt-4 h-4">
        <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 rounded-full bg-[#ebebeb]" />
        <div
          className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${left}%`, right: `${right}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          aria-label="Najniža cijena"
          onChange={(event) => onChange(Math.min(Number(event.target.value), high), high)}
          className="range-thumb z-10"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          aria-label="Najviša cijena"
          onChange={(event) => onChange(low, Math.max(Number(event.target.value), low))}
          className="range-thumb z-20"
        />
      </div>
    </div>
  );
}

function stepFor(min: number, max: number) {
  const span = max - min;
  if (span > 50) return 1;
  if (span > 10) return 0.1;
  return 0.01;
}
