'use client';

import Image from 'next/image';
import Link from 'next/link';
import { QuickscanForm } from './QuickscanForm';
import type { ResultBucket } from '@/lib/quickscan-logic';
import type { TeamMember } from '@/lib/content';

type ResultCopy = {
  eyebrow: string;
  title: string;
  meta?: string;
  sub: string;
  submit?: string;
  primaryCta?: string;
  replay?: string;
  follow?: string;
};

const BG_BY_BUCKET: Record<ResultBucket, string> = {
  match: 'bg-hy',
  kansen: 'bg-hg',
  nognniet: 'bg-hb',
};

export function ResultScreen({
  bucket,
  score,
  total,
  copy,
  formLabels,
  gerke,
  onSubmitted,
  onReplay,
}: {
  bucket: ResultBucket;
  score: number;
  total: number;
  copy: ResultCopy;
  formLabels: {
    firstName: string;
    lastName: string;
    phone: string;
    linkedin: string;
    email: string;
    consent: string;
  };
  gerke: TeamMember;
  onSubmitted: () => void;
  onReplay: () => void;
}) {
  return (
    <section
      className={`relative flex min-h-[640px] items-center justify-center overflow-hidden px-6 py-16 ${BG_BY_BUCKET[bucket]}`}
    >
      <FloatingShapes bucket={bucket} />

      <article
        className={`relative w-full max-w-[560px] rounded-3xl bg-white px-8 pb-9 pt-9 shadow-[0_40px_80px_-20px_rgba(7,7,51,0.25),0_10px_24px_-8px_rgba(7,7,51,0.15)] sm:px-10`}
      >
        <span className="mono-label text-[10px] text-hb-sec">{copy.eyebrow}</span>
        <span className="ml-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-hg px-2.5 py-1 font-mono text-[10px] font-bold text-hb-sec">
          Jouw score
          <span className="rounded bg-hb px-1.5 py-0.5 text-white">
            {score} / {total}
          </span>
        </span>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-[32px] font-black leading-[1] tracking-display text-hb sm:text-[40px] md:text-[44px]">
              {copy.title}
            </h2>
            {copy.meta && (
              <p className="mt-3 font-mono text-[11px] text-hb-sec">{copy.meta}</p>
            )}
          </div>
          {bucket !== 'nognniet' && (
            <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full bg-hy sm:h-[100px] sm:w-[100px]">
              <Image
                src={gerke.portrait}
                alt={gerke.portraitAlt}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-hb/80">{copy.sub}</p>

        <div className="mt-7">
          {bucket === 'match' && (
            <QuickscanForm
              fieldSet="full"
              submit={copy.submit ?? 'Verzenden'}
              labels={formLabels}
              resultBucket={bucket}
              score={score}
              onSubmitted={onSubmitted}
            />
          )}
          {bucket === 'kansen' && (
            <QuickscanForm
              fieldSet="short"
              submit={copy.submit ?? 'Verzenden'}
              labels={formLabels}
              resultBucket={bucket}
              score={score}
              onSubmitted={onSubmitted}
            />
          )}
          {bucket === 'nognniet' && (
            <div className="flex flex-col gap-3">
              <Link
                href="/inspiratiestuk.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-hb px-5 py-3.5 text-[14px] font-bold text-white hover:bg-hb-soft"
              >
                {copy.primaryCta ?? 'Download inspiratiestuk'} <span aria-hidden>↓</span>
              </Link>
              <button
                type="button"
                onClick={onReplay}
                className="text-center text-[13px] font-bold text-hb-sec underline decoration-2 underline-offset-4 hover:text-hb"
              >
                {copy.replay ?? '↻ Speel opnieuw'}
              </button>
            </div>
          )}
        </div>

        {bucket !== 'nognniet' && (
          <div className="mt-6 flex items-center justify-between border-t border-hg-line pt-5 text-[12px] text-hb-sec">
            <Link
              href="https://www.linkedin.com/company/happy-horizon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-hb hover:text-hb-soft"
            >
              {copy.follow ?? 'Volg ons'}
              <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-sm bg-hb font-bold text-white">
                in
              </span>
            </Link>
            <button
              type="button"
              onClick={onReplay}
              className="underline decoration-2 underline-offset-4 hover:text-hb"
            >
              Speel opnieuw
            </button>
          </div>
        )}
      </article>
    </section>
  );
}

function FloatingShapes({ bucket }: { bucket: ResultBucket }) {
  const dots =
    bucket === 'match'
      ? ['bg-white/40', 'bg-hb/10', 'bg-white/30', 'bg-hb/15']
      : bucket === 'kansen'
        ? ['bg-hy/60', 'bg-hb/10', 'bg-hy/40', 'bg-white/40']
        : ['bg-hy/30', 'bg-hy/20', 'bg-hy/40', 'bg-hy/15'];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {dots.map((cls, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${cls} animate-float${(i % 3) + 1}`}
          style={{
            top: `${10 + i * 20}%`,
            left: i % 2 === 0 ? `${5 + i * 10}%` : 'auto',
            right: i % 2 !== 0 ? `${5 + i * 10}%` : 'auto',
            width: `${70 + i * 20}px`,
            height: `${70 + i * 20}px`,
          }}
        />
      ))}
    </div>
  );
}
