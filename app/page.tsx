import Link from "next/link";

import {
  about,
  contact,
  founder,
  home,
  industries,
  practices,
  site,
  startupAdvisory,
  whyObiter,
} from "@/lib/content";
import { Band } from "@/components/Band";
import { Marquee } from "@/components/Marquee";
import { Plate } from "@/components/Plate";
import { LineReveal, Reveal, RuleReveal } from "@/components/Reveal";
import { SectionSpy } from "@/components/SectionSpy";
import { ArrowAnchor, ArrowLink, SectionHead, SpecGrid } from "@/components/ui";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "firm", label: "The Firm" },
  { id: "practice", label: "Practice" },
  { id: "why", label: "Why Obiter" },
  { id: "startups", label: "Startups" },
  { id: "founder", label: "Founder" },
  { id: "industries", label: "Industries" },
  { id: "contact", label: "Contact" },
];

export default function HomePage() {
  return (
    <>
      <SectionSpy sections={SECTIONS} />

      {/* 01 — Introduction ------------------------------------------------ */}
      <section id="introduction" className="band hero" data-tone="paper">
        <div className="shell">
          <div className="band__inner">
            <aside className="rail" aria-hidden="true">
              <div className="rail__sticky">
                <span className="rail__num">01</span>
                <span className="rail__line" />
                <span className="rail__label">Introduction</span>
              </div>
            </aside>

            <div>
              <div className="hero__grid">
                <div>
                  <Reveal y={12}>
                    <span className="u-label">
                      {site.name} — {site.city}
                    </span>
                  </Reveal>

                  <h1
                    className="u-display u-h1"
                    style={{ marginTop: 26, marginBottom: 30 }}
                  >
                    <LineReveal
                      delay={0.12}
                      lines={[
                        "Commercially",
                        "Focused Legal",
                        "Counsel for",
                        "Business",
                      ]}
                    />
                  </h1>

                  <RuleReveal delay={0.5} />

                  <Reveal delay={0.55}>
                    <p className="u-lede" style={{ marginTop: 30 }}>
                      {home.lede}
                    </p>
                  </Reveal>

                  <Reveal delay={0.62}>
                    <p className="u-body" style={{ marginTop: 22 }}>
                      {home.body}
                    </p>
                  </Reveal>

                  <Reveal delay={0.7}>
                    <div style={{ marginTop: 34 }}>
                      <ArrowLink href="/contact">{home.cta}</ArrowLink>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.3} y={30}>
                  <Plate
                    variant="colonnade"
                    ratio="1 / 1"
                    className="hero__plate"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — The Firm ---------------------------------------------------- */}
      <Band id="firm" tone="dark" index="02" label="The Firm">
        <SectionHead
          kicker="About"
          title="About Obiter Legal"
          lede={about.lede}
        />

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

        <div className="pillars">
          {about.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.label}
              className="pillar"
              delay={i * 0.07}
              y={18}
            >
              <span className="u-label">{pillar.label}</span>
              <p className="pillar__statement">{pillar.statement}</p>
              <p className="spec__body">{pillar.body}</p>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 44 }}>
          <ArrowLink href="/about">More about the firm</ArrowLink>
        </div>
      </Band>

      {/* 03 — Practice Areas ---------------------------------------------- */}
      <Band id="practice" tone="paper" index="03" label="Practice Areas">
        <SectionHead
          kicker="What we do"
          title="Practice Areas"
          lede="Advised end to end — from structuring and diligence through documentation, negotiation and execution."
        />

        <div className="idx">
          {practices.map((practice) => (
            <Reveal key={practice.slug} y={16}>
              <Link
                href={`/practice-areas#${practice.slug}`}
                className="idx__row"
              >
                <span className="idx__rule" aria-hidden="true" />
                <span>
                  <span
                    className="u-display idx__title"
                    style={{
                      fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)",
                      display: "block",
                    }}
                  >
                    {practice.title}
                  </span>
                  <span className="idx__body" style={{ display: "block" }}>
                    {practice.lede}
                  </span>
                </span>
                <span className="idx__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 44 }}>
          <ArrowLink href="/practice-areas">
            All practice areas in detail
          </ArrowLink>
        </div>
      </Band>

      {/* 04 — Why Obiter Legal -------------------------------------------- */}
      <Band id="why" tone="deep" index="04" label="Why Obiter">
        <SectionHead
          kicker="Approach"
          title="Why Obiter Legal"
          lede="The commitments that shape how a matter is run."
        />
        <SpecGrid items={whyObiter} />
      </Band>

      {/* 05 — Startup Advisory -------------------------------------------- */}
      <Band id="startups" tone="paper-hi" index="05" label="Startup Advisory">
        <SectionHead
          kicker="Founders and emerging businesses"
          title="Startup Advisory"
          lede={startupAdvisory.lede}
        />
        <SpecGrid items={startupAdvisory.items} />
        <div style={{ marginTop: 44 }}>
          <ArrowLink href="/startup-advisory">
            Startup advisory in detail
          </ArrowLink>
        </div>
      </Band>

      {/* 06 — Founder ------------------------------------------------------ */}
      <Band id="founder" tone="dark" index="06" label="Founder">
        <div className="split" style={{ alignItems: "center" }}>
          <Reveal y={24}>
            <Plate variant="monogram" ratio="1 / 1" initials="SRG" seed={23} />
          </Reveal>

          <div>
            <Reveal>
              <span className="u-label">Founder</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="u-display u-h2"
                style={{ marginTop: 18, marginBottom: 10 }}
              >
                {founder.name}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="u-label" style={{ display: "block" }}>
                {founder.role}
              </span>
            </Reveal>
            <div style={{ margin: "26px 0" }}>
              <RuleReveal delay={0.12} />
            </div>
            <Reveal delay={0.16}>
              <p className="u-lede">{founder.lede}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="u-body" style={{ marginTop: 20 }}>
                {founder.paragraphs[2]}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div style={{ marginTop: 32 }}>
                <ArrowLink href="/founder">Full profile</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* 07 — Industries --------------------------------------------------- */}
      <Band id="industries" tone="paper" index="07" label="Industries">
        <SectionHead
          kicker="Sectors"
          title="Industries and Sectors"
          lede={industries.lede}
        />
      </Band>

      <section
        className="band band--tight"
        data-tone="paper"
        style={{ paddingTop: 0 }}
      >
        <Marquee items={industries.items.map((item) => item.title)} />
        <div className="shell" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
          <ArrowLink href="/industries">Sector experience</ArrowLink>
        </div>
      </section>

      {/* 08 — Contact ------------------------------------------------------ */}
      <Band id="contact" tone="dark" index="08" label="Contact">
        <div className="split" style={{ alignItems: "end" }}>
          <div>
            <Reveal>
              <span className="u-label">Get in touch</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="u-display u-h2"
                style={{ marginTop: 20, maxWidth: "13ch" }}
              >
                {contact.heading}
              </h2>
            </Reveal>
            <div style={{ margin: "28px 0" }}>
              <RuleReveal delay={0.1} />
            </div>
            <Reveal delay={0.14}>
              <p className="u-lede">{contact.lede}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ marginTop: 36 }}>
                <Link href="/contact" className="btn">
                  Make an enquiry
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="stack" style={{ gap: 26 }}>
            <div className="stack" style={{ gap: 10 }}>
              <span className="u-label">Office</span>
              <address
                style={{
                  fontStyle: "normal",
                  fontSize: "0.9375rem",
                  lineHeight: 1.9,
                  color: "var(--ink-soft)",
                }}
              >
                {site.address.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <hr className="u-rule" />
            <div className="stack" style={{ gap: 14 }}>
              <ArrowAnchor href={`mailto:${site.email}`}>
                {site.email}
              </ArrowAnchor>
              <ArrowAnchor href={`tel:${site.phoneHref}`}>
                {site.phone}
              </ArrowAnchor>
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
