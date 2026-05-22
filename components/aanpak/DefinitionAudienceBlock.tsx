import type { AanpakContent } from '@/lib/content';

export function DefinitionAudienceBlock({
  definition,
  audiences,
}: {
  definition: AanpakContent['definition'];
  audiences: AanpakContent['audiences'];
}) {
  return (
    <section className="bg-hg py-24 sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr]">
          <h2 className="text-[32px] font-black leading-[1.05] tracking-display sm:text-[44px] md:text-[52px]">
            {definition.title}
          </h2>
          <div className="relative rounded-lg border-2 border-hb bg-white p-8 pt-12">
            <span
              aria-hidden
              className="absolute -top-7 left-5 select-none font-black leading-none text-hy"
              style={{ fontSize: '96px' }}
            >
              “
            </span>
            <p className="text-[18px] font-semibold leading-relaxed text-hb">
              {definition.body}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <article key={a.num} className="rounded-xl border border-hg-line bg-white p-7">
              <span className="inline-block rounded-sm bg-hb px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-mono text-hy">
                {a.num}
              </span>
              <h3 className="mt-5 text-[20px] font-black tracking-heading">{a.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-hb-sec">{a.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
