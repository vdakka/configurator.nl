import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'B2C configuratoren',
  description: 'Configuratoren voor B2C-retailers: visualisatie, personalisatie, naadloze checkout.',
  alternates: { canonical: '/branches/b2c' },
  robots: { index: false, follow: true },
};

export default function B2CPage() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[800px] px-6 sm:px-8">
        <Eyebrow>B2C</Eyebrow>
        <h1 className="mt-6 text-[36px] font-black leading-[1.05] tracking-display sm:text-[52px]">
          Configuratoren voor B2C.
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-hb-sec">
          Visualisatie, personalisatie en realtime prijsvalidatie in de eigen schil. We werken aan een
          uitwerking van deze pagina. Tot die tijd: vraag gerust een gesprek aan, dan delen we cases en
          aanpak in detail.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-hy px-5 py-3 text-[14px] font-bold text-hb hover:-translate-y-0.5"
          >
            Plan een gesprek <span aria-hidden>→</span>
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 rounded-full border border-hg-line bg-white px-5 py-3 text-[14px] font-bold text-hb hover:border-hb"
          >
            Bekijk B2C-cases <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
