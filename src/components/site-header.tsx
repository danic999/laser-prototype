"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
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
  { href: "/#paketi", label: "Paketi" },
  { href: "/#najprodavanije", label: "Najprodavanije", wide: true },
  { href: "/usluge", label: "Usluge" },
  { href: "/o-nama", label: "O nama", wide: true },
];

function CategoryMenu() {
  const [active, setActive] = useState(categories[0].slug);
  const current = categories.find((category) => category.slug === active) ?? categories[0];

  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-[15px] leading-[1.2] tracking-normal uppercase"
      >
        Kategorije
        <ChevronDown className="size-3.5" strokeWidth={1.25} />
      </button>
      <div className="invisible absolute top-full left-0 z-30 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid w-[720px] grid-cols-[240px_1fr] border border-bass bg-white text-bass">
          <ul className="max-h-[70vh] overflow-auto border-r border-steel">
            {categories.map((category) => (
              <li key={category.slug} onMouseEnter={() => setActive(category.slug)}>
                <Link
                  href={`/kategorija/${category.slug}`}
                  className={`block px-4 py-2.5 text-[14px] ${category.slug === current.slug ? "bg-mist" : "hover:bg-mist"}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="max-h-[70vh] overflow-auto p-6">
            <Link href={`/kategorija/${current.slug}`} className="text-[16px] font-medium">
              Sve · {current.name}
            </Link>
            <ul className="mt-4 columns-2 gap-x-8">
              {current.subs.map((sub) => (
                <li key={sub.slug} className="mb-1 break-inside-avoid">
                  <Link
                    href={`/kategorija/${current.slug}/${sub.slug}`}
                    className="block py-1 text-[14px] text-charcoal hover:text-bass"
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
          placeholder="Pretraga"
          className="h-11 border-transparent bg-mist pr-11 pl-6 text-[15px]"
        />
        <Search className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-black" strokeWidth={1.5} />
      </label>
    </form>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const className =
    "inline-flex size-10 items-center justify-center rounded-full border border-bass text-bass";
  if (href.startsWith("tel:")) {
    return (
      <a href={href} aria-label={label} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={label} className={className}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [announce, setAnnounce] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-white">
      {announce ? (
        <div className="relative bg-countertenor px-10 py-2 text-center text-[12px] leading-[1.33] text-bass">
          Božićni promo paketi su u sezoni. Besplatna dostava iznad 410 KM, do 30 kg.
          <button
            type="button"
            aria-label="Zatvori obavijest"
            onClick={() => setAnnounce(false)}
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            <X className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>
      ) : null}
      <div className="border-b border-steel">
        <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6">
          <Logo className="absolute left-1/2 -translate-x-1/2" />
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger
                className="inline-flex size-10 items-center justify-center rounded-full border border-bass lg:hidden"
                aria-label="Izbornik"
              >
                <Menu className="size-4" strokeWidth={1.5} />
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100%,22rem)] overflow-y-auto bg-white">
                <SheetHeader>
                  <SheetTitle className="font-heading text-[24px] font-extrabold tracking-[0.02em]">LASER</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 px-4 pb-10">
                  <SearchForm />
                  <nav className="flex flex-col gap-3 text-[15px] uppercase">
                    {links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                    <a href="tel:+38739830773">+387 39 830 773</a>
                  </nav>
                  {categories.map((category) => (
                    <div key={category.slug}>
                      <Link href={`/kategorija/${category.slug}`} className="text-[15px] font-medium">
                        {category.name}
                      </Link>
                      <div className="mt-1 flex flex-col">
                        {category.subs.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/kategorija/${category.slug}/${sub.slug}`}
                            className="py-1 text-[14px] text-charcoal"
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
            <nav className="hidden items-center gap-6 lg:flex">
              <CategoryMenu />
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] leading-[1.2] uppercase ${"wide" in link && link.wide ? "hidden xl:inline" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="relative z-10 flex items-center justify-end gap-2 sm:gap-3">
            <SearchForm className="hidden w-[220px] xl:block" />
            <IconLink href="tel:+38739830773" label="Nazovi +387 39 830 773">
              <Phone className="size-4" strokeWidth={1.5} />
            </IconLink>
            <IconLink href="/ponuda" label="Upit za ponudu">
              <ShoppingBag className="size-4" strokeWidth={1.5} />
            </IconLink>
          </div>
        </div>
        <div className="border-t border-steel/50 bg-porcelain">
          <ul className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-4 py-3 text-[12px] leading-[1.33] tracking-[0.06em] uppercase sm:px-6 [scrollbar-width:none]">
            {categories.map((category) => (
              <li key={category.slug} className="shrink-0">
                <Link href={`/kategorija/${category.slug}`} className="text-bass hover:text-charcoal">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link
        href="/ponuda"
        className="fixed top-1/2 right-0 z-30 hidden -translate-y-1/2 bg-bass px-2 py-5 text-[12px] tracking-[0.12em] text-white uppercase [writing-mode:vertical-rl] lg:inline"
      >
        Ponuda
      </Link>
    </header>
  );
}
