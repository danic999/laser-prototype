"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePercent, House, Info, LayoutGrid, Phone, ShoppingBag, User } from "lucide-react";
import { useAccount } from "@/components/account-provider";
import { useCart } from "@/components/cart-provider";
import { Logo } from "@/components/logo";
import { SearchBar } from "@/components/search-bar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
      <div className={`bg-canvas ${home ? "lg:hidden" : ""}`}>
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <Logo />
          {home ? null : (
            <SearchBar className="min-w-0 flex-1 [&_button]:size-9 [&_input]:h-11 [&_input]:pr-12 [&_input]:pl-4 [&_input]:text-[14px] sm:[&_button]:size-12 sm:[&_input]:h-14 sm:[&_input]:pr-16 sm:[&_input]:pl-5 sm:[&_input]:text-[16px]" />
          )}
          <a
            href="tel:+38739830773"
            aria-label="Nazovi"
            className="ml-auto hidden size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:inline-flex"
          >
            <Phone className="size-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ebebeb] bg-white pb-[max(0.35rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto grid max-w-[720px] grid-cols-6">
          <TabLink href="/" label="Home" icon={House} active={tabs[0].active} />
          <Sheet open={categoriesOpen} onOpenChange={setCategoriesOpen}>
            <SheetTrigger
              className={`flex flex-col items-center gap-1 px-0.5 py-2 text-[11px] leading-none tracking-[-0.02em] whitespace-nowrap ${path.startsWith("/kategorija") ? "font-medium text-black" : "text-[#787574]"}`}
            >
              <LayoutGrid className="size-5" strokeWidth={1.75} />
              Kategorije
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-[28px] bg-white">
              <SheetHeader>
                <SheetTitle className="tracking-[-0.03em]">Kategorije</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-8">
                <CategoryList onNavigate={() => setCategoriesOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          {tabs.slice(1).map((item) => (
            <TabLink key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} badge={item.href === "/kosarica" ? count : 0} />
          ))}
        </div>
      </nav>
    </>
  );
}

function TabLink({
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
      className={`relative flex flex-col items-center gap-1 px-0.5 py-2 text-[11px] leading-none tracking-[-0.02em] whitespace-nowrap ${active ? "font-medium text-black" : "text-[#787574]"}`}
    >
      <span className="relative">
        <Icon className="size-5" strokeWidth={1.75} />
        {badge > 0 ? <CartBadge count={badge} className="-top-2 -right-3" /> : null}
      </span>
      {label}
    </Link>
  );
}
