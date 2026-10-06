# LASER veleprodaja — prototip izgleda

Pregled novog B2B shopa za [LASER d.o.o.](https://laser-bih.com/), Ljubuški. Kategorije prate veleprodajni katalog. Površina je crno-bijela: Dosis za naslove, Arial za sučelje, ravne kartice i fotografija artikla na sivoj pločici. Sadržaj i fotografije su s postojećeg weba.

Ljestvice cijena su **primjer rasporeda**, ne službeni cjenik. Na laser-bih.com cijene traže prijavu.

## Pokretanje

```bash
npm install
npm run dev
```

Aplikacija sluša na [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Što je unutra

- Naslovnica, kategorije, stranica artikla, pretraga, upit za ponudu
- Usluge tiska i stranica O nama
- Brand guide na `/brand`

Upit za ponudu ostaje u pregledniku i ne šalje e-mail.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui. Podaci su u `src/lib/catalog.ts` dok se ne veže prava baza i cjenik.
