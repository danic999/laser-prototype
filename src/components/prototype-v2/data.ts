// Static content for Prototype v2, taken from the Figma file "Prototype".

export type Crop = { size: string; left: string; top: string };

export type Photo = { src: string; crop?: Crop };

const bottleCrop: Crop = { size: "161.29%", left: "-30.65%", top: "-19.35%" };

export const photos = {
  penTeal: { src: "/v2/images/pen-teal.png" },
  penNotebook: { src: "/v2/images/pen-notebook.png" },
  notebookDark: { src: "/v2/images/notebook-dark.png" },
  notebookWhite: { src: "/v2/images/notebook-white.png" },
  colourPencils: { src: "/v2/images/colour-pencils.png" },
  toteBag: { src: "/v2/images/tote-bag.png" },
  bottleGreen: { src: "/v2/images/bottle-green.png", crop: bottleCrop },
} satisfies Record<string, Photo>;

export const colourNames: Record<string, string> = {
  "#1F264C": "Mornarska",
  "#161616": "Crna",
  "#111111": "Crna",
  "#F4F6FA": "Bijela",
  "#F7F8FB": "Bijela",
  "#3367EB": "Plava",
  "#ED2C2C": "Crvena",
  "#05A638": "Zelena",
  "#EB881D": "Narančasta",
  "#C5CAD6": "Srebrna",
  "#8A6A3B": "Smeđa",
  "#4F7A5E": "Zelena",
};

export type Product = {
  id: string;
  name: string;
  kind: string;
  sku: string;
  price: number;
  oldPrice?: number;
  /** Struck-through price on the homepage bestseller card, where Figma shows a different reference price. */
  bestsellerOldPrice?: number;
  minQty: number;
  photo: Photo;
  gallery: Photo[];
  colours: string[];
  detailColours?: string[];
  about?: string;
};

const penGallery = [photos.penTeal, photos.penNotebook, photos.penTeal, photos.notebookDark];

