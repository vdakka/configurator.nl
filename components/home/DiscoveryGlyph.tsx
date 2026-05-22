type Glyph = 'target' | 'figures' | 'nodes' | 'chip';

export function DiscoveryGlyph({ glyph, className = '' }: { glyph: Glyph; className?: string }) {
  switch (glyph) {
    case 'target':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
        </svg>
      );
    case 'figures':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6" cy="8" r="2.2" />
          <circle cx="12" cy="6" r="2.4" />
          <circle cx="18" cy="8" r="2.2" />
          <path d="M2.5 19c0.7-2.7 2.6-4.4 5-4.4M21.5 19c-0.7-2.7-2.6-4.4-5-4.4M7 19c0.8-3 2.7-4.8 5-4.8s4.2 1.8 5 4.8" />
        </svg>
      );
    case 'nodes':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="5" cy="5" r="2" fill="currentColor" />
          <circle cx="19" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" fill="currentColor" />
          <rect x="9" y="9" width="6" height="6" rx="0.5" />
          <path d="M7 6l4.5 4.5M17 6l-4.5 4.5M7 18l4.5-4.5M17 18l-4.5-4.5" />
        </svg>
      );
    case 'chip':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="5" width="14" height="14" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="0.5" />
          <path d="M2 9h3M2 12h3M2 15h3M19 9h3M19 12h3M19 15h3M9 2v3M12 2v3M15 2v3M9 19v3M12 19v3M15 19v3" />
        </svg>
      );
  }
}
