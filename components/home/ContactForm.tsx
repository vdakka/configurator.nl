'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'pending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('pending');
    setError(null);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      track('contact_form_submitted', { source: 'homepage' });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('Er ging iets mis bij het verzenden. Probeer het later nog eens.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-10 text-hb shadow-[0_30px_80px_-20px_rgba(7,7,51,0.4)]">
        <h3 className="text-[24px] font-black leading-tight tracking-heading">
          Bedankt voor je bericht.
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-hb-sec">
          Gerke leest mee en neemt deze week persoonlijk contact op. Geen
          geautomatiseerde flow.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 text-hb shadow-[0_30px_80px_-20px_rgba(7,7,51,0.4)] sm:p-10"
    >
      <div className="space-y-4">
        <Field name="firstName" label="Voornaam" required />
        <Field name="lastName" label="Achternaam" required />
        <Field name="company" label="Bedrijf" />
        <Field name="email" label="E-mailadres" type="email" required />
        <Field name="phone" label="Telefoonnummer" type="tel" />
        <Textarea name="message" label="Daag ons uit" />
      </div>

      <p className="mt-6 text-[12px] leading-[1.55] text-hb-sec">
        Door op verzenden te klikken geef je toestemming aan Happy Horizon om de hierboven
        ingediende persoonlijke informatie op te slaan en te verwerken om je van de
        gevraagde inhoud te voorzien.
      </p>

      {/* reCAPTCHA placeholder — replace with real widget for production */}
      <div className="mt-5 flex h-[78px] w-fit items-center gap-3 rounded-md border border-hg-line bg-hg px-4 font-mono text-[11px] text-hb-sec">
        <span className="h-5 w-5 rounded-sm border border-hg-line bg-white" aria-hidden />
        reCAPTCHA (TODO: koppel met echte key voor go-live)
      </div>

      {error && (
        <p className="mt-4 text-[13px] font-bold text-hs1">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'pending'}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-hb px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-hb-soft disabled:opacity-60"
      >
        {status === 'pending' ? 'Verzenden…' : 'Verzenden →'}
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
    <label className="block">
      <span className="sr-only">
        {label}
        {required ? ' (verplicht)' : ''}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={required ? `${label}*` : label}
        className="block w-full rounded-xl border border-hg-line bg-white px-4 py-3.5 text-[14px] text-hb placeholder:text-hb-sec/70 focus:border-hb focus:outline-none"
      />
    </label>
  );
}

function Textarea({ name, label }: { name: string; label: string }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <textarea
        name={name}
        rows={5}
        placeholder={label}
        className="block w-full resize-none rounded-xl border border-hg-line bg-white px-4 py-3.5 text-[14px] text-hb placeholder:text-hb-sec/70 focus:border-hb focus:outline-none"
      />
    </label>
  );
}
