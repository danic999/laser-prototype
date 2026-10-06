import Link from "next/link";
import { Logo } from "@/components/logo";
import { categories } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-steel bg-white text-bass">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_1.4fr_0.8fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-[16px] leading-[1.5] text-charcoal">
            LASER d.o.o. za proizvodnju, trgovinu i usluge. Veleprodaja reklamnog materijala, tisak i gravura iz Ljubuškog.
          </p>
          <address className="mt-6 text-[14px] leading-[1.6] text-charcoal not-italic">
            Međugorska 26
            <br />
            88320 Ljubuški, Bosna i Hercegovina
            <br />
            <a href="tel:+38739830773" className="text-bass">
              +387 39 830 773
            </a>
            <br />
            <a href="mailto:veleprodaja@laser-bih.com" className="text-chord">
              veleprodaja@laser-bih.com
            </a>
          </address>
        </div>
        <div>
          <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Kategorije</p>
          <ul className="mt-4 columns-2 gap-x-8 text-[14px] leading-[1.8]">
            {categories.map((category) => (
              <li key={category.slug} className="break-inside-avoid">
                <Link href={`/kategorija/${category.slug}`} className="text-charcoal hover:text-bass">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Firma</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <Link href="/o-nama" className="text-charcoal hover:text-bass">
                O nama
              </Link>
            </li>
            <li>
              <Link href="/usluge" className="text-charcoal hover:text-bass">
                Usluge tiska
              </Link>
            </li>
            <li>
              <Link href="/ponuda" className="text-charcoal hover:text-bass">
                Upit za ponudu
              </Link>
            </li>
            <li>
              <Link href="/brand" className="text-charcoal hover:text-bass">
                Brand guide
              </Link>
            </li>
          </ul>
          <p className="mt-8 text-[12px] leading-[1.6] text-charcoal">
            JIB 4272213860008
            <br />
            PDV 272213860008
            <br />
            Cijene u pregledu su bez PDV-a.
          </p>
        </div>
      </div>
      <div className="border-t border-steel">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-4 text-[12px] leading-[1.5] text-charcoal sm:flex-row sm:justify-between sm:px-6">
          <p>Besplatna dostava za narudžbe preko 410 KM, do 30 kg. Kod dotiska akcije ne važe.</p>
          <p>Pregled izgleda. Cijene paketa i artikala su primjer, ne službeni cjenik.</p>
        </div>
      </div>
    </footer>
  );
}
