import manifest from '../content/template-copy.json';
import directusSnapshot from '../generated/directus-copy.json';

type ManifestEntry = {
  key: string;
  default: string;
  kind: 'text' | 'textarea' | 'richtext';
};

type DirectusOverride = {
  value: string;
  templateHash?: string;
  source?: string;
};

const entries = manifest.entries as ManifestEntry[];
const defaults = new Map(entries.map((entry) => [entry.key, entry.default]));
const overrides = directusSnapshot.items as Record<string, DirectusOverride>;

export type CopyKey = (typeof manifest.entries)[number]['key'];

export function copy(key: CopyKey | string): string {
  const fallback = defaults.get(key);

  if (fallback === undefined) {
    throw new Error(`Unknown template copy key: ${key}`);
  }

  const override = overrides[key];
  if (override && typeof override.value === 'string') {
    return override.value;
  }

  return fallback;
}

export function hasCopyKey(key: string): boolean {
  return defaults.has(key);
}
