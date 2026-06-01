import Link from 'next/link';
import { HappyHorizonLogo } from './HappyHorizonLogo';

const SITE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/aanpak', label: 'Aanpak' },
  { href: '/quickscan', label: 'Quickscan' },
  { href: '/contact', label: 'Contact' },
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

export function Footer() {
  return (
    <footer className="bg-hb pt-20 pb-8 text-white">
      <div className="mx-auto max-w-page px-8">
        <div className="grid gap-14 border-b border-hb-line pb-14 lg:grid-cols-3">
          <div>
            <Link
              href="https://happyhorizon.com"
              aria-label="Naar happyhorizon.com"
              className="mb-5 inline-block"
            >
              <HappyHorizonLogo height={48} variant="white" />
            </Link>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-white/60">
              Configurator.nl is een specialisme-site van Happy Horizon.
            </p>
          </div>

          <div>
            <h5 className="mb-5 mono-label text-[11px] text-hb1">Site</h5>
            <ul className="grid grid-cols-2 gap-y-2 text-[14px] text-white/80">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-hy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 mono-label text-[11px] text-hb1">Vestigingen</h5>
            <ul className="grid grid-cols-2 gap-y-2 text-[14px] text-white/80">
              {VESTIGINGEN.map((v) => (
                <li key={v}>
                  <a
                    href={`https://happyhorizon.com/nl/vestigingen/${v.toLowerCase().replace(' ', '-')}`}
                    className="transition-colors hover:text-hy"
                  >
                    {v}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[12px] text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p>© 2026 Happy Horizon</p>
            <span
              aria-hidden
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-eyebrow text-white/55"
            >
              <span className="h-1.5 w-1.5 animate-livePulse rounded-full bg-[#2bb673]" />
              v1.0 · NL · stable
            </span>
          </div>
          <ul className="flex flex-wrap gap-6">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-hy">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
