import Image from "next/image";
import { cn } from "cn";
import { bestsellerIds, findProduct, giftCategories, heroTiles, reviews } from "./data";
import type { Navigate } from "./navigation";
import { ProductCard } from "./product-card";
import { btnRed, linkFocus, pagePad, ProductPhoto, SectionTitles, Stars } from "./shared";
import { V2HelpBar } from "./v2-footer";

export function HomePage({ navigate }: { navigate: Navigate }) {
  return (
    <main>
      <Hero navigate={navigate} />
      <GiftCategories navigate={navigate} />
      <Bestsellers navigate={navigate} />
      <Stories navigate={navigate} />
      <Reviews />
      <V2HelpBar />
    </main>
  );
}

function Hero({ navigate }: { navigate: Navigate }) {
  return (
    <section aria-labelledby="v2-hero-heading" className={cn(pagePad, "pt-7 pb-2")}>
      <div className="flex flex-col overflow-hidden rounded-[20px] lg:h-[460px] lg:flex-row">
        <div className="flex flex-col justify-center gap-5 bg-v2-ink px-6 py-10 sm:px-12 sm:pt-12 sm:pr-10 sm:pb-10 lg:w-[640px] lg:shrink-0">
          <p className="text-[12px] leading-4 font-semibold tracking-[1.6px] text-v2-red">PROMOTIVNI PROIZVODI</p>
          <h1 id="v2-hero-heading" className="text-[36px] leading-[42px] font-extrabold text-white sm:text-[48px] sm:leading-[54px]">
            Otisni logo
            <br />i istakni se
          </h1>
          <p className="max-w-[500px] text-[16px] leading-6 text-white/85">
            Više od 10.000 brendiranih poklona za događaje, klijente i timove. Cijena je jasna od početka, a digitalni
            otisak je besplatan prije nego što išta ide u tisak.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => document.getElementById("v2-najprodavanije")?.scrollIntoView({ behavior: "smooth" })} className={btnRed}>
              Najprodavanije
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("v2-pomoc")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex h-12 items-center justify-center rounded-[8px] border-[1.5px] border-white px-5 text-[15px] leading-5 font-semibold text-white transition-colors hover:bg-white hover:text-v2-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Besplatan print
            </button>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-3 bg-v2-surface p-4">
          {heroTiles.map((tile) => (
            <button
              key={tile.name}
              type="button"
              onClick={() => navigate({ page: "listing" })}
              className="group relative h-[160px] overflow-hidden rounded-[16px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red sm:h-[208px] lg:h-auto"
            >
              <ProductPhoto
                photo={tile.photo}
                sizes="(min-width: 1024px) 300px, 50vw"
                className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 h-[108px] bg-gradient-to-b from-black/0 via-black/18 via-28% to-black/82" />
              <span className="absolute bottom-4 left-4 flex flex-col gap-[2px]">
                <span className="text-[20px] leading-6 font-bold text-white">{tile.name}</span>
                <span className="text-[13px] leading-4 font-medium text-white/90">{tile.from}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftCategories({ navigate }: { navigate: Navigate }) {
  return (
    <section id="v2-kategorije" aria-label="Pronađi ideju za poklon" className={cn(pagePad, "flex scroll-mt-4 flex-col gap-[22px] pt-14 pb-4")}>
      <div className="flex items-end justify-between gap-4 sm:items-center">
        <SectionTitles title="Pronađi ideju za poklon" note="Popularna polazišta, od svakodnevnih olovaka do setova za događaje." />
        <button type="button" onClick={() => navigate({ page: "listing" })} className={cn(linkFocus, "shrink-0 text-[14px] leading-5 font-semibold text-v2-red hover:underline")}>
          Sve kategorije
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-4 lg:grid-cols-6">
        {giftCategories.map((category) => (
          <li key={category.name}>
            <button
              type="button"
              onClick={() => navigate({ page: "listing" })}
              className={cn(
                "flex h-24 w-full flex-col items-center justify-center gap-2 rounded-[14px] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(18,18,18,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-red",
                category.highlight ? "bg-v2-red-soft" : "bg-v2-surface",
              )}
            >
              <span className="grid size-[34px] place-items-center rounded-[17px] bg-white">
                <Image src={`/v2/icons/categories/${category.icon}.svg`} alt="" width={22} height={22} />
              </span>
              <span className="text-[13px] leading-4 font-semibold text-v2-ink">{category.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Bestsellers({ navigate }: { navigate: Navigate }) {
  return (
    <section id="v2-najprodavanije" aria-label="Najprodavanije" className={cn(pagePad, "flex scroll-mt-4 flex-col gap-[22px] pt-10 pb-6")}>
      <SectionTitles title="Najprodavanije, cijena odmah" note="Cijena koju vidiš uključuje prikazani tisak. Bez iznenađenja kod logotipa." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bestsellerIds.map((id) => (
          <ProductCard key={id} product={findProduct(id)} variant="bestseller" onOpen={() => navigate({ page: "product", id })} />
        ))}
      </div>
    </section>
  );
}

function Stories({ navigate }: { navigate: Navigate }) {
  return (
    <section aria-label="Priče" className={cn(pagePad, "grid gap-4 pt-7 pb-3 lg:grid-cols-2")}>
      <article className="flex min-h-[280px] flex-col justify-between gap-6 rounded-[20px] bg-v2-red-soft px-8 pt-8 pb-7">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[12px] leading-4 font-semibold tracking-[1.4px] text-v2-red">ZAJEDNO ZA PLANET</p>
          <h2 className="text-[24px] leading-[30px] font-extrabold text-v2-ink sm:text-[28px] sm:leading-[34px]">Pokloni s manjim otiskom</h2>
          <p className="max-w-[520px] text-[15px] leading-[22px] text-v2-ink">
            Reciklirane boce, RPET vezice i bilježnice od odgovornog papira. Pokaži logo i materijal na kojem je otisnut.
          </p>
        </div>
        <button type="button" onClick={() => navigate({ page: "listing" })} className={cn(linkFocus, "self-start text-[14px] leading-5 font-semibold text-v2-red hover:underline")}>
          Eko pokloni
        </button>
      </article>
      <article className="flex min-h-[280px] flex-col justify-between gap-6 rounded-[20px] bg-v2-ink px-8 pt-8 pb-7">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[12px] leading-4 font-semibold tracking-[1.4px] text-v2-red">POKLON S POENTOM</p>
          <h2 className="text-[24px] leading-[30px] font-extrabold text-white sm:text-[28px] sm:leading-[34px]">Zahvali se bez obične košare</h2>
          <p className="max-w-[520px] text-[15px] leading-[22px] text-white">
            Pokloni za klijente, setovi za tim i torbe za događaje, odabrani s tobom. Zatraži uzorak ili besplatnu ponudu prije narudžbe.
          </p>
        </div>
        <button
          type="button"
          onClick={() => document.getElementById("v2-pomoc")?.scrollIntoView({ behavior: "smooth" })}
          className="self-start rounded-[2px] text-[14px] leading-5 font-semibold text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Zatraži ponudu
        </button>
      </article>
    </section>
  );
}

function Reviews() {
  return (
    <section aria-label="Recenzije" className={cn(pagePad, "flex flex-col gap-7 pt-10 pb-14")}>
      <SectionTitles title="Što kažu naši klijenti?" note="438 nedavnih recenzija timova koji su naručili brendirani merch." />
      <ul className="grid gap-4 md:grid-cols-3 xl:gap-[82px]">
        {reviews.map((review) => (
          <li key={review.brand} className="flex min-h-[292px] flex-col rounded-[18px] border border-v2-line bg-v2-surface px-[22px] pt-[22px] pb-[18px]">
            <span className="flex items-center gap-2">
              <Image src={review.logo} alt="" width={28} height={28} />
              <span className="text-[14px] leading-4 font-bold tracking-[0.6px] text-v2-ink">{review.brand}</span>
            </span>
            <figure className="flex flex-1 flex-col gap-[14px] pt-[18px] pb-4">
              <Stars label="5 od 5 zvjezdica" />
              <blockquote className="text-[16px] leading-[25px] text-v2-ink">{review.quote}</blockquote>
            </figure>
            <p className="border-t border-v2-line pt-[14px] pb-[2px] text-[13px] leading-4 font-medium text-v2-muted">{review.by}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
