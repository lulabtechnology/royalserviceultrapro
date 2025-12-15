import { Lang } from "@/lib/i18n";

export default function CatalogPage({ params }: { params: { lang: Lang } }) {
  const isEs = params.lang === "es";
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold">{isEs ? "Catálogo" : "Catalog"}</h1>
      <p className="text-sm text-zinc-600">
        {isEs
          ? "En FASE 2 aquí listamos productos desde Firestore (solo published + categoría visible)."
          : "In PHASE 2 we list products from Firestore (only published + visible category)."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 p-4">
            <div className="h-32 rounded-xl bg-zinc-100" />
            <div className="mt-3 h-4 w-2/3 rounded bg-zinc-100" />
            <div className="mt-2 h-3 w-1/2 rounded bg-zinc-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
