'use client';

type Variant = 'yes' | 'no';

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
            ? 'bg-hy text-hb shadow-[0_16px_32px_-6px_rgba(7,7,51,0.25)]'
            : 'border border-hg-line bg-white text-hb-sec hover:shadow-[0_16px_32px_-6px_rgba(7,7,51,0.15)]'
        }`}
      >
        {isYes ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <span className="mono-label text-[11px] text-hb-sec">{label}</span>
    </div>
  );
}
