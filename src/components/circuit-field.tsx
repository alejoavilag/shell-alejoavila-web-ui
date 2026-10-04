type Trace = { d: string; dur: number; delay: number };
type Via = { x: number; y: number; delay: number };

const TRACES: Trace[] = [
  { d: "M0 118 H78 Q104 118 104 144 V296 Q104 322 130 322 H214", dur: 9, delay: 0 },
  { d: "M0 402 H54 Q80 402 80 428 V598 Q80 624 106 624 H168", dur: 11, delay: 2.4 },
  { d: "M0 742 H146 Q172 742 172 716 V534 Q172 508 198 508 H252", dur: 13, delay: 5.1 },
  { d: "M1440 196 H1336 Q1310 196 1310 222 V374 Q1310 400 1284 400 H1206", dur: 10, delay: 1.3 },
  { d: "M1440 528 H1364 Q1338 528 1338 554 V712 Q1338 738 1312 738 H1248", dur: 12, delay: 3.8 },
  { d: "M1440 820 H1272 Q1246 820 1246 794 V640 Q1246 614 1220 614 H1178", dur: 14, delay: 6.5 },
];

const VIAS: Via[] = [
  { x: 214, y: 322, delay: 0 },
  { x: 104, y: 144, delay: 1.1 },
  { x: 168, y: 624, delay: 2.2 },
  { x: 80, y: 428, delay: 3.3 },
  { x: 252, y: 508, delay: 0.6 },
  { x: 1206, y: 400, delay: 1.7 },
  { x: 1310, y: 222, delay: 2.8 },
  { x: 1248, y: 738, delay: 0.9 },
  { x: 1338, y: 554, delay: 3.9 },
  { x: 1178, y: 614, delay: 2.1 },
];

export function CircuitField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[2] overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 55% 60% at 45% 45%, transparent 20%, #000 90%)",
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g fill="none" stroke="var(--accent)" strokeOpacity="0.14" strokeWidth="1">
          {TRACES.map((trace) => (
            <path key={trace.d} d={trace.d} />
          ))}
        </g>

        {TRACES.map((trace) => (
          <circle
            key={`pulse-${trace.d}`}
            r="2"
            fill="var(--accent)"
            className="circuit-pulse"
            style={{
              offsetPath: `path("${trace.d}")`,
              animationDuration: `${trace.dur}s`,
              animationDelay: `${trace.delay}s`,
            }}
          />
        ))}

        {VIAS.map((via) => (
          <g key={`${via.x}-${via.y}`}>
            <circle
              cx={via.x}
              cy={via.y}
              r="7"
              fill="var(--accent)"
              className="circuit-via-halo"
              style={{ animationDelay: `${via.delay}s` }}
            />
            <circle cx={via.x} cy={via.y} r="2.4" fill="var(--accent)" fillOpacity="0.35" />
          </g>
        ))}
      </svg>
    </div>
  );
}
