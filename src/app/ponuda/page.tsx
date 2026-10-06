import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = { title: "Upit za ponudu" };

export default function QuotePage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-[12px] tracking-[0.08em] text-charcoal uppercase">Veleprodaja</p>
      <h1 className="mt-3 font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.88] font-extrabold tracking-[0.02em]">Upit za ponudu</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Ako dolazite s artikla, šifra i količina su već upisane. Pošalji upit u ovom pregledu ne šalje mail.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Učitavam obrazac…</p>}>
          <QuoteForm />
        </Suspense>
      </div>
    </main>
  );
}
