import { SITE } from "@/lib/site";
import { normalizeLang } from "@/lib/i18n";

function waLink(phone: string, text?: string) {
  // deja solo números (por si viene con + o espacios)
  const digits = phone.replace(/[^\d]/g, "");
  const base = `https://wa.me/${digits}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function SiteFooter({ lang }: { lang: any }) {
  // lang lo dejamos por consistencia (aunque aquí no lo uses mucho)
  normalizeLang(lang);

  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-zinc-600">
        <div>© {new Date().getFullYear()} {SITE.brandName}</div>

        <div className="flex gap-4">
          <a
            className="hover:underline"
            href={waLink(SITE.whatsapp, "Hola! Quiero información del catálogo.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a className="hover:underline" href={`mailto:${SITE.email}`}>
            Email
          </a>

          <a
            className="hover:underline"
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
