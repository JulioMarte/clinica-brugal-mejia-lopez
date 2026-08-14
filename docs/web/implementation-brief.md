# Web Implementation Brief — Melosa Clínica Brugal

Status: **implementation specification**

## 1. Objective

Build a fast, accessible, maintainable medical website for Melosa Clínica Brugal.

The site must prioritize patient tasks and render structured content without duplicated page copy.

## 2. Canonical architecture

The architecture is no longer framework-agnostic.

Use:

- **Site Foundry** for shared site compilation and orchestration;
- **Astro** for static rendering;
- **Directus** for structured content and editorial workflow;
- **Cloudflare** for static deployment and edge delivery;
- **R2 or equivalent object storage** for managed media when configured.

Read these contracts before implementation:

- `../architecture/site-foundry-integration.md`
- `../architecture/directus-content-model.md`
- `../architecture/page-rendering-contract.md`
- `../architecture/navigation-contract.md`
- `../architecture/publishing-workflow.md`

Architecture contracts override older examples or mockups when conflicts exist.

## 3. Product priorities

The interface must make these tasks easy:

1. Find a doctor.
2. Find a specialty or service.
3. Book or request an appointment.
4. Contact emergency care.
5. Get directions.

Do not optimize the first screen primarily for company history or campaigns.

## 4. Rendering principles

Use reusable Astro page contracts.

Do not create one page file per CMS record.

Render CMS entities through canonical page types:

- home;
- doctor;
- specialty;
- service;
- procedure;
- patient information;
- emergency;
- location;
- article;
- institutional;
- contact.

Use Astro islands only when an interaction requires client-side JavaScript.

Keep crawlable content statically rendered.

## 5. Protected shell

The codebase owns:

- document semantics;
- header mechanics;
- navigation mechanics;
- footer mechanics;
- design tokens;
- accessibility primitives;
- metadata primitives;
- structured-data mapping;
- error handling;
- security-sensitive form behavior.

Directus can configure approved content fields and allowlisted blocks.

Directus must not inject arbitrary executable code.

## 6. Component hierarchy

### Foundations

- color tokens;
- typography;
- spacing;
- grid;
- radii;
- elevation;
- motion;
- iconography;
- accessibility states.

### Primitives

- Button
- Link
- Input
- Select
- Checkbox
- Radio
- Textarea
- Badge
- Icon
- Image

### Components

- Header
- MobileNav
- Hero
- QuickAction
- EmergencyCallout
- DoctorCard
- SpecialtyCard
- ServiceCard
- InsuranceLogo
- SearchField
- FilterGroup
- Breadcrumbs
- FAQ
- Timeline
- ContactPanel
- MapSection
- Footer

Build and validate reusable primitives before scaling page count.

## 7. Content model

Use normalized Directus entities.

Primary logical collections include:

```text
Sites
Pages
Doctors
Specialties
Services
Procedures
Locations
InsuranceProviders
NavigationMenus
NavigationItems
SEOMetadata
MediaAssets
Articles
FAQs
```

Do not hardcode the same doctor, phone, schedule, insurance, service, or address independently across pages.

## 8. Provenance and status

Operational and medical records must support separate verification and publication state.

Minimum model:

```yaml
verification_status: verified | needs_review | historical | deprecated
source_type: client | official_record | official_web | legacy_web | external_directory | research | editorial
source_url: optional
source_id: optional
last_verified_at: optional
verified_by: optional
review_due_at: optional
medical_review_required: true | false
medical_reviewer: optional
publication_status: draft | medical_review | institutional_review | approved | published | archived
```

Do not treat `published` as proof that time-sensitive information remains current forever.

## 9. Editorial permissions

The LLM is a constrained draft editor.

It can create and modify permitted drafts.

It cannot:

- publish;
- approve;
- modify protected schema;
- change roles or permissions;
- delete published records;
- bypass medical review.

Human approval is mandatory for production publication.

## 10. Navigation

Navigation membership is independent from page existence.

A page can be indexable without appearing in the primary menu.

Support:

- primary menu;
- utility menu;
- footer menu;
- nested submenus up to the validated depth in the navigation contract.

High-intent actions such as emergency and appointments can render separately from ordinary navigation.

## 11. Homepage interaction model

### Desktop

Primary semantic navigation starts with:

- Médicos
- Especialidades
- Servicios
- Pacientes
- Nosotros

High-intent actions:

- Emergencia
- Agendar cita

### Mobile

Keep call/emergency and appointment actions easy to reach.

Do not force emergency contact through a menu.

## 12. Accessibility

Target **WCAG 2.2 AA**.

Required engineering considerations:

- semantic HTML;
- correct landmark regions;
- skip navigation;
- logical heading hierarchy;
- keyboard operability;
- visible `:focus-visible`;
- accessible names;
- labels tied to form controls;
- useful error messages;
- sufficient color contrast;
- adequate touch targets;
- reduced-motion support;
- captions or transcripts for important video when needed;
- purpose-based alt text;
- no information conveyed only through color.

