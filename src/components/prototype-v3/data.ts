// Static content for Prototype v3, taken from the Figma file "Prototype v3 – LASER".

export const images = {
  penTeal: "/v3/images/pen-teal.png",
  penNotebook: "/v3/images/pen-notebook.png",
  bottle: "/v3/images/bottle.png",
  bag: "/v3/images/bag.png",
  mug: "/v3/images/mug.png",
  polo: "/v3/images/polo.png",
  backpack: "/v3/images/backpack.png",
  notebook: "/v3/images/notebook.png",
  tees: "/v3/images/tees.png",
} as const;

export type Colour = { name: string; hex: string };

const silver: Colour = { name: "Silver", hex: "#C5C8CE" };
const black: Colour = { name: "Crna", hex: "#1A1A1A" };
const blue: Colour = { name: "Plava", hex: "#2F5BD3" };

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  oldPrice?: number;
  photo: string;
  gallery?: string[];
  department: string;
  category: string;
  group: string;
  material: string;
  colours: Colour[];
  about?: string[];
};

export const products: Product[] = [
  {
    id: "k002-s",
    name: "Kemijska olovka metalna silver",
    sku: "K002-S",
    price: 1.85,
    oldPrice: 2.2,
    photo: images.penTeal,
    gallery: [images.penTeal, images.penNotebook, images.penTeal, images.penNotebook],
    department: "Pisaći pribor",
    category: "Metalne olovke",
    group: "Metalne i alu kemijske olovke",
    material: "Metal",
    colours: [silver, black],
    about: [
      "Metalna kemijska olovka srebrnog tijela za sajmove, pakete dobrodošlice i ured. Na tijelo staje oštar tisak u jednoj boji, a cijena koju vidiš već ga uključuje.",
      "Prije tiska šaljemo digitalni otisak. Graviranje je moguće na upit. Pakiranje je po 50 komada, a za narudžbe preko 410 KM dostava unutar BiH je besplatna do 30 kg.",
    ],
  },
  pen("k002-cr", "Kemijska olovka metalna crna", "K002-CR", 1.85, undefined, images.penTeal, "Metalne olovke", "Metal", [black, silver]),
  pen("r002-cr", "Roler metalni crni", "R002-CR", 2.1, undefined, images.penNotebook, "Metalne olovke", "Metal", [black]),
  pen("h-1852", "Kemijska olovka H-1852", "H-1852", 0.38, undefined, images.penTeal, "Plastične kemijske olovke", "Plastika", [black, blue]),
  pen("wx-141", "Kemijska olovka WX-141", "WX-141", 0.29, 0.41, images.penNotebook, "Plastične kemijske olovke", "Plastika", [blue]),
  pen("wx-2004", "Kemijska olovka WX-2004", "WX-2004", 0.32, 0.4, images.penTeal, "Plastične kemijske olovke", "Plastika", [black, silver]),
  pen("wx-2023", "Kemijska olovka WX-2023", "WX-2023", 0.35, undefined, images.penTeal, "Plastične kemijske olovke", "Plastika", [silver]),
  pen("wx-309", "Kemijska olovka WX-309", "WX-309", 0.42, undefined, images.penNotebook, "Plastične kemijske olovke", "Plastika", [black]),
  pen("wx-6067", "Modern WX-6067", "WX-6067", 0.48, undefined, images.penNotebook, "Plastične kemijske olovke", "Plastika", [blue, silver]),
  pen("wx-6069", "Regular WX-6069", "WX-6069", 0.27, 0.45, images.penTeal, "Plastične kemijske olovke", "Plastika", [black, blue]),
  pen("wx-6070", "Gel olovka Fit WX-6070", "WX-6070", 0.52, undefined, images.penNotebook, "Plastične kemijske olovke", "Plastika", [black]),
  pen("y-8576", "Kemijska olovka Y-8576", "Y-8576", 0.22, 0.44, images.penNotebook, "Plastične kemijske olovke", "Plastika", [blue, black]),
  item("sm-405", "Promo boca STEEL 500 ml", "SM-405", 3.4, 3.9, images.bottle, "Boce", "Nehrđajući čelik"),
  item("vr-14c", "Eko vrećica 19×13×8 cm", "VR-14C", 0.65, 0.9, images.bag, "Torbe i ruksaci", "Papir"),
  item("rt05", "Rashladni ruksak RT05", "RT05", 12.4, undefined, images.backpack, "Torbe i ruksaci", "Poliester"),
  item("sm-50", "Sublimacijska šalica SM-50", "SM-50", 1.85, undefined, images.mug, "Šalice", "Keramika"),
  item("vr-22", "Jutena vrećica VR-22", "VR-22", 0.48, undefined, images.bag, "Torbe i ruksaci", "Juta"),
  item("p-set", "Poklon notes set", "P-SET", 4.2, undefined, images.notebook, "Poklon setovi", "Papir"),
  item("st9160", "Polo majica ST9160", "ST9160", 8.9, undefined, images.polo, "Odjeća", "Pamuk"),
  item("st2000", "Majica kratki rukav", "ST2000", 4.5, undefined, images.tees, "Odjeća", "Pamuk"),
  item("l1000", "Softshell jakna L1000", "L1000", 24, undefined, images.backpack, "Odjeća", "Softshell"),
  item("st3000", "Polo majica muška", "ST3000", 9.4, undefined, images.polo, "Odjeća", "Pamuk"),
  item("st2100", "Majica dugi rukav", "ST2100", 6.2, undefined, images.tees, "Odjeća", "Pamuk"),
];

