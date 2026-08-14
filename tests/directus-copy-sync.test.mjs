import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { hashValue } from '../scripts/content-contract-lib.mjs';

const manifest = JSON.parse(await readFile(new URL('../src/content/template-copy.json', import.meta.url), 'utf8'));

function runSync(baseUrl) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/directus-copy-sync.mjs', 'push-draft'], {
      cwd: new URL('..', import.meta.url),
      env: {
        ...process.env,
        DIRECTUS_URL: baseUrl,
        DIRECTUS_TOKEN: 'test-token',
        DIRECTUS_SITE_KEY: manifest.siteKey,
        GITHUB_SHA: 'deadbeef',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

test('push-draft writes changed published copy only through a Directus Content Version', async (t) => {
  const changedKey = 'hero.eyebrow';
  const requests = [];
  const remoteItems = manifest.entries.map((entry, index) => ({
    id: index + 1,
    site_key: manifest.siteKey,
    content_key: entry.key,
    template_value: entry.default,
    override_value: null,
    template_hash: entry.key === changedKey ? 'stale-hash' : hashValue(entry.default),
    status: 'published',
  }));

  const server = http.createServer(async (req, res) => {
    let body = '';
    for await (const chunk of req) body += chunk;
    requests.push({ method: req.method, url: req.url, body });

    res.setHeader('content-type', 'application/json');

    if (req.method === 'GET' && req.url.startsWith('/items/template_copy?')) {
      res.end(JSON.stringify({ data: remoteItems }));
      return;
    }

    if (req.method === 'GET' && req.url.startsWith('/versions?')) {
      res.end(JSON.stringify({ data: [] }));
      return;
    }

    if (req.method === 'POST' && req.url === '/versions') {
      res.end(JSON.stringify({ data: { id: 'version-1', key: 'repo-sync' } }));
      return;
    }

    if (req.method === 'PATCH' && req.url.includes('?version=repo-sync')) {
      res.end(JSON.stringify({ data: { id: 1 } }));
      return;
    }

    res.statusCode = 500;
    res.end(JSON.stringify({ error: `unexpected request: ${req.method} ${req.url}` }));
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const address = server.address();
  const result = await runSync(`http://127.0.0.1:${address.port}`);

  assert.equal(result.code, 0, result.stderr || result.stdout);

  const patches = requests.filter((request) => request.method === 'PATCH');
  assert.equal(patches.length, 1);
  assert.match(patches[0].url, /\?version=repo-sync$/);
  assert.equal(requests.some((request) => request.method === 'PATCH' && !request.url.includes('version=')), false);

  const versionCreate = requests.find((request) => request.method === 'POST' && request.url === '/versions');
  assert.ok(versionCreate, 'a Directus content version must be created before patching published content');

  const payload = JSON.parse(patches[0].body);
  assert.equal(payload.template_value, manifest.entries.find((entry) => entry.key === changedKey).default);
  assert.equal(payload.repo_revision, 'deadbeef');
});
