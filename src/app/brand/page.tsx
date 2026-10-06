import type { Metadata } from "next";
import Image from "next/image";
import { btnPill } from "@/lib/ui";

export const metadata: Metadata = { title: "Brand guide" };

const colors = [
  { name: "Canvas", hex: "#f2f4f5", role: "Podloga stranice" },
  { name: "Bijela", hex: "#ffffff", role: "Kartice, pretraga, pilule" },
  { name: "Crna", hex: "#000000", role: "Tekst i ikone" },
  { name: "Linija", hex: "#ebebeb", role: "Tanak obrub pilula" },
  { name: "Siva", hex: "#787574", role: "Pomoćni tekst" },
  { name: "Ljubičasta", hex: "#5433eb", role: "Samo dugme pretrage" },
  { name: "Laser", hex: "#E2231A", role: "Zraka u znaku. Ne ide na gumbe." },
];

export default function BrandPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <p className="text-[12px] text-[#787574]">Brand guide · web</p>
      <h1 className="mt-2 text-[28px] leading-[1.2] font-medium tracking-[-0.05em]">Znak ostaje. Shop je mekan.</h1>
      <p className="mt-3 max-w-xl text-[16px] leading-[1.33] text-[#787574]">
        Slova i crvena zraka su iz postojećeg logotipa. Oblik slova nije crtan iznova. Okvir shopa je bijela kartica na sivoj podlozi.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="flex h-36 items-center justify-center rounded-[28px] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
          <Image src="/brand/logo.png" alt="LASER na bijeloj" width={240} height={80} />
        </div>
        <div className="flex h-36 items-center justify-center rounded-[28px] bg-black">
          <Image src="/brand/logo-light.png" alt="LASER na crnoj" width={240} height={80} />
        </div>
      </div>

      <h2 className="mt-12 text-[20px] font-medium tracking-[-0.05em]">Boje</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <li key={color.hex} className="overflow-hidden rounded-[28px] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div className="h-16" style={{ background: color.hex }} />
            <div className="px-4 py-3 text-[14px]">
              <p className="font-medium tracking-[-0.014em]">{color.name}</p>
              <p className="text-[12px] text-[#787574]">{color.hex}</p>
              <p className="mt-1 text-[#787574]">{color.role}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-[20px] font-medium tracking-[-0.05em]">Slova i gumbi</h2>
      <p className="mt-3 max-w-xl text-[16px] leading-[1.33] text-[#787574]">
        Inter, bez debelog reza. Naslov je 20 px, tekst 16 px, tijesni razmak slova. Gumbi su pilule. Ljubičasta je samo krug na pretrazi.
      </p>
      <div className="mt-4">
        <span className={btnPill}>Odaberi</span>
      </div>
    </main>
  );
}
