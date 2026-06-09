'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ThreeDShape } from '@/components/ui/ThreeDShape';
import type { AanpakContent } from '@/lib/content';

type Tab = 'questions' | 'deliverables';

/**
 * Interactive playground voor de vier Discovery-assen.
 *
 * Per as: een kaart met tab-segment (Vragen / Wat krijg je) die zonder
 * page-reload kan switchen. Kaarten faden + slide-in op scroll-into-view
 * met stagger. Bewust modern naast de statische voorganger; behoudt
 * dark-bg HH-look (bg-hb + white tekst + yellow accents).
 */
export function AxesDeepdive({
  intro,
  axes,
}: {
  intro: AanpakContent['axesIntro'];
  axes: AanpakContent['axes'];
}) {
  return (
    <section className="bg-hb py-24 text-white sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow tone="yellow">{intro.eyebrow}</Eyebrow>
        <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-display sm:text-[52px] md:text-[68px]">
          {intro.title}
          <br />
          <span className="text-white/60">{intro.titleSub}</span>
        </h2>
        <p className="mt-6 max-w-[720px] text-[17px] leading-relaxed text-white/70 md:text-[19px]">
          {intro.lede}
        </p>

        <ol className="mt-16 grid gap-6 lg:grid-cols-2">
          {axes.map((axis, i) => (
            <AxisCard key={axis.id} axis={axis} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function AxisCard({
  axis,
  index,
}: {
  axis: AanpakContent['axes'][number];
  index: number;
}) {
  const [tab, setTab] = useState<Tab>('questions');
  return (
    <motion.li
      id={axis.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative flex scroll-mt-32 flex-col rounded-2xl border border-hb-line bg-hb-soft p-7 transition-colors hover:border-hy/40 sm:p-8"
    >
      {/* Header — tag, shape, title, sub */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <span
            aria-hidden
            className="inline-flex items-center rounded-full border border-hb1/40 bg-hb px-3 py-1 font-mono text-[10px] uppercase tracking-mono text-hb1"
          >
            {axis.tag}
          </span>
          <h3 className="mt-4 text-[22px] font-black leading-tight tracking-heading sm:text-[26px]">
            {axis.title}
          </h3>
          <p className="mt-2 text-[14px] text-white/65">{axis.titleSub}</p>
        </div>
        <ThreeDShape
          shape={axis.shape}
          size={84}
          className="shrink-0 animate-float1 opacity-90"
        />
      </header>

      <p className="mt-5 text-[15px] leading-relaxed text-white/80">
        {axis.intro}
      </p>

      {/* Tab segment control */}
      <div
        role="tablist"
        aria-label={`${axis.title} — kies inhoud`}
        className="mt-7 inline-flex w-fit gap-1 rounded-full bg-hb p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'questions'}
          onClick={() => setTab('questions')}
          className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-mono transition-colors ${
            tab === 'questions'
              ? 'bg-hy text-hb'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Vragen ({axis.questions.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'deliverables'}
          onClick={() => setTab('deliverables')}
          className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-mono transition-colors ${
            tab === 'deliverables'
              ? 'bg-hy text-hb'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Wat krijg je ({axis.deliverables.length})
        </button>
      </div>

      {/* Tab content — cross-fade switch */}
      <div className="relative mt-5 min-h-[180px]">
        <AnimatePresence mode="wait" initial={false}>
          {tab === 'questions' ? (
            <motion.ul
              key="questions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {axis.questions.map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-3 text-[14px] leading-relaxed text-white/85"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 font-mono font-bold text-hy"
                  >
                    ?
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.ul
              key="deliverables"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {axis.deliverables.map((d) => (
                <li
                  key={d}
                  className="inline-flex items-center rounded-full border border-hy/40 bg-hb px-3 py-1.5 text-[13px] font-semibold text-hy"
                >
                  {d}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
