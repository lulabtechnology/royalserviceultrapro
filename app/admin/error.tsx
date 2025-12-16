"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 space-y-3">
      <div className="text-xl font-semibold text-red-700">Admin: Error</div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm whitespace-pre-wrap">
        {error.message}
        {error.digest ? `\n\ndigest: ${error.digest}` : ""}
      </div>
      <button
        className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
        onClick={reset}
      >
        Reintentar
      </button>
    </div>
  );
}
