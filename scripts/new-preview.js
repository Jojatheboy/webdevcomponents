#!/usr/bin/env node
/**
 * new-preview.js — cria um projeto preview novo a partir de _template-base.
 *
 * Uso: node new-preview.js <slug-cliente>
 * Ex:  node new-preview.js abc-construtora
 *
 * O que faz:
 *  1. Copia _template-base/ pra <slug>-preview/
 *  2. Ajusta package.json name
 *  3. COPIA catalog/ pra src/_shared/ (cópia real, não symlink — symlinks
 *     quebram resolução de deps no Next 16 + Turbopack)
 *  4. Mostra próximos passos
 *
 * Pra atualizar src/_shared/ depois de mudar catalog/, rodar:
 *   node scripts/sync-catalog.js <slug-preview>
 *
 * NÃO roda npm install automaticamente — você decide quando.
 */

import { cp, readFile, writeFile, lstat, rm, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TEMPLATE = resolve(ROOT, "_template-base");
const CATALOG = resolve(ROOT, "catalog");

const slug = process.argv[2];
if (!slug) {
  console.error("Uso: node new-preview.js <slug-cliente>");
  console.error("Ex:  node new-preview.js abc-construtora");
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`Slug inválido: "${slug}". Use só letras minúsculas, números e hífens.`);
  process.exit(1);
}

const projectName = `${slug}-preview`;
const dest = resolve(ROOT, projectName);

try {
  await stat(dest);
  console.error(`✗ Pasta "${projectName}" já existe. Remova primeiro ou use outro slug.`);
  process.exit(1);
} catch {
  // ok
}

try {
  await stat(TEMPLATE);
} catch {
  console.error(`✗ Template não encontrado em ${TEMPLATE}`);
  process.exit(1);
}

console.log(`→ copiando _template-base/ pra ${projectName}/ …`);

await cp(TEMPLATE, dest, {
  recursive: true,
  filter: (src) => {
    // ignora node_modules, .next, e qualquer src/_shared antigo (symlink ou pasta)
    if (src.includes("node_modules") || src.includes(".next")) return false;
    if (src.endsWith("src/_shared") || src.includes("src/_shared/")) return false;
    return true;
  },
});

// copia catalog/ pra src/_shared/ (cópia real)
const sharedDest = resolve(dest, "src", "_shared");
try {
  const info = await lstat(sharedDest);
  if (info.isSymbolicLink() || info.isDirectory()) {
    await rm(sharedDest, { recursive: true, force: true });
  }
} catch {
  // ok, não existe
}
console.log(`→ copiando catalog/ pra src/_shared/ …`);
await cp(CATALOG, sharedDest, {
  recursive: true,
  filter: (src) => !src.includes("node_modules") && !src.endsWith("README.md"),
});

// ajusta package.json name
const pkgPath = resolve(dest, "package.json");
const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
pkg.name = projectName;
await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

console.log(`✅ preview criado em ${dest}\n`);
console.log(`Próximos passos:\n`);
console.log(`   cd ${projectName}`);
console.log(`   npm install        # ~30s`);
console.log(`   npm run dev        # abre em http://localhost:3000\n`);
console.log(`Depois:`);
console.log(`   1. Ajuste paleta em src/app/globals.css (tokens com comentário "TROCAR")`);
console.log(`   2. Ajuste metadata em src/app/layout.tsx`);
console.log(`   3. Adicione componentes específicos do cliente em src/components/`);
console.log(`   4. Importe componentes compartilhados via @shared/*`);
console.log(`\nSe atualizar catalog/ depois, sincronize:`);
console.log(`   node scripts/sync-catalog.js ${projectName}`);
