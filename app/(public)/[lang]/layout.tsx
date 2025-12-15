import { redirect } from "next/navigation";
import { isLang, type Lang } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function PublicLangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) redirect("/es");
  const lang = params.lang as Lang;

  return (
    <div className="min-h-screen">
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
