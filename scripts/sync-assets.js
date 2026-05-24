#!/usr/bin/env node
/**
 * sync-assets.js — copia as imagens scrapadas de um cliente
 * pra dentro da pasta public/images/scraped/ de um projeto preview.
 *
 * Uso: node sync-assets.js <slug-cliente> <caminho-projeto-preview>
 *
 * Ex:  node sync-assets.js abdoconstrutora-com-br /Users/user/site-builder-upscalead/abdo-preview
 *
 * Mantém os nomes originais. Sobrescreve se já existir. Cria a pasta
 * /public/images/scraped/ se não existir.
 */

import { readdir, copyFile, mkdir, stat } from "node:fs/promises";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    "Uso: node sync-assets.js <slug-cliente> <caminho-projeto-preview>"
  );
  console.error(
    "Ex:  node sync-assets.js abdoconstrutora-com-br /Users/user/site-builder-upscalead/abdo-preview"
  );
  process.exit(1);
}

const [slug, projectPath] = args;
const includeIcons = args.includes("--all");
const sourceBase = resolve(ROOT, "clientes", slug, "assets");
const sourceDir = resolve(sourceBase, "photos");
const destDir = resolve(projectPath, "public", "images", "scraped");

console.log(`→ origem:  ${sourceDir}${includeIcons ? " + icons/" : " (só fotos)"}`);
console.log(`→ destino: ${destDir}`);

try {
  await stat(sourceDir);
} catch {
  console.error(
    `✗ pasta de origem não existe — rode primeiro: node scrape-site.js <URL>`
  );
  process.exit(1);
}

await mkdir(destDir, { recursive: true });

const sources = [sourceDir];
if (includeIcons) sources.push(resolve(sourceBase, "icons"));

const allImages = [];
for (const src of sources) {
  try {
    const files = await readdir(src);
    files
      .filter((f) => /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(f))
      .forEach((f) => allImages.push({ srcDir: src, file: f }));
  } catch {
    // pasta pode não existir, ignora
  }
}

console.log(`→ ${allImages.length} imagens encontradas\n`);

let ok = 0;
const summary = [];
for (const { srcDir, file } of allImages) {
  const src = resolve(srcDir, file);
  const dest = resolve(destDir, file);
  try {
    const info = await stat(src);
    await copyFile(src, dest);
    const sizeKb = (info.size / 1024).toFixed(1);
    summary.push({ file, sizeKb });
    ok++;
  } catch (e) {
    console.error(`  ✗ ${file} — ${e.message}`);
  }
}

console.log(`✅ ${ok}/${allImages.length} copiadas pra:`);
console.log(`   ${destDir}\n`);

console.log(`Usar no código:`);
summary.forEach((s) => {
  console.log(`   /images/scraped/${s.file}  (${s.sizeKb} KB)`);
});