function pen(
  id: string,
  name: string,
  sku: string,
  price: number,
  oldPrice: number | undefined,
  photo: string,
  category: string,
  material: string,
  colours: Colour[],
): Product {
  const second = photo === images.penTeal ? images.penNotebook : images.penTeal;
  return {
    id,
    name,
    sku,
    price,
    oldPrice,
    photo,
    gallery: [photo, second, photo, second],
    department: "Pisaći pribor",
    category,
    group: category,
    material,
    colours,
  };
}

function item(id: string, name: string, sku: string, price: number, oldPrice: number | undefined, photo: string, department: string, material: string): Product {
  return { id, name, sku, price, oldPrice, photo, department, category: department, group: department, material, colours: [] };
}

export function findProduct(id: string): Product {
  return products.find((product) => product.id === id) ?? products[0];
}

/** A product as shown in one spot of the design, where Figma sometimes uses a different label or photo. */
export type Placement = { id: string; name?: string; photo?: string };

export const dealIds: Placement[] = [{ id: "k002-s" }, { id: "r002-cr" }, { id: "sm-405" }, { id: "vr-14c" }];

export const homeRows: { title: string; target: "listing" | "categories"; columns: 5 | 6; items: Placement[] }[] = [
  {
    title: "Pisaći pribor",
    target: "listing",
    columns: 6,
    items: [
      { id: "h-1852", photo: images.penTeal },
      { id: "wx-141", photo: images.penNotebook },
      { id: "wx-2004", photo: images.penTeal },
      { id: "wx-6067", photo: images.penNotebook },
      { id: "wx-6069", photo: images.penTeal },
      { id: "y-8576", photo: images.penNotebook },
    ],
  },
  {
    title: "Torbe, boce i šalice",
    target: "categories",
    columns: 6,
    items: [{ id: "vr-14c", name: "Eko vrećica VR-14C" }, { id: "rt05" }, { id: "sm-405" }, { id: "sm-50" }, { id: "vr-22" }, { id: "p-set" }],
  },
  {
    title: "Odjeća",
    target: "categories",
    columns: 5,
    items: [{ id: "st9160" }, { id: "st2000" }, { id: "l1000" }, { id: "st3000" }, { id: "st2100" }],
  },
];

export const listing: Placement[] = [
  { id: "h-1852", name: "Kemijska olovka | H-1852", photo: images.penTeal },
  { id: "wx-141", name: "Kemijska olovka | WX-141", photo: images.penTeal },
  { id: "wx-2004", name: "Kemijska olovka | WX-2004", photo: images.penNotebook },
  { id: "wx-2023", name: "Kemijska olovka | WX-2023", photo: images.penTeal },
  { id: "wx-309", name: "Kemijska olovka | WX-309", photo: images.penNotebook },
  { id: "wx-6067", name: "Kemijska olovka Modern | WX-6067", photo: images.penTeal },
  { id: "wx-6069", name: "Kemijska olovka Regular | WX-6069", photo: images.penTeal },
  { id: "wx-6070", name: "Gel olovka Fit | WX-6070", photo: images.penNotebook },
  { id: "y-8576", name: "Kemijska olovka | Y-8576", photo: images.penTeal },
];

export const relatedIds: Placement[] = [{ id: "k002-cr" }, { id: "r002-cr" }, { id: "wx-141" }, { id: "vr-14c", name: "Eko vrećica" }, { id: "wx-6069" }];

export const priceFilters = [
  { label: "Ispod 0,30 KM", test: (price: number) => price < 0.3 },
  { label: "0,30 KM – 0,50 KM", test: (price: number) => price >= 0.3 && price < 0.5 },
  { label: "0,50 KM i više", test: (price: number) => price >= 0.5 },
];

export const colourFilters = [black, blue, silver];

// Quantity breaks from the K002-S frame; other products scale from their 100-piece price.
const PRICE_BREAKS = [
  { from: 50, to: 99, factor: 2.2 / 1.85, note: "redovna" },
  { from: 100, to: 249, factor: 1, note: "akcijska" },
  { from: 250, to: 499, factor: 1.7 / 1.85, note: "veća količina" },
  { from: 500, to: Infinity, factor: 1.55 / 1.85, note: "najniža" },
];

export type PriceBreak = { from: number; to: number; price: number; note: string };

