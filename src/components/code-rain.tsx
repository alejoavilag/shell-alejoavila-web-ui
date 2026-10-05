const GLYPHS = "01</>{}[]=+*#01$&01%AFE01";
const SNIPPETS = [
  "terraform apply",
  "0x1F3A52",
  "npm run build",
  "await fetch()",
  "min_instance=0",
  "SHA-256",
  "export default",
  "01001010",
  "cloud run deploy",
  "<alejo-chat />",
];
const COLUMNS = 22;
const ROWS = 46;

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function buildColumns() {
  const random = seeded(20261002);
  return Array.from({ length: COLUMNS }, (_, i) => {
    const lines = Array.from({ length: ROWS }, () =>
      random() > 0.86
        ? SNIPPETS[Math.floor(random() * SNIPPETS.length)]
        : GLYPHS[Math.floor(random() * GLYPHS.length)],
    ).join("\n");
    return {
      id: i,
      glyphs: `${lines}\n${lines}`,
      left: (i / COLUMNS) * 100 + random() * 2,
      duration: 45 + random() * 65,
      delay: -random() * 50,
      opacity: 0.07 + random() * 0.08,
    };
  });
}

const COLUMN_DATA = buildColumns();

export function CodeRain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 64% 62% at 50% 45%, transparent 8%, #000 88%)",
      }}
    >
      {COLUMN_DATA.map((column) => (
        <pre
          key={column.id}
          className="rain-column absolute top-0 m-0 font-mono text-[10px] leading-[1.9] whitespace-pre text-accent"
          style={{
            left: `${column.left}%`,
            opacity: column.opacity,
            animationDuration: `${column.duration}s`,
            animationDelay: `${column.delay}s`,
          }}
        >
          {column.glyphs}
        </pre>
      ))}
    </div>
  );
}
