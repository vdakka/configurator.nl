import type { Metadata } from 'next';
import Link from 'next/link';
import { getCaseList } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Configurator cases en voorbeelden',
  description:
    'Verschillende branches, verschillende systeemlandschappen. Eén gemene deler: guided selling, configuratie en visualisatie die in elkaar grijpen.',
  alternates: { canonical: '/cases' },
  robots: { index: false, follow: false },
};

export default function CasesPage() {
  const cases = getCaseList();
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cases', href: '/cases' },
        ]}
        tone="light"
      />
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>Cases</Eyebrow>
        <h1 className="mt-6 max-w-[800px] text-[36px] font-black leading-[1.05] tracking-display sm:text-[52px] md:text-[64px]">
          Wat we hebben gebouwd. En wat het opleverde.
        </h1>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group flex flex-col rounded-xl border border-hg-line bg-hg p-8 transition-transform hover:-translate-y-1"
            >
              <ul className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-sm bg-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-hb-sec"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <h2 className="mt-4 text-[22px] font-black tracking-heading">{c.title}</h2>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-hb-sec">{c.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold underline decoration-2 underline-offset-4">
                Lees de case <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
