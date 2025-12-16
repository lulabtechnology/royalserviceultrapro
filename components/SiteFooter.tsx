import { SITE } from "@/lib/site";
import { normalizeLang } from "@/lib/i18n";

export function SiteFooter({ lang }: { lang: any }) {
  const l = normalizeLang(lang);

  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-zinc-600">
        <div>© {new Date().getFullYear()} {SITE.brandName}</div>

        <div className="flex gap-4">
          <a className="hover:underline" href={SITE.social.whatsappLink} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="hover:underline" href={`mailto:${SITE.contactEmail}`}>
            Email
          </a>
          <a className="hover:underline" href={SITE.social.instagramLink} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
