"use client";

import {
  motion,
  type Easing,
  type TargetAndTransition,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  type CSSProperties,
} from "react";

type Direction = "top" | "bottom";
type AnimateBy = "words" | "letters";
type TagName = "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";

type Snapshot = {
  filter?: string;
  opacity?: number;
  y?: number;
  x?: number;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: TagName;
  style?: CSSProperties;
}

const buildKeyframes = (
  from: Snapshot,
  steps: Snapshot[]
): TargetAndTransition => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    const fromVal = (from as Record<string, string | number | undefined>)[k];
    const stepVals = steps
      .map((s) => (s as Record<string, string | number | undefined>)[k])
      .filter((v): v is string | number => v !== undefined);
    const arr: Array<string | number> = [];
    if (fromVal !== undefined) arr.push(fromVal);
    arr.push(...stepVals);
    keyframes[k] = arr;
  });
  return keyframes as unknown as TargetAndTransition;
};

const MotionByTag = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  span: motion.span,
  div: motion.div,
} as const;

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p",
  style,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom: Snapshot = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo: Snapshot[] = useMemo(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const MotionTag = MotionByTag[as];

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLParagraphElement & HTMLHeadingElement & HTMLDivElement & HTMLSpanElement>}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", ...style }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: {
          duration: number;
          times: number[];
          delay: number;
          ease?: Easing | Easing[];
        } = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        };
        if (easing) spanTransition.ease = easing;

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot as TargetAndTransition}
            animate={inView ? animateKeyframes : (fromSnapshot as TargetAndTransition)}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? " " : segment}
            {animateBy === "words" &&
              index < elements.length - 1 &&
              " "}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
