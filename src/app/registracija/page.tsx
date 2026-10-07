import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Registracija" };

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-8 sm:px-6">
      <p className="text-[12px] text-[#787574]">Račun tvrtke</p>
      <h1 className="mt-2 text-[34px] leading-none font-medium tracking-[-0.05em]">Registracija</h1>
      <p className="mt-3 text-[16px] leading-[1.4] text-[#787574]">
        Narudžba ide samo s registriranim računom.
      </p>
      <Suspense fallback={<p className="mt-8 text-[14px] text-[#787574]">Učitavam obrazac…</p>}>
        <AuthForm mode="registracija" />
      </Suspense>
    </main>
  );
}
