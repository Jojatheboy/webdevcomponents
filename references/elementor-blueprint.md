# Blueprint Elementor — Build de Referência (Atendly CRM)

> Quando o cliente está em **WordPress + Elementor** e não quer/pode migrar, a entrega não é Next.js — é **bloco HTML/CSS/JS auto-contido** que vai em um widget "HTML" do Elementor. O melhor build nessa track é o **Atendly CRM** (upscalead.online). Este arquivo congela o que funcionou nele.
>
> **Leia antes de começar qualquer site Elementor.** Para sites Next.js, ver `blueprint-padrao.md`.

---

## 1. Quando usar esta track

- Cliente **já tem WordPress + Elementor** e quer manter o ambiente dele.
- A gente entra como "block builder" — entrega seções soltas que ele cola em widgets HTML, mantém o resto da página dele.
- Identificar pelo briefing (Parte 2, Bloco 7) e pela URL do site atual.

Para greenfield ou cliente sem site → Next.js (`blueprint-padrao.md`).

---

## 2. Formato de entrega — UM bloco por widget HTML

Cada seção do site = um único arquivo HTML auto-contido com `<!-- comentário -->` + `<style>` + HTML + opcional `<script>`. Vai dentro de **UM widget "HTML"** do Elementor, no lugar do widget de Abas/Cards/Containers que o cliente tinha.

- Salvo em `~/Desktop/<secao>-<cliente>.html`
- Sem dependências externas: nada de React, framer-motion, Tailwind ou `@import` de fonte de CDN aleatório
- HTML semântico + CSS puro + JS vanilla (quando precisar)
- Namespace de classes próprio por seção (vide §4)

---

## 3. Stack

- HTML semântico (`<section>`, `<article>`, `<button>`)
- CSS puro (custom properties, grid, flexbox, `@keyframes`)
- JS vanilla quando precisar (toggle de preços, dot-flow animado, sparkles)
- **Imagens**: hospedadas no `wp-content/uploads/...` do cliente — ele sobe pelo WP Media e manda a URL pelo chat
- **Fonte**: stack nativa SF Pro (Atendly usa essa)
  ```
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  ```

---

## 4. Convenções — namespace por seção

Cada bloco tem prefixo próprio, sem classes globais. Evita colisão entre blocos e com o tema do WP.

| Seção do Atendly | Namespace | Arquivo de referência |
|------------------|-----------|------------------------|
| Cards de plano + toggle de período | `.atendly-planos` / `.ap-*` | `cliente-atendly/blocks/planos-atendly.html` |
| Depoimentos (3 colunas rolando) | `.atd-tst` / `.atd-*` | `cliente-atendly/blocks/depoimentos-atendly.html` |
| Tabela comparativa de planos | `.ct-*` | `cliente-atendly/blocks/tabela-comparativa-atendly.html` |
| Comparativo CRM (vs concorrentes) | `.atendly-compare` / `.ac-*` | `cliente-atendly/blocks/comparativo-crm-atendly.html` |
| Grid de segmentos colados | `.seg-*` | `cliente-atendly/blocks/segmentos-atendly.html` |

Padrão de pasta: cada bloco final fica em `cliente-<nome>/blocks/<secao>-<cliente>.html`.

---

## 5. Anatomia das seções validadas

### Price section (3 cards de plano + toggle de período)
- 3 cards lado a lado (1 col mobile), cada um com bg-image webp do cliente + scrim por cima (vide §7 contraste).
- Toggle pill com 3 períodos + selos de desconto. Botão ativo = pílula branca.
- JS de ~30 linhas troca o `textContent` dos preços (não re-renderiza o card). Animação de fade ao trocar.
- Sem React, sem libs. Trocar valor = editar um único objeto `PRICING` em JS.

### Depoimentos — 3 colunas em loop CSS-only
- Cada coluna = um `.track` com os cards listados **2×** (duplicado).
- Animação `@keyframes scroll { to { transform: translateY(-50%); } }` — `-50%` é exatamente um set porque está duplicado → loop seamless.
- Mask gradient `mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)` no container das colunas para fade top/bottom.
- `:hover` na coluna → `animation-play-state: paused` (lê com calma).
- Responsivo: 3 cols (desktop) → 2 (`md`) → 1 (`sm`). `hidden md:block` style.

