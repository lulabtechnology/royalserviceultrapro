import "server-only";

import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

let _app: App | null = null;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

/**
 * Lazy init:
 * - NO lee env vars hasta que alguien llame getAdminApp()
 * - Evita que el build falle si Next "toca" el módulo
 */
export function getAdminApp(): App {
  if (_app) return _app;
  const apps = getApps();
  if (apps.length) {
    _app = apps[0]!;
    return _app;
  }

  const projectId = requireEnv("FIREBASE_ADMIN_PROJECT_ID");
  const clientEmail = requireEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
  const privateKey = requireEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n");

  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  _app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    ...(storageBucket ? { storageBucket } : {})
  });

  return _app;
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminStorage() {
  return getStorage(getAdminApp());
}
