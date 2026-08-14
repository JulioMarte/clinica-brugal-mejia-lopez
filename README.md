# Melosa Clínica Brugal — Website

Website package for Melosa Clínica Brugal in Puerto Plata, Dominican Republic.

## Architecture

This repository is not a standalone brochure theme.

It is a Clínica Brugal site package designed to operate with Site Foundry.

Canonical stack:

- Site Foundry for reusable site compilation and orchestration.
- Astro 7.1.6 for static rendering.
- TypeScript strict.
- Directus for structured content and editorial workflow.
- Cloudflare for target static deployment.
- R2 or equivalent object storage for managed media when configured.
- Node.js >= 22.12.0.

## Architectural invariants

- Public pages render statically by default.
- Directus supplies structured content.
- CMS content cannot replace protected layout or security code.
- Navigation is CMS-configurable and supports submenus.
- A page can exist for SEO without appearing in the primary menu.
- LLM users can create and modify drafts only.
- Human approval is required for publication.
- Production builds consume publication-eligible content only.
- Failed builds must not replace the last known-good deployment.

## Local development

Install Node.js 22.12.0 or newer.

```bash
node --version
npm --version
npm install
npm run dev
```

Astro displays the local development URL.

The target architecture supports two content modes:

1. fixture mode for deterministic theme and CI work;
2. authenticated Directus preview mode for realistic content.

Production publication permissions are not required for local theme development.

## Validation

```bash
npm run check
npm run build
npm run preview
```

## Repository structure

```text
.
├── docs/
│   ├── architecture/         # canonical technical contracts
│   ├── brand/                # brand foundation and design system
│   ├── content/              # content strategy
│   ├── research/             # institutional research
│   ├── seo/                  # competitor, keyword, and SEO architecture
│   ├── sources/              # research sources
│   ├── web/                  # implementation specification
│   └── mockups/              # illustrative prototypes
├── public/                   # static assets
├── src/
│   ├── components/           # reusable UI components
│   ├── config/               # site configuration
│   ├── layouts/              # shared Astro layouts
│   ├── pages/                # route entry points
│   └── styles/               # global design tokens and styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Documentation source of truth

Start with:

- `docs/README.md`
- `docs/architecture/site-foundry-integration.md`
- `docs/architecture/directus-content-model.md`
- `docs/architecture/page-rendering-contract.md`
- `docs/architecture/navigation-contract.md`
- `docs/architecture/publishing-workflow.md`
- `docs/web/implementation-brief.md`

Architecture contracts override mockups and older strategy examples when conflicts exist.

## Canonical page families

Initial canonical patterns:

```text
/                                      home
/medicos/[slug]/                       doctor
/especialidades/[slug]/                specialty
/servicios/[slug]/                     service
/servicios/[service]/[procedure]/      procedure when justified
/pacientes/[slug]/                     patient information
/emergencia/                           emergency
/ubicaciones/[slug]/                   location
/noticias/[slug]/                      article/news
/nosotros/[slug]/                      institutional page
/contacto/                             contact
/en/...                                reviewed English equivalents
```

Do not create duplicate canonical pages for the same medical entity.

## Current local routes

The existing codebase can contain temporary section routes or placeholders during development.

Do not treat a temporary route as canonical if it conflicts with the page-rendering contract.

## Design principles

- Patient tasks before marketing content.
- Mobile-first interaction.
- WCAG 2.2 AA target.
- Minimal client-side JavaScript by default.
- Reusable Astro components before page-specific duplication.
- Stock media can illustrate concepts but must never impersonate clinic facilities.
- Unverified medical, historical, insurance, staffing, schedule, or operational claims must not ship.

## Brand baseline

Working naming hierarchy:

- canonical entity: **Melosa Clínica Brugal**;
- short commercial expression: **Clínica Brugal**;
- historical/alternate expression: **Clínica Brugal Mejía López**;
- legal name: **MELOSA CLINICA BRUGAL SRL**.

The initial implementation uses documented working brand tokens.

These remain operational digital values until the client provides an approved vector/manual specification.

## Provisional assets

The current favicon and any temporary initials-based header mark are placeholders.

Replace them with approved vector brand assets when available.
