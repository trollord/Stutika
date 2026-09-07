import type { Metadata } from "next";

import { practices } from "@/lib/content";
import { Band } from "@/components/Band";
import { Reveal } from "@/components/Reveal";
import { SectionSpy } from "@/components/SectionSpy";
import { NextPage, PageHero, SpecGrid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Corporate and commercial, capital markets and SME IPOs, media and entertainment, intellectual property, real estate and RERA, dispute resolution, insolvency, and financial services and regulatory advisory.",
};

const SECTIONS = practices.map((practice) => ({
  id: practice.slug,
  label: practice.short,
}));

export default function PracticeAreasPage() {
  return (
    <>
      <SectionSpy sections={SECTIONS} />

      <PageHero
        kicker="Practice Areas"
        title="Practices, advised end to end"
        lede="From structuring and due diligence through documentation, negotiation and execution, and where required, ongoing legal and regulatory support."
      />

      {practices.map((practice, i) => (
        <Band
          key={practice.slug}
          id={practice.slug}
          tone={i % 2 === 0 ? "paper-hi" : "dark"}
          label={practice.short}
        >
          <div className="sec-head">
            <Reveal>
              <span className="u-label">Practice Area</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="u-display u-h2" style={{ maxWidth: "15ch" }}>
                {practice.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="u-lede">{practice.lede}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <span
              className="u-label"
              style={{ display: "block", marginBottom: 18 }}
            >
              Our work includes
            </span>
          </Reveal>

          <SpecGrid items={practice.items} />

          {practice.note ? (
            <Reveal delay={0.1}>
              <p
                className="u-body"
                style={{
                  marginTop: 30,
                  paddingTop: 24,
                  borderTop: "1px solid var(--rule-light)",
                  maxWidth: "72ch",
                }}
              >
                {practice.note}
              </p>
            </Reveal>
          ) : null}
        </Band>
      ))}

      <NextPage label="Next" title="Startup Advisory" href="/startup-advisory" />
    </>
  );
}
