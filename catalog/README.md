# 📚 Catalog

Biblioteca de components prontos pra reutilizar em qualquer projeto Next.js + Tailwind + framer-motion.

## 🧱 Blocks (NOVO)

Páginas inteiras parametrizadas — preencha `data` e use. Ver [`blocks/README.md`](./blocks/README.md).

| Block | Pra que serve |
|---|---|
| `HeroSlideshow` | Hero fullwidth, slides com tipos diferentes, autoplay |
| `AboutSection` | "Quem é a empresa" + foto + áreas + stats CountUp |
| `TimelineSection` | Cronologia de marcos (grid ou vertical) |
| `EmpreendimentosCarousel` | Cards verticais 3:4 em carousel horizontal |
| `MCMVSection` | Banner de programa/oferta com 3 benefícios |
| `FAQAccordion` | Busca + accordion expandable |
| `ConsultoresGrid` | Grid 2col com foto + nome + CRECI |
| `ContactFooter` | "Vamos conversar" + 4 cols + copyright |

---

Cada component:
- É standalone (copia e cola, ajusta tokens, funciona)
- Usa CSS variables (`--accent`, `--foreground`, `--background`, etc) — adapta sozinho à paleta
- Stack: TypeScript + React + framer-motion + Tailwind v4

## 🎯 floating-cta

| Component | O que é |
|---|---|
| [`FloatingContact`](./floating-cta/FloatingContact.tsx) | Badge flutuante bottom-right com painel "Fale conosco" no hover/tap. WhatsApp + telefone + horário. Float animation infinita. |

## 🔘 buttons

| Component | O que é |
|---|---|
| [`SubtleButton`](./buttons/SubtleButton.tsx) | Pill com shimmer atravessando, dot animado lateral, scale hover. Variants `primary` + `secondary`. Suporta Link/anchor/button. |

## ✨ animations

| Component | O que é |
|---|---|
| [`BlurText`](./animations/BlurText.tsx) | Animação word-by-word com blur 10→0, opacity, slide. Trigger via IntersectionObserver. Suporta tags h1-h4, p, span, div. |
| [`CountUp`](./animations/CountUp.tsx) | Contador animado 0→valor com easeOutCubic. Trigger inView, formato pt-BR de milhar. Suporta prefix/suffix. |
| [`MetallicText`](./animations/MetallicText.tsx) | Gradiente metálico via background-clip text. Variant `light` (branco/prateado pra fundo escuro) ou `dark` (azul ABDO pra fundo claro). |
| [`GradualBlur`](./animations/GradualBlur.tsx) + [css](./animations/GradualBlur.css) | Overlay de blur progressivo (múltiplas camadas mascaradas). Posições top/bottom/left/right. Presets prontos. Acompanha scroll quando `target="page"`. |
| [`Loader`](./animations/Loader.tsx) | Cortina fullscreen com logo centralizado + barra de progresso animada + sobe como cortina ao terminar. Trava scroll enquanto carrega. |
| [`Reveal`](./animations/Reveal.tsx) | Wrapper de entrada — `opacity 0→1` + `y 22→0` ao entrar na viewport, `once: true`. Usar pra animar qualquer bloco. |

## 📐 sections

| Component | O que é |
|---|---|
| [`SectionTag`](./sections/SectionTag.tsx) | Tag de seção com dot accent + número padded (01/02/...) + label mono uppercase tracking. Variants `light`/`dark`. Marca início de cada bloco. |
| [`StatMocks`](./sections/StatMocks.tsx) | 4 mini-mocks SVG (~80x32 cada): `TimelineMock` (anos), `SkylineMock` (prédios), `WindowsGridMock` (unidades), `RulerMock` (área m²). Animados com CSS-only. |

## 🏗️ ui-primitives

Versões TS dos componentes shadcn/ui:

| Component | Base |
|---|---|
| [`navigation-menu.tsx`](./ui-primitives/navigation-menu.tsx) | `@radix-ui/react-navigation-menu` |
| [`sheet.tsx`](./ui-primitives/sheet.tsx) | `@radix-ui/react-dialog` |
| [`accordion.tsx`](./ui-primitives/accordion.tsx) | `@radix-ui/react-accordion` |
| [`button.tsx`](./ui-primitives/button.tsx) | `@radix-ui/react-slot` + CVA |
| [`card.tsx`](./ui-primitives/card.tsx) | base shadcn |
| [`input.tsx`](./ui-primitives/input.tsx) | base shadcn |
| [`textarea.tsx`](./ui-primitives/textarea.tsx) | base shadcn |
| [`DotPattern.tsx`](./ui-primitives/DotPattern.tsx) | Background com radial-gradient dots (decorativo) |

## 📋 Como usar

1. Copiar o arquivo `.tsx` (e CSS se tiver) pro seu projeto em `src/components/ui/`
2. Garantir as deps instaladas (ver lista abaixo)
3. Garantir os tokens CSS no `globals.css`:
   - `--background`, `--foreground`, `--accent`, `--accent-dark`
   - `--surface`, `--border-subtle`, `--border-strong`
   - `--foreground-soft`, `--foreground-mute`
   - `--dark-section`, `--dark-section-text`
   - `--font-display`, `--font-hero`, `--font-mono` (via next/font/google)
4. Importar e usar

## 📦 Deps necessárias

```bash
npm install framer-motion lucide-react @tabler/icons-react \
  @radix-ui/react-accordion @radix-ui/react-slot @radix-ui/react-navigation-menu \
  @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-icons \
  class-variance-authority clsx tailwind-merge tw-animate-css
```

## ✅ Garantias

- TypeScript estrito (todos passam `tsc --noEmit`)
- `prefers-reduced-motion` respeitado nos componentes animados
- Mobile-friendly (touch + responsivo)
- Acessibilidade: `aria-label`, `aria-expanded`, `role` onde aplicável
- Sem cor hardcoded — sempre via CSS vars (paleta vem do projeto)

## 🔄 Como cresce

Cada vez que construirmos algo novo num cliente que valha reusar:
1. Generaliza (tira dados hardcoded do cliente)
2. Adiciona aqui em `catalog/<categoria>/<Name>.tsx`
3. Atualiza este README
4. Salva nota detalhada no vault Obsidian (ver memory `project_component_library`)
