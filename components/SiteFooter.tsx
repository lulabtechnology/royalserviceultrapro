import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-600">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {SITE.brandName}</div>
          <div className="flex gap-4">
            <a className="hover:underline" href={`https://wa.me/${SITE.whatsapp.replace("+", "")}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="hover:underline" href={`mailto:${SITE.email}`}>
              Email
            </a>
            <a className="hover:underline" href={SITE.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
