#!/usr/bin/env node
/**
 * scrape-site.js — baixa a home inteira de um site e extrai:
 *   - meta (title, description, og:*, theme-color, fontes)
 *   - copy (h1-h6 + p + li agrupados por seção)
 *   - cores (theme-color + cores inline detectadas)
 *   - imagens (TODAS baixadas pra assets/)
 *
 * Uso: node scrape-site.js <URL> [--out <dir>]
 *
 * Output: site-builder-upscalead/clientes/<slug>/
 *   ├── meta.json
 *   ├── copy.md
 *   ├── colors.json
 *   ├── images.json
 *   ├── raw.html
 *   └── assets/<imagens>
 */

import * as cheerio from "cheerio";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CLIENTES_DIR = resolve(ROOT, "clientes");

// ------------------------- args -------------------------
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Uso: node scrape-site.js <URL> [--out <dir>]");
  process.exit(1);
}
const url = args[0];
const outFlagIdx = args.indexOf("--out");
const customOut = outFlagIdx >= 0 ? args[outFlagIdx + 1] : null;

// ------------------------- helpers -------------------------
function slugFromUrl(u) {
  try {
    const host = new URL(u).hostname.replace(/^www\./, "");
    return host.replace(/\./g, "-");
  } catch {
    return "unknown";
  }
}

function absoluteUrl(base, src) {
  if (!src) return null;
  try {
    return new URL(src, base).href;
  } catch {
    return null;
  }
}

function fileNameFromUrl(u, fallbackIdx = 0) {
  try {
    const path = new URL(u).pathname;
    let name = basename(path) || `img-${fallbackIdx}`;
    // strip query
    name = name.split("?")[0].split("#")[0];
    if (!extname(name)) name += ".jpg";
    return name.replace(/[^a-zA-Z0-9._-]/g, "_");
  } catch {
    return `img-${fallbackIdx}.jpg`;
  }
}

function extractColorsFromText(text) {
  // matches: #fff, #ffffff, rgb(), rgba(), hsl(), hsla()
  const hexRe = /#(?:[0-9a-fA-F]{3,8})\b/g;
  const rgbRe = /rgba?\([^)]+\)/g;
  const hslRe = /hsla?\([^)]+\)/g;
  const set = new Set();
  (text.match(hexRe) || []).forEach((c) => set.add(c.toLowerCase()));
  (text.match(rgbRe) || []).forEach((c) =>
    set.add(c.replace(/\s+/g, "").toLowerCase())
  );
  (text.match(hslRe) || []).forEach((c) =>
    set.add(c.replace(/\s+/g, "").toLowerCase())
  );
  return [...set];
}

async function downloadImage(imgUrl, destPath) {
  try {
    const r = await fetch(imgUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605 Safari/605",
      },
      redirect: "follow",
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    await writeFile(destPath, buf);
    return buf.length;
  } catch (e) {
    return { error: e.message };
  }
}

/**
 * Heurística: foto REAL do negócio vs ícone/logo/banner decorativo.
 * Combina tamanho de arquivo + palavras-chave no nome + URL/role.
 */
function classifyImage({ url, role, fileName, bytes }) {
  const lower = (url + " " + (fileName || "") + " " + role).toLowerCase();
  const iconKeywords = [
    "icon",
    "favicon",
    "logo",
    "facebook",
    "instagram",
    "whatsapp",
    "linkedin",
    "youtube",
    "tiktok",
    "twitter",
    "social",
    "arrow",
    "seta",
    "go.",
    "/go-",
    "play.",
    "pause.",
    "close.",
    "menu.",
    "hamburger",
    "search",
    "lupa",
    "spinner",
    "loading",
    "sprite",
    "pixel",
  ];
  const hasIconKeyword = iconKeywords.some((k) => lower.includes(k));
  const isIconRole = ["favicon", "header-logo"].includes(role);

  if (isIconRole) return "icons";
  if (hasIconKeyword && bytes < 80 * 1024) return "icons";
  if (bytes < 25 * 1024) return "icons"; // tudo <25KB é decorativo
  return "photos"; // resto = foto provavelmente real do negócio
}

// ------------------------- fetch HTML -------------------------
console.log(`→ baixando ${url}`);
const res = await fetch(url, {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605 Safari/605",
  },
  redirect: "follow",
});
if (!res.ok) {
  console.error(`Falhou: HTTP ${res.status}`);
  process.exit(1);
}
const finalUrl = res.url; // após redirects
const html = await res.text();
console.log(`✓ HTML ${(html.length / 1024).toFixed(1)} KB · final URL: ${finalUrl}`);

const $ = cheerio.load(html);

