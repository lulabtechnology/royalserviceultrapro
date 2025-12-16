"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FIREBASE_PUBLIC_CONFIG } from "@/lib/firebase/publicConfig";

/**
 * ✅ YA NO DEPENDE de NEXT_PUBLIC_* para funcionar.
 * Si las env existen, las usa. Si no, usa FIREBASE_PUBLIC_CONFIG.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || FIREBASE_PUBLIC_CONFIG.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || FIREBASE_PUBLIC_CONFIG.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || FIREBASE_PUBLIC_CONFIG.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || FIREBASE_PUBLIC_CONFIG.storageBucket,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || FIREBASE_PUBLIC_CONFIG.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || FIREBASE_PUBLIC_CONFIG.appId,
};

// Validación final: si te faltó pegar algo en publicConfig.ts, te lo dice claro
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "PEGA_AQUI") {
  throw new Error(
    "Firebase public config missing. Fill lib/firebase/publicConfig.ts (apiKey/authDomain/projectId/...)."
  );
}

export const fbApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
export const fbDb = getFirestore(fbApp);
export const fbStorage = getStorage(fbApp);
