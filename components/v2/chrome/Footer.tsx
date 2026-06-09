import Link from 'next/link';
import { MerkboekLogo } from '@/components/v2/brand/MerkboekLogo';
import { SmileMark } from '@/components/v2/brand/SmileMark';
import { PartOfHorizon } from '@/components/v2/brand/PartOfHorizon';

const SITE_LINKS = [
  { href: '/v2', label: 'Home' },
  { href: '/v2/aanpak', label: 'Aanpak' },
  { href: '/v2/quickscan', label: 'Quickscan' },
  { href: '/v2#contact', label: 'Contact' },
];

const VESTIGINGEN = [
  'Amsterdam',
  'Arnhem',
  'Den Haag',
  'Eindhoven',
  'Nijmegen',
  'Tilburg',
  'Utrecht',
];

const LEGAL_LINKS = [
  { href: 'https://happyhorizon.com/nl/privacy', label: 'Privacy' },
  { href: 'https://happyhorizon.com/nl/cookies', label: 'Cookies' },
  { href: 'https://happyhorizon.com/nl/voorwaarden', label: 'Algemene voorwaarden' },
];

/**
 * /v2 footer — Merkboek 2026 stijl.
 *
 * Constructie volgt het merkbalk-principe uit de brandbook: smile-mark
 * links, claim ("part of Happy Horizon") rechts daarvan. Boven de merkbalk
 * staat de navigatie in drie kolommen op Ink-achtergrond, Paper-tekst.
 */
export function Footer() {
  return (
    <footer className="bg-mk-ink pb-8 pt-20 text-mk-paper">
      <div className="mx-auto max-w-page px-8">
        <div className="grid gap-14 border-b border-mk-paper/12 pb-14 lg:grid-cols-3">
          <div>
            <Link
              href="https://happyhorizon.com"
              aria-label="Naar happyhorizon.com"
              className="mb-5 inline-block"
            >
              <MerkboekLogo size="md" variant="paper" />
            </Link>
            <p className="max-w-[320px] font-inter text-[13px] leading-relaxed text-mk-paper/65">
              Configurator.nl is een specialisme-site van Happy Horizon.
            </p>
          </div>

          <div>
            <h5 className="mb-5 font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-yellow">
              Site
            </h5>
            <ul className="grid grid-cols-2 gap-y-2 font-inter text-[14px] text-mk-paper/80">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-mk-yellow"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-yellow">
              Vestigingen
            </h5>
            <ul className="grid grid-cols-2 gap-y-2 font-inter text-[14px] text-mk-paper/80">
              {VESTIGINGEN.map((v) => (
                <li key={v}>
                  <a
                    href={`https://happyhorizon.com/nl/vestigingen/${v.toLowerCase().replace(' ', '-')}`}
                    className="transition-colors hover:text-mk-yellow"
                  >
                    {v}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MERKBALK — smile-mark links, claim ("part of Happy Horizon") rechts.
            Legal-links onder, copyright onderaan. */}
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <SmileMark size={18} color="var(--mk-yellow)" />
            <PartOfHorizon variant="paper" className="opacity-80" />
          </div>
          <ul className="flex flex-wrap gap-6 font-inter text-[12px] text-mk-paper/55">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-mk-yellow">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 font-inter text-[11px] text-mk-paper/40">
          © 2026 Happy Horizon
        </p>
      </div>
    </footer>
  );
}
