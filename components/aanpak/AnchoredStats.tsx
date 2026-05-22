import type { AanpakContent } from '@/lib/content';

export function AnchoredStats({ stats }: { stats: AanpakContent['stats'] }) {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto grid max-w-page gap-8 px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l-4 border-hy pl-5">
            <div className="text-[36px] font-black leading-none tracking-display text-hb">{s.value}</div>
            <div className="mt-3 mono-label text-[11px] text-hb-sec">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
