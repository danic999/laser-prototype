import { cn } from "cn";
import { dealIds, findProduct, heroSide, heroTiles, homeRows, images, services, trust } from "./data";
import type { Navigate } from "./navigation";
import { ProductCard } from "./product-card";
import { btnRed, focusRing, formatKm, pagePad, Photo, widePad } from "./shared";

const tileButton = "group relative block overflow-hidden rounded-[8px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red";
const zoom = "transition-transform duration-500 ease-out group-hover:scale-[1.04]";

export function HomePage({ navigate, onQuickAdd }: { navigate: Navigate; onQuickAdd: (productId: string) => void }) {
  return (
    <main className="bg-v3-surface pb-[12px]">
      <Hero navigate={navigate} onQuickAdd={onQuickAdd} />
      <Deals navigate={navigate} />
      <ul className={cn(pagePad, "grid gap-3 py-[18px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-6")}>
        {trust.map((item) => (
          <li key={item.title} className="flex flex-col gap-1 rounded-[4px] border border-v3-line bg-white px-4 py-[14px]">
            <p className="text-[14px] leading-5 font-bold text-v3-ink">{item.title}</p>
            <p className="text-[12px] leading-[17px] font-medium text-v3-muted">{item.note}</p>
          </li>
        ))}
      </ul>
      <SaleBanner navigate={navigate} />
      <ProductRow row={homeRows[0]} navigate={navigate} />
      <SplitPromos navigate={navigate} />
      <ProductRow row={homeRows[1]} navigate={navigate} />
      <ProductRow row={homeRows[2]} navigate={navigate} />
      <Services />
    </main>
  );
}

