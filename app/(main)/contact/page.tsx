import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getContact, getGerke } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ContactForm } from '@/components/home/ContactForm';

export function generateMetadata(): Metadata {
  const { seo } = getContact();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/contact' },
  };
}

export default function ContactPage() {
  const content = getContact();
  const gerke = getGerke();
  return (
    <>
      <section className="bg-white py-20 text-hb sm:py-24">
        <div className="mx-auto max-w-page px-6 sm:px-8">
          <Eyebrow>{content.hero.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-[1100px] text-[40px] font-black leading-[1.02] tracking-display sm:text-[56px] md:text-[76px]">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-[680px] text-[17px] leading-relaxed text-hb-sec md:text-[19px]">
            {content.hero.lede}
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {content.options.map((o) => (
              <Link
                key={o.title}
                href={o.href}
                className="group flex flex-col rounded-xl border border-hg-line bg-hg p-9 transition-all hover:-translate-y-1 hover:border-hb hover:bg-hy"
              >
                <span className="inline-block rounded-sm border border-hb-sec/40 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-mono text-hb-sec group-hover:border-hb group-hover:text-hb">
                  {o.tag}
                </span>
                <h3 className="mt-7 text-[24px] font-black tracking-heading">
                  {o.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-hb-sec group-hover:text-hb/80">
                  {o.body}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-bold">
                  {o.cta} <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Form-anker — "Plan een gesprek"-kaart linkt hierheen (#sparren).
          Geeft de bezoeker een directe weg om te sparren zonder mailto-
          omweg of nieuwe pagina te hoeven openen. */}
      <section
        id="sparren"
        className="scroll-mt-24 bg-hg py-20 text-hb sm:py-24"
      >
        <div className="mx-auto grid max-w-page items-start gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Even sparren</Eyebrow>
            <h2 className="mt-6 text-[32px] font-black leading-[1.02] tracking-display sm:text-[40px] md:text-[48px]">
              Daag Gerke uit met je vraagstuk.
            </h2>
            <p className="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-hb-sec">
              Een uur sparren — geen sales pitch, wel concrete adviezen die je
              morgen kan gebruiken. Gerke leest je vraag deze week persoonlijk
              en reageert binnen 2 werkdagen.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full bg-hy">
                <Image
                  src={gerke.portrait}
                  alt={gerke.portraitAlt}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <p className="text-[20px] font-black tracking-heading">
                  {gerke.name}
                </p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-eyebrow text-hb-sec">
                  {gerke.role}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Discovery',
                'CPQ',
                'Visualisatie',
                'ERP / PIM-integratie',
              ].map((line) => (
                <span
                  key={line}
                  className="inline-flex items-center whitespace-nowrap rounded-full border border-hb-sec/30 bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-mono text-hb-sec"
                >
                  {line}
                </span>
              ))}
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
