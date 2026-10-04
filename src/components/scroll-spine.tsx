"use client";

import { useEffect, useRef, useState } from "react";

const WIDTH = 56;
const CENTER = WIDTH / 2;
const AMPLITUDE = 15;

type Point = { x: number; y: number; node: boolean };

function buildPath(points: Point[]) {
  return points.reduce((d, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const previous = points[i - 1];
    const handle = (point.y - previous.y) / 2;
    return `${d} C ${previous.x} ${previous.y + handle}, ${point.x} ${point.y - handle}, ${point.x} ${point.y}`;
  }, "");
}

export function ScrollSpine() {
  const host = useRef<HTMLDivElement>(null);
  const track = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    const measure = () => {
      const base = element.getBoundingClientRect().top + window.scrollY;
      const total = element.offsetHeight;
      const marks = Array.from(
        document.querySelectorAll<HTMLElement>("[data-spine-node]"),
      ).map((mark) => mark.getBoundingClientRect().top + window.scrollY - base);

      const next: Point[] = [
        { x: CENTER, y: 0, node: false },
        ...marks.map((y, i) => ({
          x: CENTER + (i % 2 === 0 ? AMPLITUDE : -AMPLITUDE),
          y,
          node: true,
        })),
        { x: CENTER, y: total, node: false },
      ];

      setHeight(total);
      setPoints(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (track.current) setLength(track.current.getTotalLength());
  }, [points]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let frame = 0;

    const read = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      if (rect.height === 0) return;
      const probe = window.innerHeight * 0.55;
      setProgress(Math.min(1, Math.max(0, (probe - rect.top) / rect.height)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const d = points.length > 1 ? buildPath(points) : "";
  const reached = progress * height;

  return (
    <div
      ref={host}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 hidden w-14 lg:block lg:left-[calc(max(0px,50%-36rem)+0.75rem)]"
    >
      {d && (
        <svg
          width={WIDTH}
          height={height}
          viewBox={`0 0 ${WIDTH} ${height}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient
              id="spine-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={height}
            >
              <stop offset="0%" stopColor="var(--spine-start)" />
              <stop offset="40%" stopColor="var(--spine-start)" />
              <stop offset="100%" stopColor="var(--spine-end)" />
            </linearGradient>
          </defs>

          <path
            ref={track}
            d={d}
            fill="none"
            stroke="var(--spine-track)"
            strokeWidth="2"
          />

          <path
            d={d}
            fill="none"
            stroke="url(#spine-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={length}
            strokeDashoffset={length * (1 - progress)}
          />

          {points
            .filter((point) => point.node)
            .map((point) => {
              const on = point.y <= reached;
              return (
                <g key={point.y}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={on ? 11 : 7}
                    fill="none"
                    stroke={on ? "url(#spine-gradient)" : "var(--spine-track)"}
                    strokeWidth="2"
                    className="transition-all duration-500"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="url(#spine-gradient)"
                    opacity={on ? 1 : 0}
                    className="transition-opacity duration-500"
                  />
                </g>
              );
            })}
        </svg>
      )}
    </div>
  );
}
