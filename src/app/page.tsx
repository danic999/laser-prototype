import Image from "next/image";
import Link from "next/link";
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
import { ProductRail } from "@/components/product-rail";
import { products } from "@/lib/catalog";
import { packageProducts, packages, packageTotalLabel } from "@/lib/packages";
import { btnOnDark, btnOutline, displayTitle, heroTitle, linkOnDark } from "@/lib/ui";

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
  const featured = products.filter((product) => product.featured);

  return (
    <main className="bg-white">
      <section className="relative bg-mist">
        <div className="relative h-[48vh] min-h-[300px] lg:absolute lg:inset-0 lg:h-auto">
          <Image
            src="/products/kisobran.jpg"
            alt="Golf kišobran za zimski asortiman"
            fill
            priority
            sizes="100vw"
            className="origin-center scale-[1.35] object-cover object-[center_62%] mix-blend-multiply lg:scale-100 lg:object-[62%_center]"
          />
        </div>
        <div className="relative z-10 flex lg:min-h-[88vh] lg:items-end">
          <div className="w-full bg-bass px-6 py-10 text-white sm:px-10 sm:py-14 lg:w-[46%] lg:px-16 lg:py-16">
            <p className="text-[24px] leading-[1.5] font-medium">Sezona poklona</p>
            <h1 className={`${heroTitle} mt-3`}>
              Božićni
              <br />
              promo
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-[1.5] text-white/80">
              Setovi za klijente, tim i partnere. Olovka, šalica, boca i tisak idu u istoj narudžbi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/#paketi" className={btnOnDark}>
                Otvori pakete
              </Link>
              <Link href="/kategorija/slobodno-vrijeme/kisobrani" className={linkOnDark}>
                Zimski asortiman
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-porcelain">
        <ul className="mx-auto grid max-w-[1440px] grid-cols-4 gap-y-8 px-4 py-10 sm:px-6 sm:grid-cols-8">
          {icons.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-3 text-center text-[12px] leading-[1.33] tracking-[0.04em] text-bass uppercase"
              >
                <item.icon className="size-6" strokeWidth={1} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid md:grid-cols-2">
        <Link href="/kategorija/posude-za-pice/salice" className="group relative min-h-[520px] bg-mist">
          <Image src="/products/salica.jpg" alt="" fill sizes="50vw" className="object-contain p-16 mix-blend-multiply" />
          <div className="absolute bottom-8 left-6 max-w-md text-white sm:left-10">
            <div className="bg-bass px-6 py-8 sm:px-8">
              <h2 className="font-heading text-[clamp(2.5rem,4vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">
                Šalice
              </h2>
              <p className="mt-3 text-[16px] leading-[1.5] text-white/80">Sublimacija za firmu, u boji.</p>
              <span className={`${btnOnDark} mt-6`}>Otvori</span>
            </div>
          </div>
        </Link>
        <Link href="/kategorija/torbe-i-putovanja/shopping-torbe" className="relative min-h-[520px] bg-porcelain">
          <Image src="/products/torba.jpg" alt="" fill sizes="50vw" className="object-contain p-16 mix-blend-multiply" />
          <div className="absolute right-6 bottom-8 left-6 max-w-md sm:left-10">
            <div className="bg-bass px-6 py-8 text-white sm:px-8">
              <h2 className="font-heading text-[clamp(2.5rem,4vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">
                Torbe
              </h2>
              <p className="mt-3 text-[16px] leading-[1.5] text-white/80">Shopping, laptop i rashladne.</p>
              <span className={`${btnOnDark} mt-6`}>Otvori</span>
            </div>
          </div>
        </Link>
      </section>

      <section id="paketi" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:py-[120px]">
        <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Božić 2026</p>
        <h2 className={`${displayTitle} mt-3 max-w-3xl`}>Božićni promo paketi</h2>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.5] text-charcoal">
          Složeni setovi od artikala koji su već u ponudi. Cijena je primjer po setu, bez PDV-a.
        </p>
        <div className="mt-12 grid gap-px bg-white sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((item) => {
            const included = packageProducts(item);
            return (
              <article key={item.slug} className="flex flex-col bg-mist p-8 sm:p-10">
                <p className="text-[12px] tracking-[0.08em] uppercase">{item.season}</p>
                <div className="mt-6 flex h-28 items-center gap-2">
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
                <h3 className="mt-6 font-heading text-[32px] leading-[1.2] font-normal tracking-[0.03em]">{item.name}</h3>
                <p className="mt-3 text-[16px] leading-[1.5] text-charcoal">{item.blurb}</p>
                <p className="mt-6 text-[16px]">
                  <span className="font-medium">{packageTotalLabel(item)}</span>
                  <span className="text-charcoal"> / set · {item.qty} setova</span>
                </p>
                <Link href={`/paket/${item.slug}`} className={`${btnOutline} mt-8 w-fit`}>
                  Složi paket
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-[16px]">
          <Link href="/o-nama" className="text-chord">
            Kako firma naručuje
          </Link>
        </p>
      </section>

      <section id="najprodavanije" className="border-t border-steel">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:py-[120px]">
          <h2 className={displayTitle}>Najprodavanije</h2>
          <p className="mt-4 max-w-xl text-[16px] leading-[1.5] text-charcoal">
            Šifre iz stalnog asortimana. Cijena „od“ vrijedi na najnižem pragu količine.
          </p>
          <div className="mt-12">
            <ProductRail products={featured} />
          </div>
        </div>
      </section>
    </main>
  );
}
