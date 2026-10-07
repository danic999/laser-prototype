"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { PromoAd } from "@/lib/home";
import { cardShadow } from "@/lib/ui";

const INTERVAL_MS = 4500;

export function PromoRotator({ ads }: { ads: PromoAd[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ads.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [ads.length, paused]);

  function step(delta: number) {
    setIndex((current) => (current + delta + ads.length) % ads.length);
  }

  const ad = ads[index];

  return (
    <div
      className="mx-auto w-full max-w-[440px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative"
        role="region"
        aria-roledescription="vrtuljak"
        aria-label="Akcije"
      >
        <div className={`overflow-hidden rounded-[28px] ${cardShadow}`}>
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {ads.map((item, itemIndex) => (
              <Link
                key={item.title}
                href={item.href}
                tabIndex={itemIndex === index ? 0 : -1}
                aria-hidden={itemIndex === index ? undefined : true}
                className="relative block aspect-[16/9] w-full shrink-0 basis-full bg-black text-white"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority={itemIndex === 0}
                  sizes="440px"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
                <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[12px] leading-none font-medium tracking-[-0.02em] text-black">
                  {item.kicker}
                </span>
                <span className="absolute right-4 bottom-3.5 left-4">
                  <span className="block text-[18px] leading-[1.2] font-medium tracking-[-0.04em] sm:text-[20px]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-[1.35] text-white/80">{item.line}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Prethodna reklama"
          onClick={() => step(-1)}
          className="absolute top-1/2 left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Sljedeća reklama"
          onClick={() => step(1)}
          className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5" role="tablist" aria-label="Reklame">
        {ads.map((item, itemIndex) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            aria-label={item.title}
            onClick={() => setIndex(itemIndex)}
            className={`h-1.5 rounded-full transition-all ${
              itemIndex === index ? "w-5 bg-black" : "w-1.5 bg-black/25"
            }`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {ad.title}. {ad.line}
      </p>
    </div>
  );
}
