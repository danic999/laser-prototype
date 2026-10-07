import Link from "next/link";
import { Logo } from "@/components/logo";
import { categories } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.1fr_1.3fr_0.8fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-[14px] leading-[1.5] tracking-[-0.014em] text-white/70">
            LASER d.o.o. za proizvodnju, trgovinu i usluge. Veleprodaja reklamnog materijala, tisak i gravura iz Ljubuškog.
          </p>
          <address className="mt-4 text-[14px] leading-[1.6] text-white/70 not-italic">
            Međugorska 26
            <br />
            88320 Ljubuški, Bosna i Hercegovina
            <br />
            <a href="tel:+38739830773" className="text-white underline">
              +387 39 830 773
            </a>
            <br />
            <a href="mailto:veleprodaja@laser-bih.com" className="text-white underline">
              veleprodaja@laser-bih.com
            </a>
          </address>
        </div>
        <div>
          <p className="text-[12px] text-white/50">Kategorije</p>
          <ul className="mt-3 columns-2 gap-x-8 text-[14px] leading-[1.8]">
            {categories.map((category) => (
              <li key={category.slug} className="break-inside-avoid">
                <Link href={`/kategorija/${category.slug}`} className="text-white/75 hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] text-white/50">Firma</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li>
              <Link href="/o-nama" className="text-white/75 hover:text-white">
                O nama
              </Link>
            </li>
            <li>
              <Link href="/usluge" className="text-white/75 hover:text-white">
                Usluge tiska
              </Link>
            </li>
            <li>
              <Link href="/kosarica" className="text-white/75 hover:text-white">
                Košarica
              </Link>
            </li>
            <li>
              <Link href="/prijava" className="text-white/75 hover:text-white">
                Prijava
              </Link>
            </li>
            <li>
              <Link href="/brand" className="text-white/75 hover:text-white">
                Brand guide
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-[12px] leading-[1.5] text-white/50">
            JIB 4272213860008
            <br />
            PDV 272213860008
            <br />
            Cijene u pregledu su bez PDV-a.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-4 text-[12px] text-white/50 sm:flex-row sm:justify-between sm:px-6">
          <p>Besplatna dostava za narudžbe preko 410 KM, do 30 kg. Kod dotiska akcije ne važe.</p>
          <p>Pregled izgleda. Cijene su primjer, ne službeni cjenik.</p>
        </div>
      </div>
    </footer>
  );
}
