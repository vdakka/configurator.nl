'use client';

export function LoadingScreen({ title }: { title: string }) {
  return (
    <section className="flex min-h-[640px] flex-col items-center justify-center gap-8 bg-hb px-6 py-20 text-white">
      <h2 className="text-[44px] font-black tracking-display text-hy sm:text-[56px] md:text-[64px]">
        {title}
      </h2>
      <div className="flex gap-3" aria-hidden>
        <span className="h-3.5 w-3.5 animate-dotPulse rounded-full bg-hy" style={{ animationDelay: '0s' }} />
        <span className="h-3.5 w-3.5 animate-dotPulse rounded-full bg-hy" style={{ animationDelay: '0.2s' }} />
        <span className="h-3.5 w-3.5 animate-dotPulse rounded-full bg-hy" style={{ animationDelay: '0.4s' }} />
      </div>
      <span className="sr-only" role="status">{title}…</span>
    </section>
  );
}
