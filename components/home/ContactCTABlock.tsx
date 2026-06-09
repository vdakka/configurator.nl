import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ThreeDShape } from '@/components/ui/ThreeDShape';
import { SectionId } from '@/components/ui/SectionId';
import { ContactForm } from './ContactForm';
import type { TeamMember } from '@/lib/content';

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
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-hg py-16 text-hb sm:py-20"
    >
      <SectionId num="09" label="contact" />
      {/* Eén anker-shape behouden (was 3 — capB + smallCubeB verwijderd
          om de form-conversie minder visueel druk te maken). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[18%] animate-float1-slow opacity-60"
      >
        <ThreeDShape shape="sphereY" size={240} />
      </div>

      <div className="relative mx-auto grid max-w-page items-start gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* LEFT: copy + Gerke + business-line pills */}
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-[36px] font-black leading-[1.02] tracking-display sm:text-[44px] md:text-[56px]">
            {title}
          </h2>
          {body && (
            <p className="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-hb-sec md:text-[18px]">
              {body}
            </p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full bg-hy">
              <Image
                src={gerke.portrait}
                alt={gerke.portraitAlt}
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
            <div className="leading-tight">
              <p className="text-[22px] font-black tracking-heading">{gerke.name}</p>
              <p className="mt-1 font-mono text-[12px] uppercase tracking-eyebrow text-hb-sec">
                {gerke.role}
              </p>
            </div>
          </div>

          {/* Business-line pills — concrete vakgebieden waar Gerke mee komt.
              Geeft B2B-buyer direct rol-context vóór ze het formulier
              invullen. */}
          <div className="mt-6 flex flex-wrap gap-2">
            {['Discovery', 'CPQ', 'Visualisatie', 'ERP / PIM-integratie'].map(
              (line) => (
                <span
                  key={line}
                  className="inline-flex items-center whitespace-nowrap rounded-full border border-hb-sec/30 bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-mono text-hb-sec"
                >
                  {line}
                </span>
              ),
            )}
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="relative">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
