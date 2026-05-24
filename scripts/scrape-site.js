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

// ------------------------- section detector -------------------------
// Identifica seções da página e classifica por tipo. Output estruturado.

function detectSectionType($el, text) {
  const lower = text.toLowerCase();
  // form de contato
  if ($el.find("form").length > 0) return "contato";
  // timeline — múltiplos anos detectados (1986, 1990, ...)
  const years = text.match(/\b(19|20)\d{2}\b/g) || [];
  if (years.length >= 4 && new Set(years).size >= 4) return "timeline";
  // faq — múltiplas perguntas
  if (text.match(/\?/g) && (text.match(/\?/g) || []).length >= 3) {
    if (lower.includes("dúvida") || lower.includes("pergunta") || lower.includes("faq") || $el.find("[class*='accordion'], [class*='faq']").length > 0) {
      return "faq";
    }
  }
  // áreas/serviços — grid de 3-6 cards com headings curtos
  const innerH3 = $el.find("h3").length;
  if (innerH3 >= 3 && innerH3 <= 8) {
    const allH3Text = $el.find("h3").map((_, t) => $(t).text()).get().join(" ");
    if (allH3Text.length < 200) return "areas";
  }
  // equipe — fotos + nomes
  if ($el.find("img").length >= 2 && $el.find("h3, h4, h5").length >= 2 && lower.match(/equipe|consultor|sócio|diretor|fundador/i)) {
    return "equipe";
  }
  // CTA — section curta com botão/link
  if (text.length < 300 && $el.find("a, button").length > 0 && lower.match(/agend|contat|fale|comece|orçam|whatsapp/i)) {
    return "cta";
  }
  // hero — primeiro section grande com h1
  if ($el.find("h1").length > 0) return "hero";
  // about — primeiro com h2 + parágrafos longos
  if ($el.find("h2").length > 0 && text.length > 200) return "about";
  // empreendimentos — múltiplas imagens grandes
  if ($el.find("img").length >= 4 && lower.match(/empreendiment|residenc|imóv/i)) {
    return "empreendimentos";
  }
  return "outro";
}

function extractMilestones($el) {
  // pra timeline: extrair pares (ano, texto)
  const milestones = [];
  const yearRe = /\b(19|20)\d{2}\b/;
  $el.find("*").each((_, el) => {
    const $node = $(el);
    if ($node.children().length > 5) return; // não desce em containers grandes
    const txt = $node.text().trim().replace(/\s+/g, " ");
    const m = txt.match(yearRe);
    if (m && txt.length < 400 && txt.length > 8) {
      const year = m[0];
      const text = txt.replace(year, "").replace(/^[\s\-•·:]+/, "").trim();
      if (text && text.length > 5) {
        // evitar duplicatas
        if (!milestones.some((x) => x.year === year && x.text === text)) {
          milestones.push({ year, text: text.slice(0, 300) });
        }
      }
    }
  });
  return milestones.slice(0, 30);
}

function extractAreas($el) {
  const items = [];
  $el.find("h3, h4").each((_, h) => {
    const $h = $(h);
    const title = $h.text().trim();
    if (!title || title.length > 60) return;
    const nextP = $h.next("p").text().trim() || $h.parent().find("p").first().text().trim();
    items.push({
      title,
      description: nextP ? nextP.slice(0, 200) : null,
    });
  });
  return items.slice(0, 12);
}

function extractCtas($el) {
  return $el
    .find("a, button")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((t) => t && t.length < 60)
    .filter((t, i, arr) => arr.indexOf(t) === i)
    .slice(0, 5);
}

const detectedSections = [];
const sectionCandidates = $("section, main > div, [class*='section'], header, footer").toArray();

sectionCandidates.forEach((el, i) => {
  const $el = $(el);
  // pular se for filho de outro candidate (evita dupla contagem)
  if ($el.parents("section, [class*='section']").length > 0) return;

  const text = $el.text().trim().replace(/\s+/g, " ");
  if (text.length < 30) return;

  const type = el.tagName === "header" ? "header" : el.tagName === "footer" ? "footer" : detectSectionType($el, text);

  const section = {
    index: i,
    type,
    title: $el.find("h1, h2, h3").first().text().trim() || null,
    subtitle: null,
    body: [],
    images: [],
  };

  // body — parágrafos
  $el.find("p").each((_, p) => {
    const t = $(p).text().trim().replace(/\s+/g, " ");
    if (t && t.length > 10 && t.length < 600) section.body.push(t);
  });

  // images
  $el.find("img").each((_, img) => {
    const src = $(img).attr("src");
    if (src) section.images.push(absoluteUrl(finalUrl, src));
  });

  // dados específicos por tipo
  if (type === "timeline") {
    section.milestones = extractMilestones($el);
  } else if (type === "areas") {
    section.items = extractAreas($el);
  } else if (type === "hero" || type === "cta") {
    section.ctas = extractCtas($el);
  }

  detectedSections.push(section);
});

// ------------------------- cores (com detecção de contexto) -------------------------

