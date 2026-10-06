import type { Metadata } from "next";
import Image from "next/image";
import { btnFill, btnOnDark, btnOutline } from "@/lib/ui";

export const metadata: Metadata = { title: "Brand guide" };

const colors = [
  { name: "Soprano White", hex: "#ffffff", role: "Platno stranice, zaglavlje, podnožje" },
  { name: "Studio Mist", hex: "#f8f8f8", role: "Pločice artikala, pretraga, tihe površine" },
  { name: "Warm Porcelain", hex: "#f1efee", role: "Sekundarna navigacija" },
  { name: "Bass Black", hex: "#131317", role: "Tekst, ikone, obrubi, tamni gumbi" },
  { name: "Countertenor Gray", hex: "#b4bec7", role: "Traka obavijesti" },
  { name: "Steel Gray", hex: "#949494", role: "Tanke razdjelnice" },
  { name: "Charcoal Helper", hex: "#40464b", role: "Pomoćni tekst i linkovi u podnožju" },
  { name: "Chord Blue", hex: "#005bff", role: "Samo tekstualni link za objašnjenje" },
  { name: "Laser", hex: "#E2231A", role: "Zraka u znaku. Ne ide na gumbe." },
];

export default function BrandPage() {
  return (
    <main>
      <section className="border-b border-steel bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:py-[120px]">
          <div>
            <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Brand guide · web</p>
            <h1 className="mt-3 font-heading text-[clamp(3rem,7vw,6rem)] leading-[0.88] font-extrabold tracking-[0.015em]">
              Znak ostaje.
              <br />
              Shop je tih.
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-[1.5] text-charcoal">
              Slova i crvena zraka su iz postojećeg logotipa. Dorada je samo čist izrez. Oblik slova nije crtan iznova. Okvir shopa je crno-bijeli.
            </p>
          </div>
          <div className="flex flex-col gap-px bg-steel">
            <div className="flex h-40 items-center justify-center bg-white">
              <Image src="/brand/logo.png" alt="LASER na bijeloj" width={280} height={92} />
            </div>
            <div className="flex h-40 items-center justify-center bg-bass">
              <Image src="/brand/logo-light.png" alt="LASER na crnoj" width={280} height={92} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:py-[120px]">
        <h2 className="font-heading text-[clamp(2rem,4vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">Znak</h2>
        <div className="mt-10 grid gap-px bg-white md:grid-cols-3">
          <Rule title="Zraka ide kroz LA">
            Crvena linija počinje lijevo od L i staje u A. Ne produžuje se kroz cijelu riječ.
          </Rule>
          <Rule title="Prazan prostor">
            Oko znaka ostaje najmanje visina zrake sa svake strane. U zaglavlju je znak visok 32–36 px i stoji na sredini.
          </Rule>
          <Rule title="Što se ne radi">
            Bez sjene, obruba i nagiba. Zraka ostaje #E2231A. Ne prelazi na gumbe ni na naslove.
          </Rule>
        </div>
      </section>

      <section className="border-y border-steel bg-mist">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:py-[120px]">
          <h2 className="font-heading text-[clamp(2rem,4vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">Boje</h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.5] text-charcoal">
            Shop je bijel. Dubinu nose fotografija i teški naslov, ne sjena. Chord plava je samo za tekstualni link.
          </p>
          <ul className="mt-10 grid gap-px bg-white sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((color) => (
              <li key={color.hex} className="bg-white">
                <div className="h-20 border border-steel" style={{ background: color.hex }} />
                <div className="px-4 py-4 text-[14px]">
                  <p className="font-medium">{color.name}</p>
                  <p className="font-mono text-[12px] text-charcoal">{color.hex}</p>
                  <p className="mt-1 text-charcoal">{color.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:py-[120px]">
        <h2 className="font-heading text-[clamp(2rem,4vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">Slova</h2>
        <div className="mt-10 grid gap-px md:grid-cols-2">
          <div className="bg-mist p-8 sm:p-10">
            <p className="font-heading text-[60px] leading-[0.88] font-extrabold tracking-[0.02em]">Dosis</p>
            <p className="mt-4 text-[16px] leading-[1.5] text-charcoal">
              Naslovi. Težina 800, visina reda 0.88. Ne ide ispod 32 px.
            </p>
          </div>
          <div className="bg-porcelain p-8 sm:p-10">
            <p className="text-[24px] leading-[1.5] font-medium">Arial</p>
            <p className="mt-4 text-[16px] leading-[1.5] text-charcoal">
              Sučelje, navigacija, cijene i gumbi. Navigacija je velika slova, 15 px. Gumb je 16 px, težina 500.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-steel">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-[120px]">
          <div>
            <h2 className="font-heading text-[32px] leading-[1.2] font-normal tracking-[0.03em]">Gumbi</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className={btnOutline}>Odaberi</span>
              <span className={btnFill}>Kupi</span>
              <span className="bg-bass p-4">
                <span className={btnOnDark}>Otvori</span>
              </span>
            </div>
            <p className="mt-6 max-w-md text-[16px] leading-[1.5] text-charcoal">
              Pravougaoni gumbi imaju radijus 2 px. Kartice su ravne. Pretraga i statusna oznaka su pilule. Bez sjene.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-[32px] leading-[1.2] font-normal tracking-[0.03em]">Katalog</h2>
            <p className="mt-6 text-[16px] leading-[1.5] text-charcoal">
              Stablo kategorija ostaje kao na IGO Promu. Artikli su Laserovi. Ovaj vodič mijenja samo površinu: bijelo platno, crni tekst, uski naslov i fotografija artikla na Studio Mist podlozi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Rule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="bg-mist p-8 sm:p-10">
      <h3 className="font-heading text-[32px] leading-[1.2] font-normal tracking-[0.03em]">{title}</h3>
      <p className="mt-3 text-[16px] leading-[1.5] text-charcoal">{children}</p>
    </article>
  );
}
