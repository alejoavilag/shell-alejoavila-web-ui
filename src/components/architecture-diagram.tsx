import { layerProgress, type LayerId, type LayerProgress } from "@/domain/architecture/layer";
import { linkId, type ArchitectureModel, type ComponentId } from "@/domain/architecture/model";

type Box = { x: number; y: number; w: number; h: number };

const BOXES: Record<ComponentId, Box> = {
  cdn: { x: 190, y: 40, w: 180, h: 66 },
  shell: { x: 60, y: 190, w: 190, h: 72 },
  widget: { x: 310, y: 190, w: 190, h: 72 },
  api: { x: 160, y: 350, w: 240, h: 72 },
  store: { x: 190, y: 510, w: 180, h: 66 },
};

const WIRES: Record<string, string> = {
  "cdn-shell": "M240 106 V140 Q240 152 228 152 H167 Q155 152 155 164 V190",
  "cdn-widget": "M320 106 V140 Q320 152 332 152 H393 Q405 152 405 164 V190",
  "shell-api": "M155 262 V300 Q155 312 167 312 H228 Q240 312 240 324 V350",
  "widget-api": "M405 262 V300 Q405 312 393 312 H332 Q320 312 320 324 V350",
  "api-store": "M280 422 V510",
};

const SOLDER = [
  { x: 240, y: 106 }, { x: 320, y: 106 },
  { x: 155, y: 190 }, { x: 405, y: 190 },
  { x: 155, y: 262 }, { x: 405, y: 262 },
  { x: 240, y: 350 }, { x: 320, y: 350 },
  { x: 280, y: 422 }, { x: 280, y: 510 },
];

const STROKE: Record<LayerProgress, string> = {
  pending: "var(--trace)",
  visited: "rgba(34, 211, 238, 0.45)",
  active: "var(--accent)",
};

export function ArchitectureDiagram({
  model,
  activeLayer,
  className,
}: {
  model: ArchitectureModel;
  activeLayer: LayerId | null;
  className?: string;
}) {
  const boundary = layerProgress(model.boundary.layer, activeLayer);

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 560 660"
        role="img"
        aria-label={model.summary}
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
          opacity={boundary === "pending" ? 0.35 : 1}
        >
          <rect
            x="14"
            y="14"
            width="532"
            height="632"
            rx="20"
            fill="none"
            stroke={boundary === "active" ? "var(--accent-2)" : STROKE[boundary]}
            strokeWidth="1"
            strokeDasharray="4 8"
            className="transition-[stroke] duration-700"
          />
          <text
            x="34"
            y="632"
            fontSize="12"
            letterSpacing="3"
            fill={boundary === "active" ? "var(--accent-2)" : "var(--text-muted)"}
            className="font-mono uppercase transition-[fill] duration-700"
          >
            {model.boundary.name}
          </text>
        </g>

        {model.links.map((link) => {
          const progress = layerProgress(link.layer, activeLayer);
          return (
            <path
              key={linkId(link)}
              d={WIRES[linkId(link)]}
              fill="none"
              stroke={STROKE[progress]}
              strokeWidth={progress === "active" ? 1.8 : 1.2}
              className="transition-all duration-700"
            />
          );
        })}

        {SOLDER.map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="2.6" fill="var(--trace)" />
        ))}

        {model.links.map((link, i) => {
          const progress = layerProgress(link.layer, activeLayer);
          if (progress === "pending") return null;
          const on = progress === "active";
          return [0, 1].map((n) => (
            <circle
              key={`${linkId(link)}-packet-${n}`}
              r={on ? 3.4 : 2.2}
              fill="var(--accent)"
              opacity={on ? 1 : 0.35}
              className="packet"
              style={{
                offsetPath: `path("${WIRES[linkId(link)]}")`,
                animation: `packet ${on ? 1.8 : 4.4}s linear ${
                  n * (on ? 0.9 : 2.2) + (on ? 0 : i * 0.5)
                }s infinite`,
              }}
            />
          ));
        })}

        {model.components.map((component) => {
          const progress = layerProgress(component.layer, activeLayer);
          const on = progress === "active";
          const box = BOXES[component.id];
          return (
            <g
              key={component.id}
              filter={on ? "url(#node-glow)" : undefined}
              className="transition-opacity duration-700"
              opacity={progress === "pending" ? 0.45 : 1}
            >
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx="12"
                fill={on ? "url(#node-fill-on)" : "url(#node-fill)"}
                stroke={STROKE[progress]}
                strokeWidth={on ? 1.8 : 1.2}
                className="transition-all duration-700"
              />
              <text
                x={box.x + 20}
                y={box.y + 30}
                fontSize="18"
                fill={on ? "#ffffff" : "var(--text)"}
                className="font-sans font-medium transition-[fill] duration-700"
              >
                {component.name}
              </text>
              <text
                x={box.x + 20}
                y={box.y + 50}
                fontSize="11"
                letterSpacing="1"
                fill="var(--text-muted)"
                className="font-mono"
              >
                {component.technology}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">{model.summary}</figcaption>
    </figure>
  );
}
