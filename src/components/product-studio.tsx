"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { useAccount } from "@/components/account-provider";
import { useCart } from "@/components/cart-provider";
import { ProductMark } from "@/components/product-mark";
import { formatKm, formatQty, savings, unitForQty, type Product } from "@/lib/catalog";

export function ProductStudio({ product }: { product: Product }) {
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [print, setPrint] = useState(product.prints[0]);
  const [location, setLocation] = useState(product.locations[0]);
  const [qty, setQty] = useState(product.tiers[1]?.qty ?? product.minQty);
  const [logo, setLogo] = useState<string | null>(null);
  const [logoError, setLogoError] = useState("");
  const router = useRouter();
  const { addItem } = useCart();
  const { user } = useAccount();

  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
  const safeQty = Math.max(product.minQty, qty || product.minQty);
  const unit = unitForQty(product, safeQty);
  const save = savings(product, unit);
  const total = unit * safeQty;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
      <div>
        <div className="rounded-[28px] bg-white p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
          <ProductMark src={color.image} alt={`${product.name}, ${color.name}`} priority />
        </div>
        <div className="mt-4 flex items-start gap-3">
          <label className="flex size-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-[22px] border-2 border-dashed border-[#e2231a] bg-[#fff4f2] px-3 text-center shadow-[0_8px_20px_rgba(226,35,26,0.14)]">
            {logo ? (
              // User files are data URLs, so they stay outside the image optimizer.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="" className="h-16 w-full object-contain" />
            ) : (
              <span className="grid size-12 place-items-center rounded-[16px] bg-[#e2231a] text-white">
                <ImagePlus className="size-5" strokeWidth={1.75} />
              </span>
            )}
            <span className="text-[14px] leading-tight font-medium tracking-[-0.02em]">
              {logo ? "Promijeni logo" : "Učitaj svoj logo"}
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file) return;
                setLogoError("");
                prepareLogo(file)
                  .then(setLogo)
                  .catch(() => setLogoError("Logo nije učitan. Probaj PNG, JPG ili SVG."));
              }}
            />
          </label>
          {logo ? (
            <button type="button" onClick={() => setLogo(null)} className="mt-2 text-[14px] text-[#e2231a] underline">
              Ukloni
            </button>
          ) : null}
        </div>
        {logoError ? <p className="mt-2 text-[14px]">{logoError}</p> : null}
        <div className="mt-6">
          <h2 className="text-[20px] leading-[1.2] font-medium tracking-[-0.05em]">Opis</h2>
          <p className="mt-2 max-w-xl text-[16px] leading-[1.45] text-[#3d3a39]">{product.description}</p>
        </div>
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
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              addItem({
                slug: product.slug,
                name: product.name,
                sku: product.sku,
                image: color.image,
                colorName: color.name,
                print,
                location,
                qty: safeQty,
                logo,
              });
              router.push("/kosarica");
            }}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black text-[16px] text-white"
          >
            Naruči
          </button>
          {user ? null : (
            <p className="mt-3 text-center text-[14px] leading-[1.4] text-[#787574]">
              Narudžba ide samo s registriranim računom.
            </p>
          )}
        </div>
        <p className="mt-4 text-[16px]">
          <Link href="/usluge" className="underline">
            Tehnike tiska u kući
          </Link>
        </p>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Ljestvica je primjer rasporeda cijena. Iznos je bez PDV-a.
        </p>
      </div>
    </div>
  );
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function prepareLogo(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("type");
  const data = await readFile(file);
  if (file.type === "image/svg+xml") return data;
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("img"));
    img.src = data;
  });
  const max = 480;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}
