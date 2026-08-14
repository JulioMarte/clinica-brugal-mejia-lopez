# Navigation Contract

Status: **canonical architecture**

## 1. Purpose

Define CMS-controlled navigation without coupling navigation membership to page existence.

An indexable page does not need to appear in a menu.

A menu item must not create a new page by itself.

## 2. Menus

Initial menu keys:

- `primary`
- `utility`
- `footer`

Each menu belongs to one site and locale.

## 3. Navigation item contract

Each item supports:

```yaml
label: string
page_id: optional
external_url: optional
parent_id: optional
sort_order: integer
enabled: boolean
open_in_new_tab: boolean
```

Exactly one destination must exist:

- `page_id`, or
- `external_url`.

## 4. Submenus

Primary navigation supports nested items.

Initial supported depth:

```text
level 0 → top-level item
level 1 → submenu item
level 2 → optional grouped submenu item
```

Do not exceed three visible levels without a new UX review.

The renderer must reject cycles.

## 5. Page membership

Pages can exist in one of these states:

- indexable and visible in navigation;
- indexable and absent from navigation;
- non-indexable utility page;
- draft and unavailable publicly.

SEO landing pages do not automatically enter the primary menu.

## 6. Primary navigation baseline

The expected initial semantic groups are:

- Médicos
- Especialidades
- Servicios
- Pacientes
- Nosotros

High-intent actions remain separate from ordinary navigation:

- Emergencia
- Agendar cita

The exact labels and memberships remain CMS-configurable after validation.

## 7. Protected behavior

Directus controls data.

Astro controls interaction behavior.

Editors cannot replace menu code, accessibility semantics, focus management, or responsive behavior.

## 8. Accessibility

The menu must support:

- keyboard navigation;
- visible focus;
- semantic links and buttons;
- correct expanded/collapsed state;
- Escape behavior for open menus;
- usable touch targets;
- no hover-only access to submenu content.

## 9. External links

External links must be explicit.

Do not infer an external URL from free text.

Use `open_in_new_tab` sparingly.

When opening a new context, provide appropriate security attributes.

## 10. Validation

Reject navigation configuration when:

- a parent cycle exists;
- an item has no destination;
- an item has both destinations;
- a referenced page is not eligible for the active public build;
- duplicate sort positions create ambiguous ordering where ordering must be deterministic;
- an item belongs to another site.

## 11. Footer

Footer navigation can expose deeper information than the primary menu.

It can include:

- specialties index;
- services index;
- patient information;
- institutional pages;
- contact;
- privacy/legal pages;
- social links.

Footer content must still derive from the canonical navigation/content records.

## 12. Emergency action

Emergency action is operationally critical.

The UI can render it outside the menu hierarchy.

Its label, destination, and verified phone/location data must come from canonical operational records.
