"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
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
  const [sortDraft, setSortDraft] = useState(sort);
  const [printDraft, setPrintDraft] = useState<string[]>([]);
  const [rangeDraft, setRangeDraft] = useState<{ low: number; high: number } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
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
  const applied = stored?.key === filterKey ? stored.applied : emptyFilters;

  function openMenu(next: "sort" | "cijena" | "tisak") {
    setSortDraft(sort);
    setPrintDraft(applied.prints);
    setRangeDraft(applied.range);
    setMenu(next);
  }

  function commit(nextApplied: FilterSelection, nextSort = sort) {
    const normalized = normalizeFilters(nextApplied, priceBounds);
    setStored({ key: filterKey, draft: normalized, applied: normalized });
    setSort(nextSort);
    setMenu(null);
  }

  function toggleStock() {
    const next = normalizeFilters({ ...applied, inStock: !applied.inStock }, priceBounds);
    setStored({ key: filterKey, draft: next, applied: next });
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

  const filtersActive = !sameFilters(applied, emptyFilters);

  useEffect(() => {
    if (!menu) return;
    dialogRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenu(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  function resetFilters() {
    setStored({ key: filterKey, draft: emptyFilters, applied: emptyFilters });
  }

  const chip =
    "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-[#ebebeb] bg-white px-4 text-[14px] tracking-[-0.014em] whitespace-nowrap text-black shadow-[0_2px_8px_rgba(0,0,0,0.06)]";
  const chipOn =
    "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-black bg-black px-4 text-[14px] tracking-[-0.014em] whitespace-nowrap text-white";
  const sortLabel = sort === "cijena" ? "Cijena, od niže" : sort === "naziv" ? "Naziv" : "Sortiraj";
  const priceLabel = applied.range ? `${formatKm(applied.range.low)} – ${formatKm(applied.range.high)}` : "Cijena";
  const dialogLow = rangeDraft?.low ?? priceBounds?.min ?? 0;
  const dialogHigh = rangeDraft?.high ?? priceBounds?.max ?? 0;

  const filterPanel = (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => openMenu("sort")}
        className={sort === "preporuceno" ? chip : chipOn}
        aria-expanded={menu === "sort"}
      >
        {sortLabel}
        <ChevronDown className="size-4" />
      </button>
      <button
        type="button"
        onClick={toggleStock}
        className={applied.inStock ? chipOn : chip}
        aria-pressed={applied.inStock}
      >
        Na zalihi
      </button>
      {priceBounds && priceBounds.max > priceBounds.min ? (
        <button
          type="button"
          onClick={() => openMenu("cijena")}
          className={applied.range ? chipOn : chip}
          aria-expanded={menu === "cijena"}
        >
          {priceLabel}
          <ChevronDown className="size-4" />
        </button>
      ) : null}
      {printChoices.length > 0 ? (
        <button
          type="button"
          onClick={() => openMenu("tisak")}
          className={applied.prints.length > 0 ? chipOn : chip}
          aria-expanded={menu === "tisak"}
        >
          {applied.prints.length > 0 ? `Tisak · ${applied.prints.length}` : "Tisak"}
          <ChevronDown className="size-4" />
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
        <div className="text-center">
          <h1 className="text-[34px] leading-none font-medium tracking-[-0.05em] sm:text-[40px]">{title}</h1>
          {intro ? <p className="mx-auto mt-3 max-w-xl text-[14px] leading-[1.4] text-[#787574]">{intro}</p> : null}
          {query ? (
            <p className="mt-2 text-[16px] tracking-[-0.031em]">
              Upit: <span className="font-medium">{query}</span>
            </p>
          ) : null}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <div className="mt-5 flex justify-center lg:hidden">
              <SheetTrigger className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 text-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <SlidersHorizontal className="size-4" />
                Kategorije
              </SheetTrigger>
            </div>
            <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto bg-white">
              <SheetHeader>
                <SheetTitle className="tracking-[-0.03em]">Kategorije</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">{filters}</div>
            </SheetContent>
          </Sheet>
          {filterPanel}
        </div>
        <p className="mt-4 text-center text-[14px] text-[#787574]">
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
        {menu ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
            onMouseDown={() => setMenu(null)}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="filter-dialog-title"
              tabIndex={-1}
              className="w-full max-w-[28rem] rounded-[28px] bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.22)] outline-none"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 id="filter-dialog-title" className="text-[20px] font-medium tracking-[-0.03em]">
                  {menu === "sort" ? "Sortiraj" : menu === "cijena" ? "Cijena" : "Tisak"}
                </h2>
                <button
                  type="button"
                  onClick={() => setMenu(null)}
                  aria-label="Zatvori"
                  className="grid size-8 place-items-center rounded-full hover:bg-[#f2f4f5]"
                >
                  <X className="size-4" />
                </button>
              </div>
              {menu === "sort" ? (
                <div className="mt-4" role="listbox" aria-label="Sortiranje">
                  {(
                    [
                      ["preporuceno", "Preporučeno"],
                      ["cijena", "Cijena, od niže"],
                      ["naziv", "Naziv"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      role="option"
                      aria-selected={sortDraft === value}
                      onClick={() => setSortDraft(value)}
                      className="flex w-full items-center justify-between py-3 text-left text-[16px] tracking-[-0.014em]"
                    >
                      {label}
                      <span
                        className={`grid size-5 place-items-center rounded-full border ${sortDraft === value ? "border-black bg-black" : "border-[#d5d5d5]"}`}
                      >
                        {sortDraft === value ? <span className="size-2 rounded-full bg-white" /> : null}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
              {menu === "cijena" && priceBounds ? (
                <div className="mt-5">
                  <PriceSlider
                    min={priceBounds.min}
                    max={priceBounds.max}
                    low={dialogLow}
                    high={dialogHigh}
                    onChange={(nextLow, nextHigh) => setRangeDraft({ low: nextLow, high: nextHigh })}
                  />
                  <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <input
                      inputMode="decimal"
                      aria-label="Najniža cijena"
                      value={formatAmount(dialogLow)}
                      onChange={(event) => {
                        const next = Number(event.target.value.replace(",", "."));
                        if (Number.isNaN(next)) return;
                        setRangeDraft({ low: Math.min(Math.max(next, priceBounds.min), dialogHigh), high: dialogHigh });
                      }}
                      className="h-12 rounded-2xl border border-[#ebebeb] px-3 text-center text-[15px] outline-none"
                    />
                    <span className="text-[#787574]">–</span>
                    <input
                      inputMode="decimal"
                      aria-label="Najviša cijena"
                      value={formatAmount(dialogHigh)}
                      onChange={(event) => {
                        const next = Number(event.target.value.replace(",", "."));
                        if (Number.isNaN(next)) return;
                        setRangeDraft({ low: dialogLow, high: Math.max(Math.min(next, priceBounds.max), dialogLow) });
                      }}
                      className="h-12 rounded-2xl border border-[#ebebeb] px-3 text-center text-[15px] outline-none"
                    />
                  </div>
                </div>
              ) : null}
              {menu === "tisak" ? (
                <div className="mt-2">
                  {printChoices.map((option) => {
                    const checked = printDraft.includes(option);
                    return (
                      <label key={option} className="flex cursor-pointer items-center justify-between py-3 text-[16px] tracking-[-0.014em]">
                        {option}
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setPrintDraft(
                              checked ? printDraft.filter((item) => item !== option) : [...printDraft, option],
                            );
                          }}
                          className="size-5 accent-black"
                        />
                      </label>
                    );
                  })}
                </div>
              ) : null}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (menu === "sort") setSortDraft("preporuceno");
                    if (menu === "cijena") setRangeDraft(null);
                    if (menu === "tisak") setPrintDraft([]);
                  }}
                  className="h-12 rounded-full bg-[#f2f4f5] text-[15px] font-medium"
                >
                  Poništi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (menu === "sort") commit(applied, sortDraft);
                    if (menu === "cijena") commit({ ...applied, range: rangeDraft });
                    if (menu === "tisak") commit({ ...applied, prints: printDraft });
                  }}
                  className="h-12 rounded-full bg-black text-[15px] font-medium text-white"
                >
                  Gotovo
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function formatAmount(value: number) {
  return value.toFixed(2).replace(".", ",");
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
    <div className="relative mt-2 h-6">
      <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-[#ebebeb]" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-black"
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
