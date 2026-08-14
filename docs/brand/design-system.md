# Design System — Melosa Clínica Brugal

## 1. Visual direction

The visual system formalizes the blue-and-white identity already visible in the clinic’s public seal, facade, and current communications.

The objective is not a destructive rebrand. The system should preserve recognition while improving digital legibility, accessibility, consistency, and implementation quality.

Visual qualities:

- clean;
- medical;
- human;
- stable;
- editorial;
- contemporary;
- locally credible.

Avoid a visual language that resembles a SaaS startup, fintech, cosmetic clinic, luxury spa, or generic hospital template.

## 2. Color palette

The following values are the current **digital working palette**. They are proposed implementation tokens, not certified historical Pantone values. Compare them with original vector artwork or any previous brand manual when the client provides those assets.

### Brugal Navy 900

- HEX: `#0B2A6F`
- RGB: `11, 42, 111`
- Use: footer, dark institutional sections, navigation, overlays, authority.

### Brugal Blue 700 — Primary

- HEX: `#123FA3`
- RGB: `18, 63, 163`
- Use: primary buttons, important links, key icons, institutional accents.

### Brugal Blue 600

- HEX: `#1A56BF`
- RGB: `26, 86, 191`
- Use: hover states, secondary blue interaction, information states.

### Brugal Blue 100

- HEX: `#EAF1FF`
- RGB: `234, 241, 255`
- Use: informational backgrounds, badges, quiet panels, FAQ blocks.

### Clinical Blue — Secondary accent

- HEX: `#1A8DBB`
- RGB: `26, 141, 187`
- Use: secondary iconography, diagrams, limited category accents.

Do not use this color with small white text. Its contrast against white is insufficient for normal text at WCAG AA.

### Clinical White

- HEX: `#FFFFFF`
- Use: principal surface and visual breathing room.

### Soft White

- HEX: `#F7F8FA`
- Use: secondary backgrounds, forms, section alternation.

### Clinical Ink

- HEX: `#172033`
- Use: primary text.

### Slate

- HEX: `#5B6575`
- Use: secondary text, labels, metadata.

### Border Grey

- HEX: `#DDE2EA`
- Use: borders, dividers, controls, quiet structural separation.

## 3. Functional colors

Functional colors are not brand colors.

### Success

`#1F7A4C`

### Warning

`#A96600`

### Danger

`#B42318`

### Information

`#1A56BF`

Reserve red for actual errors, danger, or urgent signals. Do not make “Emergency” a large decorative red brand zone.

## 4. Recommended color distribution

Approximate visual balance on a normal page:

- 65% white / soft white
- 25% Brugal blues
- 5% Clinical Blue
- 5% neutral and functional states

The site should feel bright and clear. Do not fill every section with blue.

## 5. Contrast guidance

Approximate contrast ratios against white:

- `#0B2A6F`: 13.3:1
- `#123FA3`: 9.3:1
- `#172033`: 16.3:1
- `#5B6575`: 5.9:1
- `#1A8DBB`: 3.8:1

Use WCAG 2.2 AA as the minimum accessibility target.

## 6. Typography

### Heading family

**Manrope**

Recommended initial web weights:

- 600
- 700

Use for H1-H4, display numbers, high-value CTA labels, and key navigation emphasis.

### Body family

**Source Sans 3**

Recommended initial web weights:

- 400
- 600

Use for body copy, navigation, forms, tables, FAQ, labels, and captions.

For production, prefer self-hosted WOFF2 files with Latin subsets and `font-display: swap` instead of depending on third-party runtime font delivery.

## 7. Type scale

### Desktop

- Display: `64px / 1.05`
- H1: `52px / 1.10`
- H2: `40px / 1.15`
- H3: `30px / 1.20`
- H4: `24px / 1.25`
- Body Large: `20px / 1.55`
- Body: `17px / 1.60`
- Small: `14px / 1.50`
- Caption: `12px / 1.40`

### Mobile

- H1: `38px`
- H2: `32px`
- H3: `26px`
- H4: `22px`
- Body: `17px`

Use fluid sizing where useful, but preserve clear hierarchy.

## 8. Reading width

Editorial body text should generally remain within approximately 60–75 characters per line. Do not stretch long clinical content across the full desktop container.

## 9. Spacing system

Use a 4px base scale:

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64
- 80
- 96
- 128

Do not introduce arbitrary page-specific spacing unless a component genuinely requires it.

## 10. Layout

### Desktop

- 12-column grid
- Maximum content width: approximately `1200–1280px`
- Gutters: `24–32px`

### Mobile

- Horizontal page padding: `16–20px`

Use asymmetric editorial layouts when appropriate. Do not make every section a grid of identical cards.

## 11. Radius

- Small: `8px`
- Medium: `10px`
- Large/card: `16px`

