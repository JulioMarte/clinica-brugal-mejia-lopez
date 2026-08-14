# Template Copy Synchronization Contract

Status: **canonical architecture**

## Objective

Allow an LLM to design and edit a site template in Git without making Git the permanent owner of editable website copy.

Every editable template string must have a stable `content_key`.

Directus can override any registered template string without changing Astro source code.

Repository changes must be synchronized to Directus as drafts. They must never overwrite published Directus content automatically.

## Ownership model

Do not synchronize by comparing visible sentences.

Use stable keys.

```text
content_key
   │
   ├── repository template default
   │
   ├── Directus template value
   │
   └── Directus override value
```

The effective value follows this precedence:

```text
Directus override
    > Directus published template value
    > repository template default
```

The repository default is a bootstrap and design-time fallback.

After Directus contains a published value, Directus is the runtime content authority.

## Two content classes

### Template copy

Examples:

- headings;
- CTA labels;
- hero copy;
- navigation labels;
- accessibility labels;
- section descriptions;
- reusable interface copy.

Store these fields in the keyed template-copy contract.

### Operational entities

Examples:

- physicians;
- specialties;
- services;
- phone numbers;
- addresses;
- schedules;
- insurers;
- equipment;
- locations.

Do not flatten these entities into template strings.

Store them in typed Directus collections.

## Repository manifest

Canonical file:

```text
src/content/template-copy.json
```

Each entry contains:

```json
{
  "key": "hero.eyebrow",
  "default": "Clínica privada en Puerto Plata",
  "kind": "text"
}
```

Rules:

1. Keys are stable identifiers.
2. Do not rename a key to edit its value.
3. Keys must be unique per site and locale.
4. A value change does not change the key.
5. Removing a key requires a migration and dependency check.
6. The LLM can change `default` values on a development branch.
7. The LLM must not bypass the manifest by hardcoding visible copy in Astro.

## Directus collection

Create a `template_copy` collection with at least:

```text
id
site_key
content_key
locale
template_value
override_value
template_hash
repo_revision
status
```

Recommended constraints:

```text
UNIQUE(site_key, locale, content_key)
NOT NULL site_key
NOT NULL content_key
NOT NULL locale
```

Enable Directus Content Versioning for this collection.

Directus Content Versions provide unpublished copies of an item that can be reviewed and promoted later.

## Effective-value rule

For a published Directus item:

```text
if override_value is not null:
    effective = override_value
else:
    effective = template_value
```

The generated Astro snapshot stores only the effective published value.

The runtime does not fetch Directus from the browser.

## Git to Directus flow

```text
LLM edits template-copy.json
          │
          ▼
content contract tests
          │
          ▼
push-draft synchronization
          │
          ├── new key -> new Directus item with status=draft
          │
          └── existing key -> Directus Content Version `repo-sync`
                                  │
                                  ▼
                           human review
                                  │
                                  ▼
                              promote
```

The synchronizer must never patch the main published item for an existing record.

This is a tested invariant.

## Directus to Git/build flow

```text
Directus published main
        │
        ▼
content:pull
        │
        ▼
src/generated/directus-copy.json
        │
        ▼
Astro build
```

A Directus override has higher precedence than the repository template default.

This is also a tested invariant.

## Why the generated snapshot exists

The snapshot gives the static build these properties:

- deterministic input;
- no Directus dependency in the browser;
- reproducible builds;
- reviewable build artifacts;
- fail-closed behavior;
- no accidental fallback to stale hardcoded template copy.

Do not manually edit `src/generated/directus-copy.json`.

## Hard test rules

CI must fail when:

1. a template key is duplicated;
2. a key uses an invalid format;
3. the generated Directus snapshot contains an unknown key;
4. visible Astro text is hardcoded outside the content contract;
5. an editable `alt`, `title`, `placeholder`, `aria-label`, or equivalent value is hardcoded;
6. code requests an unknown key;
7. Directus override precedence fails;
8. repository fallback precedence fails;
9. Git-to-Directus synchronization attempts to patch a published main item;
10. a remote Directus key is unknown to the repository contract.

## Temporary placeholder exemption

The initial hand-written placeholder routes predate this contract.

They are explicitly listed in `scripts/content-contract.mjs` as transitional debt.

Do not add new exemptions.

Remove the exemption list when the Directus page renderer replaces those routes.

## Sync commands

```bash
npm run content:check
npm run content:pull
npm run content:push-draft
npm run content:check-remote
npm test
```

Required environment variables for Directus operations:

```text
DIRECTUS_URL
DIRECTUS_TOKEN
```

Optional:

```text
DIRECTUS_SITE_KEY
DIRECTUS_COPY_COLLECTION
DIRECTUS_COPY_VERSION_KEY
```

## Permissions

The synchronization token can:

- read the required `template_copy` records;
- create new draft records;
- create and update content versions.

The synchronization token must not have permission to promote versions or publish items.

Human/editor roles retain promotion and publication authority.

## Conflict policy

Do not use last-write-wins between Git and Directus.

The fields have different responsibilities:

```text
template_value -> proposal originating from the repository template
override_value -> editorial override originating from Directus
```

An editorial override therefore survives later LLM template changes.

If the LLM changes the repository default, the draft version changes `template_value` only.

The human can review the template change before promotion.

## Deletion policy

Deleting a key from Git must not automatically delete its Directus record.

Key retirement requires:

1. usage search;
2. replacement mapping if needed;
3. Directus dependency check;
4. human approval;
5. deprecation or archive;
6. later physical deletion if safe.

## LLM invariant

An LLM can design the template.

An LLM can propose copy.

An LLM can synchronize its proposal into a Directus draft.

An LLM cannot silently make itself the production content authority.
