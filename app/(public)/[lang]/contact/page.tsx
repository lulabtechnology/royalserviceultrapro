import { SITE } from "@/lib/site";
import { Lang } from "@/lib/i18n";

export default function ContactPage({ params }: { params: { lang: Lang } }) {
  const isEs = params.lang === "es";
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{isEs ? "Contacto" : "Contact"}</h1>

      <div className="rounded-2xl border border-zinc-200 p-6 text-sm">
        <div className="space-y-2">
          <div>
            <span className="font-semibold">WhatsApp:</span>{" "}
            <a className="underline" href={`https://wa.me/${SITE.whatsapp.replace("+", "")}`} target="_blank" rel="noreferrer">
              {SITE.whatsappDisplay}
            </a>
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div>
            <span className="font-semibold">Instagram:</span>{" "}
            <a className="underline" href={SITE.instagramUrl} target="_blank" rel="noreferrer">
              @{SITE.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
