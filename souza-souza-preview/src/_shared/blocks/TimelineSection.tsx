import { Reveal } from "../animations/Reveal";
import SectionTag from "../sections/SectionTag";

/* ============================================================
 *  TimelineSection — cronologia de marcos (ano + título + texto)
 *  Layout grid responsivo, dot accent à esquerda de cada item.
 * ============================================================ */

export type Milestone = {
  year: string;
  title?: string;
  body: string;
};

export interface TimelineSectionProps {
  number?: number;
  tag: string;
  headline: string;
  subtitle?: string;
  milestones: Milestone[];
  /** Variante visual: "grid" (4 cols) ou "vertical" (lista única à direita) */
  layout?: "grid" | "vertical";
  /** "light" pra fundo claro, "dark" pra fundo escuro */
  tone?: "light" | "dark";
  id?: string;
}

export default function TimelineSection({
  number,
  tag,
  headline,
  subtitle,
  milestones,
  layout = "grid",
  tone = "light",
  id = "linha-do-tempo",
}: TimelineSectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      className={`relative pt-16 sm:pt-24 pb-16 sm:pb-24 ${
        isDark ? "bg-[var(--dark-section)] text-white" : "bg-[var(--background)]"
      }`}
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <SectionTag number={number} tone={tone} className="mb-4">
                {tag}
              </SectionTag>
              <h2
                className={`font-[var(--font-display)] text-[clamp(36px,5.5vw,56px)] leading-[1.05] ${
                  isDark ? "text-white" : "text-[var(--foreground)]"
                }`}
              >
                {headline}
              </h2>
            </div>
            {subtitle && (
              <div className="lg:col-span-5">
                <p
                  className={`text-base md:text-lg max-w-[44ch] ${
                    isDark ? "text-white/80" : "text-[var(--foreground-soft)]"
                  }`}
                >
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {milestones.map((m, i) => (
              <Reveal key={m.year + i} delay={i * 0.05}>
                <article
                  className={`group relative pl-5 pt-2 pb-2 border-l-2 ${
                    isDark ? "border-white/15" : "border-[var(--border-subtle)]"
                  } hover:border-[var(--accent)] transition-colors`}
                  style={{ transitionDuration: "300ms" }}
                >
                  <span
                    className="absolute -left-[6px] top-3 w-2.5 h-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--background)]"
                    style={{
                      boxShadow: isDark ? "0 0 0 4px var(--dark-section)" : undefined,
                    }}
                  />
                  <p
                    className={`font-[var(--font-hero)] text-3xl md:text-4xl leading-none mb-3 ${
                      isDark ? "text-white" : "text-[var(--foreground)]"
                    }`}
                  >
                    {m.year}
                  </p>
                  {m.title && (
                    <h3
                      className={`text-base font-medium mb-2 leading-tight ${
                        isDark ? "text-white" : "text-[var(--foreground)]"
                      }`}
                    >
                      {m.title}
                    </h3>
                  )}
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-white/65" : "text-[var(--foreground-soft)]"
                    }`}
                  >
                    {m.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-20">
            <div />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year + i} delay={i * 0.06}>
                  <article
                    className={`flex gap-6 pb-10 ${
                      i < milestones.length - 1
                        ? isDark
                          ? "border-b border-white/10"
                          : "border-b border-[var(--border-subtle)]"
                        : ""
                    }`}
                  >
                    <div className="shrink-0 w-24">
                      <p
                        className={`font-[var(--font-hero)] text-3xl leading-none ${
                          isDark ? "text-white" : "text-[var(--foreground)]"
                        }`}
                      >
                        {m.year}
                      </p>
                    </div>
                    <div className="flex-1">
                      {m.title && (
                        <h3
                          className={`text-lg font-medium mb-2 ${
                            isDark ? "text-white" : "text-[var(--foreground)]"
                          }`}
                        >
                          {m.title}
                        </h3>
                      )}
                      <p
                        className={`text-base leading-relaxed max-w-[60ch] ${
                          isDark ? "text-white/75" : "text-[var(--foreground-soft)]"
                        }`}
                      >
                        {m.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
