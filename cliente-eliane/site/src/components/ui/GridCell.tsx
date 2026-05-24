"use client";

import React from "react";
import { OrganicBorder } from "./OrganicBorder";

/**
 * Runner.now-style decorative grid cell (30x30px numbered box).
 * Used on the edges of content sections for visual rhythm.
 */

type BorderLine = "top" | "bottom" | "left" | "right";

interface GridCellProps {
  label?: string;
  width?: number;
  height?: number;
  borders?: BorderLine[];
  className?: string;
}

export function GridCell({
  label,
  width = 30,
  height = 30,
  borders = ["top", "right", "bottom"],
  className = "",
}: GridCellProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <OrganicBorder lines={borders} />
      {label && (
        <span
          className="absolute inset-0 flex items-center justify-center text-[10px]"
          style={{
            fontFamily: "var(--font-geist-mono)",
            color: "var(--eyebrow)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
