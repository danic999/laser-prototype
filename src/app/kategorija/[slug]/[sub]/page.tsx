import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/catalog-view";
import { getSubcategory, productsIn } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const match = getSubcategory(slug, sub);
  return { title: match ? `${match.sub.name}` : "Podkategorija" };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const match = getSubcategory(slug, sub);
  if (!match) notFound();

  return (
    <main>
      <CatalogView
        title={match.sub.name}
        intro={`${match.category.name} · ${match.sub.name}`}
        products={productsIn(match.category.slug, match.sub.slug)}
        category={match.category}
        activeSub={match.sub.slug}
      />
    </main>
  );
}
