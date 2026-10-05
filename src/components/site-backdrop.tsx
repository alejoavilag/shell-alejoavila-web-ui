"use client";

import { useEffect } from "react";
import { CircuitField } from "./circuit-field";
import { CodeRain } from "./code-rain";

const DARK_ZONE_ID = "stack";
const TO_DARK = 0.085;
const TO_LIGHT = 0.24;
const SETTLED = 0.002;

const LIGHT = { opacity: "calc(1 - var(--dark-mix))" } as const;
const DARK = { opacity: "var(--dark-mix)" } as const;

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function SiteBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    const current = { dark: 0, diagram: 0 };
    const target = { dark: 0, diagram: 0 };
    let frame = 0;

    const read = () => {
      const zone = document.getElementById(DARK_ZONE_ID);
      if (!zone) return;

      const rect = zone.getBoundingClientRect();
      const viewport = window.innerHeight;
      const entering = smoothstep(1 - rect.top / viewport);

      target.dark = entering;
      target.diagram = entering * smoothstep(rect.bottom / viewport);
    };

    const ease = (from: number, to: number) =>
      from + (to - from) * (to > from ? TO_DARK : TO_LIGHT);

    const step = () => {
      current.dark = ease(current.dark, target.dark);
      current.diagram = ease(current.diagram, target.diagram);

      const settled =
        Math.abs(target.dark - current.dark) < SETTLED &&
        Math.abs(target.diagram - current.diagram) < SETTLED;

      if (settled) {
        current.dark = target.dark;
        current.diagram = target.diagram;
      }

      root.style.setProperty("--dark-mix", current.dark.toFixed(3));
      root.style.setProperty("--diagram-mix", current.diagram.toFixed(3));

      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const schedule = () => {
      read();
      if (!frame) frame = requestAnimationFrame(step);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--dark-mix");
      root.style.removeProperty("--diagram-mix");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--paper)]" style={LIGHT} />

      <div className="absolute inset-0" style={LIGHT}>
        <div className="backdrop-dots-light absolute inset-0" />
        <div className="backdrop-reveal-light cursor-reveal absolute inset-0" />
        <div className="backdrop-aurora-light absolute inset-0" />
      </div>

      <div className="absolute inset-0" style={DARK}>
        <div className="backdrop-dots absolute inset-0" />
        <div className="absolute inset-0">
          <CircuitField />
        </div>
        <div className="cursor-reveal absolute inset-0">
          <CircuitField strokeOpacity={0.55} animated={false} />
        </div>
        <CodeRain />
        <div className="backdrop-aurora absolute inset-0" />
        <div className="cursor-spotlight absolute inset-0" />
      </div>
    </div>
  );
}
