import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = { title: "Upit za ponudu" };

export default function QuotePage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <p className="text-[12px] text-[#787574]">Veleprodaja</p>
      <h1 className="mt-2 text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">Upit za ponudu</h1>
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
