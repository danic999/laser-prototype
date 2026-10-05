"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatKm, savings, unitForQty, type Product } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

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
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-white">
          <Image
            src={color.image}
            alt={`${product.name}, ${color.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-8"
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Fotografija je bez logotipa. Dokaz s vašim znakom dolazi prije izrade.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Odabir</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Od {formatKm(product.tiers.at(-1)!.unit)} / kom pri{" "}
          {product.tiers.at(-1)!.qty.toLocaleString("bs-BA")} kom
        </p>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Boja · {color.name}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setColorId(item.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${item.id === color.id ? "border-ink" : "border-border"}`}
              >
                <span className="size-3 rounded-full border border-black/15" style={{ background: item.hex }} />
                {item.name}
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
                className={`rounded-full border px-3 py-1.5 text-sm ${item === print ? "border-ink bg-ink text-paper" : "border-border"}`}
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
                className={`rounded-full border px-3 py-1.5 text-sm ${item === location ? "border-ink" : "border-border"}`}
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
                className="ml-2 h-9 w-24 rounded-lg border border-border bg-background px-2 text-foreground"
              />
            </label>
          </div>
          <div className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {product.tiers.map((tier) => {
              const active = safeQty >= tier.qty && (product.tiers.find((next) => next.qty > tier.qty)?.qty ?? Infinity) > safeQty;
              const cut = savings(product, tier.unit);
              return (
                <button
                  key={tier.qty}
                  type="button"
                  onClick={() => setQty(tier.qty)}
                  className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm ${active ? "bg-ink text-paper" : "hover:bg-muted"}`}
                >
                  <span>{tier.qty.toLocaleString("bs-BA")} kom</span>
                  <span className="flex items-center gap-3">
                    {cut > 0 ? <span className={active ? "text-paper/70" : "text-laser"}>−{cut}%</span> : null}
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
            <p className="font-heading text-3xl font-medium">{formatKm(total)}</p>
            <p className="text-sm text-muted-foreground">
              {formatKm(unit)} / kom
              {save > 0 ? ` · ušteda ${save}% u odnosu na minimum` : null}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm">Rok: {product.lead}.</p>
        <div className="mt-5 flex flex-col gap-2">
          <Button render={<Link href={quoteHref} />} className="h-11 bg-laser text-white hover:bg-laser/90">
            Zatraži ponudu
          </Button>
          <Button
            variant="outline"
            render={<Link href={`${quoteHref}&uzorak=1`} />}
            className="h-11"
          >
            Zatraži uzorak
          </Button>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Ljestvica je primjer rasporeda cijena u prototipu. Službeni iznos i dalje potvrđuje veleprodaja.
          Dokaz tiska prije serije je predloženi korak novog shopa.
        </p>
      </div>
    </div>
  );
}
