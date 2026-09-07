import type { Metadata } from "next";

import { startupAdvisory } from "@/lib/content";
import { Band } from "@/components/Band";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { NextPage, PageHero, SpecGrid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Startup Advisory",
  description: startupAdvisory.lede,
};

const STAGES = [
  "Incorporation",
  "Founder arrangements",
  "Seed and venture rounds",
  "Governance and ESOPs",
  "Growth and compliance",
  "Exit",
];

export default function StartupAdvisoryPage() {
  return (
    <>
      <PageHero
        kicker="Startup Advisory"
        title="From incorporation to exit"
        lede={startupAdvisory.lede}
        meta="Founders · Emerging businesses · Investors"
      />

      <Band id="lifecycle" tone="dark" label="Lifecycle" tight>
        <div className="split" style={{ alignItems: "center" }}>
          <div className="stack" style={{ gap: 0 }}>
            {STAGES.map((stage, i) => (
              <Reveal key={stage} delay={i * 0.05} y={14}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px minmax(0, 1fr)",
                    gap: 18,
                    alignItems: "center",
                    paddingBlock: "18px",
                    borderTop: "1px solid var(--rule-light)",
                  }}
                >
                  <span className="idx__rule" aria-hidden="true" />
                  <span
                    className="u-display"
                    style={{
                      fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {stage}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal y={26} delay={0.1}>
            <Plate variant="strata" ratio="1 / 1" seed={31} />
          </Reveal>
        </div>
      </Band>

      <Band id="scope" tone="paper" label="Scope">
        <div className="sec-head">
          <Reveal>
            <span className="u-label">Our work includes</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="u-display u-h2" style={{ maxWidth: "15ch" }}>
              Legal support at every stage
            </h2>
          </Reveal>
        </div>
        <SpecGrid items={startupAdvisory.items} />
      </Band>

      <NextPage label="Next" title="Industries and Sectors" href="/industries" />
    </>
  );
}
