export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getVisibleCategories, getPublishedProducts, getActivePromotions } from "@/lib/catalog/public";

export default async function DebugPage({ params }: { params: { lang: "es" | "en" } }) {
  const lang = params.lang;

  const [cats, prods, promos] = await Promise.all([
    getVisibleCategories(),
    getPublishedProducts(),
    getActivePromotions()
  ]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Debug</h1>
      <div className="rounded-2xl border border-zinc-200 p-4 text-sm">
        <div><b>categories visibles:</b> {cats.length}</div>
        <div><b>products published:</b> {prods.length}</div>
        <div><b>promotions activas:</b> {promos.length}</div>
        <div className="mt-3 text-zinc-600">
          {lang === "es"
            ? "Si esto da 0, revisa que tus docs tengan isVisible/status/isActive correctos."
            : "If this is 0, check isVisible/status/isActive fields on docs."}
        </div>
      </div>
    </section>
  );
}
