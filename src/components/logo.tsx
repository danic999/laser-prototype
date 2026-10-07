import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";

export function Logo({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  const src = tone === "light" ? "/brand/logo-light.png" : "/brand/logo.png";
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={src}
        alt="LASER"
        width={423}
        height={139}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
