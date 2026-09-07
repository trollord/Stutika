import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { Reveal, RuleReveal } from "@/components/Reveal";

/* -------------------------------------------------------------------------- */
/* Arrow link                                                                  */
/* -------------------------------------------------------------------------- */

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={["arrow-link", className ?? ""].filter(Boolean).join(" ")}
    >
      <span className="arrow-link__text">{children}</span>
      <span className="arrow-link__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export function ArrowAnchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={["arrow-link", className ?? ""].filter(Boolean).join(" ")}
    >
      <span className="arrow-link__text">{children}</span>
      <span className="arrow-link__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading                                                             */
/* -------------------------------------------------------------------------- */

export function SectionHead({
  kicker,
  title,
  lede,
  level = 2,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="sec-head">
      {kicker ? (
        <Reveal>
          <span className="u-label">{kicker}</span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <Heading className={`u-display ${level === 1 ? "u-h1" : "u-h2"}`}>
          {title}
        </Heading>
      </Reveal>
      <RuleReveal delay={0.1} />
      {lede ? (
        <Reveal delay={0.14}>
          <p className="u-lede">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Specification grid — the sub-items of a practice area                       */
/* -------------------------------------------------------------------------- */

export function SpecGrid({
  items,
  startIndex = 1,
}: {
  items: { title: string; body: string }[];
  startIndex?: number;
}) {
  return (
    <div className="spec-grid">
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          className="spec"
          delay={Math.min(i, 5) * 0.045}
          y={16}
        >
          <span className="spec__idx">
            {String(startIndex + i).padStart(2, "0")}
          </span>
          <h3 className="u-h3">{item.title}</h3>
          <p className="spec__body">{item.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page hero — the masthead used on every interior page                        */
/* -------------------------------------------------------------------------- */

export function PageHero({
  kicker,
  title,
  lede,
  meta,
}: {
  kicker: string;
  title: string;
  lede?: string;
  meta?: string;
}) {
  return (
    <section className="band page-hero" data-tone="paper">
      <div className="shell">
        <div className="band__inner">
          <aside className="rail" aria-hidden="true">
            <div className="rail__sticky">
              <span className="rail__label">{kicker}</span>
              <span className="rail__line" />
            </div>
          </aside>

          <div className="page-hero__grid">
            <div>
              <Reveal>
                <span className="u-label">{kicker}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1
                  className="u-display u-h1"
                  style={{ marginTop: 22, maxWidth: "13ch" }}
                >
                  {title}
                </h1>
              </Reveal>
            </div>

            <div className="page-hero__aside">
              <RuleReveal delay={0.1} />
              {lede ? (
                <Reveal delay={0.14}>
                  <p className="u-lede">{lede}</p>
                </Reveal>
              ) : null}
              {meta ? (
                <Reveal delay={0.2}>
                  <span className="u-label" style={{ display: "block" }}>
                    {meta}
                  </span>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Next-page pointer                                                           */
/* -------------------------------------------------------------------------- */

export function NextPage({
  label,
  title,
  href,
}: {
  label: string;
  title: string;
  href: ComponentProps<typeof Link>["href"];
}) {
  return (
    <section className="band band--tight" data-tone="deep">
      <div className="shell">
        <Link
          href={href}
          className="next-page"
          aria-label={`${label}: ${title}`}
        >
          <span className="u-label">{label}</span>
          <span className="next-page__title u-display u-h2">{title}</span>
          <span className="next-page__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
