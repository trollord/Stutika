"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  p: motion.p,
} as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof TAGS;
};

/** Fade-and-rise on first entry into the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
}: RevealProps) {
  const still = useReducedMotion();
  const Tag = TAGS[as];

  return (
    <Tag
      // `reveal` is the hook the <noscript> stylesheet uses to un-hide these.
      className={["reveal", className ?? ""].filter(Boolean).join(" ")}
      initial={still ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** A hairline that draws itself in from the left as it enters view. */
export function RuleReveal({
  className = "sec-head__rule",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const still = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`reveal ${className}`}
      style={{ display: "block" }}
      initial={still ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: EASE }}
    />
  );
}

/**
 * Splits a heading into lines and lifts each one out from behind a mask.
 * Lines are supplied explicitly so the break points stay art-directed.
 */
export function LineReveal({
  lines,
  className,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  const still = useReducedMotion();

  return (
    <span className={className} style={{ display: "block" }}>
      {lines.map((line, i) => (
        <span
          key={line + i}
          className="reveal"
          style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}
        >
          <motion.span
            style={{ display: "block" }}
            initial={still ? false : { y: "108%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.05,
              delay: delay + i * 0.09,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
