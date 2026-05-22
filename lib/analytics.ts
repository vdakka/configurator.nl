'use client';

/**
 * Plausible-stub. No real tracking pixel — events are pushed to window.plausible.q
 * (so a future Plausible script can pick them up) and mirrored to console.
 */

type PlausibleProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: {
      (event: string, options?: { props?: PlausibleProps }): void;
      q?: Array<unknown>;
    };
  }
}

export function track(event: string, props?: PlausibleProps) {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
  } else {
    window.plausible = window.plausible || ((() => {}) as Window['plausible']);
    if (window.plausible) {
      window.plausible.q = window.plausible.q || [];
      window.plausible.q.push([event, props ? { props } : undefined]);
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('[analytics]', event, props ?? {});
  }
}
