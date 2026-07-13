import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17181A",
          borderRadius: 7,
          position: "relative",
        }}
      >
        <span
          style={{
            color: "#F8F6EF",
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          L
        </span>
        <div
          style={{
            position: "absolute",
            right: 4,
            bottom: 4,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#1F8A5F",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}