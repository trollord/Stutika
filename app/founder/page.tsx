import type { Metadata } from "next";

import { founder, practices } from "@/lib/content";
import { Band } from "@/components/Band";
import { Portrait } from "@/components/Portrait";
import { Reveal, RuleReveal } from "@/components/Reveal";
import { NextPage } from "@/components/ui";

export const metadata: Metadata = {
  title: `${founder.name} — ${founder.role}`,
  description: founder.lede,
};

export default function FounderPage() {
  return (
    <>
      <section
        className="band"
        data-tone="paper"
        style={{ paddingTop: "calc(var(--header-h) + clamp(56px, 8vw, 118px))" }}
      >
        <div className="shell">
          <div className="band__inner">
            <aside className="rail" aria-hidden="true">
              <div className="rail__sticky">
                <span className="rail__num">01</span>
                <span className="rail__line" />
                <span className="rail__label">Founder</span>
              </div>
            </aside>

            <div className="split" style={{ alignItems: "center" }}>
              <div>
                <Reveal>
                  <span className="u-label">Founder</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h1
                    className="u-display u-h1"
                    style={{ marginTop: 22, maxWidth: "9ch" }}
                  >
                    {founder.name}
                  </h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <span
                    className="u-label"
                    style={{ display: "block", marginTop: 22 }}
                  >
                    {founder.role}
                  </span>
                </Reveal>
                <div style={{ marginTop: 28 }}>
                  <RuleReveal delay={0.14} />
                </div>
                <Reveal delay={0.18}>
                  <p className="u-lede" style={{ marginTop: 28 }}>
                    {founder.lede}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.24} y={28}>
                <Portrait ratio="4 / 5" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Band id="practice" tone="dark" index="02" label="Practice">
        <div className="split">
          <div>
            <Reveal>
              <h2 className="u-display u-h2" style={{ maxWidth: "12ch" }}>
                Practice and Experience
              </h2>
            </Reveal>
            <div style={{ marginTop: 26 }}>
              <RuleReveal delay={0.06} />
            </div>
          </div>
          <div>
            {founder.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={i * 0.06}>
                <p className="u-body" style={{ marginTop: i === 0 ? 0 : "1.15em" }}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(44px, 5vw, 70px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 12px",
          }}
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

      <NextPage label="Next" title="Contact Obiter Legal" href="/contact" />
    </>
  );
}
