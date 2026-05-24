# FloatingContact

Badge flutuante no canto inferior direito que expande em painel "Fale conosco" no hover (desktop) ou tap (mobile).

## Preview visual

```
                                         ┌─────────────────────┐
                                         │ Fale conosco        │
                                         │ Como podemos ajudar?│
                                         │ ─────────────────── │
                                         │ 🟢 WhatsApp         │
                                         │ 📞 (47) 3349-3811   │
                                         │ ─────────────────── │
                                         │ 🕐 Seg–sex · 08h–18h│
                                         └─────────────────────┘
                                                  ▲
                          ┌────────────────────┐  │
                          │ 💬 Fale conosco  ● │  ← badge flutuante (sobe-desce)
                          └────────────────────┘
```

## Como usar

```tsx
import FloatingContact from "@/components/FloatingContact";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <FloatingContact />
    </>
  );
}
```

Sem props. Configurar telefone/WhatsApp **no arquivo do component** (`href="https://wa.me/..."` e `href="tel:..."`).

## Stack

- framer-motion (animação + AnimatePresence)
- lucide-react (Phone, Clock, MessageCircle, X)
- @tabler/icons-react (IconBrandWhatsapp)

## Tokens CSS necessários

`--background`, `--foreground`, `--surface`, `--accent`, `--border-strong`, `--border-subtle`, `--foreground-mute`, `--font-display`

## Knobs

| Knob | Onde | Default |
|---|---|---|
| Posição | `className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6"` | bottom-right |
| Z-index | `z-[1200]` | acima do GradualBlur (1100) |
| Largura do painel | `w-[300px]` | 300px |
| Duração float | `transition={{ duration: 3 }}` | 3s loop |
| Amplitude float | `animate={{ y: [0, -6, 0] }}` | -6px |
| Duração abertura | `transition={{ duration: 0.32 }}` | 320ms |

## Decisões importantes

- **Hover desktop + tap mobile** combinado: `onMouseEnter/leave` (desktop) + `onClick` (mobile) + `mousedown` no document (fecha ao clicar fora)
- **Float pausa quando aberto**: senão o conteúdo do painel ficaria dançando junto
- **`origin-bottom-right`** no painel: scale 0.96→1 acontece a partir do botão, parece que sai DE dentro do FAB
- **2 pulsos com duração diferente** (ring 1s, dot 2.5s): defasados parecem orgânicos
- **Z-index 1200**: GradualBlur usa 1100, FAB tem que estar acima

## Nota no Obsidian

Documentação completa em `Brain 🧠/3 | ✅ Notas/🟢 Estudos/🖼️ Design/🧩 UI⁄UX Components/💙 ABDO Construtora/FloatingContact.md`
