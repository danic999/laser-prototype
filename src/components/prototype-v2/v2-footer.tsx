import Image from "next/image";
import { cn } from "cn";
import { PHONE_DISPLAY, PHONE_HREF } from "./data";
import type { Navigate } from "./navigation";
import { btnRed, Logo, pagePad } from "./shared";

const shopLinks = ["Olovke", "Torbe i putovanje", "Boce", "Bilježnice", "Eko pokloni"];
const helpLinks = ["Besplatan otisak", "Naruči uzorak", "Besplatna ponuda", "Dostava"];

const columnLink = "text-left text-[13px] leading-[18px] text-v2-footer-text transition-colors hover:text-white";

export function V2HelpBar() {
  return (
    <section id="v2-pomoc" aria-label="Pomoć" className="bg-v2-ink">
      <div className={cn(pagePad, "flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between")}>
        <div className="flex items-center gap-[14px]">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-v2-red">
            <Image src="/v2/icons/phone.svg" alt="" width={22} height={22} />
          </span>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[20px] leading-[26px] font-extrabold text-white sm:text-[24px] sm:leading-[30px]">
              Pitanja? Nazovi {PHONE_DISPLAY}
            </p>
            <p className="text-[14px] leading-5 text-white/80">Ponedjeljak–petak, 08:00–16:00. Besplatan savjet prije tiska.</p>
          </div>
        </div>
        <a href={PHONE_HREF} className={cn(btnRed, "shrink-0 self-start md:self-auto")}>
          Zatraži uzorak
        </a>
      </div>
    </section>
  );
}

export function V2Footer({ navigate }: { navigate: Navigate }) {
  return (
    <footer className="bg-v2-ink-deep">
      <div className={cn(pagePad, "flex flex-col gap-7 pt-10 pb-6")}>
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-[320px_1fr_1fr_1fr]">
          <div className="flex flex-col gap-[10px] sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="max-w-[320px] text-[13px] leading-5 text-v2-footer-text">
              Promotivni proizvodi i poslovni pokloni. Otisni logo, vidi cijenu odmah i dobij besplatan digitalni otisak.
            </p>
          </div>
          <FooterColumn title="Trgovina">
            {shopLinks.map((name) => (
              <button key={name} type="button" onClick={() => navigate({ page: "listing" })} className={columnLink}>
                {name}
              </button>
            ))}
          </FooterColumn>
          <FooterColumn title="Pomoć">
            {helpLinks.map((name) => (
              <a key={name} href={PHONE_HREF} className={columnLink}>
                {name}
              </a>
            ))}
          </FooterColumn>
          <FooterColumn title="Tvrtka">
            <span className="text-[13px] leading-[18px] text-v2-footer-text">O nama</span>
            <span className="text-[13px] leading-[18px] text-v2-footer-text">80 godina iskustva</span>
            <a href={PHONE_HREF} className={columnLink}>
              Kontakt
            </a>
            <a href={PHONE_HREF} className={columnLink}>
              {PHONE_DISPLAY}
            </a>
          </FooterColumn>
        </div>
        <div className="h-px w-full bg-v2-footer-line" />
        <div className="flex flex-col gap-2 text-[12px] leading-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-v2-footer-text">Promotivni proizvodi i poslovni pokloni.</p>
          <p className="text-v2-red">Prikazane cijene su početne cijene po komadu.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-[10px]">
      <p className="text-[13px] leading-[18px] font-semibold text-white">{title}</p>
      {children}
    </div>
  );
}
