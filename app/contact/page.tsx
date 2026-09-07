import type { Metadata } from "next";

import { contact, site } from "@/lib/content";
import { Band } from "@/components/Band";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, RuleReveal } from "@/components/Reveal";
import { ArrowAnchor, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.lede,
};

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.join(", "),
)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title={contact.heading}
        lede={contact.lede}
        meta={site.city}
      />

      <Band id="enquiry" tone="dark" index="01" label="Enquiry">
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 34 }}>
            <div className="stack" style={{ gap: 12 }}>
              <span className="u-label">Office</span>
              <address
                style={{
                  fontStyle: "normal",
                  fontSize: "1rem",
                  lineHeight: 1.95,
                  color: "var(--ink)",
                }}
              >
                {site.address.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </address>
              <div style={{ marginTop: 6 }}>
                <ArrowAnchor href={MAPS}>View on map</ArrowAnchor>
              </div>
            </div>

            <RuleReveal className="u-rule" />

            <div className="stack" style={{ gap: 12 }}>
              <span className="u-label">Email</span>
              <ArrowAnchor href={`mailto:${site.email}`}>
                {site.email}
              </ArrowAnchor>
            </div>

            <div className="stack" style={{ gap: 12 }}>
              <span className="u-label">Phone</span>
              <ArrowAnchor href={`tel:${site.phoneHref}`}>
                {site.phone}
              </ArrowAnchor>
            </div>

            <RuleReveal className="u-rule" />

            <p className="spec__body" style={{ maxWidth: "42ch" }}>
              Enquiries are reviewed by the firm and directed to the relevant
              practice. Nothing on this website, and no communication through it,
              constitutes legal advice or creates an attorney–client relationship.
            </p>
          </div>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Band>
    </>
  );
}
