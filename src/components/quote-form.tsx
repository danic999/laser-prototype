"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function QuoteForm() {
  const params = useSearchParams();
  const [sent, setSent] = useState(false);
  const sample = params.get("uzorak") === "1";

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <p className="text-xs tracking-[0.16em] text-laser uppercase">Upit je zabilježen lokalno</p>
        <h2 className="mt-2 font-heading text-3xl font-medium">Hvala. Ovo je kraj prototipa.</h2>
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
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
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
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          />
        </label>
        <Button type="submit" className="h-11 bg-laser px-5 text-white hover:bg-laser/90">
          Pošalji upit
        </Button>
      </div>
      <aside className="h-fit rounded-2xl bg-ink p-5 text-sm text-paper/80">
        <p className="font-heading text-lg text-paper">Što prodaja dobije</p>
        <ul className="mt-3 space-y-2">
          <li>Firmu i kontakt</li>
          <li>Šifru, boju i količinu</li>
          <li>Tehniku i poziciju tiska</li>
          <li>Oznaku ako treba uzorak</li>
        </ul>
        <p className="mt-4 text-xs text-paper/55">
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
      <Input name={name} type={type} required={required} defaultValue={defaultValue} className="h-10 bg-background" />
    </label>
  );
}
