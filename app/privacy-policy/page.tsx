import type { Metadata } from "next";

import { privacyPolicy } from "@/lib/content";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.summary,
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      doc={privacyPolicy}
      next={{
        label: "Next",
        title: "Terms & Conditions",
        href: "/terms-and-conditions",
      }}
    />
  );
}
