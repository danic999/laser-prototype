import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "cn";

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat-v3",
});

export function formatKm(value: number): string {
  const [whole, cents] = value.toFixed(2).split(".");
  return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${cents} KM`;
}

export function articleCount(count: number): string {
  const lastTwo = count % 100;
  const last = count % 10;
  if (last === 1 && lastTwo !== 11) return `${count} artikl`;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${count} artikla`;
  return `${count} artikala`;
}

export function Photo({ src, sizes, className }: { src: string; sizes: string; className?: string }) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </span>
  );
}

const starSizes = { 12: "/v3/icons/star-small.svg", 14: "/v3/icons/star.svg", 16: "/v3/icons/star-large.svg" } as const;

export function Stars({ size, gap = "gap-[2px]" }: { size: keyof typeof starSizes; gap?: string }) {
  return (
    <span className={cn("flex items-center", gap)} role="img" aria-label="Ocjena 4,8 od 5">
      {Array.from({ length: 5 }, (_, index) => (
        <Image key={index} src={starSizes[size]} alt="" width={size} height={size} />
      ))}
    </span>
  );
}

export function Breadcrumb({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav aria-label="Putanja" className="flex flex-wrap items-center text-[12px] leading-4 font-medium text-v3-muted">
      {items.map((item, index) => (
        <span key={`${index}:${item.label}`} className="flex items-center">
          {index > 0 ? <span className="px-2">/</span> : null}
          {item.onClick ? (
            <button type="button" onClick={item.onClick} className={cn(focusRing, "hover:text-v3-ink hover:underline")}>
              {item.label}
            </button>
          ) : (
            <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export const pagePad = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10";
export const widePad = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-7";

export const focusRing = "rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red";

export const btnRed =
  "inline-flex items-center justify-center rounded-[4px] bg-v3-red font-bold text-white transition-[background-color,transform] hover:bg-[#c00510] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red";

export const cardHover =
  "transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#d4ccc0] hover:shadow-[0_8px_20px_rgba(18,18,18,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red";
