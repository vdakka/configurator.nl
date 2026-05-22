'use client';

import { motion } from 'framer-motion';

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
      <div className="mb-3 flex items-center justify-between text-[12px] font-bold text-hb-sec">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="font-mono transition-colors hover:text-hb"
          >
            {previousLabel}
          </button>
        ) : (
          <span />
        )}
        <span className="font-mono">
          {questionLabel} <strong className="text-hb">{current + 1}</strong> van{' '}
          <strong className="text-hb">{total}</strong>
        </span>
        <span />
      </div>
      <div className="h-1 w-full overflow-hidden rounded bg-hb/[0.08]">
        <motion.div
          className="h-full bg-hy"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0.2, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
