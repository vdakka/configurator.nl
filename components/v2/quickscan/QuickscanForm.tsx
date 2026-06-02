'use client';

import { useId, useState } from 'react';
import { track } from '@/lib/analytics';

type FieldSet = 'full' | 'short';

type Labels = {
  firstName: string;
  lastName: string;
  phone: string;
  linkedin: string;
  email: string;
  consent: string;
};

/**
 * Lead-capture na quickscan — Merkboek 2026 stijl.
 * Behoudt alle a11y-features (htmlFor + autoComplete + mcp-attrs uit
 * Ronde 1/3) en is functioneel identiek aan het origineel.
 */
export function QuickscanForm({
  fieldSet,
  submit,
  labels,
  resultBucket,
  score,
  onSubmitted,
}: {
  fieldSet: FieldSet;
  submit: string;
  labels: Labels;
  resultBucket: string;
  score: number;
  onSubmitted: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formId = useId();
  const fid = (key: string) => `${formId}-${key}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/quickscan-submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, resultBucket, score }),
      });
      if (!res.ok) throw new Error('Submission failed');
      track('quickscan_form_submitted', { bucket: resultBucket, score });
      onSubmitted();
    } catch (err) {
      setError(
        'Er ging iets mis bij het verzenden. Probeer het later nog eens.',
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
      {...{
        'mcp-tool': 'quickscan_lead_indienen',
        'mcp-description':
          'Lever contactgegevens aan na de quickscan zodat Gerke persoonlijk contact opneemt of een korte analyse stuurt.',
      }}
    >
      {fieldSet === 'full' ? (
        <>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field
              id={fid('first-name')}
              name="firstName"
              label={labels.firstName}
              autoComplete="given-name"
              required
            />
            <Field
              id={fid('last-name')}
              name="lastName"
              label={labels.lastName}
              autoComplete="family-name"
              required
            />
          </div>
          <Field
            id={fid('phone')}
            name="phone"
            label={labels.phone}
            type="tel"
            autoComplete="tel"
            required
          />
          <Field
            id={fid('linkedin')}
            name="linkedin"
            label={labels.linkedin}
            type="url"
            autoComplete="url"
          />
          <label
            htmlFor={fid('consent')}
            className="mt-2 flex items-start gap-2.5 font-inter text-[13px] font-semibold text-mk-ink"
          >
            <input
              id={fid('consent')}
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 rounded border-mk-ink/30 accent-mk-ink"
              {...{ 'mcp-required': '' }}
            />
            <span>{labels.consent}</span>
          </label>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field
              id={fid('first-name')}
              name="firstName"
              label={labels.firstName}
              autoComplete="given-name"
              required
            />
            <Field
              id={fid('last-name')}
              name="lastName"
              label={labels.lastName}
              autoComplete="family-name"
              required
            />
          </div>
          <Field
            id={fid('email')}
            name="email"
            label={labels.email}
            type="email"
            autoComplete="email"
            required
          />
        </>
      )}

      {error && (
        <p className="font-inter text-[13px] font-semibold text-mk-coral">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full rounded-xl bg-mk-ink py-3.5 font-inter text-[14px] font-semibold text-mk-paper transition-colors hover:bg-mk-ink/85 disabled:opacity-60"
      >
        {pending ? 'Verzenden…' : `${submit} →`}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = 'text',
  required,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label
        htmlFor={id}
        className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted"
      >
        {label}
        {required && (
          <span className="ml-1 text-mk-coral" aria-hidden>
            *
          </span>
        )}
        {required && <span className="sr-only"> (verplicht)</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="rounded-xl border border-mk-ink/20 bg-mk-paper px-3 py-3 font-inter text-[14px] text-mk-ink outline-none transition-colors focus:border-mk-ink"
        {...(required ? { 'mcp-required': '' } : {})}
      />
    </div>
  );
}
