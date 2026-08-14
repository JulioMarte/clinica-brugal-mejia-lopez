# Web Content Strategy — Melosa Clínica Brugal

## 1. Product objective

The public website must first help a patient complete a task. Brand storytelling and SEO support those tasks but do not replace them.

Primary tasks:

1. Find a doctor.
2. Find a specialty or service.
3. Book an appointment.
4. Contact emergency care.
5. Find the clinic and get directions.

Secondary tasks:

- verify insurance acceptance;
- understand a diagnostic service;
- learn about the institution;
- access international-patient information;
- review medical educational content;
- find laboratory/result channels where available.

## 2. Homepage hierarchy

Recommended production homepage:

1. **Hero**
2. **Quick patient actions**
3. **Priority services**
4. **Doctor/specialty finder**
5. **Cardiovascular feature**
6. **Diagnostics**
7. **Trust / history**
8. **International patients**
9. **Insurance**
10. **Location and directions**
11. **Final appointment CTA**
12. **Footer**

The homepage should not reproduce the entire brand book or dump all specialties at once.

## 3. Hero

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

## 4. Quick actions

Expose the most important tasks immediately after navigation:

- Buscar médico
- Ver especialidades
- Emergencia 24/7
- Agendar cita
- Laboratorio
- Imágenes
- Seguros
- Cómo llegar

Mobile should keep call and appointment actions easily accessible.

## 5. Progressive disclosure

Do not show forty specialties in one long homepage block.

Show a small group of high-value specialties and provide:

**Ver todas las especialidades →**

The complete directory should support search and filtering.

## 6. Proposed information architecture

```text
/
├── medicos/
│   └── [slug]
├── especialidades/
│   └── [slug]
├── servicios/
│   └── [slug]
├── emergencia/
├── laboratorio/
├── imagenes/
├── cardiovascular/
├── hospitalizacion/
├── cuidados-intensivos/
├── pediatria/
├── seguros/
├── pacientes-internacionales/
├── nosotros/
│   ├── historia/
│   ├── mision-vision-valores/
│   ├── liderazgo/
│   ├── instalaciones/
│   └── investigacion-educacion/
├── noticias/
├── contacto/
└── citas/
```

English can later live under `/en/` with equivalent canonical content where justified.

## 7. Doctor content model

Each doctor profile should contain structured fields rather than a free-form page.

Recommended fields:

- full name;
- professional title;
- specialty;
- subspecialty;
- profile photo;
- short biography;
- education;
- certifications/credentials;
- languages;
- services/procedures;
- insurance accepted;
- clinic location/building;
- consultation schedule;
- appointment channel;
- status (`verified`, `needs_review`, `historical`, `deprecated`);
- last verified date.

Suggested URL:

`/medicos/nombre-apellido`

## 8. Specialty content model

Each specialty page should answer patient questions.

Suggested structure:

1. What the specialty helps with.
2. Common symptoms or reasons for consultation.
3. Conditions treated.
4. Relevant diagnostic studies.
5. Available services or procedures.
6. Doctors in the specialty.
7. Frequently asked questions.
8. Appointment CTA.

Avoid starting every page with textbook definitions such as “Cardiology is a branch of medicine...” when a patient-centered opening can answer intent faster.

Suggested URL:

`/especialidades/cardiologia`

## 9. Service/procedure content model

Example URL:

`/servicios/resonancia-magnetica`

Suggested structure:

1. What the service is.
2. Why a physician may request it.
3. How to prepare.
4. Typical process.
5. Important general precautions.
6. Where the service is located.
7. How to schedule.
8. Related doctors/specialties.
9. FAQ.

Clinical claims and preparation instructions require medical review.

## 10. Emergency page

Emergency information must be visible with minimal scrolling.

Working public information:

- **Emergencia 24 horas**
- **809-586-2519**
- **Calle José del Carmen Ariza #15, Puerto Plata**

The page should prioritize:

- call action;
- directions;
- entrance instructions;
- emergency scope;
- pediatric emergency information if separately operated;
- what to bring when appropriate;
- clear warning that website content is not a substitute for emergency evaluation.

