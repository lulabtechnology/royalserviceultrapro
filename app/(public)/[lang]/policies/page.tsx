import { Lang } from "@/lib/i18n";

export default function PoliciesPage({ params }: { params: { lang: Lang } }) {
  const isEs = params.lang === "es";
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold">{isEs ? "Políticas" : "Policies"}</h1>
      <p className="text-sm text-zinc-600">
        {isEs
          ? "Aquí colocamos políticas de privacidad, devoluciones (si aplica) y términos. En FASE 7 lo dejamos final."
          : "Here we place privacy policy and terms. In PHASE 7 we finalize it."}
      </p>

      <div className="rounded-2xl border border-zinc-200 p-6 text-sm text-zinc-700">
        {isEs
          ? "Placeholder de políticas…"
          : "Policies placeholder…"}
      </div>
    </section>
  );
}
