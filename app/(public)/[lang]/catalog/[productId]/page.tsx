export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/catalog/public";
import { ProductGallery } from "@/components/ProductGallery";
import { SpecTable } from "@/components/SpecTable";
import { SITE } from "@/lib/site";

export default async function ProductDetailPage({
  params
}: {
  params: { lang: "es" | "en"; productId: string };
}) {
  const lang = params.lang;
  const product = await getProductById(params.productId);

  if (!product) return notFound();

  const name = lang === "es" ? product.nameEs : product.nameEn;
  const desc = lang === "es" ? product.shortDescEs : product.shortDescEn;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/${lang}/catalog`} className="text-sm text-zinc-600 hover:underline">
          ← {lang === "es" ? "Volver al catálogo" : "Back to catalog"}
        </Link>

        {product.promoTag ? (
          <div
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: SITE.colors.primary }}
          >
            {product.promoTag}
          </div>
        ) : null}
      </div>

      <h1 className="text-2xl font-semibold">{name}</h1>
      <div className="text-sm text-zinc-600">{product.code ? `Ref: ${product.code}` : ""}</div>
      <p className="text-zinc-800">{desc}</p>

      <ProductGallery urls={product.imageUrls} />

      {product.techPdfUrl ? (
        <a
          href={product.techPdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
        >
          {lang === "es" ? "Descargar ficha técnica (PDF)" : "Download datasheet (PDF)"}
        </a>
      ) : null}

      {product.specs?.length ? (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {lang === "es" ? "Ficha técnica" : "Specs"}
          </h2>
          <SpecTable specs={product.specs} />
        </div>
      ) : null}
    </section>
  );
}
