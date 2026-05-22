import Link from 'next/link';
import type { AanpakContent } from '@/lib/content';

export function Breadcrumb({ items }: { items: AanpakContent['breadcrumb'] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-hb">
      <ol className="mx-auto flex max-w-page items-center gap-3 px-6 py-4 font-mono text-[12px] text-white/60 sm:px-8">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${it.href}-${i}`} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden>/</span>}
              {last ? (
                <span className="text-hy">{it.label}</span>
              ) : (
                <Link href={it.href} className="transition-colors hover:text-hy">
                  {it.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
