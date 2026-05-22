import type { AanpakContent } from '@/lib/content';

export function DeliverablesSpec({
  data,
}: {
  data: AanpakContent['deliverables'];
}) {
  return (
    <section className="bg-hg py-24 sm:py-32">
      <div className="mx-auto grid max-w-page gap-16 px-6 sm:px-8 lg:grid-cols-[5fr_7fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-[32px] font-black leading-[1.05] tracking-display sm:text-[40px] md:text-[44px]">
            {data.title}
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-hb-sec">{data.lede}</p>
        </aside>

        <ol className="border-t-2 border-hb">
          {data.items.map((item) => (
            <li
              key={item.num}
              className="group grid grid-cols-[64px_1fr_auto] items-start gap-6 border-b border-hg-line py-7 transition-all hover:bg-hy/[0.06] hover:pl-3"
            >
              <span className="font-mono text-[36px] font-extrabold text-hb">{item.num}</span>
              <div>
                <h3 className="text-[20px] font-black tracking-heading">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-hb-sec">{item.body}</p>
              </div>
              <span className="rounded-sm border border-hg-line bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-mono text-hb-sec">
                {item.tag}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
