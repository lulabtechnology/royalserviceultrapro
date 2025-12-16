export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { SITE } from "@/lib/site";
import { t } from "@/lib/i18n";
import { getActivePromotions } from "@/lib/catalog/public";

export default async function HomePage({ params }: { params: { lang: "es" | "en" } }) {
  const lang = params.lang;
  const promos = await getActivePromotions();

  return (
    <section className="space-y-8">
      <div
        className="rounded-2xl border border-zinc-200 p-8"
        style={{ background: `linear-gradient(135deg, ${SITE.colors.surface} 0%, #ffffff 70%)` }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">{t(lang, "heroTitle")}</h1>
        <p className="mt-3 max-w-2xl text-zinc-700">{t(lang, "heroSubtitle")}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${lang}/catalog`}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: SITE.colors.primary }}
          >
            {t(lang, "ctaCatalog")}
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold">{lang === "es" ? "Promociones" : "Promotions"}</div>

        {!promos.length ? (
          <div className="rounded-2xl border border-zinc-200 p-4 text-sm text-zinc-700">
            {lang === "es"
              ? "No hay promociones activas aún."
              : "No active promotions yet."}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promos.map((p) => (
              <a
                key={p.id}
                href={p.link || `/${lang}/catalog`}
                className="rounded-2xl border border-zinc-200 p-4 hover:border-zinc-300"
              >
                <div className="h-32 rounded-xl bg-zinc-100">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt="" className="h-full w-full rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                      /public/images/promo-placeholder.jpg
                    </div>
                  )}
                </div>
                <div className="mt-3 text-sm font-semibold">
                  {lang === "es" ? p.titleEs : p.titleEn}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
