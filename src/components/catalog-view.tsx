"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
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

type FilterSelection = {
  prints: string[];
  inStock: boolean;
  range: { low: number; high: number } | null;
};

const emptyFilters: FilterSelection = { prints: [], inStock: false, range: null };

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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menu, setMenu] = useState<"sort" | "cijena" | "tisak" | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [stored, setStored] = useState<{
    key: string;
    draft: FilterSelection;
    applied: FilterSelection;
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
  const draft = stored?.key === filterKey ? stored.draft : emptyFilters;
  const applied = stored?.key === filterKey ? stored.applied : emptyFilters;
  const pending = !sameFilters(draft, applied);

  function updateDraft(next: FilterSelection) {
    setStored({ key: filterKey, draft: normalizeFilters(next, priceBounds), applied });
  }

  function applyFilters() {
    setStored({ key: filterKey, draft, applied: draft });
    setMenu(null);
    setSheetOpen(false);
  }

  const visible = useMemo(() => {
    let list = products.filter((product) => matchesFilters(product, applied, priceBounds));
    if (sort === "cijena") {
      list = [...list].sort((a, b) => floorTier(a).unit - floorTier(b).unit);
    }
    if (sort === "naziv") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "bs"));
    }
    return list;
  }, [products, applied, priceBounds, sort]);

  const pendingCount = useMemo(
    () => products.filter((product) => matchesFilters(product, draft, priceBounds)).length,
    [products, draft, priceBounds],
  );

  const filtersActive = !sameFilters(applied, emptyFilters);

  useEffect(() => {
    if (!menu) return;
    function onPointerDown(event: PointerEvent) {
      if (!barRef.current?.contains(event.target as Node)) setMenu(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menu]);

  function resetFilters() {
    setStored({ key: filterKey, draft: emptyFilters, applied: emptyFilters });
  }

  const chip =
    "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-[#ebebeb] bg-white px-4 text-[14px] tracking-[-0.014em] whitespace-nowrap text-black shadow-[0_2px_8px_rgba(0,0,0,0.06)]";
  const chipOn =
    "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-black bg-black px-4 text-[14px] tracking-[-0.014em] whitespace-nowrap text-white";
  const popover =
    "absolute top-12 left-0 z-20 rounded-[20px] border border-[#ebebeb] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]";
  const sortLabel = sort === "cijena" ? "Cijena, od niže" : sort === "naziv" ? "Naziv" : "Sortiraj";
  const priceLabel = draft.range ? `${formatKm(draft.range.low)} – ${formatKm(draft.range.high)}` : "Cijena";

  const filterPanel = (
    <div ref={barRef} className="mt-5 flex flex-wrap items-center gap-2">
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenu((current) => (current === "sort" ? null : "sort"))}
          className={sort === "preporuceno" ? chip : chipOn}
          aria-expanded={menu === "sort"}
        >
          {sortLabel}
          <ChevronDown className={`size-4 ${menu === "sort" ? "rotate-180" : ""}`} />
        </button>
        {menu === "sort" ? (
          <div className={`${popover} w-52 p-2`} role="listbox" aria-label="Sortiranje">
            {(
              [
                ["preporuceno", "Sortiraj"],
                ["cijena", "Cijena, od niže"],
                ["naziv", "Naziv"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={sort === value}
                onClick={() => {
                  setSort(value);
                  setMenu(null);
                }}
                className={`block w-full rounded-full px-3 py-2 text-left text-[14px] tracking-[-0.014em] ${sort === value ? "bg-black text-white" : "hover:bg-[#f2f4f5]"}`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => updateDraft({ ...draft, inStock: !draft.inStock })}
        className={draft.inStock ? chipOn : chip}
        aria-pressed={draft.inStock}
      >
        Na zalihi
      </button>
      {priceBounds && priceBounds.max > priceBounds.min ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenu((current) => (current === "cijena" ? null : "cijena"))}
            className={draft.range ? chipOn : chip}
            aria-expanded={menu === "cijena"}
          >
            {priceLabel}
            <ChevronDown className={`size-4 ${menu === "cijena" ? "rotate-180" : ""}`} />
          </button>
          {menu === "cijena" ? (
            <div className={`${popover} w-72 p-4`}>
              <PriceSlider
                min={priceBounds.min}
                max={priceBounds.max}
                low={draft.range?.low ?? priceBounds.min}
                high={draft.range?.high ?? priceBounds.max}
                onChange={(nextLow, nextHigh) => updateDraft({ ...draft, range: { low: nextLow, high: nextHigh } })}
              />
            </div>
          ) : null}
        </div>
      ) : null}
      {printChoices.length > 0 ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenu((current) => (current === "tisak" ? null : "tisak"))}
            className={draft.prints.length > 0 ? chipOn : chip}
            aria-expanded={menu === "tisak"}
          >
            {draft.prints.length > 0 ? `Tisak · ${draft.prints.length}` : "Tisak"}
            <ChevronDown className={`size-4 ${menu === "tisak" ? "rotate-180" : ""}`} />
          </button>
          {menu === "tisak" ? (
            <div className={`${popover} w-60 p-3`}>
              {printChoices.map((option) => {
                const checked = draft.prints.includes(option);
                return (
                  <label key={option} className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1.5 text-[14px] tracking-[-0.014em]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const prints = checked
                          ? draft.prints.filter((item) => item !== option)
                          : [...draft.prints, option];
                        updateDraft({ ...draft, prints });
                      }}
                      className="size-4 accent-black"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
      {pending ? (
        <button type="button" onClick={applyFilters} className={chipOn}>
          Filteri · {pendingCount}
        </button>
      ) : null}
    </div>
  );

  const filters = (
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
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 text-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:hidden">
              <SlidersHorizontal className="size-4" />
              Kategorije
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto bg-white">
              <SheetHeader>
                <SheetTitle className="tracking-[-0.03em]">Kategorije</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">{filters}</div>
            </SheetContent>
          </Sheet>
        </div>
        {filterPanel}
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
      <div>
        <p className="text-[12px] tracking-[-0.014em] text-[#787574]">Cijena</p>
        <p className="mt-1 text-[14px] tracking-[-0.014em]">
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

function normalizeFilters(
  selection: FilterSelection,
  bounds: { min: number; max: number } | null,
): FilterSelection {
  if (!bounds || !selection.range) return selection;
  const full =
    Math.abs(selection.range.low - bounds.min) < 0.001 && Math.abs(selection.range.high - bounds.max) < 0.001;
  return full ? { ...selection, range: null } : selection;
}

function sameFilters(a: FilterSelection, b: FilterSelection) {
  if (a.inStock !== b.inStock) return false;
  if (a.prints.length !== b.prints.length) return false;
  const left = [...a.prints].sort();
  const right = [...b.prints].sort();
  if (left.some((item, index) => item !== right[index])) return false;
  if (!a.range && !b.range) return true;
  if (!a.range || !b.range) return false;
  return Math.abs(a.range.low - b.range.low) < 0.001 && Math.abs(a.range.high - b.range.high) < 0.001;
}

function matchesFilters(
  product: Product,
  selection: FilterSelection,
  bounds: { min: number; max: number } | null,
) {
  const unit = floorTier(product).unit;
  const low = selection.range?.low ?? bounds?.min ?? 0;
  const high = selection.range?.high ?? bounds?.max ?? Number.POSITIVE_INFINITY;
  const matchesPrint = selection.prints.length === 0 || selection.prints.some((name) => product.prints.includes(name));
  const matchesStock = !selection.inStock || product.inStock;
  return matchesPrint && matchesStock && unit >= low - 0.001 && unit <= high + 0.001;
}
