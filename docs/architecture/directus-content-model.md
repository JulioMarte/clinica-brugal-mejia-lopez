# Directus Content Model Contract

Status: **canonical architecture**

## 1. Purpose

Define the minimum structured content model for Clínica Brugal.

The model supports static Astro rendering through Site Foundry.

It must separate reusable entities from page composition and template copy.

## 2. Core collections

Use these logical collections.

Names can adapt to Site Foundry conventions if semantics stay equivalent.

### `sites`

Required fields:

- `id`
- `key`
- `name`
- `canonical_domain`
- `default_locale`
- `supported_locales`
- `status`

### `template_copy`

Purpose: store versioned, overrideable text originating from the repository template.

Required fields:

- `id`
- `site_key`
- `content_key`
- `locale`
- `template_value`
- `override_value`
- `template_hash`
- `repo_revision`
- `status`

Required constraint:

```text
UNIQUE(site_key, locale, content_key)
```

Enable **Directus Content Versioning** for this collection.

Semantics:

```text
template_value = latest human-approved repository template value
override_value = editorial Directus override
```

Effective public value:

```text
override_value ?? template_value
```

Repository automation may create draft items and update Content Versions.

Repository automation must not patch published main items directly.

See `template-copy-sync.md` for the complete synchronization contract.

### `pages`

Required fields:

- `id`
- `site_id`
- `page_type`
- `slug`
- `locale`
- `title`
- `publication_status`
- `seo_id`
- `layout_variant`
- `last_verified_at`

Optional fields:

- `parent_page_id`
- `summary`
- `hero_id`
- `content_blocks`

Unique constraint:

`site_id + locale + slug`

### `doctors`

Fields should support:

- canonical name;
- display name;
- slug;
- photo;
- biography;
- credentials;
- languages;
- locations;
- appointment channel;
- publication status;
- provenance.

### `specialties`

Fields should support:

- name;
- slug;
- summary;
- medically reviewed description;
- related doctors;
- related services;
- appointment action;
- provenance.

### `services`

Fields should support:

- name;
- slug;
- service family;
- patient description;
- preparation guidance;
- location;
- scheduling guidance;
- related specialties;
- related doctors;
- provenance.

### `procedures`

Use when a procedure needs an independently useful page or structured relation.

Fields should support:

- name;
- slug;
- parent service;
- related specialty;
- related doctors;
- preparation;
- patient guidance;
- provenance.

### `locations`

Fields should support:

- canonical name;
- address;
- coordinates;
- phone;
- hours;
- entrance notes;
- parking notes;
- emergency capability;
- provenance.

### `insurance_providers`

Do not model institution-wide acceptance as a permanent boolean only.

Support scope and exceptions.

Fields should support:

- provider name;
- plan notes;
- institution-level status;
- service exceptions;
- doctor exceptions;
- authorization notes;
- last verified date.

### `navigation_menus`

Fields:

- `id`
- `site_id`
- `key`
- `locale`
- `status`

Examples:

- `primary`
- `footer`
- `utility`

### `navigation_items`

Fields:

- `id`
- `menu_id`
- `label`
- `page_id`
- `external_url`
- `parent_id`
- `sort_order`
- `enabled`
- `open_in_new_tab`

Exactly one destination should exist:

- `page_id`, or
- `external_url`.

### `seo_metadata`

Fields should support:

- title;
- meta description;
- canonical override only when explicitly justified;
- robots directive;
- Open Graph fields;
- social image;
- structured-data options;
- hreflang relationship source.

### `media_assets`

Fields should support:

- file reference;
- source type;
- ownership or license;
- alt text;
- caption;
- consent status;
- stock flag;
- replacement required;
- associated entity;
- provenance.

### `articles`

Fields should support:

- title;
- slug;
- author;
- medical reviewer;
- publication date;
- last review date;
- references;
- body;
- related services;
- related specialties;
- provenance.

### `faqs`

FAQs must be real patient questions.

Fields:

- question;
- answer;
- locale;
- related entity;
- medical review status when needed.

## 3. Relationship rules

Required many-to-many relationships include:

```text
doctor ↔ specialty
doctor ↔ service
specialty ↔ service
service ↔ procedure
page ↔ media
page ↔ FAQ
```

Do not duplicate these relations as free-text lists.

`template_copy` is intentionally key-based and does not replace typed medical entities.

## 4. Provenance contract

Operational and medical content must support:

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

`publication_status` and `verification_status` are separate concepts.

A published record can still become stale and require review.

## 5. Publication invariant

A record is eligible for public rendering only when:

- its publication status permits publication;
- all required relations resolve;
- blocked claims are absent;
- required medical review is complete;
- required locale fields are valid;
- its site relationship matches the build target.

For `template_copy`, only the published main version is eligible for production snapshots.

Draft Content Versions remain invisible until a human promotes them.

## 6. Slug rules

- Use lowercase ASCII slugs.
- Use hyphens as separators.
- Keep one canonical slug per locale and site.
- Preserve redirect history when a published slug changes.
- Never reuse an old public slug for an unrelated entity.

## 7. Localization

Prefer normalized translation records or Directus translation relationships.

Do not place Spanish and English copy in the same arbitrary rich-text field.

Spanish is the source locale.

English requires review before publication.

Template-copy uniqueness includes locale.

## 8. Rich content

Use an allowlisted block model for composable pages.

Allowed block types can include:

- hero;
- rich text;
- doctor grid;
- specialty grid;
- service grid;
- media;
- CTA;
- FAQ;
- timeline;
- contact panel;
- location panel;
- insurance list.

Do not allow arbitrary script, raw iframe, or executable HTML blocks from editorial roles.

## 9. Operational data rule

Frequently changing data must have one canonical record.

Examples:

- phone numbers;
- addresses;
- schedules;
- insurance;
- doctor status;
- emergency hours.

Pages should reference those records instead of copying values.

Do not place these values in `template_copy` merely because they render as text.

## 10. LLM role

The LLM editorial role can write draft content only.

Repository automation can synchronize template proposals only into draft records or Content Versions.

Restrict schema mutation, version promotion, and publication permissions to trusted human administrators.
