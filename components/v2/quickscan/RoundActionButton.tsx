'use client';

type Variant = 'yes' | 'no';

/**
 * Yes/No actie-knop onder de swipe-card — Merkboek 2026 stijl.
 */
export function RoundActionButton({
  variant,
  label,
  onClick,
}: {
  variant: Variant;
  label: string;
  onClick: () => void;
}) {
  const isYes = variant === 'yes';
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`flex h-16 w-16 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 active:scale-95 sm:h-[72px] sm:w-[72px] ${
          isYes
            ? 'bg-mk-yellow text-mk-ink shadow-[0_16px_32px_-6px_rgba(17,20,28,0.25)]'
            : 'border border-mk-ink/20 bg-mk-paper text-mk-muted hover:shadow-[0_16px_32px_-6px_rgba(17,20,28,0.12)]'
        }`}
      >
        {isYes ? (
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        )}
      </button>
      <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
        {label}
      </span>
    </div>
  );
}
