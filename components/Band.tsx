import type { ReactNode } from "react";

export type BandTone = "paper" | "paper-hi" | "dark" | "deep";

type BandProps = {
  id?: string;
  tone?: BandTone;
  index?: string;
  label?: string;
  tight?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * The signature section shell: a full-bleed tonal band with a left rail
 * carrying an oversized ghost numeral, a hairline and a rotated caption.
 */
export function Band({
  id,
  tone = "paper",
  index,
  label,
  tight,
  className,
  children,
}: BandProps) {
  const hasRail = Boolean(index || label);

  return (
    <section
      id={id}
      data-tone={tone}
      className={["band", tight ? "band--tight" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="shell">
        {hasRail ? (
          <div className="band__inner">
            <aside className="rail" aria-hidden="true">
              <div className="rail__sticky">
                {index ? <span className="rail__num">{index}</span> : null}
                <span className="rail__line" />
                {label ? <span className="rail__label">{label}</span> : null}
              </div>
            </aside>
            <div className="band__body">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
