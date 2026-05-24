---
name: Site Builder Upscalead
description: Skill completa para criar sites profissionais de alta conversão para leads da Upscalead. Duas tracks — Next.js/Vercel (greenfield) ou blocos HTML/CSS/JS em widgets Elementor (cliente WordPress).
version: 3.1.0
---

# Site Builder Upscalead

## Visão Geral

Sistema de produção de sites profissionais em escala. Entrega sites de alta qualidade, com copy forte e design premium — sem cara de IA, sem templates genéricos — para leads captados via scraping.

**Ticket:** R$1.000 - R$2.000
**Velocidade:** Entrega rápida, processo industrializado

---

## ⭐ DUAS TRACKS DE BUILD — escolha antes de começar

A skill cobre duas formas de entregar pro cliente. A escolha vem do briefing
(cliente já tem WordPress? quer manter o ambiente dele?):

### Track 1 — Next.js + Vercel (forma principal, greenfield)

Para cliente que **não tem site** OU aceita migrar pra fora do WordPress.
Controle total, deploy Vercel, performance máxima.

- **Stack:** Next.js (App Router) + Tailwind CSS v4 + Framer Motion + Lucide Icons + shadcn/ui → Vercel
- **Blueprint:** `references/blueprint-padrao.md` (build de referência: **Dra. Eliane Ferreira**)
- **Biblioteca obrigatória:** skill **`assets-devweb`** (em `~/.claude/skills/assets-devweb/`) — 13 seções prontas (Hero, Areas, Diferencial, QuemSou, Etica, Depoimentos, ComoFunciona, FAQ, CTA, Header, Footer, Loader, Reveal) + 9 primitivos. **Regra:** não construir seção do zero — montar a partir do catálogo, copiar pra `src/components/` e trocar o conteúdo. Só desviar se a seção pedida não existir no catálogo.

### Track 2 — Blocos HTML/CSS/JS em Elementor (cliente já em WordPress)

Para cliente que **está em WP + Elementor** e não quer migrar. A gente entrega blocos
HTML auto-contidos (`<style>` + HTML + opcional `<script>`) que ele cola em widgets
"HTML" do Elementor, no lugar do widget de Abas/Cards/Containers antigo.

- **Stack:** HTML semântico + CSS puro + JS vanilla. Zero libs (sem React, sem framer-motion).
- **Blueprint:** `references/elementor-blueprint.md` (build de referência: **Atendly CRM**)

**Sempre leia o blueprint da track escolhida antes de começar.** São padrões validados
— replicar a estrutura, trocar o conteúdo, adaptar a identidade. Toda vez que um build
superar o padrão, atualizar o blueprint da sua track com o novo acerto.

## REGRAS DE OURO (NUNCA QUEBRAR)

Estas regras foram aprendidas na prática e são INEGOCIÁVEIS:

1. **IDENTIDADE VISUAL** — NUNCA trocar as cores do cliente. Extrair a paleta do site/marca original. O cliente precisa se reconhecer no preview. Construir a paleta com **tinted neutrals** (nunca `#000`/`#fff` puro — tingir levemente pro hue da marca) e seguir **60-30-10** de peso visual (60% neutro · 30% secundária · 10% accent). Detalhes no fim do arquivo, seção "Sistema de cor"
2. **GRID** — depende da track:
   - **Track 1 (Next.js):** `max-w-[1220px] mx-auto px-6` desktop · `px-4` mobile (alinhado com `assets-devweb`)
   - **Track 2 (Elementor):** `max-w-[1280px] mx-auto px-4 md:px-6` · `px-4` mobile
3. **ESPAÇAMENTO** — depende da track:
   - **Track 1 (Next.js):** `pt-16 sm:pt-24 pb-16 sm:pb-24` (mais respiro, padrão `assets-devweb`)
   - **Track 2 (Elementor):** `py-12 md:py-16` MÁXIMO (mais denso, scroll contínuo)
   - Em ambas: nada de `py-32`/`py-40`, zero espaço morto vazio entre seções
4. **PALAVRAS VIÚVAS & MEASURE** — `text-wrap: balance` em h1/h2/h3 (zero viúvas em headline) + `text-wrap: pretty` em parágrafos longos (sem viúvas no corpo, sem cortes feios) + corpo capado em **65–75ch** de largura. Linha longa cansa o olho e o lead some
5. **HIERARQUIA** — Tag (mb-3) → Título (mb-3) → Subtítulo (mb-8). Sempre nessa ordem. Sempre esses espaços
6. **ARREDONDAMENTO** — `rounded-lg` cards, `rounded-md` badges/tags/botões, `rounded-full` pills/avatares. Definir UMA vez, aplicar em tudo
7. **COR ACCENT** — Só em tags, links, hover, detalhes pontuais. Títulos e corpo em BRANCO. Não pintar tudo de accent
8. **IMAGENS** — Sempre `<Image>` do Next.js (WebP/AVIF automático). Nunca `<img>` direto
9. **RESPONSIVO** — Testar em 375px antes de entregar. Hover só no `md:`. Botões menores no mobile
10. **ASSETS DO CLIENTE** — Extrair TODAS as imagens do HTML/CSS original e reutilizar. O lead precisa ver o negócio DELE no preview

---

## FERRAMENTA: `scrape-site` (extração automática do site do lead)

Antes de começar a Parte 1, **rodar o scraper** pra puxar tudo do site do lead de uma vez. Evita coletar imagem por imagem na mão.

**Uso:**
```bash
cd /Users/user/site-builder-upscalead/scripts
node scrape-site.js https://siteDoLead.com.br
```

**O que ele gera** em `clientes/<dominio>/`:
- `meta.json` — title, description, og:image, fontes (Google Fonts), stylesheets, lang
- `copy.md` — textos extraídos por bloco (header, sections, footer) com tag de origem (H1, P, LI...)
- `colors.json` — paleta detectada (hex, rgb, hsl) menos `#fff`/`#000` puros
- `images.json` — mapa `url original → arquivo local`, com role (header-logo, og-image, css-bg, img-srcset, etc)
- `raw.html` — HTML cru pra debug
- `assets/` — TODAS as imagens baixadas (`001-logo.png`, `002-hero.jpg`, ...)

**Como usar o output no preview:**
1. Paleta: olhar `colors.json` pra pegar a cor REAL da marca (em vez de adivinhar do logo). Aplicar tinted neutrals derivados desse hex.
2. Logo + imagens: copiar `assets/` direto pra `public/images/` do preview do cliente.
3. Copy: ler `copy.md` pra ver tom de voz, claim principal, lista de produtos. Reescrever melhorando, **mantendo a estrutura do site original** (regra de [[feedback_preview_keep_structure]]).
4. Fontes: `meta.fonts` mostra o que ele já usa — se for boa, manter; se for genérica, propor combo melhor.

**Stack do script:** Node 18+ + cheerio (instalado em `scripts/node_modules`).

### Companion: `sync-assets.js` — copia pro projeto preview

Depois de scrapar, sincronizar os assets pra dentro do projeto Next.js do preview:

```bash
node sync-assets.js <slug-cliente> <caminho-projeto-preview>
# ex: node sync-assets.js abdoconstrutora-com-br /Users/user/site-builder-upscalead/abdo-preview
```

Copia `clientes/<slug>/assets/*` pra `<projeto>/public/images/scraped/`. No código do preview, referenciar com `/images/scraped/NOME.ext`.

---

## PARTE 1 — PREVIEW DE VENDA

O preview é a arma de venda. Ele precisa ser tão bom que o lead olha e pensa "preciso disso agora".

---

### 1A — Lead TEM site (Redesign)

**Processo:**

**Input necessário:**
- URL do site do lead
- Screenshots completos do site (hero, seções, footer, mobile)
- HTML/CSS do site (ctrl+U e colar aqui) — pra extrair assets e entender estrutura
- GTmetrix do site atual (print ou link do relatório)
- **Nicho/ramo do lead** (ex: advogado, barbearia, restaurante, clínica) — OBRIGATÓRIO pra não criar nada fora de contexto

