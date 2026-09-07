import type { ComponentProps } from "react";
import type Link from "next/link";

import type { LegalDocument } from "@/lib/content";
import { Band } from "@/components/Band";
import { LegalToc } from "@/components/LegalToc";
import { Reveal } from "@/components/Reveal";
import { ArrowAnchor, NextPage, PageHero } from "@/components/ui";

/** Clause ids are derived from the numbering so anchors stay stable. */
const clauseId = (index: string) => `clause-${index}`;

export function LegalDoc({
  doc,
  next,
}: {
  doc: LegalDocument;
  next: { label: string; title: string; href: ComponentProps<typeof Link>["href"] };
}) {
  const entries = doc.sections.map((section) => ({
    id: clauseId(section.index),
    index: section.index,
    title: section.title,
  }));

  return (
    <>
      <PageHero
        kicker={doc.kicker}
        title={doc.title}
        lede={doc.intro[0]}
        meta={doc.effective}
      />

      <Band tone="paper-hi">
        <div className="legal">
          <LegalToc entries={entries} />

          <div className="legal__body">
            {doc.intro.slice(1).map((paragraph) => (
              <Reveal key={paragraph.slice(0, 30)}>
                <p className="legal__intro">{paragraph}</p>
              </Reveal>
            ))}

            {doc.sections.map((section) => (
              <section
                key={section.index}
                id={clauseId(section.index)}
                className="legal__section"
              >
                <Reveal y={16}>
                  <div className="legal__head">
                    <span className="legal__num">{section.index}</span>
                    <h2 className="legal__title">{section.title}</h2>
                  </div>

                  {section.lead ? (
                    <p className="legal__lead">{section.lead}</p>
                  ) : null}

                  {section.list ? (
                    <ul className="legal__list">
                      {section.list.map((item) => (
                        <li key={item.slice(0, 30)}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {section.body?.map((paragraph) => (
                    <p className="u-body" key={paragraph.slice(0, 30)}>
                      {paragraph}
                    </p>
                  ))}

                  {section.contact ? (
                    <div className="legal__contact">
                      <span className="u-label">{section.contact.name}</span>
                      <ArrowAnchor href={`mailto:${section.contact.email}`}>
                        {section.contact.email}
                      </ArrowAnchor>
                    </div>
                  ) : null}
                </Reveal>
              </section>
            ))}
          </div>
        </div>
      </Band>

      <NextPage label={next.label} title={next.title} href={next.href} />
    </>
  );
}
