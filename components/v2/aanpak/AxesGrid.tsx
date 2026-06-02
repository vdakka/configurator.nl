import { Pill } from '@/components/v2/ui/Pill';
import { Icon, type IconName } from '@/components/v2/ui/Icon';
import type { AanpakContent } from '@/lib/content';

/**
 * De vier assen — diepe variant voor /v2/aanpak.
 *
 * Spoor 02, rustig Paper / Beige. Per as: tag, icon, titel, sub-titel,
 * intro-tekst, drie kern-vragen, vier deliverables als category-pills.
 *
 * Mapt shape-types uit content.json naar icon-namen — `sphereY` → target,
 * `smallCubeB` → figures, `bigTubeY` → nodes, `cubeY`/anders → chip.
 */

const SHAPE_TO_ICON: Record<string, IconName> = {
  sphereY: 'target',
  sphereY2: 'target',
  sphereB: 'target',
  smallCubeB: 'figures',
  smallCubeY: 'figures',
  smallCubeY2: 'figures',
  bigTubeY: 'nodes',
  bigTubeY2: 'nodes',
  bigTubeB: 'nodes',
  capB: 'nodes',
  cubeY: 'chip',
};

export function AxesGrid({
  intro,
  axes,
}: {
  intro: AanpakContent['axesIntro'];
  axes: AanpakContent['axes'];
}) {
  return (
    <section className="relative bg-mk-beige py-24 sm:py-28">
      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="service">{intro.eyebrow}</Pill>
        <h2 className="mk-h2 mt-7 max-w-[800px] text-balance text-mk-ink">
          {intro.title}{' '}
          <span className="italic text-mk-ink/70">{intro.titleSub}</span>
        </h2>
        <p className="mk-body mt-7 max-w-[700px] text-[17px] leading-[1.6] text-mk-ink/75 md:text-[18px]">
          {intro.lede}
        </p>

        <ol className="mt-14 grid gap-7 lg:grid-cols-2">
          {axes.map((axis, i) => (
            <li
              key={axis.id}
              className="flex flex-col gap-5 rounded-2xl border border-mk-ink/15 bg-mk-paper p-8"
            >
              <header className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
                    {axis.tag}
                  </span>
                  <h3 className="mt-2 font-instrument text-[24px] leading-tight text-mk-ink sm:text-[26px]">
                    {axis.title}
                  </h3>
                  <p className="mt-2 font-instrument text-[16px] italic text-mk-ink/65">
                    {axis.titleSub}
                  </p>
                </div>
                <Icon
                  name={SHAPE_TO_ICON[axis.shape] ?? 'chip'}
                  size={36}
                  className="shrink-0 text-mk-lime"
                />
              </header>

              <p className="font-inter text-[15px] leading-[1.6] text-mk-ink/75">
                {axis.intro}
              </p>

              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
                  Kernvragen
                </p>
                <ul className="mt-3 space-y-2 font-inter text-[14px] leading-[1.5] text-mk-ink/80">
                  {axis.questions.slice(0, 3).map((q) => (
                    <li key={q} className="flex gap-2">
                      <span aria-hidden className="text-mk-coral">
                        →
                      </span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
                  Deliverables
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {axis.deliverables.map((d) => (
                    <li key={d}>
                      <Pill variant="category" size="sm">
                        {d}
                      </Pill>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
