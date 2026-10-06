import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "O nama" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[760px] px-4 py-8 sm:px-6">
      <p className="text-[12px] text-[#787574]">LASER d.o.o.</p>
      <h1 className="mt-2 text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">O nama</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          LASER d.o.o. za proizvodnju, trgovinu i usluge bavi se uvozom i distribucijom promotivnih
          materijala u Bosni i Hercegovini. Direktan i stalan uvoz drži asortiman dostupnim i cijenom
          u veleprodajnom rangu.
        </p>
        <p>
          U ponudi su promotivni, poslovni i darovni artikli, tekstil za personalizaciju, robne marke
          MUKUA i Stedman, softshell jakna TOTTO, USB uređaji, ruksaci, kišobrani i boce. Uz robu idu
          DTF, termo prese, printeri, sublimacijski start paket i repromaterijal.
        </p>
        <p>
          Usluge su digitalni tisak u boji, dotisak na tekstil, DTF, sublimacija, lasersko graviranje i
          izrada pečata. Uzorak, prezentaciju i prijedlog seta moguće je zatražiti prije veće narudžbe.
        </p>
      </div>
      <dl className="mt-8 grid gap-6 rounded-[28px] bg-white p-6 text-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Adresa</dt>
          <dd>Međugorska 26, 88320 Ljubuški</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Telefon</dt>
          <dd>
            <a href="tel:+38739830773">+387 39 830 773</a>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">E-mail</dt>
          <dd>
            <a href="mailto:veleprodaja@laser-bih.com">veleprodaja@laser-bih.com</a>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">JIB / PDV</dt>
          <dd>4272213860008 / 272213860008</dd>
        </div>
      </dl>
      <p className="mt-6 text-sm">
        <Link href="/ponuda" className="underline">
          Zatraži ponudu ili uzorak
        </Link>
      </p>
    </main>
  );
}
