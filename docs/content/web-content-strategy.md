# Web Content Strategy — Melosa Clínica Brugal

Status: **content strategy aligned with canonical architecture**

## 1. Product objective

The public website must first help a patient complete a task.

Brand storytelling and SEO support those tasks but do not replace them.

Primary tasks:

1. Find a doctor.
2. Find a specialty or service.
3. Book or request an appointment.
4. Contact emergency care.
5. Find the clinic and get directions.

Secondary tasks:

- verify insurance information;
- understand a diagnostic service;
- learn about the institution;
- access international-patient information;
- review medical educational content;
- find laboratory/result channels when available.

## 2. Architecture dependency

This document does not define canonical URL mechanics independently.

Use `../architecture/page-rendering-contract.md` for canonical page types and URLs.

Use `../architecture/directus-content-model.md` for structured content fields and relations.

Use `../architecture/navigation-contract.md` for menu membership.

## 3. Homepage hierarchy

Recommended homepage composition:

1. Hero.
2. Quick patient actions.
3. Priority services.
4. Doctor/specialty finder.
5. Cardiovascular feature.
6. Diagnostics feature.
7. Trust/history.
8. International patients.
9. Insurance.
10. Location and directions.
11. Final appointment CTA.
12. Footer.

The CMS can configure allowlisted sections and ordering.

The codebase protects global shell, navigation behavior, accessibility, and SEO primitives.

## 4. Hero

Working copy remains provisional until institutional approval.

### Eyebrow

**Clínica privada en Puerto Plata**

### H1 working copy

**Medicina especializada con trato humano personalizado.**

### Supporting copy

**Especialistas, diagnóstico, emergencias y atención hospitalaria para ti y tu familia.**

### Primary CTA

**Agendar cita**

### Critical CTA

**Emergencia 24/7**

Do not publish an operational emergency claim until verified.

## 5. Quick actions

Potential quick actions:

- Buscar médico.
- Ver especialidades.
- Emergencia.
- Agendar cita.
- Laboratorio.
- Imágenes.
- Seguros.
- Cómo llegar.

These are presentation links.

They do not define separate canonical content types.

For example, a laboratory service can remain canonically under `/servicios/` while being featured directly from the homepage.

## 6. Canonical information architecture

Use these initial page families:

```text
/
├── medicos/
│   └── [slug]/
├── especialidades/
│   └── [slug]/
├── servicios/
│   ├── [slug]/
│   └── [service]/[procedure]/
├── pacientes/
│   └── [slug]/
├── emergencia/
├── ubicaciones/
│   └── [slug]/
├── nosotros/
│   └── [slug]/
├── noticias/
│   └── [slug]/
├── contacto/
└── en/
```

Do not create a second canonical URL for the same service merely because it is commercially important.

Use navigation and homepage features to increase prominence.

## 7. Doctor content model

Each doctor profile uses structured fields.

Required or recommended data can include:

- full professional name;
- display name;
- professional title;
- specialty relation;
- subspecialty relation or verified field;
- profile photo;
- biography;
- education;
- credentials;
- languages;
- service relations;
- insurer relations and exceptions;
- location;
- schedule;
- appointment channel;
- verification status;
- publication status;
- provenance;
- last verified date.

Do not duplicate doctor information as unrelated page copy.

## 8. Specialty content model

A specialty page should answer patient intent.

Suggested structure:

1. What the specialty helps with.
2. Common reasons for consultation.
3. Conditions treated when medically reviewed.
4. Relevant diagnostic studies.
5. Available services or procedures.
6. Participating doctors.
7. Useful FAQs.
8. Appointment action.

Avoid generic textbook openings when a patient-oriented answer is clearer.

## 9. Service and procedure content

A service page can cover:

1. What the service is.
2. Why a physician may request it.
3. How to prepare.
4. Typical administrative or clinical process.
5. Important general precautions.
6. Where the service is provided.
7. How to schedule.
8. Related doctors and specialties.
9. FAQs.

Clinical preparation and safety instructions require appropriate review.

Create a separate procedure page only when it has enough distinct patient value and verified content.

## 10. Emergency content

