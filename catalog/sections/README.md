# Sections

Components que estruturam blocos de uma seção (não são a seção inteira, são peças).

---

## SectionTag

Marca o início de cada seção com hierarquia visual consistente: dot accent + número padded + label.

```tsx
import SectionTag from "@/components/ui/SectionTag";

<SectionTag number={1} tone="light" className="mb-4">
  A Construtora
</SectionTag>

// Em seção dark
<SectionTag number={2} tone="dark">
  A Cidade
</SectionTag>

// Sem número (decoração)
<SectionTag tone="light">
  Em destaque · Pronto pra morar
</SectionTag>
```

**Props:** `number?` (0-99, vira "01" "02" etc), `children`, `tone` (`light`|`dark`), `className`.

**Layout final:** `● 01 ─ A CONSTRUTORA` (dot · número · divider · label uppercase tracking)

---

## StatMocks

4 mini-mocks SVG inline (~120x40 cada) com animações CSS-only. Pra usar como detalhe decorativo abaixo de stats numéricos.

```tsx
import {
  TimelineMock,
  SkylineMock,
  WindowsGridMock,
  RulerMock,
} from "@/components/ui/StatMocks";

const stats = [
  { value: "28+", label: "anos", Mock: TimelineMock },
  { value: "8",   label: "empreendimentos", Mock: SkylineMock },
  { value: "212", label: "unidades", Mock: WindowsGridMock },
  { value: "25 mil", label: "m²", Mock: RulerMock },
];

{stats.map((s) => (
  <div>
    <CountUp to={...} />
    <p>{s.label}</p>
    <s.Mock />
  </div>
))}
```

**Mocks disponíveis:**

| Mock | Visual | Pra qual stat |
|---|---|---|
| `TimelineMock` | Linha horizontal com 4 dots + 2 labels de anos | Anos de mercado / tempo |
| `SkylineMock` | 8 prédios em silhueta com 1 destacado | Quantidade de empreendimentos |
| `WindowsGridMock` | Grid 28x8 de janelinhas com 212 acesas | Quantidade de unidades |
| `RulerMock` | Barra horizontal preenchendo + ticks + labels 0 e 25k m² | Área construída |

**Animações:** desenho com `stroke-dasharray` (linhas), `transform: scaleY/scaleX` (prédios, barra), `opacity` (dots de timeline, janelas), stagger por nth-child.

**Tokens CSS:** `--accent`, e cor mute hardcoded `rgba(31,58,138,0.18)` (azul ABDO — trocar pra outras paletas).