export const products: Product[] = [
  {
    id: "athos",
    name: "Olovka Athos",
    kind: "Kemijska olovka",
    sku: "301401",
    price: 0.09,
    oldPrice: 0.16,
    bestsellerOldPrice: 0.1,
    minQty: 150,
    photo: photos.penTeal,
    gallery: penGallery,
    colours: ["#1F264C", "#111111", "#F4F6FA", "#3367EB"],
    detailColours: ["#1F264C", "#161616", "#F4F6FA", "#3367EB", "#ED2C2C"],
    about:
      "Tanka kemijska olovka za događaje, pakete dobrodošlice i svakodnevni stol. Na tijelo staje oštar logo u jednoj boji, a cijena koju vidiš već uključuje taj tisak.",
  },
  {
    id: "athos-silver",
    name: "Olovka Athos Silver",
    kind: "Kemijska olovka",
    sku: "301402",
    price: 0.09,
    minQty: 150,
    photo: photos.penNotebook,
    gallery: [photos.penNotebook, photos.penTeal, photos.notebookDark, photos.penTeal],
    colours: ["#C5CAD6", "#1F264C", "#F4F6FA"],
  },
  {
    id: "ebony-matt",
    name: "Olovka Ebony Matt",
    kind: "Kemijska olovka",
    sku: "301510",
    price: 0.21,
    oldPrice: 0.23,
    minQty: 100,
    photo: photos.penTeal,
    gallery: penGallery,
    colours: ["#1F264C", "#111111"],
  },
  {
    id: "ebony-soft-touch",
    name: "Ebony Soft Touch",
    kind: "Kemijska olovka",
    sku: "301511",
    price: 0.29,
    oldPrice: 0.32,
    minQty: 100,
    photo: photos.notebookDark,
    gallery: [photos.notebookDark, photos.penTeal, photos.penNotebook, photos.penTeal],
    colours: ["#1F264C", "#3367EB", "#05A638"],
  },
  {
    id: "luca-touch",
    name: "Pisaljka Luca Touch",
    kind: "Pisaljka za ekran",
    sku: "301620",
    price: 0.33,
    oldPrice: 0.37,
    minQty: 100,
    photo: photos.penNotebook,
    gallery: [photos.penNotebook, photos.penTeal, photos.notebookDark, photos.penTeal],
    colours: ["#1F264C", "#EB881D", "#F4F6FA"],
  },
  {
    id: "paris-metal",
    name: "Paris Metal soft touch",
    kind: "Metalna olovka",
    sku: "301730",
    price: 0.35,
    minQty: 50,
    photo: photos.penTeal,
    gallery: penGallery,
    colours: ["#C5CAD6", "#1F264C", "#3367EB"],
  },
  {
    id: "athos-bamboo",
    name: "Olovka Athos Bamboo",
    kind: "Eko olovka",
    sku: "301403",
    price: 0.18,
    minQty: 150,
    photo: photos.notebookDark,
    gallery: [photos.notebookDark, photos.penTeal, photos.penNotebook, photos.penTeal],
    colours: ["#8A6A3B", "#1F264C"],
  },
  {
    id: "athos-rpet",
    name: "Olovka Athos GRS RPET",
    kind: "Eko olovka",
    sku: "301404",
    price: 0.22,
    minQty: 150,
    photo: photos.penTeal,
    gallery: penGallery,
    colours: ["#05A638", "#1F264C", "#F4F6FA"],
  },
  {
    id: "athos-colour-touch",
    name: "Athos Colour Touch",
    kind: "Kemijska olovka",
    sku: "301405",
    price: 0.24,
    oldPrice: 0.28,
    minQty: 100,
    photo: photos.colourPencils,
    gallery: [photos.colourPencils, photos.penTeal, photos.penNotebook, photos.notebookDark],
    colours: ["#3367EB", "#1F264C", "#EB881D", "#05A638"],
  },
  {
    id: "keycord",
    name: "Vezica KeyCord",
    kind: "Vezica",
    sku: "402110",
    price: 0.18,
    oldPrice: 0.2,
    minQty: 50,
    photo: photos.penNotebook,
    gallery: [photos.penNotebook, photos.notebookDark, photos.penTeal, photos.notebookWhite],
    colours: ["#1F264C", "#111111", "#ED2C2C"],
  },
  {
    id: "sirius",
    name: "Boca Sirius 650 ml",
    kind: "Boca za vodu",
    sku: "503650",
    price: 1.42,
    minQty: 50,
    photo: photos.bottleGreen,
    gallery: [photos.bottleGreen, photos.bottleGreen, photos.bottleGreen, photos.bottleGreen],
    colours: ["#4F7A5E", "#111111", "#F4F6FA"],
  },
];

export const listingIds = [
  "athos",
  "athos-silver",
  "ebony-matt",
  "ebony-soft-touch",
  "luca-touch",
  "paris-metal",
  "athos-bamboo",
  "athos-rpet",
  "athos-colour-touch",
];

export const bestsellerIds = ["athos", "ebony-matt", "keycord", "sirius"];

export const relatedIds = ["ebony-matt", "athos-silver", "luca-touch", "athos-rpet"];

export function findProduct(id: string): Product {
  return products.find((product) => product.id === id) ?? products[0];
}

// Quantity breaks scale from the product's best (1.000 kom) price, matching the Athos breaks in Figma.
const PRICE_BREAKS = [
  { qty: 150, factor: 16 / 9 },
  { qty: 250, factor: 12 / 9 },
  { qty: 500, factor: 10 / 9 },
  { qty: 1000, factor: 1 },
];

export function priceBreaks(product: Product): { qty: number; price: number }[] {
  return PRICE_BREAKS.map((tier) => ({
    qty: tier.qty,
    price: Math.round(product.price * tier.factor * 100) / 100,
  }));
}

export function unitPriceFor(product: Product, qty: number): number {
  const tiers = priceBreaks(product);
  const tier = [...tiers].reverse().find((item) => qty >= item.qty) ?? tiers[0];
  return tier.price;
}

