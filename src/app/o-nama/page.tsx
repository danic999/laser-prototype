import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "O nama" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[760px] px-4 py-10 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">LASER d.o.o.</p>
      <h1 className="mt-2 font-heading text-4xl font-medium tracking-tight">O nama</h1>
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
      <dl className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-5 text-sm sm:grid-cols-2">
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
        <Link href="/ponuda" className="underline underline-offset-4">
          Zatraži ponudu ili uzorak
        </Link>
      </p>
    </main>
  );
}
