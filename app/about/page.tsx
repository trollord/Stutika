import type { Metadata } from "next";

import { about, whyObiter } from "@/lib/content";
import { Band } from "@/components/Band";
import { Plate } from "@/components/Plate";
import { Reveal, RuleReveal } from "@/components/Reveal";
import { SectionSpy } from "@/components/SectionSpy";
import { NextPage, PageHero, SectionHead, SpecGrid } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
};

const SECTIONS = [
  { id: "firm", label: "The Firm" },
  { id: "principles", label: "Principles" },
  { id: "why", label: "Why Obiter" },
];

export default function AboutPage() {
  return (
    <>
      <SectionSpy sections={SECTIONS} />

      <PageHero
        kicker="About"
        title="A boutique firm, closely held"
        lede={about.lede}
        meta="Boutique practice · Ballard Estate, Mumbai"
      />

      <Band id="firm" tone="paper" index="01" label="The Firm" tight>
        <div className="split">
          <div>
            <p className="u-body">{about.paragraphs[0]}</p>
            <p className="u-body">{about.paragraphs[1]}</p>
          </div>
          <div>
            <p className="u-body">{about.paragraphs[2]}</p>
            <p className="u-body">{about.paragraphs[3]}</p>
          </div>
        </div>
      </Band>

      <Band id="principles" tone="dark" index="02" label="Principles">
        <div className="split" style={{ alignItems: "center" }}>
          <div>
            <SectionHead
              kicker="How we work"
              title="Approach, Philosophy, Vision"
            />
            <div className="stack" style={{ gap: 0 }}>
              {about.pillars.map((pillar, i) => (
                <Reveal key={pillar.label} delay={i * 0.06} y={18}>
                  <div
                    style={{
                      paddingBlock: "clamp(22px, 2.6vw, 32px)",
                      borderTop: "1px solid var(--rule-light)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <span className="u-label">{pillar.label}</span>
                    <p className="pillar__statement">{pillar.statement}</p>
                    <p className="spec__body">{pillar.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal y={26} delay={0.1}>
            <Plate variant="strata" ratio="4 / 5" seed={19} />
          </Reveal>
        </div>
      </Band>

      <Band id="why" tone="paper-hi" index="03" label="Why Obiter">
        <SectionHead
          kicker="Why Obiter Legal"
          title="What clients can expect"
          lede="The commitments that shape how a matter is run."
        />
        <SpecGrid items={whyObiter} />
        <div style={{ marginTop: 44 }}>
          <RuleReveal className="sec-head__rule" />
        </div>
      </Band>

      <NextPage
        label="Next"
        title="Practice Areas"
        href="/practice-areas"
      />
    </>
  );
}
