import { cn } from "cn";
import { findProduct, type Placement } from "./data";
import { cardHover, formatKm, Photo, Stars } from "./shared";

type Variant = "deal" | "row" | "listing" | "related";

const layout: Record<Variant, { card: string; photo: string; price: string }> = {
  deal: { card: "gap-2 rounded-[4px] px-3 pt-3 pb-[14px]", photo: "h-[150px]", price: "text-[20px] leading-[27px]" },
  row: { card: "gap-[6px] rounded-[6px] px-[10px] pt-[10px] pb-3", photo: "h-[130px] rounded-[4px]", price: "text-[18px] leading-[23px]" },
  listing: { card: "gap-[6px] rounded-[4px] px-[10px] pt-[10px] pb-3", photo: "h-[150px]", price: "text-[18px] leading-6" },
  related: { card: "gap-[6px] rounded-[8px] px-[10px] pt-[10px] pb-3", photo: "h-[150px] rounded-[4px]", price: "text-[16px] leading-[22px]" },
};

export function ProductCard({ placement, variant, onOpen }: { placement: Placement; variant: Variant; onOpen: () => void }) {
  const product = findProduct(placement.id);
  const styles = layout[variant];
  const showOldPrice = variant !== "related" && product.oldPrice;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn("group flex w-full flex-col items-start border border-v3-line bg-white text-left", cardHover, styles.card)}
    >
      <Photo
        src={placement.photo ?? product.photo}
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 33vw, 50vw"
        className={cn("w-full shrink-0", styles.photo)}
      />
      <span className="text-[13px] leading-[18px] font-semibold text-v3-ink group-hover:text-v3-red">{placement.name ?? product.name}</span>
      {variant !== "row" ? <span className="text-[11px] leading-[15px] font-medium text-v3-muted">{product.sku}</span> : null}
      {variant === "deal" ? (
        <span className="flex items-center gap-[2px]">
          <Stars size={14} />
          <span className="text-[12px] leading-4 font-medium text-v3-muted">4,8</span>
        </span>
      ) : null}
      {variant === "row" ? <Stars size={12} gap="gap-px" /> : null}
      <span className={cn("flex items-center", variant === "row" ? "gap-[6px]" : "gap-2")}>
        <span className={cn("font-extrabold text-v3-ink", styles.price)}>{formatKm(product.price)}</span>
        {showOldPrice ? <s className="text-[12px] leading-4 font-medium text-v3-muted">{formatKm(product.oldPrice ?? 0)}</s> : null}
      </span>
      {variant === "deal" ? <Status label="Na zalihi" /> : null}
      {variant === "listing" ? <Status label={product.oldPrice ? "Akcija" : "Na zalihi"} /> : null}
      {variant === "row" ? <span className="text-[11px] leading-[14px] font-semibold text-v3-green">Besplatna dostava preko 410 KM</span> : null}
    </button>
  );
}

function Status({ label }: { label: "Akcija" | "Na zalihi" }) {
  return <span className={cn("text-[12px] leading-4 font-semibold", label === "Akcija" ? "text-v3-red" : "text-v3-green")}>{label}</span>;
}
