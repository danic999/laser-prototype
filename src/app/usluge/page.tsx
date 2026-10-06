import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/catalog";
import { btnFill } from "@/lib/ui";

export const metadata: Metadata = { title: "Usluge tiska" };

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Proizvodnja</p>
      <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">
        Tisak, gravura i oprema za radionice
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        LASER d.o.o. uz veleprodaju reklamnog materijala radi digitalni tisak u boji, dotisak na tekstil,
        DTF, sublimaciju, lasersko graviranje i izradu pečata.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="bg-mist p-8 sm:p-10">
            <span className="block h-px w-10 bg-bass" />
            <h2 className="mt-6 font-heading text-[32px] leading-[1.2] font-normal tracking-[0.03em]">{service.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
          </li>
        ))}
      </ul>
      <Link href="/ponuda" className={`${btnFill} mt-10`}>
        Pitaj za doradu
      </Link>
    </main>
  );
}
