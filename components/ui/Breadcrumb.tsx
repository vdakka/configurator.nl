import Link from 'next/link';

export type BreadcrumbItem = { label: string; href: string };

export function Breadcrumb({
  items,
  tone = 'dark',
}: {
  items: BreadcrumbItem[];
  /** `dark` for dark-blue bg (white text), `light` for white bg (dark text). */
  tone?: 'dark' | 'light';
}) {
  const bgClass = tone === 'dark' ? 'bg-hb' : 'bg-white border-b border-hg-line';
  const baseColor = tone === 'dark' ? 'text-white/60' : 'text-hb-sec';
  const lastColor = tone === 'dark' ? 'text-hy' : 'text-hb';
  const hoverColor = tone === 'dark' ? 'hover:text-hy' : 'hover:text-hb';

  return (
    <nav aria-label="Breadcrumb" className={bgClass}>
      <ol
        className={`mx-auto flex max-w-page items-center gap-3 px-6 py-4 font-mono text-[12px] sm:px-8 ${baseColor}`}
      >
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${it.href}-${i}`} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden>/</span>}
              {last ? (
                <span className={lastColor}>{it.label}</span>
              ) : (
                <Link href={it.href} className={`transition-colors ${hoverColor}`}>
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
