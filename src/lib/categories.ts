export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  subs: Subcategory[];
};

function subs(pairs: [string, string][]): Subcategory[] {
  return pairs.map(([slug, name]) => ({ slug, name }));
}

export const categories: Category[] = [
  {
    slug: "torbe-i-putovanja",
    name: "Torbe i putovanja",
    blurb: "Ruksaci, shopping torbe, vrećice, rashladne torbe i putna galanterija.",
    subs: subs([
      ["ruksaci", "Ruksaci"],
      ["plazne-torbe", "Plažne torbe"],
      ["canvas-torbe", "Canvas torbe"],
      ["rashladne-torbe", "Rashladne torbe"],
      ["pamucne-torbe", "Pamučne torbe"],
      ["torbe-za-dokumente", "Torbe za dokumente"],
      ["sklopive-torbe", "Sklopive torbe"],
      ["vrecice-voce", "Vrećice za voće i povrće"],
      ["torbice-struk", "Torbice oko struka"],
      ["jutene-torbe", "Jutene torbe"],
      ["torbe-za-laptop", "Torbe za laptop"],
      ["papirnate-vrecice", "Papirnate vrećice"],
      ["shopping-torbe", "Shopping torbe"],
      ["torbe-na-rame", "Torbe na rame"],
      ["putni-proizvodi", "Putni proizvodi"],
      ["sportske-torbe", "Sportske torbe"],
      ["kolica", "Kolica"],
    ]),
  },
  {
    slug: "ured-i-poslovanje",
    name: "Ured i poslovanje",
    blurb: "Bilježnice, mape, uredski proizvodi i prezentacijski materijal.",
    subs: subs([
      ["kalkulatori", "Kalkulatori"],
      ["drzaci-kartica", "Držači kartica"],
      ["futrole", "Futrole"],
      ["podloge-za-mis", "Podloge za miš"],
      ["blokovi", "Blokovi"],
      ["biljeznice", "Bilježnice"],
      ["uredski-proizvodi", "Uredski proizvodi"],
      ["post-it", "Post-it"],
      ["ravnala", "Ravnala"],
      ["mape", "Mape za dokumente"],
    ]),
  },
  {
    slug: "odjeca-i-dodaci",
    name: "Odjeća i dodaci",
    blurb: "Polo majice, majice, jakne, kape i ostali tekstil za tisak.",
    subs: subs([
      ["prsluci", "Prsluci"],
      ["kape", "Kape"],
      ["flis", "Flis"],
      ["jakne", "Jakne"],
      ["dukserice", "Dukserice"],
      ["djecja-odjeca", "Dječja odjeća"],
      ["polo-majice", "Polo majice"],
      ["salovi", "Šalovi"],
      ["kosulje", "Košulje"],
      ["carape", "Čarape"],
      ["sportska-odjeca", "Sportska odjeća"],
      ["suncane-naocale", "Sunčane naočale"],
      ["majice", "Majice"],
      ["hlace", "Hlače"],
      ["novcanici", "Novčanici"],
      ["satovi", "Satovi"],
      ["radna-odjeca", "Radna odjeća"],
    ]),
  },
  {
    slug: "rokovnici-i-kalendari",
    name: "Rokovnici i kalendari",
    blurb: "Rokovnici, džepni rokovnici i kalendari.",
    subs: subs([
      ["kalendari", "Kalendari"],
      ["rokovnici", "Rokovnici"],
      ["dzepni-rokovnici", "Džepni rokovnici"],
    ]),
  },
  {
    slug: "posude-za-pice",
    name: "Posuđe za piće",
    blurb: "Boce, termosice, šalice i čaše.",
    subs: subs([
      ["case", "Čaše"],
      ["salice-tanjurici", "Šalice i tanjurići"],
      ["salice", "Šalice"],
      ["sportske-boce", "Sportske boce"],
      ["termosice", "Termosice"],
      ["boce-za-vodu", "Boce za vodu"],
    ]),
  },
  {
    slug: "hrana-i-pice",
    name: "Hrana i piće",
    blurb: "Bomboni, kolačići i ugostiteljski artikli.",
    subs: subs([
      ["voda", "Voda u boci"],
      ["bomboni", "Bomboni"],
      ["kolacici", "Kolačići"],
      ["ugostiteljstvo", "Ugostiteljski artikli"],
    ]),
  },
  {
    slug: "pokloni",
    name: "Pokloni",
    blurb: "Poslovni, zahvalni i sezonski pokloni, uključujući božićne setove.",
    subs: subs([
      ["bozicni-pokloni", "Božićni poslovni pokloni"],
      ["brza-isporuka", "Brza isporuka"],
      ["poklon-setovi", "Poklon setovi"],
      ["sezonski-pokloni", "Sezonski pokloni"],
      ["zahvalnice", "Zahvalnice"],
    ]),
  },
  {
    slug: "pokloni-i-igre",
    name: "Sitni pokloni i igre",
    blurb: "Privjesci, upaljači, vezice, bedževi i ostali giveaway.",
    subs: subs([
      ["baloni", "Baloni"],
      ["bedzevi", "Bedževi"],
      ["igre", "Igre"],
      ["sitni-pokloni", "Sitni pokloni"],
      ["privjesci", "Privjesci"],
      ["vezice", "Vezice"],
      ["upaljaci", "Upaljači"],
      ["sibice", "Šibice"],
      ["karte", "Karte za igru"],
      ["naljepnice", "Naljepnice"],
      ["antistres", "Antistres loptice"],
      ["plisanci", "Plišanci"],
      ["igracke", "Igračke"],
      ["zetoni", "Žeton za kolica"],
    ]),
  },
  {
    slug: "dom-i-stanovanje",
    name: "Dom i stanovanje",
    blurb: "Kuhinja, pregače, deke, podmetači i kućni tekstil.",
    subs: subs([
      ["pregace", "Pregače"],
      ["deke", "Deke"],
      ["svijece", "Svijeće"],
      ["satovi-zidni", "Satovi"],
      ["podmetaci", "Podmetači"],
      ["kuhinja", "Kuhinja"],
      ["magneti", "Magneti"],
      ["tanjiri", "Tanjiri"],
      ["rucnici", "Ručnici i tekstil"],
      ["vinski-pribor", "Vinski pribor"],
    ]),
  },
  {
    slug: "slobodno-vrijeme",
    name: "Slobodno vrijeme i vani",
    blurb: "Kišobrani, golf, sport i vanjski promo artikli.",
    subs: subs([
      ["rostilj", "Roštilj"],
      ["plaza", "Plaža"],
      ["lopte-plaza", "Plažne lopte"],
      ["dvogledi", "Dvogledi"],
      ["auto", "Auto oprema"],
      ["frizbi", "Frizbiji"],
      ["vrt", "Vrt"],
      ["golf", "Golf"],
      ["ljubimci", "Ljubimci"],
      ["sport", "Sport"],
      ["kisobrani", "Kišobrani"],
    ]),
  },
  {
    slug: "osobna-njega",
    name: "Osobna njega",
    blurb: "Njega ruku, maramice, toaletne torbe i prva pomoć.",
    subs: subs([
      ["dezinfekcija", "Dezinfekcija"],
      ["maske", "Maske"],
      ["prva-pomoc", "Prva pomoć"],
      ["njega-ruku", "Njega ruku"],
      ["balzam", "Balzam za usne"],
      ["maramice", "Džepne maramice"],
      ["zastita-od-sunca", "Zaštita od sunca"],
      ["toalet", "Toaletni proizvodi"],
      ["toaletne-torbe", "Toaletne torbe"],
      ["wellbeing", "Wellbeing"],
    ]),
  },
  {
    slug: "tehnologija",
    name: "Tehnologija",
    blurb: "USB, power bank, punjači, gadgeti i dodatci za telefon.",
    subs: subs([
      ["punjaci", "Punjači"],
      ["racunalo", "Dodaci za računalo"],
      ["gadgeti", "Gadgeti"],
      ["slusalice", "Slušalice"],
      ["telefon", "Dodaci za telefon"],
      ["power-bank", "Power bank"],
      ["zvucnici", "Zvučnici"],
      ["usb", "USB"],
    ]),
  },
  {
    slug: "alati-i-lampe",
    name: "Alati i lampe",
    blurb: "Alati, noževi, strugači za led i lampe.",
    subs: subs([
      ["strugaci", "Strugači za led"],
      ["nozevi", "Noževi"],
      ["zastita", "Zaštitni proizvodi"],
      ["metri", "Metri"],
      ["alati", "Alati"],
      ["lampe", "Lampe"],
    ]),
  },
  {
    slug: "pisaci-pribor",
    name: "Pisaći pribor",
    blurb: "Kemijske, roleri, markeri i pisaći setovi.",
    subs: subs([
      ["kemijske-olovke", "Kemijske olovke"],
      ["markeri", "Markeri"],
      ["olovke", "Olovke"],
      ["pisaci-setovi", "Pisaći setovi"],
    ]),
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getSubcategory(categorySlug: string, subSlug: string) {
  const category = getCategory(categorySlug);
  const sub = category?.subs.find((item) => item.slug === subSlug);
  if (!category || !sub) return undefined;
  return { category, sub };
}
