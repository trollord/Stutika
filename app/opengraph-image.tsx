import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontSize: 40, fontFamily: "Georgia, serif" }}>
              Obiter
            </span>
            <span
              style={{ fontSize: 17, letterSpacing: 7, color: "#8d8d88" }}
            >
              LEGAL
            </span>
          </div>
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
