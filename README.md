# configurator.nl

Specialisme-site van Happy Horizon, gericht op productconfigurators. Built with Next.js 14 App Router, TypeScript, Tailwind, Framer Motion, and MDX/JSON-driven content.

## Wat zit erin

| Route             | Wat het is                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `/`               | Homepage (Wireframe v4) — hero, definitie + marktverschuiving, wanneer wel/niet, Quickscan teaser, Discovery framework, cases, contact-CTA |
| `/aanpak`         | Discovery detailpagina — slim hero, vier-assen deepdive, tijdlijn, deliverables spec-sheet, editorial FAQ |
| `/quickscan`      | Volwaardige swipe game (15 schermen, profielvraag → stellingen → resultaat) |
| `/cases`          | Cases overzicht (placeholder, één uitgewerkt) |
| `/cases/[slug]`   | Case detail (MDX body) |
| `/contact`        | Drie ingangen (quickscan, gesprek, Discovery) |
| `/branches/b2b`   | Placeholder voor SEO-routing |
| `/branches/b2c`   | Placeholder voor SEO-routing |

## Setup

Vereisten:

- Node.js **18.17+** (Next.js 14 requirement). Test met `node --version`.
- npm (komt met Node)

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Build voor productie:

```bash
npm run build
npm run start
```

## Deploy (Vercel)

1. Push de repo naar GitHub/GitLab/Bitbucket.
2. Importeer in Vercel.
3. Geen environment variables nodig voor de huidige codebase.
4. Vercel detecteert Next.js automatisch.

## Content workflow — teksten aanpassen zonder code-deploy

Alle copy leeft in `/content`. Geen TSX hoeven aanraken om teksten te wijzigen.

| Bestand                                | Wat zit erin                                       |
| -------------------------------------- | -------------------------------------------------- |
| `content/homepage.json`                | Alle copy + structuur voor de homepage             |
| `content/aanpak.json`                  | Alle copy + structuur voor /aanpak                 |
| `content/contact.json`                 | Copy voor /contact                                 |
| `content/faqs.json`                    | FAQ-items voor /aanpak                             |
| `content/stats.json`                   | ROI-cijfers + bron                                 |
| `content/team.json`                    | Gerke's bio, portret-pad, LinkedIn                 |
| `content/cases/*.mdx`                  | Case-detailpagina's (frontmatter + body markdown)  |
| `content/quickscan/statements.json`    | Alle 16 stellingen (10 core + 3 B2B + 3 B2C)       |
| `content/quickscan/microcopy.json`     | Knop-labels, tooltip-teksten, validatie-meldingen, resultaatschermen |

**Quickscan stellingen wijzigen:** edit `content/quickscan/statements.json`. De `swapIndex` in een B2B/B2C-stelling bepaalt welke kern-stelling deze vervangt (0-9).

**Nieuwe case toevoegen:** maak een nieuw `.mdx` bestand in `content/cases/` aan met dezelfde frontmatter-velden als bestaande cases. Wordt automatisch opgenomen in `/cases`, sitemap en `getCaseList()`.

**Niet in /content?** SEO-titels en meta-descriptions per pagina komen via `generateMetadata` uit elke route — gebruik de `seo`-blok in het bijbehorende JSON-bestand.

## Architectuur

```
/app           Next.js routes (App Router, RSC by default)
/components    UI: chrome/, ui/, home/, aanpak/, quickscan/
/content       JSON + MDX bron (zie boven)
/lib           content.ts (loaders), analytics.ts, quickscan-logic.ts, schema-org.tsx
/public        gerke-portret.jpg, fonts/
```

- **Server components** lezen `/content` via `lib/content.ts` (gebruikt `fs.readFileSync` + `gray-matter`).
- **Quickscan is volledig client-side** en wordt via `next/dynamic` met `ssr: false` ingeladen, zodat Framer Motion alleen op die route in de bundle zit.
- **Tailwind tokens** in `tailwind.config.ts` mappen naar de Happy Horizon palette (`hb`, `hy`, `hg`, `hb1`, etc.).
- **Schema.org JSON-LD** via `lib/schema-org.tsx`: Organization op alle pagina's, Service op /, FAQPage op /aanpak, Quiz op /quickscan, BreadcrumbList waar relevant.

