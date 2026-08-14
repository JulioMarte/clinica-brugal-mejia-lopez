import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  scanAstroForHardcodedCopy,
  validateManifest,
  validateSnapshot,
} from './content-contract-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(path.join(root, 'src/content/template-copy.json'), 'utf8'));
const snapshot = JSON.parse(await readFile(path.join(root, 'src/generated/directus-copy.json'), 'utf8'));

const errors = [
  ...validateManifest(manifest),
  ...validateSnapshot(manifest, snapshot),
];

// These routes are temporary placeholder pages. They will disappear when the
// Directus page renderer lands. No new file may be added to this exemption set.
const transitionalPlaceholderPages = new Set([
  'src/pages/404.astro',
  'src/pages/citas/index.astro',
  'src/pages/emergencia/index.astro',
  'src/pages/especialidades/index.astro',
  'src/pages/medicos/index.astro',
  'src/pages/nosotros/index.astro',
  'src/pages/pacientes/index.astro',
  'src/pages/servicios/index.astro',
]);

const findings = await scanAstroForHardcodedCopy(path.join(root, 'src'), transitionalPlaceholderPages);
for (const finding of findings) {
  errors.push(`${finding.filename}: hardcoded ${finding.kind} copy: ${JSON.stringify(finding.value)}`);
}

if (errors.length) {
  console.error('\nCONTENT CONTRACT FAILED\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('\nAll editable template text must use copy("stable.content_key").');
  console.error('Operational data belongs in typed Directus entities, not hardcoded template strings.\n');
  process.exit(1);
}

console.log(`Content contract OK: ${manifest.entries.length} keyed template fields validated.`);
