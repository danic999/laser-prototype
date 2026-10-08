import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "cn";
import type { Photo } from "./data";

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export function formatKm(value: number): string {
  const [whole, cents] = value.toFixed(2).split(".");
  return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${cents} KM`;
}

export function formatQty(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function ProductPhoto({
  photo,
  sizes,
  className,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {photo.crop ? (
        <div
          className="absolute"
          style={{ width: photo.crop.size, height: photo.crop.size, left: photo.crop.left, top: photo.crop.top }}
        >
          <Image src={photo.src} alt="" fill sizes={sizes} />
        </div>
      ) : (
        <Image src={photo.src} alt="" fill sizes={sizes} className="object-cover" />
      )}
    </div>
  );
}

export function Stars({ label }: { label?: string }) {
  return (
    <span className="flex items-center gap-[2px]" role={label ? "img" : undefined} aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Image key={index} src="/v2/icons/star.svg" alt="" width={14} height={14} />
      ))}
    </span>
  );
}

export function ColourDots({ colours }: { colours: string[] }) {
  return (
    <span className="flex gap-[6px]" aria-label={`${colours.length} boje`}>
      {colours.map((colour) => (
        <span
          key={colour}
          className="size-3 rounded-full border border-v2-line"
          style={{ backgroundColor: colour }}
        />
      ))}
    </span>
  );
}

export function Logo() {
  return (
    <span className="relative flex items-center overflow-hidden py-[2px]">
      <span className="absolute top-[14px] left-0 h-[3px] w-[104px] bg-v2-red" />
      <span className="relative block h-[44px] w-[165px] overflow-hidden">
        <Image
          src="/v2/brand/laser-logo.png"
          alt="LASER"
          width={165}
          height={133}
          className="absolute top-[-101.04%] left-0 h-[302.08%] w-full max-w-none"
        />
      </span>
    </span>
  );
}

export function SectionTitles({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-[26px] leading-[34px] font-extrabold text-v2-ink sm:text-[32px] sm:leading-[40px]">{title}</h2>
      <p className="text-[15px] leading-[22px] text-v2-muted">{note}</p>
    </div>
  );
}

export const pagePad = "mx-auto w-full max-w-[1440px] px-4 sm:px-8 xl:px-20";

export const btnRed =
  "inline-flex h-12 items-center justify-center rounded-[8px] bg-v2-red px-5 text-[15px] leading-5 font-semibold text-white transition-[filter,transform] hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red";

export const btnInk =
  "inline-flex h-12 items-center justify-center rounded-[8px] bg-v2-ink px-5 text-[15px] leading-5 font-semibold text-white transition-[background-color,transform] hover:bg-black active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-ink";

export const linkFocus = "rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red";
