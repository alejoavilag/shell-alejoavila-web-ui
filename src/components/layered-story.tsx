"use client";

import { useEffect, useRef, useState } from "react";
import { ArchitectureDiagram, type LayerId } from "./architecture-diagram";

export type Section = {
  id: LayerId;
  eyebrow: string;
  title: string;
  lead: string;
  points: string[];
};

export function LayeredStory({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<LayerId | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = container.current?.querySelectorAll<HTMLElement>("[data-layer]");
    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActive(visible.target.getAttribute("data-layer") as LayerId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16"
    >
      <div className="order-2 lg:order-1">
        {sections.map((section) => (
          <section
            key={section.id}
            data-layer={section.id}
            aria-labelledby={`${section.id}-title`}
            className="min-h-[70vh] border-t border-border py-16 first:border-t-0"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {section.eyebrow}
            </p>
            <h2
              id={`${section.id}-title`}
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-text-muted">
              {section.lead}
            </p>
            <ul className="mt-8 space-y-3">
              {section.points.map((point) => (
                <li key={point} className="flex gap-3 text-text-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="order-1 lg:order-2">
        <div className="sticky top-8 rounded-xl border border-border bg-surface p-5">
          <ArchitectureDiagram activeLayer={active} />
          <p
            aria-live="polite"
            className="mt-4 text-center font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
          >
            {active ? sections.find((s) => s.id === active)?.eyebrow : "Arquitectura del sitio"}
          </p>
        </div>
      </div>
    </div>
  );
}