export const printMethods = [
  { id: "digital", name: "Digitalni tisak", size: "50 × 7 mm", note: "najbrže" },
  { id: "pad", name: "Tampotisak", size: "60 × 6 mm", note: "1 boja" },
] as const;

export type PrintMethodId = (typeof printMethods)[number]["id"];

export const heroTiles = [
  { name: "Olovke", from: "od 0,09 KM", photo: photos.penTeal },
  { name: "Boce", from: "od 1,42 KM", photo: photos.bottleGreen },
  { name: "Bilježnice", from: "od 1,01 KM", photo: photos.notebookWhite },
  { name: "Torbe", from: "od 0,56 KM", photo: photos.toteBag },
];

export const navCategories = ["Olovke", "Torbe", "Boce", "Odjeća", "Bilježnice", "Tehnologija", "Eko pokloni"];

export const giftCategories = [
  { name: "Olovke", icon: "pens" },
  { name: "Torbe", icon: "bags" },
  { name: "Boce", icon: "bottles" },
  { name: "Šalice", icon: "mugs" },
  { name: "Bilježnice", icon: "notebooks", highlight: true },
  { name: "Odjeća", icon: "clothing" },
  { name: "Ruksaci", icon: "backpacks" },
  { name: "Tehnika", icon: "tech" },
  { name: "Ured", icon: "office" },
  { name: "Rokovnici", icon: "diaries", highlight: true },
  { name: "Hrana", icon: "food" },
  { name: "Pokloni", icon: "gifts" },
  { name: "Igre", icon: "games" },
  { name: "Početna", icon: "home" },
  { name: "Vani", icon: "outdoor", highlight: true },
  { name: "Njega", icon: "care" },
  { name: "Alati", icon: "tools" },
  { name: "Eko", icon: "eco" },
];

export const usps = [
  { title: "650 tis. zadovoljnih kupaca", note: "Jesi li sljedeći?" },
  { title: "Besplatan print", note: "Znaš što dobivaš" },
  { title: "80 godina iskustva", note: "Znamo što pali" },
];

export const reviews = [
  {
    brand: "NORD",
    logo: "/v2/icons/reviews/nord.svg",
    quote: "Vrlo brza usluga. Proizvodi su stigli točno kako su naručeni, a dostava među uredima bila je glatka.",
    by: "Tim za račune",
  },
  {
    brand: "KITE",
    logo: "/v2/icons/reviews/kite.svg",
    quote: "Cijene su jasne od početka. Tim je uhvatio logo okrenut naopako prije nego što je otišao u tisak.",
    by: "Sinead Garry",
  },
  {
    brand: "VELD",
    logo: "/v2/icons/reviews/veld.svg",
    quote: "Naručili smo dva modela boca. Prvo je stigao otisak, zatim cijela serija, i oboje se poklopilo.",
    by: "Claire",
  },
];

export const filterGroups = [
  {
    name: "Cijena",
    options: ["Ispod 0,25 KM", "0,25 KM – 0,50 KM", "0,50 KM – 1,00 KM", "1,00 KM i više"],
    checked: ["Ispod 0,25 KM"],
  },
  { name: "Materijal", options: ["Plastika", "Metal", "Reciklirano", "Bambus"], checked: ["Plastika"] },
  { name: "Tisak", options: ["Tampotisak", "Digitalni tisak"], checked: ["Digitalni tisak"] },
  { name: "Prikladno za", options: ["Eko pokloni", "Događaji"], checked: ["Događaji"] },
];

export const filterColours = ["#1F264C", "#111111", "#F7F8FB", "#3367EB", "#05A638", "#EB881D", "#ED2C2C"];

export const PHONE_DISPLAY = "0800 43 46 98 9";
export const PHONE_HREF = "tel:08004346989";

export const DELIVERY_FEE = 12.5;
export const VAT_RATE = 0.2;
export const QTY_STEP = 50;
