# DESIGN.md — Template Upscalead

> Esse é o template que vira **`DESIGN.md` na raiz do projeto do cliente**, preenchido depois do briefing e ANTES de começar a codar. O agente lê este arquivo pra gerar todos os blocos com tokens consistentes — sem drift entre seções.
>
> Versão enxuta: 5 cores · 5 tokens tipográficos · 5 níveis de spacing · 4 de radius · 9 componentes. Suficiente pra landing one-page de R$1–2k. Não inflar.

---

## Como usar

1. Copia este arquivo pra raiz do projeto do cliente: `DESIGN.md`
2. Preenche cada `[colchete]` com base no briefing + paleta extraída do site/marca
3. Apaga este bloco "Como usar" depois de preenchido
4. Codar puxando tokens daqui — nada hardcoded nos componentes

---

## Documento

**Cliente:** [Nome do negócio]
**Nicho:** [advocacia / clínica / barbearia / restaurante / tech / etc]
**Track:** [Track 1 Next.js · Track 2 Elementor]
**Versão:** v1 — [data]

---

## 1. Paleta (5 cores)

Construir com **tinted neutrals** (ver SKILL.md "Sistema de cor"). Nunca `#000`/`#fff` puro.

```yaml
# Tokens
brand-accent:     "[#hex]"          # cor 10% — CTAs, links, hover, focus
bg-canvas:        "[#hex]"          # cor 60% — fundo da página
bg-surface:       "[#hex]"          # cor 30% — cards, seções alternadas
text-primary:     "[#hex]"          # título e texto principal
text-secondary:   "[#hex]"          # subtítulo, descrição
text-mute:        "[#hex]"          # labels, captions, eyebrows
border-subtle:    "[rgba(...)]"     # 1px sutil com alpha do accent
```

**Regra 60-30-10:** 60% canvas + surface · 30% texto · 10% accent. Acima de 10%, accent vira ruído.

**Exemplo preenchido (Atendly, marca roxa `#8645ff`):**

```yaml
brand-accent:     "#8645ff"
bg-canvas:        "#0a0712"        # preto tingido pro roxo
bg-surface:       "#15101f"        # surface elevada 1 nível
text-primary:     "#f3eeff"        # branco com 4% chroma roxo
text-secondary:   "#cebfe8"
text-mute:        "#9c97ad"
border-subtle:    "rgba(134,69,255,0.14)"
```

---

## 2. Tipografia (5 tokens)

Escolher **1 display + 1 body** das fontes recomendadas (SKILL.md Etapa 2). Aplicar `text-wrap: balance` em headlines e `text-wrap: pretty` + `max-width: 65ch` em corpo.

```yaml
font-display:   "[Instrument Serif | DM Serif Display | Cabinet Grotesk | Outfit | Satoshi]"
font-body:      "[Geist | Inter | DM Sans]"
font-mono:      "[Geist Mono]"      # eyebrows, labels, números

# Escala
h1:      "clamp(36px, 6vw, 64px) / 600 / 1.1 / -1.5px tracking"   # hero
h2:      "clamp(28px, 5vw, 44px) / 600 / 1.15 / -0.8px tracking"  # seção
h3:      "20px / 600 / 1.25 / -0.3px tracking"                    # card
body:    "16px / 400 / 1.6"                                       # corpo
eyebrow: "11px / 500 / 1.4 / +1px tracking / uppercase"           # tag mono
```

---

## 3. Spacing (5 níveis)

```yaml
xs:      "8px"      # gap interno em botões, badges
sm:      "16px"     # padding mobile, gap entre items
md:      "24px"     # padding desktop, gap entre cards
lg:      "48px"     # padding interno de cards grandes, gap entre blocos
xl:      "96px"     # space entre seções (py-12 md:py-16 ≈ xl)
```

**Container:** `max-w-[1280px] mx-auto px-4 md:px-6`
**Seção:** `py-12 md:py-16` (sempre, sem exceção)

---

## 4. Border Radius (4 níveis)

```yaml
sm:      "6px"       # tags, badges, kbd
md:      "10px"      # botões, inputs
lg:      "14px"      # cards, containers
pill:    "9999px"    # avatares, pills, dots, toggles redondos
```

---

## 5. Motion (3 regras)

```yaml
duration-fast:    "150ms"    # hover, focus, press
duration-base:    "250ms"    # accordion, dropdown, tab change
duration-slow:    "400ms"    # layout shift, modal in, painel mobile

ease-out:         "cubic-bezier(.16, 1, .3, 1)"     # padrão pra entrada
ease-in:          "cubic-bezier(.7, 0, .84, 0)"     # saída
ease-in-out:      "cubic-bezier(.65, 0, .35, 1)"    # A → B
```

