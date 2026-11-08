import { ImageResponse } from "next/og";

export const alt = "MuseCodes – Free Muse Invite Codes Hub";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle accent border at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #f59e0b, #10b981, #f59e0b)",
          }}
        />

        {/* Top bar: Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: 900,
                color: "#09090b",
              }}
            >
              🔑
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  color: "#f4f4f5",
                  letterSpacing: "-0.5px",
                }}
              >
                Muse<span style={{ color: "#f59e0b" }}>Codes</span>
              </span>
              <span style={{ fontSize: "16px", color: "#71717a" }}>
                Community Invite Directory
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              fontSize: "16px",
              color: "#10b981",
              fontWeight: 600,
            }}
          >
            ● Live 2026 Directory
          </div>
        </div>

        {/* Hero Headline & Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "960px",
          }}
        >
          <h1
            style={{
              fontSize: "58px",
              fontWeight: 900,
              color: "#fafafa",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            Free Muse Invite Codes <br />
            <span style={{ color: "#f59e0b" }}>Copy or Share Yours</span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              marginTop: "20px",
              lineHeight: 1.4,
              maxWidth: "760px",
            }}
          >
            Find fresh, working community invite codes for the Muse app. Each code is capped at 30 copies to eliminate expired links.
          </p>
        </div>

        {/* Feature badges row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              padding: "16px 36px",
              borderRadius: "16px",
            }}
          >
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#fafafa" }}>
              600+
            </span>
            <span style={{ fontSize: "14px", color: "#71717a", marginTop: "2px" }}>
              Active Codes
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              padding: "16px 36px",
              borderRadius: "16px",
            }}
          >
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#f59e0b" }}>
              30 / 30
            </span>
            <span style={{ fontSize: "14px", color: "#71717a", marginTop: "2px" }}>
              Max Copy Limit
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              padding: "16px 36px",
              borderRadius: "16px",
            }}
          >
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#10b981" }}>
              100% Free
            </span>
            <span style={{ fontSize: "14px", color: "#71717a", marginTop: "2px" }}>
              Instant One-Click Copy
            </span>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div style={{ fontSize: "14px", color: "#52525b" }}>
          muse-dun.vercel.app • Unofficial community directory, not affiliated with Muse
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