## 11. International patients

International care deserves a dedicated product page.

Recommended URL:

`/en/international-patients`

Recommended H1:

**Medical Care in Puerto Plata**

Content areas:

- 24/7 assistance;
- medical specialties;
- emergency care;
- diagnostic services;
- insurance coordination;
- guarantee letters;
- direct billing where applicable;
- medical reports;
- interpretation;
- directions;
- contact.

## 12. Language roadmap

### Phase 1

Spanish.

### Phase 2

English.

### Phase 3

Evaluate French based on actual international-patient volume and operational language support.

Do not use raw machine translation for medical content without review.

## 13. History content

Working homepage history heading:

**Una historia dedicada a cuidar**

Working copy:

**Melosa Clínica Brugal forma parte de la historia médica de Puerto Plata desde hace más de siete décadas. Su trayectoria conecta la vocación de servicio de sus orígenes con nuevas generaciones de médicos, especialidades y tecnología.**

This copy avoids locking the site to a disputed founding year.

The full history page should distinguish:

- documented facts;
- institutional tradition;
- pending dates;
- major medical milestones;
- facilities expansion;
- generational transition.

## 14. Trust architecture

Do not rely on adjectives such as “excellent” or “leading.”

Demonstrate trust with:

- real doctors and credentials;
- verified specialties;
- actual services;
- real facilities;
- official contact information;
- institutional history;
- documented medical milestones;
- scientific activity;
- insurers;
- international-provider directories;
- reviewed educational content.

## 15. Editorial categories

Recommended content categories:

### Education

Prevention, symptoms, conditions, preparation for studies, patient guidance.

### Specialists

Doctor profiles and professional expertise.

### Services

Explain diagnostics and procedures.

### History

Institutional heritage and milestones.

### Community

Puerto Plata, prevention activities, institutional outreach.

### Research and education

Congresses, scientific presentations, academic collaborations, and medical education.

## 16. Medical content governance

Every substantive medical article should support:

- author;
- medical reviewer;
- initial publication date;
- last reviewed date;
- references where appropriate;
- content status.

## 17. SEO architecture

SEO and UX should share the same information architecture.

Examples:

- `/especialidades/cardiologia`
- `/servicios/resonancia-magnetica`
- `/medicos/nombre-apellido`

Do not create large numbers of near-duplicate keyword pages.

## 18. High-value local search intents

Potential page intent includes:

- cardiólogo en Puerto Plata;
- resonancia magnética Puerto Plata;
- laboratorio clínico Puerto Plata;
- emergencia privada Puerto Plata;
- pediatra Puerto Plata;
- ginecólogo Puerto Plata;
- tomografía Puerto Plata;
- clínica privada Puerto Plata.

International search intent can include:

- private medical center Puerto Plata;
- emergency care Puerto Plata;
- English speaking doctor Puerto Plata;
- medical care for tourists Puerto Plata;
- private hospital Puerto Plata.

Use “hospital” descriptively for foreign search intent when appropriate, not as the institution’s official name.

## 19. NAP consistency

The website, Google Business Profile, social accounts, directories, and schema must use a consistent name, address, and telephone.

Working baseline:

- **Name:** Melosa Clínica Brugal
- **Address:** Calle José del Carmen Ariza #15, Puerto Plata, República Dominicana
- **Phone:** 809-586-2519

Verify before launch.

## 20. Forms

Keep initial appointment forms short.

Working fields:

- name;
- phone;
- specialty;
- doctor optional;
- insurance optional;
- preferred date;
- short administrative message.

Do not request unnecessary sensitive medical information through a generic public form.

## 21. Photography and content truth

Stock may illustrate concepts during development.

Never present stock photography as the clinic’s actual:

- facilities;
- doctors;
- equipment;
- rooms;
- emergency department.

Real institutional imagery should replace stock progressively.

## 22. Content north star

Every page should answer:

> **What does this patient need to know or do next?**

If content does not improve understanding, trust, navigation, or conversion, it should not automatically be added to the page.
