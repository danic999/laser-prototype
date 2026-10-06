import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/catalog";
import { btnPill } from "@/lib/ui";

export const metadata: Metadata = { title: "Usluge tiska" };

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <p className="text-[12px] text-[#787574]">Proizvodnja</p>
      <h1 className="mt-2 max-w-3xl text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">
        Tisak, gravura i oprema za radionice
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        LASER d.o.o. uz veleprodaju reklamnog materijala radi digitalni tisak u boji, dotisak na tekstil,
        DTF, sublimaciju, lasersko graviranje i izradu pečata.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="rounded-[28px] bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <h2 className="text-[20px] leading-[1.2] font-medium tracking-[-0.05em]">{service.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
          </li>
        ))}
      </ul>
      <Link href="/ponuda" className={`${btnPill} mt-8`}>
        Pitaj za doradu
      </Link>
    </main>
  );
}
