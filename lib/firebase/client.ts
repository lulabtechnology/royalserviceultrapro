import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const firebaseConfig = {
  apiKey: must("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: must("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: must("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: must("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: must("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: must("NEXT_PUBLIC_FIREBASE_APP_ID")
};

export const fbApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
export const fbDb = getFirestore(fbApp);
export const fbStorage = getStorage(fbApp);
