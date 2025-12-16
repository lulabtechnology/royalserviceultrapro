export type ProductStatus = "draft" | "published" | "hidden" | "archived";
export type PromoTag = "OFERTA" | "PROMO" | null;

export type Lang = "es" | "en";

export type Category = {
  id: string;
  nameEs: string;
  nameEn: string;
  slug: string;
  isVisible: boolean;
  sortOrder: number;
};

export type SpecRow = { label: string; value: string };

export type Product = {
  id: string;
  nameEs: string;
  nameEn: string;
  code: string;
  shortDescEs: string;
  shortDescEn: string;

  categoryId: string;

  imageUrls: string[]; // [] si no hay
  specs: SpecRow[];
  techPdfUrl: string | null;

  status: ProductStatus;
  promoTag: PromoTag;

  trackStock: boolean;
  stockQty: number;
  lowStockThreshold: number;
  allowBackorder: boolean;

  createdAt?: any;
  updatedAt?: any;
};

export type Promotion = {
  id: string;
  titleEs: string;
  titleEn: string;
  isActive: boolean;
  startAt: any | null;
  endAt: any | null;
  imageUrl: string | null;
  link: string | null;
};
