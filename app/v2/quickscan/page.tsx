import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getStatements, getQuickscanMicrocopy, getGerke } from '@/lib/content';

const QuickscanApp = dynamic(
  () =>
    import('@/components/v2/quickscan/QuickscanApp').then(
      (m) => m.QuickscanApp,
    ),
  { ssr: false, loading: () => <LoadingFallback /> },
);

export const metadata: Metadata = {
  title: 'Quickscan (v2)',
  description:
    'Tien stellingen, vijf minuten. Ontdek of een productconfigurator past bij jouw bedrijf en welke as je het eerst moet aanpakken.',
};

/**
 * /v2/quickscan — volledige Merkboek 2026 versie.
 *
 * De internals (Intro/Profile/Swipe/Loading/Result/Thanks) zitten allemaal
 * in `components/v2/quickscan/` met mk-* tokens. Geen intro-banner meer
 * boven de quiz — elk screen zorgt zelf voor zijn eigen context-koppen,
 * zonder duplicatie.
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
    <QuickscanApp
      statements={statements}
      microcopy={microcopy}
      gerke={gerke}
      initialScreen={initialScreen}
    />
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
