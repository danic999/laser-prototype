"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatKm, formatQty, savings, unitForQty, type Product } from "@/lib/catalog";
import { btnFill, btnOutline } from "@/lib/ui";

export function ProductStudio({ product }: { product: Product }) {
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [print, setPrint] = useState(product.prints[0]);
  const [location, setLocation] = useState(product.locations[0]);
  const [qty, setQty] = useState(product.tiers[1]?.qty ?? product.minQty);

  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
  const safeQty = Math.max(product.minQty, qty || product.minQty);
  const unit = unitForQty(product, safeQty);
  const save = savings(product, unit);
  const total = unit * safeQty;

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams({
      sku: product.sku,
      artikal: product.name,
      boja: color.name,
      tisak: print,
      pozicija: location,
      kolicina: String(safeQty),
    });
    return `/ponuda?${params.toString()}`;
  }, [product, color.name, print, location, safeQty]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
      <div>
        <div className="rounded-[28px] bg-white p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
          <div className="relative aspect-square overflow-hidden rounded-[20px] bg-canvas">
            <Image
              src={color.image}
              alt={`${product.name}, ${color.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Fotografija je bez logotipa. Dokaz s vašim znakom dolazi prije izrade.
        </p>
      </div>
      <div className="rounded-[28px] bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-8">
        <p className="text-[12px] text-[#787574]">Odabir</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Od {formatKm(product.tiers.at(-1)!.unit)} / kom pri{" "}
          {formatQty(product.tiers.at(-1)!.qty)} kom
        </p>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Boja · {color.name}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setColorId(item.id)}
                className={`inline-flex size-12 items-center justify-center rounded-full border bg-mist ${item.id === color.id ? "border-bass" : "border-steel"}`}
                aria-label={item.name}
              >
                <span className="size-5 rounded-full border border-black/15" style={{ background: item.hex }} />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Tisak</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.prints.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPrint(item)}
                className={`rounded-full border px-4 py-2 text-[14px] tracking-[-0.014em] ${item === print ? "border-transparent bg-black text-white" : "border-[#ebebeb] bg-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Pozicija</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.locations.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLocation(item)}
                className={`rounded-full border px-4 py-2 text-[14px] tracking-[-0.014em] ${item === location ? "border-black bg-white" : "border-[#ebebeb] bg-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Količina</p>
            <label className="text-sm text-muted-foreground">
              min. {product.minQty}
              <input
                type="number"
                min={product.minQty}
                value={qty}
                onChange={(event) => setQty(Number(event.target.value))}
                className="ml-2 h-12 w-28 rounded-full border border-steel bg-white px-4 text-bass"
              />
            </label>
          </div>
          <div className="mt-3 divide-y divide-[#ebebeb] overflow-hidden rounded-[20px] border border-[#ebebeb] bg-white">
            {product.tiers.map((tier) => {
              const active = safeQty >= tier.qty && (product.tiers.find((next) => next.qty > tier.qty)?.qty ?? Infinity) > safeQty;
              const cut = savings(product, tier.unit);
              return (
                <button
                  key={tier.qty}
                  type="button"
                  onClick={() => setQty(tier.qty)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-[14px] tracking-[-0.014em] ${active ? "bg-black text-white" : "hover:bg-canvas"}`}
                >
                  <span>{formatQty(tier.qty)} kom</span>
                  <span className="flex items-center gap-3">
                    {cut > 0 ? <span className={active ? "text-white/70" : "text-charcoal"}>−{cut}%</span> : null}
                    <span className="font-medium">{formatKm(tier.unit)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Ukupno bez PDV-a</p>
            <p className="text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">{formatKm(total)}</p>
            <p className="text-sm text-muted-foreground">
              {formatKm(unit)} / kom
              {save > 0 ? ` · ušteda ${save}% u odnosu na minimum` : null}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm">Rok: {product.lead}.</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href={quoteHref} className={btnFill}>
            Zatraži ponudu
          </Link>
          <Link href={`${quoteHref}&uzorak=1`} className={btnOutline}>
            Zatraži uzorak
          </Link>
        </div>
        <p className="mt-4 text-[16px]">
          <Link href="/usluge" className="underline">
            Tehnike tiska u kući
          </Link>
        </p>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Ljestvica je primjer rasporeda cijena u prototipu. Službeni iznos i dalje potvrđuje veleprodaja.
          Dokaz tiska prije serije je predloženi korak novog shopa.
        </p>
      </div>
    </div>
  );
}
