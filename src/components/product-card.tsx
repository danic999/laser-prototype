import Image from "next/image";
import Link from "next/link";
import { entryTier, floorTier, formatKm, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const from = floorTier(product);
  const start = entryTier(product);
  const cover = product.colors[0];

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-3 transition hover:border-ink/30">
      <Link href={`/proizvod/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
          <Image
            src={cover.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-3"
          />
        </div>
        <div className="mt-3 flex gap-1.5">
          {product.colors.slice(0, 5).map((color) => (
            <span
              key={color.id}
              title={color.name}
              className="size-3 rounded-full border border-black/15"
              style={{ background: color.hex }}
            />
          ))}
        </div>
        <h3 className="mt-2 font-heading text-base leading-snug font-medium">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.sku}</p>
      </Link>
      <div className="mt-3 space-y-0.5 text-sm">
        <p>
          <span className="font-medium">{formatKm(from.unit)}</span>
          <span className="text-muted-foreground"> / kom od {from.qty.toLocaleString("bs-BA")} kom</span>
        </p>
        <p className="text-muted-foreground">
          {start.qty.toLocaleString("bs-BA")} kom · {formatKm(start.unit)}
        </p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {product.inStock ? "Na zalihi u Ljubuškom" : "Na upit"}
      </p>
      <Link
        href={`/proizvod/${product.slug}`}
        className="mt-3 inline-flex h-10 items-center justify-center rounded-lg border border-ink text-sm font-medium hover:bg-ink hover:text-paper"
      >
        Odaberi
      </Link>
    </article>
  );
}
