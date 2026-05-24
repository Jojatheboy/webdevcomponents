"use client";

import React from "react";

/**
 * Replicates runner.now's signature SVG dashed border with feTurbulence noise.
 * Each line gets a unique filter ID to avoid conflicts.
 *
 * Usage:
 * <OrganicBorder lines={["top", "bottom", "left", "right"]} />
 *
 * Wrap it in a relative container — this component is position:absolute inset-0.
 */

type Line = "top" | "bottom" | "left" | "right";

interface OrganicBorderProps {
  lines: Line[];
  color?: string;
  className?: string;
}

export function OrganicBorder({
  lines,
  color = "var(--border)",
  className = "",
}: OrganicBorderProps) {
  const id = React.useId().replace(/:/g, "");

  const lineElements: Record<Line, { x1: string; y1: string; x2: string; y2: string }> = {
    top:    { x1: "0",    y1: "0",    x2: "100%", y2: "0" },
    bottom: { x1: "0",    y1: "100%", x2: "100%", y2: "100%" },
    left:   { x1: "0",    y1: "0",    x2: "0",    y2: "100%" },
    right:  { x1: "100%", y1: "0",    x2: "100%", y2: "100%" },
  };

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      fill="none"
      height="100%"
      overflow="visible"
      width="100%"
    >
      <defs>
        <filter
          id={`organic-${id}`}
          filterUnits="userSpaceOnUse"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={1}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={1.5}
          />
        </filter>
      </defs>
      {lines.map((line) => {
        const coords = lineElements[line];
        return (
          <line
            key={line}
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
            fill="none"
            filter={`url(#organic-${id})`}
            stroke={color}
            strokeDasharray="3 3"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
