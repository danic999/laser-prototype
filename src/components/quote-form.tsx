"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { btnFill } from "@/lib/ui";

export function QuoteForm() {
  const params = useSearchParams();
  const [sent, setSent] = useState(false);
  const sample = params.get("uzorak") === "1";

  if (sent) {
    return (
      <div className="bg-mist p-8 sm:p-10">
        <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Upit je zabilježen lokalno</p>
        <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3rem)] leading-[0.88] font-extrabold tracking-[0.02em]">Hvala. Ovo je kraj prototipa.</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Poruka nije poslana na veleprodaja@laser-bih.com. U pravom shopu ovdje nastaje ponuda:
          šifra, količina, tisak i kontakt firme odlaze prodaji, a kupac dobiva potvrdu.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1fr_18rem]"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="space-y-4 bg-mist p-6 sm:p-10">
        <Field label="Firma" name="firma" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ime i prezime" name="ime" required />
          <Field label="Telefon" name="telefon" required />
        </div>
        <Field label="E-mail" name="email" type="email" required />
        <Field label="Artikal" name="artikal" defaultValue={params.get("artikal") ?? ""} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Šifra" name="sku" defaultValue={params.get("sku") ?? ""} />
          <Field label="Količina" name="kolicina" defaultValue={sample ? "1" : params.get("kolicina") ?? ""} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Boja" name="boja" defaultValue={params.get("boja") ?? ""} />
          <Field label="Tisak" name="tisak" defaultValue={params.get("tisak") ?? ""} />
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Napomena</span>
          <textarea
            name="napomena"
            rows={4}
            defaultValue={sample ? "Molim uzorak prije serije." : ""}
            className="w-full rounded-[2px] border border-steel bg-white px-4 py-3 text-[16px] outline-none focus-visible:border-bass"
          />
        </label>
        <button type="submit" className={btnFill}>
          Pošalji upit
        </button>
      </div>
      <aside className="h-fit bg-bass p-6 text-[16px] leading-[1.5] text-white/80 sm:p-8">
        <p className="font-heading text-[32px] leading-[1.2] font-normal tracking-[0.03em] text-white">Što prodaja dobije</p>
        <ul className="mt-3 space-y-2">
          <li>Firmu i kontakt</li>
          <li>Šifru, boju i količinu</li>
          <li>Tehniku i poziciju tiska</li>
          <li>Oznaku ako treba uzorak</li>
        </ul>
        <p className="mt-6 text-[14px] text-white/70">
          +387 39 830 773
          <br />
          veleprodaja@laser-bih.com
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      <Input name={name} type={type} required={required} defaultValue={defaultValue} className="bg-white" />
    </label>
  );
}
