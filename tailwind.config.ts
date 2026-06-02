import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Huidige Happy Horizon tokens — gebruikt door bestaande / -site
        hb: '#070733',
        'hb-soft': '#14143f',
        'hb-line': '#1f1f55',
        'hb-sec': '#5E5E7A',
        hy: '#FCE512',
        'hy-soft': '#FEF286',
        hw: '#FFFFFF',
        hg: '#F2F4F6',
        'hg-line': '#e2e6ea',
        hb1: '#70B8FF',
        hb2: '#C2E0FF',
        hp1: '#BB99FF',
        hs1: '#FA8072',
        hs2: '#F8C3B4',
        ann: '#FA8072',
        'ann-bg': '#FFF1EE',
        // Merkboek 2026 (V1.0) — gebruikt door /v2-route. Geïsoleerde mk-*
        // namespace zodat oude site ongemoeid blijft tijdens parallelle rebrand.
        'mk-ink': '#11141C',
        'mk-paper': '#FAF8F2',
        'mk-yellow': '#FFD23F',
        'mk-lime': '#D8E84A',
        'mk-beige': '#E9DFC9',
        'mk-coral': '#E85D3A',
        'mk-blue': '#3A5BE8',
        'mk-muted': '#6E6F76',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mont: ['Mont', 'var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        // Merkboek 2026 — Instrument Serif (display) + Inter (body/UI)
        instrument: ['var(--font-instrument)', 'ui-serif', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        display: '-0.035em',
        heading: '-0.02em',
        eyebrow: '0.18em',
        mono: '0.15em',
      },
      maxWidth: {
        page: '1280px',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(8deg)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-10px, 16px) rotate(-5deg)' },
        },
        float3: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(8px, -14px) rotate(15deg)' },
        },
        glyphFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-3px) rotate(2deg)' },
        },
        corePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        livePulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(43, 182, 115, 0.6)' },
          '50%': { boxShadow: '0 0 0 6px rgba(43, 182, 115, 0)' },
        },
        dotPulse: {
          '0%, 100%': { transform: 'scale(0.5)', opacity: '0.5' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
        screenIn: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float1: 'float1 9s ease-in-out infinite',
        'float1-slow': 'float1 13s ease-in-out infinite',
        float2: 'float2 11s ease-in-out infinite',
        float3: 'float3 7s ease-in-out infinite',
        glyphFloat: 'glyphFloat 6s ease-in-out infinite',
        corePulse: 'corePulse 4s ease-in-out infinite',
        livePulse: 'livePulse 2s ease-in-out infinite',
        dotPulse: 'dotPulse 1.2s ease-in-out infinite',
        screenIn: 'screenIn 0.35s ease',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