### Tabela comparativa de planos
- Grid: 1 coluna "Recursos" + 3 colunas de plano (header + N células de valor).
- Linhas alinhadas via altura fixa por célula (`height: 58px`) ou via grid implícito.
- Toggle (igual ao price section) troca a linha "Preço" apenas. JS de 15 linhas.
- **Sticky-col no mobile** — coluna Recursos fixa, planos rolam horizontal (vide §10).
- Hexágonos ✓/✕ via `clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)`.

### Comparativo CRM (vs concorrente)
- Grid 3 cols (Recursos / Outros / O cliente). Coluna do cliente destacada via background tint + barra superior + badge flutuante "Recomendado".
- Mobile: stack 1-col, cada linha vira um card com label "Outros CRMs" / "Atendly CRM" prefixado.
- Sem animações exceto hover sutil (background lighter).

### Grid de segmentos colados (flush grid)
- 6 cards em `grid-template-columns: repeat(3,1fr); gap:1px; background:<seam>` — o `1px` de gap revela a cor de fundo do grid como costura entre cards.
- Cards `border:0; border-radius:0` (quadrados, sem borda própria), bg opaco.
- Responsivo: 3 → 2 → 1 col.
- Outer edges sem linha (gap só aparece entre células, não fora).

### Sparkles text (efeito de estrelas)
- `<span class="sparkle-text">` envolve o texto. JS scaneia, cria N SVGs `.sparkle` filhos absolutamente posicionados.
- Cada sparkle anima opacity 0→1→0 + scale + rotate em loop com delay/duração randômicos.
- Reposicionamento dinâmico via `animationiteration` (reposiciona no fim de cada ciclo = momento invisível, sem pop).
- `data-sparkles="N"` controla quantidade. Default 12.

---

## 6. ESCREVIVER ELEMENTOR vs TEMA — `!important` + alta especificidade

O tema do WordPress **vai brigar** com seu CSS. Sintomas que aparecem na revisão:

- Hover do `<a>` aparece roxo/rosa por cima do seu botão (tema).
- Hover do `<button>` (toggle) aparece rosa.
- `<img>` perde border-radius (tema força `border-radius:0` em imagens).

Padrão de override — alta especificidade + `!important` em todos os estados:

```css
/* link/botão — todos os estados travados */
.namespace a.btn,
.namespace a.btn:link,
.namespace a.btn:visited,
.namespace a.btn:hover,
.namespace a.btn:focus,
.namespace a.btn:active{
  background: var(--btn) !important;
  color: var(--btn-text) !important;
  text-decoration: none !important;
}

/* toggle button */
.namespace .toggle-btn,
.namespace .toggle-btn:hover,
.namespace .toggle-btn:focus,
.namespace .toggle-btn:active{ background: transparent !important; }
.namespace .toggle-btn.is-active,
.namespace .toggle-btn.is-active:hover,
.namespace .toggle-btn.is-active:focus{ background: #fff !important; color: #241d2b !important; }

/* imagem com radius (avatar) */
.namespace .avatar-wrap img.avatar{
  width: 46px !important; height: 46px !important;
  border-radius: 50% !important;
  object-fit: cover !important;
}
```

Especificidade `(0,3,1)` ou superior costuma vencer o que o tema joga. Se o tema usa `!important` também, a especificidade decide.

---

## 7. CONFLITO COM `::before`/`::after` DO ELEMENTOR

Elementor usa `::before` em containers (background overlays, decorações). Adicionar `selector::before` para sua decoração pode **bugar** a renderização do widget (cliente reporta "ficou tudo bugado").

**Padrão seguro — colocar a decoração em camadas de `background`** do próprio elemento, sem pseudo:

```css
/* 4 quadradinhos nos cantos sem usar ::before */
.card{
  background:
    linear-gradient(rgba(146,99,255,.6),rgba(146,99,255,.6)) left 13px top 13px / 6px 6px no-repeat,
    linear-gradient(rgba(146,99,255,.6),rgba(146,99,255,.6)) right 13px top 13px / 6px 6px no-repeat,
    linear-gradient(rgba(146,99,255,.6),rgba(146,99,255,.6)) left 13px bottom 13px / 6px 6px no-repeat,
    linear-gradient(rgba(146,99,255,.6),rgba(146,99,255,.6)) right 13px bottom 13px / 6px 6px no-repeat,
    /* fundo do card */
    linear-gradient(180deg, #1a1428, #110c1e);
}
```

