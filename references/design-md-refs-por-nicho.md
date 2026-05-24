# DESIGN.md de Referência — por Nicho

> Biblioteca de DESIGN.md reais (extraídos do `voltagent/awesome-design-md`) pra **calibrar nível de granularidade** quando começar site novo. Abre o do nicho equivalente, olha como eles organizam tokens, e adapta — **não copia**.
>
> Nosso cliente é negócio local de R$1–2k, não Linear/Stripe. Pega o método, não a profundidade. Esses sistemas têm 13 níveis de tipografia, 8 de surface — exagero pra landing. Use como bússola pra hierarquia e nomenclatura, não como template direto.

---

## Como usar

1. Identificar nicho do cliente
2. Abrir 1-2 DESIGN.md da tabela abaixo (link `getdesign.md`)
3. Observar: como organizam tokens · paleta · hierarquia tipográfica · componentes documentados
4. Adaptar pra escala "landing one-page" usando nosso `design-md-template.md`
5. **Não importar nomenclatura deles** (`canvas`, `hairline`, `ink-muted`) — manter a nossa

---

## Por nicho

### Saúde / Clínica / Bem-estar

| Referência | Por quê |
|------------|---------|
| **Notion** — getdesign.md/notion | Limpo, acolhedor, tons suaves, tipografia editorial. Boa pra clínica/consultório |
| **Cal.com** — getdesign.md/cal | Tom amigável, calendarização clara, paleta sóbria mas humana |
| **Mintlify** — getdesign.md/mintlify | Documentação clean — referência pra páginas de procedimentos detalhados |

**Aprendizado típico:** muito espaço, paleta com 1 cromático suave + neutros, tipografia 400 confortável (não bold agressivo)

---

### Advocacia / Contabilidade / Serviços profissionais

| Referência | Por quê |
|------------|---------|
| **Stripe** — getdesign.md/stripe | Sobriedade premium, paleta restrita, tipografia editorial, tom de "instituição" |
| **Linear** — getdesign.md/linear.app | Dark mode profundo, escala tipográfica disciplinada, sem ornamentos |
| **Wise** — getdesign.md/wise | Fintech sóbria mas com personalidade |

**Aprendizado típico:** paleta de 2 cores no máximo (1 brand + neutros), tipografia com tracking negativo agressivo, zero gradiente

---

### Tech / Startup / SaaS

| Referência | Por quê |
|------------|---------|
| **Vercel** — getdesign.md/vercel | Dark canvas, escala de surface granular, tipografia Geist (combo validado nosso) |
| **Cursor** — getdesign.md/cursor | Modern dark, accent único, foco em produto |
| **Raycast** — getdesign.md/raycast | Glow controlado, gradient com intenção (não default), bento layouts |
| **Resend** — getdesign.md/resend | Minimalismo com personalidade, copy direta |

**Aprendizado típico:** dark mode bem feito, accent único cromático, screenshots de produto dominando hero, tipografia técnica (Geist/JetBrains Mono)

---

### Premium / Editorial / Luxo

| Referência | Por quê |
|------------|---------|
| **Apple** — getdesign.md/apple | Hero gigante, tipografia editorial, white space generoso, produtos como heróis |
| **Tesla** — getdesign.md/tesla | Minimalismo radical, tipografia confiante, fundo branco/preto sem ornamentos |
| **The Verge** — getdesign.md/theverge | Editorial bold, tipografia display impactante |

**Aprendizado típico:** menos é mais — produto/imagem domina, copy curta forte, tipografia display agressiva

---

### Fintech / Pagamento

| Referência | Por quê |
|------------|---------|
| **Stripe** — getdesign.md/stripe | Reference padrão do nicho — sobriedade + clareza |
| **Wise** — getdesign.md/wise | Brand verde forte com restrição, tipografia humanista |
| **Revolut** — getdesign.md/revolut | Dark mode + brand vibrante usada com cuidado |
| **Coinbase** — getdesign.md/coinbase | Confiança via tipografia + paleta sóbria |

**Aprendizado típico:** confiança via tipografia disciplinada, accent único da marca, dados numéricos bem tratados (mono pra preços)

---

### E-commerce / Varejo

| Referência | Por quê |
|------------|---------|
| **Shopify** — getdesign.md/shopify | Sistema escalável pra produto, hierarquia clara |
| **Nike** — getdesign.md/nike | Hero de produto bold, tipografia atlética, contraste forte |
| **Airbnb** — getdesign.md/airbnb | Acolhedor + escalável, paleta quente |
| **Pinterest** — getdesign.md/pinterest | Grids masonry, produto em destaque |

**Aprendizado típico:** produto domina, CTA de compra/contato sempre visível, tipografia com peso variado por contexto

---

### Restaurante / Food / Hospitalidade

| Referência | Por quê |
|------------|---------|
| **Starbucks** — getdesign.md/starbucks | Brand strong, paleta quente, imagem domina |
| **Airbnb** — getdesign.md/airbnb | Acolhedor, humano, tons terrosos |

**Aprendizado típico:** imagens grandes de comida/ambiente, paleta terrosa quente, tipografia com personalidade (display serif funciona bem)

---

### Construção / Indústria / Reforma

| Referência | Por quê |
|------------|---------|
| **HashiCorp** — getdesign.md/hashicorp | Tons neutros, industrial mas confiável |
| **IBM** — getdesign.md/ibm | Corporate sóbrio mas escalável |

**Aprendizado típico:** robusto, tons neutros (cinza/concreto/aço), tipografia técnica com peso forte, fotos de obra em destaque

---

### Automotivo / Performance

| Referência | Por quê |
|------------|---------|
| **Tesla** — getdesign.md/tesla | Minimalismo radical, produto domina |
| **Bugatti** — getdesign.md/bugatti | Luxo extremo, tipografia editorial |
| **BMW M** — getdesign.md/bmw-m | Performance + heritage, contrastes fortes |

**Aprendizado típico:** produto como hero absoluto, tipografia confiante, paleta de 2 cores no máximo

---

## Lista completa (73 sites)

Acesso direto via `getdesign.md/[slug]`:

**AI/LLM:** claude · cohere · elevenlabs · mistral.ai · minimax · ollama · replicate · runwayml · together.ai · x.ai

**Dev tools:** cursor · expo · framer · hashicorp · lovable · mintlify · opencode.ai · posthog · raycast · resend · sanity · sentry · supabase · vercel · voltagent · warp

**Backend/DB:** clickhouse · composio · mongodb

**Produtividade:** cal · linear.app · notion · slack · superhuman · zapier

**Design:** figma · framer · webflow

**Fintech:** binance · coinbase · kraken · mastercard · revolut · stripe · wise

**E-commerce:** airbnb · airtable · nike · pinterest · shopify

**Mídia:** apple · meta · spotify · theverge · wired

**Outros:** bmw · bmw-m · bugatti · clay · ferrari · ibm · intercom · lamborghini · meta · miro · nvidia · playstation · renault · spacex · starbucks · tesla · uber · vodafone

---

## O que NÃO fazer com essas referências

- ❌ Importar nomenclatura deles (`canvas`, `surface-1/2/3`, `hairline`, `ink-muted`) — manter a nossa
- ❌ Documentar 13 níveis de tipografia ou 8 de surface no DESIGN.md do cliente — escala enxuta resolve
- ❌ Copiar paleta direta (Linear lavanda `#5e6ad2` no site de advogado = fora de contexto)
- ❌ Misturar referências de nichos opostos (Tesla minimal + Pinterest grids = caos)
- ✅ Pegar **estrutura e disciplina de tokens** — esse é o ganho real
