import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'Branches | Configuratoren voor B2B en B2C',
  description:
    'B2B-fabrikanten of B2C-retailers: configuratoren werken in beide. Kies je segment voor specifieke voorbeelden, integraties en aanpak.',
  alternates: { canonical: '/branches' },
  robots: { index: false, follow: false },
};

const SEGMENTS = [
  {
    href: '/branches/b2b',
    eyebrow: 'B2B',
    title: 'Configuratoren voor fabrikanten en groothandel.',
    body: 'Dealer-portals, multi-stakeholder offertes, ERP- en CRM-koppelingen. Voor producten waar configureren samengaat met partners die mee moeten kunnen offreren.',
    cases: ['Fetim', 'Skantrae', 'Vogels'],
  },
  {
    href: '/branches/b2c',
    eyebrow: 'B2C',
    title: 'Configuratoren voor retailers en directe verkoop.',
    body: 'Visualisatie, personalisatie en realtime prijsvalidatie in de eigen schil. Voor klanten die zelf online willen samenstellen, zonder hulp van sales.',
    cases: ['Intergamma', 'Van Raam', 'Mepal'],
  },
];

export default function BranchesPage() {
  return (
    <section className="bg-white py-20 text-hb sm:py-24">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>Branches</Eyebrow>
        <h1 className="mt-6 max-w-[900px] text-[40px] font-black leading-[1.02] tracking-display sm:text-[56px] md:text-[68px]">
          Voor welk type bedrijf bouwen we?
        </h1>
        <p className="mt-6 max-w-[680px] text-[17px] leading-[1.6] text-hb-sec md:text-[19px]">
          B2B-fabrikanten of B2C-retailers: configuratoren werken in beide. De
          accenten verschillen — koppelingen, visualisatie, prijslogica. Kies je
          segment voor specifieke voorbeelden en aanpak.
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {SEGMENTS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-xl border border-hg-line bg-hg p-9 transition-all hover:-translate-y-1 hover:border-hb hover:bg-hy"
            >
              <span className="inline-block rounded-sm border border-hb-sec/40 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-mono text-hb-sec group-hover:border-hb group-hover:text-hb">
                {s.eyebrow}
              </span>
              <h2 className="mt-6 text-[26px] font-black leading-tight tracking-heading sm:text-[30px]">
                {s.title}
              </h2>
              <p className="mt-4 flex-1 text-[15px] leading-[1.55] text-hb-sec group-hover:text-hb/80">
                {s.body}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-mono text-hb-sec/80 group-hover:text-hb/70">
                <span>Klanten</span>
                {s.cases.map((c, i) => (
                  <span key={c}>
                    {i > 0 && <span aria-hidden className="mr-3 opacity-50">·</span>}
                    {c}
                  </span>
                ))}
              </div>
              <span
                aria-hidden
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-bold transition-transform group-hover:translate-x-1"
              >
                Lees verder →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
