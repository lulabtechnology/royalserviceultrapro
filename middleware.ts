import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["es", "en"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ 1) Admin SIEMPRE sin idioma
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  // ✅ 2) API y assets no se tocan
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // ✅ 3) Si ya viene /es o /en, pasa
  const first = pathname.split("/")[1];
  if ((LOCALES as readonly string[]).includes(first)) return NextResponse.next();

  // ✅ 4) Root -> /es
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/es";
    return NextResponse.redirect(url);
  }

  // ✅ 5) Cualquier ruta pública sin idioma -> /es + ruta
  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  return NextResponse.redirect(url);
}

// ✅ matcher que EXCLUYE /admin y /api
export const config = {
  matcher: ["/((?!admin|api|_next|favicon.ico|robots.txt|sitemap.xml).*)"]
};
