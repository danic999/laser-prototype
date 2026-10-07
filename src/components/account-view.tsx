"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/account-provider";

export function AccountView() {
  const { user, logout } = useAccount();
  const router = useRouter();

  if (!user) {
    return (
      <div>
        <p className="text-[12px] text-[#787574]">Račun tvrtke</p>
        <h1 className="mt-2 text-[34px] leading-none font-medium tracking-[-0.05em]">Račun</h1>
        <p className="mt-3 max-w-xl text-[16px] leading-[1.4] text-[#787574]">
          Narudžba ide samo s registriranim računom.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/prijava" className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-[16px] text-white">
            Prijava
          </Link>
          <Link href="/registracija" className="inline-flex h-12 items-center justify-center rounded-full border border-[#ebebeb] bg-white px-6 text-[16px]">
            Registracija
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[12px] text-[#787574]">Račun tvrtke</p>
      <h1 className="mt-2 text-[34px] leading-none font-medium tracking-[-0.05em]">{user.company}</h1>
      <dl className="mt-6 max-w-md divide-y divide-[#ebebeb] rounded-[28px] bg-white px-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        {[
          ["Ime", user.name],
          ["E-mail", user.email],
          ["Telefon", user.phone],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-3 text-[14px]">
            <dt className="text-[#787574]">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full border border-[#ebebeb] bg-white px-6 text-[16px]"
      >
        Odjavi se
      </button>
    </div>
  );
}
