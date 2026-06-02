import type { Metadata } from 'next';
import Link from 'next/link';
import { getContact } from '@/lib/content';
import { Pill } from '@/components/v2/ui/Pill';
import {
  Circle,
  Plus,
} from '@/components/v2/decorative/GeometricShapes';

export function generateMetadata(): Metadata {
  const { seo } = getContact();
  return {
    title: `${seo.title} (v2)`,
    description: seo.description,
  };
}

/**
 * /v2/contact — contact-opties pagina in Merkboek 2026 stijl.
 *
 * Spoor 01 intro (geel-hero), spoor 02 onderkant (Paper cards-grid).
 */
export default function ContactV2Page() {
  const content = getContact();
  return (
    <>
      {/* Slim spoor-01 hero */}
      <section className="relative overflow-hidden bg-mk-yellow text-mk-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Circle
            size={180}
            color="var(--mk-ink)"
            className="absolute -right-10 top-10 opacity-40"
          />
          <Plus
            size={50}
            color="var(--mk-ink)"
            className="absolute left-[20%] bottom-[10%] hidden md:block opacity-60"
          />
        </div>
        <div className="relative mx-auto max-w-page px-6 py-20 sm:px-8 sm:py-24">
          <Pill variant="category" className="bg-mk-paper">
            {content.hero.eyebrow}
          </Pill>
          <h1 className="mk-h1 mt-8 max-w-[920px] text-balance text-mk-ink">
            {content.hero.title}
          </h1>
          <p className="mk-lead mt-7 max-w-[640px] text-mk-ink/85">
            {content.hero.lede}
          </p>
        </div>
      </section>

      {/* Spoor-02 options grid */}
      <section className="relative bg-mk-paper py-24 sm:py-28">
        <div className="relative mx-auto max-w-page px-6 sm:px-8">
          <ul className="grid gap-6 md:grid-cols-3">
            {content.options.map((o) => (
              <li key={o.title}>
                <Link
                  href={o.href.replace(
                    /^\/(contact|aanpak|quickscan)/,
                    '/v2/$1',
                  )}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-mk-ink/15 bg-mk-paper p-8 transition-all hover:-translate-y-1 hover:border-mk-ink hover:bg-mk-beige"
                >
                  <Pill variant="category" size="sm">
                    {o.tag}
                  </Pill>
                  <h3 className="font-instrument text-[24px] leading-tight text-mk-ink">
                    {o.title}
                  </h3>
                  <p className="flex-1 font-inter text-[14px] leading-[1.55] text-mk-ink/75">
                    {o.body}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 font-inter text-[14px] font-semibold text-mk-ink">
                    {o.cta}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
