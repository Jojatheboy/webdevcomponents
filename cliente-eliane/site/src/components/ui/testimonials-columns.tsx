"use client";

import React from "react";
import { motion } from "framer-motion";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  initial: string;
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {props.testimonials.map(({ text, name, role, initial }, i) => (
              <div
                key={i}
                className="w-full rounded-lg p-7"
                style={{
                  maxWidth: 330,
                  background: "#ffffff",
                  border: "1px solid var(--marketing-border)",
                  boxShadow: "0 12px 32px -22px rgba(37,33,22,0.3)",
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "var(--marketing-copy)",
                  }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <div
                    className="flex shrink-0 items-center justify-center rounded-full"
                    style={{
                      width: 38,
                      height: 38,
                      background: "rgba(139,34,82,0.10)",
                      color: "var(--c-warm-accent)",
                      fontFamily: "var(--font-instrument)",
                      fontStyle: "italic",
                      fontSize: 17,
                    }}
                  >
                    {initial}
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "var(--font-instrument)",
                        fontSize: 17,
                        color: "var(--marketing-heading)",
                        lineHeight: 1.2,
                      }}
                    >
                      {name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "var(--marketing-copy-soft)",
                        marginTop: 2,
                      }}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
