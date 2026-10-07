"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PromoAd } from "@/lib/home";
import { cardShadow } from "@/lib/ui";

const INTERVAL_MS = 5000;

const places = [
  "left-0 top-4 -rotate-6 sm:left-[6%] sm:top-6",
  "left-1/2 top-0 z-10 -translate-x-1/2",
  "right-0 top-4 rotate-6 sm:top-8 sm:right-[6%]",
];

function FanCard({ ad }: { ad: PromoAd }) {
  return (
    <Link href={ad.href} className={`block overflow-hidden rounded-[22px] bg-black text-white ${cardShadow}`}>
      <span className="relative block h-[92px] sm:h-[112px]">
        <Image src={ad.image} alt={ad.alt} fill sizes="200px" className="object-cover" />
        <span className="absolute top-2 left-2 rounded-full bg-white px-2 py-0.5 text-[11px] leading-none font-medium tracking-[-0.02em] text-black">
          {ad.kicker}
        </span>
      </span>
      <span className="block px-2.5 py-2 sm:px-3 sm:py-2.5">
        <span className="line-clamp-2 block text-[13px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[14px]">
          {ad.title}
        </span>
        <span className="mt-0.5 line-clamp-2 hidden text-[12px] leading-[1.3] text-white/70 sm:block">
          {ad.line}
        </span>
      </span>
    </Link>
  );
}

function FanSlot({
  ad,
  className,
}: {
  ad: PromoAd;
  className: string;
}) {
  const shownRef = useRef(ad);
  const [current, setCurrent] = useState(ad);
  const [previous, setPrevious] = useState<PromoAd | null>(null);

  useEffect(() => {
    if (shownRef.current.title === ad.title) return;
    setPrevious(shownRef.current);
    shownRef.current = ad;
    setCurrent(ad);
  }, [ad, shownRef]);

  useEffect(() => {
    if (!previous) return;
    const id = window.setTimeout(() => setPrevious(null), 700);
    return () => window.clearTimeout(id);
  }, [previous]);

  return (
    <div className={`absolute w-[108px] sm:w-[200px] ${className}`}>
      {previous ? (
        <div className="pointer-events-none absolute inset-0">
          <FanCard ad={previous} />
        </div>
      ) : null}
      <div className={previous ? "motion-safe:animate-[fan-fade_700ms_ease]" : undefined}>
        <FanCard ad={current} />
      </div>
    </div>
  );
}

export function PromoFan({ ads }: { ads: PromoAd[] }) {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused || ads.length < 4) return;
    const id = window.setInterval(() => {
      setStart((current) => (current + 1) % ads.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [ads.length, paused]);

  const visible = places.map((_, offset) => ads[(start + offset) % ads.length]);

  return (
    <div
      className="relative mx-auto h-[176px] max-w-[400px] sm:h-[250px] sm:max-w-[760px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {visible.map((ad, index) => (
        <FanSlot key={places[index]} ad={ad} className={places[index]} />
      ))}
    </div>
  );
}
