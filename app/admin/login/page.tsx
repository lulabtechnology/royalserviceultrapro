"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PRIMARY = "#7E0D05";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      // ✅ Lazy imports: evita crashes al cargar la página
      const { fbAuth, fbDb } = await import("@/lib/firebase/client");
      const { signInWithEmailAndPassword, signOut } = await import("firebase/auth");
      const { doc, getDoc } = await import("firebase/firestore");

      const cred = await signInWithEmailAndPassword(fbAuth, email.trim(), pass);
      const userEmail = cred.user.email || "";

      // ✅ Check allowlist: admins/{email}.isActive === true
      const ref = doc(fbDb, "admins", userEmail);
      const snap = await getDoc(ref);

      const isActive = snap.exists() && snap.data()?.isActive === true;

      if (!isActive) {
        await signOut(fbAuth);
        setErr("No autorizado. Tu email no está en la allowlist de admins.");
        return;
      }

      router.replace("/admin");
    } catch (ex: any) {
      setErr(ex?.message ?? "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-sm text-zinc-600">Inicia sesión para administrar el catálogo.</p>

      <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-zinc-200 p-6">
        <label className="block text-sm font-semibold">Email</label>
        <input
          className="w-full rounded-xl border border-zinc-300 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tuemail@..."
          required
        />

        <label className="block text-sm font-semibold">Contraseña</label>
        <input
          className="w-full rounded-xl border border-zinc-300 px-3 py-2"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        {err ? <div className="text-sm text-red-700">{err}</div> : null}

        <button
          disabled={loading}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: PRIMARY }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
