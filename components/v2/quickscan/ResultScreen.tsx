'use client';

import Image from 'next/image';
import Link from 'next/link';
import { QuickscanForm } from './QuickscanForm';
import { Pill } from '@/components/v2/ui/Pill';
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

/**
 * Bucket → section-bg (merkboek). Match = yellow, kansen = beige,
 * nognniet = ink (donker afsluiten als reflectief negatief signaal).
 */
const BG_BY_BUCKET: Record<ResultBucket, string> = {
  match: 'bg-mk-yellow',
  kansen: 'bg-mk-beige',
  nognniet: 'bg-mk-ink',
};

/**
 * Quickscan resultaat — Merkboek 2026 stijl.
 *
 * Card op Paper, score-pill onder eyebrow. Gebruikt de transparante
 * `portraitV2` met beige disc achter het portret zodat de groene shirt
 * goed contrasteert.
 */
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
  const portrait = gerke.portraitV2 ?? gerke.portrait;
  return (
    <section
      className={`relative flex min-h-[640px] items-center justify-center overflow-hidden px-6 py-16 ${BG_BY_BUCKET[bucket]}`}
    >
      <article className="relative w-full max-w-[560px] rounded-3xl bg-mk-paper px-8 pb-9 pt-9 shadow-[0_40px_80px_-20px_rgba(17,20,28,0.25),0_10px_24px_-8px_rgba(17,20,28,0.15)] sm:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <Pill variant="category" size="sm">
            {copy.eyebrow}
          </Pill>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-mk-ink px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-paper">
            Jouw score
            <span className="rounded bg-mk-yellow px-1.5 py-0.5 text-mk-ink">
              {score} / {total}
            </span>
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="flex-1">
            <h2 className="mk-h2 text-mk-ink">{copy.title}</h2>
            {copy.meta && (
              <p className="mt-3 font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
                {copy.meta}
              </p>
            )}
          </div>
          {bucket !== 'nognniet' && (
            <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full bg-mk-beige ring-2 ring-mk-ink/15 sm:h-[100px] sm:w-[100px]">
              <Image
                src={portrait}
                alt={gerke.portraitAlt}
                fill
                sizes="100px"
                className="object-cover object-top"
              />
            </div>
          )}
        </div>

        <p className="mt-6 font-inter text-[15px] leading-relaxed text-mk-ink/80">
          {copy.sub}
        </p>

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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-mk-ink px-5 py-3.5 font-inter text-[14px] font-semibold text-mk-paper hover:bg-mk-ink/85"
              >
                {copy.primaryCta ?? 'Download inspiratiestuk'}{' '}
                <span aria-hidden>↓</span>
              </Link>
              <button
                type="button"
                onClick={onReplay}
                className="text-center font-inter text-[13px] font-semibold text-mk-muted underline decoration-2 underline-offset-4 hover:text-mk-ink"
              >
                {copy.replay ?? '↻ Speel opnieuw'}
              </button>
            </div>
          )}
        </div>

        {bucket !== 'nognniet' && (
          <div className="mt-6 flex items-center justify-between border-t border-mk-ink/10 pt-5 font-inter text-[12px] text-mk-muted">
            <Link
              href="https://www.linkedin.com/company/happy-horizon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-mk-ink transition-opacity hover:opacity-70"
            >
              {copy.follow ?? 'Volg ons'}
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-sm bg-mk-ink font-bold text-mk-paper"
              >
                in
              </span>
            </Link>
            <button
              type="button"
              onClick={onReplay}
              className="underline decoration-2 underline-offset-4 hover:text-mk-ink"
            >
              Speel opnieuw
            </button>
          </div>
        )}
      </article>
    </section>
  );
}
