# SEO Information Architecture

Snapshot date: **2026-08-14**

## Objective

Model the real clinic as structured web content.

The website should expose clear relationships between:

**institution → specialties → physicians → services → procedures → patient actions.**

Avoid creating pages only to capture keywords. Every indexable page must represent a real physician, service, specialty, procedure, patient task, or institutional fact.

## Proposed top-level structure

```text
/
├── especialidades/
│   ├── cardiologia/
│   ├── pediatria/
│   ├── ginecologia-obstetricia/
│   ├── ortopedia-traumatologia/
│   ├── gastroenterologia/
│   ├── urologia/
│   ├── neurologia/
│   ├── otorrinolaringologia/
│   └── ...
│
├── servicios/
│   ├── emergencia-24-horas/
│   ├── laboratorio-clinico/
│   ├── resonancia-magnetica/
│   ├── tomografia/
│   ├── rayos-x/
│   ├── sonografia/
│   ├── mamografia/
│   ├── hospitalizacion/
│   └── ...
│
├── medicos/
│   ├── dr-nombre-apellido/
│   ├── dra-nombre-apellido/
│   └── ...
│
├── seguros-medicos/
├── pacientes/
│   ├── citas/
│   ├── emergencia/
│   ├── internamiento/
│   └── preguntas-frecuentes/
│
├── nosotros/
├── contacto/
└── en/
```

The final taxonomy must be generated from verified current clinic data.

## Specialty page contract

Example:

`/especialidades/cardiologia/`

A useful specialty page should contain:

- specialty name;
- patient-oriented explanation;
- conditions and needs treated, when approved;
- available related services or studies;
- participating physicians;
- appointment action;
- clinic location/contact context;
- applicable insurance information when verified;
- medically reviewed content metadata when appropriate;
- internal links to relevant services and physician profiles.

Do not publish a specialty page if the clinic does not currently provide it.

## Physician page contract

Example:

`/medicos/dr-nombre-apellido/`

Each physician profile should support:

- full professional name;
- professional photograph;
- verified specialty;
- verified subspecialty;
- verified training and credentials;
- languages, if verified;
- services performed at the clinic;
- schedule, if operationally maintainable;
- accepted insurers, if verified and maintainable;
- appointment action;
- phone or contact path;
- links to related specialties and procedures.

Physician profiles are important SEO assets because they capture both branded doctor searches and local specialty intent.

## Service and procedure page contract

Example:

`/servicios/resonancia-magnetica/`

A service page should answer practical patient questions:

- What is the service?
- Why might a physician request it?
- Does the clinic currently provide it?
- Is an appointment required?
- What preparation is required?
- What documents should the patient bring?
- Where is the service provided?
- How can the patient contact or book?
- Which physicians or specialties relate to the service?

Do not promise turnaround time, availability, equipment characteristics, or insurance coverage without current verification.

## Emergency page

Emergency intent is different from normal informational SEO.

The emergency page should prioritize immediate action:

1. Emergency phone.
2. Current availability statement.
3. Address.
4. Directions.
5. Clear distinction between emergency and routine appointment channels.

Do not bury emergency actions below marketing content.

## Content graph example: cardiology

```text
/especialidades/cardiologia/
├── linked physicians
├── electrocardiograma
├── ecocardiograma
├── holter
├── MAPA
├── prueba-de-esfuerzo
└── other verified services
```

This is a relationship model, not a requirement to publish each example.

Only publish services that Clínica Brugal actually provides.

## Internal linking rules

Internal links should reflect real semantic relationships.

### Specialty → physician

Every specialty page should link to currently participating physicians.

### Physician → specialty

Every physician should link to verified specialties.

### Procedure → specialty

Every procedure should link to the relevant clinical specialty when appropriate.

### Procedure → physician

Link to physicians only when the association is accurate and useful.

### Informational content → service

Educational content may link to a service when the relationship is clinically appropriate. Avoid manipulative calls to action.

## Spanish and English architecture

Spanish remains the primary site language.

Recommended language architecture:

```text
/          Spanish canonical content
/en/       English content
```

Do not publish the entire English layer until the clinic validates:

- English-capable physicians or staff;
- foreign-patient workflows;
- emergency communication process;
- insurance/payment guidance relevant to visitors.

Priority English pages can include:

```text
/en/
/en/emergency-care-puerto-plata/
/en/doctors/
/en/medical-specialties/
/en/diagnostic-imaging/
/en/laboratory/
/en/contact/
```

## Local SEO entity consistency

The canonical site must maintain consistent:

- institution name;
- address;
- telephone numbers;
- opening or service hours;
- map coordinates;
- physician names;
- specialty names;
- social profiles;
- appointment URLs;
- insurance information.

Operational data that changes frequently should come from one maintainable source whenever possible.

## Structured data direction

Implementation should evaluate appropriate Schema.org types such as:

- `MedicalClinic`;
- `Physician`;
- `MedicalSpecialty` where appropriate;
- `BreadcrumbList`;
- `WebSite`;
- `Organization` or a suitable medical subtype;
- `FAQPage` only when content meets current search-engine eligibility and policy requirements.

Structured data must describe visible, truthful content. It must not introduce claims absent from the page.

## Scale target

A mature site could legitimately reach roughly **100–200 high-quality URLs** if the clinic has enough real physicians, specialties, services, procedures, patient resources, and English-language needs.

This is a capacity estimate, not a page quota.

Never create thin pages solely to reach a numeric target.

## Proposed implementation sequence

### P0 — Canonical entity

- Final domain.
- Canonical institutional name.
- NAP.
- Google Business Profile alignment.
- Core contact and location information.

### P1 — High-intent service pages

- Emergency.
- Diagnostic imaging.
- Laboratory.
- Major clinical services.

### P2 — Specialties and physicians

- Specialty taxonomy.
- Physician profiles.
- Cross-linking.

### P3 — Patient information

- Appointments.
- Insurance.
- Admission/internment instructions.
- Frequently asked questions.

### P4 — English priority layer

Publish only validated high-intent pages first.

### P5 — Educational content

Add medically reviewed informational content after transactional and institutional architecture is solid.