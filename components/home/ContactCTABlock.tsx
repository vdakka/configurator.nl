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
    <section className="relative overflow-hidden bg-white py-16 text-hb sm:py-20">
      <SectionId num="08" label="contact" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[18%] animate-float1-slow opacity-60"
      >
        <ThreeDShape shape="sphereY" size={240} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-[26%] bottom-[6%] animate-float2 opacity-50"
      >
        <ThreeDShape shape="capB" size={160} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[4%] animate-float3 opacity-50"
      >
        <ThreeDShape shape="smallCubeB" size={110} />
      </div>

      <div className="relative mx-auto grid max-w-page items-start gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* LEFT: copy + Gerke */}
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
        </div>

        {/* RIGHT: form */}
        <div className="relative">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
