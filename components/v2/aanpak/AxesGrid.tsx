'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill } from '@/components/v2/ui/Pill';
import { Icon, type IconName } from '@/components/v2/ui/Icon';
import type { AanpakContent } from '@/lib/content';

type Tab = 'questions' | 'deliverables';

const SHAPE_TO_ICON: Record<string, IconName> = {
  sphereY: 'target',
  sphereY2: 'target',
  sphereB: 'target',
  smallCubeB: 'figures',
  smallCubeY: 'figures',
  smallCubeY2: 'figures',
  bigTubeY: 'nodes',
  bigTubeY2: 'nodes',
  bigTubeB: 'nodes',
  capB: 'nodes',
  cubeY: 'chip',
};

/**
 * Interactive playground voor de vier Discovery-assen (v2/merkboek).
 *
 * Per as: kaart met tab-switch (Vragen / Wat krijg je) zonder page-reload.
 * Scroll-fade entry per kaart met stagger. Lime accent op active tab past
 * in spoor 02 "Toekomst". Geen 3D-shapes — alleen merkboek-iconen.
 */
export function AxesGrid({
  intro,
  axes,
}: {
  intro: AanpakContent['axesIntro'];
  axes: AanpakContent['axes'];
}) {
  return (
    <section className="relative bg-mk-beige py-24 sm:py-28">
      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="service">{intro.eyebrow}</Pill>
        <h2 className="mk-h2 mt-7 max-w-[800px] text-balance text-mk-ink">
          {intro.title}{' '}
          <span className="italic text-mk-ink/70">{intro.titleSub}</span>
        </h2>
        <p className="mk-body mt-7 max-w-[700px] text-[17px] leading-[1.6] text-mk-ink/75 md:text-[18px]">
          {intro.lede}
        </p>

        <ol className="mt-14 grid gap-6 lg:grid-cols-2">
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group flex flex-col gap-5 rounded-2xl border border-mk-ink/15 bg-mk-paper p-7 transition-colors hover:border-mk-ink/40 sm:p-8"
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
            {axis.tag}
          </span>
          <h3 className="mt-2 font-instrument text-[24px] leading-tight text-mk-ink sm:text-[26px]">
            {axis.title}
          </h3>
          <p className="mt-2 font-instrument text-[16px] italic text-mk-ink/65">
            {axis.titleSub}
          </p>
        </div>
        <Icon
          name={SHAPE_TO_ICON[axis.shape] ?? 'chip'}
          size={36}
          className="shrink-0 text-mk-lime"
        />
      </header>

      <p className="font-inter text-[15px] leading-[1.6] text-mk-ink/75">
        {axis.intro}
      </p>

      {/* Tab segment control */}
      <div
        role="tablist"
        aria-label={`${axis.title} — kies inhoud`}
        className="inline-flex w-fit gap-1 rounded-full bg-mk-beige p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'questions'}
          onClick={() => setTab('questions')}
          className={`rounded-full px-4 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${
            tab === 'questions'
              ? 'bg-mk-lime text-mk-ink'
              : 'text-mk-muted hover:text-mk-ink'
          }`}
        >
          Vragen ({axis.questions.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'deliverables'}
          onClick={() => setTab('deliverables')}
          className={`rounded-full px-4 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${
            tab === 'deliverables'
              ? 'bg-mk-lime text-mk-ink'
              : 'text-mk-muted hover:text-mk-ink'
          }`}
        >
          Wat krijg je ({axis.deliverables.length})
        </button>
      </div>

      {/* Tab content cross-fade */}
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait" initial={false}>
          {tab === 'questions' ? (
            <motion.ul
              key="questions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 font-inter text-[14px] leading-[1.55] text-mk-ink/80"
            >
              {axis.questions.map((q) => (
                <li key={q} className="flex gap-2">
                  <span aria-hidden className="font-semibold text-mk-ink/50">
                    →
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
              className="flex flex-wrap gap-1.5"
            >
              {axis.deliverables.map((d) => (
                <li key={d}>
                  <Pill variant="category" size="sm">
                    {d}
                  </Pill>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