## 13. Focus pattern

Working pattern:

```css
:focus-visible {
  outline: 3px solid #F4B400;
  outline-offset: 3px;
}
```

Do not remove visible focus.

## 14. Motion

Include reduced-motion behavior.

Do not depend on animation to reveal medically important information.

## 15. Performance budgets

Aim for strong Core Web Vitals on representative mobile devices.

Targets:

- LCP at or below 2.5 seconds at the 75th percentile;
- INP at or below 200 ms;
- CLS at or below 0.1;
- minimal blocking JavaScript;
- optimized critical media;
- stable dimensions;
- minimal third-party code.

## 16. Images and media

Use responsive formats and explicit dimensions.

Prefer AVIF/WebP when supported.

Lazy-load below-fold media.

Do not ship oversized hero assets.

Each managed media record should support:

- source;
- ownership/license;
- stock status;
- consent status when applicable;
- alt text;
- replacement requirement;
- related entity.

Stock assets must never impersonate real clinic facilities, equipment, or staff.

## 17. Fonts

Working families:

- Manrope for headings;
- Source Sans 3 for body/interface.

Prefer self-hosted WOFF2, required weights only, and `font-display: swap`.

## 18. Structured data

Generate structured data from normalized verified entities.

Evaluate relevant types such as:

- `MedicalClinic`;
- `Organization`;
- `Physician`;
- `BreadcrumbList`;
- `WebSite`;
- relevant medical types when valid.

Do not accept arbitrary JSON-LD from editors.

Never invent credentials, ratings, hours, or services for schema.

## 19. SEO technical baseline

Implement:

- canonical URLs;
- XML sitemap;
- robots controls;
- descriptive titles and descriptions;
- Open Graph metadata;
- crawlable internal links;
- breadcrumbs;
- one clear H1 per page contract;
- language attributes;
- hreflang when validated translations exist;
- structured data;
- clean status codes;
- redirect history for changed public slugs;
- no duplicate legacy domains serving canonical copies.

Canonical URL patterns are defined in `page-rendering-contract.md`.

## 20. Internationalization

Spanish is the source locale.

English is the first reviewed secondary locale.

Evaluate French only after operational validation.

Do not publish unreviewed machine-translated medical copy.

## 21. Forms and privacy

Appointment forms should collect minimal administrative data.

Do not collect detailed health history through a generic public form without a defined legal, security, operational, and privacy requirement.

At minimum:

- HTTPS;
- server-side validation;
- abuse protection;
- retention policy;
- privacy review;
- no sensitive values in analytics URLs or logs.

## 22. Analytics

Track patient-intent actions.

Recommended events:

```text
appointment_click
appointment_submit
call_click
emergency_click
whatsapp_click
doctor_search
doctor_view
specialty_view
service_view
directions_click
insurance_view
international_patient_contact
```

Never send diagnosis, condition, free-text medical messages, or sensitive patient data to general analytics systems.

## 23. Search

Initial doctor/specialty search can filter by:

- doctor name;
- specialty;
- subspecialty;
- insurance;
- language;
- location when relevant.

Symptom-oriented discovery requires separate medical governance.

## 24. Publishing and build lifecycle

Use the workflow defined in `publishing-workflow.md`.

Production publication flow:

```text
human-approved Directus publication
→ authenticated trigger
→ Site Foundry site selection
→ coherent published snapshot
→ content graph validation
→ Astro build
→ quality gates
→ deployment
→ post-deploy checks
```

Fail closed.

Never replace the last known-good deployment with a failed or invalid build.

## 25. Security baseline

- dependency updates;
- secure headers;
- CSP where feasible;
- no secrets in client bundles;
- protected form endpoints;
- CSRF protection where relevant;
- rate limiting and abuse protection;
- server-side validation;
- least-privilege Directus roles;
- audit trail;
- authenticated build triggers;
- backup and rollback strategy.

## 26. Medical-risk principle

The website is not a diagnostic engine.

Do not design content that guarantees outcomes or replaces professional assessment.

Emergency guidance must route users to care instead of attempting self-triage.

## 27. Production readiness

Before launch confirm:

- canonical domain;
- canonical public naming;
- NAP;
- doctor roster;
- service roster;
- schedules;
- insurance;
- legal/privacy copy;
- emergency contact and route;
- approved logos;
- final photography or clearly marked provisional stock;
- translations;
- analytics privacy review;
- structured-data validation;
- accessibility audit;
- performance audit;
- 404/500 behavior;
- build rollback;
- redirect migration.

## 28. Developer north star

A patient must understand the clinic, find the right care path, and take the next action without learning the institution's internal structure.
