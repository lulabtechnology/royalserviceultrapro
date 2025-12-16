import { redirect } from "next/navigation";
import { isLang, normalizeLang, type Lang } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) redirect("/es");

  const lang: Lang = normalizeLang(params.lang);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} />
    </div>
  );
}
