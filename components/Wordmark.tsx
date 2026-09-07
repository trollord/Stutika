import Image from "next/image";
import Link from "next/link";

import logoDark from "@/brand/obiter-logo.png";
import logoLight from "@/brand/obiter-logo-invert.png";
import { site } from "@/lib/content";

/**
 * `dark` is the artwork as drawn, for light backgrounds. `light` is the same
 * mark with its tonal ramp inverted, for the dark bands and the footer.
 * `auto` stacks both and cross-fades them — the header crosses between tones as
 * the page scrolls, following `data-tone` set by SiteHeader.
 */
type Variant = "dark" | "light" | "auto";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const cls = (extra: string) =>
    ["logo", extra, className ?? ""].filter(Boolean).join(" ");

  if (variant === "auto") {
    return (
      <span className="logo-swap">
        <Image src={logoDark} alt={site.name} priority sizes="220px" className={cls("logo--dark")} />
        <Image
          src={logoLight}
          alt=""
          aria-hidden="true"
          priority
          sizes="220px"
          className={cls("logo--light")}
        />
      </span>
    );
  }

  return (
    <Image
      src={variant === "light" ? logoLight : logoDark}
      alt={site.name}
      priority
      sizes="220px"
      className={cls("")}
    />
  );
}

/** The logo, linked home. */
export function Wordmark({
  variant = "dark",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={["wordmark", className ?? ""].filter(Boolean).join(" ")}
      aria-label={`${site.name} — home`}
    >
      <Logo variant={variant} />
    </Link>
  );
}
