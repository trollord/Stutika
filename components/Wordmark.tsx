import Image from "next/image";
import Link from "next/link";

import logo from "@/brand/obiter-logo.png";
import { site } from "@/lib/content";

/**
 * The firm's logo. The artwork is dark, so it carries its own paper-coloured
 * plate and reads correctly over both the light and the dark bands.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt={site.name}
      priority
      sizes="220px"
      className={["logo", className ?? ""].filter(Boolean).join(" ")}
    />
  );
}

/** The logo, linked home. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={["wordmark", className ?? ""].filter(Boolean).join(" ")}
      aria-label={`${site.name} — home`}
    >
      <Logo />
    </Link>
  );
}
