"use client";

import { useState } from "react";
import { cn } from "cn";
import { breakFor, findProduct, MIN_QTY, priceBreaks, QTY_STEP, relatedIds, type PriceBreak } from "./data";
import type { Navigate } from "./navigation";
import { ProductCard } from "./product-card";
import { Breadcrumb, btnRed, formatKm, Photo, pagePad, Stars } from "./shared";

export type AddToCart = (line: { productId: string; colour?: string; qty: number; unitPrice: number }) => void;

const DEFAULT_QTY = 100;
const qtyButton =
  "grid h-full w-11 shrink-0 place-items-center text-[18px] font-bold text-v3-ink transition-colors hover:text-v3-red disabled:opacity-30 disabled:hover:text-v3-ink focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-v3-red";

function tierLabel(tier: PriceBreak): string {
  return Number.isFinite(tier.to) ? `${tier.from} – ${tier.to} kom` : `${tier.from} kom i više`;
}

export function ProductPage({ id, navigate, onAdd }: { id: string; navigate: Navigate; onAdd: AddToCart }) {
  const product = findProduct(id);
  const gallery = product.gallery ?? [product.photo];
  const [shot, setShot] = useState(0);
  const [colour, setColour] = useState(product.colours[0]?.name);
  const [qty, setQty] = useState(DEFAULT_QTY);
  const [proofRequested, setProofRequested] = useState(false);

  const openDepartment = () => navigate({ page: product.department === "Pisaći pribor" ? "listing" : "categories" });
  const tiers = priceBreaks(product);
  const active = breakFor(product, qty);
  const basePrice = product.oldPrice ?? tiers[0].price;
  const saving = Math.round((1 - active.price / basePrice) * 100);
  const related = relatedIds.filter((placement) => placement.id !== product.id).slice(0, 4);
  const about = product.about ?? [
    `${product.name} za sajmove, pakete dobrodošlice i ured. Tisak u jednoj boji je uračunat u cijenu koju vidiš.`,
    "Prije tiska šaljemo digitalni otisak. Pakiranje je po 50 komada, a za narudžbe preko 410 KM dostava unutar BiH je besplatna do 30 kg.",
  ];
  const specs = [
    ["Šifra", product.sku],
    ["Materijal", product.material],
    ...(colour ? [["Boja", colour]] : []),
    ["Tisak", "1 boja, na tijelu"],
    ["Pakiranje", "50 kom"],
    ["Min. narudžba", `${MIN_QTY} kom`],
  ];

  return (
    <main className="bg-v3-page">
      <div className={cn(pagePad, "flex flex-col gap-7 pt-5 pb-11")}>
        <Breadcrumb
          items={[
            { label: "Početna", onClick: () => navigate({ page: "home" }) },
            { label: product.department, onClick: openDepartment },
            ...(product.category !== product.department ? [{ label: product.category, onClick: openDepartment }] : []),
            { label: product.sku },
          ]}
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-3 lg:w-[640px] lg:shrink-0">
            <Photo src={gallery[shot]} sizes="(min-width: 1024px) 640px, 100vw" className="h-[340px] rounded-[8px] border border-v3-line sm:h-[520px]" />
            <div className="flex gap-3">
              {gallery.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Slika ${index + 1}`}
                  aria-pressed={shot === index}
                  onClick={() => setShot(index)}
                  className={cn(
                    "size-[72px] overflow-hidden rounded-[6px] transition-colors sm:size-24 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red",
                    shot === index ? "border-2 border-v3-red" : "border border-v3-line hover:border-v3-muted",
                  )}
                >
                  <Photo src={src} sizes="96px" className="size-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[14px] rounded-[8px] border border-v3-line bg-white p-5 sm:p-6">
            <h1 className="text-[24px] leading-[30px] font-extrabold text-v3-ink sm:text-[28px] sm:leading-[34px]">{product.name}</h1>
            <p className="text-[13px] leading-[18px] font-medium whitespace-pre-wrap text-v3-muted">{`Šifra ${product.sku}   ·   ${product.group}`}</p>
            <div className="flex items-center gap-1">
              <Stars size={16} gap="gap-1" />
              <span className="text-[12px] leading-4 font-medium whitespace-pre text-v3-muted">{`4,8   ·   36 recenzija veleprodaje`}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[36px] leading-[49px] font-extrabold text-v3-ink">{formatKm(active.price)}</p>
              {saving > 0 ? (
                <>
                  <s className="text-[16px] leading-[22px] font-medium text-v3-muted">{formatKm(basePrice)}</s>
                  <span className="rounded-[4px] bg-v3-soft px-2 py-1 text-[12px] leading-4 font-bold text-v3-red">Uštedi {saving}%</span>
                </>
              ) : null}
            </div>
            <p className="text-[14px] leading-5 font-medium text-v3-muted">
              Cijena je bez PDV-a i vrijedi od 100 komada. Tisak u jednoj boji na tijelu je uračunat.
            </p>
            <p className="text-[13px] leading-[18px] font-bold text-v3-green">Na zalihi u Ljubuškom</p>

            {product.colours.length > 0 ? (
              <fieldset>
                <legend className="pb-[14px] text-[13px] leading-[18px] font-bold text-v3-ink">Boja</legend>
                <div className="flex flex-wrap gap-2">
                  {product.colours.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      aria-pressed={colour === option.name}
                      onClick={() => setColour(option.name)}
                      className={cn(
                        "flex items-center gap-2 rounded-[6px] bg-white py-[6px] pr-3 pl-2 text-[13px] leading-[18px] font-semibold text-v3-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red",
                        colour === option.name ? "border-2 border-v3-red" : "m-px border border-v3-line hover:border-v3-muted",
                      )}
                    >
                      <span className="size-4 rounded-full" style={{ backgroundColor: option.hex }} />
                      {option.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            <div className="flex flex-col gap-[10px] sm:flex-row">
              <div className="flex h-12 items-center justify-between rounded-[6px] border border-v3-line bg-white focus-within:border-v3-ink sm:w-[180px] sm:shrink-0">
                <button
                  type="button"
                  aria-label="Smanji količinu"
                  disabled={qty <= MIN_QTY}
                  onClick={() => setQty((current) => Math.max(MIN_QTY, current - QTY_STEP))}
                  className={qtyButton}
                >
                  −
                </button>
                <label className="flex items-center gap-1">
                  <span className="sr-only">Količina</span>
                  <input
                    type="number"
                    min={MIN_QTY}
                    step={QTY_STEP}
                    value={qty}
                    onChange={(event) => setQty(Number(event.target.value) || MIN_QTY)}
                    onBlur={() => setQty((current) => Math.max(MIN_QTY, current))}
                    className="w-12 bg-transparent text-right text-[15px] leading-5 font-bold text-v3-ink tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-[15px] leading-5 font-bold text-v3-ink">kom</span>
                </label>
                <button type="button" aria-label="Povećaj količinu" onClick={() => setQty((current) => current + QTY_STEP)} className={qtyButton}>
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => onAdd({ productId: product.id, colour, qty: Math.max(MIN_QTY, qty), unitPrice: active.price })}
                className={cn(btnRed, "h-12 flex-1 rounded-[6px] text-[15px] leading-5")}
              >
                Dodaj u košaricu
              </button>
            </div>
            <button
              type="button"
              onClick={() => setProofRequested(true)}
              className="flex h-11 items-center justify-center rounded-[6px] border-[1.5px] border-v3-ink text-[14px] leading-[19px] font-bold text-v3-ink transition-colors hover:bg-v3-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red"
            >
              Zatraži digitalni otisak
            </button>
            {proofRequested ? (
              <p role="status" className="rounded-[4px] bg-v3-soft px-3 py-2 text-[12px] leading-4 font-semibold text-v3-ink">
                Zahtjev je zabilježen. Ovo je prototip, pa se ništa ne šalje.
              </p>
            ) : null}
            <p className="text-[12px] leading-4 font-medium text-v3-muted">Minimalno 50 kom. Besplatna dostava preko 410 KM, do 30 kg.</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <section className="flex flex-1 flex-col gap-[10px] rounded-[8px] border border-v3-line bg-white p-[22px]">
            <h2 className="text-[18px] leading-6 font-extrabold text-v3-ink">Opis</h2>
            <p className="text-[14px] leading-[22px] font-medium text-v3-ink">{about[0]}</p>
            <p className="text-[14px] leading-[22px] font-medium text-v3-muted">{about[1]}</p>
          </section>
          <section className="flex flex-col overflow-hidden rounded-[8px] border border-v3-line bg-white py-2 lg:w-[460px] lg:shrink-0">
            <h2 className="pt-[10px] pb-[6px] pl-[14px] text-[18px] leading-6 font-extrabold text-v3-ink">Specifikacija</h2>
            <dl>
              {specs.map(([term, value], index) => (
                <div key={term} className={cn("flex px-[14px] py-[10px] text-[13px] leading-[18px]", index % 2 === 0 ? "bg-v3-surface" : "bg-white")}>
                  <dt className="w-40 shrink-0 font-semibold text-v3-muted">{term}</dt>
                  <dd className="font-medium text-v3-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section aria-labelledby="v3-tiers-heading" className="flex flex-col gap-[10px]">
          <h2 id="v3-tiers-heading" className="text-[18px] leading-6 font-extrabold text-v3-ink">
            Cijena po količini
          </h2>
          <p className="text-[13px] leading-[18px] font-medium text-v3-muted">Bez PDV-a. Akcijska cijena od 100 komada.</p>
          <div className="overflow-hidden rounded-[8px] border border-v3-line bg-white">
            {tiers.map((tier, index) => {
              const isActive = tier.from === active.from;
              return (
                <button
                  key={tier.from}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setQty(tier.from)}
                  className={cn(
                    "grid w-full grid-cols-3 items-center px-4 py-3 text-left transition-colors hover:bg-[#fbefed] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-v3-red",
                    index % 2 === 1 ? "bg-v3-soft" : "bg-white",
                    isActive && "shadow-[inset_3px_0_0_var(--color-v3-red)]",
                  )}
                >
                  <span className="text-[14px] leading-[19px] font-semibold text-v3-ink">{tierLabel(tier)}</span>
                  <span className="text-center text-[14px] leading-[19px] font-extrabold text-v3-ink">{formatKm(tier.price)}</span>
                  <span className={cn("text-right text-[13px] leading-[18px] font-medium", isActive ? "text-v3-red" : "text-v3-muted")}>
                    {isActive ? "odabrano" : tier.note}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="v3-related-heading" className="flex flex-col gap-3">
          <h2 id="v3-related-heading" className="text-[18px] leading-6 font-extrabold text-v3-ink">
            Slični proizvodi
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {related.map((placement) => (
              <ProductCard key={placement.id} placement={placement} variant="related" onOpen={() => navigate({ page: "product", id: placement.id })} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
