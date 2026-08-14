# Clínica Brugal Mejía López — Project Documentation

This folder is the source of truth for the branding, institutional research, content strategy, SEO strategy, architecture, and web implementation of Melosa Clínica Brugal.

## Purpose

The project does not start from a blank brand.

Melosa Clínica Brugal already has a recognized name, historical identity, blue-and-white visual territory, public philosophy, local recognition, and broad clinical offering.

This documentation organizes those assets and translates them into a maintainable digital system.

The website must also function as a structured, indexable representation of the real institution.

It must connect the clinic with its physicians, specialties, services, procedures, local presence, and patient actions.

## Canonical architecture

The implementation uses:

- Site Foundry for reusable site compilation and orchestration;
- Astro for static rendering;
- Directus for structured content and editorial workflow;
- Cloudflare for target static delivery;
- managed object storage such as R2 for media when configured.

These are accepted architecture decisions.

Do not treat framework and CMS selection as open questions.

## Architecture contracts

The files under `architecture/` are normative contracts.

- `architecture/site-foundry-integration.md` — ownership boundaries, Site Foundry integration, local preview modes, protected shell, and LLM boundary.
- `architecture/directus-content-model.md` — canonical collections, relations, provenance, publication status, localization, and content rules.
- `architecture/page-rendering-contract.md` — page types, canonical URL taxonomy, Astro rendering, homepage composition, aliases, and build validation.
- `architecture/navigation-contract.md` — menus, submenus, page membership, navigation data, accessibility, and validation.
- `architecture/publishing-workflow.md` — editorial roles, LLM permissions, publication gates, rebuild flow, failure behavior, rollback, and auditability.

## Documentation map

### Brand

- `brand/brand-foundation.md` — brand identity, positioning, naming, voice, claims, and brand architecture.
- `brand/design-system.md` — color, typography, spacing, accessibility, UI foundations, imagery, and visual rules.

### Research

- `research/institutional-research.md` — reconstructed history, public evidence, services, milestones, and unresolved historical questions.
- `sources/source-registry.md` — public research sources and intended evidence use.
- `open-questions.md` — information requiring direct client confirmation.

### Content

- `content/web-content-strategy.md` — patient tasks, homepage hierarchy, content models, editorial guidance, and SEO-aware content strategy.

### SEO

- `seo/competitive-analysis.md` — Puerto Plata competitor landscape and SEO findings.
- `seo/information-architecture.md` — SEO entity graph, page contracts, internal linking, and rollout order.
- `seo/keyword-strategy.md` — keyword clusters, search intent, page ownership, and measurement strategy.
- `seo/source-register.md` — competitor research sources and evidence-handling rules.
- `domain-seo-and-digital-identity.md` — domain research, digital naming, defensive domains, and local SEO identity considerations.

### Web

- `web/implementation-brief.md` — implementation specification aligned with the architecture contracts.

### Mockups

- `mockups/brand-mockup-v2.html` — interactive brand/design-system mockup.

Mockups are illustrative.

They do not override architecture, accessibility, content, or publication contracts.

## Source-of-truth precedence

When two documents conflict, use this order:

1. `architecture/*` canonical contracts.
2. `web/implementation-brief.md`.
3. `content/web-content-strategy.md`.
4. `seo/*` strategy documents.
5. `brand/*` and `research/*` documents.
6. mockups and prototypes.

A later approved architecture decision should update conflicting lower-level documents.

Do not leave contradictory instructions unresolved.

## Canonical public naming model

Use this working hierarchy until the client gives final approval:

- Canonical entity: **Melosa Clínica Brugal**
- Preferred short commercial expression: **Clínica Brugal**
- Historical/alternate expression: **Clínica Brugal Mejía López**
- Legal name: **MELOSA CLINICA BRUGAL SRL**
- Search alias only when context requires it: **Hospital Brugal**

Do not promote `Hospital Brugal` as the Spanish commercial brand.

## Core brand direction

