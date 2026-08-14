import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'src/content/template-copy.json');
const snapshotPath = path.join(root, 'src/generated/directus-copy.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

const mode = process.argv[2];
if (!['pull', 'push-draft', 'check-remote'].includes(mode)) {
  console.error('Usage: node scripts/directus-copy-sync.mjs <pull|push-draft|check-remote>');
  process.exit(2);
}

const baseUrl = process.env.DIRECTUS_URL?.replace(/\/$/, '');
const token = process.env.DIRECTUS_TOKEN;
const siteKey = process.env.DIRECTUS_SITE_KEY ?? manifest.siteKey;
const collection = process.env.DIRECTUS_COPY_COLLECTION ?? 'template_copy';
const versionKey = process.env.DIRECTUS_COPY_VERSION_KEY ?? 'repo-sync';

if (!baseUrl || !token) {
  console.error('DIRECTUS_URL and DIRECTUS_TOKEN are required.');
  process.exit(2);
}

function sha256(value) {
  return createHash('sha256').update(String(value), 'utf8').digest('hex');
}

async function request(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${options.method ?? 'GET'} ${endpoint} failed (${response.status}): ${body}`);
  }

  if (response.status === 204) return null;
  const json = await response.json();
  return json?.data ?? json;
}

function query(value) {
  return encodeURIComponent(value);
}

async function readMainItems() {
  const fields = 'id,site_key,content_key,template_value,override_value,template_hash,status';
  const endpoint = `/items/${collection}?filter[site_key][_eq]=${query(siteKey)}&limit=-1&fields=${query(fields)}`;
  return await request(endpoint);
}

async function pull() {
  const items = await readMainItems();
  const known = new Set(manifest.entries.map((entry) => entry.key));
  const output = {};
  const unknown = [];

  for (const item of items) {
    if (!known.has(item.content_key)) {
      unknown.push(item.content_key);
      continue;
    }

    if (item.status !== 'published') continue;

    const effective = typeof item.override_value === 'string'
      ? item.override_value
      : item.template_value;

    if (typeof effective !== 'string') continue;

    output[item.content_key] = {
      value: effective,
      templateHash: item.template_hash ?? null,
      source: typeof item.override_value === 'string' ? 'directus_override' : 'directus_template',
    };
  }

  if (unknown.length) {
    throw new Error(`Directus contains unknown content keys: ${unknown.sort().join(', ')}`);
  }

  const snapshot = {
    schemaVersion: manifest.schemaVersion,
    siteKey,
    generatedAt: new Date().toISOString(),
    items: output,
  };

  await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  console.log(`Pulled ${Object.keys(output).length} published Directus copy overrides.`);
}

async function readVersion(itemId) {
  const endpoint = `/versions?filter[collection][_eq]=${query(collection)}&filter[item][_eq]=${query(String(itemId))}&filter[key][_eq]=${query(versionKey)}&limit=1`;
  const versions = await request(endpoint);
  return versions?.[0] ?? null;
}

async function createVersion(itemId) {
  return await request('/versions', {
    method: 'POST',
    body: JSON.stringify({
      collection,
      item: String(itemId),
      key: versionKey,
      name: 'Repository template sync',
    }),
  });
}

async function patchVersion(itemId, fields) {
  await request(`/items/${collection}/${query(String(itemId))}?version=${query(versionKey)}`, {
    method: 'PATCH',
    body: JSON.stringify(fields),
  });
}

async function createDraftItem(entry, revision) {
  return await request(`/items/${collection}`, {
    method: 'POST',
    body: JSON.stringify({
      site_key: siteKey,
      content_key: entry.key,
      template_value: entry.default,
      override_value: null,
      template_hash: sha256(entry.default),
      repo_revision: revision,
      status: 'draft',
    }),
  });
}

async function pushDraft() {
  const revision = process.env.GITHUB_SHA ?? process.env.CONTENT_REPO_REVISION ?? 'local';
  const remoteItems = await readMainItems();
  const byKey = new Map(remoteItems.map((item) => [item.content_key, item]));
  let created = 0;
  let versioned = 0;

  for (const entry of manifest.entries) {
    const remote = byKey.get(entry.key);
    const fields = {
      template_value: entry.default,
      template_hash: sha256(entry.default),
      repo_revision: revision,
    };

    if (!remote) {
      await createDraftItem(entry, revision);
      created += 1;
      continue;
    }

    if (remote.template_hash === fields.template_hash) continue;

    const version = await readVersion(remote.id);
    if (!version) await createVersion(remote.id);
    await patchVersion(remote.id, fields);
    versioned += 1;
  }

  console.log(`Directus draft sync complete: ${created} new drafts, ${versioned} versioned updates.`);
  console.log('No published Directus item was overwritten. Human promotion remains required.');
}

async function checkRemote() {
  const remoteItems = await readMainItems();
  const known = new Map(manifest.entries.map((entry) => [entry.key, entry]));
  const errors = [];

  for (const item of remoteItems) {
    if (!known.has(item.content_key)) errors.push(`unknown remote content key: ${item.content_key}`);
  }

  const remoteKeys = new Set(remoteItems.map((item) => item.content_key));
  for (const key of known.keys()) {
    if (!remoteKeys.has(key)) errors.push(`missing remote content key: ${key}`);
  }

  if (errors.length) {
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Remote contract OK: ${remoteItems.length} Directus records match known keys.`);
}

if (mode === 'pull') await pull();
if (mode === 'push-draft') await pushDraft();
if (mode === 'check-remote') await checkRemote();
