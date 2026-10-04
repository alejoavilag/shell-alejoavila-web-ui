"use client";

import { useEffect } from "react";
import { CircuitField } from "./circuit-field";
import { CodeRain } from "./code-rain";

const DARK_ZONE_ID = "stack";
const LIGHT = { opacity: "calc(1 - var(--dark-mix))" } as const;
const DARK = { opacity: "var(--dark-mix)" } as const;

export function SiteBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const zone = document.getElementById(DARK_ZONE_ID);
      if (!zone) return;
      const top = zone.getBoundingClientRect().top;
      const mix = Math.min(1, Math.max(0, 1 - top / window.innerHeight));
      root.style.setProperty("--dark-mix", mix.toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--dark-mix");
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
