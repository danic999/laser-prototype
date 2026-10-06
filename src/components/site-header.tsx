"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, House, Info, LayoutGrid, Menu, Phone, Printer, ShoppingBag } from "lucide-react";
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

const rail = [
  { href: "/", label: "Naslovnica", icon: House },
  { href: "/#paketi", label: "Paketi", icon: Gift },
  { href: "/usluge", label: "Usluge", icon: Printer },
  { href: "/o-nama", label: "O nama", icon: Info },
  { href: "/ponuda", label: "Ponuda", icon: ShoppingBag },
];

function CategoryPanel() {
  const [active, setActive] = useState(categories[0].slug);
  const current = categories.find((category) => category.slug === active) ?? categories[0];

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Kategorije"
        className="flex size-12 items-center justify-center rounded-[20px] text-black group-hover:bg-canvas"
      >
        <LayoutGrid className="size-5" strokeWidth={1.75} />
      </button>
      <div className="invisible absolute top-0 left-14 z-50 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid w-[680px] grid-cols-[220px_1fr] rounded-[28px] bg-white text-black shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
          <ul className="max-h-[70vh] overflow-auto py-3">
            {categories.map((category) => (
              <li key={category.slug} onMouseEnter={() => setActive(category.slug)}>
                <Link
                  href={`/kategorija/${category.slug}`}
                  className={`block px-4 py-2 text-[14px] tracking-[-0.014em] ${category.slug === current.slug ? "bg-canvas" : "hover:bg-canvas"}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="max-h-[70vh] overflow-auto p-5">
            <Link href={`/kategorija/${current.slug}`} className="text-[14px] font-medium tracking-[-0.014em]">
              Sve · {current.name}
            </Link>
            <ul className="mt-3 columns-2 gap-x-6">
              {current.subs.map((sub) => (
                <li key={sub.slug} className="mb-1 break-inside-avoid">
                  <Link
                    href={`/kategorija/${current.slug}/${sub.slug}`}
                    className="block py-1 text-[14px] tracking-[-0.014em] text-[#787574] hover:text-black"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:hidden"
        aria-label="Izbornik"
      >
        <Menu className="size-4" strokeWidth={1.75} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100%,22rem)] overflow-y-auto rounded-none bg-white">
        <SheetHeader>
          <SheetTitle className="text-[20px] font-medium tracking-[-0.05em]">LASER</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 px-4 pb-10">
          <SearchBar />
          {rail.map((item) => (
            <Link key={item.href} href={item.href} className="text-[16px] tracking-[-0.031em]">
              {item.label}
            </Link>
          ))}
          {categories.map((category) => (
            <div key={category.slug}>
              <Link href={`/kategorija/${category.slug}`} className="text-[16px] font-medium tracking-[-0.031em]">
                {category.name}
              </Link>
              <div className="mt-1 flex flex-col">
                {category.subs.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/kategorija/${category.slug}/${sub.slug}`}
                    className="py-1 text-[14px] text-[#787574]"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const path = usePathname();
  const home = path === "/";

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col items-center bg-white py-4 lg:flex">
        <CategoryPanel />
        <nav className="mt-4 flex flex-1 flex-col items-center gap-1">
          {rail.map((item) => {
            const active = item.href === "/" ? home : path.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`flex size-12 items-center justify-center rounded-[20px] ${active ? "bg-canvas" : "hover:bg-canvas"}`}
              >
                <item.icon className="size-5" strokeWidth={1.75} />
              </Link>
            );
          })}
        </nav>
        <a
          href="tel:+38739830773"
          aria-label="Nazovi +387 39 830 773"
          className="flex size-12 items-center justify-center rounded-[20px] hover:bg-canvas"
        >
          <Phone className="size-5" strokeWidth={1.75} />
        </a>
      </aside>
      <div className={`bg-canvas ${home ? "lg:hidden" : ""} lg:pl-16`}>
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <MobileMenu />
          <Logo />
          {home ? null : <SearchBar className="hidden min-w-0 flex-1 md:block" />}
          <div className="ml-auto flex items-center gap-2">
            <a
              href="tel:+38739830773"
              aria-label="Nazovi"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <Phone className="size-4" strokeWidth={1.75} />
            </a>
            <Link
              href="/ponuda"
              aria-label="Upit za ponudu"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <ShoppingBag className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
