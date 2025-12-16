import type { SpecRow } from "@/lib/catalog/types";

export function SpecTable({ specs }: { specs: SpecRow[] }) {
  if (!specs?.length) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((s, idx) => (
            <tr key={idx} className="border-t border-zinc-200 first:border-t-0">
              <td className="w-1/3 bg-zinc-50 px-4 py-3 font-semibold text-zinc-700">
                {s.label}
              </td>
              <td className="px-4 py-3 text-zinc-800">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
