import Link from "next/link";
import { site } from "@/lib/content";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={["wordmark", className ?? ""].filter(Boolean).join(" ")}
      aria-label={`${site.name} — home`}
    >
      <span className="wordmark__mark">{site.wordmark}</span>
      <span className="wordmark__tail">{site.wordmarkTail}</span>
    </Link>
  );
}
