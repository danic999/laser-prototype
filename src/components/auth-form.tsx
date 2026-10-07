"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { safeNext, useAccount } from "@/components/account-provider";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "prijava" | "registracija" }) {
  const { login, register } = useAccount();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const next = params.get("next");
  const suffix = next ? `?next=${encodeURIComponent(next)}` : "";
  const registerMode = mode === "registracija";

  return (
    <form
      className="mt-8 rounded-[28px] bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setPending(true);
        const result = registerMode
          ? await register({
              company: String(data.get("tvrtka") ?? ""),
              name: String(data.get("ime") ?? ""),
              email: String(data.get("email") ?? ""),
              phone: String(data.get("telefon") ?? ""),
              password: String(data.get("lozinka") ?? ""),
            })
          : await login(String(data.get("email") ?? ""), String(data.get("lozinka") ?? ""));
        setPending(false);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        router.push(safeNext(next));
      }}
    >
      <div className="flex flex-col gap-3">
        {registerMode ? (
          <>
            <Input name="tvrtka" placeholder="Tvrtka" aria-label="Tvrtka" required />
            <Input name="ime" placeholder="Ime i prezime" aria-label="Ime i prezime" required />
            <Input name="telefon" type="tel" placeholder="Telefon" aria-label="Telefon" required />
          </>
        ) : null}
        <Input name="email" type="email" placeholder="E-mail" aria-label="E-mail" required />
        <Input name="lozinka" type="password" placeholder="Lozinka" aria-label="Lozinka" required minLength={registerMode ? 6 : undefined} />
      </div>
      {error ? <p className="mt-3 text-[14px]">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-black text-[16px] text-white disabled:opacity-60"
      >
        {registerMode ? "Otvori račun" : "Prijavi se"}
      </button>
      <p className="mt-4 text-center text-[14px] text-[#787574]">
        {registerMode ? (
          <Link href={`/prijava${suffix}`} className="text-black underline">
            Već imaš račun? Prijavi se
          </Link>
        ) : (
          <Link href={`/registracija${suffix}`} className="text-black underline">
            Nemaš račun? Registracija
          </Link>
        )}
      </p>
    </form>
  );
}
