export type LayerId = "edge" | "frontend" | "backend" | "data" | "infra";

export const LAYER_ORDER: LayerId[] = ["edge", "frontend", "backend", "data", "infra"];

type State = "pending" | "done" | "active";

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
  { id: "cdn", layer: "edge", x: 190, y: 40, w: 180, h: 66, label: "CDN", sub: "Firebase Hosting" },
  { id: "shell", layer: "frontend", x: 60, y: 190, w: 190, h: 72, label: "Shell", sub: "Next.js" },
  { id: "widget", layer: "frontend", x: 310, y: 190, w: 190, h: 72, label: "Widget", sub: "Angular" },
  { id: "api", layer: "backend", x: 160, y: 350, w: 240, h: 72, label: "API", sub: "NestJS · Cloud Run" },
  { id: "db", layer: "data", x: 190, y: 510, w: 180, h: 66, label: "Firestore", sub: "NoSQL" },
];

const TRACES: Trace[] = [
  { id: "cdn-shell", layer: "frontend", d: "M240 106 V140 Q240 152 228 152 H167 Q155 152 155 164 V190" },
  { id: "cdn-widget", layer: "frontend", d: "M320 106 V140 Q320 152 332 152 H393 Q405 152 405 164 V190" },
  { id: "shell-api", layer: "backend", d: "M155 262 V300 Q155 312 167 312 H228 Q240 312 240 324 V350" },
  { id: "widget-api", layer: "backend", d: "M405 262 V300 Q405 312 393 312 H332 Q320 312 320 324 V350" },
  { id: "api-db", layer: "data", d: "M280 422 V510" },
];

const PORTS = [
  { x: 240, y: 106 }, { x: 320, y: 106 },
  { x: 155, y: 190 }, { x: 405, y: 190 },
  { x: 155, y: 262 }, { x: 405, y: 262 },
  { x: 240, y: 350 }, { x: 320, y: 350 },
  { x: 280, y: 422 }, { x: 280, y: 510 },
];

const DESCRIPTION =
  "Diagrama de la arquitectura del sitio. Una capa de borde con CDN en Firebase Hosting distribuye " +
  "dos piezas de frontend: un shell en Next.js y un widget en Angular cargado en runtime. Ambos " +
  "consumen un API en NestJS sobre Cloud Run, que persiste en Firestore. Toda la infraestructura " +
  "se define como código en Terraform.";

const STROKE: Record<State, string> = {
  pending: "var(--trace)",
  done: "rgba(34, 211, 238, 0.45)",
  active: "var(--accent)",
};

export function ArchitectureDiagram({
  activeLayer,
  className,
}: {
  activeLayer: LayerId | null;
  className?: string;
}) {
  const reached = activeLayer ? LAYER_ORDER.indexOf(activeLayer) : -1;

  const stateOf = (layer: LayerId): State => {
    const index = LAYER_ORDER.indexOf(layer);
    if (index === reached) return "active";
    return index < reached ? "done" : "pending";
  };

  const infra = stateOf("infra");

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 560 660"
        role="img"
        aria-label={DESCRIPTION}
        className="h-full w-full"
      >
        <defs>
          <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>
          <linearGradient id="node-fill-on" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.2)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.04)" />
          </linearGradient>
        </defs>

        <g
          className="transition-opacity duration-700"
          opacity={infra === "pending" ? 0.35 : 1}
        >
          <rect
            x="14"
            y="14"
            width="532"
            height="632"
            rx="20"
            fill="none"
            stroke={infra === "active" ? "var(--accent-2)" : STROKE[infra]}
            strokeWidth="1"
            strokeDasharray="4 8"
            className="transition-[stroke] duration-700"
          />
          <text
            x="34"
            y="632"
            fontSize="12"
            letterSpacing="3"
            fill={infra === "active" ? "var(--accent-2)" : "var(--text-muted)"}
            className="font-mono uppercase transition-[fill] duration-700"
          >
            Terraform · IaC
          </text>
        </g>

        {TRACES.map((trace) => {
          const state = stateOf(trace.layer);
          return (
            <path
              key={trace.id}
              d={trace.d}
              fill="none"
              stroke={STROKE[state]}
              strokeWidth={state === "active" ? 1.8 : 1.2}
              className="transition-all duration-700"
            />
          );
        })}

        {PORTS.map((port) => (
          <circle key={`${port.x}-${port.y}`} cx={port.x} cy={port.y} r="2.6" fill="var(--trace)" />
        ))}

        {TRACES.map((trace, i) => {
          const state = stateOf(trace.layer);
          if (state === "pending") return null;
          const on = state === "active";
          return [0, 1].map((n) => (
            <circle
              key={`${trace.id}-packet-${n}`}
              r={on ? 3.4 : 2.2}
              fill="var(--accent)"
              opacity={on ? 1 : 0.35}
              className="packet"
              style={{
                offsetPath: `path("${trace.d}")`,
                animation: `packet ${on ? 1.8 : 4.4}s linear ${
                  n * (on ? 0.9 : 2.2) + (on ? 0 : i * 0.5)
                }s infinite`,
              }}
            />
          ));
        })}

        {NODES.map((node) => {
          const state = stateOf(node.layer);
          const on = state === "active";
          return (
            <g
              key={node.id}
              filter={on ? "url(#node-glow)" : undefined}
              className="transition-opacity duration-700"
              opacity={state === "pending" ? 0.45 : 1}
            >
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx="12"
                fill={on ? "url(#node-fill-on)" : "url(#node-fill)"}
                stroke={STROKE[state]}
                strokeWidth={on ? 1.8 : 1.2}
                className="transition-all duration-700"
              />
              <text
                x={node.x + 20}
                y={node.y + 30}
                fontSize="18"
                fill={on ? "#ffffff" : "var(--text)"}
                className="font-sans font-medium transition-[fill] duration-700"
              >
                {node.label}
              </text>
              <text
                x={node.x + 20}
                y={node.y + 50}
                fontSize="11"
                letterSpacing="1"
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