1. **Coleta de evidências do site atual**
   - Receber **screenshots completos** do site do lead (hero, seções, footer, mobile) — isso permite análise visual 100% precisa
   - Rodar **GTmetrix** no site atual e enviar o resultado — dados reais de performance (nota, velocidade, tempo de carregamento, tamanho da página)
   - Acessar o site do lead via URL
   - Receber o **HTML/CSS/JS** do site (ctrl+U) para:
     - Entender a estrutura e hierarquia do site atual
     - Extrair os textos e conteúdos existentes
     - **Mapear TODAS as imagens/assets** (logo, fotos de equipe, produtos, banners, ícones)
   - Identificar TODOS os problemas:
     - Layout: hierarquia confusa, sem respiro, sem fluxo visual, responsividade quebrada
     - Copy: textos genéricos, sem proposta de valor clara, CTAs fracos ou inexistentes
     - Design: tipografia amadora, cores sem harmonia, imagens de baixa qualidade, espaçamento inconsistente
     - Performance: dados do GTmetrix — site lento, pesado, mal otimizado (usar números reais)
     - Conversão: sem direcionamento, sem prova social, sem urgência

2. **Extração e reaproveitamento de assets**
   - Do HTML/CSS, extrair URLs de todas as imagens do site atual:
     - Logo do negócio
     - Fotos de produtos/serviços
     - Fotos de equipe/espaço
     - Banners e backgrounds
     - Ícones e elementos gráficos
   - Baixar/referenciar esses assets pra reutilizar no redesign
   - Isso é essencial — o cara já tem fotos do negócio dele no site, a gente USA elas no novo
   - Se as imagens forem de baixa qualidade, tratar (upscale, crop, ajuste de cor)
   - Se faltar imagens, aí sim buscar alternativas (AI, stock)

3. **Respeitar o nicho — ZERO viagem**
   - Antes de criar qualquer coisa, confirmar o nicho do lead
   - Todo o design, copy e tom devem ser adequados ao ramo:
     - Advogado → sóbrio, formal, confiança. NÃO usar linguagem informal ou design colorido
     - Barbearia → bold, masculino, edgy. NÃO usar tons pastéis ou linguagem corporativa
     - Restaurante → quente, apetitoso, imagens grandes. NÃO usar visual frio e tech
     - Clínica → limpo, acolhedor, profissional. NÃO usar design agressivo
     - E assim por diante — cada nicho tem seu tom
   - Referência de direções estéticas por nicho está na Parte 3, Etapa 2

4. **Criar Redesign (Preview) — HERO PRIMEIRO**
   - A **Hero section é prioridade absoluta** — é o primeiro impacto, precisa ser impecável
   - Hero precisa ter: headline matadora + visual forte + CTA claro + elemento que cause "wow"
   - Aplicar técnicas premium na hero: tipografia bold, background com personalidade (imagem AI, vídeo sutil, efeito visual), animações de entrada, contraste forte
   - **Usar as imagens extraídas do site atual** — o lead precisa se reconhecer no preview
   - Depois da hero aprovada, desenvolver as demais seções mantendo o mesmo nível
   - Usar a estrutura do site atual como base de conteúdo
   - Redesenhar completamente com padrão premium
   - Reescrever toda a copy com foco em conversão (respeitando o tom do nicho)
   - Aplicar design profissional (tipografia, cores, espaçamento, componentes)
   - O preview precisa ser funcional — não é mockup, é site real rodando

3. **Relatório de Análise (HTML — identidade Upscalead)**
   O relatório é um arquivo HTML standalone com a identidade da Upscalead (preto, Inter, contraste mínimo, shader WebGL, botão liquid metal). É uma peça de VENDA, não um documento técnico.

   **Template base em:** `relatorio.html` na raiz do projeto

   **Estrutura fixa (nunca muda):**
   ```
   1. Hero — shader WebGL animado + logos (cliente × UPSCALEAD)
   2. Breadcrumb — "Análise de site → Relatório de melhorias"
   3. Info do cliente — grid: empresa, site atual, segmento
   4. "O que está em jogo" — lista com → mostrando o que o cara tá PERDENDO
   5. Problemas identificados — rows numeradas (01-05) com título + descrição + impacto
   6. Antes × Depois — tabela com indicators red (atual) / green (redesign)
   7. Stats — 3 números de impacto do redesign
   8. CTA — botão liquid metal com link do preview
   9. Footer — Copyright Upscalead
   ```

   **O que VARIA por cliente:**
   - Logo do cliente no hero
   - Nome, URL, segmento
   - Lista de perdas (personalizada ao negócio)
   - Problemas específicos (extraídos da análise real)
   - Tabela antes/depois (específica)
   - Números do stats grid
   - Link do preview

   **Identidade visual Upscalead no relatório:**
   - Background: #0a0a0a (preto puro)
   - Fonte: Inter (única)
   - Cinza: #444, #555, #666, #999, #ccc — contraste mínimo
   - Separadores: 1px solid #1a1a1a
   - Shader: Three.js via CDN (linha de luz branca/azulada sutil)
   - Botão CTA: liquid metal (preto gradiente, glow, reflexo animado)
   - NUNCA usar cores do cliente no relatório — o relatório é da Upscalead

4. **Copy de Venda (mensagem para o lead)**
   Estrutura da mensagem:

   ```
   ASSUNTO: Vi seu site [nome do negócio] — posso te mostrar algo?

   DIAGNÓSTICO (dados reais):
   - Seu site carrega em [X]s — o ideal é menos de 3s. [X]% dos visitantes saem antes de carregar.
   - [Problema visual específico] — isso passa impressão de [consequência]
   - [Problema de conversão] — você tá perdendo clientes por isso

   O QUE ISSO ESTÁ CUSTANDO:
   - Clientes que entram e saem em segundos
   - Credibilidade perdida vs concorrência
   - Vendas/leads que não convertem

   A SOLUÇÃO (link do preview):
   "Redesenhei seu site pra você ver a diferença. Olha: [link]"

   CTA:
   "Se fizer sentido pra você, a gente coloca isso no ar essa semana."
   ```

---

### 1B — Lead NÃO TEM site

**Processo:**

1. **Pesquisa do lead**
   - Nome do negócio, ramo de atuação, localização
   - Buscar informações disponíveis (Google, redes sociais, Google Maps)
   - Entender o público-alvo do lead
   - Analisar concorrentes que TÊM site no mesmo nicho/região

2. **Criar Site Preview**
   - Montar uma landing page completa baseada nas informações coletadas
   - Copy persuasiva focada no nicho dele
   - Design profissional alinhado ao segmento
   - Seções: Hero + Sobre + Serviços/Produtos + Prova Social + CTA
   - Precisa parecer que foi feito sob medida (e foi)

3. **Copy de Venda (entregue junto ao preview)**
   Estrutura da mensagem para o lead:

   ```
   ASSUNTO: [Nome do negócio] precisa estar na internet — te mostro por quê

   O PROBLEMA:
   - X% dos clientes buscam no Google antes de comprar/contratar
   - Seu concorrente [nome ou "da região"] já tem presença online
   - Você está invisível pra quem te procura

   O QUE VOCÊ ESTÁ PERDENDO:
   - Clientes que buscam "[serviço] + [cidade]" e não te acham
   - Credibilidade — hoje em dia quem não tem site parece amador
   - Vendas no automático 24h por dia

   A SOLUÇÃO (link do preview):
   "Montei como ficaria um site pro [nome do negócio]. Olha: [link]"

   CTA:
   "Se curtir, coloco no ar essa semana por [valor]."
   ```

---

## PARTE 2 — FECHAMENTO (Formulário/Briefing)

Quando o lead aceita, enviamos o briefing. Precisa ser completo pra extrair tudo que é necessário pra montar a copy e o site sem precisar voltar pra perguntar mais nada.

---

### Formulário para o Cliente

