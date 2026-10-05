import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Usluge tiska" };

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Proizvodnja</p>
      <h1 className="mt-2 max-w-2xl font-heading text-4xl font-medium tracking-tight">
        Tisak, gravura i oprema za radionice
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        LASER d.o.o. uz veleprodaju reklamnog materijala radi digitalni tisak u boji, dotisak na tekstil,
        DTF, sublimaciju, lasersko graviranje i izradu pečata.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="rounded-2xl border border-border bg-card p-5">
            <span className="block h-0.5 w-8 bg-laser" />
            <h2 className="mt-4 font-heading text-xl font-medium">{service.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
          </li>
        ))}
      </ul>
      <Button render={<Link href="/ponuda" />} className="mt-8 h-11 bg-laser px-5 text-white hover:bg-laser/90">
        Pitaj za doradu
      </Button>
    </main>
  );
}
