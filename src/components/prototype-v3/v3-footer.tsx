import Image from "next/image";
import { cn } from "cn";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./data";
import type { Navigate } from "./navigation";
import { pagePad } from "./shared";

const link = "text-left text-[13px] leading-[18px] font-medium text-v3-footer-text transition-colors hover:text-white";
const text = "text-[13px] leading-[18px] font-medium text-v3-footer-text";

export function V3Footer({ navigate }: { navigate: Navigate }) {
  return (
    <footer className="bg-v3-deep">
      <div className={cn(pagePad, "flex flex-col gap-6 pt-9 pb-5")}>
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-[280px_1fr_1fr_1fr]">
          <address className="flex flex-col gap-2 not-italic sm:col-span-3 lg:col-span-1">
            <Image src="/v3/brand/logo-footer.png" alt="LASER" width={150} height={42} className="h-[42px] w-[150px] object-contain" />
            <span className="flex flex-col text-[13px] leading-5 font-medium text-v3-footer-text">
              <span>LASER D.O.O. Ljubuški</span>
              <span>Međugorska 26, 88320</span>
              <a href={PHONE_HREF} className="hover:text-white">
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="hover:text-white">
                {EMAIL}
              </a>
            </span>
          </address>
          <Column title="Kupnja">
            <button type="button" onClick={() => navigate({ page: "listing" })} className={link}>
              Pisaći pribor
            </button>
            <button type="button" onClick={() => navigate({ page: "categories" })} className={link}>
              Torbe i ruksaci
            </button>
            <button type="button" onClick={() => navigate({ page: "categories" })} className={link}>
              Boce
            </button>
            <button type="button" onClick={() => navigate({ page: "listing", saleOnly: true })} className={link}>
              Akcije
            </button>
          </Column>
          <Column title="Usluge">
            {["Digitalni tisak", "UV tisak", "Sublimacija", "Graviranje"].map((name) => (
              <span key={name} className={text}>
                {name}
              </span>
            ))}
          </Column>
          <Column title="Info">
            <span className={text}>O nama</span>
            <span className={text}>Dostava</span>
            <span className={text}>Cijene bez PDV-a</span>
            <a href={PHONE_HREF} className={link}>
              Kontakt
            </a>
          </Column>
        </div>
        <p className="text-[12px] leading-[17px] font-medium text-v3-footer-note">Sve navedene cijene su bez PDV-a. JIB 4272213860008</p>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-[13px] leading-[18px] font-bold text-white">{title}</p>
      {children}
    </div>
  );
}
