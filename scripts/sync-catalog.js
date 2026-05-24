#!/usr/bin/env node
/**
 * sync-catalog.js — atualiza src/_shared/ de previews com a versão mais nova do catalog/
 *
 * Uso:
 *   node sync-catalog.js <preview1> [preview2] [...]      # sincroniza específicos
 *   node sync-catalog.js --all                             # sincroniza TODOS os previews
 *
 * Ex:
 *   node sync-catalog.js abdo-preview
 *   node sync-catalog.js --all
 */

import { cp, readdir, rm, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CATALOG = resolve(ROOT, "catalog");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Uso:");
  console.error("  node sync-catalog.js <preview1> [preview2] ...");
  console.error("  node sync-catalog.js --all");
  process.exit(1);
}

let previews;
if (args.includes("--all")) {
  const entries = await readdir(ROOT, { withFileTypes: true });
  previews = entries
    .filter((e) => e.isDirectory() && e.name.endsWith("-preview"))
    .map((e) => e.name);
  if (previews.length === 0) {
    console.error("✗ nenhum *-preview encontrado");
    process.exit(1);
  }
  console.log(`→ ${previews.length} previews detectados: ${previews.join(", ")}\n`);
} else {
  previews = args;
}

for (const previewName of previews) {
  const previewDir = resolve(ROOT, previewName);
  try {
    await stat(previewDir);
  } catch {
    console.warn(`⚠ ${previewName}: pasta não encontrada, pulando`);
    continue;
  }

  const sharedDest = resolve(previewDir, "src", "_shared");
  console.log(`→ ${previewName}: atualizando src/_shared/ …`);

  try {
    await rm(sharedDest, { recursive: true, force: true });
  } catch {}

  await cp(CATALOG, sharedDest, {
    recursive: true,
    filter: (src) => !src.includes("node_modules") && !src.endsWith("README.md"),
  });

  console.log(`✓ ${previewName} sincronizado`);
}

console.log(`\n✅ ${previews.length} preview(s) atualizado(s) com catalog/ mais recente`);
