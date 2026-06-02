'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'pending' | 'success' | 'error';

/**
 * Contactformulier v2 — Merkboek 2026 stijl.
 *
 * Behoudt alle a11y-features uit Ronde 1/3:
 * - Expliciete `<label htmlFor>` ↔ `<input id>` koppelingen
 * - Zichtbare labels boven elk veld (Inter caption stijl)
 * - autoComplete per veld (browser autofill + agent-context)
 * - WebMCP declaratieve attributes (mcp-tool, mcp-required) voor de
 *   experimentele Chrome agentic browsing standaard
 *
 * Visueel anders: Paper-card, Ink-border, Inter labels in caption-style,
 * verplicht-asterisk in coral i.p.v. hs1.
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
      track('contact_form_submitted', { source: 'homepage-v2' });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(
        'Er ging iets mis bij het verzenden. Probeer het later nog eens.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-mk-ink/15 bg-mk-paper p-10 text-mk-ink">
        <h3 className="font-instrument text-[28px] leading-tight text-mk-ink">
          Bedankt voor je bericht.
        </h3>
        <p className="mk-body mt-3 text-mk-ink/75">
          Gerke leest mee en neemt deze week persoonlijk contact op. Geen
          geautomatiseerde flow.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-mk-ink/15 bg-mk-paper p-8 text-mk-ink sm:p-10"
      {...{
        'mcp-tool': 'contact_uitdaging',
        'mcp-description':
          'Stuur een configurator-vraagstuk in; Happy Horizon neemt deze week persoonlijk contact op.',
      }}
    >
      <h3 className="font-instrument text-[22px] leading-tight text-mk-ink">
        Daag ons uit
      </h3>
      <p className="mk-body mt-2 text-[14px] text-mk-ink/65">
        Gerke leest mee en neemt deze week persoonlijk contact op.
      </p>

      <div className="mt-6 space-y-5">
        <Field
          id="v2-contact-first-name"
          name="firstName"
          label="Voornaam"
          autoComplete="given-name"
          required
        />
        <Field
          id="v2-contact-last-name"
          name="lastName"
          label="Achternaam"
          autoComplete="family-name"
          required
        />
        <Field
          id="v2-contact-company"
          name="company"
          label="Bedrijf"
          autoComplete="organization"
        />
        <Field
          id="v2-contact-email"
          name="email"
          label="E-mailadres"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          id="v2-contact-phone"
          name="phone"
          label="Telefoonnummer"
          type="tel"
          autoComplete="tel"
        />
        <Textarea
          id="v2-contact-message"
          name="message"
          label="Je vraagstuk"
          placeholder="Vertel kort wat de uitdaging is, dan kan Gerke gericht meedenken."
        />
      </div>

      <p className="mt-6 font-inter text-[12px] leading-[1.55] text-mk-ink/60">
        We gebruiken je gegevens alleen om contact op te nemen. Geen
        nieuwsbrief. Lees ons{' '}
        <a
          href="https://happyhorizon.com/nl/privacy"
          className="underline decoration-2 underline-offset-2 hover:text-mk-ink"
        >
          privacybeleid
        </a>
        .
      </p>

      {error && (
        <p className="mt-4 font-inter text-[13px] font-semibold text-mk-coral">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'pending'}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-mk-ink px-6 py-3.5 font-inter text-[14px] font-semibold text-mk-paper transition-colors hover:bg-mk-ink/85 disabled:opacity-60"
      >
        {status === 'pending'
          ? 'Verzenden…'
          : 'Bespreek je configuratorvraagstuk →'}
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
        className="mb-2 block font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted"
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
        className="block w-full rounded-xl border border-mk-ink/20 bg-mk-paper px-4 py-3.5 font-inter text-[14px] text-mk-ink placeholder:text-mk-muted focus:border-mk-ink focus:outline-none"
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
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={5}
        placeholder={placeholder}
        className="block w-full resize-none rounded-xl border border-mk-ink/20 bg-mk-paper px-4 py-3.5 font-inter text-[14px] text-mk-ink placeholder:text-mk-muted focus:border-mk-ink focus:outline-none"
      />
    </div>
  );
}