## Technische keuzes (kort onderbouwd)

**Next.js boven Astro.** De Quickscan is volledig interactief (drag-gestures, state machine, formulier-handling) en de Discovery-framework op de homepage heeft scroll-triggered animaties met IntersectionObserver. Next.js' App Router + RSC laat ons static-by-default uitleveren voor SEO-rijke pagina's, en client islands inschakelen waar het nodig is.

**MDX/JSON boven Sanity (of een ander headless CMS).** Eén product owner, één repo, geen extra hosting-rekening. Wijzigingen gaan via een PR (audit trail). Als de redactie-vereisten groter worden, is de migratie naar Sanity een kwestie van `lib/content.ts` opnieuw implementeren.

**Framer Motion boven react-spring.** Framer Motion's drag-gesture API (`drag="x"`, `dragConstraints`, `onDragEnd` met `PanInfo`) is precies wat de Quickscan vraagt, en `AnimatePresence` regelt de screen-transities en card-stack. React-spring zou meer maatwerk vragen voor dezelfde swipe-mechaniek.

**Tailwind voor het design system.** De Happy Horizon palette mapt direct naar Tailwind colors, en de utility-aanpak houdt sectie-componenten leesbaar zonder een aparte CSS-laag.

**Plausible-stub.** Geen tracking pixel, geen cookie-banner. Events komen in `window.plausible.q` voor latere koppeling, plus `console.info` tijdens development zodat we kunnen meekijken.

## TODO's voor go-live

- [ ] Vervang `public/gerke-portret.jpg` met de definitieve foto.
- [ ] Licensed Mont fontbestanden in `public/fonts/` zetten en `@font-face` in `app/globals.css` activeren.
- [ ] Koppel `/api/quickscan-submit` aan een echte mail- of CRM-flow (HubSpot, Mailgun, eigen endpoint).
- [ ] Vervang trust-strip placeholder labels door echte klantlogo's (SVG of Next/Image).
- [ ] Werk case-content (`content/cases/*.mdx`) verder uit met probleem, aanpak, resultaten.
- [ ] Voeg een echte download voor het "inspiratiestuk" toe (`/inspiratiestuk.pdf` link in 14c).
- [ ] OG-images per pagina genereren en in `public/og/` plaatsen.
- [ ] Branches-pagina's (`/branches/b2b`, `/branches/b2c`) inhoudelijk uitwerken.
- [ ] Verifieer Lighthouse-scores ≥90 op Performance / Accessibility / Best Practices / SEO.
- [ ] Hero H1: huidige tekst is "Configuratoren die werken voor jouw business." (uit prototype). De originele briefing schrijft "Configuratoren die werken. Voor je klant én je bedrijfsproces." — kies welke definitief is en pas `content/homepage.json` aan.

## Accessibility & motion

- WCAG 2.1 AA als minimum.
- `prefers-reduced-motion` schakelt alle animaties uit via een global rule in `app/globals.css`. De swipe-kaart blijft bedienbaar via de twee ronde actieknoppen en de pijltjestoetsen.
- Focus-states zichtbaar via Tailwind defaults (yellow outline op interactieve elementen, geen browser-default).
- Quickscan: stellingen worden voorgelezen via `aria-live="polite"` op de kaartcontainer.

## Analytics events (Plausible-stub)

| Event                                    | Props                                     |
| ---------------------------------------- | ----------------------------------------- |
| `quickscan_start`                        | —                                         |
| `quickscan_profile_selected`             | `profile`                                 |
| `quickscan_question_answered`            | `index`, `direction`                      |
| `quickscan_completed`                    | `score`, `bucket`                         |
| `quickscan_result_match`                 | —                                         |
| `quickscan_result_kansen`                | —                                         |
| `quickscan_result_nognniet`              | —                                         |
| `quickscan_form_submitted`               | `bucket`, `score`                         |

Vervang de stub door het Plausible-script of een eigen analytics-endpoint zodra de target-tool gekozen is.

---

Vragen of feedback: `hello@configurator.nl`.
