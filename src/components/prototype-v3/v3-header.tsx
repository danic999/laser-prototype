"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import { navLinks, PHONE_DISPLAY, PHONE_HREF } from "./data";
import type { Navigate, View } from "./navigation";
import { articleCount, focusRing, pagePad } from "./shared";

export function V3Header({ view, cartCount, navigate }: { view: View; cartCount: number; navigate: Navigate }) {
  const [query, setQuery] = useState(view.page === "listing" ? (view.query ?? "") : "");

  return (
    <header className="bg-white">
      <div className={cn(pagePad, "flex items-center justify-between gap-4 py-[6px] text-[12px] leading-4 font-medium")}>
        <p className="truncate text-v3-muted">Besplatna dostava za narudžbe preko 410 KM</p>
        {/* Right margin keeps the links clear of the fixed prototype switcher. */}
        <div className="mr-16 flex shrink-0 items-center gap-4 sm:mr-[136px]">
          <a href={PHONE_HREF} className={cn(focusRing, "hidden text-v3-muted hover:text-v3-ink sm:inline")}>
            Pomoć
          </a>
          <a href={PHONE_HREF} className={cn(focusRing, "font-semibold text-v3-ink hover:text-v3-red")}>
            {PHONE_DISPLAY}
          </a>
          <span className="hidden text-v3-muted sm:inline">Ljubuški</span>
        </div>
      </div>

      <div className={cn(pagePad, "flex flex-wrap items-center gap-x-6 gap-y-3 py-[14px] md:flex-nowrap")}>
        <button type="button" onClick={() => navigate({ page: "home" })} className={cn(focusRing, "shrink-0")} aria-label="LASER početna">
          <Image src="/v3/brand/logo.png" alt="LASER – Želite brend, stvorite brend" width={168} height={47} priority className="h-[47px] w-[168px] object-contain" />
        </button>
        <div className="order-last flex w-full items-center gap-6 md:order-none md:w-auto md:flex-1">
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate({ page: "listing", query: query.trim() });
            }}
            className="flex h-11 min-w-0 flex-1 overflow-hidden rounded-[4px] border-2 border-v3-red"
          >
            <label className="flex min-w-0 flex-1 items-center bg-white px-[14px]">
              <span className="sr-only">Pretraži proizvode</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pretraži olovke, torbe, kišobrane, boce..."
                className="min-w-0 flex-1 bg-transparent text-[14px] leading-[18px] font-medium text-v3-ink outline-none placeholder:text-v3-muted"
              />
            </label>
            <button type="submit" className="flex shrink-0 items-center gap-2 bg-v3-red px-[18px] text-[14px] leading-[18px] font-bold text-white transition-colors hover:bg-[#c00510] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white">
              <Image src="/v3/icons/search.svg" alt="" width={16} height={16} />
              Traži
            </button>
          </form>
        </div>
        <div className="ml-auto flex items-center gap-6 md:ml-0">
          <span className="hidden flex-col sm:flex">
            <span className="text-[11px] leading-[14px] font-medium text-v3-muted">Zdravo, prijavi se</span>
            <span className="text-[14px] leading-[18px] font-bold text-v3-ink">Moj račun</span>
          </span>
          <button type="button" onClick={() => navigate({ page: "cart" })} className={cn(focusRing, "flex items-center gap-2 text-left hover:opacity-80")}>
            <Image src="/v3/icons/cart.svg" alt="" width={22} height={22} />
            <span className="flex flex-col">
              <span className="text-[11px] leading-[14px] font-medium text-v3-muted">Košarica</span>
              <span className="text-[14px] leading-[18px] font-bold text-v3-ink">{articleCount(cartCount)}</span>
            </span>
          </button>
        </div>
      </div>

      <nav aria-label="Kategorije" className="border-b border-v3-line">
        <div className={cn(pagePad, "flex items-center gap-[2px] overflow-x-auto [scrollbar-width:none]")}>
          <button
            type="button"
            onClick={() => navigate({ page: "categories" })}
            aria-current={view.page === "categories" ? "page" : undefined}
            className="flex h-10 shrink-0 items-center gap-2 bg-v3-ink px-[14px] text-[13px] leading-[17px] font-bold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-v3-red"
          >
            <Image src="/v3/icons/menu.svg" alt="" width={16} height={16} />
            Sve kategorije
          </button>
          {navLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => navigate({ page: link.target })}
              className={cn(focusRing, "shrink-0 px-3 py-2 text-[13px] leading-[17px] font-semibold text-v3-ink transition-colors hover:text-v3-red")}
            >
              {link.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate({ page: "listing", saleOnly: true })}
            className={cn(focusRing, "shrink-0 px-3 py-2 text-[13px] leading-[17px] font-semibold text-v3-red hover:underline")}
          >
            Akcije
          </button>
        </div>
      </nav>
    </header>
  );
}
