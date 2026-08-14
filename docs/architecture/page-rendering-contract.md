# Page Rendering Contract

Status: **canonical architecture**

## 1. Purpose

Define how structured content becomes Astro pages without duplicating templates.

## 2. Rendering model

Every public page resolves through this chain:

```text
content entity
   ↓
page type
   ↓
validated normalized data
   ↓
Astro layout
   ↓
Clínica Brugal theme
   ↓
static page
```

Do not create one bespoke Astro file for every CMS record.

## 3. Canonical page types

Initial page types:

- `home`
- `doctor`
- `specialty`
- `service`
- `procedure`
- `patient_info`
- `emergency`
- `location`
- `article`
- `institutional`
- `contact`

A page type owns one primary rendering contract.

## 4. Canonical URL taxonomy

Use these patterns unless an architecture migration explicitly replaces them:

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
/nosotros/[slug]/                      institutional subpage
/contacto/                             contact
/en/...                                reviewed English equivalents
```

Do not create competing canonical top-level URLs such as `/laboratorio/` and `/servicios/laboratorio-clinico/` for the same entity.

A high-value service can be featured from the homepage or navigation without changing its canonical content type.

## 5. Alias and redirects

Legacy or marketing-friendly paths may redirect to canonical URLs.

Use permanent redirects after migration validation.

Do not serve duplicate indexable content on aliases.

## 6. Layout contracts

### Doctor layout

Requires:

- verified display name;
- specialty relation;
- appointment path or explicit unavailable state;
- profile content status;
- provenance metadata.

### Specialty layout

Requires:

- specialty name;
- patient-oriented description;
- linked doctors when available;
- linked services when available;
- appointment path;
- review metadata when medical content requires it.

### Service layout

Requires:

- service name;
- practical patient description;
- verified location or contact route;
- scheduling guidance;
- related specialty or service family when appropriate.

### Emergency layout

Requires prioritized operational content:

1. emergency action;
2. verified contact;
3. verified location;
4. directions;
5. distinction from routine care.

The emergency layout must not depend on marketing blocks to expose these actions.

## 7. Homepage composition

The homepage may be CMS-configurable through allowlisted blocks.

The following remain protected:

- document semantics;
- global shell;
- header mechanics;
- footer mechanics;
- navigation behavior;
- accessibility rules;
- metadata primitives;
- structured-data primitives.

Allowlisted homepage blocks can include:

- hero;
- quick actions;
- priority services;
- featured specialties;
- featured doctors;
- cardiovascular feature;
- diagnostics feature;
- trust/history;
- international patients;
- insurance;
- location;
- CTA.

## 8. Theme invariants

All page types inherit:

- brand tokens;
- typography;
- spacing system;
- header;
- footer;
- interaction states;
- accessibility behavior;
- responsive breakpoints.

Page-specific content must not redefine the global brand system.

## 9. Metadata contract

Every indexable page must resolve:

- canonical URL;
- title;
- meta description;
- robots directive;
- locale;
- Open Graph metadata;
- breadcrumb data when applicable.

Fallback metadata can derive from verified entity fields.

Editors can override metadata only within validation rules.

## 10. Structured data

Map structured data from normalized entity records.

Do not let editors paste arbitrary JSON-LD.

Examples:

- site/institution → `MedicalClinic` and organization data;
- doctor → `Physician` where valid;
- breadcrumbs → `BreadcrumbList`;
- website → `WebSite`.

Structured data must never contain claims absent from visible content.

## 11. Empty states

A missing optional relation must render a truthful empty state or omit the section.

Do not invent replacement content.

Examples:

- no current doctor schedule → show approved appointment contact path;
- no verified insurance data → omit insurer claims;
- no approved image → use neutral theme treatment.

## 12. Build-time validation

Reject public generation when:

- canonical slug duplicates another page;
- required entity data is missing;
- locale resolution is ambiguous;
- navigation points to an invalid published destination;
- a protected blocked claim is present;
- a required medical review is incomplete.

## 13. Dynamic behavior

Use client-side JavaScript only for interactions that require it.

Search, filters, menus, forms, or appointment widgets can use Astro islands when appropriate.

Static content must remain server-rendered or statically rendered for crawlability and resilience.
