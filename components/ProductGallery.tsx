export function ProductGallery({ urls }: { urls: string[] }) {
  const safe = Array.isArray(urls) ? urls.filter(Boolean).slice(0, 3) : [];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {safe.length ? (
        safe.map((u, i) => (
          <div key={i} className="h-48 overflow-hidden rounded-2xl bg-zinc-100">
            <img src={u} alt={`img-${i}`} className="h-full w-full object-cover" />
          </div>
        ))
      ) : (
        <div className="h-48 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-600 sm:col-span-3">
          Sube imágenes luego (admin). Placeholder: /public/images/placeholder-product.jpg
        </div>
      )}
    </div>
  );
}