```
═══════════════════════════════════════════
   BRIEFING UPSCALEAD — SEU SITE PROFISSIONAL
═══════════════════════════════════════════

Preencha com calma e com o máximo de detalhes.
Quanto mais informação, melhor fica seu site.

───────────────────────────────────────────
BLOCO 1 — SEU NEGÓCIO
───────────────────────────────────────────

1. Nome da empresa/marca:

2. Qual seu ramo de atuação? (ex: barbearia, advocacia, restaurante, clínica):

3. Descreva o que seu negócio faz em 2-3 frases (como se tivesse explicando pra alguém que nunca ouviu falar de você):

4. Desde quando você está no mercado? (ano de fundação ou tempo de atuação):

5. Qual a cidade/região que você atende?

6. Você atende presencialmente, online ou os dois?

───────────────────────────────────────────
BLOCO 2 — SEUS SERVIÇOS/PRODUTOS
───────────────────────────────────────────

7. Liste TODOS os serviços ou produtos que você oferece:
   (coloque o nome + uma breve descrição de cada)

   Serviço/Produto 1:
   Serviço/Produto 2:
   Serviço/Produto 3:
   Serviço/Produto 4:
   Serviço/Produto 5:
   (adicione quantos precisar)

8. Qual é o serviço/produto PRINCIPAL? O carro-chefe do seu negócio:

9. Tem faixa de preço que gostaria de mostrar no site? Se sim, quais:
   (se preferir não mostrar, tudo bem — escreva "não mostrar")

───────────────────────────────────────────
BLOCO 3 — SEU CLIENTE
───────────────────────────────────────────

10. Quem é seu cliente ideal? (idade, sexo, profissão, perfil):

11. Qual o principal PROBLEMA ou NECESSIDADE que seu cliente tem quando te procura?

12. Como você resolve esse problema melhor que os outros?

13. Qual a principal OBJEÇÃO ou DÚVIDA que os clientes têm antes de fechar com você?
    (ex: "é caro", "será que funciona", "demora muito"):

14. Depois de usar seu serviço/produto, qual o resultado que o cliente tem?
    (ex: "sai com o visual renovado", "resolve o processo em 30 dias", "economiza 40% na obra"):

───────────────────────────────────────────
BLOCO 4 — SEU DIFERENCIAL
───────────────────────────────────────────

15. O que te faz DIFERENTE da concorrência? Por que alguém deveria escolher você e não o vizinho?
    (pode ser atendimento, qualidade, experiência, preço, localização, método exclusivo, etc.)

16. Tem alguma certificação, prêmio, parceria ou conquista relevante?

17. Tem alguma história por trás do negócio que vale ser contada?
    (ex: "comecei na garagem", "3 gerações da família", "larguei o emprego pra seguir meu sonho"):

───────────────────────────────────────────
BLOCO 5 — PROVA SOCIAL
───────────────────────────────────────────

18. Quantos clientes já atendeu (aproximado)?

19. Tem avaliações no Google? Qual a nota? (ex: 4.8 com 120 avaliações):

20. Tem depoimentos de clientes satisfeitos?
    (cole aqui os melhores — prints do WhatsApp, Google, Instagram servem.
     Se puder, envie junto o nome e foto do cliente com autorização)

    Depoimento 1:
    Depoimento 2:
    Depoimento 3:

21. Tem fotos de ANTES e DEPOIS do seu trabalho? (se aplicável ao nicho):

22. Trabalhou com algum cliente conhecido ou empresa grande?

───────────────────────────────────────────
BLOCO 6 — CONTATO E REDES
───────────────────────────────────────────

23. WhatsApp (com DDD):

24. Telefone fixo (se tiver):

25. E-mail profissional:

26. Instagram:

27. Facebook:

28. Outras redes (TikTok, YouTube, LinkedIn):

29. Endereço completo (se tiver ponto físico):

30. Horário de funcionamento:

───────────────────────────────────────────
BLOCO 7 — VISUAL E MARCA
───────────────────────────────────────────

31. Tem manual da marca / identidade visual?
    (PDF, link do Drive, Dropbox — qualquer formato serve. Se tiver, envie aqui que a gente segue 100%)

32. Se não tiver manual, envie o que tiver:
    - Logo (PNG, SVG, ou o que tiver)
    - Cores da marca (print, código hex, ou "não tenho definido")

33. Tem FOTOS REAIS do seu negócio? Envie as melhores:
    (fachada, equipe, produtos, ambiente — fotos reais passam muito mais credibilidade)

34. Tem algum site que você acha bonito como referência?
    (pode ser de qualquer ramo — é só pra entender seu gosto visual):

───────────────────────────────────────────
BLOCO 8 — OBJETIVO DO SITE
───────────────────────────────────────────

36. Qual a PRINCIPAL ação que o visitante deve tomar no site?
    (escolha UMA principal)
    [ ] Chamar no WhatsApp
    [ ] Preencher formulário de orçamento
    [ ] Ligar
    [ ] Agendar horário
    [ ] Visitar o local
    [ ] Outro: _______________

37. Tem alguma oferta, promoção ou isca que quer destacar no site?
    (ex: "primeira consulta grátis", "orçamento sem compromisso", "10% de desconto pelo site"):

38. Tem algo que você NÃO quer no site? (algo que te incomode em sites de concorrentes):

───────────────────────────────────────────
BLOCO 9 — DOMÍNIO
───────────────────────────────────────────

39. Já tem domínio comprado? (ex: www.seunegocio.com.br):
    Se sim, qual:
    Se não, qual nome gostaria? (damos sugestões)

═══════════════════════════════════════════
   Obrigado por preencher! Com essas informações
   vamos criar um site que realmente representa
   seu negócio e traz resultado.
═══════════════════════════════════════════
```

**Como usar o briefing no desenvolvimento:**
- Bloco 1 + 4 + 5 → alimentam a copy de **Hero** e **Sobre**
- Bloco 2 → alimenta a seção de **Serviços/Produtos**
- Bloco 3 → define o **tom da copy** inteira (falar a língua do cliente do lead)
- Bloco 3 pergunta 13 → alimenta o **FAQ** (quebrar objeções)
- Bloco 3 pergunta 14 → alimenta os **CTAs** e a **proposta de valor**
- Bloco 5 → alimenta **Prova Social** e **Depoimentos**
- Bloco 6 → alimenta **Footer** e **Header** e links de contato
- Bloco 7 → define toda a **direção visual** (cores, tipografia, estilo)
- Bloco 8 → define a **estratégia de conversão** do site inteiro

---

## PARTE 2.5 — DESIGN.md DO CLIENTE (antes de codar)

Entre receber o briefing e abrir o editor, **escrever o `DESIGN.md` do cliente**. É um artefato intermediário pequeno (~150 linhas) que consolida todas as decisões visuais ANTES da primeira linha de código.

**Problema que resolve:** hoje decidimos cores/tokens "na hora de codar" e às vezes inconsistente entre seções (o menu tem um shade, a tabela outro, depoimentos outro). Em escala (~4000 leads → batches por nicho), isso multiplica retrabalho. Com `DESIGN.md` por cliente:
- Decisões já vêm prontas pro código
- Doc fica no repo do cliente — qualquer agente futuro lê e continua coerente
- Reuso entre clientes do mesmo nicho (template já vem 70% preenchido)

**Fluxo:**

1. **Copiar o template** — `references/design-md-template.md` → vira `DESIGN.md` na raiz do projeto do cliente
2. **Calibrar pelo nicho** — abrir 1-2 referências em `references/design-md-refs-por-nicho.md` (advogado → Stripe/Linear · clínica → Notion/Cal · tech → Vercel/Cursor) pra ver como organizam tokens. Pegar a **estrutura/disciplina**, não a profundidade
3. **Preencher seções 1-5 do template** — paleta (5 cores tinted), tipografia (5 tokens), spacing, radius, motion. Cada `[colchete]` vira valor concreto
4. **Validar AI Slop Test** — a paleta escolhida é o reflexo óbvio do nicho? Forçar desvio intencional (ver SKILL.md "AI Slop Test")
5. **Documentar componentes (seções 6-7)** — copiar do template e ajustar custom Do's & Don'ts do cliente

