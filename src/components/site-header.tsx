"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePercent, House, Info, LayoutGrid, Phone, ShoppingBag, User } from "lucide-react";
import { useAccount } from "@/components/account-provider";
import { useCart } from "@/components/cart-provider";
import { Logo } from "@/components/logo";
import { SearchBar } from "@/components/search-bar";
import { categories } from "@/lib/catalog";

function CategoryList({ onNavigate }: { onNavigate?: () => void }) {
  const [active, setActive] = useState(categories[0].slug);
  const current = categories.find((category) => category.slug === active) ?? categories[0];

  return (
    <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
      <ul className="max-h-[50vh] overflow-auto sm:max-h-[60vh]">
        {categories.map((category) => (
          <li key={category.slug}>
            <button
              type="button"
              onMouseEnter={() => setActive(category.slug)}
              onFocus={() => setActive(category.slug)}
              onClick={() => setActive(category.slug)}
              className={`block w-full px-1 py-2 text-left text-[15px] tracking-[-0.014em] ${category.slug === current.slug ? "font-medium" : "text-[#787574]"}`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="max-h-[50vh] overflow-auto sm:max-h-[60vh]">
        <Link href={`/kategorija/${current.slug}`} onClick={onNavigate} className="text-[15px] font-medium tracking-[-0.014em]">
          Sve · {current.name}
        </Link>
        <ul className="mt-3 columns-2 gap-x-6">
          {current.subs.map((sub) => (
            <li key={sub.slug} className="mb-1 break-inside-avoid">
              <Link
                href={`/kategorija/${current.slug}/${sub.slug}`}
                onClick={onNavigate}
                className="block py-1 text-[14px] tracking-[-0.014em] text-[#787574] hover:text-black"
              >
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CartBadge({ count, className }: { count: number; className?: string }) {
  if (count < 1) return null;
  return (
    <span className={`absolute grid min-w-5 place-items-center rounded-full bg-black px-1 text-[11px] leading-5 text-white ${className ?? "top-1 right-1"}`}>
      {count}
    </span>
  );
}

export function SiteHeader() {
  const path = usePathname();
  const home = path === "/";
  const { count } = useCart();
  const { user } = useAccount();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const profileHref = user ? "/racun" : "/prijava";

  const tabs = [
    { href: "/", label: "Home", icon: House, active: path === "/" },
    { href: "/o-nama", label: "Info", icon: Info, active: path.startsWith("/o-nama") },
    { href: "/#paketi", label: "Deals", icon: BadgePercent, active: false },
    { href: "/kosarica", label: "Košarica", icon: ShoppingBag, active: path.startsWith("/kosarica") },
    {
      href: profileHref,
      label: "Profil",
      icon: User,
      active: path.startsWith("/racun") || path.startsWith("/prijava") || path.startsWith("/registracija"),
    },
  ];

  return (
    <>
      <div className={`bg-canvas pr-[76px] pl-[88px] sm:pr-[152px] ${home ? "lg:hidden" : ""}`}>
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <Logo />
          {home ? null : (
            <SearchBar className="min-w-0 flex-1 [&_button]:size-9 [&_input]:h-11 [&_input]:pr-12 [&_input]:pl-4 [&_input]:text-[14px] sm:[&_button]:size-12 sm:[&_input]:h-14 sm:[&_input]:pr-16 sm:[&_input]:pl-5 sm:[&_input]:text-[16px]" />
          )}
        </div>
      </div>
      <nav className="fixed inset-y-0 left-0 z-50 flex w-[88px] flex-col items-center border-r border-[#ebebeb] bg-white py-3">
        <RailLink href="/" label="Home" icon={House} active={tabs[0].active} />
        <button
          type="button"
          aria-expanded={categoriesOpen}
          onClick={() => setCategoriesOpen((open) => !open)}
          className={`flex w-full flex-col items-center gap-1 px-1 py-2.5 text-[11px] leading-none tracking-[-0.02em] ${path.startsWith("/kategorija") || categoriesOpen ? "font-medium text-black" : "text-[#787574]"}`}
        >
          <LayoutGrid className="size-5" strokeWidth={1.75} />
          Kategorije
        </button>
        {tabs.slice(1).map((item) => (
          <RailLink key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} badge={item.href === "/kosarica" ? count : 0} />
        ))}
        <a
          href="tel:+38739830773"
          aria-label="Nazovi"
          className="mt-auto mb-1 flex size-10 items-center justify-center rounded-full text-[#787574] hover:bg-canvas hover:text-black"
        >
          <Phone className="size-4" strokeWidth={1.75} />
        </a>
      </nav>
      {categoriesOpen ? (
        <>
          <button
            type="button"
            aria-label="Zatvori kategorije"
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setCategoriesOpen(false)}
          />
          <div className="fixed inset-y-0 left-[88px] z-50 w-[min(640px,calc(100vw-88px))] overflow-y-auto bg-white shadow-[4px_0_24px_rgba(0,0,0,0.08)]">
            <div className="px-5 py-5">
              <p className="mb-4 text-[20px] font-medium tracking-[-0.05em]">Kategorije</p>
              <CategoryList onNavigate={() => setCategoriesOpen(false)} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function RailLink({
  href,
  label,
  icon: Icon,
  active,
  badge = 0,
}: {
  href: string;
  label: string;
  icon: typeof House;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className={`flex w-full flex-col items-center gap-1 px-1 py-2.5 text-[11px] leading-none tracking-[-0.02em] ${active ? "font-medium text-black" : "text-[#787574] hover:text-black"}`}
    >
      <span className="relative">
        <Icon className="size-5" strokeWidth={1.75} />
        {badge > 0 ? <CartBadge count={badge} className="-top-2 -right-3" /> : null}
      </span>
      {label}
    </Link>
  );
}
