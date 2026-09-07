import type { Metadata } from "next";

import { termsAndConditions } from "@/lib/content";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: termsAndConditions.title,
  description: termsAndConditions.summary,
  robots: { index: true, follow: false },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalDoc
      doc={termsAndConditions}
      next={{
        label: "Next",
        title: "Privacy Policy",
        href: "/privacy-policy",
      }}
    />
  );
}
