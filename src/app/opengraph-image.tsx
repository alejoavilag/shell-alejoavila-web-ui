import { ImageResponse } from "next/og";
import { getSiteIdentity } from "@/application/use-cases/get-site-identity";
import { siteIdentityRepository } from "@/infrastructure/container";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Alejandro Ávila — Senior Full-Stack Engineer";
export const dynamic = "force-static";

const INK = "#04060c";
const ACCENT = "#22d3ee";
const TEXT = "#e9f0fa";
const MUTED = "#7f90aa";

export default function OpengraphImage() {
  const site = getSiteIdentity(siteIdentityRepository);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: INK,
          backgroundImage: `radial-gradient(circle at 18% 0%, rgba(34,211,238,0.16), transparent 55%), radial-gradient(circle at 88% 20%, rgba(167,139,250,0.12), transparent 55%)`,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: ACCENT,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 48, height: 2, background: ACCENT }} />
          Bogotá · Abierto a trabajo remoto
        </div>

        <div
          style={{
            marginTop: 28,
            color: TEXT,
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          {site.person.fullName.replace(" Guerrero", "")}
        </div>

        <div style={{ marginTop: 14, color: ACCENT, fontSize: 38, letterSpacing: -0.5 }}>
          Senior Full-Stack Engineer · Platform &amp; Cloud
        </div>

        <div
          style={{
            marginTop: 34,
            maxWidth: 820,
            color: MUTED,
            fontSize: 28,
            lineHeight: 1.45,
          }}
        >
          Microfrontends, microservicios en NestJS e infraestructura como código en
          Terraform, para plataformas de banca digital.
        </div>

        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 58,
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: MUTED,
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: ACCENT }} />
          {new URL(site.url).host}
        </div>

        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 58,
            display: "flex",
            gap: 10,
          }}
        >
          {["TypeScript", "NestJS", "Angular", "React", "Terraform"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 16px",
                border: "1px solid rgba(110,170,235,0.28)",
                borderRadius: 8,
                color: MUTED,
                fontSize: 20,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
