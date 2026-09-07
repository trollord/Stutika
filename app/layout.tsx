import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Instrument_Serif } from "next/font/google";

import "./globals.css";
import { site } from "@/lib/content";
import { DisclaimerGate } from "@/components/DisclaimerGate";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "law firm Mumbai",
    "corporate law",
    "commercial contracts",
    "SME IPO legal advisory",
    "capital markets",
    "media and entertainment law",
    "intellectual property",
    "RERA advisory",
    "arbitration",
    "insolvency",
    "startup legal counsel",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ececea",
  colorScheme: "light",
};

/**
 * Runs before first paint so a visitor who has already acknowledged the
 * disclaimer this session never sees the gate flash.
 */
const GATE_SCRIPT = `try{if(sessionStorage.getItem('obiter-disclaimer-accepted')==='1'){document.documentElement.setAttribute('data-gate','done')}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The gate script stamps data-gate on <html> before hydration.
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />
        <noscript>
          {/* Without JS the gate can never be dismissed, so stand it down and
              rely on the disclaimer reproduced in the footer instead. Scroll
              reveals also never fire, so their start state is neutralised. */}
          <style>{`.gate{display:none!important}body{overflow:auto!important}.reveal,.reveal *{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <span className="grain" aria-hidden="true" />
        <DisclaimerGate />
      </body>
    </html>
  );
}
