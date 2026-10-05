import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { categories, products, services } from "@/lib/catalog";

const shortcuts = [
  ["pisaci-pribor", "Olovke"],
  ["torbe", "Torbe"],
  ["kisobrani", "Kišobrani"],
  ["boce-i-salice", "Boce"],
  ["upaljaci", "Laserlight"],
  ["tekstil", "Tekstil"],
  ["sublimacija", "Sublimacija"],
  ["reklame", "Reklame"],
] as const;

export default function HomePage() {
  const featured = products.filter((product) => product.featured);

  return (
    <main>
      <section className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Veleprodaja · Ljubuški
          </p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
            Promo artikli za firme. Cijena po količini, otisak prije serije.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            LASER uvozi reklamni materijal i radi tisak u kući: gravuru, UV, DTF, sublimaciju i
            digitalni tisak. Asortiman je sadašnji, raspored stranice je prijedlog novog shopa.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button render={<Link href="/kategorija/pisaci-pribor" />} className="h-11 px-5">
              Otvori asortiman
            </Button>
            <Button render={<Link href="/ponuda" />} variant="outline" className="h-11 px-5">
              Zatraži ponudu
            </Button>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-5 text-sm">
            <div>
              <dt className="text-muted-foreground">Direktan uvoz</dt>
              <dd className="font-medium">Stalna zaliha</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Dostava</dt>
              <dd className="font-medium">Od 410 KM</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Tisak</dt>
              <dd className="font-medium">U Ljubuškom</dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <figure className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl bg-white">
            <Image src="/products/kisobran.jpg" alt="Kišobrani ERO, više boja" fill className="object-cover" priority />
          </figure>
          <figure className="relative aspect-square overflow-hidden rounded-2xl bg-white">
            <Image src="/products/olovka-crna.jpg" alt="Metalna kemijska K002" fill className="object-contain p-4" />
          </figure>
          <figure className="relative aspect-square overflow-hidden rounded-2xl bg-white">
            <Image src="/products/upaljac.jpg" alt="Laserlight upaljač" fill className="object-contain p-4" />
          </figure>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <form action="/pretraga" className="mx-auto grid max-w-[1180px] gap-3 px-4 py-4 sm:px-6 md:grid-cols-[1fr_14rem_14rem_auto] md:items-end">
          <label className="text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Traži</span>
            <input
              name="q"
              placeholder="Naziv ili šifra"
              className="h-11 w-full rounded-lg border border-border bg-background px-3"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Kategorija</span>
            <select name="kategorija" className="h-11 w-full rounded-lg border border-border bg-background px-3">
              <option value="">Sve</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Tisak</span>
            <select name="tisak" className="h-11 w-full rounded-lg border border-border bg-background px-3">
              <option value="">Bilo koji</option>
              <option>Lasersko graviranje</option>
              <option>UV tisak</option>
              <option>DTF tisak</option>
              <option>Sublimacija</option>
              <option>Sitotisak</option>
            </select>
          </label>
          <button type="submit" className="h-11 rounded-lg bg-ink px-5 text-sm font-medium text-paper">
            Traži
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {shortcuts.map(([slug, label]) => (
            <Link
              key={slug}
              href={`/kategorija/${slug}`}
              className="rounded-xl border border-border bg-card px-3 py-4 text-center text-sm font-medium hover:border-ink"
            >
              <span className="mx-auto mb-3 block h-0.5 w-8 bg-laser" />
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 pb-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl font-medium">Najčešće za dotisak</h2>
          <Link href="/pretraga" className="text-sm underline-offset-4 hover:underline">
            Cijeli pregled
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-14 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs tracking-[0.16em] text-paper/50 uppercase">Usluge</p>
            <h2 className="mt-2 font-heading text-3xl font-medium">Tisak koji ide uz robu</h2>
            <p className="mt-3 text-sm leading-relaxed text-paper/70">
              Veleprodaja i dorada su na istom mjestu. Uzorak i prijedlog seta traže se kod tima u Ljubuškom.
            </p>
            <Button render={<Link href="/usluge" />} className="mt-6 h-11 bg-paper text-ink hover:bg-white">
              Sve usluge
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug} className="rounded-xl border border-white/10 p-4">
                <p className="font-medium">{service.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-paper/65">{service.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
