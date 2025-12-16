export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getVisibleCategories, getPublishedProducts } from "@/lib/catalog/public";
import { ProductCard } from "@/components/ProductCard";

export default async function CatalogPage({ params }: { params: { lang: "es" | "en" } }) {
  const lang = params.lang;

  const categories = await getVisibleCategories();
  const products = await getPublishedProducts();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{lang === "es" ? "Catálogo" : "Catalog"}</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {lang === "es"
            ? "Mostrando productos publicados (published) en categorías visibles."
            : "Showing published products in visible categories."}
        </p>
      </div>

      {/* Debug / Fallback: si todo queda vacío, el usuario puede ir a /[lang]/debug */}
      {(!categories.length || !products.length) ? (
        <div className="rounded-2xl border border-zinc-200 p-4 text-sm text-zinc-700">
          {lang === "es"
            ? "Aún no hay data publicada. Ve a /es/debug para diagnóstico."
            : "No published data yet. Go to /en/debug for diagnostics."}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} lang={lang} product={p} />
        ))}
      </div>
    </section>
  );
}
