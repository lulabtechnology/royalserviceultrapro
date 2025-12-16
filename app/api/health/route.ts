export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";

const REQUIRED_ENVS = [
  "FIREBASE_ADMIN_PROJECT_ID",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_ADMIN_PRIVATE_KEY"
] as const;

export async function GET() {
  // 1) Validar env vars SIN romper build
  const missing = REQUIRED_ENVS.filter((k) => !process.env[k]);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing env vars: ${missing.join(", ")}` },
      { status: 500 }
    );
  }

  try {
    const adminDb = getAdminDb();

    // NO usar "__healthcheck__" (reservado)
    await adminDb.collection("admins").doc("healthcheck").set(
      { checkedAt: Timestamp.now() },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "unknown" },
      { status: 500 }
    );
  }
}
