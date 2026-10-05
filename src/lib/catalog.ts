export type Tier = { qty: number; unit: number };

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  colors: ProductColor[];
  prints: string[];
  locations: string[];
  minQty: number;
  inStock: boolean;
  lead: string;
  tiers: Tier[];
  description: string;
  details: { label: string; value: string }[];
  featured?: boolean;
};

export type { Category } from "@/lib/categories";
export { categories, getCategory, getSubcategory } from "@/lib/categories";

export const services = [
  {
    slug: "digitalni-tisak",
    name: "Digitalni tisak",
    text: "Tisak u boji na papir: katalozi, mape, pozivnice i poslovni materijal.",
  },
  {
    slug: "uv-tisak",
    name: "UV tisak",
    text: "Otisak na tvrde podloge: olovke, upaljače, galanteriju i predmete nepravilnog oblika.",
  },
  {
    slug: "sublimacija",
    name: "Sublimacijski tisak",
    text: "Šalice, foto ploče i tekstil. Uz artikle ide i repromaterijal te sublimacijski start paket.",
  },
  {
    slug: "dtf",
    name: "DTF tisak",
    text: "DTF za tekstil, uz role, folije, prah i printere za radionice koje rade same.",
  },
  {
    slug: "graviranje",
    name: "Lasersko graviranje",
    text: "Gravura na metalu: olovke, upaljači, privjesci i poklon kutije.",
  },
  {
    slug: "pecati",
    name: "Izrada pečata",
    text: "Pečati uz ostale usluge tiska i gravure u Ljubuškom.",
  },
];

const penPrints = ["Lasersko graviranje", "UV tisak", "Bez tiska"];
const textilePrints = ["DTF tisak", "Sitotisak", "Bez tiska"];

