"use client";

import Link from "next/link";
import { Menu, Phone, Search } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
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
  { href: "/kategorija/sublimacija", label: "Sublimacija" },
  { href: "/kategorija/tekstil", label: "Tekstil" },
  { href: "/kategorija/upaljaci", label: "Laserlight" },
  { href: "/usluge", label: "Usluge tiska" },
  { href: "/o-nama", label: "O nama" },
];

function SearchForm({ className }: { className?: string }) {
  return (
    <form action="/pretraga" className={className}>
      <label className="relative block">
        <span className="sr-only">Pretraga asortimana</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          placeholder="Šifra ili naziv, npr. K002 ili torba"
          className="h-11 bg-card pl-9"
        />
      </label>
    </form>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
      <div className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-1.5 text-[11px] tracking-wide sm:px-6 sm:text-xs">
          <p>Cijene bez PDV-a · Dostava od 410 KM · Pon–pet 08:00–16:00</p>
          <p className="hidden sm:block">Ljubuški</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <Logo />
        <SearchForm className="hidden min-w-0 flex-1 md:block" />
        <a
          href="tel:+38739830773"
          className="ml-auto hidden items-center gap-2 text-sm lg:flex"
        >
          <Phone className="size-4" />
          <span>
            <span className="block font-medium leading-none">+387 39 830 773</span>
            <span className="text-xs text-muted-foreground">Veleprodaja</span>
          </span>
        </a>
        <Button
          render={<Link href="/ponuda" />}
          className="ml-auto h-10 bg-laser px-4 text-white hover:bg-laser/90 md:ml-0"
        >
          Zatraži ponudu
        </Button>
        <Sheet>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card md:hidden"
            aria-label="Izbornik"
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,22rem)] bg-paper">
            <SheetHeader>
              <SheetTitle>Asortiman</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4 pb-6">
              <SearchForm />
              <a href="tel:+38739830773" className="text-sm font-medium">
                +387 39 830 773
              </a>
              <nav className="flex flex-col gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/kategorija/${category.slug}`}
                    className="rounded-md px-2 py-2 text-sm hover:bg-muted"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link href="/usluge" className="rounded-md px-2 py-2 text-sm hover:bg-muted">
                  Usluge tiska
                </Link>
                <Link href="/o-nama" className="rounded-md px-2 py-2 text-sm hover:bg-muted">
                  O nama
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="mx-auto hidden max-w-[1180px] items-center gap-1 px-6 pb-2 md:flex">
        <div className="group relative">
          <button
            type="button"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Sve kategorije
          </button>
          <div className="invisible absolute top-full left-0 z-20 w-72 rounded-lg border border-border bg-card p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/kategorija/${category.slug}`}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                <span className="block">{category.name}</span>
                <span className="text-xs text-muted-foreground">{category.group}</span>
              </Link>
            ))}
          </div>
        </div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
