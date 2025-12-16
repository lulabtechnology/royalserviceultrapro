import { doc, getDoc } from "firebase/firestore";
import { fbDb } from "@/lib/firebase/client";

export async function isEmailAdmin(email: string): Promise<boolean> {
  const ref = doc(fbDb, "admins", email);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;
  const data = snap.data();
  return data?.isActive === true;
}
