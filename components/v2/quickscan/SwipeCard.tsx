'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { Statement } from '@/lib/content';
import type { Answer } from '@/lib/quickscan-logic';

export type ExitSignal = { direction: Answer; nonce: number };

type Props = {
  statement: Statement;
  index: number;
  total: number;
  onCommit: (answer: Answer) => void;
  depth: 0 | 1 | 2;
  stampYes: string;
  stampNo: string;
  hintNo: string;
  hintYes: string;
  statementLabel: string;
  exitSignal?: ExitSignal | null;
};

const SWIPE_THRESHOLD = 100;
const STAMP_FADE_DISTANCE = 80;
const EXIT_DISTANCE = 600;
const EXIT_DURATION = 0.35;

/**
 * Swipe-card — Merkboek 2026 stijl.
 * Paper-card met Ink-tekst, Yellow yes-stamp + Beige no-stamp. Drag-x logica
 * is identiek aan het origineel; alleen colors/typography zijn ge-port.
 */
export function SwipeCard({
  statement,
  index,
  total,
  onCommit,
  depth,
  stampYes,
  stampNo,
  hintNo,
  hintYes,
  statementLabel,
  exitSignal,
}: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const yesOpacity = useTransform(x, [0, STAMP_FADE_DISTANCE], [0, 1]);
  const noOpacity = useTransform(x, [-STAMP_FADE_DISTANCE, 0], [1, 0]);
  const committedRef = useRef(false);

  const isFront = depth === 0;

  function commitWithAnimation(direction: Answer) {
    if (committedRef.current) return;
    committedRef.current = true;
    const target = direction === 'yes' ? EXIT_DISTANCE : -EXIT_DISTANCE;
    animate(x, target, {
      duration: EXIT_DURATION,
      ease: 'easeOut',
      onComplete: () => onCommit(direction),
    });
  }

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (committedRef.current) return;
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      commitWithAnimation(info.offset.x > 0 ? 'yes' : 'no');
    }
  };

  const lastNonceRef = useRef<number | null>(null);
  useEffect(() => {
    if (!exitSignal || !isFront) return;
    if (lastNonceRef.current === exitSignal.nonce) return;
    lastNonceRef.current = exitSignal.nonce;
    commitWithAnimation(exitSignal.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exitSignal?.nonce, isFront]);

  useEffect(() => {
    committedRef.current = false;
    x.set(0);
  }, [statement.id, x]);

  if (!isFront) {
    const scale = depth === 1 ? 0.94 : 0.88;
    const translateY = depth === 1 ? 16 : 28;
    const opacity = depth === 1 ? 0.7 : 0.4;
    return (
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl bg-mk-paper shadow-[0_30px_80px_-20px_rgba(17,20,28,0.20),0_8px_24px_-10px_rgba(17,20,28,0.12)]"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
        }}
      />
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab touch-none select-none rounded-3xl bg-mk-paper p-8 pt-14 shadow-[0_30px_80px_-20px_rgba(17,20,28,0.20),0_8px_24px_-10px_rgba(17,20,28,0.12)] active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      style={{ x, rotate }}
      onDragEnd={handleDragEnd}
      role="group"
      aria-live="polite"
    >
      {/* Stamps */}
      <motion.div
        aria-hidden
        className="absolute right-7 top-9 rounded-md border-[3px] border-mk-ink bg-mk-yellow px-4 py-2 font-inter text-[14px] font-bold uppercase tracking-[0.12em] text-mk-ink"
        style={{ opacity: yesOpacity, rotate: -12 }}
      >
        {stampYes}
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute left-7 top-9 rounded-md border-[3px] border-mk-muted bg-mk-beige px-4 py-2 font-inter text-[14px] font-bold uppercase tracking-[0.12em] text-mk-muted"
        style={{ opacity: noOpacity, rotate: 12 }}
      >
        {stampNo}
      </motion.div>

      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
          <span>{statementLabel}</span>
          <span>
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
        </div>
        <p className="mt-8 flex-1 text-balance font-instrument text-[26px] leading-snug text-mk-ink sm:text-[30px] md:text-[32px]">
          {statement.text}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-mk-ink/10 pt-4 font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
          <span>{hintNo}</span>
          <span>{hintYes}</span>
        </div>
      </div>
    </motion.div>
  );
}
