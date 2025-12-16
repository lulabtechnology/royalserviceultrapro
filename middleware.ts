import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["es", "en"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ NO tocar Admin ni API ni assets
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Si ya viene con /es o /en, dejar pasar
  const first = pathname.split("/")[1];
  if (LOCALES.includes(first as any)) return NextResponse.next();

  // Root -> /es
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/es";
    return NextResponse.redirect(url);
  }

  // Cualquier ruta pública sin idioma -> prefijar /es
  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  return NextResponse.redirect(url);
}

// ✅ Importante: que el middleware no se aplique a /admin ni /api
export const config = {
  matcher: ["/((?!admin|api|_next|favicon.ico).*)"]
};
