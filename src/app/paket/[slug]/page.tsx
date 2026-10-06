import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatKm, unitForQty } from "@/lib/catalog";
import { getPackage, packageProducts, packageTotalLabel } from "@/lib/packages";
import { btnFill, btnOutline, heroTitle } from "@/lib/ui";

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
    <main className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm text-muted-foreground">
        <Link href="/#paketi" className="hover:underline">
          Božićni paketi
        </Link>
        {" / "}
        {item.name}
      </p>
      <p className="mt-6 text-[12px] tracking-[0.08em] text-charcoal uppercase">{item.season}</p>
      <h1 className={`${heroTitle} mt-3 text-bass`}>{item.name}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
      <p className="mt-4 text-lg">
        <span className="font-heading text-[32px] leading-[1.2] font-normal tracking-[0.03em]">{packageTotalLabel(item)}</span>
        <span className="text-muted-foreground"> / set pri {item.qty} setova, bez PDV-a</span>
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {included.map((product) => (
          <li key={product.slug} className="bg-mist p-6">
            <Link href={`/proizvod/${product.slug}`}>
              <div className="relative aspect-square">
                <Image src={product.colors[0].image} alt={product.name} fill className="object-contain" />
              </div>
              <h2 className="mt-3 font-heading text-[24px] leading-[1.2] font-normal">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
              <p className="mt-1 text-sm font-bold">{formatKm(unitForQty(product, item.qty))} / kom</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={quote} className={btnFill}>
          Zatraži ponudu za paket
        </Link>
        <Link href="/#paketi" className={btnOutline}>
          Svi paketi
        </Link>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Iznos je zbroj primjera cijena artikala u paketu. Službenu ponudu potvrđuje veleprodaja.
      </p>
    </main>
  );
}
