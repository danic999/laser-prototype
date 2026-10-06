import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatKm, unitForQty } from "@/lib/catalog";
import { getPackage, packageProducts, packageTotalLabel } from "@/lib/packages";
import { btnPill, pageTitle } from "@/lib/ui";

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
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href="/#paketi" className="hover:underline">
          Božićni paketi
        </Link>
        {" / "}
        {item.name}
      </p>
      <p className="mt-4 text-[12px] text-[#787574]">{item.season}</p>
      <h1 className={`${pageTitle} mt-2`}>{item.name}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
      <p className="mt-4 text-lg">
        <span className="text-[20px] font-medium tracking-[-0.05em]">{packageTotalLabel(item)}</span>
        <span className="text-muted-foreground"> / set pri {item.qty} setova, bez PDV-a</span>
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {included.map((product) => (
          <li key={product.slug} className="rounded-[28px] bg-white p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <Link href={`/proizvod/${product.slug}`}>
              <div className="relative aspect-square overflow-hidden rounded-[20px] bg-canvas">
                <Image src={product.colors[0].image} alt={product.name} fill className="object-contain" />
              </div>
              <h2 className="mt-3 px-2 text-[16px] font-medium tracking-[-0.031em]">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
              <p className="mt-1 text-sm font-bold">{formatKm(unitForQty(product, item.qty))} / kom</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={quote} className={btnPill}>
          Zatraži ponudu za paket
        </Link>
        <Link href="/#paketi" className={btnPill}>
          Svi paketi
        </Link>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Iznos je zbroj primjera cijena artikala u paketu. Službenu ponudu potvrđuje veleprodaja.
      </p>
    </main>
  );
}