// ------------------------- pasta destino -------------------------
const slug = slugFromUrl(finalUrl);
const outDir = customOut
  ? resolve(customOut)
  : resolve(CLIENTES_DIR, slug);
const photosDir = resolve(outDir, "assets", "photos");
const iconsDir = resolve(outDir, "assets", "icons");
await mkdir(photosDir, { recursive: true });
await mkdir(iconsDir, { recursive: true });
console.log(`→ saída: ${outDir}`);

// ------------------------- meta -------------------------
const meta = {
  url: finalUrl,
  scrapedAt: new Date().toISOString(),
  title: $("title").first().text().trim() || null,
  description:
    $('meta[name="description"]').attr("content")?.trim() || null,
  themeColor: $('meta[name="theme-color"]').attr("content") || null,
  ogTitle: $('meta[property="og:title"]').attr("content") || null,
  ogDescription:
    $('meta[property="og:description"]').attr("content") || null,
  ogImage: $('meta[property="og:image"]').attr("content") || null,
  ogSiteName:
    $('meta[property="og:site_name"]').attr("content") || null,
  lang: $("html").attr("lang") || null,
  fonts: [],
  stylesheets: [],
};

// fontes via <link> Google Fonts ou outras
$('link[rel="stylesheet"]').each((_, el) => {
  const href = $(el).attr("href");
  if (!href) return;
  const abs = absoluteUrl(finalUrl, href);
  if (abs) meta.stylesheets.push(abs);
  if (abs && abs.includes("fonts.googleapis.com")) {
    const families = abs.match(/family=([^&]+)/g) || [];
    families.forEach((f) => {
      const fam = decodeURIComponent(
        f.replace("family=", "").split(":")[0].replace(/\+/g, " ")
      );
      if (!meta.fonts.includes(fam)) meta.fonts.push(fam);
    });
  }
});

// ------------------------- copy -------------------------
const blocks = [];

// header da página
const headerTxt = $("header")
  .first()
  .find("a, span")
  .map((_, el) => $(el).text().trim())
  .get()
  .filter(Boolean)
  .filter((t) => t.length < 60);
if (headerTxt.length) {
  blocks.push({ title: "Header / Nav", lines: [...new Set(headerTxt)] });
}

// iterar por section/main/article — fallback pra body
const sections = $("section, main > div, article").toArray();
const target = sections.length ? sections : $("body").toArray();

target.forEach((el, i) => {
  const $el = $(el);
  const heading =
    $el.find("h1,h2,h3").first().text().trim() ||
    $el.attr("id") ||
    `Bloco ${i + 1}`;
  const lines = [];
  $el.find("h1,h2,h3,h4,h5,h6,p,li,blockquote").each((_, t) => {
    const txt = $(t).text().trim().replace(/\s+/g, " ");
    if (txt && txt.length > 1 && txt.length < 500) lines.push(`${t.tagName.toUpperCase()}: ${txt}`);
  });
  if (lines.length) {
    blocks.push({ title: heading.slice(0, 80), lines });
  }
});

// footer
const footerTxt = $("footer")
  .first()
  .find("p, li, a, span")
  .map((_, el) => $(el).text().trim())
  .get()
  .filter(Boolean)
  .filter((t) => t.length < 200);
if (footerTxt.length) {
  blocks.push({ title: "Footer", lines: [...new Set(footerTxt)] });
}

let copyMd = `# Copy extraída — ${meta.title || finalUrl}\n\n`;
copyMd += `_${meta.description || ""}_\n\n`;
copyMd += `URL: ${finalUrl}\nScrapado em: ${meta.scrapedAt}\n\n---\n\n`;
blocks.forEach((b) => {
  copyMd += `## ${b.title}\n\n`;
  b.lines.forEach((l) => (copyMd += `- ${l}\n`));
  copyMd += `\n`;
});

// ------------------------- cores -------------------------
const allText = html + " " + $("[style]").map((_, el) => $(el).attr("style")).get().join(" ");
const colorsFound = extractColorsFromText(allText);
// remove ruído: cores muito comuns
const colorsCleaned = colorsFound.filter(
  (c) => !["#fff", "#ffffff", "#000", "#000000"].includes(c)
);
const colorsObj = {
  themeColor: meta.themeColor,
  ogImage: meta.ogImage,
  count: colorsCleaned.length,
  detected: colorsCleaned.slice(0, 80),
};

// ------------------------- imagens -------------------------
console.log(`→ extraindo imagens…`);
const seen = new Set();
const imageJobs = [];

const collect = (src, role) => {
  if (!src) return;
  const abs = absoluteUrl(finalUrl, src);
  if (!abs || seen.has(abs)) return;
  if (abs.startsWith("data:")) return;
  seen.add(abs);
  imageJobs.push({ url: abs, role });
};

