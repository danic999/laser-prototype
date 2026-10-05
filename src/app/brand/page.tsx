import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Brand guide" };

const colors = [
  { name: "Crna", hex: "#141414", role: "Tekst, glavni gumbi, podnožje" },
  { name: "Papir", hex: "#F4F1EA", role: "Pozadina stranice" },
  { name: "Kartica", hex: "#FFFCF8", role: "Površina kartica i obrazaca" },
  { name: "Linija", hex: "#E3DCD0", role: "Okviri i razdjelnice" },
  { name: "Laser", hex: "#E2231A", role: "Zraka u znaku i jedan poziv na ponudu" },
  { name: "Tinta", hex: "#5C574F", role: "Pomoćni tekst" },
];

export default function BrandPage() {
  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Brand guide · web</p>
            <h1 className="mt-2 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
              Znak ostaje. Web dobiva ritam.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Slova i crvena zraka su iz postojećeg logotipa. Dorada je samo čist izrez, prozirna
              pozadina i bijela inačica za tamnu podlogu. Oblik slova nije crtan iznova.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex h-36 items-center justify-center rounded-2xl bg-paper">
              <Image src="/brand/logo.png" alt="LASER na papiru" width={280} height={92} />
            </div>
            <div className="flex h-36 items-center justify-center rounded-2xl bg-ink">
              <Image src="/brand/logo-light.png" alt="LASER na crnoj" width={280} height={92} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <h2 className="font-heading text-2xl font-medium">Znak</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Rule title="Zraka ide kroz LA">
            Crvena linija počinje lijevo od L i staje u A. Ne produžuje se kroz cijelu riječ i ne pomiče se na sredinu visine ako se znak skalira.
          </Rule>
          <Rule title="Prazan prostor">
            Oko znaka ostaje najmanje visina zrake sa svake strane. U zaglavlju je znak visok 32–36 px.
          </Rule>
          <Rule title="Što se ne radi">
            Bez sjene, obruba, nagiba i druge boje slova. Crni znak ne ide na crnu. Zraka se ne mijenja u narančastu.
          </Rule>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
          <h2 className="font-heading text-2xl font-medium">Boje</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Papir je topliji od čiste bijele da fotografije proizvoda, koje su na bijeloj, sjednu u stranicu. Laser crvena je očišćena iz JPEG-a znaka, #E2231A.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((color) => (
              <li key={color.hex} className="overflow-hidden rounded-xl border border-border">
                <div className="h-16" style={{ background: color.hex }} />
                <div className="bg-card px-4 py-3 text-sm">
                  <p className="font-medium">{color.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{color.hex}</p>
                  <p className="mt-1 text-muted-foreground">{color.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6">
        <h2 className="font-heading text-2xl font-medium">Slova</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-4xl font-extrabold tracking-tight">Montserrat</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Isti rez kao na IGO katalogu. Naslovi su ekstra podebljani, tekst i cijene redovni. Ima č, ć, đ, š, ž.
            </p>
          </div>
        </div>
        <div className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground">Glas</p>
          <p className="mt-2">
            Kratko i konkretno: šifra, količina, tehnika, rok, Ljubuški. Bez „revolucije brenda” i bez brojeva koji nisu na sadašnjem webu. Cijena „od” uvijek stoji uz količinu na kojoj vrijedi.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-[1180px] gap-6 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-medium">Gumbi</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex h-11 items-center rounded-full bg-navy px-5 text-sm text-white">Sve kategorije</span>
              <span className="inline-flex h-11 items-center rounded-full bg-orange px-5 text-sm font-bold text-white">Traži</span>
              <span className="inline-flex h-11 items-center rounded-full bg-stock px-5 text-sm font-bold text-white">Zatraži ponudu</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Shop koristi mornarsku, narančastu i zelenu kao IGO katalog. Znak LASER i dalje ima svoju crvenu zraku, #E2231A.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-medium">Što je u ovom pregledu promijenjeno</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Izrez znaka i prozirna pozadina, slova netaknuta.</li>
              <li>Bijela inačica za podnožje.</li>
              <li>Crvena iz JPEG šuma svedena na jednu vrijednost, #E2231A.</li>
              <li>Toplija podloga stranice da bijele fotografije proizvoda ne vise u praznini.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function Rule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </article>
  );
}
