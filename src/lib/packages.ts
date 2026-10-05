import { formatKm, getProduct, unitForQty } from "@/lib/catalog";

export type PromoPackage = {
  slug: string;
  name: string;
  season: string;
  blurb: string;
  qty: number;
  items: string[];
};

export const packages: PromoPackage[] = [
  {
    slug: "bozicni-ured",
    name: "Božićni ured",
    season: "Božić 2026",
    blurb: "Olovka, sublimacijska šalica i kožna kutija. Set za stol klijenta ili partnera.",
    qty: 25,
    items: ["k002-kemijska-metalna", "sm-50-salica", "p021-kutija"],
  },
  {
    slug: "poklon-partneru",
    name: "Poklon partneru",
    season: "Božić 2026",
    blurb: "Čelična boca, metalni roler i kutija. Za kraj godine i zahvalu na suradnji.",
    qty: 20,
    items: ["sm-405-boca", "r002-roler-silver", "p021-kutija"],
  },
  {
    slug: "sajamski-set",
    name: "Sajamski set",
    season: "Božić 2026",
    blurb: "Shopping torba, gel olovka i Laserlight. Za štand, konferenciju i podjelu.",
    qty: 50,
    items: ["ki0294-shopping-torba", "wp-900-gelux", "l8000-laserlight"],
  },
  {
    slug: "zimski-teren",
    name: "Zimski teren",
    season: "Zima 2026",
    blurb: "Golf kišobran i rashladni ruksak. Za ekipe koje rade vani do kraja godine.",
    qty: 20,
    items: ["tm-06-kisobran-golf", "rt05-rashladni-ruksak"],
  },
  {
    slug: "tim-u-firmi",
    name: "Tim u firmi",
    season: "Božić 2026",
    blurb: "Polo majica i boca 500 ml. Interni poklon, isti otisak na oba artikla.",
    qty: 20,
    items: ["st9160-polo", "sm-405-boca"],
  },
  {
    slug: "laserlight-blagdanski",
    name: "Laserlight blagdanski",
    season: "Božić 2026",
    blurb: "Upaljač, metalna olovka i privjesak otvarač. Mali set koji staje u omot.",
    qty: 50,
    items: ["l8000-laserlight", "k002-kemijska-metalna", "kc-02-privjesak"],
  },
];

export function getPackage(slug: string) {
  return packages.find((item) => item.slug === slug);
}

export function packageProducts(item: PromoPackage) {
  return item.items.map((slug) => getProduct(slug)).filter((product) => product != null);
}

export function packageUnit(item: PromoPackage) {
  return packageProducts(item).reduce((sum, product) => sum + unitForQty(product, item.qty), 0);
}

export function packageTotalLabel(item: PromoPackage) {
  return formatKm(packageUnit(item));
}