// <img>
$("img").each((_, el) => {
  collect($(el).attr("src"), "img");
  const srcset = $(el).attr("srcset");
  if (srcset) {
    srcset.split(",").forEach((s) => {
      const u = s.trim().split(/\s+/)[0];
      collect(u, "img-srcset");
    });
  }
});

// <source srcset>
$("source[srcset]").each((_, el) => {
  const srcset = $(el).attr("srcset");
  srcset.split(",").forEach((s) => {
    const u = s.trim().split(/\s+/)[0];
    collect(u, "picture-source");
  });
});

// CSS inline background-image
$("[style]").each((_, el) => {
  const style = $(el).attr("style") || "";
  const m = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/i);
  if (m) collect(m[1], "css-bg");
});

// og:image + favicon + logos por hint
collect(meta.ogImage, "og-image");
collect($('link[rel*="icon"]').attr("href"), "favicon");

// identificar logo: 1ª <img> dentro de header
const headerLogo = $("header img").first().attr("src");
collect(headerLogo, "header-logo");

// fallback: varrer HTML cru por URLs de imagem (pega lazy loading,
// data-attributes, JSON inline, scripts — comum em SPAs/CMS Duda/Wix)
const urlRe = /https?:\/\/[^"'\s<>()]+\.(?:jpg|jpeg|png|webp|avif|gif)(?:\?[^"'\s<>()]*)?/gi;
const fallbackMatches = html.match(urlRe) || [];
fallbackMatches.forEach((u) => collect(u, "fallback-html"));

console.log(`→ baixando ${imageJobs.length} imagens…`);

const imagesMap = [];
let i = 0;
// baixa primeiro num staging temporário pra classificar com tamanho real
const stagingDir = resolve(outDir, "assets", "_staging");
await mkdir(stagingDir, { recursive: true });

for (const job of imageJobs) {
  i++;
  const fname = fileNameFromUrl(job.url, i);
  const name = `${String(i).padStart(3, "0")}-${fname}`;
  const tmpDest = resolve(stagingDir, name);
  const result = await downloadImage(job.url, tmpDest);
  if (typeof result === "number") {
    const category = classifyImage({
      url: job.url,
      role: job.role,
      fileName: fname,
      bytes: result,
    });
    const finalDir = category === "photos" ? photosDir : iconsDir;
    const finalDest = resolve(finalDir, name);
    // mover do staging pro destino final
    const { rename } = await import("node:fs/promises");
    await rename(tmpDest, finalDest);
    imagesMap.push({
      url: job.url,
      file: `assets/${category}/${name}`,
      role: job.role,
      category,
      bytes: result,
    });
  } else {
    imagesMap.push({
      url: job.url,
      role: job.role,
      error: result.error,
    });
  }
}
// limpar staging
const { rmdir } = await import("node:fs/promises");
try {
  await rmdir(stagingDir);
} catch {
  // ignore se já tem coisa dentro (não deveria)
}

const ok = imagesMap.filter((x) => x.file).length;
const failed = imagesMap.length - ok;
const photosCount = imagesMap.filter((x) => x.category === "photos").length;
const iconsCount = imagesMap.filter((x) => x.category === "icons").length;
console.log(
  `✓ ${ok} ok (${photosCount} fotos + ${iconsCount} ícones) · ${failed} falhas`
);

// ------------------------- escrever outputs -------------------------
await writeFile(
  resolve(outDir, "meta.json"),
  JSON.stringify(meta, null, 2),
  "utf8"
);
await writeFile(resolve(outDir, "copy.md"), copyMd, "utf8");
await writeFile(
  resolve(outDir, "colors.json"),
  JSON.stringify(colorsObj, null, 2),
  "utf8"
);
await writeFile(
  resolve(outDir, "images.json"),
  JSON.stringify(imagesMap, null, 2),
  "utf8"
);
await writeFile(resolve(outDir, "raw.html"), html, "utf8");

console.log(`\n✅ pronto em ${outDir}`);
console.log(`   ${photosCount} fotos + ${iconsCount} ícones · ${colorsCleaned.length} cores · ${blocks.length} blocos de copy`);
console.log(`\nArquivos:`);
console.log(`   meta.json         · informações do site`);
console.log(`   copy.md           · textos extraídos por bloco`);
console.log(`   colors.json       · paleta detectada`);
console.log(`   images.json       · mapa url→arquivo local (com category)`);
console.log(`   raw.html          · HTML original (debug)`);
console.log(`   assets/photos/    · ${photosCount} fotos do negócio (vão pro preview)`);
console.log(`   assets/icons/     · ${iconsCount} ícones/decorativos (descartados)`);