`background-position` aceita a sintaxe `left Npx top Npx` / `right Npx bottom Npx`. Cada camada é um `linear-gradient(cor,cor)` (= um quadradinho sólido) com `no-repeat` e tamanho fixo. Sem `::before`, sem conflito.

Trade-off: a decoração via `background` não anima (background não transiciona). Para animar a decoração no hover, aí precisa `::before` mesmo — e tem que testar caso a caso se o widget do cliente tolera.

---

## 8. ANTI-AI — os "tells" que sinalizam "feito por IA"

Estes padrões aparecem em quase todo CSS gerado por IA. Durante revisão, **eliminar todos**:

1. **Gradiente em tudo** — gradient na badge, no ícone, nos dots, nos checks, na barra... Limitar a UM elemento (badge primário, ou botão principal). Resto: cor sólida.
2. **Borda radial "forçada"** — `radial-gradient(120% 120% at 20% 50%, #8645FF 0%, ... transparent)` mascarada como borda. Fica bright só num canto, fade no resto. **Trocar por borda uniforme**: `border: 1px solid rgba(<tema>, .18)`.
3. **Pulsing dot** — `@keyframes pulse { 50% { opacity:.5; scale:.85; } }` num "live indicator". Tirar — dot estático.
4. **Shimmer/shine sweep em loop** — luz cruzando o elemento a cada 4s. Aceitar **só no hover** (uma passada), nunca em loop contínuo.
5. **Glow text-shadow** — `text-shadow: 0 0 8px rgba(...)` em texto pequeno. Tirar.
6. **Layered box-shadows** — 4-5 camadas (bevel 3D + ring + glow + drop + inset escuro). **Reduzir a 1 sombra suave** + opcional inset highlight (`inset 0 1px 0 rgba(255,255,255,.08-.18)`).
7. **Hover que escala/desloca cada coisinha** — dot scale 1.4x, ícone scale 1.12x, texto translateX 3px. **Calmar**: só lift do card + border-color + box-shadow. Animar de menos.
8. **Ícones genéricos** — "sparkle"/"sol"/"raio" só pra ter algo. Trocar pelo **logo real do cliente** (SVG) ou ícone específico do conteúdo.
9. **`@import` de fonte de CDN sketchy** — `@import url('https://fonts.cdnfonts.com/css/...')`. Trocar pela stack nativa (`SF Pro Display`, `-apple-system`, ...).
10. **Animação de gradient shift** — `background-position` indo de 0%↔100% em loop infinito. Tirar.
11. **Dots/símbolos decorativos antes de cada item de lista** — `• Benefício 1`, `• Benefício 2`. Quase sempre tirar — o texto fala por si.
12. **Copy genérico repetido** — "Solução completa", "Operação completa", "Comparação completa". Variar.
13. **Glow blob debaixo do elemento** — `radial-gradient(...) filter:blur(40px)` como `::after`. Tirar — `box-shadow` colorida resolve com 1 linha.
14. **Decoração `::before` com gradient border masked** — vide §7, troca por borda uniforme + (se quiser) layers de `background`.

---

## 9. PATRÕES POLIDOS — substitutos do que foi removido

- **Borda**: `1px solid rgba(<tema>, .18)`. Estado aberto/ativo: `rgba(<tema>, .55)`.
- **Sombra**: `0 16px 34px -18px rgba(0,0,0,.55)` para drop neutra **OU** `0 26px 50px -20px rgba(<tema>, .5)` para colored glow no hover.
- **Hover de card**: `transform: translateY(-5px to -6px); border-color: brighter; box-shadow: bigger + tema-tinted`. Tudo num único `transition` com `cubic-bezier(.4,0,.2,1) .35s`.
- **Inset top highlight**: `inset 0 1px 0 rgba(255,255,255,.05 - .15)` em card escuro = sutil "lit from above" sem cara de bevel.
- **Fundo de card escuro premium**: combinar `radial-gradient(130% 120% at 18% 0%, rgba(<accent>, .12) 0%, transparent 55%)` + `linear-gradient(180deg, <topo> 0%, <baixo> 100%)`. Sutilezas.
- **Scrim sobre textura forte**: `background-image: linear-gradient(rgba(<scrim>, .7), rgba(<scrim>, .55)), url(<textura>)`. Mantém contraste do texto sobre a imagem.
- **Backdrop blur sutil**: `backdrop-filter: blur(10px)` (com prefix `-webkit-`) em card semi-transparente = glass premium. Só funciona se o card tiver bg semi-transparente.

