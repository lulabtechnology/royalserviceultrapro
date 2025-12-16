"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/admin/_lib/adminAuth";
import { isEmailAdmin } from "@/lib/admin/allowlist";
import { SITE } from "@/lib/site";

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
      const user = await adminLogin(email.trim(), pass);
      const ok = await isEmailAdmin(user.email || "");
      if (!ok) {
        setErr("Este usuario no está autorizado como admin.");
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
    <div className="mx-auto max-w-md space-y-6 py-10">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-sm text-zinc-600">
        Inicia sesión para administrar el catálogo.
      </p>

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
          style={{ backgroundColor: SITE.colors.primary }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