Avoid excessive pill-shaped UI. The visual language should feel medical and professional, not playful.

## 12. Shadows

Use subtle elevation only when it clarifies hierarchy.

Recommended card shadow:

```css
box-shadow: 0 8px 30px rgba(23, 32, 51, 0.08);
```

Avoid large blue glows or highly decorative shadows.

## 13. Buttons

### Primary

- Background: `#123FA3`
- Text: `#FFFFFF`
- Height: `48–52px`
- Radius: `10px`
- Weight: `600–700`

Typical primary action:

**Agendar cita**

### Secondary

- Background: transparent or white
- Border: `#123FA3`
- Text: `#123FA3`

Typical secondary action:

**Ver especialidades**

### Critical action

Emergency is a critical task, not the primary brand CTA. It can receive a special icon, label, or limited danger accent while remaining consistent with the main system.

## 14. Interaction hierarchy

Use one visually dominant primary CTA in a given context.

Recommended global hierarchy:

1. **Agendar cita** — primary conversion action.
2. **Emergencia 24/7** — critical operational action.
3. Buscar médico.
4. Buscar especialidad.
5. Cómo llegar.
6. Seguros / information actions.

## 15. Target sizes

Interactive targets should be comfortably larger than the minimum WCAG requirement. Aim for approximately `44–52px` for important touch controls.

## 16. Focus states

All interactive elements must have visible keyboard focus. Recommended working pattern:

```css
:focus-visible {
  outline: 3px solid #F4B400;
  outline-offset: 3px;
}
```

The focus color is functional and does not need to be a brand color.

## 17. Motion

Support `prefers-reduced-motion`.

Do not make animations essential for understanding content or completing a medical task.

## 18. Iconography

Use one consistent icon family.

Recommended direction:

- line icons;
- 1.5–2px stroke;
- restrained rounding;
- simple medical and navigation metaphors.

A library such as Lucide can be used if licensing and implementation fit the project.

Avoid:

- 3D icons;
- emoji as primary UI icons;
- mixed icon libraries;
- cartoon medical graphics in core navigation.

## 19. Logo strategy

The existing circular seal should be preserved as a **heritage/institutional asset**.

Recommended future logo system:

1. **Primary horizontal lockup** — website, advertising, digital headers.
2. **Heritage seal** — certificates, plaques, historical material, formal documents.
3. **Icon** — favicon, app icon, social profile.
4. **Monochrome versions** — blue and white.

Do not stretch, rotate, add shadows to, recolor arbitrarily, or place the logo over visually noisy photography.

## 20. Photography direction

The preferred photographic style is **documentary healthcare photography**, not generic corporate medical advertising.

Prioritize:

- doctors interacting with patients;
- nursing care;
- families;
- older adults;
- pediatric contexts;
- real diagnostic workflows;
- natural light;
- clean clinical environments;
- believable interactions.

## 21. Stock photography rules

Stock can temporarily illustrate:

- medical specialties;
- symptoms and educational topics;
- generic consultation;
- cardiology;
- pediatrics;
- diagnostic concepts.

Stock must never be presented as evidence of the clinic’s actual:

- facade;
- emergency department;
- rooms;
- UCI;
- MRI equipment;
- medical staff;
- physical installations.

Mark stock assets in the CMS so they can later be replaced.

Suggested metadata:

```yaml
asset_type: stock
replacement_required: true
```

## 22. Video

For production pages:

- prefer a poster image before video;
- defer or lazy-load non-critical video;
- avoid heavy autoplay video on mobile;
- mute autoplay video;
- respect reduced-motion preferences;
- never make essential information available only through video.

## 23. Accessibility target

Target **WCAG 2.2 AA** for the public website.

Minimum requirements include:

- sufficient contrast;
- keyboard access;
- visible focus;
- semantic headings;
- correct form labels;
- useful alt text;
- adequate touch targets;
- error identification;
- reduced motion support;
- no information encoded only by color.

## 24. Developer tokens

```css
:root {
  --font-heading: "Manrope", sans-serif;
  --font-body: "Source Sans 3", sans-serif;

  --brand-900: #0B2A6F;
  --brand-700: #123FA3;
  --brand-600: #1A56BF;
  --brand-100: #EAF1FF;
  --brand-secondary: #1A8DBB;

  --neutral-900: #172033;
  --neutral-600: #5B6575;
  --neutral-200: #DDE2EA;
  --neutral-050: #F7F8FA;
  --white: #FFFFFF;

  --status-success: #1F7A4C;
  --status-warning: #A96600;
  --status-danger: #B42318;
  --status-info: #1A56BF;

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 16px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  --container: 1240px;
}
```

## 25. Design-system principle

Build accessibility and consistency into reusable primitives and components before scaling to dozens of doctors, specialties, services, and content pages.
