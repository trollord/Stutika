import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "brand/obiter-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ececea",
          color: "#1a1a19",
          padding: "64px 72px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <img src={logoSrc} alt={site.name} height={72} />
          <span style={{ fontSize: 17, letterSpacing: 6, color: "#8d8d88" }}>
            MUMBAI, INDIA
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ width: 78, height: 2, background: "#1a1a19" }} />
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -1.6,
              textTransform: "uppercase",
              maxWidth: 900,
            }}
          >
            Commercially Focused Legal Counsel for Business
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 17,
            letterSpacing: 5,
            color: "#8d8d88",
            borderTop: "1px solid rgba(26,26,25,0.16)",
            paddingTop: 24,
          }}
        >
          <span>CORPORATE · CAPITAL MARKETS · MEDIA · IP</span>
          <span>OBITERLEGAL.COM</span>
        </div>
      </div>
    ),
    size,
  );
}
