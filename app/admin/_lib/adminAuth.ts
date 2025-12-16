"use client";

import { fbAuth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const TOKEN_KEY = "admin_id_token";

export async function adminLogin(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(fbAuth, email, password);
  const token = await cred.user.getIdToken();
  sessionStorage.setItem(TOKEN_KEY, token);
  return cred.user;
}

export function adminLogout() {
  sessionStorage.removeItem(TOKEN_KEY);
  return signOut(fbAuth);
}

export function getAdminToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}