---

## 10. PATRÕES DE LAYOUT

### Flush grid (cards colados, divisão por costura)
```css
.grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#2a2142; }
.cell { background:#14101f; border:0; border-radius:0; }
```
`gap:1px` + bg do grid revela costura fina entre células. Outer edges sem linha. Não usa border-radius nas células (é "quadrado").

### Sticky-col em tabela mobile (segredo: `width: max-content`)
```css
.scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; }
.grid   { display:flex; gap:14px; }
@media (max-width:1040px){
  .grid { width: max-content; }    /* ESSENCIAL — sem isso o sticky solta no meio */
  .col  { flex:none; width:248px; }
}
.col-label{
  position:sticky; left:0; z-index:2;
  background:#faf8fb;
  box-shadow:8px 0 18px -12px rgba(0,0,0,.25); /* separa visualmente da coluna que rola atrás */
}
```
A sacada do `width: max-content` no grid é **o que faz o sticky funcionar o trajeto inteiro**. Sem ele, o grid tem `width:100%` do scroll container e o sticky solta quando ultrapassa esse limite.

### Scrolling testimonials columns
```css
.track {
  display:flex; flex-direction:column; gap:24px; padding-bottom:24px;
  animation: scroll 28s linear infinite;
}
@keyframes scroll { to { transform: translateY(-50%); } }
.col:hover .track { animation-play-state: paused; }
```
Cards listados **2 vezes** dentro do track. `-50%` = exatamente um set → loop seamless. Hover pausa.

### Dot-flow / pixel grid animado
- 49 `<i>` filhos num `display:grid; grid-template-columns:repeat(7,3px); gap:1.5px`.
- Array `FRAMES` de arrays de índices (cada frame = quais dots estão "ativos").
- `setInterval(150ms)`: toggle `.active` nos dots conforme o frame atual. `i++; if (i>=FRAMES.length) i=0;`
- Sem libs. Para uma setinha subindo, gerar frames com índices de uma forma de seta deslocada verticalmente.

### Toggle de preços (3 períodos)
- 3 `<button data-period="mensal/semestral/anual">`.
- JS escuta click, troca `.is-active`, varre `[data-plan]` e troca `textContent` lendo de `var PRICE = { mensal:{...}, semestral:{...}, anual:{...} }`.
- Para fade ao trocar: remover + re-adicionar classe que dispara `@keyframes` (force reflow via `void el.offsetWidth`).

### Corner marks (4 quadradinhos nos cantos)
- Vide §7 — 4 layers de `background` no próprio card. Sem `::before`.

### Sparkles em volta de um texto
- `<span class="sparkle-text">texto</span>`. JS scaneia, cria N SVGs com path de estrela 4-pontas (do Magic UI), absolutamente posicionados em `%` randômico.
- Keyframe `0%,100%{ opacity:0; scale:0; rotate:75deg } 50%{ opacity:1; scale:var(--s); rotate:140deg }`.
- `animationiteration` reposiciona (no momento invisível, sem pop).
- Cor: duas tonalidades do tema do cliente (Atendly: `#9263ff` + `#cdb6f5`).

---

## 11. MOBILE — 360px é o mínimo

- **Toggle**: full-width abaixo de 560px, `flex:1` por botão, padding e font reduzidos.
- **Grids**: 3 → 2 (`max-width:920-1024px`) → 1 (`max-width:560-768px`) colunas.
- **Tabela larga**: scroll horizontal com sticky-col (vide §10).
- **Validação**: `document.documentElement.scrollWidth === 360` no viewport 360px. Maior que isso = tem overflow indesejado.
- **Padding inicial do bloco**: `padding: 8px 16px` no namespace (`.atendly-planos`, etc).
- **Card padding**: `22px` mobile / `28-34px` desktop.

---

## 12. ASSETS — fluxo com o cliente

