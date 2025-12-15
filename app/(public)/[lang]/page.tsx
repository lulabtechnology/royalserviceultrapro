import Link from "next/link";
import { Lang, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function HomePage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;

  return (
    <section className="space-y-8">
      <div
        className="rounded-2xl border border-zinc-200 p-8"
        style={{ background: `linear-gradient(135deg, ${SITE.colors.surface} 0%, #ffffff 70%)` }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          {t(lang, "heroTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-700">
          {t(lang, "heroSubtitle")}
        </p>

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

      <div className="rounded-2xl border border-zinc-200 p-6">
        <div className="text-sm font-semibold">FASE 0</div>
        <p className="mt-2 text-sm text-zinc-700">{t(lang, "comingSoon")}</p>
      </div>
    </section>
  );
}
