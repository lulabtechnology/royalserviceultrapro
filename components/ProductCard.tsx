import Link from "next/link";
import type { Product } from "@/lib/catalog/types";
import { SITE } from "@/lib/site";

export function ProductCard({
  lang,
  product
}: {
  lang: "es" | "en";
  product: Product;
}) {
  const name = lang === "es" ? product.nameEs : product.nameEn;
  const desc = lang === "es" ? product.shortDescEs : product.shortDescEn;

  const mainImage = product.imageUrls?.[0];

  return (
    <Link
      href={`/${lang}/catalog/${product.id}`}
      className="group block rounded-2xl border border-zinc-200 p-4 hover:border-zinc-300"
    >
      <div className="relative">
        <div className="h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
          {/* sin next/image por ahora para evitar error si URL vacía */}
          {mainImage ? (
            <img
              src={mainImage}
              alt={name}
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
              /public/images/placeholder-product.jpg
            </div>
          )}
        </div>

        {product.promoTag ? (
          <div
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: SITE.colors.primary }}
          >
            {product.promoTag}
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <div className="text-sm font-semibold">{name || "—"}</div>
        <div className="mt-1 text-xs text-zinc-600">
          {product.code ? `Ref: ${product.code}` : ""}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-700">
          {desc || ""}
        </p>
      </div>
    </Link>
  );
}
