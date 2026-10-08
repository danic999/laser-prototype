import Image from "next/image";

export function ProductMark({
  src,
  alt,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[20px] bg-canvas">
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-contain" />
    </div>
  );
}
