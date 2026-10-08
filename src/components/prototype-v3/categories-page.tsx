import Image from "next/image";
import { cn } from "cn";
import { categories, images } from "./data";
import type { Navigate } from "./navigation";
import { Breadcrumb, btnRed, cardHover, pagePad, Photo } from "./shared";

export function CategoriesPage({ navigate }: { navigate: Navigate }) {
  return (
    <main className="bg-v3-page">
      <div className={cn(pagePad, "flex flex-col gap-4 pt-6 pb-8")}>
        <Breadcrumb items={[{ label: "Početna", onClick: () => navigate({ page: "home" }) }, { label: "Kategorije" }]} />
        <h1 className="text-[28px] leading-[38px] font-extrabold text-v3-ink">Sve kategorije</h1>
        <p className="text-[14px] leading-[19px] font-medium text-v3-muted">
          Veleprodaja reklamnog materijala iz Ljubuškog. Odaberi odjel i uđi u ponudu.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                type="button"
                onClick={() => navigate({ page: "listing", saleOnly: category.accent })}
                className={cn("group flex w-full items-center gap-3 rounded-[4px] border border-v3-line bg-white p-[14px] text-left", cardHover)}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-v3-soft transition-colors group-hover:bg-[#f3d6d2]">
                  <Image src={`/v3/icons/categories/${category.icon}.svg`} alt="" width={22} height={22} />
                </span>
                <span className="flex min-w-0 flex-col gap-[2px]">
                  <span className={cn("text-[16px] leading-[22px] font-bold", category.accent ? "text-v3-red" : "text-v3-ink")}>{category.name}</span>
                  <span className="text-[13px] leading-[18px] font-medium text-v3-muted">{category.note}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <section aria-label="Besplatna dostava" className="flex flex-col overflow-hidden rounded-[6px] bg-v3-ink md:h-[260px] md:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-3 px-6 py-9 sm:pr-9 sm:pl-11">
            <p className="text-[12px] leading-[15px] font-bold tracking-[1.2px] text-v3-red">BESPLATNA DOSTAVA</p>
            <h2 className="max-w-[700px] text-[24px] leading-[30px] font-extrabold text-white sm:text-[28px] sm:leading-[34px]">Narudžbe preko 410 KM, do 30 kg</h2>
            <p className="max-w-[480px] text-[14px] leading-[18px] font-medium text-white opacity-86">
              Veleprodaja iz Ljubuškog. Cijene bez PDV-a. Tisak, UV i gravura idu uz istu narudžbu.
            </p>
            <div className="flex flex-wrap items-center gap-[10px] pt-[6px]">
              <button type="button" onClick={() => navigate({ page: "listing" })} className={cn(btnRed, "rounded-[2px] px-[18px] py-3 text-[13px] leading-4")}>
                Pogledaj ponudu
              </button>
              <span className="rounded-[2px] border border-white/35 px-[14px] py-[11px] text-[13px] leading-4 font-semibold whitespace-pre text-white">{`Bez PDV-a  ·  do 30 kg`}</span>
            </div>
          </div>
          <Photo src={images.bag} sizes="(min-width: 768px) 520px, 100vw" className="h-[220px] md:h-auto md:w-[520px] md:shrink-0" />
        </section>
      </div>
    </main>
  );
}
