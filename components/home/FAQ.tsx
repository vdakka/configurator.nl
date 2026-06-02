import Link from 'next/link';
import { SectionId } from '@/components/ui/SectionId';
import type { HomepageContent } from '@/lib/content';

/**
 * §08 faq — homepage FAQ. Hergebruikt de editorial-stijl van /aanpak met
 * sticky sidebar links en native <details> rechts.
 */
export function FAQ({ data }: { data: HomepageContent['faq'] }) {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <SectionId num="08" label="faq" />
      <div className="mx-auto grid max-w-page gap-16 px-6 sm:px-8 lg:grid-cols-[4fr_7fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <span className="mono-label text-[11px] text-hb-sec">{data.eyebrow}</span>
          <h2 className="mt-4 text-[32px] font-black leading-[1.05] tracking-display sm:text-[40px]">
            {data.title}
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-hb-sec">
            {data.lede}{' '}
            <Link
              href={data.linkHref}
              className="font-bold text-hb underline decoration-hy decoration-[3px] underline-offset-4 hover:decoration-hb"
            >
              {data.linkLabel}
            </Link>
          </p>
        </aside>

        <div className="border-t-2 border-hb">
          {data.items.map((it, i) => (
            <details
              key={i}
              open={it.open}
              className="group border-b border-hg-line py-7 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[56px_1fr_32px] items-start gap-5">
                {/* Q-prefix is decoratief/categorisch — coral (hs1) is per
                    brandbook voor data/alerts. Hb-sec in rust, hb op yellow
                    pill als 'open'-state (= geactiveerd). */}
                <span className="inline-flex items-center justify-center rounded font-mono text-[13px] font-bold text-hb-sec group-open:bg-hy group-open:px-2 group-open:py-0.5 group-open:text-hb">
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
