import Link from 'next/link';
import { HappyHorizonLogo } from './HappyHorizonLogo';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/aanpak', label: 'Aanpak' },
  { href: '/cases', label: 'Cases' },
  { href: '/branches/b2b', label: 'Branches' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hg-line/60 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between px-8 py-4">
        <Link href="/" aria-label="Naar de homepage" className="inline-flex items-center">
          <HappyHorizonLogo height={36} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-semibold text-hb transition-colors hover:text-hb-sec"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-hy px-5 py-3 text-[14px] font-bold text-hb transition-transform hover:-translate-y-0.5"
        >
          Plan een gesprek
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