export function priceBreaks(product: Product): PriceBreak[] {
  return PRICE_BREAKS.map((tier) => ({
    from: tier.from,
    to: tier.to,
    note: tier.note,
    price: Math.round(product.price * tier.factor * 100) / 100,
  }));
}

export function breakFor(product: Product, qty: number): PriceBreak {
  const tiers = priceBreaks(product);
  return tiers.find((tier) => qty >= tier.from && qty <= tier.to) ?? tiers[0];
}

export const heroSide = [
  { name: "Boce STEEL", from: "od 3,40 KM", photo: images.bottle, productId: "sm-405" },
  { name: "Torbe i ruksaci", from: "od 0,65 KM", photo: images.bag },
];

export const heroTiles = [
  { name: "Šalice", photo: images.mug },
  { name: "Odjeća", photo: images.polo },
  { name: "Ruksaci", photo: images.backpack },
  { name: "Poklon setovi", photo: images.notebook },
  { name: "Majice", photo: images.tees },
];

export const navLinks = [
  { name: "Pisaći pribor", target: "listing" },
  { name: "Torbe i ruksaci", target: "categories" },
  { name: "Kišobrani", target: "categories" },
  { name: "Boce", target: "categories" },
  { name: "Odjeća", target: "categories" },
  { name: "USB i gadgeti", target: "categories" },
] as const;

export const trust = [
  { title: "Tisak u boji", note: "Digitalni COLOR, UV i sublimacija" },
  { title: "Graviranje", note: "Laser na metalu, drvu i koži" },
  { title: "Veleprodaja", note: "Cijene su bez PDV-a" },
  { title: "Dostava", note: "Besplatno preko 410 KM" },
];

export const services = [
  { title: "Digitalni tisak", note: "COLOR tisak na papir", photo: images.notebook },
  { title: "UV tisak", note: "Na tvrde podloge", photo: images.bottle },
  { title: "Sublimacija", note: "Šalice, tekstil, ploče", photo: images.mug },
  { title: "Graviranje", note: "Metal, drvo i koža", photo: images.penTeal },
];

export const categories: { name: string; note: string; icon: string; accent?: boolean }[] = [
  { name: "Pisaći pribor", note: "Olovke, roleri i drvene", icon: "pisaci-pribor" },
  { name: "Torbe i ruksaci", note: "Vrećice, jutene i rashladne", icon: "torbe" },
  { name: "Kišobrani", note: "Golf i sklopivi", icon: "kisobrani" },
  { name: "Boce", note: "Čelik i promo boce", icon: "boce" },
  { name: "Šalice", note: "Sublimacija i keramika", icon: "salice" },
  { name: "Odjeća", note: "Polo, majice, jakne", icon: "odjeca" },
  { name: "USB i gadgeti", note: "Stickovi i sitni promo", icon: "usb" },
  { name: "Upaljači", note: "Laserlight i metalni", icon: "upaljaci" },
  { name: "Privjesci", note: "Otvarači i vezice", icon: "privjesci" },
  { name: "Poklon setovi", note: "Notes, kutije, vino", icon: "poklon-setovi" },
  { name: "Bedževi", note: "22 mm i bedžomati", icon: "bedzevi" },
  { name: "Klik-klak", note: "Okviri i reklame", icon: "klik-klak" },
  { name: "Drvene daske", note: "Bambus i akacija", icon: "drvene-daske" },
  { name: "Kape", note: "Promo kape", icon: "kape" },
  { name: "Akreditacije", note: "Kartice i vezice", icon: "akreditacije" },
  { name: "Akcije", note: "Popusti do 50%", icon: "akcije", accent: true },
  { name: "DTF", note: "Printeri, role i folije", icon: "dtf" },
  { name: "Sublimacija", note: "Boje, papir i prese", icon: "sublimacija" },
  { name: "Termo prese", note: "Šalice i tekstil", icon: "termo-prese" },
  { name: "Zastave", note: "Promo i nosači", icon: "zastave" },
  { name: "Pepeljare", note: "Unutarnje i vanjske", icon: "pepeljare" },
  { name: "Vinski setovi", note: "Otvarači i pribor", icon: "vinski-setovi" },
  { name: "Vizitari", note: "Držači i etui", icon: "vizitari" },
  { name: "Zidni satovi", note: "Tisak i sublimacija", icon: "zidni-satovi" },
  { name: "Foto ploče", note: "Kamen, staklo, metal", icon: "foto-ploce" },
  { name: "Magneti i folije", note: "Fridge magneti, platna", icon: "magneti" },
  { name: "Outlet", note: "Sniženi asortiman", icon: "outlet", accent: true },
  { name: "Katalozi", note: "Laser i Stedman", icon: "katalozi" },
];

export const PHONE_DISPLAY = "+387 39 830 773";
export const PHONE_HREF = "tel:+38739830773";
export const EMAIL = "veleprodaja@laser-bih.com";

export const FREE_DELIVERY_FROM = 410;
export const DELIVERY_FEE = 15;
export const VAT_RATE = 0.17;
export const MIN_QTY = 50;
export const QTY_STEP = 50;
