import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getContact, getGerke } from '@/lib/content';
import { Pill } from '@/components/v2/ui/Pill';
import { ContactForm } from '@/components/v2/home/ContactForm';
import {
  Circle,
  Plus,
  RoundedSquare,
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
 * Spoor 01 intro (geel-hero), spoor 02 cards-grid (Paper), en spoor 01
 * form-anker (geel, id=sparren) onderaan voor de "Plan een gesprek"-kaart.
 */
export default function ContactV2Page() {
  const content = getContact();
  const gerke = getGerke();
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
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Spoor-01 form-anker — "Plan een gesprek"-kaart linkt hierheen
          (#sparren). Geeft de bezoeker een directe weg om te sparren
          zonder mailto of nieuwe pagina. */}
      <section
        id="sparren"
        className="relative scroll-mt-24 overflow-hidden bg-mk-yellow py-20 text-mk-ink sm:py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Circle
            size={220}
            color="var(--mk-ink)"
            className="absolute -left-14 bottom-10 opacity-40"
          />
          <RoundedSquare
            size={120}
            color="var(--mk-ink)"
            className="absolute -right-8 top-14 opacity-35"
          />
        </div>

        <div className="relative mx-auto grid max-w-page items-start gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Pill variant="category" className="bg-mk-paper">
              Even sparren
            </Pill>
            <h2 className="mk-h2 mt-7 text-balance text-mk-ink">
              Daag Gerke uit met je{' '}
              <span className="italic">vraagstuk</span>.
            </h2>
            <p className="mk-body mt-7 max-w-[480px] text-[17px] leading-[1.6] text-mk-ink/80 md:text-[18px]">
              Een uur sparren — geen sales pitch, wel concrete adviezen die je
              morgen kan gebruiken. Gerke leest je vraag deze week persoonlijk
              en reageert binnen 2 werkdagen.
            </p>

            <div className="mt-9 flex items-center gap-5">
              <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full bg-mk-beige ring-4 ring-mk-ink/15">
                <Image
                  src={gerke.portraitV2 ?? gerke.portrait}
                  alt={gerke.portraitAlt}
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
              </div>
              <div className="leading-tight">
                <p className="font-instrument text-[24px] text-mk-ink">
                  {gerke.name}
                </p>
                <p className="mt-1 font-inter text-[12px] font-semibold uppercase tracking-[0.15em] text-mk-ink/70">
                  {gerke.role}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <Pill variant="category" className="bg-mk-paper" size="sm">
                Discovery
              </Pill>
              <Pill variant="category" className="bg-mk-paper" size="sm">
                CPQ
              </Pill>
              <Pill variant="category" className="bg-mk-paper" size="sm">
                Visualisatie
              </Pill>
              <Pill variant="category" className="bg-mk-paper" size="sm">
                ERP / PIM-integratie
              </Pill>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
