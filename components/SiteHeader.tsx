"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { nav } from "@/lib/content";
import { useScrolled, useToneAt } from "@/lib/hooks";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Wordmark } from "@/components/Wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled(10);
  const bandTone = useToneAt(30);
  // The open flag is stamped with the route it was opened on, so a navigation
  // closes the overlay by derivation rather than by an effect.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const open = menu.open && menu.path === pathname;
  const setOpen = (value: boolean) => setMenu({ open: value, path: pathname });

  // The overlay is always dark, so the header inverts while it is open.
  const tone = open ? "dark" : bandTone;
  const dark = tone === "dark";

  return (
    <>
      <header
        className="hdr"
        data-stuck={scrolled && !open}
        style={
          {
            "--hdr-fg": dark ? "var(--snow)" : "var(--ink)",
            "--hdr-bg": dark ? "var(--slate)" : "var(--paper)",
          } as React.CSSProperties
        }
      >
        <div className="hdr__inner">
          <Wordmark />

          <nav className="hdr__nav" aria-label="Primary">
            {nav.slice(1, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hdr__link"
                data-current={pathname === item.href}
              >
                {item.label}
              </Link>
            ))}
            <span className="hdr__divider" aria-hidden="true" />
            <Link
              href="/contact"
              className="hdr__link"
              data-current={pathname === "/contact"}
            >
              Enquire
            </Link>
          </nav>

          <button
            type="button"
            className="menu-btn"
            data-open={open}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
            <span className="menu-btn__bars" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="sr-only">
              {open ? "Close navigation" : "Open navigation"}
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? <MenuOverlay onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
