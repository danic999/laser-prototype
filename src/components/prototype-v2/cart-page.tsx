"use client";

import { useState } from "react";
import { cn } from "cn";
import { colourNames, DELIVERY_FEE, findProduct, printMethods, VAT_RATE, type PrintMethodId } from "./data";
import type { Navigate } from "./navigation";
import { QtyStepper } from "./product-page";
import { btnRed, formatKm, linkFocus, pagePad, ProductPhoto } from "./shared";

export type CartLine = {
  key: string;
  productId: string;
  colour: string;
  print: PrintMethodId;
  printSize: string;
  qty: number;
  unitPrice: number;
};

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
  const delivery = lines.length > 0 ? DELIVERY_FEE : 0;
  const vat = (subtotal + delivery) * VAT_RATE;
  const total = subtotal + delivery + vat;

  return (
    <main className={cn(pagePad, "flex flex-col gap-[22px] pt-8 pb-12")}>
      <div className="flex flex-col gap-1">
        <h1 className="text-[30px] leading-[38px] font-extrabold text-v2-ink sm:text-[36px] sm:leading-[42px]">Tvoja košarica</h1>
        <p className="text-[14px] leading-5 whitespace-pre-wrap text-v2-muted">
          {`${articleCount(lines.length)}  ·  otisak je i dalje besplatan prije proizvodnje`}
        </p>
      </div>

      <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
        <ul className="flex min-w-0 flex-1 flex-col gap-3">
          {lines.length === 0 ? (
            <li className="rounded-[16px] border border-v2-line p-6 text-[14px] leading-5 text-v2-muted">
              Košarica je prazna.{" "}
              <button type="button" onClick={() => navigate({ page: "listing" })} className={cn(linkFocus, "font-semibold text-v2-ink underline")}>
                Pogledaj olovke
              </button>
            </li>
          ) : null}
          {lines.map((line) => {
            const product = findProduct(line.productId);
            const method = printMethods.find((item) => item.id === line.print);
            return (
              <li key={line.key} className="flex flex-wrap items-center gap-4 rounded-[16px] border border-v2-line bg-white p-4 sm:flex-nowrap">
                <button type="button" onClick={() => navigate({ page: "product", id: product.id })} className="shrink-0 rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red" aria-label={product.name}>
                  <ProductPhoto photo={product.photo} sizes="96px" className="size-24 rounded-[12px]" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                  <p className="text-[16px] leading-[22px] font-semibold text-v2-ink">{product.name}</p>
                  <p className="text-[13px] leading-[18px] whitespace-pre-wrap text-v2-muted">
                    {`${colourNames[line.colour] ?? ""}  ·  ${method?.name ?? ""} ${line.printSize}`}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <QtyStepper size="small" value={line.qty} min={product.minQty} onChange={(qty) => onQty(line.key, qty)} />
                    <button type="button" onClick={() => onRemove(line.key)} className={cn(linkFocus, "text-[12px] font-medium text-v2-muted hover:text-v2-red")}>
                      Ukloni
                    </button>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end gap-[2px]">
                  <p className="text-[18px] leading-6 font-bold text-v2-ink">{formatKm(line.qty * line.unitPrice)}</p>
                  <p className="text-[12px] leading-4 text-v2-muted">{formatKm(line.unitPrice)} po komadu</p>
                </div>
              </li>
            );
          })}
        </ul>

        <aside aria-label="Sažetak narudžbe" className="flex flex-col gap-3 rounded-[16px] bg-v2-surface p-[22px] lg:w-[360px] lg:shrink-0">
          <h2 className="text-[18px] leading-6 font-bold text-v2-ink">Sažetak narudžbe</h2>
          <SummaryRow label="Međuzbroj" value={formatKm(subtotal)} />
          <SummaryRow label="Dostava" value={formatKm(delivery)} />
          <SummaryRow label={`PDV ${Math.round(VAT_RATE * 100)}%`} value={formatKm(vat)} />
          <div className="h-px bg-v2-line" />
          <div className="flex items-start justify-between font-bold text-v2-ink">
            <p className="text-[16px] leading-5">Ukupno</p>
            <p className="text-[18px] leading-[22px]">{formatKm(total)}</p>
          </div>
          <button type="button" disabled={lines.length === 0} onClick={() => setCheckoutNote(true)} className={cn(btnRed, "w-full disabled:opacity-40")}>
            Na blagajnu
          </button>
          {checkoutNote ? (
            <p role="status" className="rounded-[8px] bg-white px-3 py-2 text-[12px] leading-[18px] text-v2-ink">
              Blagajna nije dio ovog prototipa.
            </p>
          ) : null}
          <button type="button" onClick={() => navigate({ page: "listing" })} className={cn(linkFocus, "self-start text-[13px] font-semibold text-v2-ink hover:underline")}>
            Nastavi kupnju
          </button>
          <p className="text-[12px] leading-[18px] text-v2-muted">Besplatan digitalni otisak odobravaš prije nego što išta ide u tisak.</p>
        </aside>
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between text-[14px] text-v2-ink">
      <p className="leading-5">{label}</p>
      <p className="leading-[22px] font-semibold">{value}</p>
    </div>
  );
}

function articleCount(count: number): string {
  const lastTwo = count % 100;
  const last = count % 10;
  if (last === 1 && lastTwo !== 11) return `${count} artikl`;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${count} artikla`;
  return `${count} artikala`;
}
