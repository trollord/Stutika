"use client";

import { useActiveSection } from "@/lib/hooks";

export type TocEntry = { id: string; index: string; title: string };

/** Sticky clause index. Highlights whichever clause is currently being read. */
export function LegalToc({ entries }: { entries: TocEntry[] }) {
  const active = useActiveSection(entries.map((entry) => entry.id));

  return (
    <nav className="legal__toc" aria-label="Contents">
      <span className="u-label">Contents</span>
      <ol>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              data-active={active === entry.id}
              aria-current={active === entry.id ? "true" : undefined}
            >
              <span>{entry.index}</span>
              <span>{entry.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