`@media (prefers-reduced-motion: reduce)` configurado no `globals.css` (ou no `<style>` do bloco Elementor).

---

## 6. Componentes

Cada componente referencia tokens — nunca hex hardcoded.

### nav (header)
```yaml
height:       "60px desktop · 56px mobile"
bg:           "bg-canvas com backdrop-blur"
text:         "text-primary, body"
border:       "border-subtle bottom on scroll"
cta:          "btn-primary"
```

### hero
```yaml
min-height:   "min-h-[100dvh]"    # NÃO h-screen (bug iOS Safari)
bg:           "bg-canvas"
headline:     "h1, text-wrap: balance"
subhead:      "body, text-mute, max-width: 65ch"
cta-primary:  "btn-primary"
cta-secondary: "btn-secondary (link/outline)"
```

### feature-card
```yaml
bg:           "bg-surface"
border:       "1px border-subtle"
padding:      "lg (24px)"
radius:       "lg (14px)"
title:        "h3, text-primary"
desc:         "body, text-secondary, text-wrap: pretty"
hover:        "border-subtle → border-accent alpha .32, translateY(-2px)"
```

### testimonial-card
```yaml
bg:           "bg-surface"
border:       "1px border-subtle"
padding:      "lg (24px) ou xl em hero testimonials"
radius:       "lg (14px)"
quote:        "body, text-primary"
author:       "body-sm, text-mute (nome) + text-secondary (cargo)"
avatar:       "pill 40px"
stars:        "amarelo Google (não brand-accent)"
```

### pricing-card
```yaml
bg-default:    "bg-surface"
bg-featured:   "bg-surface elevado 1 nível (mais claro)"
border:        "1px border-subtle"
padding:       "lg (24px)"
radius:        "lg (14px)"
price:         "h2, text-primary"
period:        "body, text-mute"
features:      "lista com ícone check, body"
cta:           "btn-primary (full width)"
```

### cta-banner
```yaml
bg:            "bg-surface OR bg-canvas + border xl"
padding:       "xl (48px)"
radius:        "lg (14px)"
headline:      "h2, text-balance"
cta:           "btn-primary"
```

### form-input
```yaml
label:         "body-sm, text-secondary, above input"
input-bg:      "bg-surface"
input-border:  "1px border-subtle"
input-focus:   "2px brand-accent @ 50% alpha"
input-error:   "1px red tingido (não #ff0000)"
input-padding: "10px 14px"
input-radius:  "md (10px)"
helper:        "caption, text-mute, below"
error:         "caption, red tingido, below"
```

### button (primary / secondary)
```yaml
primary:
  bg:        "brand-accent"
  text:      "white (tingido)"
  padding:   "10px 18px"
  radius:    "md (10px)"
  hover:     "brand-accent +10% lightness"
  font:      "body, weight 500, no uppercase"

secondary:
  bg:        "transparent"
  border:    "1px border-subtle"
  text:      "text-primary"
  padding:   "10px 18px"
  radius:    "md (10px)"
  hover:     "border-accent alpha .32"
```

### footer
```yaml
bg:           "bg-canvas"
padding:      "xl (48px) vertical, md (24px) horizontal"
text:         "text-mute, body-sm"
links:        "text-secondary, hover text-primary"
border-top:   "1px border-subtle"
```

---

## 7. Do's & Don'ts (custom do cliente)

Preencher com base no nicho/briefing. Exemplo Atendly:

**Do:**
- Roxo `#8645ff` só em CTAs, focus, links, dots decorativos
- Pricing tier "Pro" elevado (surface mais clara) — destaque por surface, não por outline colorido
- Headlines em peso 600 com tracking negativo agressivo

**Don't:**
- Roxo como background de seção inteira ou card fill
- Gradient diagonal "purple to pink"
- Hero centralizado com headline gigante + número gigante isolado
- Dois accents (só roxo é cromático)

---

## 8. Responsivo

Breakpoints (já testar todos antes de entregar):

| Width | Comportamento |
|-------|---------------|
| 375px | iPhone SE — tudo single col, fontes em `clamp()` min |
| 768px | iPad — 2-up onde tinha 3 |
| 1024px | Desktop pequeno — layout cheio |
| 1280px+ | Desktop padrão — max-width container |
| 1440px+ | Desktop XL — sem mudança, só respiro lateral |

**Touch targets:** ≥44px de altura em CTA mobile, ≥44px em pricing toggles.

---

## 9. Notas finais

- Adicionar paths das imagens reais do cliente (logo, fotos do negócio) com URLs específicas
- Documentar fontes Google (CDN ou `next/font`) escolhidas com peso e estilo
- Listar gotchas técnicos específicos descobertos durante o build (`!important` que precisou em algum hover do tema WP, conflito de `::before`, etc.)
