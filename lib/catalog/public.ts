import { fbDb } from "@/lib/firebase/client";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import type { Category, Product, Promotion } from "./types";

function asString(v: any, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function asBool(v: any, fallback = false): boolean {
  return typeof v === "boolean" ? v : fallback;
}
function asNum(v: any, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}
function asStringArray(v: any): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x) => typeof x === "string" && x.trim().length > 0);
}

export async function getVisibleCategories(): Promise<Category[]> {
  const q = query(
    collection(fbDb, "categories"),
    where("isVisible", "==", true),
    orderBy("sortOrder", "asc")
  );
  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      nameEs: asString(data.nameEs),
      nameEn: asString(data.nameEn),
      slug: asString(data.slug),
      isVisible: asBool(data.isVisible, true),
      sortOrder: asNum(data.sortOrder, 0)
    };
  });
}

export async function getPublishedProducts(categoryId?: string): Promise<Product[]> {
  const base = [
    where("status", "==", "published"),
    orderBy("updatedAt", "desc")
  ] as any[];

  if (categoryId) base.unshift(where("categoryId", "==", categoryId));

  const q = query(collection(fbDb, "products"), ...base);
  const snap = await getDocs(q);

  return snap.docs.map((d) => normalizeProduct(d.id, d.data()));
}

export async function getProductById(productId: string): Promise<Product | null> {
  const ref = doc(fbDb, "products", productId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const p = normalizeProduct(snap.id, snap.data());

  // Público: SOLO published (evita filtrar mal y dejar vacío)
  if (p.status !== "published") return null;
  return p;
}

export async function getActivePromotions(): Promise<Promotion[]> {
  const q = query(
    collection(fbDb, "promotions"),
    where("isActive", "==", true),
    orderBy("startAt", "desc"),
    limit(10)
  );
  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      titleEs: asString(data.titleEs),
      titleEn: asString(data.titleEn),
      isActive: asBool(data.isActive, true),
      startAt: data.startAt ?? null,
      endAt: data.endAt ?? null,
      imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : null,
      link: typeof data.link === "string" ? data.link : null
    };
  });
}

function normalizeProduct(id: string, data: any): Product {
  const imageUrls = asStringArray(data.imageUrls); // evita [""]

  const specsRaw = Array.isArray(data.specs) ? data.specs : [];
  const specs = specsRaw
    .map((row: any) => ({
      label: asString(row?.label).trim(),
      value: asString(row?.value).trim()
    }))
    .filter((r: any) => r.label.length > 0 && r.value.length > 0);

  return {
    id,
    nameEs: asString(data.nameEs),
    nameEn: asString(data.nameEn),
    code: asString(data.code),
    shortDescEs: asString(data.shortDescEs),
    shortDescEn: asString(data.shortDescEn),
    categoryId: asString(data.categoryId),

    imageUrls,
    specs,
    techPdfUrl: typeof data.techPdfUrl === "string" ? data.techPdfUrl : null,

    status: (asString(data.status, "draft") as any),
    promoTag: (data.promoTag === "OFERTA" || data.promoTag === "PROMO") ? data.promoTag : null,

    trackStock: asBool(data.trackStock, false),
    stockQty: asNum(data.stockQty, 0),
    lowStockThreshold: asNum(data.lowStockThreshold, 0),
    allowBackorder: asBool(data.allowBackorder, false),

    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
}
