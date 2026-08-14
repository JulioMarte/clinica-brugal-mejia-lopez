# Site Foundry Integration Contract

Status: **canonical architecture**

## 1. Purpose

This repository implements the Clínica Brugal website as a Site Foundry site package.

Site Foundry provides the reusable compilation and publishing model.

This repository owns the clinic-specific theme, templates, content contracts, and validation rules.

Directus provides structured content.

Astro renders the public site as static output.

## 2. Canonical stack

- Site Foundry: reusable multi-site compiler and orchestration layer.
- Astro: static renderer.
- Directus: structured CMS and editorial workflow.
- Cloudflare: target static hosting and edge delivery.
- R2 or equivalent object storage: media origin when configured.

Do not treat framework or CMS selection as open architecture decisions.

## 3. Ownership boundaries

### Site Foundry owns

- shared compiler conventions;
- reusable rendering contracts;
- build orchestration;
- publication hooks;
- multi-site isolation;
- shared validation primitives;
- shared deployment integration.

### Clínica Brugal repository owns

- brand theme;
- layouts and clinic-specific components;
- clinic content schema extensions;
- navigation presentation;
- SEO defaults;
- structured-data mapping;
- clinic validation rules;
- local development previews.

### Directus owns

- content records;
- relations;
- editorial status;
- media references;
- provenance metadata;
- navigation configuration;
- publishable page state.

## 4. Core invariant

The repository must render a valid preview without requiring production publishing permissions.

The production build must consume only content eligible for publication.

Draft content must never appear in public builds.

## 5. Rendering flow

```text
Directus records
      ↓
Site Foundry content adapter
      ↓
validation and normalization
      ↓
Astro page contracts
      ↓
Clínica Brugal theme
      ↓
static output
      ↓
validation gates
      ↓
Cloudflare deployment
```

## 6. Local development

Local development must support two modes.

### Fixture mode

Use repository fixtures for deterministic development.

This mode must work without Directus.

Use it for:

- theme development;
- component development;
- layout review;
- CI;
- visual regression testing;
- LLM-assisted template work.

### Directus preview mode

Use a configured Directus project for realistic content preview.

This mode may read draft content only when an authenticated preview role permits it.

Preview mode must never change the public publication state.

## 7. Theme contract

The clinic theme must contain:

- design tokens;
- typography;
- spacing;
- global shell;
- header;
- footer;
- page layouts;
- reusable content blocks;
- responsive behavior;
- accessibility behavior;
- default metadata presentation.

Every generated page must preserve the same theme identity unless an explicitly approved layout variant applies.

## 8. Protected shell

The following elements are architecture-controlled:

- global document structure;
- site header mechanics;
- navigation mechanics;
- footer mechanics;
- accessibility primitives;
- SEO primitives;
- structured-data primitives;
- error pages;
- security-sensitive form handling.

Directus content can configure approved fields and items.

Directus content must not inject arbitrary executable code into these areas.

## 9. Configurable content

Directus may control:

- hero content;
- homepage section order within allowed component types;
- featured doctors;
- featured specialties;
- featured services;
- approved media;
- CTA labels and destinations;
- page copy;
- SEO metadata;
- navigation membership;
- footer content within the footer contract.

## 10. LLM boundary

An LLM may use Directus like a constrained editorial user.

The LLM role may:

- create drafts;
- update allowed draft fields;
- propose SEO metadata;
- attach approved or provisional media;
- create draft relations;
- prepare draft navigation changes.

The LLM role must not:

- publish;
- approve;
- change production permissions;
- delete published records;
- alter protected schema;
- bypass medical or institutional review.

Human approval is mandatory for publication.

## 11. Failure behavior

A production build must fail closed when required content is invalid.

Examples:

- duplicate canonical slug;
- broken required relation;
- missing required locale;
- invalid navigation cycle;
- unpublished referenced record;
- invalid structured-data field;
- blocked claim marked for publication.

Do not silently publish partial or ambiguous medical content.

## 12. Source-of-truth hierarchy

Use this precedence when documentation conflicts:

1. `docs/architecture/*` contracts.
2. `docs/web/implementation-brief.md`.
3. `docs/content/web-content-strategy.md`.
4. `docs/seo/*` strategy documents.
5. brand and research documents.
6. mockups and prototypes.

Mockups never override architecture contracts.
