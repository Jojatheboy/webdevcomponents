# Relatório de Melhorias — Folchini & Risso Advogados

## Site Atual
**URL:** www.folchinierissoadvocacia.com.br
**Plataforma:** WordPress + Elementor + WP Rocket
**Avaliações Google:** 5.0 (116 avaliações)

---

## Problemas Identificados

### 1. Performance e Tecnologia
- **Stack pesada:** WordPress + Elementor + jQuery + Swiper + Font Awesome + WP Rocket + múltiplos scripts de terceiros
- **6 famílias de fontes** carregadas simultaneamente (Roboto, Roboto Slab, Raleway, Playfair, Montserrat, Inter) — provavelmente usa 2-3
- **Google Tag Manager duplicado** (GTM-TFSNKX8 e GTM-KNVLF8Q) — conflito e peso desnecessário
- **3 sistemas de analytics redundantes:** Google Analytics + Clicky + GTM — um basta
- **Scripts de lazy load pesados** do WP Rocket adicionam complexidade ao invés de resolver

**Impacto:** Site lento para carregar, especialmente no mobile. Visitantes saem antes de ver o conteúdo.

### 2. Design e Layout
- **Hero escura demais** — imagem de fundo com pouco contraste, dificulta leitura imediata da proposta de valor
- **Layout genérico de template Elementor** — estrutura previsível que qualquer escritório poderia ter
- **Carousel de serviços** esconde informações importantes — o visitante precisa clicar pra ver todos os serviços
- **Cards de casos na mídia** sem padrão visual — imagens de tamanhos diferentes, descrições cortadas, visual poluído
- **Seção "Por que escolher"** usa imagem de banco (biblioteca genérica) ao lado do texto — não transmite autenticidade
- **Depoimentos** via widget TrustIndex externo — visual inconsistente com o resto do site, carregamento adicional
- **Seção equipe** com textos corridos demais sem hierarquia — difícil escanear rapidamente
- **Footer básico** sem presença — não fecha o site com autoridade

**Impacto:** O site não transmite o nível de sofisticação que um escritório que atua no STJ/STF deveria ter. Parece genérico.

### 3. Copy e Conversão
- **Headline funcional mas não impactante** — "Defesa Criminal Estratégica Para Proteger Sua Liberdade e Seu Futuro" é correto mas não diferencia
- **CTAs repetitivos** — "SOLICITE UMA ANÁLISE DO SEU CASO" aparece idêntico em vários pontos sem variação
- **Sem números de destaque visíveis** na hero — as 116 avaliações, operações, atuação nacional ficam escondidas nas seções abaixo
- **Textos muito longos** nas descrições dos sócios — visitante não lê parágrafos enormes

**Impacto:** O visitante não entende em 5 segundos por que esse escritório é diferente dos outros.

### 4. SEO
- **Title tag:** "Folchini & Risso Advogados - Dr. Felipe Folchini" — não inclui palavras-chave como "advogado criminalista" ou "defesa criminal"
- **Meta description** cortada e sem CTA — começa com o texto da página ao invés de ser otimizada
- **OG Image** é o logo em fundo transparente — não funciona bem em compartilhamentos

**Impacto:** Perde posicionamento no Google para buscas como "advogado criminalista Balneário Camboriú".

---

## Melhorias Aplicadas no Redesign

### 1. Performance
| Item | Antes | Depois |
|------|-------|--------|
| Plataforma | WordPress + Elementor (pesado) | Next.js estático (ultra rápido) |
| Fontes | 6 famílias | 2 famílias (Playfair Display + Inter) |
| Imagens | JPG/PNG sem otimização | WebP/AVIF automático via Next.js Image |
| Scripts | jQuery + Swiper + WP Rocket + GTM x2 + Clicky + GA | Zero dependências pesadas, Framer Motion otimizado |
| Analytics | 3 sistemas redundantes | 1 configuração limpa |
| Carregamento | Múltiplos scripts bloqueantes | Static generation, sem servidor |

### 2. Design
| Seção | Antes | Depois |
|-------|-------|--------|
| **Hero** | Imagem escura, texto difícil de ler | Background com imagem dos sócios + overlay + grain filter, headline com hierarquia clara, stats visíveis (116+, 8+ operações, STJ/STF) |
| **Serviços** | Carousel que esconde conteúdo | Grid com ícones Lucide + pattern SVG animado, todos os 7 serviços visíveis |
| **Diferenciais** | Texto ao lado de imagem genérica | Priority list numerada com hover effects, layout sticky |
| **Depoimentos** | Widget externo inconsistente | 3 colunas scrollando infinitamente com fotos reais do Google, estrelas amarelas |
| **Casos na mídia** | Cards despadronizados | Grid uniforme com imagens otimizadas, badges de fonte, hover sutil |
| **Equipe** | Layout básico, texto corrido | Cards iguais com foto + bio resumida + tags de especialidade |
| **Sobre** | Inexistente como seção separada | Card com foto do escritório + texto + indicadores de localização |
| **CTA Final** | Repetição do mesmo botão | Seção dedicada com shader 3D animado (Three.js) no background |
| **Footer** | Básico, sem presença | 4 colunas + efeito de texto hover "FOLCHINI" que segue o mouse |
| **Loading** | Nenhum | Loader com logo + barra de progresso animada |

### 3. Copy
| Elemento | Antes | Depois |
|----------|-------|--------|
| **Tags de seção** | Inexistentes ou texto longo | Pills compactas (1 palavra + dot indicator) |
| **Hierarquia** | Inconsistente | Tag → Título → Subtítulo em toda seção, espaçamento padronizado |
| **Stats na hero** | Escondidos nas seções abaixo | Visíveis imediatamente: 116+, 8+, 5 estados, STJ/STF |
| **CTAs** | Botões estáticos repetitivos | Botões animados (pill com icon slide) variando o texto |
| **Depoimentos** | Widget genérico | Textos reais com foto real do autor, nome e estrelas |

### 4. Técnico
| Item | Antes | Depois |
|------|-------|--------|
| **SEO Title** | "Folchini & Risso Advogados - Dr. Felipe Folchini" | "Folchini & Risso Advogados \| Defesa Criminal Estratégica" |
| **Meta Description** | Texto cortado da página | Copy otimizada com proposta de valor |
| **Responsivo** | Elementor padrão | Testado em 375px, 768px, 1440px+ com breakpoints específicos |
| **Acessibilidade** | Sem aria-labels | Botões e links com labels, hierarquia de headings correta |
| **Hospedagem** | Servidor WordPress (custo mensal) | Vercel (gratuito, CDN global, SSL automático) |

---

## Resultado

O site redesenhado posiciona a Folchini & Risso como o escritório de advocacia criminal de referência que realmente é — com visual que transmite autoridade, sofisticação e confiança, performance de carregamento superior, e uma experiência que converte visitantes em clientes.

**Preview disponível em:** [link do preview]
