import Image from "next/image";

export function ProductMark({
  src,
  alt,
  logo,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  logo?: string | null;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[20px] bg-canvas">
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-contain" />
      {logo ? (
        // User files are data URLs, so they stay outside the image optimizer.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt="Vaš logo na artiklu"
          className="pointer-events-none absolute top-[58%] left-1/2 h-[16%] w-[30%] -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      ) : null}
    </div>
  );
}
