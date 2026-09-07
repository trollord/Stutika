import Link from "next/link";

import { Plate } from "@/components/Plate";
import { Reveal, RuleReveal } from "@/components/Reveal";

export default function NotFound() {
  return (
    <section
      className="band"
      data-tone="paper"
      style={{ paddingTop: "calc(var(--header-h) + clamp(70px, 10vw, 140px))" }}
    >
      <div className="shell">
        <div className="band__inner">
          <aside className="rail" aria-hidden="true">
            <div className="rail__sticky">
              <span className="rail__num">404</span>
              <span className="rail__line" />
              <span className="rail__label">Not Found</span>
            </div>
          </aside>

          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <Reveal>
                <span className="u-label">Error 404</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1
                  className="u-display u-h1"
                  style={{ marginTop: 22, maxWidth: "12ch" }}
                >
                  This page could not be found
                </h1>
              </Reveal>
              <div style={{ marginTop: 28 }}>
                <RuleReveal delay={0.1} />
              </div>
              <Reveal delay={0.14}>
                <p className="u-lede" style={{ marginTop: 28 }}>
                  The address you followed may be out of date. The practice
                  areas, firm profile and contact details are all a step away.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/" className="btn">
                    Return home
                  </Link>
                  <Link href="/practice-areas" className="btn btn--ghost">
                    Practice areas
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.24} y={26}>
              <Plate variant="arcs" ratio="1 / 1" seed={5} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
