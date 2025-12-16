export type Lang = "es" | "en";

export function isLang(x: any): x is Lang {
  return x === "es" || x === "en";
}

const DICT: Record<Lang, Record<string, string>> = {
  es: {
    heroTitle: "Royal Service",
    heroSubtitle: "Catálogo profesional con carrito. Finaliza por WhatsApp o correo.",
    ctaCatalog: "Ver catálogo",

    navHome: "Inicio",
    navCatalog: "Catálogo",
    navContact: "Contacto",
    navPolicies: "Políticas"
  },
  en: {
    heroTitle: "Royal Service",
    heroSubtitle: "Professional catalog with cart. Checkout via WhatsApp or email.",
    ctaCatalog: "View catalog",

    navHome: "Home",
    navCatalog: "Catalog",
    navContact: "Contact",
    navPolicies: "Policies"
  }
};

export function normalizeLang(lang: any): Lang {
  return lang === "en" ? "en" : "es";
}

/**
 * ✅ Nunca crashea:
 * - si lang viene raro -> fallback "es"
 * - si la key no existe -> devuelve la key
 */
export function t(lang: any, key: string): string {
  const l = normalizeLang(lang);
  return DICT[l]?.[key] ?? DICT.es?.[key] ?? key;
}
