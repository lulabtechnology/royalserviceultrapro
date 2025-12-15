export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

export function isLang(value: string): value is Lang {
  return (LANGS as string[]).includes(value);
}

const dict = {
  es: {
    navHome: "Inicio",
    navCatalog: "Catálogo",
    navContact: "Contacto",
    navPolicies: "Políticas",
    heroTitle: "Catálogo profesional, pedido por WhatsApp",
    heroSubtitle: "Agrega productos al carrito y finaliza sin pagar: enviamos el pedido por WhatsApp y correo.",
    ctaCatalog: "Ver catálogo",
    comingSoon: "En FASE 2 conectamos Firebase y cargamos productos reales."
  },
  en: {
    navHome: "Home",
    navCatalog: "Catalog",
    navContact: "Contact",
    navPolicies: "Policies",
    heroTitle: "Professional catalog, order via WhatsApp",
    heroSubtitle: "Add items to cart and checkout without payment: we send the order via WhatsApp and email.",
    ctaCatalog: "View catalog",
    comingSoon: "In PHASE 2 we connect Firebase and load real products."
  }
} as const;

export function t(lang: Lang, key: keyof typeof dict.es) {
  return dict[lang][key];
}
