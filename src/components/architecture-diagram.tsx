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
  glyph: string;
};

type Trace = { id: string; layer: LayerId; d: string };

const NODES: Node[] = [
  { id: "cdn", layer: "edge", x: 106, y: 30, w: 148, h: 48, label: "CDN", sub: "Firebase Hosting", glyph: "◇" },
  { id: "shell", layer: "frontend", x: 26, y: 122, w: 134, h: 52, label: "Shell", sub: "Next.js", glyph: "⬡" },
  { id: "widget", layer: "frontend", x: 200, y: 122, w: 134, h: 52, label: "Widget", sub: "Angular", glyph: "⬡" },
  { id: "api", layer: "backend", x: 92, y: 218, w: 176, h: 52, label: "API", sub: "NestJS · Cloud Run", glyph: "▤" },
  { id: "db", layer: "data", x: 112, y: 314, w: 136, h: 48, label: "Firestore", sub: "NoSQL", glyph: "⛁" },
];

const TRACES: Trace[] = [
  { id: "cdn-shell", layer: "frontend", d: "M160 78 L160 98 Q160 108 150 108 L103 108 Q93 108 93 118 L93 122" },
  { id: "cdn-widget", layer: "frontend", d: "M200 78 L200 98 Q200 108 210 108 L257 108 Q267 108 267 118 L267 122" },
  { id: "shell-api", layer: "backend", d: "M93 174 L93 196 Q93 206 103 206 L150 206 Q160 206 160 216 L160 218" },
  { id: "widget-api", layer: "backend", d: "M267 174 L267 196 Q267 206 257 206 L210 206 Q200 206 200 216 L200 218" },
  { id: "api-db", layer: "data", d: "M180 270 L180 314" },
];

const PORTS = [
  { x: 160, y: 78 }, { x: 200, y: 78 },
  { x: 93, y: 122 }, { x: 267, y: 122 },
  { x: 93, y: 174 }, { x: 267, y: 174 },
  { x: 160, y: 218 }, { x: 200, y: 218 },
  { x: 180, y: 270 }, { x: 180, y: 314 },
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
  const infraOn = isActive("infra");

  return (
    <figure className={className}>
      <svg viewBox="0 0 360 412" role="img" aria-label={DESCRIPTION} className="w-full h-auto">
        <defs>
          <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <linearGradient id="node-fill-on" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.22)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.05)" />
          </linearGradient>
        </defs>

        <g className="transition-opacity duration-700" opacity={infraOn ? 1 : 0.4}>
          <rect
            x="10"
            y="10"
            width="340"
            height="392"
            rx="14"
            fill="none"
            stroke={infraOn ? "var(--accent-2)" : "var(--border)"}
            strokeWidth="1"
            strokeDasharray="3 6"
            className="transition-[stroke] duration-700"
          />
          <text
            x="26"
            y="394"
            fontSize="9"
            letterSpacing="2"
            fill={infraOn ? "var(--accent-2)" : "var(--text-muted)"}
            className="font-mono uppercase transition-[fill] duration-700"
          >
            Terraform · IaC
          </text>
        </g>

        {TRACES.map((trace) => (
          <path
            key={trace.id}
            d={trace.d}
            fill="none"
            stroke={isActive(trace.layer) ? "var(--accent)" : "var(--trace)"}
            strokeWidth={isActive(trace.layer) ? 1.4 : 1}
            className="transition-all duration-700"
          />
        ))}

        {PORTS.map((port, i) => (
          <circle key={i} cx={port.x} cy={port.y} r="2" fill="var(--trace)" />
        ))}

        {TRACES.filter((t) => isActive(t.layer)).map((trace) =>
          [0, 1].map((n) => (
            <circle
              key={`${trace.id}-packet-${n}`}
              r="2.6"
              fill="var(--accent)"
              className="packet"
              style={{
                offsetPath: `path("${trace.d}")`,
                animation: `packet 1.6s linear ${n * 0.8}s infinite`,
              }}
            />
          )),
        )}

        {NODES.map((node) => {
          const on = isActive(node.layer);
          return (
            <g key={node.id} filter={on ? "url(#node-glow)" : undefined}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx="8"
                fill={on ? "url(#node-fill-on)" : "url(#node-fill)"}
                stroke={on ? "var(--accent)" : "var(--border)"}
                strokeWidth={on ? 1.4 : 1}
                className="transition-all duration-700"
              />
              <text
                x={node.x + 13}
                y={node.y + node.h / 2 + 4}
                fontSize="13"
                fill={on ? "var(--accent)" : "var(--text-muted)"}
                className="transition-[fill] duration-700"
              >
                {node.glyph}
              </text>
              <text
                x={node.x + 30}
                y={node.y + 21}
                fontSize="13"
                fill={on ? "#ffffff" : "var(--text)"}
                className="font-sans font-medium transition-[fill] duration-700"
              >
                {node.label}
              </text>
              <text
                x={node.x + 30}
                y={node.y + 36}
                fontSize="8.5"
                letterSpacing="0.6"
                fill="var(--text-muted)"
                className="font-mono"
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">{DESCRIPTION}</figcaption>
    </figure>
  );
}
