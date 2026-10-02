export type LayerId = "edge" | "frontend" | "backend" | "data" | "infra";

type Node = {
  id: string;
  layer: LayerId;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
};

type Trace = { id: string; layer: LayerId; d: string };

const NODES: Node[] = [
  { id: "cdn", layer: "edge", x: 108, y: 26, w: 144, h: 42, label: "CDN", sub: "Firebase Hosting" },
  { id: "shell", layer: "frontend", x: 32, y: 112, w: 128, h: 46, label: "Shell", sub: "Next.js" },
  { id: "widget", layer: "frontend", x: 200, y: 112, w: 128, h: 46, label: "Widget", sub: "Angular" },
  { id: "api", layer: "backend", x: 96, y: 202, w: 168, h: 46, label: "API", sub: "NestJS · Cloud Run" },
  { id: "db", layer: "data", x: 118, y: 292, w: 124, h: 42, label: "Firestore", sub: "" },
];

const TRACES: Trace[] = [
  { id: "cdn-shell", layer: "frontend", d: "M160 68 L160 90 Q160 100 150 100 L106 100 Q96 100 96 110 L96 112" },
  { id: "cdn-widget", layer: "frontend", d: "M200 68 L200 90 Q200 100 210 100 L254 100 Q264 100 264 110 L264 112" },
  { id: "shell-api", layer: "backend", d: "M96 158 L96 180 Q96 190 106 190 L150 190 Q160 190 160 200 L160 202" },
  { id: "widget-api", layer: "backend", d: "M264 158 L264 180 Q264 190 254 190 L210 190 Q200 190 200 200 L200 202" },
  { id: "api-db", layer: "data", d: "M180 248 L180 292" },
];

const DESCRIPTION =
  "Diagrama de la arquitectura del sitio. Una capa de borde con CDN en Firebase Hosting distribuye " +
  "dos piezas de frontend: un shell en Next.js y un widget en Angular cargado en runtime. Ambos " +
  "consumen un API en NestJS sobre Cloud Run, que persiste en Firestore. Toda la infraestructura " +
  "se define como código en Terraform.";

export function ArchitectureDiagram({
  activeLayer,
  className,
}: {
  activeLayer: LayerId | null;
  className?: string;
}) {
  const isActive = (layer: LayerId) => activeLayer === layer;

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 360 384"
        role="img"
        aria-label={DESCRIPTION}
        className="w-full h-auto"
      >
        <g
          className="transition-opacity duration-700"
          opacity={isActive("infra") ? 1 : 0.45}
        >
          <rect
            x="10"
            y="8"
            width="340"
            height="368"
            rx="10"
            fill="none"
            stroke={isActive("infra") ? "var(--trace-active)" : "var(--border)"}
            strokeWidth="1"
            strokeDasharray="4 5"
            className="transition-[stroke] duration-700"
          />
          <text
            x="24"
            y="370"
            fontSize="9"
            letterSpacing="1.4"
            fill={isActive("infra") ? "var(--accent)" : "var(--text-muted)"}
            className="font-mono uppercase transition-[fill] duration-700"
          >
            Terraform · IaC
          </text>
        </g>

        {TRACES.map((trace) => {
          const on = isActive(trace.layer);
          return (
            <path
              key={trace.id}
              d={trace.d}
              fill="none"
              stroke={on ? "var(--trace-active)" : "var(--trace)"}
              strokeWidth={on ? 1.6 : 1}
              strokeDasharray="3 4"
              className={`transition-all duration-700${on ? " trace-flow" : ""}`}
            />
          );
        })}

        {NODES.map((node) => {
          const on = isActive(node.layer);
          return (
            <g key={node.id} className="transition-all duration-700">
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx="6"
                fill={on ? "var(--accent-soft)" : "var(--surface)"}
                stroke={on ? "var(--accent)" : "var(--border)"}
                strokeWidth={on ? 1.5 : 1}
                className="transition-all duration-700"
              />
              <text
                x={node.x + node.w / 2}
                y={node.sub ? node.y + 20 : node.y + node.h / 2 + 4}
                textAnchor="middle"
                fontSize="13"
                fill={on ? "var(--accent)" : "var(--text)"}
                className="font-sans font-medium transition-[fill] duration-700"
              >
                {node.label}
              </text>
              {node.sub ? (
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 34}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-muted)"
                  className="font-mono"
                >
                  {node.sub}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">{DESCRIPTION}</figcaption>
    </figure>
  );
}
