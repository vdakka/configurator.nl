import Image from 'next/image';
import {
  Circle,
  Plus,
  RoundedSquare,
} from '@/components/v2/decorative/GeometricShapes';
import { Pill } from '@/components/v2/ui/Pill';
import { ContactForm } from './ContactForm';
import type { TeamMember } from '@/lib/content';

/**
 * §09 contact CTA — Merkboek 2026 spoor 01 "Eerste stap".
 *
 * Conversie-moment: geel-dominant, ink-typografie. Portret-blok van Gerke
 * blijft (zelfde data uit `lib/content.ts`), business-line pills onder
 * naam. Formulier rechts in Paper-card.
 *
 * Match qua spoor met §01 hero en §06 quickscan-teaser zodat de drie
 * conversie-momenten visueel rijmen.
 */
export function ContactCTABlock({
  eyebrow,
  title,
  body,
  gerke,
}: {
  eyebrow: string;
  title: string;
  body: string;
  gerke: TeamMember;
}) {
  return (
    <section className="relative overflow-hidden bg-mk-yellow py-20 text-mk-ink sm:py-24">
      {/* Subtiele geometrische accents */}
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
        <Plus
          size={60}
          color="var(--mk-ink)"
          className="absolute left-[40%] top-[8%] hidden md:block"
        />
      </div>

      <div className="relative mx-auto grid max-w-page items-start gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — copy + Gerke portret + business-line pills */}
        <div>
          <Pill variant="category" className="bg-mk-paper">
            {eyebrow}
          </Pill>
          <h2 className="mk-h2 mt-7 text-balance text-mk-ink">{title}</h2>
          {body && (
            <p className="mk-body mt-7 max-w-[480px] text-[17px] leading-[1.6] text-mk-ink/80 md:text-[18px]">
              {body}
            </p>
          )}

          <div className="mt-9 flex items-center gap-5">
            <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full bg-mk-paper ring-4 ring-mk-ink/10">
              <Image
                src={gerke.portrait}
                alt={gerke.portraitAlt}
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
            <div className="leading-tight">
              <p className="font-instrument text-[26px] text-mk-ink">
                {gerke.name}
              </p>
              <p className="mt-1 font-inter text-[12px] font-semibold uppercase tracking-[0.15em] text-mk-ink/70">
                {gerke.role}
              </p>
            </div>
          </div>

          {/* Business-line pills — concrete vakgebieden waar Gerke mee komt */}
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

        {/* RIGHT — formulier */}
        <div className="relative">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
