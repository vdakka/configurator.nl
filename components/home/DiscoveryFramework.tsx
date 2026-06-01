'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { SectionId } from '@/components/ui/SectionId';
import { DiscoveryGlyph } from './DiscoveryGlyph';
import type { HomepageContent } from '@/lib/content';

export function DiscoveryFramework({
  data,
}: {
  data: HomepageContent['discovery'];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Cycle through the 4 steps continuously to keep the section "alive"
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % data.axes.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [inView, data.axes.length]);

  return (
    <section
      id="discovery"
      ref={ref}
      className="relative overflow-hidden bg-hb py-24 text-white sm:py-28"
    >
      <SectionId num="06" label="aanpak" tone="light" />
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(112,184,255,0.10), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        {/* HEADER — eyebrow, H2 + lede tight together */}
        <div className="max-w-[900px]">
          <Eyebrow tone="yellow">{data.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[36px] font-black leading-[1.05] tracking-display sm:text-[44px] md:text-[56px]">
            {data.title}
          </h2>
          <p className="mt-5 max-w-[700px] text-[16px] leading-[1.6] text-white/72 md:text-[18px]">
            {data.lede}
          </p>
        </div>

        {/* SEQUENTIAL STEPPER */}
        <div className="mt-16 sm:mt-20">
          {/* Connecting line + traveling pulse (desktop) */}
          <div className="relative hidden lg:block">
            <div className="absolute left-[6%] right-[6%] top-[40px] h-px bg-white/15" aria-hidden />
            {inView && (
              <motion.div
                aria-hidden
                className="absolute top-[34px] h-3 w-3 rounded-full bg-hy shadow-[0_0_18px_rgba(252,229,18,0.7)]"
                initial={{ left: '6%' }}
                animate={{ left: ['6%', '34%', '62%', '94%', '6%'] }}
                transition={{
                  duration: 12.8,
                  ease: 'linear',
                  repeat: Infinity,
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              />
            )}
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {data.axes.map((axis, i) => (
              <StepCard
                key={axis.id}
                axis={axis}
                index={i}
                isActive={activeStep === i}
                onSelect={() => setActiveStep(i)}
                inView={inView}
              />
            ))}
          </ol>
        </div>

        <div className="mt-16 flex justify-end">
          <Button href="/aanpak" variant="primary">
            {data.cta} <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  axis,
  index,
  isActive,
  onSelect,
  inView,
}: {
  axis: HomepageContent['discovery']['axes'][number];
  index: number;
  isActive: boolean;
  onSelect: () => void;
  inView: boolean;
}) {
  return (
    <li
      className="relative"
      onMouseEnter={onSelect}
      onFocus={onSelect}
    >
      <button
        type="button"
        onClick={onSelect}
        className="block w-full text-left focus-visible:outline-none"
      >
        {/* Number badge + glyph node on the line */}
        <div className="relative flex items-center gap-4">
          <motion.div
            aria-hidden
            className={`flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full border-2 ${
              isActive ? 'border-hy bg-hy text-hb' : 'border-white/20 bg-hb-soft text-white/70'
            }`}
            animate={{
              scale: isActive ? 1.06 : 1,
              boxShadow: isActive
                ? '0 0 0 6px rgba(252,229,18,0.18), 0 0 30px rgba(252,229,18,0.25)'
                : '0 0 0 0 rgba(252,229,18,0)',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <DiscoveryGlyph glyph={axis.glyph} className="h-9 w-9" />
          </motion.div>
          <div className="lg:hidden">
            <span className="mono-label text-[10px] text-hb1">Stap {String(index + 1).padStart(2, '0')}</span>
            <p className="mt-1 text-[20px] font-black tracking-heading text-white">{axis.label}</p>
          </div>
        </div>

        <div className="mt-6 hidden lg:block">
          <span className="mono-label text-[10px] text-hb1">Stap {String(index + 1).padStart(2, '0')}</span>
          <p className="mt-2 text-[20px] font-black tracking-heading text-white">{axis.label}</p>
        </div>

        {/* Detail block — always visible on mobile, animated on desktop */}
        <motion.div
          className="mt-4 overflow-hidden lg:mt-3"
          animate={{ opacity: isActive ? 1 : 0.55 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[14px] leading-[1.5] text-white/75">{axis.detailBody}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {axis.chips.slice(0, 3).map((chip) => (
              <li
                key={chip}
                className={`rounded-sm border px-1.5 py-0.5 font-mono text-[10px] ${
                  isActive ? 'border-hy/50 text-hy' : 'border-white/15 text-white/55'
                }`}
              >
                {chip}
              </li>
            ))}
          </ul>
        </motion.div>
      </button>

      {/* Animated "drawing" hint when inView for first time */}
      {!inView && <span aria-hidden className="absolute inset-0" />}
    </li>
  );
}
