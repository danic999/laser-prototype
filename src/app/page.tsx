import Image from "next/image";
import Link from "next/link";
import {
  Backpack,
  Flame,
  PenLine,
  Shirt,
  ShoppingBag,
  Umbrella,
  CupSoda,
  Flag,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/catalog";
import { packageProducts, packages, packageTotalLabel } from "@/lib/packages";

const icons = [
  { href: "/kategorija/pisaci-pribor/kemijske-olovke", label: "Olovke", icon: PenLine },
  { href: "/kategorija/torbe-i-putovanja/shopping-torbe", label: "Shopping torbe", icon: ShoppingBag },
  { href: "/kategorija/posude-za-pice/boce-za-vodu", label: "Boce", icon: CupSoda },
  { href: "/kategorija/posude-za-pice/salice", label: "Šalice", icon: CupSoda },
  { href: "/kategorija/torbe-i-putovanja/ruksaci", label: "Ruksaci", icon: Backpack },
  { href: "/kategorija/odjeca-i-dodaci/majice", label: "Majice", icon: Shirt },
  { href: "/kategorija/posude-za-pice/termosice", label: "Termosice", icon: CupSoda },
  { href: "/kategorija/slobodno-vrijeme/kisobrani", label: "Kišobrani", icon: Umbrella },
  { href: "/kategorija/pokloni-i-igre/privjesci", label: "Privjesci", icon: Flag },
  { href: "/kategorija/ured-i-poslovanje/biljeznice", label: "Bilježnice", icon: PenLine },
  { href: "/kategorija/torbe-i-putovanja/rashladne-torbe", label: "Rashladne torbe", icon: Backpack },
  { href: "/kategorija/odjeca-i-dodaci/jakne", label: "Jakne", icon: Shirt },
  { href: "/kategorija/ured-i-poslovanje/mape", label: "Mape", icon: Flag },
  { href: "/kategorija/dom-i-stanovanje/kuhinja", label: "Kuhinja", icon: CupSoda },
  { href: "/kategorija/pokloni-i-igre/upaljaci", label: "Upaljači", icon: Flame },
  { href: "/kategorija/tehnologija/usb", label: "USB", icon: Flag },
];

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <main className="bg-white">
      <section className="mx-auto grid max-w-[1180px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[270px_1fr]">
        <form action="/pretraga" className="h-fit rounded-lg border border-[#e3e5eb] p-4">
          <h2 className="text-lg font-extrabold">Napredna pretraga</h2>
          <p className="mt-1 text-xs text-muted-foreground">Pretraži cijeli asortiman</p>
          <label className="mt-4 block text-sm">
            <span className="sr-only">Naziv ili šifra</span>
            <input
              name="q"
              placeholder="Kategorija ili šifra"
              className="h-10 w-full rounded-md border border-[#e3e5eb] px-3 text-sm"
            />
          </label>
          <label className="mt-3 block text-sm font-semibold">
            Količina
            <select name="kolicina" className="mt-1 h-10 w-full rounded-md border border-[#e3e5eb] px-3 font-medium">
              <option value="">Sve</option>
              <option value="25">od 25</option>
              <option value="50">od 50</option>
              <option value="100">od 100</option>
              <option value="250">od 250</option>
            </select>
          </label>
          <label className="mt-3 block text-sm font-semibold">
            Kategorija
            <select name="kategorija" className="mt-1 h-10 w-full rounded-md border border-[#e3e5eb] px-3 font-medium">
              <option value="">Sve</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="mt-4 h-10 w-full rounded-full bg-orange text-sm font-extrabold text-white hover:bg-[#e09300]">
            Traži
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/#paketi"
            className="flex min-h-[280px] flex-col justify-between gap-4 overflow-hidden rounded-lg bg-[#14203f] p-6 text-white sm:flex-row sm:items-center"
          >
            <div className="max-w-[16rem]">
              <p className="text-xs font-bold tracking-wide text-orange uppercase">Sezona poklona</p>
              <h1 className="mt-1 text-3xl leading-tight font-extrabold">Božićni promo paketi</h1>
              <p className="mt-2 text-sm text-white/80">Setovi za klijente, tim i partnere. Tisak ide u istoj narudžbi.</p>
              <span className="mt-4 inline-flex h-10 items-center rounded-full bg-orange px-5 text-sm font-extrabold text-white">
                Otvori pakete
              </span>
            </div>
            <div className="flex gap-2">
              {["/products/kutija.jpg", "/products/salica.jpg", "/products/olovka-silver.jpg"].map((src) => (
                <span key={src} className="relative size-20 overflow-hidden rounded-md bg-white sm:size-24">
                  <Image src={src} alt="" fill className="object-contain p-1" />
                </span>
              ))}
            </div>
          </Link>
          <Link
            href="/kategorija/slobodno-vrijeme/kisobrani"
            className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-lg bg-[#1f264c] p-6 text-white"
          >
            <Image src="/products/kisobran.jpg" alt="Zimski kišobrani" fill className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f264c] via-[#1f264c]/55 to-transparent" />
            <div className="relative">
              <p className="text-xs font-bold tracking-wide text-orange uppercase">Zima</p>
              <h2 className="mt-1 text-3xl leading-tight font-extrabold">Zimski asortiman</h2>
              <p className="mt-2 text-sm text-white/80">Kišobrani, boce, ruksaci i tekstil za kraj godine.</p>
              <span className="mt-4 inline-flex h-10 items-center rounded-full bg-orange px-5 text-sm font-extrabold text-white">
                Pogledaj
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6">
        <ul className="grid grid-cols-4 gap-y-6 sm:grid-cols-8">
          {icons.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="flex flex-col items-center gap-2 text-center text-xs font-semibold text-navy hover:text-orange">
                <item.icon className="size-9" strokeWidth={1.25} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="paketi" className="border-t border-[#e3e5eb] bg-[#f7f8fb]">
        <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold">Božićni promo paketi</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
            Sezona je krenula. Ovo su složeni setovi od artikala koji su već u ponudi. Cijena je primjer po setu, bez PDV-a.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => {
              const included = packageProducts(item);
              return (
                <article key={item.slug} className="flex flex-col rounded-lg border border-[#e3e5eb] bg-white p-4">
                  <p className="text-xs font-bold tracking-wide text-orange uppercase">{item.season}</p>
                  <div className="mt-3 flex h-28 items-center justify-center gap-2">
                    {included.slice(0, 3).map((product) => (
                      <Image
                        key={product.slug}
                        src={product.colors[0].image}
                        alt=""
                        width={96}
                        height={96}
                        className="size-24 object-contain"
                      />
                    ))}
                  </div>
                  <h3 className="mt-2 text-lg font-extrabold">{item.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
                  <p className="mt-3 text-sm">
                    <span className="text-lg font-extrabold">{packageTotalLabel(item)}</span>
                    <span className="text-muted-foreground"> / set · {item.qty} setova</span>
                  </p>
                  <Link
                    href={`/paket/${item.slug}`}
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-full border-2 border-orange text-sm font-extrabold text-navy hover:bg-orange hover:text-white"
                  >
                    Složi paket
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-4 px-4 py-8 sm:px-6 md:grid-cols-3">
        {[
          { href: "/kategorija/posude-za-pice/salice", title: "Šalice", text: "Sublimacijske šalice iz posuđa za piće.", image: "/products/salica.jpg", cta: "Otvori" },
          { href: "/#paketi", title: "Sezonske ponude", text: "Božićni setovi spremni za tisak logotipa.", image: "/products/olovka-crna.jpg", cta: "Vidi pakete" },
          { href: "/usluge", title: "Usluge tiska", text: "Gravura, UV, DTF i digitalni tisak u Ljubuškom.", image: "/products/upaljac.jpg", cta: "Sve usluge" },
        ].map((tile) => (
          <Link key={tile.title} href={tile.href} className="overflow-hidden rounded-lg bg-[#1f264c] text-white">
            <div className="relative h-36 bg-white">
              <Image src={tile.image} alt="" fill className="object-contain p-4" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-extrabold">{tile.title}</h3>
              <p className="mt-1 text-sm text-white/75">{tile.text}</p>
              <span className="mt-3 inline-flex h-9 items-center rounded-full bg-orange px-4 text-sm font-extrabold">
                {tile.cta}
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section id="najprodavanije" className="mx-auto max-w-[1180px] px-4 pb-12 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold">Najprodavanije</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
