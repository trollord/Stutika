"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

import { legalNav, nav, site } from "@/lib/content";
import { useBodyLock } from "@/lib/hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const still = useReducedMotion();
  useBodyLock(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      id="site-menu"
      className="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      animate={still ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      exit={still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.72, ease: EASE }}
    >
      <div className="menu__grid">
        <nav aria-label="All pages">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={still ? false : { y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.16 + i * 0.055, ease: EASE }}
            >
              <Link
                href={item.href}
                className="menu__link"
                data-current={pathname === item.href}
                onClick={onClose}
              >
                <span className="menu__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="stack"
          style={{ gap: 30 }}
          initial={still ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
        >
          <div className="stack" style={{ gap: 12 }}>
            <span className="u-label">Office</span>
            <address
              style={{
                fontStyle: "normal",
                fontSize: "0.875rem",
                lineHeight: 1.85,
                color: "var(--snow-soft)",
              }}
            >
              {site.address.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="stack" style={{ gap: 12 }}>
            <span className="u-label">Contact</span>
            <a
              href={`mailto:${site.email}`}
              style={{ fontSize: "0.875rem", color: "var(--snow)" }}
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              style={{ fontSize: "0.875rem", color: "var(--snow-soft)" }}
            >
              {site.phone}
            </a>
          </div>

          <div className="stack" style={{ gap: 10 }}>
            <span className="u-label">Legal</span>
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--snow-soft)",
                }}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
