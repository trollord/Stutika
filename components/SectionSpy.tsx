"use client";

import { useActiveSection, useToneAt } from "@/lib/hooks";

export type SpySection = { id: string; label: string };

/**
 * The fixed right-hand tick rail. Each section gets a dash; the active one
 * extends and names itself. Colour follows the band behind it.
 */
export function SectionSpy({ sections }: { sections: SpySection[] }) {
  const ids = sections.map((section) => section.id);
  const active = useActiveSection(ids);
  const tone = useToneAt(0.5); // the rail sits at the vertical centre

  return (
    <nav
      className="spy"
      aria-label="Section navigation"
      style={
        {
          "--spy-fg": tone === "dark" ? "var(--snow)" : "var(--ink)",
        } as React.CSSProperties
      }
    >
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className="spy__item"
          data-active={active === section.id}
          aria-current={active === section.id ? "true" : undefined}
          onClick={() => {
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span className="spy__name">{section.label}</span>
          <span className="spy__dash" aria-hidden="true" />
          <span className="sr-only">Go to {section.label}</span>
        </button>
      ))}
    </nav>
  );
}
