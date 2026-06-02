import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getStatements, getQuickscanMicrocopy, getGerke } from '@/lib/content';
import { Pill } from '@/components/v2/ui/Pill';

const QuickscanApp = dynamic(
  () =>
    import('@/components/quickscan/QuickscanApp').then((m) => m.QuickscanApp),
  { ssr: false, loading: () => <LoadingFallback /> },
);

export const metadata: Metadata = {
  title: 'Quickscan (v2)',
  description:
    'Tien stellingen, vijf minuten. Ontdek of een productconfigurator past bij jouw bedrijf en welke as je het eerst moet aanpakken.',
};

/**
 * /v2/quickscan — wrapper rond de bestaande `QuickscanApp`.
 *
 * NB: De interne swipe-screens van `QuickscanApp` (SwipeScreen, ResultScreen,
 * ProfileScreen) gebruiken nog `bg-hg/bg-hb/bg-hy` tokens. Een volledige
 * port naar `mk-*` tokens is een aparte refactor (volgt in een follow-up).
 * Voor nu krijgt de pagina-context (intro-banner + chrome) wel de
 * merkboek-stijl, en blijven de interne screens functioneel identiek aan
 * /quickscan zodat de quiz onveranderd werkt.
 */
export default function QuickscanV2Page({
  searchParams,
}: {
  searchParams?: { start?: string };
}) {
  const statements = getStatements();
  const microcopy = getQuickscanMicrocopy();
  const gerke = getGerke();
  const initialScreen = searchParams?.start === '1' ? 'profile' : 'intro';
  return (
    <>
      {/* Intro-banner in merkboek-stijl boven de quiz */}
      <section className="bg-mk-paper px-6 pt-12 pb-2 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-page">
          <Pill variant="service">Quickscan · 2 minuten</Pill>
          <h1 className="mk-h2 mt-6 max-w-[820px] text-balance text-mk-ink">
            Past een configurator bij{' '}
            <span className="italic">jouw bedrijf</span>?
          </h1>
          <p className="mk-body mt-5 max-w-[640px] text-[16px] leading-[1.6] text-mk-ink/75">
            10 stellingen, 2 minuten. Je ziet direct of een configurator bij
            jouw verkoopproces past, en op welk niveau.
          </p>
          <p className="mt-5 font-inter text-[12px] text-mk-muted">
            <Link
              href="/v2"
              className="underline decoration-mk-yellow decoration-2 underline-offset-4 hover:text-mk-ink"
            >
              ← Terug naar /v2 homepage
            </Link>
          </p>
        </div>
      </section>

      <QuickscanApp
        statements={statements}
        microcopy={microcopy}
        gerke={gerke}
        initialScreen={initialScreen}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex min-h-[640px] items-center justify-center bg-mk-paper">
      <span className="font-inter text-[12px] text-mk-muted">
        Quickscan laadt…
      </span>
    </div>
  );
}
