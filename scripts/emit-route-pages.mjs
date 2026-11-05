import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const routes = JSON.parse(await readFile('src/app/routeManifest.json', 'utf8'));
const source = await readFile('dist/index.html', 'utf8');

function escapeTitle(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

for (const route of routes) {
  if (route.name === 'home') continue;
  const target = join('dist', route.name);
  await mkdir(target, { recursive: true });
  const html = source.replace(/<title>.*?<\/title>/s, `<title>${escapeTitle(route.title)}</title>`);
  await writeFile(join(target, 'index.html'), html);
}

console.log(`Generated ${routes.length - 1} direct route entries in dist/`);
