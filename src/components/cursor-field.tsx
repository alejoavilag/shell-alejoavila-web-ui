"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const INTERACTIVE = 'a, button, summary, [role="button"], [data-cursor="grow"]';
const TEXT = "p, li, h1, h2, h3, h4, dd, dt, pre, code, figcaption";

type Shape = "idle" | "interactive" | "text";
const QUERIES = ["(pointer: fine)", "(prefers-reduced-motion: reduce)"];

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((query) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

function isSupported() {
  return (
    window.matchMedia(QUERIES[0]).matches && !window.matchMedia(QUERIES[1]).matches
  );
}

export function CursorField() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<Shape>("idle");
  const enabled = useSyncExternalStore(subscribe, isSupported, () => false);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("cursor-hidden");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { x: target.x, y: target.y };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const node = event.target as Element | null;
      if (node?.closest?.(INTERACTIVE)) setShape("interactive");
      else if (node?.closest?.(TEXT)) setShape("text");
      else setShape("idle");
    };

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.16;
      eased.y += (target.y - eased.y) * 0.16;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%)`;
      }

      root.style.setProperty("--cursor-x", `${eased.x}px`);
      root.style.setProperty("--cursor-y", `${eased.y}px`);

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      root.classList.remove("cursor-hidden");
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="cursor-tint pointer-events-none fixed inset-0 z-50">
      <div
        ref={ring}
        className="cursor-ring absolute top-0 left-0"
        style={{
          width: shape === "interactive" ? 42 : shape === "text" ? 2 : 24,
          height: shape === "text" ? 26 : shape === "interactive" ? 42 : 24,
          borderRadius: shape === "text" ? 1 : 999,
          border: shape === "text" ? "0" : "1.5px solid var(--tint)",
          backgroundColor:
            shape === "text"
              ? "var(--tint)"
              : shape === "interactive"
                ? "color-mix(in srgb, var(--tint) 16%, transparent)"
                : "transparent",
          boxShadow: "0 0 10px color-mix(in srgb, var(--tint) 30%, transparent)",
        }}
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: shape === "text" ? 0 : 7,
          height: shape === "text" ? 0 : 7,
          backgroundColor: "var(--tint)",
          boxShadow: "0 0 10px var(--tint)",
          transition: "width 0.18s ease, height 0.18s ease",
        }}
      />
    </div>
  );
}
