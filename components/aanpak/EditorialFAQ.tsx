import Link from 'next/link';
import type { AanpakContent, FAQItem } from '@/lib/content';

export function EditorialFAQ({
  meta,
  items,
}: {
  meta: AanpakContent['faq'];
  items: FAQItem[];
}) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-page gap-16 px-6 sm:px-8 lg:grid-cols-[4fr_7fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-[32px] font-black leading-[1.05] tracking-display sm:text-[40px]">
            {meta.title}
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-hb-sec">
            {meta.note}{' '}
            <Link
              href={meta.linkHref}
              className="font-bold text-hb underline decoration-hy decoration-[3px] underline-offset-4 hover:decoration-hb"
            >
              {meta.linkLabel}
            </Link>
          </p>
        </aside>

        <div className="border-t-2 border-hb">
          {items.map((it, i) => (
            <details
              key={i}
              open={it.open}
              className="group border-b border-hg-line py-7 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="grid cursor-pointer grid-cols-[56px_1fr_32px] items-start gap-5 list-none">
                <span className="font-mono text-[13px] font-bold text-hs1 group-open:text-hb">
                  Q.
                </span>
                <span className="text-[20px] font-black tracking-heading text-hb sm:text-[22px]">
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className="text-[24px] font-bold text-hb-sec transition-transform group-open:rotate-45 group-open:text-hb"
                >
                  +
                </span>
              </summary>
              <div className="ml-[76px] mt-4 max-w-[760px] text-[15px] leading-relaxed text-hb-sec sm:text-[16px]">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
