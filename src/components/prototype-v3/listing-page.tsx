"use client";

import { useMemo, useState } from "react";
import { cn } from "cn";
import { colourFilters, findProduct, listing, priceFilters, products, type Placement } from "./data";
import type { Navigate } from "./navigation";
import { ProductCard } from "./product-card";
import { Breadcrumb, focusRing, pagePad } from "./shared";

function productCount(count: number): string {
  const last = count % 10;
  const lastTwo = count % 100;
  if (last === 1 && lastTwo !== 11) return `${count} proizvod`;
  return `${count} proizvoda`;
}

export function ListingPage({ query, saleOnly = false, navigate }: { query?: string; saleOnly?: boolean; navigate: Navigate }) {
  const [prices, setPrices] = useState<string[]>([]);
  const [onSale, setOnSale] = useState(saleOnly);
  const [colours, setColours] = useState<string[]>([]);

  const source: Placement[] = useMemo(() => {
    const term = query?.toLocaleLowerCase("hr");
    if (!term) return listing;
    return products
      .filter((product) => `${product.name} ${product.sku}`.toLocaleLowerCase("hr").includes(term))
      .map((product) => ({ id: product.id }));
  }, [query]);

  const results = source.filter((placement) => {
    const product = findProduct(placement.id);
    const priceOk = prices.length === 0 || priceFilters.some((filter) => prices.includes(filter.label) && filter.test(product.price));
    const saleOk = !onSale || Boolean(product.oldPrice);
    const colourOk = colours.length === 0 || product.colours.some((colour) => colours.includes(colour.name));
    return priceOk && saleOk && colourOk;
  });

  const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  const title = query ? `Rezultati za „${query}”` : "Plastične kemijske olovke";

  return (
    <main className="bg-v3-page">
      <div className={cn(pagePad, "flex flex-col gap-[14px] pt-5 pb-7")}>
        <Breadcrumb
          items={[
            { label: "Početna", onClick: () => navigate({ page: "home" }) },
            { label: "Pisaći pribor", onClick: () => navigate({ page: "categories" }) },
            { label: query ? "Pretraga" : "Plastične kemijske olovke" },
          ]}
        />
        <h1 className="text-[24px] leading-8 font-extrabold text-v3-ink sm:text-[26px] sm:leading-[35px]">{title}</h1>
        <p className="text-[13px] leading-[18px] font-medium whitespace-pre-wrap text-v3-muted">{`${productCount(results.length)}  ·  cijene bez PDV-a`}</p>

        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <aside aria-label="Filteri" className="flex flex-col gap-2 rounded-[4px] border border-v3-line bg-white px-[14px] py-4 md:w-[230px] md:shrink-0">
            <FilterGroup title="Cijena">
              {priceFilters.map((filter) => (
                <Check key={filter.label} label={filter.label} checked={prices.includes(filter.label)} onChange={() => setPrices((current) => toggle(current, filter.label))} />
              ))}
            </FilterGroup>
            <FilterGroup title="Akcija">
              <Check label="Samo sniženja" checked={onSale} onChange={() => setOnSale((current) => !current)} />
            </FilterGroup>
            <FilterGroup title="Boja">
              {colourFilters.map((colour) => (
                <Check key={colour.name} label={colour.name === "Silver" ? "Srebrna" : colour.name} checked={colours.includes(colour.name)} onChange={() => setColours((current) => toggle(current, colour.name))} />
              ))}
            </FilterGroup>
            {prices.length > 0 || onSale || colours.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  setPrices([]);
                  setOnSale(false);
                  setColours([]);
                }}
                className={cn(focusRing, "self-start pt-1 text-[12px] leading-4 font-bold text-v3-red hover:underline")}
              >
                Poništi filtere
              </button>
            ) : null}
          </aside>

          {results.length > 0 ? (
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((placement) => (
                <ProductCard key={placement.id} placement={placement} variant="listing" onOpen={() => navigate({ page: "product", id: placement.id })} />
              ))}
            </div>
          ) : (
            <p className="flex-1 rounded-[4px] border border-v3-line bg-white p-6 text-[14px] leading-5 font-medium text-v3-muted">
              Nema proizvoda za odabrane filtere.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col">
      <legend className="pb-1 text-[14px] leading-[19px] font-bold text-v3-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2 py-1">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "grid size-[14px] place-items-center rounded-[2px] border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-v3-red",
          checked ? "border-v3-red bg-v3-red" : "border-v3-line bg-white group-hover:border-v3-muted",
        )}
      >
        {checked ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5.2 4.1 7.3 8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span className={cn("text-[13px] leading-[18px] text-v3-ink", checked ? "font-semibold" : "font-medium")}>{label}</span>
    </label>
  );
}
