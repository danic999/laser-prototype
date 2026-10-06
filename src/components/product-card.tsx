import Image from "next/image";
import Link from "next/link";
import { entryTier, floorTier, formatKm, formatQty, savings, type Product } from "@/lib/catalog";
import { btnPill, cardShadow } from "@/lib/ui";

export function ProductCard({ product }: { product: Product }) {
  const from = floorTier(product);
  const start = entryTier(product);
  const cover = product.colors[0];
  const cut = savings(product, from.unit);

  return (
    <article className={`flex h-full flex-col rounded-[28px] bg-white ${cardShadow}`}>
      <Link href={`/proizvod/${product.slug}`} className="block p-2">
        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-canvas">
          <Image
            src={cover.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-4 pt-2 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/proizvod/${product.slug}`}>
              <h3 className="text-[14px] leading-[1.33] font-medium tracking-[-0.014em]">{product.name}</h3>
            </Link>
            <p className="text-[12px] leading-[1.33] text-[#787574]">{product.sku}</p>
          </div>
          <span className="shrink-0 rounded-full border border-[#ebebeb] bg-white px-2.5 py-1 text-[12px] text-black shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            {product.inStock ? "Na zalihi" : "Na upit"}
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.id}
              title={color.name}
              className="size-4 rounded-full border border-[#ebebeb]"
              style={{ background: color.hex }}
            />
          ))}
        </div>
        <p className="mt-3 text-[16px] leading-[1.33] tracking-[-0.031em]">
          Od {formatKm(from.unit)}
          <span className="text-[#787574]"> / kom</span>
        </p>
        <p className="text-[12px] leading-[1.33] text-[#787574]">
          Od {formatQty(start.qty)} kom · {formatKm(start.unit)}
          {cut > 0 ? ` · do ${cut}%` : ""}
        </p>
        <Link href={`/proizvod/${product.slug}`} className={`${btnPill} mt-4 w-full`}>
          Odaberi
        </Link>
      </div>
    </article>
  );
}
