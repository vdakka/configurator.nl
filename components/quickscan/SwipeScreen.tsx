'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SwipeCard } from './SwipeCard';
import { ProgressBar } from './ProgressBar';
import { RoundActionButton } from './RoundActionButton';
import type { Statement } from '@/lib/content';
import type { Answer } from '@/lib/quickscan-logic';

type SwipeCopy = {
  statementLabel: string;
  hintNo: string;
  hintYes: string;
  stampYes: string;
  stampNo: string;
  buttonYes: string;
  buttonNo: string;
  keyboardHint: string;
  previous: string;
  questionLabel: string;
};

export function SwipeScreen({
  questions,
  index,
  copy,
  onCommit,
  onPrev,
}: {
  questions: Statement[];
  index: number;
  copy: SwipeCopy;
  onCommit: (answer: Answer) => void;
  onPrev: () => void;
}) {
  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onCommit('yes');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onCommit('no');
      } else if (e.key === 'ArrowUp' && index > 0) {
        e.preventDefault();
        onPrev();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onCommit, onPrev]);

  const current = questions[index];
  const next = questions[index + 1];
  const afterNext = questions[index + 2];

  if (!current) return null;

  return (
    <section className="flex min-h-[640px] flex-col items-center bg-hg px-6 py-12 sm:py-16">
      <div className="w-full max-w-[720px]">
        <ProgressBar
          current={index}
          total={questions.length}
          onPrev={index > 0 ? onPrev : undefined}
          questionLabel={copy.questionLabel}
          previousLabel={copy.previous}
        />
      </div>

      <div className="relative mx-auto mt-10 h-[440px] w-full max-w-[480px] sm:h-[480px]">
        <AnimatePresence>
          {afterNext && (
            <SwipeCard
              key={`${afterNext.id}-2`}
              statement={afterNext}
              index={index + 2}
              total={questions.length}
              onCommit={() => {}}
              depth={2}
              {...copy}
            />
          )}
          {next && (
            <SwipeCard
              key={`${next.id}-1`}
              statement={next}
              index={index + 1}
              total={questions.length}
              onCommit={() => {}}
              depth={1}
              {...copy}
            />
          )}
          <SwipeCard
            key={`${current.id}-front`}
            statement={current}
            index={index}
            total={questions.length}
            onCommit={onCommit}
            depth={0}
            {...copy}
          />
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-7">
        <RoundActionButton variant="no" label={copy.buttonNo} onClick={() => onCommit('no')} />
        <RoundActionButton variant="yes" label={copy.buttonYes} onClick={() => onCommit('yes')} />
      </div>

      <p className="mt-8 font-mono text-[11px] text-hb-sec/70">{copy.keyboardHint}</p>
    </section>
  );
}