Depois disso vai pra Parte 3. **Sem `DESIGN.md` preenchido = não começar a codar** — drift de tokens é garantido sem isso.

**Tempo estimado:** 20-30 min pra preencher se já tem briefing + paleta extraída.

---

## PARTE 3 — DESENVOLVIMENTO COMPLETO

Com o briefing em mãos, seguimos o processo de desenvolvimento.

---

### Etapa 1: Estrutura e Copy

**Definir a estrutura de páginas/seções:**

Landing Page padrão (one page):
```
1. Header/Nav — logo + menu + CTA principal
2. Hero — headline matadora + subtítulo + CTA + elemento visual forte
3. Prova Social — números, logos de clientes, selo de confiança
4. Serviços/Produtos — o que oferece, benefícios (não features)
5. Sobre — história, diferencial, humanizar o negócio
6. Depoimentos — prova social real, com nome e foto
7. FAQ (opcional) — quebrar objeções comuns
8. CTA Final — última chamada pra ação
9. Footer — contato, redes, mapa, links
```

**Copy — SEMPRE usar a skill `copywriting`:**

A copy não é escrita no improviso. O processo é:

1. **Invocar a skill `copywriting`** (instalada em `~/.agents/skills/copywriting`). Ela traz
   o método: ~24 fórmulas de headline, estrutura narrativa de página, regras de CTA,
   princípios de escrita e a lista de vícios de IA a evitar.

2. **Alimentar com o briefing como contexto.** O briefing de 9 blocos (Parte 2) É o
   "Before Writing" da skill:
   - Bloco 1 + 4 → Product/Offer (o que é, qual o diferencial)
   - Bloco 3 → Audience (problema, objeção, linguagem do cliente)
   - Bloco 8 → Page Purpose (a ÚNICA ação principal do site)
   Opcional: salvar o briefing como `.agents/product-marketing.md` na raiz do projeto —
   a skill `copywriting` lê esse arquivo automaticamente.

3. **Aplicar a camada PT-BR / negócio local.** A skill `copywriting` é inglês + sabor SaaS.
   Para sites Upscalead (PT-BR, negócio local, CTA de WhatsApp), seguir
   `references/copy-ptbr-local.md` — fórmulas de headline em PT-BR por nicho, CTAs locais
   (WhatsApp / orçamento / agendar) e vícios de IA em português.

4. **Rodar o checklist de copy** de `references/copy-ptbr-local.md` antes de passar pro design.

**Regra de ouro da copy:** nada inventado. Todo número, depoimento e claim vem do briefing.
Sem o dado no briefing → perguntar ao usuário, nunca inventar.

**Realismo de conteúdo (anti-genérico):** mesmo com briefing real na mão, é fácil cair em filler. Bloquear estes vícios:

*Nomes — em depoimentos, prova social, formulários, alt-text:*
- ❌ "John Doe", "Sarah Chen", "Maria Silva" (sobrenome ultra-genérico)
- ✅ Nomes brasileiros plausíveis: "Mariana Costa", "Pedro Lima", "Ricardo Mendes", "Camila Tavares" — variar região (sobrenome do sul, nordeste, paulista) pra parecer real
- ✅ Se for depoimento real do cliente → usar nome exato do briefing

*Empresas — em logos placeholder, cases, parceiros:*
- ❌ "Acme Corp", "Nexus", "SmartFlow", "TechCorp", "Globex"
- ✅ Nomes brasileiros plausíveis no nicho: "Mercearia Santa Rita", "Construtora Vale Verde", "Clínica São Lucas" — combinar pra parecer empresa real

*Números — em stats, contadores, prova social:*
- ❌ Redondos: 50%, 100, 1000, 2000, 95% (cheira "chutei pra fechar")
- ✅ Orgânicos: 47%, 147, 1.842, 92%, 4.083 — parece dado medido, não inventado
- Se o briefing diz "uns 100" → escrever "+ de 130" ou "perto de 150" (parece contado, não chutado)

*Copy oca — palavras que IA repete:*
- ❌ "Elevate", "Seamless", "Unleash", "Empower", "Revolutionize", "Excelência", "Soluções inovadoras", "Atendimento personalizado", "Compromisso com a qualidade"
- ✅ Falar concreto: "Resolveu meu problema em 30 dias", "Sai com o orçamento na mão", "Atende em até 2h pelo WhatsApp" — verbo + número + prazo

*Imagens placeholder (durante dev):*
- ❌ Unsplash genérico de "businessman sorrindo", avatars padrão do shadcn, links de Unsplash quebrados
- ✅ `picsum.photos` durante dev OU pedir foto real do cliente no briefing. Em produção, **sempre** foto real do negócio dele

Antes de entregar, fazer Ctrl+F do site procurando essas palavras-tell. Se aparecer uma, reescrever.

---

### Etapa 2: Design e Layout

**Princípios visuais obrigatórios:**

- **NUNCA** usar gradientes roxos/azuis genéricos
- **NUNCA** usar layouts previsíveis de template SaaS
- **NUNCA** usar tipografia padrão (Inter, sans-serif genérica sem intenção)
- **NUNCA** parecer feito por IA

**O que SEMPRE aplicar:**

- Tipografia com personalidade — par de fontes (display + body) do Google Fonts
- Paleta de cores intencional derivada da marca ou do nicho
- Espaçamento generoso — deixar o design respirar
- Hierarquia visual clara — o olho sabe pra onde ir
- Componentes de qualidade (referência: 21st.dev)
- Micro-interações sutis — hover states, scroll animations, loading
- Imagens tratadas e de qualidade (se o cliente não tiver, usar AI ou stock premium)
- Mobile-first — funcionar perfeito no celular

**Fontes recomendadas (Google Fonts) — escolher 1 display + 1 body:**

*Display (títulos, hero):*
- **Instrument Serif** — serif elegante, premium, validado no Eliane
- **DM Serif Display** — serif com peso, bom pra hero impactante
- **Cabinet Grotesk** — sans-serif geométrica moderna, peso editorial
- **Outfit** — sans-serif neutra com toque tech (bom pra clínica, tech)
- **Satoshi** — sans-serif clean, peso variável

*Body (corpo, parágrafos):*
- **Geist** — sans-serif técnica, ótima legibilidade (validado no Eliane)
- **Inter** — sim, funciona — mas só se escolhida com intenção, não default
- **DM Sans** — alternativa neutra
- **Geist Mono** — pra eyebrows, labels, números, badges (12px uppercase)

Combos validados: `Instrument Serif + Geist` (Eliane) · `DM Serif Display + DM Sans` (premium clássico) · `Cabinet Grotesk + Outfit` (moderno editorial).

**Padrão de formulário (quando tiver):**

- **Label acima do input** — nunca placeholder como label (some quando digita)
- **Helper text opcional, abaixo do input**, font-size menor, cor mute
- **Erro abaixo do input**, cor vermelha tingida (não `#ff0000` puro — tingir pro hue da marca também)
- **Input vazio:** border 1px sutil · **focus:** border accent + ring sutil · **erro:** border vermelha tingida
- **Botão primário** abaixo dos campos, full-width no mobile, alinhado à direita no desktop (ou full também, se simplificar)
- **Campos por bloco visível: ≤ 4** antes de divider/scroll (cognitive load)

**Gotcha técnico — viewport mobile (iOS Safari):**

Nunca usar `h-screen` (Tailwind) ou `height: 100vh` em hero/full-page section. No iOS Safari a barra de URL sobe e desce no scroll, e o `100vh` é a altura SEM a barra → hero corta. Usar sempre:

```css
min-height: 100dvh;   /* dynamic viewport — respeita a barra do Safari */
```

Tailwind: `min-h-[100dvh]` no lugar de `min-h-screen` ou `h-screen` em qualquer seção que ocupe a tela toda.