// 1. Coletar TODO o CSS disponível (inline <style> + stylesheets externos)
let allCss = "";
$("style").each((_, el) => {
  allCss += "\n" + ($(el).html() || "");
});
// baixar stylesheets externos pequenos (pula se muito grande pra não atrasar)
for (const cssUrl of meta.stylesheets.slice(0, 5)) {
  try {
    const r = await fetch(cssUrl, {
      headers: { "user-agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (r.ok) {
      const txt = await r.text();
      if (txt.length < 500_000) allCss += "\n/* " + cssUrl + " */\n" + txt;
    }
  } catch {
    // ignora falhas
  }
}

// 2. Detectar cores em CONTEXTO (h1/h2/h3/a/button/.btn/.cta)
function detectContextualColors(css) {
  // regex pra capturar cores dentro de regras CSS de elementos importantes
  const colorRe = /(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/g;
  const counts = { headings: {}, ctas: {}, links: {}, all: {} };

  // headings
  const headingRules = css.match(/\b(h1|h2|h3)\b[^{}]*\{[^}]*color\s*:\s*[^;}]+/gi) || [];
  headingRules.forEach((rule) => {
    const colors = rule.match(colorRe) || [];
    colors.forEach((c) => {
      const k = c.toLowerCase().replace(/\s+/g, "");
      counts.headings[k] = (counts.headings[k] || 0) + 1;
    });
  });

  // CTAs / buttons (background)
  const ctaRules = css.match(/(button|\.btn|\.cta|\.button|\.action)[^{}]*\{[^}]*background[^;}]*/gi) || [];
  ctaRules.forEach((rule) => {
    const colors = rule.match(colorRe) || [];
    colors.forEach((c) => {
      const k = c.toLowerCase().replace(/\s+/g, "");
      counts.ctas[k] = (counts.ctas[k] || 0) + 1;
    });
  });

  // links coloridos
  const linkRules = css.match(/\ba\b[^{}]*\{[^}]*color\s*:\s*[^;}]+/gi) || [];
  linkRules.forEach((rule) => {
    const colors = rule.match(colorRe) || [];
    colors.forEach((c) => {
      const k = c.toLowerCase().replace(/\s+/g, "");
      counts.links[k] = (counts.links[k] || 0) + 1;
    });
  });

  return counts;
}

