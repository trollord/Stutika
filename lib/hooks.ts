"use client";

import { useEffect, useState } from "react";

export type Tone = "light" | "dark";

/**
 * Reports whether the band sitting under a horizontal line at `offset` is a
 * dark one. Values of 1 or less are read as a fraction of the viewport height,
 * anything larger as pixels from the top. Drives the header and right-rail
 * colour so fixed chrome stays legible across the alternating bands.
 */
export function useToneAt(offset = 32): Tone {
  const [tone, setTone] = useState<Tone>("light");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = offset <= 1 ? window.innerHeight * offset : offset;
      const zones = document.querySelectorAll<HTMLElement>("[data-tone]");
      let next: Tone = "light";
      for (const zone of zones) {
        const rect = zone.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          const value = zone.dataset.tone;
          next = value === "dark" || value === "deep" ? "dark" : "light";
        }
      }
      setTone((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [offset]);

  return tone;
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 12): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [threshold]);

  return scrolled;
}

/**
 * Returns the id of whichever section is currently crossing the reading line.
 * Plain rect maths rather than IntersectionObserver so that the "last section
 * above the line" always wins, including for very tall or very short bands.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(sectionIds[0] ?? null);
  // Depend on the joined key so an inline array literal at the call site does
  // not re-subscribe on every render.
  const key = sectionIds.join("|");

  useEffect(() => {
    const ids = key ? key.split("|") : [];
    if (!ids.length) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.38;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      // Pin the final section once the page is scrolled to the very bottom.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];
      setActive((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return active;
}

/** Locks body scroll while `locked` is true, preserving the scrollbar gutter. */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
