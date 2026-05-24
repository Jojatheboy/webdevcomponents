# Blueprint Padrão — Build de Referência

> O melhor site já entregue pela Upscalead é o da **Dra. Eliane Ferreira** (advocacia).
> Este arquivo congela o que funcionou nele: design system, anatomia de seções,
> arquitetura de copy, animações e os erros a nunca repetir.
>
> **Leia antes de começar qualquer site novo.** É o ponto de partida validado — não
> reinventar o básico. Replicar a estrutura, trocar conteúdo, adaptar a identidade.

---

## 1. Stack e estrutura de pastas (confirmada)

Next.js (App Router) + TypeScript + Tailwind CSS v4 + framer-motion + lucide-react.

```
/src
  /app
    layout.tsx     — fontes, metadata, monta o <Loader/>
    page.tsx       — importa e ordena as seções
    globals.css    — tokens :root (cores do cliente), selection
  /components
    Loader.tsx     Header.tsx  Hero.tsx  Areas.tsx  Diferencial.tsx
    QuemSou.tsx    Etica.tsx   Depoimentos.tsx  ComoFunciona.tsx
    FAQ.tsx        CTA.tsx     Footer.tsx
    Reveal.tsx     — wrapper de animação de entrada (reutilizável)
    /ui
      testimonials-columns.tsx  accordion/button/card/input...
      DotPattern  GridCell  OrganicBorder
/public/images   — fotos reais do cliente (webp)
```

Uma seção = um componente. `page.tsx` só importa e ordena.

---

## 2. Design system (light premium — base runner.now)

**Tokens no `globals.css :root`** (a cor accent muda por cliente):

```css
--background: #fbfbf9;            /* creme — fundo */
--foreground: #252116;            /* quase-preto quente — texto */
--c-warm-accent: #8B2252;         /* ACCENT — trocar pela cor do cliente */
--marketing-primary-bg: #252116;  /* seções escuras invertidas */
--marketing-primary-text: #fbfbf9;
--marketing-border: rgba(0,0,0,0.10);
--marketing-heading: #252116;
--marketing-copy-soft: #6b6b6b;
--marketing-eyebrow: #6b6b6b;
--marketing-card-cream: rgba(0,0,0,0.03);
```

**Fontes (Google Fonts via next/font):**
- `Instrument Serif` (`--font-instrument`) — títulos de seção (h2/h3)
- `DM Serif Display` (`--font-dm-serif`) — headline do Hero
- `Geist` (`--font-geist`) — corpo
- `Geist Mono` (`--font-geist-mono`) — eyebrows, labels, números pequenos

**Escala que funciona:**
- Eyebrow: Geist Mono, 11px, uppercase, letter-spacing 1px
- h2 seção: Instrument Serif, `clamp(36px, 6vw, 56px)` a `clamp(48px, 8vw, 72px)`, letter-spacing -2 a -3px
- Corpo: 15–17px, line-height 1.6–1.8

**Container:** `maxWidth: 1220, margin: "0 auto"`, padding lateral 24px.
**Ritmo de seção:** `pt-16 sm:pt-24 pb-16 sm:pb-24`.

**Elementos visuais assinatura:**
- Dot pattern: `radial-gradient(circle, rgba(0,0,0,0.10) 0.75px, transparent 0.75px)` ×2, `background-size: 5px 5px`, offset `2.5px`
- Grids com borda contínua: `borderLeft/Right` no container, `borderTop/Right` nas células
- Seção escura invertida (`--marketing-primary-bg`) como quebra visual

---

## 3. Anatomia das seções que funcionam (ordem validada)

