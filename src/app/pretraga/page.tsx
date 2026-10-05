import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog-view";
import { products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Pretraga" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategorija?: string; tisak?: string }>;
}) {
  const { q = "", kategorija = "", tisak = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const haystack = `${product.name} ${product.sku} ${product.description}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = !kategorija || product.category === kategorija;
    const matchesPrint = !tisak || product.prints.includes(tisak);
    return matchesQuery && matchesCategory && matchesPrint;
  });

  const title = query ? `Rezultati za „${q.trim()}”` : "Cijeli pregled";

  return (
    <main>
      <CatalogView products={filtered} title={title} query={q.trim()} intro="Filter po tisku i cijeni suži ovaj popis." />
    </main>
  );
}
