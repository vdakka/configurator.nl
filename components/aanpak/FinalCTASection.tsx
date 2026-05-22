import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { AanpakContent } from '@/lib/content';

export function FinalCTASection({
  data,
}: {
  data: AanpakContent['finalCta'];
}) {
  return (
    <section className="bg-white py-20 text-hb sm:py-24">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-[1000px] text-[36px] font-black leading-[1.05] tracking-display sm:text-[52px] md:text-[64px]">
          {data.title}
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {data.options.map((o) => (
            <Link
              key={o.title}
              href={o.href}
              className="group flex flex-col rounded-xl border border-hg-line bg-hg p-9 transition-all hover:-translate-y-1 hover:border-hb hover:bg-hy"
            >
              <span className="inline-block rounded-sm border border-hb-sec/40 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-mono text-hb-sec group-hover:border-hb group-hover:text-hb">
                {o.tag}
              </span>
              <h3 className="mt-8 text-[26px] font-black tracking-heading">{o.title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-hb-sec group-hover:text-hb/80">
                {o.body}
              </p>
              <span
                aria-hidden
                className="mt-8 self-end text-[24px] font-bold transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