1. **Header** — fixo, blur no scroll, logo + nav mono + CTA WhatsApp
2. **Hero** — headline curta (problema + promessa) + subtítulo + 2 CTAs + barra de 3 stats + vídeo de fundo
3. **Áreas** — grid de serviços (4 reais), cada card com mini-mockup de UI sobre dot pattern
4. **Diferencial** — VS comparativo: `dúvida do cliente | escritório comum ✗ | o cliente ✓`
5. **Quem sou** — foto real do cliente + bio enxuta (2 parágrafos, história + caso de destaque)
6. **Seção scroll-paint** — fundo escuro, texto grande preenchendo de cor conforme o scroll (mini-título à esquerda, texto à direita, divider, frase, botão)
7. **Depoimentos** — 3 colunas de cards rolando em loop, velocidades diferentes, máscara de fade
8. **Como funciona** — stepper de 4 passos com badges numerados conectados
9. **FAQ** — accordion animado com busca
10. **CTA final** — fundo escuro, headline grande + botão
11. **Footer** — grid 4 colunas + bordas orgânicas

---

## 4. Arquitetura de copy — UM fato, UM lugar

A maior lição do build: **redundância mata.** Cada número, prova ou diferencial vive
em **exatamente uma** seção. Antes de escrever, montar o mapa:

| Tipo de informação | Casa única |
|--------------------|-----------|
| Números de prova (anos, clientes, nota) | barra de stats do **Hero** |
| Diferenciais ("vs concorrente") | **Diferencial** |
| História / caso de destaque | **Quem sou** |
| Serviços | **Áreas** |
| Processo passo a passo | **Como funciona** |

Se uma seção repete o que já está em outra, ela é cortada ou recebe função única.
Método de copy: skill `copywriting` + `references/copy-ptbr-local.md`.

---

## 5. Animações (sensação de site vivo)

- **Loader** — abertura: nome em serif + barra de progresso; ao terminar, a "cortina" sobe revelando o site
- **Entrada do Hero** — título/texto/botões/stats sobem em cascata, **sincronizados** com a cortina do loader subindo (delays ~1.75s–2.2s)
- **`Reveal`** — componente reutilizável: framer-motion `whileInView`, `opacity 0→1` + `y 22→0`, `once: true`. Envolve títulos e blocos de cada seção
- **FAQ** — accordion com altura animada (`AnimatePresence` + `height: auto`), nunca `<details>` no seco
- **Scroll-paint** — `useScroll` + `useTransform` de opacidade por palavra
- **Depoimentos** — colunas em loop infinito (`motion` translateY)

---

## 6. Erros básicos a NUNCA repetir (gotchas reais deste build)

1. **`padding` shorthand vs classe `pt-*`** — `style={{ padding: "0 24px" }}` zera o `padding-top`, e estilo inline vence classe Tailwind. Se a div também precisa de `pt-*`, usar `paddingLeft`/`paddingRight` no inline, nunca o shorthand `padding`.
2. **Headline longa** — título de 2 frases compridas quebra em 6 linhas. Headline curta, com quebras controladas (`<br/>`) e fonte dimensionada para caber.
3. **`<details>` nativo no FAQ** — abre no seco, sem animação. Usar accordion controlado com framer-motion.
4. **Inventar dados** — depoimento, número, cliente ou caso que não está no briefing é proibido. Faltou no briefing → perguntar.
5. **Seção redundante** — não criar seção que repete o que já existe. Cada seção, um trabalho único.
6. **Rosto falso** — nunca usar foto de banco (randomuser etc.) como "cliente" real. Sem foto → usar avatar de inicial.
7. **Screenshot headless** — Chrome headless precisa de `--no-first-run` + `--user-data-dir` único; `--screenshot` captura a partir do topo (não rola). Para seção interna, capturar a página inteira e recortar.

---

## 7. Checklist do build de referência

- [ ] Tokens do cliente no `globals.css` (accent = cor da marca)
- [ ] Uma seção = um componente; `page.tsx` só ordena
- [ ] Mapa de copy feito: cada fato em uma seção só
- [ ] Headlines curtas, sem palavra viúva, sem quebra feia
- [ ] Foto real do cliente usada (sem rosto de stock como cliente)
- [ ] `Reveal` nas seções + entrada do Hero sincronizada com o loader
- [ ] FAQ com accordion animado (não `<details>`)
- [ ] Zero `padding` shorthand em div que também usa classe `pt-*`
- [ ] `npx tsc --noEmit` limpo + página responde HTTP 200