const isNeutral = (c) => {
  // hex puros
  if (/^#(fff|ffffff|000|000000|fafafa|f5f5f5|eee|eeeeee|ccc|cccccc|999|999999|666|666666|333|333333|111|111111|f9|fa)/i.test(c)) return true;
  // rgb com componentes iguais (cinza/branco/preto)
  const m = c.match(/rgba?\((\d+),(\d+),(\d+)/);
  if (m) {
    const [r, g, b] = [+m[1], +m[2], +m[3]];
    if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10) return true; // cinza
  }
  return false;
};

const contextCounts = detectContextualColors(allCss);
const headingColors = Object.entries(contextCounts.headings)
  .filter(([c]) => !isNeutral(c))
  .sort((a, b) => b[1] - a[1]);
const ctaColors = Object.entries(contextCounts.ctas)
  .filter(([c]) => !isNeutral(c))
  .sort((a, b) => b[1] - a[1]);
const linkColors = Object.entries(contextCounts.links)
  .filter(([c]) => !isNeutral(c))
  .sort((a, b) => b[1] - a[1]);

// 3. Decidir brand vs accent — combina contexto + frequência global

// helper: converte hex/rgb/rgba pra [r,g,b]
function colorToRGB(color) {
  const hex = color.match(/^#([0-9a-f]+)/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    if (h.length >= 6) {
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
  }
  const rgb = color.match(/(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/);
  if (rgb) return [+rgb[1], +rgb[2], +rgb[3]];
  return null;
}

// helper: RGB → HSL (queremos a hue pra agrupar cores parecidas)
function rgbToHSL([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

// família por hue (red, orange, yellow, green, cyan, blue, purple, gray)
// só conta como cor "brand-worthy" se tiver saturação razoável e não for muito claro/escuro
function colorFamily(color) {
  const rgb = colorToRGB(color);
  if (!rgb) return "unknown";
  const { h, s, l } = rgbToHSL(rgb);
  // filtros rigorosos pra eliminar off-white, off-black, cinzas e pasteis fracos
  if (s < 0.22 || l < 0.08 || l > 0.85) return "gray";
  if (h < 15 || h >= 345) return "red";
  if (h < 45) return "orange";
  if (h < 70) return "yellow";
  if (h < 165) return "green";
  if (h < 200) return "cyan";
  if (h < 260) return "blue";
  if (h < 320) return "purple";
  return "magenta";
}

// contar ocorrências TOTAIS de cada cor no CSS (mais usada = mais provável de ser brand)
function countOccurrences(color, text) {
  const escaped = color.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "gi");
  return (text.match(re) || []).length;
}

// Lista completa de cores (raw) — extraída AGORA pra usar no ranking de famílias
const allText = html + " " + $("[style]").map((_, el) => $(el).attr("style")).get().join(" ") + " " + allCss;
const colorsFound = extractColorsFromText(allText);
const colorsCleaned = colorsFound.filter(
  (c) => !["#fff", "#ffffff", "#000", "#000000"].includes(c)
);

const globalCounts = colorsCleaned.map((c) => ({
  color: c,
  count: countOccurrences(c, allCss),
  family: colorFamily(c),
}));

// agrupar por família
const byFamily = {};
globalCounts.forEach(({ color, count, family }) => {
  if (family === "gray" || family === "unknown") return;
  if (!byFamily[family]) byFamily[family] = { total: 0, colors: [] };
  byFamily[family].total += count;
  byFamily[family].colors.push({ color, count });
});

// família mais usada = brand
// score = total * diversidade (várias cores únicas é sinal de brand real, não single-shot)
//         * (1 - dominância) — penaliza família onde 1 cor domina (provável test/reset CSS)
const familyRanking = Object.entries(byFamily)
  .map(([family, data]) => ({ family, ...data }))
  .filter((f) => f.total >= 3)
  .map((f) => {
    const uniqueColors = f.colors.length;
    const maxCount = Math.max(...f.colors.map((c) => c.count));
    const dominance = maxCount / f.total;
    const diversity = Math.log(uniqueColors + 1);
    const score = f.total * diversity * (1 - dominance * 0.75);
    return { ...f, score };
  })
  .sort((a, b) => b.score - a.score);

const brandFamily = familyRanking[0];
const accentFamily = familyRanking[1] || brandFamily;

// cor representativa = melhor combo de "presença" + "qualidade visual"
// score: count (peso 1) × saturação (peso 2) × proximidade a l=0.4 (cor nem clara nem escura demais)
function pickRepresentative(family) {
  if (!family) return null;
  const scored = family.colors
    .map(({ color, count }) => {
      const rgb = colorToRGB(color);
      if (!rgb) return { color, score: 0 };
      const { s, l } = rgbToHSL(rgb);
      // preferimos saturação > 0.4 e lightness próximo a 0.35-0.55 (cor "cheia")
      const satScore = Math.min(s / 0.5, 2);
      const lightScore = 1 - Math.abs(l - 0.42) * 1.5;
      const score = count * Math.max(0.1, satScore) * Math.max(0.3, lightScore);
      return { color, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored[0]?.color || null;
}

// se tem cor em heading com contexto certo, prefere ela; senão usa o ranking de família
const brand =
  (headingColors[0]?.[0] && colorFamily(headingColors[0][0]) !== "gray"
    ? headingColors[0][0]
    : null) ||
  pickRepresentative(brandFamily) ||
  meta.themeColor ||
  null;

const accent =
  (ctaColors[0]?.[0] && colorFamily(ctaColors[0][0]) !== "gray"
    ? ctaColors[0][0]
    : null) ||
  pickRepresentative(accentFamily) ||
  brand;

const colorsObj = {
  brand,
  accent,
  themeColor: meta.themeColor,
  ogImage: meta.ogImage,
  byFamily: familyRanking.slice(0, 5).map((f) => ({
    family: f.family,
    total: f.total,
    topColors: f.colors.sort((a, b) => b.count - a.count).slice(0, 3),
  })),
  byContext: {
    headings: headingColors.slice(0, 5),
    ctas: ctaColors.slice(0, 5),
    links: linkColors.slice(0, 5),
  },
  count: colorsCleaned.length,
  rawAll: colorsCleaned.slice(0, 80),
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
await writeFile(
  resolve(outDir, "sections.json"),
  JSON.stringify({ url: finalUrl, sections: detectedSections }, null, 2),
  "utf8"
);
await writeFile(resolve(outDir, "raw.html"), html, "utf8");

// resumo de seções detectadas
const sectionsByType = detectedSections.reduce((acc, s) => {
  acc[s.type] = (acc[s.type] || 0) + 1;
  return acc;
}, {});
const sectionsSummary = Object.entries(sectionsByType)
  .map(([t, c]) => `${c} ${t}`)
  .join(" · ");

console.log(`\n✅ pronto em ${outDir}`);
console.log(`   ${photosCount} fotos + ${iconsCount} ícones · ${colorsCleaned.length} cores · ${detectedSections.length} seções`);
console.log(`   brand: ${brand || "—"}  ·  accent: ${accent || "—"}`);
console.log(`   seções: ${sectionsSummary || "—"}`);
console.log(`\nArquivos:`);
console.log(`   meta.json         · informações do site`);
console.log(`   copy.md           · textos extraídos por bloco`);
console.log(`   colors.json       · paleta detectada (brand + accent + contexto)`);
console.log(`   sections.json     · seções classificadas (hero, about, timeline, etc)`);
console.log(`   images.json       · mapa url→arquivo local (com category)`);
console.log(`   raw.html          · HTML original (debug)`);
console.log(`   assets/photos/    · ${photosCount} fotos do negócio (vão pro preview)`);
console.log(`   assets/icons/     · ${iconsCount} ícones/decorativos (descartados)`);
