import Link from "next/link";

import { DISCLAIMER, footer, legalNav, nav, practices, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/Wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="ftr" data-tone="deep">
      <div className="shell">
        <div className="ftr__top">
          <div className="stack" style={{ gap: 26 }}>
            <span className="u-label">{footer.title}</span>
            <Reveal>
              <p
                className="u-display u-serif"
                style={{
                  fontSize: "clamp(1.55rem, 3vw, 2.5rem)",
                  maxWidth: "17ch",
                  lineHeight: 1.12,
                }}
              >
                {footer.statement}
              </p>
            </Reveal>
            <div style={{ maxWidth: "56ch" }}>
              {footer.paragraphs.map((paragraph) => (
                <p className="u-body" key={paragraph.slice(0, 28)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="ftr__cols">
            <div>
              <span className="u-label">Navigate</span>
              <ul className="ftr__list">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>

              <span
                className="u-label"
                style={{ display: "block", marginTop: 30 }}
              >
                Legal
              </span>
              <ul className="ftr__list">
                {legalNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="u-label">Practices</span>
              <ul className="ftr__list">
                {practices.map((practice) => (
                  <li key={practice.slug}>
                    <Link href={`/practice-areas#${practice.slug}`}>
                      {practice.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="u-label">Office</span>
              <ul className="ftr__list">
                {site.address.map((line) => (
                  <li
                    key={line}
                    style={{ color: "var(--snow-soft)", fontSize: "0.8125rem" }}
                  >
                    {line}
                  </li>
                ))}
                <li style={{ marginTop: 10 }}>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="ftr__legal">
          <strong
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontSize: "0.5625rem",
              color: "var(--snow-soft)",
            }}
          >
            Disclaimer
          </strong>
          {DISCLAIMER}
        </p>

        <div className="ftr__bottom">
          <Wordmark variant="light" />
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.06em",
              color: "#7f7f7a",
            }}
          >
            © {year} {site.name}. All rights reserved.
          </span>
          <span
            className="u-label"
            style={{ color: "#7f7f7a" }}
          >
            {site.city}
          </span>
        </div>
      </div>
    </footer>
  );
}