function Hero({ navigate, onQuickAdd }: { navigate: Navigate; onQuickAdd: (productId: string) => void }) {
  const featured = findProduct("k002-s");

  return (
    <section aria-labelledby="v3-hero-heading" className={cn(widePad, "flex flex-col gap-3 pt-4 pb-2")}>
      <div className="flex flex-col gap-3 lg:h-[520px] lg:flex-row">
        <div className="group relative h-[420px] overflow-hidden rounded-[8px] sm:h-[520px] lg:h-auto lg:flex-1">
          <button type="button" onClick={() => navigate({ page: "product", id: featured.id })} className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-v3-red" aria-label={featured.name}>
            <Photo src={featured.photo} sizes="(min-width: 1024px) 1080px, 100vw" className={cn("size-full", zoom)} />
          </button>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px] bg-gradient-to-b from-black/0 via-black/40 via-45% to-black/90" />
          <div className="pointer-events-none absolute right-5 bottom-[18px] left-5 flex flex-col gap-2 sm:left-7">
            <p className="text-[12px] leading-[15px] font-bold text-v3-red">NAJBOLJA PONUDA DANAS</p>
            <h1 id="v3-hero-heading" className="text-[24px] leading-[30px] font-extrabold text-white sm:text-[32px] sm:leading-10">
              {featured.name}
            </h1>
            <p className="text-[14px] leading-[18px] font-medium whitespace-pre-wrap text-white/88">{`${featured.sku}  ·  metal  ·  tisak u jednoj boji`}</p>
            <div className="pointer-events-auto flex flex-wrap items-center gap-4">
              <p className="text-[30px] leading-[45px] font-extrabold text-white sm:text-[36px]">{formatKm(featured.price)}</p>
              <s className="text-[16px] leading-5 font-medium text-white/67">{formatKm(featured.oldPrice ?? 0)}</s>
              <button type="button" onClick={() => onQuickAdd(featured.id)} className={cn(btnRed, "h-[42px] px-[18px] text-[14px] leading-[18px]")}>
                Dodaj u košaricu
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:flex lg:w-[300px] lg:shrink-0 lg:flex-col">
          {heroSide.map((tile) => (
            <button
              key={tile.name}
              type="button"
              onClick={() => navigate(tile.productId ? { page: "product", id: tile.productId } : { page: "categories" })}
              className={cn(tileButton, "flex h-[220px] flex-col bg-white lg:h-auto lg:flex-1")}
            >
              <Photo src={tile.photo} sizes="300px" className={cn("min-h-0 w-full flex-1", zoom)} />
              <span className="flex items-center justify-between gap-2 bg-white px-3 py-2 font-bold">
                <span className="text-[14px] leading-[18px] text-v3-ink">{tile.name}</span>
                <span className="text-[13px] leading-4 text-v3-red">{tile.from}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {heroTiles.map((tile) => (
          <button key={tile.name} type="button" onClick={() => navigate({ page: "categories" })} className={cn(tileButton, "h-[176px] bg-v3-tile")}>
            <Photo src={tile.photo} sizes="(min-width: 1024px) 270px, 50vw" className={cn("size-full", zoom)} />
            <span className="absolute bottom-0 left-0 flex h-10 w-[250px] max-w-full items-center bg-[rgba(17,17,17,0.8)] px-3 text-[14px] leading-[18px] font-bold text-white">
              {tile.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[22px] leading-[29px] font-extrabold text-v3-ink">{title}</h2>
      <button type="button" onClick={onAction} className={cn(focusRing, "shrink-0 text-[13px] leading-[17px] font-bold text-v3-red hover:underline")}>
        {action}
      </button>
    </div>
  );
}

function Deals({ navigate }: { navigate: Navigate }) {
  return (
    <section aria-label="Danas na akciji" className={cn(pagePad, "flex flex-col gap-3 pt-[18px] pb-2")}>
      <SectionHead title="Danas na akciji" action="Sve akcije" onAction={() => navigate({ page: "listing", saleOnly: true })} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {dealIds.map((placement) => (
          <ProductCard key={placement.id} placement={placement} variant="deal" onOpen={() => navigate({ page: "product", id: placement.id })} />
        ))}
      </div>
    </section>
  );
}

function SaleBanner({ navigate }: { navigate: Navigate }) {
  return (
    <section aria-label="Akcija tjedna" className={widePad}>
      <button
        type="button"
        onClick={() => navigate({ page: "listing", saleOnly: true })}
        className="group flex min-h-[160px] w-full flex-col overflow-hidden rounded-[8px] bg-v3-banner text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v3-red sm:flex-row"
      >
        <span className="flex flex-col justify-center gap-2 py-6 pr-4 pl-7 sm:w-[500px] sm:shrink-0">
          <span className="text-[12px] leading-4 font-bold text-v3-red">AKCIJA TJEDNA</span>
          <span className="text-[22px] leading-[30px] font-extrabold text-white sm:text-[26px] sm:leading-[34px]">Do 50% na plastične olovke</span>
          <span className="text-[14px] leading-[18px] font-medium text-white/82">WX-141, WX-6069 i Y-8576. Cijene bez PDV-a.</span>
        </span>
        <Photo src={images.penNotebook} sizes="(min-width: 640px) 900px, 100vw" className={cn("h-[140px] sm:h-auto sm:flex-1", zoom)} />
      </button>
    </section>
  );
}

function ProductRow({ row, navigate }: { row: (typeof homeRows)[number]; navigate: Navigate }) {
  return (
    <section aria-label={row.title} className={cn(widePad, "flex flex-col gap-3 pt-[10px] pb-[6px]")}>
      <SectionHead title={row.title} action="Vidi sve" onAction={() => navigate({ page: row.target })} />
      <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", row.columns === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5")}>
        {row.items.map((placement) => (
          <ProductCard key={placement.id} placement={placement} variant="row" onOpen={() => navigate({ page: "product", id: placement.id })} />
        ))}
      </div>
    </section>
  );
}

function SplitPromos({ navigate }: { navigate: Navigate }) {
  const promos = [
    { kicker: "ODJEĆA", title: "Polo i majice za tisak", price: "od 6,90 KM", photo: images.polo, id: "st9160" },
    { kicker: "BOCE", title: "STEEL 500 ml SM-405", price: "3,40 KM", photo: images.bottle, id: "sm-405" },
  ];

  return (
    <section aria-label="Izdvojeno" className={cn(widePad, "grid gap-3 py-2 md:grid-cols-2")}>
      {promos.map((promo) => (
        <button key={promo.title} type="button" onClick={() => navigate({ page: "product", id: promo.id })} className={cn(tileButton, "h-[230px]")}>
          <Photo src={promo.photo} sizes="(min-width: 768px) 700px, 100vw" className={cn("size-full", zoom)} />
          <span className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-b from-black/0 to-black/80" />
          <span className="absolute bottom-[19px] left-[18px] flex flex-col gap-[2px]">
            <span className="text-[12px] leading-4 font-bold text-v3-red">{promo.kicker}</span>
            <span className="text-[22px] leading-[29px] font-extrabold text-white">{promo.title}</span>
            <span className="text-[15px] leading-5 font-bold text-white">{promo.price}</span>
          </span>
        </button>
      ))}
    </section>
  );
}

function Services() {
  return (
    <section aria-labelledby="v3-services-heading" className={cn(widePad, "flex flex-col gap-3 py-3")}>
      <h2 id="v3-services-heading" className="text-[22px] leading-[29px] font-extrabold text-v3-ink">
        Usluge tiska
      </h2>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.title} className="relative h-[170px] overflow-hidden rounded-[8px]">
            <Photo src={service.photo} sizes="(min-width: 1024px) 340px, 50vw" className="size-full" />
            <span className="absolute inset-x-0 bottom-0 h-20 bg-black/60" />
            <span className="absolute bottom-[21px] left-[14px] flex flex-col gap-[2px]">
              <span className="text-[16px] leading-[21px] font-extrabold text-white">{service.title}</span>
              <span className="text-[12px] leading-4 font-medium text-white/90">{service.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