Emergency information must be visible with minimal interaction.

The canonical operational values must come from verified Directus records.

Do not hardcode working phone numbers, hours, entrance instructions, or addresses into strategy documents as production truth.

The page should prioritize:

- call action;
- directions;
- verified location;
- entrance instructions;
- emergency scope;
- pediatric emergency details when applicable;
- distinction from routine appointments.

The website must not attempt to replace emergency assessment.

## 11. International patients

International care can use reviewed English pages under `/en/`.

Potential content areas:

- emergency care;
- specialists;
- diagnostic services;
- insurance coordination;
- guarantee letters;
- direct billing when verified;
- medical reports;
- interpretation when verified;
- directions;
- contact.

Do not promise English-language or international-patient capabilities that operations cannot consistently provide.

## 12. Language roadmap

### Phase 1

Spanish.

### Phase 2

Reviewed English priority pages.

### Phase 3

Evaluate French from actual operational need.

Do not publish raw machine-translated medical content.

## 13. History content

Working homepage history heading:

**Una historia dedicada a cuidar**

Working narrative can describe multi-decade continuity without asserting a disputed founding year.

The full history page should distinguish:

- documented facts;
- institutional tradition;
- disputed dates;
- medical milestones;
- facility expansion;
- generational transition.

## 14. Trust architecture

Demonstrate trust with evidence:

- real doctors and verified credentials;
- verified specialties;
- actual services;
- real facilities;
- official contact information;
- documented institutional history;
- medical milestones;
- scientific activity;
- insurer information;
- reviewed educational content.

Do not substitute adjectives for evidence.

## 15. Editorial categories

Recommended categories:

- Education.
- Specialists.
- Services.
- History.
- Community.
- Research and education.

## 16. Medical content governance

Substantive medical content should support:

- author;
- medical reviewer;
- publication date;
- last reviewed date;
- references where appropriate;
- verification state;
- publication state;
- review due date.

## 17. SEO and UX

SEO and UX share the same entity architecture.

Examples:

- `/especialidades/cardiologia/`
- `/servicios/resonancia-magnetica/`
- `/medicos/nombre-apellido/`

Do not generate near-duplicate local keyword pages.

## 18. High-value local search intents

Potential intents include:

- cardiólogo en Puerto Plata;
- resonancia magnética Puerto Plata;
- laboratorio clínico Puerto Plata;
- emergencia privada Puerto Plata;
- pediatra Puerto Plata;
- ginecólogo Puerto Plata;
- tomografía Puerto Plata;
- clínica privada Puerto Plata.

International intent can include:

- private medical center Puerto Plata;
- emergency care Puerto Plata;
- English speaking doctor Puerto Plata;
- medical care for tourists Puerto Plata;
- private hospital Puerto Plata.

Use `hospital` descriptively for foreign search intent when useful.

Do not rename the institution around that term.

## 19. NAP consistency

Name, address, and phone must come from canonical operational records.

The site, Google Business Profile, social profiles, directories, and structured data should converge on the same verified values.

Do not treat working research values as production truth.

## 20. Forms

Keep appointment forms short.

Possible fields:

- name;
- phone;
- specialty;
- doctor optional;
- insurance optional;
- preferred date;
- short administrative message.

Do not request unnecessary medical information through a generic public form.

## 21. Photography and media truth

Stock can support development and prototyping.

Never present stock media as actual clinic:

- facilities;
- doctors;
- equipment;
- rooms;
- emergency departments.

Track source, ownership, consent, stock status, and replacement requirements in the media model.

## 22. Content ownership

Assign operational owners before launch.

At minimum define responsibility for:

- doctor roster;
- doctor schedules;
- insurance;
- emergency contacts;
- service availability;
- medical review;
- institutional approval;
- SEO/editorial content;
- English content.

Use `review_due_at` for time-sensitive data.

## 23. LLM editorial use

An LLM can create or update drafts within its Directus role.

It cannot approve or publish content.

Medical and institutional review remain human-controlled.

## 24. Content north star

Every page should answer:

> **What does this patient need to know or do next?**

If content does not improve understanding, trust, navigation, or conversion, do not add it automatically.
