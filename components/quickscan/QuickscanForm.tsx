'use client';

import { useState } from 'react';
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
      setError('Er ging iets mis bij het verzenden. Probeer het later nog eens.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {fieldSet === 'full' ? (
        <>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field name="firstName" label={labels.firstName} required />
            <Field name="lastName" label={labels.lastName} required />
          </div>
          <Field name="phone" label={labels.phone} type="tel" required />
          <Field name="linkedin" label={labels.linkedin} type="url" />
          <label className="mt-2 flex items-start gap-2.5 text-[13px] font-bold text-hb">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 rounded border-hg-line accent-hb"
            />
            <span>{labels.consent}</span>
          </label>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field name="firstName" label={labels.firstName} required />
            <Field name="lastName" label={labels.lastName} required />
          </div>
          <Field name="email" label={labels.email} type="email" required />
        </>
      )}

      {error && <p className="text-[13px] font-bold text-hs1">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full rounded-xl bg-hb py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-hb-soft disabled:opacity-60"
      >
        {pending ? 'Verzenden…' : `${submit} →`}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="mono-label text-[10px] text-hb-sec">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-xl border-[1.5px] border-hg-line bg-white px-3 py-3 text-[14px] text-hb outline-none transition-colors focus:border-hb"
      />
    </label>
  );
}
