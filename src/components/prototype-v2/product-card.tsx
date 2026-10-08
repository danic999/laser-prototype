import { cn } from "cn";
import type { Product } from "./data";
import { ColourDots, formatKm, ProductPhoto } from "./shared";

type Variant = "bestseller" | "listing" | "related";

const layout: Record<Variant, { card: string; photo: string; info: string; name: string }> = {
  bestseller: { card: "rounded-[16px]", photo: "h-[176px]", info: "gap-2 px-4 pt-[14px] pb-4", name: "text-[15px]" },
  listing: { card: "rounded-[16px]", photo: "h-[148px]", info: "gap-2 px-[14px] pt-3 pb-[14px]", name: "text-[14px]" },
  related: { card: "rounded-[14px]", photo: "h-[120px]", info: "gap-1 px-3 pt-[10px] pb-3", name: "text-[13px] leading-[18px]" },
};

export function ProductCard({
  product,
  variant,
  onOpen,
}: {
  product: Product;
  variant: Variant;
  onOpen: () => void;
}) {
  const styles = layout[variant];

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex w-full flex-col overflow-hidden border border-v2-line bg-white text-left transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#d8d0c4] hover:shadow-[0_10px_24px_rgba(18,18,18,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
        styles.card,
      )}
    >
      <ProductPhoto
        photo={product.photo}
        sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
        className={cn("w-full shrink-0", styles.photo)}
      />
      <span className={cn("flex w-full flex-col items-start", styles.info)}>
        <span className={cn("leading-5 font-semibold text-v2-ink", styles.name)}>{product.name}</span>
        {variant === "related" ? (
          <span className="text-[14px] leading-[18px] font-bold text-v2-ink">Od {formatKm(product.price)}</span>
        ) : (
          <PriceRow
            product={product}
            oldPrice={variant === "bestseller" ? (product.bestsellerOldPrice ?? product.oldPrice) : product.oldPrice}
            compact={variant === "listing"}
          />
        )}
        {variant === "bestseller" ? (
          <span className="rounded-[6px] bg-v2-red-soft px-2 py-1 text-[11px] leading-[14px] font-semibold text-v2-red">Tisak od 50 kom</span>
        ) : null}
        {variant === "listing" ? (
          <>
            <ColourDots colours={product.colours} />
            <span className="text-[12px] leading-4 font-medium text-v2-muted">Od {product.minQty} kom</span>
          </>
        ) : null}
      </span>
    </button>
  );
}

function PriceRow({ product, oldPrice, compact }: { product: Product; oldPrice?: number; compact: boolean }) {
  return (
    <span className={cn("flex items-center", compact ? "gap-[6px]" : "gap-2")}>
      {oldPrice ? (
        <s className={cn("text-v2-muted", compact ? "text-[12px] leading-4" : "text-[13px] leading-[18px]")}>
          {formatKm(oldPrice)}
        </s>
      ) : null}
      <span className="text-[16px] leading-5 font-bold text-v2-ink">{formatKm(product.price)}</span>
      <span className="text-[12px] leading-4 text-v2-muted">po komadu</span>
    </span>
  );
}
