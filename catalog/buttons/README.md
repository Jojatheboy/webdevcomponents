# SubtleButton

Pill com microanimações sutis: shimmer atravessando, dot animado lateral, scale hover.

## Como usar

```tsx
import SubtleButton from "@/components/ui/SubtleButton";
import { IconBrandWhatsapp } from "@tabler/icons-react";

// Primary (preenchido)
<SubtleButton href="https://wa.me/..." variant="primary">
  <IconBrandWhatsapp className="size-4 relative z-10" />
  Falar no WhatsApp
</SubtleButton>

// Secondary (outline, sem dot)
<SubtleButton href="tel:+..." variant="secondary" hideDot>
  (47) 3349-3811
</SubtleButton>

// Como botão (com onClick)
<SubtleButton onClick={() => doSomething()} variant="primary">
  Enviar
</SubtleButton>
```

## Props

| Prop | Tipo | Default |
|---|---|---|
| `variant` | `"primary"` \| `"secondary"` | `"primary"` |
| `href` | string | — (vira `<button>`) |
| `onClick` | function | — |
| `target` | `"_blank"` \| `"_self"` | auto-detect |
| `hideDot` | boolean | `false` |
| `className` | string | — |
| `children` | ReactNode | — |

## Variants

- **primary**: `bg-foreground text-white` → hover `bg-accent`. Dot branco.
- **secondary**: `border + bg-transparent text-foreground` → hover `bg-foreground/[0.04]`. Dot accent.

## Tokens CSS necessários

`--foreground`, `--accent`, `--accent-dark`, `--border-strong`, `--background`

## Detalhes técnicos

- **`whitespace-nowrap`** no label — evita quebra do tipo "Falar no\nWhatsApp"
- **`inline-flex items-center`** no span do label — ícones e texto ficam lado a lado (NÃO quebram)
- **Shimmer** via `before` pseudo-element com gradient via white/15 deslizando 700ms no hover
- **Dot ping** com `animationDuration: "1.8s"` no hover
