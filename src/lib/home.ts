export type PromoAd = {
  href: string;
  image: string;
  alt: string;
  kicker: string;
  title: string;
  line: string;
};

export type SpotTile = {
  href: string;
  name: string;
  image: string;
  alt: string;
};

export type HomeBand = {
  href: string;
  name: string;
  tiles: SpotTile[];
};

export const promoAds: PromoAd[] = [
  {
    href: "/#paketi",
    image: "/promos/promo-bozic.jpg",
    alt: "Crna poklon kutija, šalica i kemijska na lanenom stolu",
    kicker: "Sezona",
    title: "Božićni setovi za partnere",
    line: "Spremni paketi. Tisak ide u kući, rok je prosinac.",
  },
  {
    href: "/kategorija/slobodno-vrijeme/kisobrani",
    image: "/promos/promo-zima.jpg",
    alt: "Crni i teget kišobrani na mokrom kamenu",
    kicker: "Asortiman",
    title: "Kišobran s vašim znakom",
    line: "Gravura i tisak za zimsku sezonu, od 50 komada.",
  },
  {
    href: "/usluge",
    image: "/promos/promo-tisak.jpg",
    alt: "UV tisak na crnom upaljaču",
    kicker: "Usluga",
    title: "Laser, UV i DTF u kući",
    line: "Logo ide na artikal prije nego što krene isporuka.",
  },
  {
    href: "/kategorija/pisaci-pribor/kemijske-olovke",
    image: "/promos/promo-olovke.jpg",
    alt: "Red kemijskih olovki na papiru",
    kicker: "Količina",
    title: "Kemijske od 100 komada",
    line: "Cijena po komadu pada kako raste narudžba.",
  },
  {
    href: "/kategorija/posude-za-pice",
    image: "/promos/promo-boce.jpg",
    alt: "Čelična boca i keramička šalica na hrastovom stolu",
    kicker: "Gravura",
    title: "Boce i šalice s logom",
    line: "Metal i keramika. Znak ostaje i poslije sezone.",
  },
];

export const homeBands: HomeBand[] = [
  {
    href: "/kategorija/torbe-i-putovanja",
    name: "Torbe i putovanja",
    tiles: [
      {
        href: "/kategorija/torbe-i-putovanja/ruksaci",
        name: "Ruksaci",
        image: "/spots/spot-ruksaci.jpg",
        alt: "Sivi ruksak na betonu",
      },
      {
        href: "/kategorija/torbe-i-putovanja/shopping-torbe",
        name: "Shopping torbe",
        image: "/spots/spot-shopping.jpg",
        alt: "Platnena shopping torba",
      },
      {
        href: "/kategorija/torbe-i-putovanja/rashladne-torbe",
        name: "Rashladne torbe",
        image: "/spots/spot-rashladne.jpg",
        alt: "Zelena rashladna torba s bocom",
      },
      {
        href: "/kategorija/torbe-i-putovanja/torbe-za-laptop",
        name: "Torbe za laptop",
        image: "/spots/spot-laptop-torba.jpg",
        alt: "Crna futrola za laptop",
      },
    ],
  },
  {
    href: "/kategorija/posude-za-pice",
    name: "Posuđe za piće",
    tiles: [
      {
        href: "/kategorija/posude-za-pice/boce-za-vodu",
        name: "Boce za vodu",
        image: "/spots/spot-boce.jpg",
        alt: "Mat zelena boca za vodu",
      },
      {
        href: "/kategorija/posude-za-pice/salice",
        name: "Šalice",
        image: "/spots/spot-salice.jpg",
        alt: "Keramička šalica s kavom",
      },
      {
        href: "/kategorija/posude-za-pice/termosice",
        name: "Termosice",
        image: "/spots/spot-termos.jpg",
        alt: "Čelična termosica",
      },
      {
        href: "/kategorija/posude-za-pice/sportske-boce",
        name: "Sportske boce",
        image: "/spots/spot-sport.jpg",
        alt: "Prozirna sportska boca",
      },
    ],
  },
  {
    href: "/kategorija/pisaci-pribor",
    name: "Pisaći pribor",
    tiles: [
      {
        href: "/kategorija/pisaci-pribor/kemijske-olovke",
        name: "Kemijske olovke",
        image: "/spots/spot-kemijske.jpg",
        alt: "Kemijske olovke u čaši",
      },
      {
        href: "/kategorija/pisaci-pribor/pisaci-setovi",
        name: "Pisaći setovi",
        image: "/spots/spot-setovi.jpg",
        alt: "Poklon set olovki u kutiji",
      },
      {
        href: "/kategorija/pisaci-pribor/markeri",
        name: "Markeri",
        image: "/spots/spot-markeri.jpg",
        alt: "Četiri markera na bijeloj podlozi",
      },
      {
        href: "/kategorija/pisaci-pribor/olovke",
        name: "Olovke",
        image: "/spots/spot-olovke.jpg",
        alt: "Drvene olovke na hrastu",
      },
    ],
  },
  {
    href: "/kategorija/odjeca-i-dodaci",
    name: "Odjeća i dodaci",
    tiles: [
      {
        href: "/kategorija/odjeca-i-dodaci/polo-majice",
        name: "Polo majice",
        image: "/spots/spot-polo.jpg",
        alt: "Presavijena teget polo majica",
      },
      {
        href: "/kategorija/odjeca-i-dodaci/majice",
        name: "Majice",
        image: "/spots/spot-majice.jpg",
        alt: "Presavijena siva majica",
      },
      {
        href: "/kategorija/odjeca-i-dodaci/kape",
        name: "Kape",
        image: "/spots/spot-kape.jpg",
        alt: "Crna pamučna kapa",
      },
      {
        href: "/kategorija/odjeca-i-dodaci/jakne",
        name: "Jakne",
        image: "/spots/spot-jakne.jpg",
        alt: "Presavijena siva jakna",
      },
    ],
  },
];
