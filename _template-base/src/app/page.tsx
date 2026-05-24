import FloatingContact from "@shared/floating-cta/FloatingContact";
import Loader from "@shared/animations/Loader";
import GradualBlur from "@shared/animations/GradualBlur";
import SectionTag from "@shared/sections/SectionTag";

/**
 * Página template — substituir/adicionar componentes específicos
 * do cliente em src/components/ e importar aqui.
 *
 * Components compartilhados ficam em catalog/ (acessível via @shared/...).
 */
export default function Home() {
  return (
    <Loader>
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-xl px-6">
          <div className="inline-flex mb-6">
            <SectionTag number={1} tone="light">
              Template Base
            </SectionTag>
          </div>
          <h1 className="font-[var(--font-hero)] text-[clamp(36px,6vw,72px)] leading-tight text-[var(--foreground)] mb-6">
            Pronto pra começar.
          </h1>
          <p className="text-[var(--foreground-soft)] text-base md:text-lg">
            Edite <code className="font-mono text-sm bg-[var(--surface)] px-2 py-1 rounded">src/app/page.tsx</code>,
            ajuste a paleta em <code className="font-mono text-sm bg-[var(--surface)] px-2 py-1 rounded">src/app/globals.css</code>,
            e adicione componentes do cliente em <code className="font-mono text-sm bg-[var(--surface)] px-2 py-1 rounded">src/components/</code>.
          </p>
          <p className="mt-6 text-xs text-[var(--foreground-mute)] font-mono">
            Components compartilhados em <code>@shared/*</code> · ver{" "}
            <a href="https://github.com/Jojatheboy/webdevcomponents/tree/main/catalog" className="text-[var(--accent)] hover:underline">
              catalog/
            </a>
          </p>
        </div>
      </main>
      <GradualBlur target="page" position="bottom" height="6rem" strength={2} divCount={6} curve="bezier" exponential opacity={1} />
      <FloatingContact />
    </Loader>
  );
}
