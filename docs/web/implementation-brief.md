# Web Implementation Brief — Melosa Clínica Brugal

## 1. Objective

Translate the documented brand into a fast, accessible, maintainable medical website that prioritizes patient tasks and uses structured content instead of duplicated page copy.

This document is framework-agnostic. The implementation team can later select the framework and CMS based on hosting, editing, localization, forms, and operational requirements.

## 2. Product priorities

The interface must make these tasks easy:

1. Find a doctor.
2. Find a specialty or service.
3. Book an appointment.
4. Call emergency care.
5. Get directions.

Do not optimize the first screen primarily for company history or marketing campaigns.

## 3. Component hierarchy

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

### Page patterns

- homepage;
- doctor profile;
- specialty;
- service/procedure;
- emergency;
- international patient;
- history;
- article;
- contact/location.

Build and validate primitives before producing dozens of content pages.

## 4. Suggested content entities

```text
Brand
Locations
Departments
Doctors
Specialties
Services
InsuranceProviders
ContactChannels
Leadership
HistoricalEvents
MediaAssets
Articles
FAQs
```

Do not hardcode the same doctor, telephone, insurance, or service information independently across multiple pages.

## 5. Status and provenance

Important operational entities should support metadata such as:

```yaml
status: verified | needs_review | historical | deprecated
last_verified_at: YYYY-MM-DD
verified_by: optional
source: optional
```

This is important for:

- doctors;
- schedules;
- insurance;
- contacts;
- services;
- historical claims.

## 6. Homepage interaction model

### Desktop header

Left:

- primary logo lockup.

Primary navigation:

- Médicos
- Especialidades
- Servicios
- Pacientes
- Nosotros

Right:

- Emergencia 24/7
- Agendar cita

### Mobile

Keep at least two high-intent actions close to the thumb:

- Llamar
- Agendar cita

Do not force a patient to open the navigation menu to call the clinic.

## 7. Accessibility

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
- adequate touch target sizes;
- reduced-motion support;
- captions/transcripts for important video content where needed;
- alt text based on image purpose;
- no information conveyed only through color.

## 8. Focus pattern

Working pattern:

```css
:focus-visible {
  outline: 3px solid #F4B400;
  outline-offset: 3px;
}
```

Adapt to component boundaries without removing visible focus.

## 9. Motion

Include:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Do not depend on animation to reveal medically important information.

## 10. Performance budgets

Aim for strong Core Web Vitals on representative mobile devices.

Practical targets:

- LCP around or below 2.5 seconds at the 75th percentile;
- INP around or below 200 ms;
- CLS at or below 0.1;
- minimal blocking JavaScript;
- optimized critical images;
- stable image dimensions;
- minimal third-party scripts.

## 11. Images

Use:

- responsive `srcset`/`sizes`;
- AVIF/WebP where supported by the pipeline;
- explicit width/height or aspect ratio;
- lazy loading below the fold;
- eager loading only for true LCP candidates;
- meaningful alt text.

Do not ship multi-megabyte hero images.

## 12. Video

For non-critical institutional video:

- render a poster first;
- load/embed on interaction or when near viewport;
- avoid heavy autoplay on mobile;
- mute autoplay when used;
- respect reduced motion;
- do not allow video to block primary content rendering.

The current brand mockup embeds a public institutional YouTube video for demonstration. Production should consider a privacy-conscious/lazy embed pattern.

## 13. Fonts

Preferred working families:

- Manrope for headings;
- Source Sans 3 for body/interface.

Production preference:

- self-host WOFF2;
- Latin subset;
- only required weights;
- `font-display: swap`;
- preload only the truly critical font files.

## 14. Structured data

Evaluate and implement valid Schema.org markup for relevant entities.

Priority types/patterns:

- `MedicalClinic`
- `Organization`
- `Physician`
- `MedicalSpecialty`
- `MedicalProcedure` where appropriate
- `FAQPage` only where content and search-engine policy justify it
- `BreadcrumbList`
- `WebSite`

Schema must reflect visible, verified page content. Never invent credentials, ratings, business hours, or services for markup.

## 15. SEO technical baseline

Implement:

- canonical URLs;
- XML sitemap;
- robots controls;
- descriptive titles and meta descriptions;
- Open Graph metadata;
- crawlable internal links;
- breadcrumbs;
- one clear H1 per page pattern;
- language attributes;
- hreflang when multilingual versions exist;
- structured data;
- clean status codes and redirects;
- no duplicate legacy domains serving canonical copies.

## 16. Internationalization

Design content models for multilingual fields before translating.

Recommended sequence:

1. Spanish production source.
2. English reviewed translation.
3. French only after operational validation.

Do not concatenate translation into arbitrary HTML fields that become difficult to maintain.

## 17. Forms and privacy

Appointment forms should minimize collected data.

Do not collect detailed health history through a generic form unless there is a defined legal, security, operational, and privacy requirement.

At minimum:

- encrypt transport with HTTPS;
- validate server-side;
- protect against abuse/spam;
- define retention;
- log administrative events without exposing medical details;
- avoid putting sensitive values in analytics URLs or client-side logs.

## 18. Analytics

Track patient-intent actions, not vanity events only.

Recommended event names:

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

Do not send medical condition, form free-text, or sensitive patient data to general analytics platforms.

## 19. Search

The doctor/specialty search should support useful patient language.

Initial filters:

- doctor name;
- specialty;
- sub-specialty;
- insurance;
- language;
- location/building if relevant.

A symptom-oriented discovery layer can be evaluated later but requires medical governance to avoid unsafe self-triage behavior.

## 20. Maps

Location pages should expose:

- official address;
- entrance information;
- emergency entrance if distinct;
- phone;
- directions link;
- map;
- parking/access notes after validation.

Avoid loading a heavy interactive map before the user needs it if it harms performance.

## 21. Media governance

Every image/video asset should carry metadata for:

- source;
- license/ownership;
- stock vs real;
- alt text;
- subject consent where required;
- replacement requirement;
- associated service/location/person.

## 22. Stock asset contract

During prototyping:

```yaml
asset_type: stock
replacement_required: true
```

Production must never imply that a stock image shows an actual clinic room, machine, or staff member.

## 23. Content review workflow

Recommended status pipeline:

```text
draft → medical_review → institutional_review → approved → published → review_due
```

Historical claims can require an additional documentation review.

## 24. Security baseline

For the public site:

- dependency updates;
- secure headers;
- CSP where feasible;
- no secrets in client bundles;
- protected form endpoints;
- CSRF protections where relevant;
- rate limiting/abuse protection;
- server-side input validation;
- least-privilege CMS roles;
- audit trail for content changes;
- backup/restore strategy.

## 25. Medical-risk principle

The website is not a diagnostic engine. Avoid designs that can be interpreted as giving a diagnosis or guaranteeing treatment outcomes.

Emergency guidance should tell users how to contact care, not attempt to replace professional emergency assessment.

## 26. Production readiness checklist

Before launch confirm:

- official domain and canonical strategy;
- NAP information;
- doctor roster;
- service roster;
- schedules;
- insurance;
- legal/privacy copy;
- emergency phone and route;
- approved logos;
- final photography;
- translations;
- analytics privacy review;
- structured-data validation;
- accessibility audit;
- performance audit;
- 404/500 behavior;
- backup and rollback;
- redirects from legacy URLs.

## 27. Developer north star

A patient should be able to understand who the clinic is, find the relevant care path, and take the next action without learning the organization’s internal structure.