**Direções estéticas por nicho (referência, não regra fixa):**

| Nicho | Direção |
|-------|---------|
| Advocacia/Contabilidade | Clean, sóbrio, tipografia forte, cores escuras |
| Restaurante/Food | Quente, imagens grandes, cores terrosas ou vibrantes |
| Barbearia/Estética | Bold, contrastes fortes, preto/dourado, edgy |
| Clínica/Saúde | Limpo, acolhedor, tons suaves, muito branco |
| Construção/Reforma | Robusto, industrial, imagens de obra, tons neutros |
| Loja/Varejo | Vibrante, produto em destaque, CTAs fortes |
| Tech/Startup | Moderno, minimalista, animações, dark mode |

**⚠️ AI Slop Test — o nicho é PONTO DE PARTIDA, não destino.**

A tabela acima é a 1ª aproximação. Se a gente parar nela, todo site de barbearia vira preto+dourado, todo advogado vira sóbrio+verde-escuro, todo restaurante vira marrom+laranja. É o reflexo que toda IA tem — e o que faz lead reconhecer um preview de longe como "feito por IA".

**Filtro de 2 ordens antes de fechar a paleta/direção:**

1. **1ª ordem — domínio decide:** "Barbearia → preto e dourado." Se a gente parou aqui, perdeu.
2. **2ª ordem — desvio intencional:** o que **dentro do tom do nicho** rompe a expectativa? Barbearia premium pode ir pra **verde-musgo + cobre** ao invés de preto+dourado. Advogado moderno pode ir pra **bege quente + bordô** ao invés de azul-marinho+cinza. Clínica pode ir pra **terracota + cream** ao invés de azul+branco.

Regra prática: ao definir a paleta, escrever a 1ª opção óbvia, **riscar**, e procurar a 2ª opção que ainda serve ao nicho mas não é o reflexo. Esse desvio é o que faz o lead pensar "isso aqui é diferente".

Casos onde **não desviar**:
- Cliente já tem identidade visual definida (manual de marca) → seguir 100% as cores dele
- Nicho ultra-conservador onde desvio quebra credibilidade (cartório, contabilidade tradicional)

---

### Etapa 3: Desenvolvimento Técnico

**Stack:**
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (animações)
- Lucide React (ícones)
- shadcn/ui base (Button, cn utils)
- class-variance-authority + clsx + tailwind-merge
- Next.js Image (otimização automática WebP/AVIF)
- Three.js (opcional — shaders, efeitos 3D tipo DottedSurface)
- Componentes do 21st.dev como referência quando aplicável
- Vercel para deploy

**Estrutura de projeto:**
```
/src
  /app
    page.tsx            — página principal (importa todos os componentes)
    layout.tsx          — layout global (fonts, metadata, html lang)
    globals.css         — CSS vars (cores do cliente), scrollbar, selection
  /components
    Header.tsx          — logo real + nav + CTA
    Hero.tsx            — headline + CTA + stats + background
    Especialidades.tsx  — grid de serviços (FeatureCard com pattern SVG)
    Diferenciais.tsx    — priority list style
    Depoimentos.tsx     — colunas scrollando com fotos reais
    CasosNaMidia.tsx    — grid de cards com imagens
    Equipe.tsx          — cards dos sócios + sobre
    CTASection.tsx      — CTA final com shader bg
    Footer.tsx          — 4 colunas + text hover effect
    /ui
      animated-button.tsx   — botão pill com icon slide
      button.tsx            — shadcn base button
      text-hover-effect.tsx — SVG text que segue o mouse
      dotted-surface.tsx    — Three.js particle waves
  /lib
    utils.ts            — cn() helper
/public
  /images               — imagens do cliente (otimizadas)
/next.config.ts         — remotePatterns pra imagens externas, formats WebP/AVIF
```

**Configuração obrigatória no globals.css (Track 1 — alinhado com `assets-devweb`):**

```css
:root {
  /* base */
  --background: #fbfbf9;                 /* creme tinted neutral — trocar pelo hue da marca */
  --foreground: #252116;                 /* quase-preto quente */

  /* marca (a única que muda forte por cliente) */
  --c-warm-accent: [hex da marca];       /* accent ~10% da página */

  /* seções escuras / inversões */
  --marketing-primary-bg: #252116;       /* fundo das seções dark (CTA, Etica) */
  --marketing-primary-text: #fbfbf9;     /* texto sobre primary-bg */

  /* bordas e copy soft */
  --marketing-border: rgba(0,0,0,0.10);  /* divider universal */
  --marketing-copy-soft: #6b6b6b;        /* subtítulos, captions, helper text */
}
```

Cliente com identidade visual definida → tinted neutrals derivados do hue da marca (ver "Sistema de Cor"). Esses nomes de token (`--c-warm-accent`, `--marketing-primary-bg`, etc.) são os que os componentes da skill `assets-devweb` esperam — renomear quebra o catálogo.

**Combo tipográfico padrão (Track 1 — Google Fonts via `next/font`):**

| Token | Fonte | Uso |
|---|---|---|
| display | **DM Serif Display** | Headline do Hero (uma vez por página) |
| heading | **Instrument Serif** | h2/h3 de seções |
| body | **Geist** | Corpo, parágrafos, CTAs |
| mono | **Geist Mono** | Eyebrows (11px uppercase), labels, números, badges |

Esse é o combo travado da `assets-devweb`. Trocar só se a marca pedir explícito (manual com fonte definida) ou se o nicho não comportar serif (ex: tech ultra-clean). Combos alternativos validados: `DM Serif Display + DM Sans`, `Cabinet Grotesk + Outfit`.

**Escala tipográfica fixa (Track 1):**

| Elemento | Tamanho |
|---|---|
| Eyebrow (mono uppercase) | `11px` · `tracking-wide` |
| h2 de seção | `clamp(36px, 6vw, 56px)` |
| h1 / hero | `clamp(48px, 8vw, 72px)` |
| Corpo | `15–17px` |

**Dot pattern (decorativo, fundo de seção):**

```css
background-image:
  radial-gradient(circle, rgba(0,0,0,0.10) 0.75px, transparent 0.75px),
  radial-gradient(circle, rgba(0,0,0,0.10) 0.75px, transparent 0.75px);
background-size: 5px 5px;
background-position: 0 0, 2.5px 2.5px;
```

Componente pronto: `assets-devweb/components/ui/DotPattern.tsx`.

**Configuração obrigatória no next.config.ts:**
```ts
images: {
  formats: ["image/avif", "image/webp"],
  remotePatterns: [{ protocol: "https", hostname: "[domínio do cliente]" }]
}
```

**Checklist `/audit-site` — pontuação obrigatória antes de entregar:**

Auditoria estruturada em 5 categorias. Cada item passa (1) ou falha (0). **Score mínimo pra entrega: 26/30**. Qualquer falha em item marcado [BLOQUEIO] = não entregar, fix primeiro.

*Categoria A — Grid & Layout (5 pontos)*
- [ ] [BLOQUEIO] Grid correto pra track: Track 1 = `max-w-[1220px] px-6` · Track 2 = `max-w-[1280px] px-4 md:px-6`
- [ ] Padding de seção correto pra track: Track 1 = `pt-16 sm:pt-24 pb-16 sm:pb-24` · Track 2 = `py-12 md:py-16` (máx)
- [ ] Hierarquia: tag (`mb-3`) → título (`mb-3`) → subtítulo (`mb-8`) em TODA seção
- [ ] Arredondamento consistente: `rounded-lg` cards · `rounded-md` tags/badges · `rounded-full` pills
- [ ] Cognitive load: nav ≤5 · cards/linha ≤4 · 3 planos · 1 CTA primário por viewport

