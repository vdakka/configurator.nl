import type { Metadata } from 'next';
import Link from 'next/link';
import { getContact } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function generateMetadata(): Metadata {
  const { seo } = getContact();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/contact' },
  };
}

export default function ContactPage() {
  const content = getContact();
  return (
    <section className="bg-white py-20 text-hb sm:py-24">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>{content.hero.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[1100px] text-[40px] font-black leading-[1.02] tracking-display sm:text-[56px] md:text-[76px]">
          {content.hero.title}
        </h1>
        <p className="mt-6 max-w-[680px] text-[17px] leading-relaxed text-hb-sec md:text-[19px]">
          {content.hero.lede}
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {content.options.map((o) => (
            <Link
              key={o.title}
              href={o.href}
              className="group flex flex-col rounded-xl border border-hg-line bg-hg p-9 transition-all hover:-translate-y-1 hover:border-hb hover:bg-hy"
            >
              <span className="inline-block rounded-sm border border-hb-sec/40 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-mono text-hb-sec group-hover:border-hb group-hover:text-hb">
                {o.tag}
              </span>
              <h3 className="mt-7 text-[24px] font-black tracking-heading">{o.title}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-hb-sec group-hover:text-hb/80">
                {o.body}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-bold">
                {o.cta} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
