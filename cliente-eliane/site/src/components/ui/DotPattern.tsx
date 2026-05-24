"use client";

/**
 * Runner.now dot pattern background.
 * Exact replication: radial-gradient circles at 0.75px, 5px grid, offset 2.5px.
 */

interface DotPatternProps {
  opacity?: number;
  className?: string;
  mask?: boolean;
}

export function DotPattern({
  opacity = 1,
  className = "",
  mask = false,
}: DotPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.07) 0.75px, transparent 0.75px), radial-gradient(circle, rgba(255,255,255,0.07) 0.75px, transparent 0.75px)",
        backgroundSize: "5px 5px",
        backgroundPosition: "0 0, 2.5px 2.5px",
        opacity,
        ...(mask
          ? {
              maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            }
          : {}),
      }}
    />
  );
}
