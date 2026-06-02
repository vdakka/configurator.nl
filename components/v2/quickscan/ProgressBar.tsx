'use client';

import { motion } from 'framer-motion';

/**
 * Quickscan progress — Merkboek 2026 stijl.
 * Ink-tekst op Paper, yellow progress-fill.
 */
export function ProgressBar({
  current,
  total,
  onPrev,
  questionLabel,
  previousLabel,
}: {
  current: number;
  total: number;
  onPrev?: () => void;
  questionLabel: string;
  previousLabel: string;
}) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between font-inter text-[12px] font-semibold text-mk-muted">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="transition-colors hover:text-mk-ink"
          >
            {previousLabel}
          </button>
        ) : (
          <span />
        )}
        <span>
          {questionLabel}{' '}
          <strong className="text-mk-ink">{current + 1}</strong> van{' '}
          <strong className="text-mk-ink">{total}</strong>
        </span>
        <span />
      </div>
      <div className="h-1 w-full overflow-hidden rounded bg-mk-ink/10">
        <motion.div
          className="h-full bg-mk-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0.2, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
