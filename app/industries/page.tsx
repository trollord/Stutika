import type { Metadata } from "next";

import { industries, practices } from "@/lib/content";
import { Band } from "@/components/Band";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, NextPage, PageHero, SpecGrid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Industries and Sectors",
  description: industries.lede,
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        kicker="Industries"
        title="Advice shaped by the sector"
        lede={industries.lede}
        meta={`${industries.items.length} sectors`}
      />

      <section
        className="band band--tight"
        data-tone="paper"
        style={{ paddingTop: 0 }}
      >
        <Marquee items={industries.items.map((item) => item.title)} />
      </section>

      <Band id="sectors" tone="dark" index="01" label="Sectors">
        <div className="sec-head">
          <Reveal>
            <span className="u-label">Where we work</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="u-display u-h2" style={{ maxWidth: "16ch" }}>
              Sectors we advise
            </h2>
          </Reveal>
        </div>

        <SpecGrid items={industries.items} />

        <div style={{ marginTop: 44 }}>
          <ArrowLink href="/practice-areas">
            How this maps to our practices
          </ArrowLink>
        </div>
      </Band>

      <Band id="practices" tone="paper-hi" index="02" label="Practices" tight>
        <div className="sec-head">
          <Reveal>
            <span className="u-label">Across every sector</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="u-display u-h2" style={{ maxWidth: "16ch" }}>
              Eight practices
            </h2>
          </Reveal>
        </div>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "10px 12px" }}
        >
          {practices.map((practice, i) => (
            <Reveal key={practice.slug} delay={i * 0.04} y={12}>
              <span
                style={{
                  display: "inline-block",
                  padding: "9px 16px",
                  border: "1px solid var(--rule-light)",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                }}
              >
                {practice.title}
              </span>
            </Reveal>
          ))}
        </div>
      </Band>

      <NextPage label="Next" title="Founder" href="/founder" />
    </>
  );
}
