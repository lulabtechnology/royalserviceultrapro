import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LANGS } from "@/lib/i18n";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorar rutas internas/archivos
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Si ya tiene /es o /en, seguir normal
  const hasLang = LANGS.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLang) return NextResponse.next();

  // Redirect default a /es
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api).*)"]
};
