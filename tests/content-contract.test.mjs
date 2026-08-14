import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  findHardcodedVisibleCopy,
  hashValue,
  resolveEffectiveValue,
  validateManifest,
  validateSnapshot,
} from '../scripts/content-contract-lib.mjs';

const manifest = JSON.parse(await readFile(new URL('../src/content/template-copy.json', import.meta.url), 'utf8'));
const snapshot = JSON.parse(await readFile(new URL('../src/generated/directus-copy.json', import.meta.url), 'utf8'));

test('template copy manifest is structurally valid', () => {
  assert.deepEqual(validateManifest(manifest), []);
});

test('generated Directus snapshot cannot introduce unknown keys', () => {
  assert.deepEqual(validateSnapshot(manifest, snapshot), []);
});

test('Directus override always wins over repository template default', () => {
  const local = {
    schemaVersion: 1,
    siteKey: manifest.siteKey,
    items: {
      'hero.eyebrow': { value: 'Override from Directus' },
    },
  };

  assert.equal(resolveEffectiveValue(manifest, local, 'hero.eyebrow'), 'Override from Directus');
});

test('repository template default is used only when Directus has no override', () => {
  const entry = manifest.entries.find((candidate) => candidate.key === 'hero.eyebrow');
  assert.equal(resolveEffectiveValue(manifest, { items: {} }, 'hero.eyebrow'), entry.default);
});

test('unknown copy key fails closed instead of silently rendering missing copy', () => {
  assert.throws(
    () => resolveEffectiveValue(manifest, snapshot, 'this.key.does.not.exist'),
    /Unknown template copy key/,
  );
});

test('template hashes are deterministic and change with copy', () => {
  assert.equal(hashValue('same'), hashValue('same'));
  assert.notEqual(hashValue('same'), hashValue('changed'));
});

test('hardcoded text-node copy is detected', () => {
  const findings = findHardcodedVisibleCopy('<section><h1>Texto generado por un LLM</h1></section>', 'example.astro');
  assert.equal(findings.length, 1);
  assert.equal(findings[0].kind, 'text-node');
});

test('hardcoded editable attributes are detected', () => {
  const findings = findHardcodedVisibleCopy('<img alt="Fotografía de la clínica" />', 'example.astro');
  assert.equal(findings.length, 1);
  assert.equal(findings[0].kind, 'attribute:alt');
});

test('Astro expressions are not treated as hardcoded copy', () => {
  const findings = findHardcodedVisibleCopy('<h1>{copy("hero.eyebrow")}</h1>', 'example.astro');
  assert.deepEqual(findings, []);
});
