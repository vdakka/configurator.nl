import { Eyebrow } from '@/components/ui/Eyebrow';
import { ThreeDShape } from '@/components/ui/ThreeDShape';
import { SectionId } from '@/components/ui/SectionId';
import type { HomepageContent } from '@/lib/content';

export function MarketShiftSection({
  data,
}: {
  data: HomepageContent['marketShift'];
}) {
  return (
    <section className="relative overflow-hidden bg-hg py-24 sm:py-32">
      <SectionId num="03" label="wat" />
      <div className="pointer-events-none absolute inset-0 dot-grid-dark opacity-50" aria-hidden />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 bottom-[12%] animate-float2 opacity-60"
      >
        <ThreeDShape shape="smallCubeY" size={180} />
      </div>

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>{data.eyebrow}</Eyebrow>

        <div className="mt-8 grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
          {/* LEFT: big statement + lede */}
          <div>
            <h2 className="text-[36px] font-black leading-[1.04] tracking-display sm:text-[48px] md:text-[60px]">
              {data.title}
            </h2>
            <p className="mt-7 text-[18px] leading-[1.6] text-hb-sec md:text-[20px]">
              {data.lede}
            </p>
          </div>

          {/* RIGHT: drie disciplines als inline definition list */}
          <div className="flex flex-col gap-5 lg:pt-3">
            <dl className="space-y-5">
              {data.blocks.map((b) => (
                <div
                  key={b.title}
                  className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-hg-line pb-5 last:border-b-0 last:pb-0"
                >
                  <dt className="row-span-2 self-start font-mono text-[13px] font-bold text-hy">
                    {b.num}
                  </dt>
                  <dt className="text-[17px] font-black tracking-heading text-hb">
                    {b.title}
                  </dt>
                  <dd className="text-[14px] leading-[1.55] text-hb-sec">{b.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
