"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import {
  colourNames,
  findProduct,
  priceBreaks,
  printMethods,
  QTY_STEP,
  relatedIds,
  unitPriceFor,
  type PrintMethodId,
  type Product,
} from "./data";
import type { Navigate } from "./navigation";
import { ProductCard } from "./product-card";
import { btnInk, formatKm, formatQty, linkFocus, pagePad, ProductPhoto } from "./shared";

export type AddToCart = (line: { productId: string; colour: string; print: PrintMethodId; qty: number; unitPrice: number }) => void;

const DEFAULT_QTY = 1000;
const notes = [
  "Besplatan digitalni otisak prije proizvodnje",
  "Uzorci stižu bez tiska i ne mogu se vratiti",
  "Dostava za 7–10 radnih dana nakon odobrenja otiska",
];

export function ProductPage({ id, navigate, onAdd }: { id: string; navigate: Navigate; onAdd: AddToCart }) {
  const product = findProduct(id);
  const colours = product.detailColours ?? product.colours;
  const [shot, setShot] = useState(0);
  const [colour, setColour] = useState(colours[0]);
  const [print, setPrint] = useState<PrintMethodId>("digital");
  const [qty, setQty] = useState(DEFAULT_QTY);

  const tiers = priceBreaks(product);
  const unitPrice = unitPriceFor(product, qty);
  const activeQty = [...tiers].reverse().find((tier) => qty >= tier.qty)?.qty ?? tiers[0].qty;
  const basePrice = tiers[0].price;
  const isPen = product.kind.toLocaleLowerCase("hr").includes("olovka");
  const saving = Math.round((1 - unitPrice / basePrice) * 100);
  const related = relatedIds.filter((relatedId) => relatedId !== product.id).slice(0, 4);

  return (
    <main className={cn(pagePad, "flex flex-col gap-9 pt-7 pb-12")}>
      <nav aria-label="Putanja" className="flex flex-wrap items-center gap-2 text-[13px] leading-[18px] font-medium">
        <button type="button" onClick={() => navigate({ page: "home" })} className={cn(linkFocus, "text-v2-muted hover:text-v2-ink")}>
          Početna
        </button>
        <span className="text-v2-line">/</span>
        <button type="button" onClick={() => navigate({ page: "listing" })} className={cn(linkFocus, "text-v2-muted hover:text-v2-ink")}>
          Olovke
        </button>
        <span className="text-v2-line">/</span>
        <span className="text-v2-ink" aria-current="page">
          {product.name}
        </span>
      </nav>

      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex flex-col gap-12 lg:w-[520px] lg:shrink-0">
          <Gallery product={product} shot={shot} onShot={setShot} />
          <ul className="flex flex-col gap-2">
            {notes.map((note) => (
              <li key={note} className="flex items-center gap-2 text-[13px] leading-[18px] text-v2-ink">
                <Image src="/v2/icons/ok.svg" alt="" width={16} height={16} />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <p className="text-[12px] leading-4 font-semibold tracking-[1.4px] text-v2-red uppercase">{product.kind}</p>
          <h1 className="text-[32px] leading-[38px] font-extrabold text-v2-ink sm:text-[40px] sm:leading-[46px]">{product.name}</h1>
          <p className="text-[14px] leading-5 whitespace-pre-wrap text-v2-muted">
            {`Artikl ${product.sku}  ·  Personalizacija od ${product.minQty} kom`}
          </p>
          <div className="flex flex-wrap items-center gap-[10px]">
            {saving > 0 ? <s className="text-[16px] font-medium text-v2-muted">{formatKm(basePrice)}</s> : null}
            <p className="text-[32px] leading-9 font-extrabold text-v2-ink">{formatKm(unitPrice)}</p>
            <p className="text-[14px] font-medium text-v2-muted">po komadu</p>
            {saving > 0 ? (
              <span className="rounded-[6px] bg-v2-red-soft px-2 py-1 text-[12px] leading-4 font-bold text-v2-red">Uštedi {saving}%</span>
            ) : null}
          </div>

          <fieldset className="flex flex-col gap-[6px]">
            <legend className="mb-[6px] text-[13px] leading-[18px] font-semibold text-v2-ink">Cijena po količini, tisak u 1 boji uključen</legend>
            {tiers.map((tier, index) => {
              const isActive = tier.qty === activeQty;
              const isBest = index === tiers.length - 1;
              return (
                <button
                  key={tier.qty}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setQty(tier.qty)}
                  className={cn(
                    "grid grid-cols-[1fr_auto_1fr] items-center rounded-[8px] px-3 py-[10px] text-[14px] leading-[18px] text-v2-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
                    isActive ? "border-[1.5px] border-v2-red bg-v2-surface-strong" : "border-[1.5px] border-transparent bg-v2-surface hover:border-v2-line",
                  )}
                >
                  <span className={cn("text-left", isActive ? "font-bold" : "font-medium")}>{formatQty(tier.qty)} kom</span>
                  <span className="text-[11px] leading-[14px] font-semibold text-v2-red">{isBest ? "Najbolja cijena" : ""}</span>
                  <span className="text-right font-bold">{formatKm(tier.price)}</span>
                </button>
              );
            })}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-[13px] leading-[18px] font-semibold whitespace-pre text-v2-ink">{`Boja  ·  ${colourNames[colour] ?? ""}`}</legend>
            <div className="flex gap-2">
              {colours.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  aria-pressed={colour === hex}
                  aria-label={colourNames[hex]}
                  onClick={() => setColour(hex)}
                  className={cn(
                    "grid size-7 place-items-center rounded-full bg-white transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
                    colour === hex ? "border-2 border-v2-ink" : "border border-v2-line",
                  )}
                >
                  <span className="size-[17px] rounded-full border border-v2-line" style={{ backgroundColor: hex }} />
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-[13px] leading-[18px] font-semibold text-v2-ink">Način tiska</legend>
            <div className="flex gap-2">
              {printMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  aria-pressed={print === method.id}
                  onClick={() => setPrint(method.id)}
                  className={cn(
                    "flex flex-1 flex-col gap-[2px] rounded-[10px] p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
                    print === method.id ? "border-[1.5px] border-v2-red bg-v2-surface-strong" : "border border-v2-line bg-white hover:bg-v2-surface",
                  )}
                >
                  <span className="text-[13px] leading-[18px] font-semibold text-v2-ink">{method.name}</span>
                  <span className="text-[12px] leading-4 whitespace-pre text-v2-muted">{`${method.size}  ·  ${method.note}`}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <QtyStepper value={qty} min={product.minQty} onChange={setQty} />
            <button
              type="button"
              onClick={() => onAdd({ productId: product.id, colour, print, qty, unitPrice })}
              className={cn(btnInk, "flex-1 whitespace-pre")}
            >
              {`U košaricu  ·  ${formatKm(qty * unitPrice)}`}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 text-v2-ink md:grid-cols-2">
        <section className="flex flex-col gap-2 rounded-[16px] bg-v2-surface p-6">
          <h2 className="text-[18px] leading-6 font-bold">{isPen ? "O ovoj olovci" : "O ovom proizvodu"}</h2>
          <p className="text-[14px] leading-[22px]">
            {product.about ?? "Pouzdan promotivni artikl za događaje, pakete dobrodošlice i svakodnevnu upotrebu. Cijena koju vidiš već uključuje tisak logotipa u jednoj boji."}
          </p>
        </section>
        <section className="flex flex-col gap-2 rounded-[16px] bg-v2-surface p-6">
          <h2 className="text-[18px] leading-6 font-bold">Tisak i dostava</h2>
          <p className="text-[14px] leading-[22px]">
            Digitalni tisak 50 × 7 mm ili tampotisak 60 × 6 mm. Otisak je besplatan. Podrijetlo i boja tinte potvrđuju se na otisku prije nego što narudžba ide u rad.
          </p>
        </section>
      </div>

      <section className="flex flex-col gap-4" aria-labelledby="v2-related-heading">
        <h2 id="v2-related-heading" className="text-[24px] leading-[30px] font-extrabold text-v2-ink">
          Često se naručuje uz ovo
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {related.map((relatedId) => (
            <ProductCard key={relatedId} product={findProduct(relatedId)} variant="related" onOpen={() => navigate({ page: "product", id: relatedId })} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Gallery({ product, shot, onShot }: { product: Product; shot: number; onShot: (index: number) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <ProductPhoto photo={product.gallery[shot]} sizes="(min-width: 1024px) 520px, 100vw" className="h-[320px] rounded-[20px] sm:h-[440px]" />
      <div className="flex gap-3">
        {product.gallery.map((photo, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slika ${index + 1}`}
            aria-pressed={shot === index}
            onClick={() => onShot(index)}
            className={cn(
              "flex-1 overflow-hidden rounded-[12px] transition-[opacity,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
              shot === index ? "ring-2 ring-v2-ink ring-offset-2" : "opacity-80 hover:opacity-100",
            )}
          >
            <ProductPhoto photo={photo} sizes="130px" className="h-[84px]" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function QtyStepper({
  value,
  min,
  onChange,
  size = "large",
}: {
  value: number;
  min: number;
  onChange: (value: number) => void;
  size?: "large" | "small";
}) {
  const isLarge = size === "large";
  const step = (delta: number) => onChange(Math.max(min, value + delta));

  return (
    <div className={cn("flex items-center", isLarge ? "h-12 shrink-0 self-start rounded-[8px] border border-v2-line bg-white" : "gap-2")}>
      <button
        type="button"
        aria-label="Smanji količinu"
        disabled={value <= min}
        onClick={() => step(-QTY_STEP)}
        className={cn(
          "font-semibold text-v2-ink transition-opacity disabled:opacity-30",
          isLarge ? "grid h-12 w-10 place-items-center text-[18px]" : "text-[16px] hover:opacity-70",
        )}
      >
        −
      </button>
      <span className={cn("min-w-[3ch] text-center font-bold text-v2-ink tabular-nums", isLarge ? "text-[15px]" : "text-[14px]")} aria-live="polite">
        {formatQty(value)}
      </span>
      <button
        type="button"
        aria-label="Povećaj količinu"
        onClick={() => step(QTY_STEP)}
        className={cn("font-semibold text-v2-ink", isLarge ? "grid h-12 w-10 place-items-center text-[18px]" : "text-[16px] hover:opacity-70")}
      >
        +
      </button>
    </div>
  );
}