The central brand territory is:

> **A historic medical institution of Puerto Plata that continues to evolve with medicine.**

The digital identity must communicate two ideas:

> **We have cared for generations.**

and

> **We continue to advance with medicine.**

## SEO strategic direction

The website should model this relationship explicitly:

> **Clínica Brugal → Puerto Plata → specialties → physicians → services → procedures → patient intent → appointment/contact.**

The current principal SEO benchmark is Centro Médico Dr. Bournigal because it exposes a larger indexable surface across services, specialties, physicians, and appointments.

The opportunity for Clínica Brugal is broader than ranking for one phrase such as `clínica Puerto Plata`.

Build useful pages around real medical entities and high-intent patient needs that the clinic can actually satisfy.

## Canonical URL taxonomy

The architecture contract controls URLs.

Initial patterns:

```text
/                                      home
/medicos/[slug]/                       doctor
/especialidades/[slug]/                specialty
/servicios/[slug]/                     service
/servicios/[service]/[procedure]/      procedure when nested context is useful
/pacientes/[slug]/                     patient information
/emergencia/                           emergency
/ubicaciones/[slug]/                   location
/noticias/[slug]/                      article/news
/nosotros/[slug]/                      institutional page
/contacto/                             contact
/en/...                                reviewed English equivalents
```

Do not create duplicate canonical pages for the same entity.

## Status model

Verification state and publication state are separate.

### Verification

- `verified`
- `needs_review`
- `historical`
- `deprecated`

### Publication

- `draft`
- `medical_review`
- `institutional_review`
- `approved`
- `published`
- `archived`

Competitive research can additionally use dated labels such as `competitive_observation` and `time_sensitive` in narrative documents.

## Provenance baseline

Operational and medical entities should support:

```yaml
verification_status:
source_type:
source_url:
source_id:
last_verified_at:
verified_by:
review_due_at:
medical_review_required:
medical_reviewer:
publication_status:
```

This is especially important for:

- doctors;
- schedules;
- insurance;
- emergency contacts;
- service availability;
- equipment claims;
- historical claims;
- international-patient capabilities.

## LLM publication invariant

An LLM can act as a constrained Directus draft editor.

It can create and modify permitted drafts.

It cannot publish, approve its own work, change protected schema, modify permissions, or delete published content.

Human approval is mandatory for publication.

## Current critical caution

The existing public material contains conflicting foundation dates, including references to 1936 and 1973.

Independent historical material better supports a clinical association in the 1940s and the creation of Dr. Francisco “Panchito” Brugal's own clinic in 1952.

Do not publish a definitive founding year until documentary evidence from the institution resolves the conflict.

## Current brand baseline

- Primary entity: **Melosa Clínica Brugal**
- Short form: **Clínica Brugal**
- Existing philosophy: **Medicina especializada con trato humano personalizado.**
- Existing tagline: **Cuidarte es amarte.**
- Geographic anchor: **Puerto Plata, República Dominicana**
- Primary visual territory: **blue + white**
- Primary archetype: **Caregiver**
- Secondary archetype: **Sage**

## Working principle

The website must first help a patient complete a task:

1. Find a doctor.
2. Find a specialty or service.
3. Book or request an appointment.
4. Contact emergency care.
5. Find the clinic and get directions.

History, brand storytelling, institutional news, and educational content support trust.

They must not block these primary tasks.

## SEO implementation principle

Do not build a thin brochure site with one generic services page.

Give real high-value entities structured content when justified:

- physicians;
- specialties;
- diagnostic services;
- procedures;
- emergency care;
- patient information;
- insurance information;
- English visitor information.

Do not create doorway pages, keyword-stuffed city pages, fake FAQs, fabricated claims, or pages for services the clinic does not provide.

## Documentation status

Current SEO research snapshot: **2026-08-14**.

Competitive rankings, ratings, review counts, physician rosters, schedules, services, and insurance are time-sensitive.

Revalidate them before publication or formal reporting.
