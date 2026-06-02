import type { Metadata } from 'next';
import { Header } from '@/components/v2/chrome/Header';
import { Footer } from '@/components/v2/chrome/Footer';

export const metadata: Metadata = {
  // /v2 is een work-in-progress merkboek-rebrand. Noindex/nofollow zolang
  // we de definitieve cut-over niet hebben gemaakt — voorkomt duplicate
  // content t.o.v. de huidige live site.
  robots: { index: false, follow: false },
};

/**
 * /v2 layout — Merkboek 2026.
 *
 * Parallel naast `app/(main)/layout.tsx` (huidige Happy Horizon stijl).
 * Beide layouts erven van dezelfde root (`app/layout.tsx`) waarin alleen
 * de fonts en `<html>`/`<body>`-shell zitten.
 *
 * Default body-vlak = Paper, default text = Ink, default font = Inter.
 * v2-componenten gebruiken expliciet `mk-*` tokens en `font-instrument`
 * voor display-koppen.
 */
export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-mk-paper font-inter text-mk-ink">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