*Categoria B — Tipografia & Copy (6 pontos)*
- [ ] [BLOQUEIO] `text-wrap: balance` em h1/h2/h3 — zero palavras viúvas em headlines
- [ ] `text-wrap: pretty` + `max-width: 65ch` em parágrafos de corpo
- [ ] Par de fontes com intenção (display + body), não Inter genérica sem motivo
- [ ] Copy sem em-dash `—` ou en-dash `–` (tell de IA) — ver [[feedback_no_em_dash]]
- [ ] Copy passou pela skill `copywriting` + `references/copy-ptbr-local.md`
- [ ] Zero erro de português, zero "Lorem ipsum", zero claim inventado

*Categoria C — Cor & Identidade (5 pontos)*
- [ ] [BLOQUEIO] Cores do cliente preservadas (paleta extraída do site/marca original)
- [ ] Tinted neutrals — nenhum `#000`/`#fff` puro no CSS (ver seção "Sistema de cor")
- [ ] 60-30-10 visualmente respeitado: accent NÃO é mais que 10% da página
- [ ] Logo real do cliente no header e footer
- [ ] AI Slop Test passou: a paleta não é o reflexo óbvio do nicho

*Categoria D — Motion & Interação (5 pontos)*
- [ ] Durações dentro de 100/300/500. Saídas ~75% da entrada
- [ ] Zero `transition: ... ease` genérico — todas as curvas têm intenção (`cubic-bezier`)
- [ ] `@media (prefers-reduced-motion: reduce)` configurado
- [ ] Hover effects só no `md:` pra cima (mobile não tem hover)
- [ ] Links críticos funcionando: WhatsApp (com `wa.me/55...`), telefone (`tel:`), redes

*Categoria E — Responsivo & Performance (5 pontos)*
- [ ] [BLOQUEIO] Testado em 375px (iPhone SE) — sem overflow horizontal, sem texto cortado
- [ ] Testado em 768px (iPad) — sem layout quebrado nos breakpoints
- [ ] Testado em 1440px+ (desktop) — sem espaços vazios laterais excessivos
- [ ] Imagens: todas com `<Image>` do Next.js (Track 1) OU webp hospedado no wp-content (Track 2)
- [ ] Lighthouse > 90 em Performance e Accessibility (rodar antes de fechar)
- [ ] [BLOQUEIO Track 1] `npx tsc --noEmit` limpo + `npm run build` passando (sem warnings de imagem/eslint)

*Categoria F — Anti-padrões (4 pontos — todos obrigatórios)*
- [ ] Zero gradient text (`background-clip: text` em título)
- [ ] Zero grid de 3+ cards idênticos sem variação de layout/tamanho
- [ ] Zero glassmorphism como default em todos os cards
- [ ] Zero hero-metric template ("4.000+" gigante + label como única coisa na seção)

**Score:**
- **30/30** → entrega premium, pode mandar com confiança
- **26–29** → entrega aceitável, idealmente fechar os gaps
- **< 26 OU qualquer [BLOQUEIO] falhou** → não entregar. Voltar e corrigir.

Rodar este checklist sempre — em preview de venda E em entrega final pós-fechamento.
- [ ] Scroll da página inteiro — sem gaps enormes, sem monotonia visual

---

### Etapa 4: Deploy e Entrega

1. Subir projeto no GitHub (repositório privado)
2. Conectar na Vercel
3. Configurar domínio do cliente
4. Testar tudo em produção
5. Entregar pro cliente com instruções básicas

---

## REFERÊNCIAS DE DESIGN

Ao desenvolver qualquer site, SEMPRE buscar inspiração em:

- **https://21st.dev/community/components** — componentes React/Tailwind prontos
- **https://www.awwwards.com** — sites premiados, referência de alto nível
- **https://codepen.io** — efeitos, animações, snippets de código
- **https://www.monet.design** — referência de UI e design

**Técnicas de referência (do processo de clonagem):**
- Ao encontrar um site bom como referência, capturar o HTML/CSS/JS (ctrl+U)
- Usar como base estrutural — não copiar, adaptar e personalizar
- Identificar técnicas específicas (animações, efeitos, layouts) e aplicar ao projeto

---

## GOTCHAS TÉCNICOS (Track 1 — bugs já pagos, nunca repetir)

Cada um destes custou tempo no passado. Antes de entregar, varrer cada item:

1. **`padding` shorthand inline vence classe Tailwind `pt-*`.** `style={{ padding: "0 24px" }}` zera o `padding-top` da div, mesmo que ela tenha `className="pt-16"`. Estilo inline ganha. Se o componente também usa `pt-*`/`pb-*`, no inline usar `paddingLeft`/`paddingRight` separados — nunca o shorthand `padding`.

2. **Headline longa quebra feio em muitas linhas.** Mesmo com `text-wrap: balance`, headline de 12+ palavras racha em 4+ linhas e o hero fica pesado. Manter curta (≤9 palavras) ou cortar com `<br/>` controlado em ponto natural.

3. **`<details>` nativo abre sem animação.** Sempre usar accordion com `AnimatePresence` + `height: auto` (padrão `assets-devweb/components/FAQ.tsx`). O `<details>` é semântico mas visualmente bruto, parece amador.

4. **Timeline/stepper sem conector no mobile.** O stepper horizontal do desktop tem a linha entre badges. No mobile, ao virar vertical, lembrar de manter conector vertical (linha tracejada à esquerda dos badges). Sem o conector, vira lista de bullets desconexa. Ver `assets-devweb/components/ComoFunciona.tsx`.

5. **Botão mobile com texto longo quebra linha.** "Falar com especialista no WhatsApp agora" no botão estoura no 375px. Encurtar texto no mobile (variação curta tipo "Falar agora") e adicionar `whitespace-nowrap` no botão.

6. **Menu hambúrguer sem painel real.** Ícone hambúrguer no mobile precisa de painel que abre/fecha de verdade (animação de slide ou fade-in). Não basta o ícone trocando de estado. Ver `assets-devweb/components/Header.tsx`.

7. **`<img>` em vez de `<Image>` do Next.** Perde otimização automática (WebP/AVIF), lazy loading e prevenção de layout shift. Se for inevitável (ex: SVG inline com manipulação), adicionar `eslint-disable-next-line @next/next/no-img-element` pra documentar a decisão.

8. **Não rodar `tsc` e `build` antes de entregar.** Antes de qualquer deploy/entrega, rodar:
   ```bash
   npx tsc --noEmit   # type-check limpo
   npm run build      # build de produção sem erro
   ```
   Erro só em runtime na Vercel = embaraço. Pegar localmente.

---

## ANTI-PADRÕES (O que NUNCA fazer)

1. ❌ Gradientes roxos/azuis genéricos
2. ❌ Cards flutuantes com sombra exagerada
3. ❌ Ícones genéricos de banco de ícones sem contexto
4. ❌ "Lorem ipsum" ou textos placeholder
5. ❌ Seções com mesmo padding/layout repetido (monotonia visual)
6. ❌ Botões "Saiba mais" sem destino claro
7. ❌ Fontes padrão sem intenção tipográfica
8. ❌ Cores aleatórias sem paleta definida
9. ❌ Hero section sem proposta de valor clara
10. ❌ Site que parece template — precisa parecer feito sob medida
11. ❌ **Gradient text** (`background-clip: text` em título). Tell de IA dos últimos 3 anos. Se quer destaque na headline, usa peso/tamanho/itálico — não gradiente
12. ❌ **Side-stripe borders** (`border-left: 3px solid` colorida em card/alert). Padrão de framework dos anos 2010, grita "bootstrap"
13. ❌ **Hero-metric template** ("4.000+ leads atendidos") número gigante + label pequeno como única coisa na seção. Vazio de contexto, mil sites de SaaS já fazem. Se for usar número, contextualizar dentro de uma frase ou comparativo
14. ❌ **Glassmorphism como default** (`backdrop-blur` + transparência em todo card). Uso pontual em header sticky e dropdown OK — uso geral em todos os cards = template Figma de 2021
15. ❌ **Grids de cards idênticos** (3 cards lado a lado com mesma estrutura: ícone + título + descrição + link). É o tell visual #1 de site de IA. Se vai listar 3+ coisas, varia: 1 grande + 2 pequenas, ou layout assimétrico, ou stack vertical com tamanhos diferentes
16. ❌ **Custom mouse cursors** (cursor com ponteiro custom, círculo seguindo o mouse, "magnetic cursor"). Tell direto de IA — site profissional de negócio local usa cursor padrão do sistema. Exceção: portfólio criativo/agência, mas mesmo assim é decisão consciente
17. ❌ **shadcn/ui no estado default** (Track 1). Se usar shadcn (Button, Card, Accordion, Input), customizar 100%: tokens próprios, padding diferente, border-radius do projeto, hover state com easing escolhido. Componente shadcn cru = grita "vibe coded em 5 minutos". O Eliane usa shadcn de base, mas todos os componentes foram retrabalhados

