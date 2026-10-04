"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const APPROACH = 70;
const EDGE_PADDING = 26;
const SAMPLES = 220;
const FLOW_PERIOD = 220;

const WIDE = { laneGap: 46, boxInset: 18, minWidth: 5, maxWidth: 30 };
const NARROW = { laneGap: 0, boxInset: 0, minWidth: 3, maxWidth: 11 };

type Stop = { top: number; bottom: number; left: number };
type Vec = { x: number; y: number };
type Geometry = {
  width: number;
  height: number;
  d: string;
  minWidth: number;
  maxWidth: number;
};

function smooth(points: Vec[]) {
  return points.reduce((d, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const previous = points[i - 1];
    const handle = (point.y - previous.y) / 2.3;
    return `${d} C ${previous.x} ${previous.y + handle}, ${point.x} ${point.y - handle}, ${point.x} ${point.y}`;
  }, "");
}

function centerline(stops: Stop[], lane: number, edge: number, height: number) {
  const points: Vec[] = [{ x: lane, y: 0 }];

  const push = (x: number, y: number) => {
    const last = points[points.length - 1];
    points.push({ x, y: Math.max(y, last.y + 1) });
  };

  for (const stop of stops) {
    push(lane, stop.top - APPROACH);
    push(edge, stop.top + EDGE_PADDING);
    push(edge, stop.bottom - EDGE_PADDING);
    push(lane, stop.bottom + APPROACH);
  }

  push(lane, height);
  return points;
}

function ribbon(samples: Vec[], minWidth: number, maxWidth: number) {
  if (samples.length < 2) return "";
  const last = samples.length - 1;
  const left: Vec[] = [];
  const right: Vec[] = [];

  samples.forEach((point, i) => {
    const before = samples[Math.max(0, i - 1)];
    const after = samples[Math.min(last, i + 1)];
    const length = Math.hypot(after.x - before.x, after.y - before.y) || 1;
    const nx = -(after.y - before.y) / length;
    const ny = (after.x - before.x) / length;
    const half = (minWidth + (maxWidth - minWidth) * Math.pow(i / last, 0.8)) / 2;
    left.push({ x: point.x + nx * half, y: point.y + ny * half });
    right.push({ x: point.x - nx * half, y: point.y - ny * half });
  });

  return [...left, ...right.reverse()]
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");
}

export function ScrollSpine() {
  const host = useRef<HTMLDivElement>(null);
  const centerPath = useRef<SVGPathElement>(null);
  const clip = useRef<SVGRectElement>(null);
  const head = useRef<SVGGElement>(null);
  const trail = useRef<Vec[]>([]);

  const [geometry, setGeometry] = useState<Geometry>({
    width: 0,
    height: 0,
    d: "",
    minWidth: WIDE.minWidth,
    maxWidth: WIDE.maxWidth,
  });
  const [samples, setSamples] = useState<Vec[]>([]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    const measure = () => {
      const frame = element.getBoundingClientRect();
      if (frame.width === 0) return;

      const marks = Array.from(
        element.parentElement?.querySelectorAll<HTMLElement>("[data-spine-box]") ?? [],
      ).map((mark) => {
        const rect = mark.getBoundingClientRect();
        return {
          top: rect.top - frame.top,
          bottom: rect.bottom - frame.top,
          left: rect.left - frame.left,
        };
      });

      if (!marks.length) return;

      const columnLeft = marks.reduce(
        (min, mark) => Math.min(min, mark.left),
        Number.POSITIVE_INFINITY,
      );

      const tight = columnLeft < 90;
      const scale = tight ? NARROW : WIDE;
      const lane = tight
        ? Math.max(5, columnLeft / 2 - 3)
        : Math.max(14, columnLeft - scale.laneGap);
      const edge = tight ? lane + 7 : columnLeft - scale.boxInset;

      setGeometry({
        width: frame.width,
        height: element.offsetHeight,
        d: smooth(centerline(marks, lane, edge, element.offsetHeight)),
        minWidth: scale.minWidth,
        maxWidth: scale.maxWidth,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const path = centerPath.current;
    if (!path || !geometry.d) return;

    const total = path.getTotalLength();
    const next = Array.from({ length: SAMPLES + 1 }, (_, i) => {
      const point = path.getPointAtLength((total * i) / SAMPLES);
      return { x: point.x, y: point.y };
    });

    trail.current = next;
    setSamples(next);
  }, [geometry.d]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let frame = 0;

    const draw = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      if (rect.height === 0) return;

      const probe = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (probe - rect.top) / rect.height));

      clip.current?.setAttribute("height", String(progress * rect.height));

      const points = trail.current;
      if (points.length && head.current) {
        const index = Math.min(
          points.length - 1,
          Math.max(0, Math.round(progress * (points.length - 1))),
        );
        const point = points[index];
        head.current.setAttribute("transform", `translate(${point.x} ${point.y})`);
        head.current.setAttribute("opacity", progress > 0.004 && progress < 0.999 ? "1" : "0");
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [samples]);

  const shape = useMemo(
    () => ribbon(samples, geometry.minWidth, geometry.maxWidth),
    [samples, geometry.minWidth, geometry.maxWidth],
  );

  return (
    <div ref={host} aria-hidden className="pointer-events-none absolute inset-0 z-10">
      {geometry.d && (
        <svg
          width={geometry.width}
          height={geometry.height}
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient
              id="ribbon-fill"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={geometry.height}
            >
              <stop offset="0%" stopColor="var(--spine-start)" />
              <stop offset="38%" stopColor="var(--spine-start)" />
              <stop offset="72%" stopColor="var(--spine-mid)" />
              <stop offset="100%" stopColor="var(--spine-end)" />
            </linearGradient>
            <linearGradient
              id="ribbon-flow"
              gradientUnits="userSpaceOnUse"
              spreadMethod="repeat"
              x1="0"
              y1="0"
              x2="0"
              y2={FLOW_PERIOD}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.32" />
              <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="ribbon-clip">
              <rect ref={clip} x="0" y="0" width={geometry.width} height="0" />
            </clipPath>
            {shape && (
              <clipPath id="ribbon-shape">
                <polygon points={shape} />
              </clipPath>
            )}
          </defs>

          <path ref={centerPath} d={geometry.d} fill="none" stroke="none" />

          {shape && (
            <>
              <polygon points={shape} fill="var(--spine-track)" opacity="0.16" />
              <g className="ribbon-glow">
                <polygon points={shape} fill="url(#ribbon-fill)" clipPath="url(#ribbon-clip)" />
              </g>
              <g clipPath="url(#ribbon-shape)">
                <g clipPath="url(#ribbon-clip)">
                  <rect
                    className="ribbon-flow"
                    x="0"
                    y={-FLOW_PERIOD}
                    width={geometry.width}
                    height={geometry.height + FLOW_PERIOD * 2}
                    fill="url(#ribbon-flow)"
                  />
                </g>
              </g>
              <g ref={head} opacity="0">
                <circle r="16" fill="var(--spine-end)" opacity="0.14" />
                <circle r="5" fill="var(--spine-end)" />
              </g>
            </>
          )}
        </svg>
      )}
    </div>
  );
}
