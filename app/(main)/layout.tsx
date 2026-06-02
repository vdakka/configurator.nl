import { Header } from '@/components/chrome/Header';
import { Footer } from '@/components/chrome/Footer';

/**
 * Layout voor de huidige Happy Horizon-stijl site (/, /aanpak, /quickscan,
 * /contact, /cases, /branches). De route group `(main)` is bewust onzichtbaar
 * in de URL: pagina's blijven exact dezelfde paden houden.
 *
 * Parallel hieraan rendert `app/v2/layout.tsx` de Merkboek 2026-versie.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
