'use client';

/**
 * Quickscan loading — Merkboek 2026 stijl.
 * Ink-bg met yellow accent dots + Instrument Serif titel.
 */
export function LoadingScreen({ title }: { title: string }) {
  return (
    <section className="flex min-h-[640px] flex-col items-center justify-center gap-8 bg-mk-ink px-6 py-20 text-mk-paper">
      <h2 className="font-instrument text-[44px] text-mk-yellow sm:text-[56px] md:text-[64px]">
        {title}
      </h2>
      <div className="flex gap-3" aria-hidden>
        <span
          className="h-3.5 w-3.5 animate-dotPulse rounded-full bg-mk-yellow"
          style={{ animationDelay: '0s' }}
        />
        <span
          className="h-3.5 w-3.5 animate-dotPulse rounded-full bg-mk-yellow"
          style={{ animationDelay: '0.2s' }}
        />
        <span
          className="h-3.5 w-3.5 animate-dotPulse rounded-full bg-mk-yellow"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
      <span className="sr-only" role="status">{title}…</span>
    </section>
  );
}
