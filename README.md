# Upscalead · Site Builder

Skill + biblioteca de componentes pra construção em escala de previews de site pra leads.

## 🗺️ Estrutura

```
site-builder-upscalead/
│
├── 📘 SKILL.md                    ← skill completa (cérebro do processo)
├── 📖 README.md                    ← este arquivo (índice)
│
├── 📚 catalog/                     ← CATÁLOGO de components isolados
│   └── (cada component com README próprio explicando uso/anatomia)
│
├── 🏗️ projects/                    ← projetos completos por cliente
│   ├── abdo-preview/
│   ├── construtora-itajai-preview/
│   ├── folchini-risso-preview/
│   ├── souza-souza-preview/
│   └── cliente-eliane/
│
├── 📂 clientes/                    ← outputs do scraper (meta/copy/cores)
│   └── (raw.html e assets/ ficam gitignored)
│
├── ⚙️ scripts/                     ← tooling (Node)
│   ├── scrape-site.js              ← baixa site do lead inteiro
│   └── sync-assets.js              ← copia fotos pro projeto preview
│
└── 📁 references/                  ← blueprints, design-md template
```

## 🚀 Fluxo de criação de um preview novo

```bash
# 1. baixar site do lead (~30s)
node scripts/scrape-site.js https://site-do-lead.com.br

# 2. sincronizar fotos pro projeto preview (~5s)
node scripts/sync-assets.js <slug-cliente> /caminho/do/preview

# 3. abrir projeto preview, ajustar paleta + dados, rodar
cd <cliente>-preview && npm install && npm run dev
```

## 📚 Catalog — components reutilizáveis

Ver [`catalog/README.md`](./catalog/README.md) pro índice completo.

Resumo:
| Categoria | Components |
|---|---|
| 🎯 **floating-cta** | FloatingContact |
| 🔘 **buttons** | SubtleButton |
| ✨ **animations** | BlurText · CountUp · MetallicText · GradualBlur |
| 📐 **sections** | SectionTag · StatMocks |
| 🏗️ **ui-primitives** | navigation-menu · sheet · accordion · button · card |

## 🏗️ Projetos completos

| Projeto | Cliente | Stack | Status |
|---|---|---|---|
| `abdo-preview` | ABDO Construções (Itajaí/SC) | Next.js 16 + Tailwind v4 + framer-motion | Preview ativo |
| `construtora-itajai-preview` | Construtora Itajaí (Americana/SP) | Next.js 16 + Tailwind v4 + framer-motion | Preview ativo |
| `cliente-eliane` | Dra. Eliane Ferreira (Advocacia) | Next.js + Tailwind | Build de referência (Track 1) |
| `souza-souza-preview` | Souza e Souza | Next.js | Preview antigo |
| `folchini-risso-preview` | Folchini & Risso | Next.js | Preview antigo |
| `cliente-atendly` | Atendly CRM | HTML/CSS/JS vanilla (Elementor) | Build de referência (Track 2) |

## 📦 Stack padrão dos previews

- **Framework:** Next.js 16 (App Router) + Turbopack
- **Estilo:** Tailwind CSS v4 + tw-animate-css
- **Animações:** framer-motion
- **Ícones:** lucide-react + @tabler/icons-react
- **Componentes:** Radix (accordion, navigation-menu, sheet, dialog, label, icons, slot)
- **Utilities:** class-variance-authority, clsx, tailwind-merge
- **Fontes:** Instrument Serif, DM Serif Display, Geist, Geist Mono

## 🛠️ Scripts

| Script | O que faz |
|---|---|
| `scripts/scrape-site.js <URL>` | Baixa HTML, extrai meta/copy/cores, categoriza imagens em `photos/` e `icons/`, organiza em `clientes/<slug>/` |
| `scripts/sync-assets.js <slug> <projeto>` | Copia `clientes/<slug>/assets/photos/` pra `<projeto>/public/images/scraped/` |

## 📐 Padrões obrigatórios (resumo da SKILL.md)

1. Grid: `max-w-[1220px]` (Track 1) ou `max-w-[1280px]` (Track 2)
2. Padding seção: `pt-16 sm:pt-24 pb-16 sm:pb-24` (Track 1) ou `py-12 md:py-16` (Track 2)
3. `text-wrap: balance` em h1/h2/h3 (zero viúvas)
4. Tinted neutrals: nunca `#fff` ou `#000` puro
5. 60-30-10 de peso visual (accent ≤ 10%)
6. Hover só em `md:` pra cima
7. `<Image>` do Next sempre, nunca `<img>`
8. `npx tsc --noEmit` + `npm run build` limpos antes de entregar

Skill completa em [`SKILL.md`](./SKILL.md).
