"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import { colourNames, filterColours, filterGroups, findProduct, listingIds } from "./data";
import type { Navigate } from "./navigation";
import { ProductCard } from "./product-card";
import { linkFocus, pagePad } from "./shared";

const sortOptions = [
  { value: "popular", label: "najpopularnije" },
  { value: "price-asc", label: "cijena rastuće" },
  { value: "price-desc", label: "cijena padajuće" },
] as const;

type Sort = (typeof sortOptions)[number]["value"];

const initialChecked = new Set(filterGroups.flatMap((group) => group.checked.map((option) => `${group.name}:${option}`)));
const PAGES = ["1", "2", "3", "…", "42"];

export function ListingPage({ query, navigate }: { query?: string; navigate: Navigate }) {
  const [sort, setSort] = useState<Sort>("popular");
  const [checked, setChecked] = useState(initialChecked);
  const [colour, setColour] = useState<string | null>(filterColours[0]);
  const [page, setPage] = useState("1");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const term = query?.toLocaleLowerCase("hr");
    const matches = listingIds.map(findProduct).filter((product) => !term || product.name.toLocaleLowerCase("hr").includes(term));
    if (sort === "popular") return matches;
    return [...matches].sort((a, b) => (sort === "price-asc" ? a.price - b.price : b.price - a.price));
  }, [query, sort]);

  const toggle = (key: string) =>
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <main className={cn(pagePad, "flex flex-col gap-[22px] pt-7 pb-12")}>
      <nav aria-label="Putanja" className="flex flex-wrap items-center gap-2 text-[13px] leading-[18px] font-medium">
        <button type="button" onClick={() => navigate({ page: "home" })} className={cn(linkFocus, "text-v2-muted hover:text-v2-ink")}>
          Početna
        </button>
        <span className="text-v2-line">/</span>
        <span className="text-v2-muted">Instrumenti za pisanje</span>
        <span className="text-v2-line">/</span>
        <span className="text-v2-ink" aria-current="page">
          Olovke
        </span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[30px] leading-[38px] font-extrabold text-v2-ink sm:text-[36px] sm:leading-[42px]">Olovke</h1>
          <p className="text-[14px] leading-5 text-v2-muted">
            {query ? `${results.length} rezultata za „${query}”` : "1.248 proizvoda · personalizacija od 50 kom"}
          </p>
        </div>
        <label className="relative flex h-10 items-center gap-2 rounded-[8px] border border-v2-line bg-white pr-3 pl-[14px] text-[13px] leading-[18px] font-semibold text-v2-ink focus-within:border-v2-ink">
          <span aria-hidden>Sortiraj: {sortOptions.find((option) => option.value === sort)?.label}</span>
          <Image src="/v2/icons/chevron-sort.svg" alt="" width={14} height={14} />
          <select
            aria-label="Sortiraj"
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
        <aside className="flex flex-col gap-[22px] pt-1 lg:w-[240px] lg:shrink-0" aria-label="Filteri">
          <div className="flex items-start justify-between">
            <button
              type="button"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
              className="text-[16px] leading-[22px] font-bold text-v2-ink lg:pointer-events-none"
            >
              Filteri <span className="text-v2-muted lg:hidden">{filtersOpen ? "−" : "+"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setChecked(new Set());
                setColour(null);
              }}
              className={cn(linkFocus, "text-[13px] leading-[18px] font-semibold text-v2-red hover:underline")}
            >
              Poništi
            </button>
          </div>
          <div className={cn("flex-col gap-[22px] lg:flex", filtersOpen ? "flex" : "hidden")}>
            <CheckGroup group={filterGroups[0]} checked={checked} onToggle={toggle} />
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-[13px] leading-[18px] font-semibold text-v2-ink">Boja</legend>
              <div className="flex gap-2">
                {filterColours.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    aria-pressed={colour === hex}
                    aria-label={colourNames[hex]}
                    onClick={() => setColour((current) => (current === hex ? null : hex))}
                    className={cn(
                      "size-[18px] rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
                      colour === hex ? "border-2 border-v2-ink" : "border border-v2-line",
                    )}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </fieldset>
            {filterGroups.slice(1).map((group) => (
              <CheckGroup key={group.name} group={group} checked={checked} onToggle={toggle} />
            ))}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} variant="listing" onOpen={() => navigate({ page: "product", id: product.id })} />
              ))}
            </div>
          ) : (
            <p className="rounded-[16px] bg-v2-surface p-6 text-[14px] leading-5 text-v2-muted">
              Nema proizvoda za „{query}”. Probaj s drugim pojmom.
            </p>
          )}
          <nav aria-label="Stranice" className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <PageButton label="Prethodna" onClick={() => setPage("1")} />
            {PAGES.map((item) =>
              item === "…" ? (
                <span key={item} className="grid size-9 place-items-center rounded-[8px] border border-v2-line text-[13px] leading-4 font-semibold text-v2-ink">
                  …
                </span>
              ) : (
                <PageButton key={item} label={item} active={page === item} onClick={() => setPage(item)} />
              ),
            )}
            <PageButton label="Sljedeća" onClick={() => setPage((current) => (current === "1" ? "2" : current === "2" ? "3" : current))} />
          </nav>
        </div>
      </div>
    </main>
  );
}

function CheckGroup({
  group,
  checked,
  onToggle,
}: {
  group: (typeof filterGroups)[number];
  checked: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-[13px] leading-[18px] font-semibold text-v2-ink">{group.name}</legend>
      {group.options.map((option) => {
        const key = `${group.name}:${option}`;
        const isChecked = checked.has(key);
        return (
          <label key={option} className="group flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={isChecked} onChange={() => onToggle(key)} className="peer sr-only" />
            <span
              className={cn(
                "grid size-4 place-items-center rounded-[4px] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-v2-red",
                isChecked ? "bg-v2-ink" : "border border-v2-line bg-white group-hover:border-v2-muted",
              )}
            >
              {isChecked ? <Image src="/v2/icons/tick.svg" alt="" width={12} height={12} /> : null}
            </span>
            <span className={cn("text-[13px] leading-[18px]", isChecked ? "font-semibold text-v2-ink" : "text-v2-muted group-hover:text-v2-ink")}>
              {option}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

function PageButton({ label, active = false, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "grid h-9 min-w-9 place-items-center rounded-[8px] px-3 text-[13px] leading-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
        active ? "bg-v2-ink text-white" : "border border-v2-line bg-white text-v2-ink hover:bg-v2-surface",
      )}
    >
      {label}
    </button>
  );
}
