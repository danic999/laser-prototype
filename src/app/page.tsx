import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Backpack,
  CupSoda,
  Flame,
  Flag,
  PenLine,
  Shirt,
  ShoppingBag,
  Umbrella,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { products } from "@/lib/catalog";
import { packageProducts, packages, packageTotalLabel } from "@/lib/packages";
import { btnPill, cardShadow, sectionTitle } from "@/lib/ui";

const icons = [
  { href: "/kategorija/pisaci-pribor/kemijske-olovke", label: "Olovke", icon: PenLine },
  { href: "/kategorija/torbe-i-putovanja/shopping-torbe", label: "Torbe", icon: ShoppingBag },
  { href: "/kategorija/posude-za-pice/boce-za-vodu", label: "Boce", icon: CupSoda },
  { href: "/kategorija/posude-za-pice/salice", label: "Šalice", icon: CupSoda },
  { href: "/kategorija/torbe-i-putovanja/ruksaci", label: "Ruksaci", icon: Backpack },
  { href: "/kategorija/odjeca-i-dodaci/majice", label: "Majice", icon: Shirt },
  { href: "/kategorija/slobodno-vrijeme/kisobrani", label: "Kišobrani", icon: Umbrella },
  { href: "/kategorija/pokloni-i-igre/upaljaci", label: "Upaljači", icon: Flame },
  { href: "/kategorija/pokloni-i-igre/privjesci", label: "Privjesci", icon: Flag },
];

const banners = [
  {
    href: "/#paketi",
    image: "/products/kutija.jpg",
    alt: "Božićni poklon set",
    title: "Božićni promo",
    className: "left-[8%] top-8 -rotate-6",
  },
  {
    href: "/kategorija/slobodno-vrijeme/kisobrani",
    image: "/products/kisobran.jpg",
    alt: "Zimski kišobrani",
    title: "Zimski asortiman",
    className: "left-1/2 top-0 z-10 -translate-x-1/2",
  },
  {
    href: "/usluge",
    image: "/products/upaljac.jpg",
    alt: "Tisak na upaljaču",
    title: "Tisak u kući",
    className: "top-10 right-[8%] rotate-6",
  },
];

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-4 pt-6 pb-16 sm:pt-10">
        <div className="relative mx-auto mb-8 hidden h-[300px] max-w-[760px] sm:block">
          {banners.map((banner) => (
            <Link
              key={banner.title}
              href={banner.href}
              className={`absolute w-[190px] rounded-[28px] bg-white p-2 ${cardShadow} ${banner.className}`}
            >
              <span className="relative block aspect-square overflow-hidden rounded-[20px] bg-canvas">
                <Image src={banner.image} alt={banner.alt} fill sizes="190px" className="object-contain" />
              </span>
              <span className="block px-2 py-2 text-[14px] font-medium tracking-[-0.014em]">{banner.title}</span>
            </Link>
          ))}
        </div>
        <div className="mb-6 flex justify-center gap-3 sm:hidden">
          {banners.map((banner) => (
            <Link key={banner.title} href={banner.href} className={`w-[104px] rounded-[20px] bg-white p-1.5 ${cardShadow}`}>
              <span className="relative block aspect-square overflow-hidden rounded-[14px] bg-canvas">
                <Image src={banner.image} alt={banner.alt} fill sizes="104px" className="object-contain" />
              </span>
              <span className="block px-1 py-1.5 text-[12px] leading-[1.2] font-medium tracking-[-0.014em]">{banner.title}</span>
            </Link>
          ))}
        </div>
        <div className="hidden justify-center sm:flex">
          <Logo className="[&_img]:h-10" />
        </div>
        <SearchBar className="mx-auto mt-6 max-w-[640px]" />
        <ul className="mt-6 flex justify-start gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center [scrollbar-width:none]">
          {icons.map((item) => (
            <li key={item.label} className="shrink-0">
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white py-1.5 pr-4 pl-1.5 text-[16px] tracking-[-0.031em] text-black shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-canvas">
                  <item.icon className="size-4" strokeWidth={1.75} />
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="paketi" className="mx-auto max-w-[1200px] px-4 pb-16">
        <Link href="/#paketi" className={sectionTitle}>
          Božićni promo paketi
          <ChevronRight className="size-4" />
        </Link>
        <p className="mt-2 max-w-xl text-[16px] leading-[1.33] text-[#787574]">
          Složeni setovi od artikala koji su već u ponudi. Cijena je primjer po setu, bez PDV-a.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((item) => {
            const included = packageProducts(item);
            return (
              <article key={item.slug} className={`flex flex-col rounded-[28px] bg-white ${cardShadow}`}>
                <div className="flex gap-0.5 p-2">
                  {included.slice(0, 3).map((product) => (
                    <span key={product.slug} className="relative aspect-square flex-1 overflow-hidden rounded-[20px] bg-canvas">
                      <Image src={product.colors[0].image} alt="" fill className="object-contain" />
                    </span>
                  ))}
                </div>
                <div className="flex flex-1 flex-col px-4 pt-2 pb-4">
                  <p className="text-[12px] text-[#787574]">{item.season}</p>
                  <h3 className="mt-1 text-[16px] font-medium tracking-[-0.031em]">{item.name}</h3>
                  <p className="mt-1 text-[14px] leading-[1.4] text-[#787574]">{item.blurb}</p>
                  <p className="mt-3 text-[16px] tracking-[-0.031em]">
                    {packageTotalLabel(item)}
                    <span className="text-[#787574]"> / set · {item.qty}</span>
                  </p>
                  <Link href={`/paket/${item.slug}`} className={`${btnPill} mt-4 w-fit`}>
                    Složi paket
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="najprodavanije" className="mx-auto max-w-[1200px] px-4 pb-8">
        <Link href="/kategorija/pisaci-pribor" className={sectionTitle}>
          Najprodavanije
          <ChevronRight className="size-4" />
        </Link>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
