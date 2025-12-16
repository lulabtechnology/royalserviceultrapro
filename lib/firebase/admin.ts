import "server-only";

import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

let _app: App | null = null;

function must(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

/**
 * ✅ Lazy init:
 * - NO lee env vars hasta que alguien llame getAdminApp()
 * - Evita que el build falle por tocar env
 */
export function getAdminApp(): App {
  if (_app) return _app;

  // ✅ Acceso ESTÁTICO (no process.env[name])
  const projectId = must("FIREBASE_ADMIN_PROJECT_ID", process.env.FIREBASE_ADMIN_PROJECT_ID);
  const clientEmail = must("FIREBASE_ADMIN_CLIENT_EMAIL", process.env.FIREBASE_ADMIN_CLIENT_EMAIL);

  // En Vercel normalmente viene con \n escapados
  const privateKeyRaw = must("FIREBASE_ADMIN_PRIVATE_KEY", process.env.FIREBASE_ADMIN_PRIVATE_KEY);
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  const storageBucket = process.env.FIREBASE_ADMIN_STORAGE_BUCKET; // opcional

  const apps = getApps();
  if (apps.length) {
    _app = apps[0]!;
    return _app;
  }

  _app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    ...(storageBucket ? { storageBucket } : {}),
  });

  return _app;
}

export function adminDb() {
  return getFirestore(getAdminApp());
}

export function adminAuth() {
  return getAuth(getAdminApp());
}

export function adminStorage() {
  return getStorage(getAdminApp());
}
// ✅ Aliases retro-compatibles (para no romper imports viejos)
export function getAdminDb() {
  return adminDb();
}

export function getAdminAuth() {
  return adminAuth();
}

export function getAdminStorage() {
  return adminStorage();
}
