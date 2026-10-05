import Link from "next/link";
import { Logo } from "@/components/logo";
import { categories } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/75">
            LASER d.o.o. za proizvodnju, trgovinu i usluge. Veleprodaja reklamnog
            materijala, tisak i gravura iz Ljubuškog.
          </p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-paper/85">
            Međugorska 26
            <br />
            88320 Ljubuški, Bosna i Hercegovina
            <br />
            <a href="tel:+38739830773" className="underline-offset-2 hover:underline">
              +387 39 830 773
            </a>
            <br />
            <a href="mailto:veleprodaja@laser-bih.com" className="underline-offset-2 hover:underline">
              veleprodaja@laser-bih.com
            </a>
          </address>
        </div>
        <div>
          <p className="text-xs tracking-[0.16em] text-paper/50 uppercase">Kategorije</p>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/kategorija/${category.slug}`} className="text-paper/80 hover:text-paper">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.16em] text-paper/50 uppercase">Firma</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            <li>
              <Link href="/o-nama" className="hover:text-paper">
                O nama
              </Link>
            </li>
            <li>
              <Link href="/usluge" className="hover:text-paper">
                Usluge tiska
              </Link>
            </li>
            <li>
              <Link href="/ponuda" className="hover:text-paper">
                Upit za ponudu
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-paper">
                Brand guide
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-paper/55">
            JIB 4272213860008
            <br />
            PDV 272213860008
            <br />
            Sve cijene u pregledu su bez PDV-a.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-4 py-4 text-xs text-paper/50 sm:flex-row sm:justify-between sm:px-6">
          <p>Besplatna dostava za narudžbe preko 410 KM, do 30 kg. Kod dotiska akcije ne važe.</p>
          <p>Pregled izgleda. Cijene paketa i artikala su primjer, ne službeni cjenik.</p>
        </div>
      </div>
    </footer>
  );
}
