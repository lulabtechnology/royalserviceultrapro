export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    // OJO: NO usar IDs que empiecen con "__"
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
