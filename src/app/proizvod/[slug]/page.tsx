import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductStudio } from "@/components/product-studio";
import { formatQty, getCategory, getProduct, relatedProducts } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.sku} ${product.name}` : "Artikal" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = relatedProducts(product);

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Naslovnica
        </Link>
        {" / "}
        <Link href={`/kategorija/${product.category}`} className="hover:underline">
          {category?.name}
        </Link>
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Šifra {product.sku}
            {product.inStock ? " · Na zalihi" : " · Na upit"}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ProductStudio product={product} />
      </div>
      <div className="mt-12 grid gap-10 border-t border-border pt-8 lg:grid-cols-2">
        <section>
          <h2 className="font-heading text-xl font-medium">Opis</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-medium">Podaci</h2>
          <dl className="mt-3 divide-y divide-border text-sm">
            {product.details.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-2">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="text-right">{row.value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 py-2">
              <dt className="text-muted-foreground">Minimum</dt>
              <dd>{formatQty(product.minQty)} kom</dd>
            </div>
          </dl>
        </section>
      </div>
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-heading text-xl font-medium">Iz iste kategorije</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
