import Image from "next/image";
import Link from "next/link";
import { entryTier, floorTier, formatKm, formatQty, savings, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const from = floorTier(product);
  const start = entryTier(product);
  const cover = product.colors[0];

  const cut = savings(product, from.unit);

  return (
    <article className="flex h-full flex-col border border-[#e3e5eb] bg-white p-3">
      <Link href={`/proizvod/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            src={cover.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-2"
          />
        </div>
        <div className="mt-2 flex gap-1.5">
          {product.colors.slice(0, 5).map((color) => (
            <span
              key={color.id}
              title={color.name}
              className="size-3 rounded-full border border-black/15"
              style={{ background: color.hex }}
            />
          ))}
        </div>
        <h3 className="mt-2 text-[15px] leading-snug font-extrabold">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.sku}</p>
      </Link>
      <p className="mt-2 text-sm">
        Od <span className="text-lg font-extrabold">{formatKm(from.unit)}</span>
        <span className="text-muted-foreground"> / kom</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Od {formatQty(start.qty)} kom · {formatKm(start.unit)}
        {cut > 0 ? ` · ušteda do ${cut}%` : ""}
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-stock">
        <span className="size-2 rounded-full bg-stock" />
        {product.inStock ? "Na zalihi" : "Na upit"}
      </p>
      <Link
        href={`/proizvod/${product.slug}`}
        className="mt-3 inline-flex h-10 items-center justify-center rounded-full border-2 border-orange text-sm font-extrabold hover:bg-orange hover:text-white"
      >
        Odaberi
      </Link>
    </article>
  );
}
