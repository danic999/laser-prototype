"use client";

import { useState } from "react";
import { cn } from "cn";
import { DELIVERY_FEE, findProduct, FREE_DELIVERY_FROM, MIN_QTY, QTY_STEP, VAT_RATE } from "./data";
import type { Navigate } from "./navigation";
import { btnRed, focusRing, formatKm, Photo, pagePad } from "./shared";

export type CartLine = { key: string; productId: string; colour?: string; qty: number; unitPrice: number };

export function CartPage({
  lines,
  onQty,
  onRemove,
  navigate,
}: {
  lines: CartLine[];
  onQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  navigate: Navigate;
}) {
  const [checkoutNote, setCheckoutNote] = useState(false);
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.unitPrice, 0);
  const isFreeDelivery = subtotal > FREE_DELIVERY_FROM;
  const delivery = lines.length === 0 || isFreeDelivery ? 0 : DELIVERY_FEE;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + delivery + vat;

  return (
    <main className="bg-v3-page">
      <div className={cn(pagePad, "flex flex-col gap-4 pt-5 pb-7")}>
        <h1 className="text-[28px] leading-[38px] font-extrabold text-v3-ink">Košarica</h1>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <ul className="flex min-w-0 flex-1 flex-col rounded-[4px] border border-v3-line bg-white px-4">
            {lines.length === 0 ? (
              <li className="py-6 text-[14px] leading-5 font-medium text-v3-muted">
                Košarica je prazna.{" "}
                <button type="button" onClick={() => navigate({ page: "home" })} className={cn(focusRing, "font-bold text-v3-red hover:underline")}>
                  Nastavi kupnju
                </button>
              </li>
            ) : null}
            {lines.map((line) => {
              const product = findProduct(line.productId);
              return (
                <li key={line.key} className="flex flex-wrap items-center gap-4 border-b border-v3-line py-[14px] sm:flex-nowrap">
                  <button type="button" onClick={() => navigate({ page: "product", id: product.id })} aria-label={product.name} className="shrink-0 rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red">
                    <Photo src={product.photo} sizes="88px" className="size-[88px] rounded-[4px]" />
                  </button>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="text-[15px] leading-5 font-bold text-v3-ink">{product.name}</p>
                    <p className="text-[12px] leading-4 font-medium whitespace-pre-wrap text-v3-muted">
                      {`${product.sku}${line.colour ? `  ·  ${line.colour}` : ""}  ·  ${formatKm(line.unitPrice)} po komadu`}
                    </p>
                    <p className="text-[12px] leading-4 font-semibold text-v3-green">Na zalihi</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Smanji količinu"
                      disabled={line.qty <= MIN_QTY}
                      onClick={() => onQty(line.key, Math.max(MIN_QTY, line.qty - QTY_STEP))}
                      className="grid size-7 place-items-center rounded-[4px] border border-v3-line text-[15px] font-bold text-v3-ink hover:border-v3-ink disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="min-w-[60px] text-center text-[14px] leading-[19px] font-bold text-v3-ink tabular-nums" aria-live="polite">
                      {line.qty} kom
                    </span>
                    <button
                      type="button"
                      aria-label="Povećaj količinu"
                      onClick={() => onQty(line.key, line.qty + QTY_STEP)}
                      className="grid size-7 place-items-center rounded-[4px] border border-v3-line text-[15px] font-bold text-v3-ink hover:border-v3-ink"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <p className="text-[16px] leading-[22px] font-extrabold text-v3-ink">{formatKm(line.qty * line.unitPrice)}</p>
                    <button type="button" onClick={() => onRemove(line.key)} className={cn(focusRing, "text-[12px] leading-4 font-medium text-v3-muted hover:text-v3-red")}>
                      Ukloni
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside aria-label="Sažetak" className="flex flex-col gap-[10px] rounded-[4px] border border-v3-line bg-white p-[18px] lg:w-[340px] lg:shrink-0">
            <h2 className="text-[18px] leading-6 font-extrabold text-v3-ink">Sažetak</h2>
            <Row label="Međuzbroj" value={formatKm(subtotal)} />
            <Row label="Dostava" value={delivery === 0 && lines.length > 0 ? "Besplatno" : formatKm(delivery)} positive={delivery === 0 && lines.length > 0} />
            <Row label={`PDV ${Math.round(VAT_RATE * 100)}%`} value={formatKm(vat)} />
            <div className="flex items-start justify-between pt-2 text-[16px] leading-[22px] font-extrabold text-v3-ink">
              <p>Ukupno</p>
              <p>{formatKm(total)}</p>
            </div>
            <button type="button" disabled={lines.length === 0} onClick={() => setCheckoutNote(true)} className={cn(btnRed, "h-[46px] w-full text-[15px] leading-5 disabled:opacity-40")}>
              Na blagajnu
            </button>
            {checkoutNote ? (
              <p role="status" className="rounded-[4px] bg-v3-soft px-3 py-2 text-[12px] leading-4 font-semibold text-v3-ink">
                Blagajna nije dio ovog prototipa.
              </p>
            ) : null}
            <p className="text-[12px] leading-4 font-medium text-v3-muted">
              {isFreeDelivery
                ? "Besplatna dostava jer je narudžba preko 410 KM. Cijene artikala su bez PDV-a."
                : `Do besplatne dostave nedostaje ${formatKm(Math.max(0, FREE_DELIVERY_FROM - subtotal))}. Cijene artikala su bez PDV-a.`}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, positive = false }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex items-start justify-between text-[13px] leading-[18px]">
      <p className="font-medium text-v3-muted">{label}</p>
      <p className={cn("font-bold", positive ? "text-v3-green" : "text-v3-ink")}>{value}</p>
    </div>
  );
}
