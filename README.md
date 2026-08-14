# Melosa Clínica Brugal — Website

Base del nuevo sitio web de Melosa Clínica Brugal en Puerto Plata, República Dominicana.

## Stack

- Astro 7.1.6
- TypeScript strict
- Static output
- Node.js >= 22.12.0
- CSS nativo con design tokens del brand system

## Requisitos

Instala Node.js 22.12.0 o superior.

```bash
node --version
npm --version
```

## Desarrollo local

```bash
npm install
npm run dev
```

Astro mostrará la URL local del servidor de desarrollo.

## Validación

```bash
npm run check
npm run build
npm run preview
```

## Estructura

```text
.
├── docs/                     # research, branding, SEO, mockups and implementation docs
├── public/                   # static assets copied without processing
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/           # reusable UI components
│   ├── config/               # site-wide verified configuration
│   ├── layouts/              # shared page layouts
│   ├── pages/                # Astro file-based routes
│   └── styles/               # global design tokens and styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Source of truth

Do not copy medical or historical information from legacy pages directly into production.

Use the documents under `docs/` and validate time-sensitive data with the client first.

Important documents:

- `docs/README.md`
- `docs/brand/brand-foundation.md`
- `docs/brand/design-system.md`
- `docs/research/institutional-research.md`
- `docs/web/implementation-brief.md`
- `docs/open-questions.md`

## Current routes

- `/`
- `/medicos/`
- `/especialidades/`
- `/servicios/`
- `/pacientes/`
- `/nosotros/`
- `/emergencia/`
- `/citas/`
- custom `/404.html`

Most section routes are intentionally placeholders until the clinic validates the corresponding content.

## Design principles

- Patient tasks before marketing content.
- Mobile-first interaction.
- WCAG 2.2 AA target.
- Minimal client-side JavaScript by default.
- Reusable Astro components before page-specific duplication.
- Stock media can illustrate concepts but must never impersonate clinic facilities.
- Unverified medical, historical, insurance, staffing, or schedule claims must not ship.

## Brand tokens

The initial implementation uses the documented working palette:

- Brugal Navy 900: `#0B2A6F`
- Brugal Blue 700: `#123FA3`
- Brugal Blue 600: `#1A56BF`
- Brugal Blue 100: `#EAF1FF`
- Clinical Blue: `#1A8DBB`
- Clinical Ink: `#172033`
- Soft White: `#F7F8FA`

These are operational digital values until the client supplies an official historical/vector brand specification.

## Provisional assets

`public/favicon.svg` and the `MCB` header mark are placeholders. Replace them with the approved vector logo when the client provides it.