export const products: Product[] = [
  {
    slug: "k002-kemijska-metalna",
    sku: "K002",
    name: "Kemijska olovka metalna",
    category: "pisaci-pribor",
    subcategory: "kemijske-olovke",
    featured: true,
    colors: [
      { id: "crna", name: "Crna", hex: "#1a1a1a", image: "/products/olovka-crna.jpg" },
      { id: "srebrna", name: "Srebrna", hex: "#c5c8cc", image: "/products/olovka-silver.jpg" },
    ],
    prints: penPrints,
    locations: ["Na tijelu", "Na kopči"],
    minQty: 50,
    inStock: true,
    lead: "8–12 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 50, unit: 1.45 },
      { qty: 100, unit: 1.28 },
      { qty: 250, unit: 1.12 },
      { qty: 500, unit: 0.98 },
      { qty: 1000, unit: 0.85 },
    ],
    description:
      "Metalna kemijska olovka iz stalnog asortimana, u crnoj i srebrnoj izvedbi. Za veleprodaju se gravira ili radi UV tisak, uz digitalni dokaz prije serije.",
    details: [
      { label: "Šifra", value: "K002-CR / K002-S" },
      { label: "Vrsta", value: "Metalna kemijska" },
      { label: "Tisak", value: "Gravura ili UV" },
    ],
  },
  {
    slug: "r002-roler-silver",
    sku: "R002-S",
    name: "Roler metalni silver",
    category: "pisaci-pribor",
    subcategory: "pisaci-setovi",
    colors: [{ id: "srebrna", name: "Srebrna", hex: "#c5c8cc", image: "/products/roler.jpg" }],
    prints: penPrints,
    locations: ["Na tijelu", "Na kapici"],
    minQty: 25,
    inStock: true,
    lead: "8–12 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 25, unit: 2.4 },
      { qty: 50, unit: 2.15 },
      { qty: 100, unit: 1.95 },
      { qty: 250, unit: 1.75 },
    ],
    description: "Metalni roler, srebrna izvedba. Ide uz poklon kutije za olovke iz iste ponude.",
    details: [
      { label: "Šifra", value: "R002-S" },
      { label: "Vrsta", value: "Metalni roler" },
    ],
  },
  {
    slug: "wp-900-gelux",
    sku: "WP-900",
    name: "Gel kemijska olovka Gelux",
    category: "pisaci-pribor",
    subcategory: "kemijske-olovke",
    colors: [{ id: "mjesovito", name: "Više boja", hex: "#3d5a80", image: "/products/gelux.jpg" }],
    prints: ["UV tisak", "Tampotisak", "Bez tiska"],
    locations: ["Na tijelu"],
    minQty: 100,
    inStock: true,
    lead: "7–10 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 100, unit: 0.42 },
      { qty: 250, unit: 0.36 },
      { qty: 500, unit: 0.31 },
      { qty: 1000, unit: 0.27 },
    ],
    description: "Plastična gel kemijska olovka Gelux za veće količine i sajamske podjele.",
    details: [
      { label: "Šifra", value: "WP-900" },
      { label: "Vrsta", value: "Gel kemijska" },
    ],
  },
  {
    slug: "ki0294-shopping-torba",
    sku: "KI0294",
    name: "Shopping torba",
    category: "torbe-i-putovanja",
    subcategory: "shopping-torbe",
    featured: true,
    colors: [{ id: "crna", name: "Crna", hex: "#1c1c1c", image: "/products/torba.jpg" }],
    prints: ["Sitotisak", "DTF tisak", "Bez tiska"],
    locations: ["Prednja strana"],
    minQty: 50,
    inStock: true,
    lead: "10–14 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 50, unit: 2.9 },
      { qty: 100, unit: 2.55 },
      { qty: 250, unit: 2.2 },
      { qty: 500, unit: 1.95 },
    ],
    description:
      "Torba za kupovinu s gornjim i donjim panelima od tkanih jutastih niti, s pletenim efektom. Unutarnji džep s patentnim zatvaračem. Dostupna crna boja.",
    details: [
      { label: "Šifra", value: "KI0294" },
      { label: "Boja", value: "Crna" },
      { label: "Džep", value: "Unutarnji, s patentom" },
    ],
  },
  {
    slug: "ki0434-torba-laptop",
    sku: "KI0434",
    name: "Torba za laptop",
    category: "torbe-i-putovanja",
    subcategory: "torbe-za-laptop",
    colors: [{ id: "crna", name: "Crna", hex: "#222", image: "/products/laptop.jpg" }],
    prints: ["Sitotisak", "Vez", "Bez tiska"],
    locations: ["Prednja strana"],
    minQty: 20,
    inStock: true,
    lead: "10–14 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 20, unit: 8.5 },
      { qty: 50, unit: 7.6 },
      { qty: 100, unit: 6.9 },
    ],
    description: "Torba za laptop za poslovne setove i konferencije.",
    details: [{ label: "Šifra", value: "KI0434" }],
  },
  {
    slug: "vr-14c-eko-vrecica",
    sku: "VR-14C",
    name: "Eko vrećica",
    category: "torbe-i-putovanja",
    subcategory: "pamucne-torbe",
    colors: [{ id: "prirodna", name: "Prirodna", hex: "#d8c7a2", image: "/products/eko.jpg" }],
    prints: ["Sitotisak", "DTF tisak", "Bez tiska"],
    locations: ["Prednja strana"],
    minQty: 100,
    inStock: true,
    lead: "10–14 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 100, unit: 0.95 },
      { qty: 250, unit: 0.82 },
      { qty: 500, unit: 0.7 },
      { qty: 1000, unit: 0.62 },
    ],
    description: "Eko vrećica, dimenzija 19×13×8 cm, za manje poklone i dostavu.",
    details: [
      { label: "Šifra", value: "VR-14C" },
      { label: "Dimenzija", value: "19×13×8 cm" },
    ],
  },
  {
    slug: "rt05-rashladni-ruksak",
    sku: "RT05",
    name: "Rashladni ruksak",
    category: "torbe-i-putovanja",
    subcategory: "rashladne-torbe",
    featured: true,
    colors: [{ id: "siva", name: "Siva", hex: "#8d8f92", image: "/products/ruksak.jpg" }],
    prints: ["Sitotisak", "DTF tisak", "Bez tiska"],
    locations: ["Prednji džep"],
    minQty: 20,
    inStock: true,
    lead: "12–16 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 20, unit: 12.5 },
      { qty: 50, unit: 11.2 },
      { qty: 100, unit: 9.9 },
    ],
    description: "Rashladni ruksak, 26×20×36 cm, za terensku i event prodaju.",
    details: [
      { label: "Šifra", value: "RT05" },
      { label: "Dimenzija", value: "26×20×36 cm" },
    ],
  },
  {
    slug: "tm-06-kisobran-golf",
    sku: "TM-06",
    name: "Kišobran golf ERO 27",
    category: "slobodno-vrijeme",
    subcategory: "kisobrani",
    featured: true,
    colors: [
      { id: "crna", name: "Crna", hex: "#111", image: "/products/kisobran.jpg" },
      { id: "plava", name: "Plava", hex: "#1d4e89", image: "/products/kisobran.jpg" },
      { id: "crvena", name: "Crvena", hex: "#c81d25", image: "/products/kisobran.jpg" },
      { id: "bijela", name: "Bijela", hex: "#f4f4f4", image: "/products/kisobran.jpg" },
      { id: "zuta", name: "Žuta", hex: "#e6b325", image: "/products/kisobran.jpg" },
    ],
    prints: ["Sitotisak", "Bez tiska"],
    locations: ["Na polju"],
    minQty: 25,
    inStock: true,
    lead: "12–18 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 25, unit: 6.8 },
      { qty: 50, unit: 6.1 },
      { qty: 100, unit: 5.4 },
      { qty: 250, unit: 4.9 },
    ],
    description: "Golf kišobran ERO 27. Više boja kupole, tisak na jednom polju.",
    details: [
      { label: "Šifra", value: "TM-06" },
      { label: "Model", value: "ERO 27" },
    ],
  },
  {
    slug: "tm-02-kisobran-sklopivi",
    sku: "TM-02",
    name: "Kišobran mali sklopivi teleskopski",
    category: "slobodno-vrijeme",
    subcategory: "kisobrani",
    colors: [{ id: "crna", name: "Crna", hex: "#1a1a1a", image: "/products/kisobran-mali.jpg" }],
    prints: ["Sitotisak", "Bez tiska"],
    locations: ["Na polju"],
    minQty: 50,
    inStock: true,
    lead: "12–18 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 50, unit: 3.4 },
      { qty: 100, unit: 3.05 },
      { qty: 250, unit: 2.7 },
    ],
    description: "Mali sklopivi teleskopski kišobran za poslovne poklone.",
    details: [{ label: "Šifra", value: "TM-02" }],
  },
  {
    slug: "sm-405-boca",
    sku: "SM-405",
    name: "Promo boca Steel 500 ml",
    category: "posude-za-pice",
    subcategory: "boce-za-vodu",
    featured: true,
    colors: [{ id: "celik", name: "Čelik", hex: "#b7bcc2", image: "/products/boca.jpg" }],
    prints: ["Lasersko graviranje", "UV tisak", "Bez tiska"],
    locations: ["Na tijelu"],
    minQty: 24,
    inStock: true,
    lead: "10–14 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 24, unit: 4.8 },
      { qty: 48, unit: 4.35 },
      { qty: 96, unit: 3.95 },
      { qty: 192, unit: 3.6 },
    ],
    description: "Čelična promo boca, 500 ml. Gravura drži na metalu duže od naljepnice.",
    details: [
      { label: "Šifra", value: "SM-405" },
      { label: "Zapremina", value: "500 ml" },
    ],
  },
  {
    slug: "sm-50-salica",
    sku: "SM-50",
    name: "Sublimacijska šalica",
    category: "posude-za-pice",
    subcategory: "salice",
    featured: true,
    colors: [{ id: "bijela", name: "Bijela", hex: "#f7f7f7", image: "/products/salica.jpg" }],
    prints: ["Sublimacija", "Bez tiska"],
    locations: ["Omot šalice"],
    minQty: 36,
    inStock: true,
    lead: "7–10 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 36, unit: 3.1 },
      { qty: 72, unit: 2.75 },
      { qty: 144, unit: 2.45 },
    ],
    description:
      "Bijela sublimacijska šalica. Uz nju u ponudi su tinta, papir, termo prese i ostali repromaterijal.",
    details: [{ label: "Šifra", value: "SM-50" }],
  },
  {
    slug: "l8000-laserlight",
    sku: "L8000",
    name: "Laserlight upaljač",
    category: "pokloni-i-igre",
    subcategory: "upaljaci",
    featured: true,
    colors: [
      { id: "crni", name: "Crni", hex: "#111", image: "/products/upaljac.jpg" },
      { id: "bijeli", name: "Bijeli", hex: "#f3f3f3", image: "/products/upaljac-bijeli.jpg" },
    ],
    prints: ["UV tisak", "Tampotisak", "Bez tiska"],
    locations: ["Na tijelu"],
    minQty: 50,
    inStock: true,
    lead: "8–12 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 50, unit: 1.15 },
      { qty: 100, unit: 0.98 },
      { qty: 250, unit: 0.86 },
      { qty: 500, unit: 0.76 },
    ],
    description: "Laserlight upaljač, crni i bijeli. Linija koju LASER drži za veleprodaju i dotisak.",
    details: [
      { label: "Šifra", value: "L8000C / L8000W" },
      { label: "Linija", value: "Laserlight" },
    ],
  },
  {
    slug: "st9160-polo",
    sku: "ST9160",
    name: "Polo majica, kratki rukav, žene",
    category: "odjeca-i-dodaci",
    subcategory: "polo-majice",
    featured: true,
    colors: [{ id: "bijela", name: "Bijela", hex: "#f4f4f4", image: "/products/polo.jpg" }],
    prints: textilePrints,
    locations: ["Lijeva prsa", "Leđa"],
    minQty: 10,
    inStock: true,
    lead: "10–15 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 10, unit: 14.5 },
      { qty: 25, unit: 13.2 },
      { qty: 50, unit: 12.1 },
      { qty: 100, unit: 11.2 },
    ],
    description:
      "Ženska polo majica kratkog rukava. Tekstil za personalizaciju ide uz Stedman i MUKUA program te DTF dotisak.",
    details: [
      { label: "Šifra", value: "ST9160" },
      { label: "Kroj", value: "Žene, kratki rukav" },
    ],
  },
  {
    slug: "ag524-popup",
    sku: "AG524",
    name: "Pop-up zidni banner",
    category: "ured-i-poslovanje",
    subcategory: "uredski-proizvodi",
    colors: [{ id: "tisak", name: "Po nacrtu", hex: "#d8d2c6", image: "/products/banner.jpg" }],
    prints: ["Digitalni tisak"],
    locations: ["Cijela površina"],
    minQty: 1,
    inStock: true,
    lead: "5–8 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 1, unit: 145 },
      { qty: 2, unit: 132 },
      { qty: 5, unit: 118 },
    ],
    description: "Pop-up zidni banner iz klik-klak asortimana. Cijena u pregledu uključuje primjer tiska grafike.",
    details: [{ label: "Šifra", value: "AG524" }],
  },
  {
    slug: "p021-kutija",
    sku: "P021",
    name: "Kožna poklon kutija za olovke",
    category: "pokloni",
    subcategory: "poklon-setovi",
    colors: [{ id: "crna", name: "Crna", hex: "#1b1b1b", image: "/products/kutija.jpg" }],
    prints: ["Lasersko graviranje", "Bez gravure"],
    locations: ["Poklopac"],
    minQty: 10,
    inStock: true,
    lead: "8–12 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 10, unit: 6.4 },
      { qty: 25, unit: 5.7 },
      { qty: 50, unit: 5.1 },
    ],
    description: "Kožna poklon kutija za olovke, zatvaranje na magnet. Ide uz metalne olovke K002 i R002.",
    details: [
      { label: "Šifra", value: "P021" },
      { label: "Zatvaranje", value: "Magnet" },
    ],
  },
  {
    slug: "kc-02-privjesak",
    sku: "KC-02",
    name: "Privjesak otvarač",
    category: "pokloni-i-igre",
    subcategory: "privjesci",
    colors: [{ id: "metal", name: "Metal", hex: "#9aa0a6", image: "/products/privjesak.jpg" }],
    prints: ["Lasersko graviranje", "UV tisak", "Bez tiska"],
    locations: ["Prednja ploha"],
    minQty: 50,
    inStock: true,
    lead: "8–12 radnih dana nakon odobrenja dokaza",
    tiers: [
      { qty: 50, unit: 1.35 },
      { qty: 100, unit: 1.15 },
      { qty: 250, unit: 0.98 },
    ],
    description: "Metalni privjesak s otvaračem za boce.",
    details: [{ label: "Šifra", value: "KC-02" }],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsIn(category: string, subcategory?: string) {
  return products.filter(
    (product) => product.category === category && (!subcategory || product.subcategory === subcategory),
  );
}

export function entryTier(product: Product) {
  return product.tiers[0];
}

export function floorTier(product: Product) {
  return product.tiers[product.tiers.length - 1];
}

export function unitForQty(product: Product, qty: number) {
  const reached = product.tiers.filter((tier) => qty >= tier.qty);
  return (reached.at(-1) ?? product.tiers[0]).unit;
}

export function savings(product: Product, unit: number) {
  const base = entryTier(product).unit;
  if (unit >= base) return 0;
  return Math.round((1 - unit / base) * 100);
}

function groupThousands(value: string) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatQty(value: number) {
  return groupThousands(String(Math.round(value)));
}

export function formatKm(value: number) {
  const [whole, frac] = value.toFixed(2).split(".");
  return `${groupThousands(whole)},${frac} KM`;
}

export function relatedProducts(product: Product) {
  return products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
}