1. **Imagens do cliente**: ele sobe via WP Media Library, manda URL `https://<dominio>/wp-content/uploads/YYYY/MM/<arquivo>.webp` pelo chat.
2. **Placeholder enquanto não chega**: avatar de inicial (depoimentos), SVG da marca em variação solid (cards sem ícone). NUNCA usar `randomuser.me` ou stock como cliente real.
3. **Ícones decorativos**: SVG inline (sem dependência de URL). Logo real do cliente: pedir SVG.
4. **Compressão de vídeos**: vídeo hero pode chegar 18MB. ffmpeg `-crf 26 -preset slow -an -vf scale=1920:-2 -movflags +faststart` derruba pra 2-3MB sem perda visível. Audio fora (vídeo é muted).

---

## 13. WORKFLOW DE PREVIEW

1. Build no `~/Desktop/<secao>-<cliente>.html` (auto-contido).
2. Servir local:
   ```bash
   mkdir -p /tmp/serve-X
   # envelopar com UTF-8 (o arquivo é fragmento)
   printf '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">…</head><body>' > /tmp/serve-X/index.html
   cat ~/Desktop/<secao>-<cliente>.html >> /tmp/serve-X/index.html
   printf '</body></html>' >> /tmp/serve-X/index.html
   (cd /tmp/serve-X && python3 -m http.server PORT --bind 127.0.0.1 &)
   ```
3. Cliente acessa `http://localhost:PORT` no navegador (vê animações ao vivo, hover, etc).
4. Screenshot via puppeteer-core (instalar em `/tmp/shottmp` se preciso). file:// também funciona se não houver URLs remotas.

---

## 14. CHECKLIST FINAL POR BLOCO

- [ ] Classes todas sob o namespace, sem CSS solto
- [ ] `*{box-sizing:border-box}` no namespace
- [ ] Stack SF Pro nativa (sem `@import` externo)
- [ ] Anti-tema: `a` e `button` com `!important` em hover/focus/active/visited
- [ ] Sem `::before`/`::after` em `selector` do Elementor (se precisar decoração, layers em `background`)
- [ ] Sem dot-pulse, shimmer-loop, gradient-shift, glow-text-shadow (§8)
- [ ] Responsivo: 3→2→1 col. Toggle full-width <560px. `scrollWidth@360 === 360`
- [ ] Hover suave com `cubic-bezier(.4,0,.2,1)`, `.25-.35s`
- [ ] Padding confortável (não apertado)
- [ ] Assets reais do cliente (URLs `wp-content`); placeholders marcados com `<!-- TODO -->`
- [ ] `href="#"` marcados com `<!-- TODO: link de checkout X -->`
- [ ] `npx tsc` não se aplica aqui (não é TS) — verificação é visual + screenshot a 360px

---

## 15. ERROS REAIS — não repetir

1. **Verificar demais antes de entregar.** Cliente esperando 20 min porque eu fiquei descompactando o `.docx` pra conferir bytes. Entregue, depois ajuste. Uma verificação visual só quando faz sentido (responsivo a 360px específico).
2. **AskUserQuestion em loop.** Cliente impaciente rejeita. Quando o default é óbvio + cliente já disse "leva em consideração o que está no CRM" → seguir, não voltar a perguntar.
3. **Token vazado no chat.** Push HTTPS sem credencial salva → cliente colou token no chat por urgência. Aviso na hora: depois usar, **revogar** no GitHub e gerar novo.
4. **Ambiguidade no mobile sticky.** Cliente disse "rola fixo até um pedaço depois rola junto" descrevendo um BUG, eu interpretei como request → removi o sticky → cliente queria sticky funcionando o trajeto todo. Quando descrição parecer um defeito atual, perguntar antes de mexer no que funciona.
5. **Refinamento que zera o capricho.** "Tirar a cara de IA" ≠ "tirar tudo". Cliente reclamou "ta puro feio, nao separa cada card, quero animado bonito". Polir = remover **excessos** mantendo o premium feel (sombra suave, borda sutil, hover com lift+glow). Não nukear.
6. **`::before` em Elementor → bug.** Vide §7. Padrão de canto = layers em `background` do próprio card.
7. **Padding sumindo no `.elementor-button`.** Quando o CSS antigo tinha `padding: 10px 24px !important` e a refatoração tira → botão fica apertado porque o padding do widget é zero. Sempre incluir `padding` explícito quando o original tinha.
8. **Removi o `::before` da borda do card → ficou seco.** Polir não é destruir. Mantive a borda mas troquei a radial-forçada por uma uniforme sutil. Outro caminho: layers `background` no card pros quadradinhos de canto.

