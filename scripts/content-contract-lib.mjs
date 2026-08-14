import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const KEY_PATTERN = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/;
const LETTER_PATTERN = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿¡]/;

export function hashValue(value) {
  return createHash('sha256').update(String(value), 'utf8').digest('hex');
}

export function validateManifest(manifest) {
  const errors = [];

  if (manifest?.schemaVersion !== 1) errors.push('template-copy schemaVersion must equal 1');
  if (!manifest?.siteKey || typeof manifest.siteKey !== 'string') errors.push('template-copy siteKey is required');
  if (!Array.isArray(manifest?.entries)) errors.push('template-copy entries must be an array');

  const seen = new Set();
  for (const entry of manifest?.entries ?? []) {
    if (!KEY_PATTERN.test(entry.key ?? '')) errors.push(`invalid content key: ${entry.key}`);
    if (seen.has(entry.key)) errors.push(`duplicate content key: ${entry.key}`);
    seen.add(entry.key);
    if (typeof entry.default !== 'string') errors.push(`default must be a string: ${entry.key}`);
    if (!['text', 'textarea', 'richtext'].includes(entry.kind)) errors.push(`invalid kind for ${entry.key}`);
  }

  return errors;
}

export function validateSnapshot(manifest, snapshot) {
  const errors = [];
  const keys = new Set((manifest.entries ?? []).map((entry) => entry.key));

  if (snapshot?.schemaVersion !== manifest?.schemaVersion) errors.push('Directus snapshot schemaVersion does not match manifest');
  if (snapshot?.siteKey !== manifest?.siteKey) errors.push('Directus snapshot siteKey does not match manifest');

  for (const [key, item] of Object.entries(snapshot?.items ?? {})) {
    if (!keys.has(key)) errors.push(`Directus snapshot contains unknown content key: ${key}`);
    if (!item || typeof item.value !== 'string') errors.push(`Directus snapshot value must be a string: ${key}`);
  }

  return errors;
}

export function resolveEffectiveValue(manifest, snapshot, key) {
  const entry = (manifest.entries ?? []).find((candidate) => candidate.key === key);
  if (!entry) throw new Error(`Unknown template copy key: ${key}`);
  const override = snapshot?.items?.[key];
  return override && typeof override.value === 'string' ? override.value : entry.default;
}

async function walk(directory) {
  const files = [];
  for (const dirent of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, dirent.name);
    if (dirent.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function stripNonMarkup(source) {
  let text = source.replace(/^---[\s\S]*?---/m, '');
  text = text.replace(/<style\b[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<!--\s*copy-contract-ignore:[\s\S]*?-->/gi, '');
  return text;
}

export function findHardcodedVisibleCopy(source, filename = '') {
  const findings = [];
  const markup = stripNonMarkup(source);

  const textNode = />\s*([^<>{}\n][^<>{}]*)\s*</g;
  for (const match of markup.matchAll(textNode)) {
    const value = match[1].trim();
    if (!value || !LETTER_PATTERN.test(value)) continue;
    findings.push({ filename, kind: 'text-node', value });
  }

  const copyAttributes = /\b(aria-label|title|placeholder|alt|eyebrow|description|label|text)="([^"]+)"/g;
  for (const match of markup.matchAll(copyAttributes)) {
    const value = match[2].trim();
    if (!value || value.includes('{') || !LETTER_PATTERN.test(value)) continue;
    findings.push({ filename, kind: `attribute:${match[1]}`, value });
  }

  return findings;
}

export async function scanAstroForHardcodedCopy(rootDir, ignoredFiles = new Set()) {
  const files = (await walk(rootDir)).filter((file) => file.endsWith('.astro'));
  const findings = [];

  for (const file of files) {
    const relative = path.relative(process.cwd(), file).replaceAll('\\', '/');
    if (ignoredFiles.has(relative)) continue;
    const source = await readFile(file, 'utf8');
    findings.push(...findHardcodedVisibleCopy(source, relative));
  }

  return findings;
}
