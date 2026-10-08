"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import { navCategories, usps } from "./data";
import type { Navigate, View } from "./navigation";
import { linkFocus, Logo, pagePad, Stars } from "./shared";

export function V2Header({
  view,
  cartCount,
  navigate,
}: {
  view: View;
  cartCount: number;
  navigate: Navigate;
}) {
  const [query, setQuery] = useState(view.page === "listing" ? (view.query ?? "") : "");

  return (
    <header>
      <div className="flex items-center justify-center gap-[10px] bg-v2-surface py-[10px]">
        <Stars label="5 od 5 zvjezdica" />
        <p className="text-[13px] leading-[18px] text-v2-muted">438 recenzija</p>
      </div>

      <div className="bg-v2-ink">
        <div className={cn(pagePad, "flex items-center justify-between py-[18px]")}>
          <button type="button" onClick={() => navigate({ page: "home" })} className={linkFocus} aria-label="LASER početna">
            <Logo />
          </button>
          <ul className="hidden items-center gap-7 lg:flex">
            {usps.map((usp) => (
              <li key={usp.title} className="flex items-center gap-[10px]">
                <Image src="/v2/icons/check.svg" alt="" width={22} height={22} />
                <span className="flex flex-col gap-px">
                  <span className="text-[13px] leading-[18px] font-bold text-white">{usp.title}</span>
                  <span className="text-[12px] leading-4 text-white/80">{usp.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-b border-v2-line bg-white">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            navigate({ page: "listing", query: query.trim() });
          }}
          className={cn(pagePad, "flex items-center gap-2 py-4 sm:gap-4")}
        >
          <label className="flex h-12 min-w-0 flex-1 items-center gap-[10px] rounded-[8px] border border-v2-line bg-white px-4 transition-colors focus-within:border-v2-ink">
            <Image src="/v2/icons/search.svg" alt="" width={20} height={20} />
            <span className="sr-only">Pretraži proizvode</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pretraži 10.000 promotivnih proizvoda"
              className="min-w-0 flex-1 bg-transparent text-[14px] leading-5 text-v2-ink outline-none placeholder:text-v2-muted"
            />
          </label>
          <button
            type="submit"
            className="h-12 shrink-0 rounded-[8px] bg-v2-ink px-4 text-[14px] leading-5 font-semibold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-ink sm:px-[22px]"
          >
            Traži
          </button>
          <span className="hidden items-center gap-2 px-2 md:flex">
            <Image src="/v2/icons/account.svg" alt="" width={20} height={20} />
            <span className="text-[13px] leading-[18px] font-semibold text-v2-ink">Prijava</span>
          </span>
          <button
            type="button"
            onClick={() => navigate({ page: "cart" })}
            className={cn(linkFocus, "flex shrink-0 items-center gap-2 px-2 text-v2-ink hover:opacity-80")}
          >
            <Image src="/v2/icons/basket.svg" alt="" width={20} height={20} />
            <span className="hidden text-[13px] leading-[18px] font-semibold sm:inline">Košarica</span>
            {cartCount > 0 ? (
              <span className="grid size-5 place-items-center rounded-[10px] bg-v2-red text-[11px] leading-[14px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
        </form>
      </div>

      <nav aria-label="Kategorije" className="border-b border-v2-line bg-white">
        <div className={cn(pagePad, "flex items-center gap-1 overflow-x-auto py-[10px] [scrollbar-width:none]")}>
          <button
            type="button"
            onClick={() => navigate({ page: "home" }, "v2-kategorije")}
            className="flex h-10 shrink-0 items-center gap-2 rounded-[8px] bg-v2-ink pr-3 pl-[14px] text-[14px] leading-5 font-semibold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-ink"
          >
            <Image src="/v2/icons/menu.svg" alt="" width={16} height={16} />
            Sve kategorije
            <Image src="/v2/icons/chevron-down.svg" alt="" width={14} height={14} />
          </button>
          {navCategories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => navigate({ page: "listing" })}
              className={cn(
                linkFocus,
                "shrink-0 rounded-[8px] px-3 py-2 text-[14px] leading-5 font-semibold text-v2-ink transition-colors hover:bg-v2-surface",
              )}
            >
              {name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate({ page: "listing" })}
            className={cn(
              linkFocus,
              "flex shrink-0 items-center gap-[6px] rounded-[8px] px-3 py-2 text-[14px] leading-5 font-semibold text-v2-red transition-colors hover:bg-v2-red-soft",
            )}
          >
            Akcije
            <Image src="/v2/icons/sale.svg" alt="" width={15} height={15} />
          </button>
        </div>
      </nav>
    </header>
  );
}
