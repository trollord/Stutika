import type { Metadata } from "next";

import { DISCLAIMER_PARAGRAPHS, site } from "@/lib/content";
import { Band } from "@/components/Band";
import { Reveal } from "@/components/Reveal";
import { ArrowAnchor, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Bar Council of India disclaimer and terms of use for the Obiter Legal website.",
  robots: { index: true, follow: false },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        kicker="Disclaimer"
        title="Terms of use"
        lede="Please read the following before relying on any material published on this website."
      />

      <Band id="notice" tone="dark" index="01" label="Notice">
        <div style={{ maxWidth: "78ch" }}>
          {DISCLAIMER_PARAGRAPHS.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 30)} delay={i * 0.06}>
              <p
                className="u-body"
                style={{
                  maxWidth: "78ch",
                  marginTop: i === 0 ? 0 : "1.3em",
                  fontSize: "0.95rem",
                }}
              >
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <div
              style={{
                marginTop: "clamp(38px, 4vw, 56px)",
                paddingTop: "clamp(26px, 3vw, 34px)",
                borderTop: "1px solid var(--rule-light)",
              }}
            >
              <span className="u-label" style={{ display: "block", marginBottom: 14 }}>
                Questions about this notice
              </span>
              <ArrowAnchor href={`mailto:${site.email}`}>{site.email}</ArrowAnchor>
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