---

## §16. Mock UI Cards — padrão validado (Atendly · passos parceiros)

Cards com **mini-mockup de UI sintético do produto dentro** em vez de ilustração metafórica ou ícone solto. Funciona como "feature ilustrada" sem cair em AI cliché. Build de referência: `cliente-atendly/blocks/passos-parceiros-atendly.html`.

### Anatomia
1. **Container**: glass dark + 4 cantos em L (não os quadradinhos do `.sa-pr` nem os crosshair `+` do `.ap-card` — é o **CardDecorator** da features-10 21st.dev) + border 1px roxa + bg-image opcional + overlay diagonal escuro. `border-radius:0`. Hover lift+glow.
2. **Header (eyebrow)**: SVG monoline lavender 15px + label tipo `01 · Tema` em muted 12.5px.
3. **Frase grande**: 19px semibold branca, letter-spacing -.4px, line-height 1.25.
4. **Divisor dashed com eyebrow tag**: mono uppercase 9.5px ("No seu painel" / "Status real" / "Seu extrato" / "Acompanhe") + linha 1px gradient roxo→transparente.
5. **Mock UI sintético**: ver tipos abaixo.

### 4 tipos validados (reusáveis em qualquer build)
- **Share/Link mock** — URL input mono + botão gradient "Copiar" + linha meta com dot pulsante + barra progresso animando 0→X%.
- **Status list mock** — head com taxa de conversão + 3 rows (categoria + ícone status + label + status) + footer "+X recente". Rows entram com stagger.
- **Stat + Table mock** — stat panel header (label mono + valor grande + badge `+N%`) + tabela compacta com row corrente realçada.
- **KPI + Chart mock** — head com label + trend badge + valor grande + area chart abstrato + 2 stats no rodapé. Chart desenha via stroke-dashoffset.

### Anti-AI rules (cláusula central)
- ✓ Dados **genéricos categoriais**: "Empresa A", "Mar/Abr/Mai", "Clientes ativos · 18"
- ✗ Dados **inventados específicos**: nomes próprios, emails reais, %s de "chance"/"probabilidade"
- ✓ Botões gradient sutil, sem glow chunky
- ✓ Animações que **mimetizam "produto carregando"**: line draw, fillBar, rowIn stagger
- ✗ Animações que **se exibem**: shimmer sweep, neon pulse, bounce loop
- ✓ Labels reais do produto: "MRR", "Conversão", "Pendentes", "A receber"
- ✗ Labels persuasivos: "Lead aquecido", "Alta prob.", "PREVISTO"

### CSS techniques (CSS-only, zero JS)

```css
/* Stagger fade-up dos cards via --d inline */
.card{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) var(--d, 0ms) backwards;}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}

/* SVG line draw-in (requer <path pathLength="1">) */
.line{stroke-dasharray:1; stroke-dashoffset:1; animation:draw 1.4s ease-out 1s forwards;}
@keyframes draw{to{stroke-dashoffset:0;}}

/* Progress bar fill via --w inline */
.fill{width:0; animation:fillBar 1.1s cubic-bezier(.4,0,.2,1) 1s forwards;}
@keyframes fillBar{to{width:var(--w, 60%);}}

/* List rows stagger slide-in via --rd inline */
.row{opacity:0; transform:translateX(-8px); animation:rowIn .5s ease-out calc(1s + var(--rd, 0ms)) forwards;}
@keyframes rowIn{to{opacity:1;transform:translateX(0);}}

/* Dot pulse contínuo */
.dot{animation:pulse 1.8s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:.6;}50%{opacity:1;}}
```

### CardDecorator (4 cantos em L)
```css
.brkt{position:absolute; width:12px; height:12px; border:0 solid #a679e8; pointer-events:none; z-index:2;}
.brkt-tl{top:-1px; left:-1px; border-top-width:2px; border-left-width:2px;}
.brkt-tr{top:-1px; right:-1px; border-top-width:2px; border-right-width:2px;}
.brkt-bl{bottom:-1px; left:-1px; border-bottom-width:2px; border-left-width:2px;}
.brkt-br{bottom:-1px; right:-1px; border-bottom-width:2px; border-right-width:2px;}
```

Usar em: seções de "como funciona", "passo a passo", "features ilustradas", "benefícios em mini-dashboard". **Não usar em**: cards de team, pricing, CTAs.
