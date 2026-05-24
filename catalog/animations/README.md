# Animations

Components de animação plug-and-play. Todos respeitam `prefers-reduced-motion`.

---

## BlurText

Animação word-by-word com blur(10px→0) + opacity + slide. Trigger via IntersectionObserver.

```tsx
import BlurText from "@/components/ui/BlurText";

<BlurText
  as="h2"
  text="28 anos construindo no litoral de SC."
  animateBy="words"
  direction="top"
  delay={90}
  stepDuration={0.4}
  className="font-[var(--font-display)] text-5xl"
/>
```

**Props:** `text`, `as` (h1-h4, p, span, div), `animateBy` (`words`|`letters`), `direction` (`top`|`bottom`), `delay`, `stepDuration`, `threshold`, `onAnimationComplete`.

---

## CountUp

Contador animado 0→valor com easeOutCubic. Trigger inView, formato pt-BR.

```tsx
import CountUp from "@/components/ui/CountUp";

<CountUp to={212} duration={1.8} delay={0.2} />        // 0 → 212
<CountUp to={25} suffix=" mil" duration={1.6} />       // 0 → 25 mil
<CountUp to={28} suffix="+" prefix="Há " />            // Há 0+ → Há 28+
```

**Props:** `to` (number), `prefix?`, `suffix?`, `duration?` (s), `delay?` (s), `locale?` (default `pt-BR`).

---

## MetallicText

Gradiente metálico via `background-clip: text`. Pra palavras-chave em destaque.

```tsx
import MetallicText from "@/components/ui/MetallicText";

// fundo escuro (default — branco/prateado)
<MetallicText>histórias</MetallicText>

// fundo claro (azul ABDO escuro → médio → accent)
<MetallicText variant="dark" italic={false}>
  <CountUp to={28} suffix="+" />
</MetallicText>
```

**Props:** `variant` (`"light"`|`"dark"`), `italic` (default `true`), `children`, `className`.

**Regras de ouro:** usar com parcimônia — 1 palavra por headline, no máximo 2.

---

## GradualBlur

Overlay de blur progressivo multi-camada. Mascarado por gradient pra efeito de fade-blur.

```tsx
import GradualBlur from "@/components/ui/GradualBlur";

// fixed bottom da viewport (acompanha scroll)
<GradualBlur
  target="page"
  position="bottom"
  height="6rem"
  strength={2}
  divCount={6}
  curve="bezier"
  exponential
/>

// dentro de um parent (overlay no rodapé de uma section)
<section className="relative overflow-hidden">
  {/* conteúdo */}
  <GradualBlur target="parent" position="bottom" preset="footer" />
</section>
```

**Props principais:** `target` (`"parent"`|`"page"`), `position` (`top`|`bottom`|`left`|`right`), `strength`, `divCount`, `curve` (`linear`|`bezier`|`ease-in`|`ease-out`|`ease-in-out`), `exponential`, `preset`.

**Presets:** `top`, `bottom`, `left`, `right`, `subtle`, `intense`, `smooth`, `sharp`, `header`, `footer`, `sidebar`, `page-header`, `page-footer`.

**Importante:** copiar **`GradualBlur.css`** junto.

---

## Loader

Cortina fullscreen com logo centralizado + barra animada. Sobe como cortina ao terminar.

```tsx
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <Loader>
      {/* conteúdo da página */}
    </Loader>
  );
}
```

**Configurar dentro do component:**
- Path do logo: linha do `<Image src="...">`
- Duração: `setTimeout(() => setLoading(false), 1900)` — 1.9s
- Duração da cortina subindo: `transition={{ duration: 0.95 }}`
- Microcopy: `"Construindo desde 1997"`

**Sem props.** Trava `body overflow` enquanto carrega, libera ao terminar.

---

## Reveal

Wrapper de entrada simples. Usar pra animar qualquer bloco.

```tsx
import { Reveal } from "@/components/Reveal";

<Reveal>
  <h2>Título</h2>
</Reveal>

<Reveal delay={0.15} y={32}>
  <Card />
</Reveal>
```

**Props:** `delay?` (s), `y?` (px de slide-up, default 22), `className?`, `style?`.

**O que faz:** `opacity 0→1` + `y from→0`, viewport `once: true` margin `-60px`, duração 0.7s easing `[0.16, 1, 0.3, 1]`.
