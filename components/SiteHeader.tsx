import Link from "next/link";
import { SITE } from "@/lib/site";
import { normalizeLang, t } from "@/lib/i18n";

export function SiteHeader({ lang }: { lang: any }) {
  const l = normalizeLang(lang);

  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${l}`} className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl"
            style={{ backgroundColor: SITE.colors.primary }}
          />
          <div className="leading-tight">
            <div className="font-semibold">{t(l, "heroTitle")}</div>
            <div className="text-xs text-zinc-600">Catálogo + carrito</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href={`/${l}`}>
            {t(l, "navHome")}
          </Link>
          <Link className="hover:underline" href={`/${l}/catalog`}>
            {t(l, "navCatalog")}
          </Link>
          <Link className="hover:underline" href={`/${l}/contact`}>
            {t(l, "navContact")}
          </Link>
          <Link className="hover:underline" href={`/${l}/policies`}>
            {t(l, "navPolicies")}
          </Link>

          <div className="ml-2 flex items-center gap-2 rounded-xl border border-zinc-200 px-2 py-1">
            <Link className={l === "es" ? "font-semibold" : "text-zinc-500"} href="/es">
              ES
            </Link>
            <span className="text-zinc-300">|</span>
            <Link className={l === "en" ? "font-semibold" : "text-zinc-500"} href="/en">
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
