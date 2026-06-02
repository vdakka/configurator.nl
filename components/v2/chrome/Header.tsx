import Link from 'next/link';
import { MerkboekLogo } from '@/components/v2/brand/MerkboekLogo';

const NAV_LINKS = [
  { href: '/v2', label: 'Home' },
  { href: '/v2/aanpak', label: 'Aanpak' },
  { href: '/v2/contact', label: 'Contact' },
] as const;

/**
 * /v2 header — Merkboek 2026 stijl.
 *
 * - Ink-on-Paper, Inter nav-labels
 * - `<MerkboekLogo>` lowercase "happy *horizon*" + smile-mark links
 * - Geel CTA-pill rechts (spoor 01 — conversie-moment)
 * - Sticky met subtiele Paper-backdrop blur, Ink-border-line van 10% dekking
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-mk-ink/10 bg-mk-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-8 py-5">
        <Link
          href="/v2"
          aria-label="configurator.nl — Naar de homepage"
          className="inline-flex items-center"
        >
          <MerkboekLogo size="sm" variant="ink" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-inter text-[14px] font-medium text-mk-ink transition-colors hover:text-mk-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/v2/contact"
          className="inline-flex items-center gap-2 rounded-full bg-mk-yellow px-5 py-3 font-inter text-[14px] font-semibold text-mk-ink transition-transform hover:-translate-y-0.5"
        >
          Plan een gesprek
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
