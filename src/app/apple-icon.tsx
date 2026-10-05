import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04060c",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path
            d="M7.5 25 L16 7.5 L24.5 25"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.6 19.2 H20.4"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="16" cy="7.5" r="2.9" fill="#22d3ee" />
        </svg>
      </div>
    ),
    size,
  );
}
