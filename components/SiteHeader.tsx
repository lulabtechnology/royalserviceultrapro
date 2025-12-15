import Link from "next/link";
import { SITE } from "@/lib/site";
import { Lang, t } from "@/lib/i18n";

export function SiteHeader({ lang }: { lang: Lang }) {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-md"
            style={{ backgroundColor: SITE.colors.primary }}
            aria-hidden="true"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{SITE.brandName}</div>
            <div className="text-xs text-zinc-500">Catálogo + carrito</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href={`/${lang}`}>
            {t(lang, "navHome")}
          </Link>
          <Link className="hover:underline" href={`/${lang}/catalog`}>
            {t(lang, "navCatalog")}
          </Link>
          <Link className="hover:underline" href={`/${lang}/contact`}>
            {t(lang, "navContact")}
          </Link>
          <Link className="hover:underline" href={`/${lang}/policies`}>
            {t(lang, "navPolicies")}
          </Link>

          <div className="ml-2 flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-1 text-xs">
            <Link href="/es" className={lang === "es" ? "font-semibold" : "text-zinc-500"}>
              ES
            </Link>
            <span className="text-zinc-300">|</span>
            <Link href="/en" className={lang === "en" ? "font-semibold" : "text-zinc-500"}>
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