---

## GERAÇÃO DE PROMPTS PARA IMAGEM E VÍDEO

Quando o site precisar de imagens ou vídeos customizados (hero backgrounds, assets visuais, fotos conceituais), o processo é:

**1. Entender a necessidade:**
- Qual seção do site precisa do asset? (hero, background, card, sobre)
- Qual o nicho do cliente?
- Qual o tom visual do site? (sóbrio, vibrante, clean, bold)
- A imagem precisa ter pessoas? Objetos? Paisagem? Abstrato?
- Qual o formato ideal? (landscape 16:9, square, portrait)

**2. Gerar o prompt otimizado:**
- Descrever a cena com detalhes específicos (iluminação, ângulo, cores, atmosfera)
- Incluir estilo fotográfico (editorial, commercial, cinematic, minimal)
- Especificar o que NÃO quer (evitar texto, logos, mãos deformadas)
- Adaptar o prompt ao gerador (Freepik, MidJourney, DALL-E — cada um tem sintaxe diferente)

**3. Estrutura padrão do prompt:**
```
[Estilo fotográfico], [cena principal], [detalhes de composição],
[iluminação], [paleta de cores], [atmosfera/mood],
[formato/aspecto], --no [elementos indesejados]
```

**Exemplo por nicho:**

| Nicho | Prompt base |
|-------|-------------|
| Advocacia | "Editorial photography, modern law office interior, dark wood and glass, soft warm lighting, muted green and cream tones, professional atmosphere, 16:9 --no text logos people" |
| Restaurante | "Food photography, overhead shot of artisan dishes on rustic table, natural daylight, warm earth tones, inviting atmosphere, 16:9 --no text logos hands" |
| Barbearia | "Commercial photography, premium barbershop interior, leather chairs, moody lighting, black and gold accents, masculine atmosphere, 16:9 --no text logos" |
| Clínica | "Medical photography, bright modern clinic reception, white and soft blue, abundant natural light, welcoming clean atmosphere, 16:9 --no text logos people" |

**4. Após gerar:**
- O usuário gera no Freepik/MidJourney/outro e envia o arquivo
- O arquivo é otimizado automaticamente pelo Next.js (WebP/AVIF, resize)
- Se precisar de upscale, o usuário faz no gerador antes de enviar

**Como acionar:**
```
"Preciso de uma imagem pra [seção] do site do [cliente]. Nicho: [nicho]. Tom: [visual]. Me gera o prompt."
```

---

## OTIMIZAÇÃO DE IMAGENS

Todas as imagens devem ser otimizadas antes/durante o deploy:

- **Next.js Image component** — SEMPRE usar `<Image>` ao invés de `<img>` para imagens de conteúdo
- **Formatos**: Next.js converte automaticamente pra WebP/AVIF
- **Sizes**: definir width/height reais pra evitar layout shift
- **Priority**: usar `priority` na logo e hero image (LCP)
- **Lazy loading**: automático em todas as outras imagens
- **Background images**: usar CSS com WebP quando possível
- **Imagens do cliente**: se forem pesadas, comprimir antes de subir (TinyPNG, Squoosh)

---

## PADRÕES DE DESIGN (aprendidos na prática)

**Grid e alinhamento (CRÍTICO — depende da track):**

| | Track 1 (Next.js) | Track 2 (Elementor) |
|---|---|---|
| Container desktop | `max-w-[1220px]` (padrão `assets-devweb`) | `max-w-[1280px]` |
| Padding lateral desktop | `px-6` (24px) | `px-6` (24px) |
| Padding lateral mobile | `px-4` (16px) | `px-4` (16px) |
| Formato completo | `max-w-[1220px] mx-auto px-4 md:px-6` | `max-w-[1280px] mx-auto px-4 md:px-6` |

**Espaçamento entre seções (CRÍTICO — depende da track):**

| | Track 1 (Next.js) | Track 2 (Elementor) |
|---|---|---|
| Padding vertical | `pt-16 sm:pt-24 pb-16 sm:pb-24` (mais respiro) | `py-12 md:py-16` MÁX (mais denso) |
| Header → conteúdo | `mb-8` MÁX | `mb-8` MÁX |

Em ambas as tracks: NUNCA criar espaços enormes entre seções. O scroll deve ser contínuo e fluido. Sem `py-32`/`py-40`.

**Hierarquia tag → título → subtítulo (CRÍTICO):**
- Tag (uppercase, tracking-wide, text-xs, cor accent): `mb-3`
- Título (h2, font-bold, branco): `mb-3`
- Subtítulo (text-sm/base, white/40): `mb-8`
- Sempre nessa ordem. Sempre com esses espaçamentos. Sem exceção

**Palavras viúvas & measure de leitura — NUNCA quebrar (CRÍTICO):**

*Headlines (h1/h2/h3):*
- `text-wrap: balance` em TODOS (Tailwind: `text-balance`)
- Se `balance` não resolver, ajustar o texto ou usar `<br />` manual
- Uma palavra sozinha na última linha é INACEITÁVEL
- Revisar TODA headline antes de entregar

*Parágrafos de corpo:*
- `text-wrap: pretty` em TODOS os `<p>` longos (Tailwind: `text-pretty`). Pretty rebalanceia as últimas 4 linhas sem afetar performance — diferente de `balance` que recalcula tudo
- **Cap em 65–75 caracteres por linha** — usar `max-width: 65ch` (ou `max-w-[65ch]`/`max-w-prose` no Tailwind). Linha de 100+ char cansa o olho, o leitor pula
- Bullets e listas: mesma regra de measure
- Em layout 2 colunas no desktop, cada coluna já fica naturalmente dentro de 65ch — não precisa cap extra

*Exemplo CSS pra colar uma vez:*
```css
h1, h2, h3 { text-wrap: balance; }
p, li     { text-wrap: pretty; max-width: 65ch; }
```

**Consistência de arredondamento:**
- `rounded-lg` — cards, containers, seções
- `rounded-md` — badges, tags, botões inline, inputs
- `rounded-full` — botões pill (animated), avatares, dots decorativos
- `rounded` (4px) — micro badges tipo kbd
- Definir UM padrão no início e aplicar em tudo. Zero inconsistência

**Cores e identidade:**
- NUNCA mudar a identidade visual do cliente — usar as cores DELE
- Cor accent só como destaque pontual — tags, links, hover
- Títulos e corpo em BRANCO (white, white/80, white/50, white/30) pra hierarquia
- Estrelas de avaliação em amarelo (como Google), não na cor da marca
- Não pintar tudo de accent — causa monotonia visual

---

## SISTEMA DE COR (regra prática)

**1. Tinted neutrals — nunca `#000`/`#fff` puro.** Preto e branco sem tinta são tells de IA e parecem "default do navegador". Sempre tingir levemente pro hue da marca da pra cohesão subconsciente:

| Uso | Errado | Certo (marca roxa) | Certo (marca verde) |
|-----|--------|--------------------|---------------------|
| Background dark | `#000000` | `#0a0712` | `#0a120c` |
| Background light | `#ffffff` | `#fbfaff` | `#fafbf9` |
| Texto sobre dark | `#ffffff` | `#f3eeff` | `#eef5f0` |
| Texto sobre light | `#000000` | `#1a1424` | `#142016` |

