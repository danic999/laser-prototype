import Image from "next/image";
import Link from "next/link";
import { entryTier, floorTier, formatKm, formatQty, savings, type Product } from "@/lib/catalog";
import { btnOutline } from "@/lib/ui";

export function ProductCard({ product }: { product: Product }) {
  const from = floorTier(product);
  const start = entryTier(product);
  const cover = product.colors[0];
  const cut = savings(product, from.unit);

  return (
    <article className="flex h-full flex-col bg-mist p-4 sm:p-6">
      <Link href={`/proizvod/${product.slug}`} className="block">
        <div className="relative aspect-square bg-mist">
          <Image
            src={cover.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain mix-blend-multiply"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[12px] leading-[1.33] text-charcoal">{cover.name}</p>
          <span className="inline-flex rounded-full bg-bass px-3 py-1 text-[12px] leading-none text-white">
            {product.inStock ? "Na zalihi" : "Na upit"}
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          {product.colors.slice(0, 5).map((color, index) => (
            <span
              key={color.id}
              title={color.name}
              className={`size-4 rounded-full border ${index === 0 ? "border-bass" : "border-steel"}`}
              style={{ background: color.hex }}
            />
          ))}
        </div>
        <h3 className="mt-3 font-sans text-[16px] leading-[1.4] font-medium text-bass">{product.name}</h3>
        <p className="text-[12px] text-charcoal">{product.sku}</p>
      </Link>
      <p className="mt-3 text-[16px] text-bass">
        Od <span className="font-medium">{formatKm(from.unit)}</span>
        <span className="text-charcoal"> / kom</span>
      </p>
      <p className="text-[12px] leading-[1.33] text-charcoal">
        Od {formatQty(start.qty)} kom · {formatKm(start.unit)}
        {cut > 0 ? ` · ušteda do ${cut}%` : ""}
      </p>
      <Link href={`/proizvod/${product.slug}`} className={`${btnOutline} mt-5 w-full`}>
        Odaberi
      </Link>
    </article>
  );
}
