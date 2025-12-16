import "server-only";
import { getAdminDb } from "@/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type WithId<T> = T & { id: string };

export async function getVisibleCategories() {
  const db = getAdminDb();
  const snap = await db
    .collection("categories")
    .where("isVisible", "==", true)
    .orderBy("sortOrder", "asc")
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getPublishedProducts() {
  const db = getAdminDb();

  // 1) categorías visibles
  const cats = await getVisibleCategories();
  const visibleCategoryIds = cats.map((c) => c.id);

  if (visibleCategoryIds.length === 0) return [];

  // 2) productos published dentro de categorías visibles
  // (IN tiene límite 10; tú tienes 3 categorías, perfecto)
  const snap = await db
    .collection("products")
    .where("status", "==", "published")
    .where("categoryId", "in", visibleCategoryIds)
    .orderBy("updatedAt", "desc")
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getActivePromotions() {
  const db = getAdminDb();

  // Query simple que coincide con índices típicos
  const snap = await db
    .collection("promotions")
    .where("isActive", "==", true)
    .orderBy("startAt", "desc")
    .limit(20)
    .get();

  const now = Timestamp.now();

  // startAt/endAt opcionales → filtramos en código (sin OR complicados)
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as any) }))
    .filter((p: any) => {
      const startOk = !p.startAt || p.startAt.toMillis?.() <= now.toMillis();
      const endOk = !p.endAt || p.endAt.toMillis?.() >= now.toMillis();
      return startOk && endOk;
    });
}