Regra: pegar o **hue da marca** e mover ~2–4% de chroma na direção dele. O olho não percebe a tinta sozinha, mas percebe a falta dela quando as cores brigam.

**2. 60-30-10 — peso visual, não pixel.** A página inteira respira em 3 níveis:

- **60% neutro** — backgrounds, espaço negativo, textos secundários
- **30% secundária** — superfícies, cards, bordas, texto principal
- **10% accent** — CTAs, tags, links, hover, dots decorativos, destaques pontuais

Quando o accent passa de 10%, ele para de ser destaque e vira ruído. Reler a seção que parece monótona e checar se o accent não tomou 30%+.

**3. Reduce chroma nos extremos.** Quanto mais próximo de branco ou preto, menos saturada a cor precisa ser. Cor super-saturada em superfície clara (ou borda muito viva no escuro) parece tela de festa-junina. Em hex: tons claros vão pra `#f5f3ff` (não `#e0d4ff`); tons escuros vão pra `#1a1424` (não `#3d1a8a`).

**4. Como derivar a paleta inteira do hex da marca:**

```
brand: #8645ff (accent, ~10% da página)
↓ derivar tinted neutrals
bg-dark:    #0a0712  (brand hue + L ~3%)
bg-elev:    #1a1424  (brand hue + L ~10%, surface)
border:     rgba(134, 69, 255, 0.18)  (brand alpha)
text-primary:   #f3eeff  (brand hue + L ~96%)
text-secondary: #cebfe8  (brand hue + L ~80%)
text-mute:      #9c97ad  (brand hue + L ~60%, baixo chroma)
```

Esse padrão é o que está no `menu-atendly.html` — replicável pra qualquer cor de marca trocando o hex de partida.

---

## SISTEMA DE MOTION (3 regras)

**1. Durações — regra 100/300/500.** Cada faixa serve uma função, não escolher no chute:

| Faixa | Quando |
|-------|--------|
| `100–150ms` | Feedback instantâneo: hover, toggle, focus, press. Abaixo de 80ms o olho não percebe, acima de 150ms parece preguiçoso |
| `200–300ms` | Mudança de estado: accordion abre, dropdown aparece, tooltip, mudança de tab |
| `300–500ms` | Layout shift: cards reorganizando, modal entrando, painel mobile abrindo |
| `500–800ms` | Entrada de página: hero animando, loader saindo, primeira vez que algo aparece |

**Saída = ~75% da entrada.** Se entrou em `400ms`, sai em `300ms`. Saídas lentas parecem travadas.

**2. Easing — banir `ease` genérico.** O `ease` padrão do CSS é compromisso fraco. Sempre escolher curva com intenção:

```css
/* Entrada (acelera, depois desacelera) — natural */
--ease-out: cubic-bezier(.16, 1, .3, 1);    /* "quint-out" — premium, usado no menu-atendly */
--ease-out-soft: cubic-bezier(.4, 0, .2, 1);  /* "quart-out" — material padrão */

/* Saída (sai rápido) */
--ease-in: cubic-bezier(.7, 0, .84, 0);

/* Movimento de A pra B com volta natural */
--ease-in-out: cubic-bezier(.65, 0, .35, 1);
```

**NUNCA usar:** `ease`, `ease-in-out` default do browser, `bounce` (data dos anos 2010), `elastic` (mesmo motivo).

**3. Respeitar `prefers-reduced-motion` — sempre.** ~35% de adultos acima de 40 ativam isso. Não respeitar = AVC visual + acessibilidade quebrada:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Colar isso uma vez no `globals.css` (Next.js) ou no `<style>` do bloco Elementor resolve.

**4. Stagger — sem exagerar.** Animação em cascata (cards entrando um após o outro) bate o limite em `~400ms total`. Acima disso, o último card parece preguiçoso. Fórmula: `delay = 30–60ms × index`, cap em 6 items.

**5. Padrões de animação validados (Track 1 — componentes em `assets-devweb`).** Cinco padrões prontos, replicáveis. Não inventar do zero — usar e parametrizar.

| Padrão | Onde mora | Como funciona |
|---|---|---|
| **Reveal de entrada** | `components/Reveal.tsx` | Wrapper `whileInView` com `opacity 0→1` + `y 22→0`, `once: true`. Envolver qualquer bloco: `<Reveal delay={0.1}>…</Reveal>` |
| **Loader cortina** | `components/Loader.tsx` | Tela de abertura: nome + barra de progresso → cortina sobe. Montar no `layout.tsx`. Hero anima em cascata com delays `~1.75s–2.2s` sincronizado com a saída da cortina |
| **Scroll-paint** | `components/Etica.tsx` | Texto grande preenchendo de cor conforme o scroll (`useScroll` + `useTransform` de opacidade por palavra), fundo escuro. Quebra visual forte de meio de página |
| **Colunas infinitas** | `components/ui/testimonials-columns.tsx` + `Depoimentos.tsx` | 3 colunas de depoimentos rolando em loop com `motion` `translateY`, velocidades diferentes por coluna, máscara de fade no topo/fundo |
| **Accordion altura animada** | `components/FAQ.tsx` (base `ui/accordion.tsx`) | `AnimatePresence` + `height: auto`. **NUNCA** usar `<details>` nativo — abre sem animação |

Esses 5 substituem qualquer ímpeto de "fazer uma animação custom". Se o efeito desejado não bate com nenhum, parar e perguntar antes de inventar.

---

## COGNITIVE LOAD — Regra dos ≤4

Memória de trabalho humana segura ~4 itens simultâneos. Acima disso, o lead pula, erra, ou some. Aplicar como teto rígido em cada seção do site:

| Elemento | Teto |
|----------|------|
| Itens no menu de nav | **≤ 5** (acima de 5 vira "lista", lead não escaneia) |
| Cards lado a lado num grid | **≤ 4** por linha. Se tiver mais, quebra em 2 linhas — não enfia 5/6 numa só |
| Planos de preço | **3** (nunca 4 — força paralisia de decisão. Validado: Atendly tem 3 planos) |
| CTAs primários visíveis ao mesmo tempo | **1** por viewport. Pode ter CTA secundário (link/outline) ao lado, mas o "principal" é UM |
| Campos de formulário visíveis sem quebra | **≤ 4** antes de divider ou step seguinte |
| Bullets numa lista de benefícios | **≤ 5** (se tiver mais, agrupa em categorias) |
| Logos de "clientes que confiam" | **5 ou 6** (linha cheia) — acima disso vira ruído |

**Quando estourar o teto, opções (nessa ordem):**
1. Cortar o item menos importante
2. Agrupar em categoria (3 grupos > 9 itens soltos)
3. Progressive disclosure (mostra 3, "ver mais" expande)
4. Quebrar em seções diferentes da página

Esta regra resolve metade das brigas com cliente que quer "adicionar mais um plano" ou "colocar todos os 12 serviços no menu". Mostrar o número como restrição técnica, não preferência.

**Responsivo (mobile-first):**
- Textos: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Padding containers: `px-4 md:px-6`
- Padding seções: `py-12 md:py-16`
- Gaps: `gap-4 sm:gap-6 md:gap-8`
- Imagens: altura responsiva `h-48 sm:h-56 md:h-64`
- Animações de hover: só no `md:` pra cima (mobile não tem hover)
- Botões animados: menores no mobile, animação só no desktop
- Testar em 375px (iPhone) ANTES de entregar

---

## COMO USAR ESTA SKILL

### Preview de venda (tem site):
```
"O lead [nome] tem o site [URL]. Ramo: [nicho]. Cria o preview de redesign e a copy de venda."
```

### Preview de venda (não tem site):
```
"O lead [nome] é um [nicho] em [cidade]. Não tem site. Cria o preview e a copy de venda."
```

### Desenvolvimento completo (pós-fechamento):
```
"O cliente [nome] fechou. Aqui está o briefing: [dados]. Desenvolve o site completo."
```
