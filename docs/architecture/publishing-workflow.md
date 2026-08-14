# Publishing and Rebuild Workflow

Status: **canonical architecture**

## 1. Purpose

Define how Directus content becomes a public static deployment.

Publication is an explicit controlled transition.

## 2. Editorial states

Use this workflow:

```text
draft
  ↓
medical_review       when medical review is required
  ↓
institutional_review
  ↓
approved
  ↓
published
  ↓
review_due or archived
```

Not every administrative page requires medical review.

Medical content cannot skip required medical review.

## 3. LLM permissions

The LLM acts as a draft editor.

Allowed:

- create draft records;
- update permitted draft records;
- propose relations;
- propose navigation changes;
- propose metadata;
- prepare translations;
- attach permitted media.

Forbidden:

- set `published`;
- approve its own work;
- bypass review states;
- change role permissions;
- mutate protected schema;
- delete published content;
- modify audit history.

## 4. Human roles

### Editor

Can review and revise drafts.

### Medical reviewer

Can approve clinical accuracy where assigned.

### Institutional approver

Can approve branding, operations, history, and publication readiness.

### Publisher/administrator

Can transition approved content into public publication state.

Use least privilege.

## 5. Publication trigger

A human publication action can trigger the Site Foundry build pipeline.

Preferred flow:

```text
Human publishes in Directus
        ↓
validated webhook/event
        ↓
Site Foundry selects affected site
        ↓
fetch published snapshot
        ↓
validate content graph
        ↓
Astro build
        ↓
quality gates
        ↓
deploy static artifact
        ↓
post-deploy verification
```

## 6. Build isolation

A Clínica Brugal content event must rebuild only the intended site unless a shared dependency requires broader rebuilds.

Cross-site content leakage is a release-blocking defect.

## 7. Snapshot rule

Build from a coherent content snapshot.

Do not mix records from different publication moments when consistency matters.

The build log should record enough identifiers to reproduce the content version used.

## 8. Pre-build gates

Validate at minimum:

- unique canonical paths;
- valid required relations;
- site ownership;
- locale consistency;
- navigation acyclicity;
- publication eligibility;
- required review completion;
- media references;
- structured-data inputs;
- blocked claims;
- redirect conflicts.

## 9. Build failure

Fail closed.

When validation or build fails:

- do not replace the last known-good production deployment;
- record the failure;
- surface the affected record or validation reason;
- allow human correction and rebuild.

## 10. Directus outage

A Directus outage must not remove the live static website.

Existing production static assets remain available.

New builds can fail until content access returns.

## 11. Media failure

Missing required media blocks publication only when the page contract marks it required.

Missing optional media must use an approved empty state.

Do not publish broken image references.

## 12. Post-deploy checks

Verify:

- homepage response;
- representative doctor page;
- representative specialty page;
- representative service page;
- emergency route;
- sitemap;
- robots;
- canonical metadata;
- navigation;
- critical forms/CTAs;
- 404 behavior.

## 13. Rollback

Retain a last known-good deployment artifact or platform deployment revision.

Rollback must not depend on restoring mutable CMS state first.

## 14. Revalidation

Time-sensitive records should support `review_due_at`.

Examples:

- doctor roster;
- schedules;
- insurance;
- emergency contacts;
- service availability;
- international-patient capabilities.

A scheduled governance process should surface overdue records.

An overdue record does not automatically become false.

It becomes a review risk that requires policy-based handling.

## 15. Auditability

Record:

- actor;
- transition;
- timestamp;
- record;
- previous state;
- new state;
- build/deployment identifier when publication occurs.

## 16. Security

Webhook or event triggers must authenticate requests.

Do not expose Directus administrative credentials to the browser or static bundle.

Build credentials must use least privilege.

## 17. Production invariant

Only human-approved published content can enter a production build.

No LLM action can directly cross this boundary.
