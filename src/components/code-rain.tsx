const GLYPHS = "01</>{}[]=+*#$&%016AFE";
const COLUMNS = 14;
const ROWS = 34;

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
    const glyphs = Array.from(
      { length: ROWS },
      () => GLYPHS[Math.floor(random() * GLYPHS.length)],
    ).join("\n");
    return {
      id: i,
      glyphs: `${glyphs}\n${glyphs}`,
      left: (i / COLUMNS) * 100 + random() * 3,
      duration: 26 + random() * 34,
      delay: -random() * 30,
      opacity: 0.05 + random() * 0.05,
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
        maskImage: "linear-gradient(to bottom, #000 0%, transparent 85%)",
      }}
    >
      {COLUMN_DATA.map((column) => (
        <pre
          key={column.id}
          className="rain-column absolute top-0 m-0 font-mono text-[11px] leading-5 text-accent"
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
