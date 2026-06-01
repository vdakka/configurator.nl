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
  /** When the parent wants to swipe this card out programmatically (button click,
   * keyboard arrow), it bumps `exitSignal.nonce`. The card animates and then
   * calls `onCommit`. Only honored by the front card (depth 0). */
  exitSignal?: ExitSignal | null;
};

const SWIPE_THRESHOLD = 100;
const STAMP_FADE_DISTANCE = 80;
const EXIT_DISTANCE = 600;
const EXIT_DURATION = 0.35;

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

  // Watch exitSignal — parent bumps nonce when a button/key triggers a swipe.
  // We use a ref to remember the last handled nonce so the effect only fires
  // when a *new* signal arrives (not on initial mount with a leftover signal).
  const lastNonceRef = useRef<number | null>(null);
  useEffect(() => {
    if (!exitSignal || !isFront) return;
    if (lastNonceRef.current === exitSignal.nonce) return;
    lastNonceRef.current = exitSignal.nonce;
    commitWithAnimation(exitSignal.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exitSignal?.nonce, isFront]);

  // Reset committed flag when statement changes (extra safety; in practice the
  // component unmounts/remounts on statement change via the key prop).
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
        className="absolute inset-0 rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(7,7,51,0.25),0_8px_24px_-10px_rgba(7,7,51,0.15)]"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
        }}
      />
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab touch-none select-none rounded-3xl bg-white p-8 pt-14 shadow-[0_30px_80px_-20px_rgba(7,7,51,0.25),0_8px_24px_-10px_rgba(7,7,51,0.15)] active:cursor-grabbing"
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
        className="absolute right-7 top-9 rounded-md border-[3px] border-hb bg-hy px-4 py-2 font-mono text-[14px] font-black uppercase tracking-mono text-hb"
        style={{ opacity: yesOpacity, rotate: -12 }}
      >
        {stampYes}
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute left-7 top-9 rounded-md border-[3px] border-hb-sec bg-hg px-4 py-2 font-mono text-[14px] font-black uppercase tracking-mono text-hb-sec"
        style={{ opacity: noOpacity, rotate: 12 }}
      >
        {stampNo}
      </motion.div>

      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between font-mono text-[11px] font-bold text-hb-sec">
          <span className="uppercase tracking-mono">{statementLabel}</span>
          <span>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <p className="mt-8 flex-1 text-balance text-[24px] font-black leading-snug tracking-display text-hb sm:text-[28px] md:text-[30px]">
          {statement.text}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-hg-line pt-4 text-[10px] font-bold uppercase tracking-mono text-hb-sec">
          <span>{hintNo}</span>
          <span>{hintYes}</span>
        </div>
      </div>
    </motion.div>
  );
}
