import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getStatements, getQuickscanMicrocopy, getGerke } from '@/lib/content';
import { QuizSchema } from '@/lib/schema-org';
import { WebMCPRegistration } from '@/components/quickscan/WebMCPRegistration';

const QuickscanApp = dynamic(
  () => import('@/components/quickscan/QuickscanApp').then((m) => m.QuickscanApp),
  { ssr: false, loading: () => <LoadingFallback /> },
);

export const metadata: Metadata = {
  title: 'Quickscan, past een configurator bij jouw bedrijf?',
  description:
    'Tien stellingen, vijf minuten. Ontdek of een productconfigurator past bij jouw bedrijf en welke as je het eerst moet aanpakken.',
  alternates: { canonical: '/quickscan' },
  robots: { index: true, follow: true },
};

export default function QuickscanPage({
  searchParams,
}: {
  searchParams?: { start?: string };
}) {
  const statements = getStatements();
  const microcopy = getQuickscanMicrocopy();
  const gerke = getGerke();
  // ?start=1 → skip intro and go directly to the profile question
  const initialScreen = searchParams?.start === '1' ? 'profile' : 'intro';
  return (
    <>
      <QuizSchema />
      <WebMCPRegistration statements={statements} />
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
    <div className="flex min-h-[640px] items-center justify-center bg-white">
      <span className="font-mono text-[12px] text-hb-sec">Quickscan laadt…</span>
    </div>
  );
}
