import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatKm, unitForQty } from "@/lib/catalog";
import { getPackage, packageProducts, packageTotalLabel } from "@/lib/packages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackage(slug);
  return { title: item?.name ?? "Paket" };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPackage(slug);
  if (!item) notFound();
  const included = packageProducts(item);
  const quote = `/ponuda?artikal=${encodeURIComponent(item.name)}&kolicina=${item.qty}&napomena=${encodeURIComponent("Božićni paket")}`;

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href="/#paketi" className="hover:underline">
          Božićni paketi
        </Link>
        {" / "}
        {item.name}
      </p>
      <p className="mt-4 text-xs font-bold tracking-wide text-orange uppercase">{item.season}</p>
      <h1 className="mt-1 text-4xl font-extrabold">{item.name}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
      <p className="mt-4 text-lg">
        <span className="text-3xl font-extrabold">{packageTotalLabel(item)}</span>
        <span className="text-muted-foreground"> / set pri {item.qty} setova, bez PDV-a</span>
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {included.map((product) => (
          <li key={product.slug} className="rounded-lg border border-[#e3e5eb] p-4">
            <Link href={`/proizvod/${product.slug}`}>
              <div className="relative aspect-square">
                <Image src={product.colors[0].image} alt={product.name} fill className="object-contain" />
              </div>
              <h2 className="mt-2 font-extrabold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
              <p className="mt-1 text-sm font-bold">{formatKm(unitForQty(product, item.qty))} / kom</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={quote} className="inline-flex h-11 items-center rounded-full bg-orange px-6 text-sm font-extrabold text-white">
          Zatraži ponudu za paket
        </Link>
        <Link href="/#paketi" className="inline-flex h-11 items-center rounded-full border-2 border-orange px-6 text-sm font-extrabold">
          Svi paketi
        </Link>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Iznos je zbroj primjera cijena artikala u paketu. Službenu ponudu potvrđuje veleprodaja.
      </p>
    </main>
  );
}
