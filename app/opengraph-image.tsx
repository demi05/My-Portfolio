import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Leshi Taiwo Oluwademilade — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F3F1E9",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(120deg, #1F8A5F 0%, #5B5BD6 33%, #C98A00 66%, #E0567C 100%)",
            opacity: 0.12,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 28,
            color: "#1F8A5F",
            marginBottom: 26,
            fontFamily: "monospace",
          }}
        >
          <span>&gt;_</span>
          <span>~/demi — main</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 900,
            color: "#17181A",
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          <span>Leshi Taiwo</span>
          <span>Oluwademilade</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#17181A",
            opacity: 0.7,
            marginTop: 30,
          }}
        >
          Frontend Engineer — React · Next.js · TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}