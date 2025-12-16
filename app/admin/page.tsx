"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fbAuth } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { adminLogout } from "@/app/admin/_lib/adminAuth";
import { isEmailAdmin } from "@/lib/admin/allowlist";

export default function AdminHome() {
  const [email, setEmail] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(fbAuth, async (user) => {
      const em = user?.email ?? null;
      setEmail(em);
      if (!em) return setOk(false);
      setOk(await isEmailAdmin(em));
    });
    return () => unsub();
  }, []);

  if (ok === null) return <div className="p-6">Cargando...</div>;
  if (!ok) return (
    <div className="p-6">
      <div className="text-red-700">No autorizado.</div>
      <Link className="underline" href="/admin/login">Ir a login</Link>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Panel Admin</div>
          <div className="text-sm text-zinc-600">{email}</div>
        </div>
        <button className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
          onClick={() => adminLogout().then(() => location.href = "/admin/login")}
        >
          Salir
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link className="rounded-2xl border p-4 hover:bg-zinc-50" href="/admin/categories">Categorías</Link>
        <Link className="rounded-2xl border p-4 hover:bg-zinc-50" href="/admin/products">Productos</Link>
        <Link className="rounded-2xl border p-4 hover:bg-zinc-50" href="/admin/promotions">Promociones</Link>
        <Link className="rounded-2xl border p-4 hover:bg-zinc-50" href="/admin/settings">Ajustes</Link>
      </div>
    </div>
  );
}
