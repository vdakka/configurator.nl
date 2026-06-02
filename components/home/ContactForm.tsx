'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'pending' | 'success' | 'error';

/**
 * Contactformulier. A11y- en agent-vriendelijk:
 * - Expliciete `<label htmlFor>` ↔ `<input id>` koppelingen
 * - Zichtbare labels boven elk veld (mono-label stijl) i.p.v. placeholder-only
 * - autoComplete per veld (browser autofill + agent-context)
 * - Custom mcp-* attributes voor de experimentele WebMCP-standaard
 *   (Chrome agentic browsing; HTML5-legaal en wordt door andere
 *   browsers genegeerd).
 */
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
      // WebMCP declaratief (experimenteel) — Chrome agents kunnen dit
      // formulier ontdekken als de tool "contact_uitdaging".
      {...{
        'mcp-tool': 'contact_uitdaging',
        'mcp-description':
          'Stuur een configurator-vraagstuk in; Happy Horizon neemt deze week persoonlijk contact op.',
      }}
    >
      <div className="space-y-5">
        <Field
          id="contact-first-name"
          name="firstName"
          label="Voornaam"
          autoComplete="given-name"
          required
        />
        <Field
          id="contact-last-name"
          name="lastName"
          label="Achternaam"
          autoComplete="family-name"
          required
        />
        <Field
          id="contact-company"
          name="company"
          label="Bedrijf"
          autoComplete="organization"
        />
        <Field
          id="contact-email"
          name="email"
          label="E-mailadres"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          id="contact-phone"
          name="phone"
          label="Telefoonnummer"
          type="tel"
          autoComplete="tel"
        />
        <Textarea
          id="contact-message"
          name="message"
          label="Daag ons uit"
          placeholder="Vertel kort wat de uitdaging is, dan kan Gerke gericht meedenken."
          required
        />
      </div>

      <p className="mt-6 text-[12px] leading-[1.55] text-hb-sec">
        We gebruiken je gegevens alleen om contact op te nemen. Geen nieuwsbrief.
        Lees ons{' '}
        <a
          href="https://happyhorizon.com/nl/privacy"
          className="underline decoration-2 underline-offset-2 hover:text-hb"
        >
          privacybeleid
        </a>
        .
      </p>

      {error && (
        <p className="mt-4 text-[13px] font-bold text-hs1">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'pending'}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-hb px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-hb-soft disabled:opacity-60"
      >
        {status === 'pending' ? 'Verzenden…' : 'Bespreek je configuratorvraagstuk →'}
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
    <div>
      <label
        htmlFor={id}
        className="mono-label mb-2 block text-[10px] text-hb-sec"
      >
        {label}
        {required && <span className="ml-1 text-hs1" aria-hidden>*</span>}
        {required && <span className="sr-only"> (verplicht)</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="block w-full rounded-xl border border-hg-line bg-white px-4 py-3.5 text-[14px] text-hb placeholder:text-hb-sec/70 focus:border-hb focus:outline-none"
        {...(required ? { 'mcp-required': '' } : {})}
      />
    </div>
  );
}

function Textarea({
  id,
  name,
  label,
  placeholder,
  required,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mono-label mb-2 block text-[10px] text-hb-sec"
      >
        {label}
        {required && <span className="ml-1 text-hs1" aria-hidden>*</span>}
        {required && <span className="sr-only"> (verplicht)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={5}
        placeholder={placeholder}
        required={required}
        className="block w-full resize-none rounded-xl border border-hg-line bg-white px-4 py-3.5 text-[14px] text-hb placeholder:text-hb-sec/70 focus:border-hb focus:outline-none"
        {...(required ? { 'mcp-required': '' } : {})}
      />
    </div>
  );
}
