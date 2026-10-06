"use client";

import { useMemo, useState, type ReactNode } from "react";
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
import { categories, entryTier, type Category, type Product } from "@/lib/catalog";

const printOptions = [
  "Lasersko graviranje",
  "UV tisak",
  "DTF tisak",
  "Sitotisak",
  "Sublimacija",
  "Digitalni tisak",
  "Tampotisak",
];

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
  const [print, setPrint] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState("preporuceno");

  const visible = useMemo(() => {
    let list = products.filter((product) => {
      const matchesPrint = !print || product.prints.includes(print);
      const matchesPrice = maxPrice == null || entryTier(product).unit <= maxPrice;
      return matchesPrint && matchesPrice;
    });
    if (sort === "cijena") {
      list = [...list].sort((a, b) => entryTier(a).unit - entryTier(b).unit);
    }
    if (sort === "naziv") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "bs"));
    }
    return list;
  }, [products, print, maxPrice, sort]);

  const filters = (
    <div className="space-y-6">
      <div>
        <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">
          {category ? "Podkategorije" : "Kategorije"}
        </p>
        <ul className="mt-2 space-y-1">
          {category ? (
            <>
              <li>
                <a
                  href={`/kategorija/${category.slug}`}
                  className={`block px-2 py-1.5 text-[14px] ${!activeSub ? "bg-bass text-white" : "hover:bg-mist"}`}
                >
                  Sve u kategoriji
                </a>
              </li>
              {category.subs.map((sub) => (
                <li key={sub.slug}>
                  <a
                    href={`/kategorija/${category.slug}/${sub.slug}`}
                    className={`block px-2 py-1.5 text-[14px] ${activeSub === sub.slug ? "bg-bass text-white" : "hover:bg-mist"}`}
                  >
                    {sub.name}
                  </a>
                </li>
              ))}
            </>
          ) : (
            categories.map((item) => (
              <li key={item.slug}>
                <a href={`/kategorija/${item.slug}`} className="block px-2 py-1.5 text-[14px] hover:bg-mist">
                  {item.name}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
      <div>
        <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Tisak</p>
        <div className="mt-2 flex flex-col gap-1">
          <FilterButton active={print == null} onClick={() => setPrint(null)}>
            Sve tehnike
          </FilterButton>
          {printOptions.map((option) => (
            <FilterButton key={option} active={print === option} onClick={() => setPrint(option)}>
              {option}
            </FilterButton>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">
          Cijena od minimuma
        </p>
        <div className="mt-2 flex flex-col gap-1">
          {[
            { label: "Sve cijene", value: null },
            { label: "Do 2 KM", value: 2 },
            { label: "Do 5 KM", value: 5 },
            { label: "Do 15 KM", value: 15 },
          ].map((option) => (
            <FilterButton
              key={option.label}
              active={maxPrice === option.value}
              onClick={() => setMaxPrice(option.value)}
            >
              {option.label}
            </FilterButton>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr] lg:py-16">
      <aside className="hidden lg:block">{filters}</aside>
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-[clamp(2rem,4vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">{title}</h1>
            {intro ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
            {query ? (
              <p className="mt-2 text-sm">
                Upit: <span className="font-medium">{query}</span>
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger className="inline-flex h-12 items-center gap-2 rounded-[2px] border border-bass bg-white px-4 text-[14px] tracking-[0.05em] uppercase lg:hidden">
                <SlidersHorizontal className="size-4" />
                Filteri
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100%,20rem)] bg-white">
                <SheetHeader>
                  <SheetTitle>Filteri</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6">{filters}</div>
              </SheetContent>
            </Sheet>
            <label className="text-sm">
              <span className="sr-only">Sortiranje</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-12 rounded-full border border-steel bg-mist px-4"
              >
                <option value="preporuceno">Preporučeno</option>
                <option value="cijena">Cijena, od niže</option>
                <option value="naziv">Naziv</option>
              </select>
            </label>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{visible.length} artikala</p>
        {visible.length === 0 ? (
          <div className="mt-8 bg-mist px-6 py-16 text-center">
            <p className="font-medium">U ovoj grani pregleda nema Laser artikla.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Kategorije su iste kao na IGO katalogu. Artikli su iz asortimana LASER d.o.o.
            </p>
            <Button className="mt-4" variant="outline" onClick={() => { setPrint(null); setMaxPrice(null); }}>
              Poništi filtere
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-px lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1.5 text-left text-[14px] ${active ? "bg-bass text-white" : "hover:bg-mist"}`}
    >
      {children}
    </button>
  );
}
