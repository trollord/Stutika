import Image from "next/image";

import portrait from "@/brand/stutika-rathi-gupta.webp";
import { founder } from "@/lib/content";

/**
 * The founder's portrait, in the same hairline frame the plates use.
 * Greyscale, to sit inside the site's monochrome system.
 */
export function Portrait({
  ratio = "4 / 5",
  className,
}: {
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={["plate", "portrait", className ?? ""].filter(Boolean).join(" ")}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={portrait}
        alt={`${founder.name}, ${founder.role} of Obiter Legal`}
        placeholder="blur"
        sizes="(max-width: 980px) 92vw, 46vw"
        className="portrait__img"
      />
      <span className="plate__frame" />
    </div>
  );
}
