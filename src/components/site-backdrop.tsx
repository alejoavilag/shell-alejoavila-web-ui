"use client";

import { useEffect } from "react";
import { CircuitField } from "./circuit-field";
import { CodeRain } from "./code-rain";

const FADE_ID = "zone-fade";

export function SiteBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const band = document.getElementById(FADE_ID);
      if (!band) return;
      const rect = band.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const mix = Math.min(1, Math.max(0, 1 - center / window.innerHeight));
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
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity: "var(--dark-mix)" }}
    >
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
  );
}
