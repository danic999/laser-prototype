"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Menu, Phone, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/lib/catalog";

const links = [
  { href: "/#paketi", label: "Akcije" },
  { href: "/kategorija/torbe-i-putovanja/pamucne-torbe", label: "Održivo" },
  { href: "/pretraga", label: "Brza isporuka" },
  { href: "/#najprodavanije", label: "Najprodavanije" },
  { href: "/usluge", label: "Usluge" },
  { href: "/o-nama", label: "O nama" },
];

const usps = [
  ["Direktan uvoz", "Stalna zaliha"],
  ["Dokaz prije tiska", "Znate što dobivate"],
  ["Tisak u kući", "Gravura, UV, DTF"],
];

function CategoryMenu() {
  const [active, setActive] = useState(categories[0].slug);
  const current = categories.find((category) => category.slug === active) ?? categories[0];

  return (
    <div className="group relative py-2">
      <button
        type="button"
        className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-navy"
      >
        Sve kategorije
        <ChevronDown className="size-4" />
      </button>
      <div className="invisible absolute top-full left-0 z-30 pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid w-[680px] grid-cols-[240px_1fr] overflow-hidden rounded-lg border border-[#e3e5eb] bg-white text-navy shadow-lg">
          <ul className="max-h-[70vh] overflow-auto border-r border-[#e3e5eb] py-2">
            {categories.map((category) => (
              <li key={category.slug} onMouseEnter={() => setActive(category.slug)}>
                <Link
                  href={`/kategorija/${category.slug}`}
                  className={`block px-4 py-2 text-sm font-semibold ${category.slug === current.slug ? "bg-[#f5f8fa]" : "hover:bg-[#f5f8fa]"}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="max-h-[70vh] overflow-auto p-4">
            <Link href={`/kategorija/${current.slug}`} className="text-sm font-extrabold">
              Sve · {current.name}
            </Link>
            <ul className="mt-3 columns-2 gap-x-6">
              {current.subs.map((sub) => (
                <li key={sub.slug} className="mb-1 break-inside-avoid">
                  <Link
                    href={`/kategorija/${current.slug}/${sub.slug}`}
                    className="block py-1 text-sm text-[#3c4468] hover:text-orange"
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

function SearchForm({ className }: { className?: string }) {
  return (
    <form action="/pretraga" className={className}>
      <label className="relative block">
        <span className="sr-only">Pretraga asortimana</span>
        <Input
          name="q"
          placeholder="Koji proizvod tražite?"
          className="h-10 rounded-full border-[#e3e5eb] bg-white pr-10 pl-4"
        />
        <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-navy" />
      </label>
    </form>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_#e3e5eb]">
      <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-4 py-3 sm:px-6">
        <Logo />
        <div className="hidden min-w-0 flex-1 flex-col gap-2 lg:flex">
          <ul className="grid grid-cols-3 gap-2 text-[13px] leading-tight">
            {usps.map(([title, line]) => (
              <li key={title} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-stock" strokeWidth={3} />
                <span>
                  <span className="block font-bold text-navy">{title}</span>
                  <span className="text-muted-foreground">{line}</span>
                </span>
              </li>
            ))}
          </ul>
          <SearchForm />
        </div>
        <a href="tel:+38739830773" className="ml-auto hidden items-center gap-2 text-sm lg:flex">
          <Phone className="size-5 text-navy" />
          <span>
            <span className="block text-base leading-none font-extrabold">+387 39 830 773</span>
            <span className="text-xs text-muted-foreground">08:00–16:00</span>
          </span>
        </a>
        <Sheet>
          <SheetTrigger
            className="ml-auto inline-flex size-10 items-center justify-center rounded-full border border-[#e3e5eb] lg:hidden"
            aria-label="Izbornik"
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,22rem)] bg-white">
            <SheetHeader>
              <SheetTitle>LASER</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4 pb-6">
              <SearchForm />
              <a href="tel:+38739830773" className="text-sm font-bold">
                +387 39 830 773
              </a>
              {categories.map((category) => (
                <div key={category.slug}>
                  <Link href={`/kategorija/${category.slug}`} className="text-sm font-bold">
                    {category.name}
                  </Link>
                  <div className="mt-1 mb-3 flex flex-col">
                    {category.subs.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/kategorija/${category.slug}/${sub.slug}`}
                        className="py-1 text-sm text-muted-foreground"
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
      </div>
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-[1180px] items-center gap-1 px-4 sm:px-6">
          <CategoryMenu />
          <nav className="hidden items-center md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-3 text-sm font-semibold text-white/95 hover:text-orange">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/ponuda" className="ml-auto inline-flex items-center gap-2 py-3 text-sm font-semibold">
            <ShoppingBag className="size-5" />
            <span className="hidden sm:inline">Ponuda</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
