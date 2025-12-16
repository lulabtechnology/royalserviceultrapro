import "server-only";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function initAdmin() {
  if (getApps().length) return getApps()[0]!;

  const projectId = must("FIREBASE_ADMIN_PROJECT_ID");
  const clientEmail = must("FIREBASE_ADMIN_CLIENT_EMAIL");
  const privateKey = must("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n");
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    ...(storageBucket ? { storageBucket } : {})
  });
}

export const adminApp = initAdmin();
export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
export const adminStorage = getStorage(adminApp);
