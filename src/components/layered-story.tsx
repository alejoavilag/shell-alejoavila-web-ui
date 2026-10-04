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
        setActive(
          visible ? (visible.target.getAttribute("data-layer") as LayerId) : null,
        );
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_minmax(0,21rem)] lg:gap-14 lg:pl-20"
    >
      <div className="order-2 lg:order-1">
        {sections.map((section) => (
          <section
            key={section.id}
            data-layer={section.id}
            aria-labelledby={`${section.id}-title`}
            className="min-h-[70vh] border-t border-border py-16 first:border-t-0"
          >
            <p
              data-spine-node
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
            >
              <span aria-hidden className="h-px w-8 bg-accent" />
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
        <div className="panel sticky top-6 rounded-2xl p-5 shadow-[0_0_70px_rgba(34,211,238,0.07)] lg:mt-24">
          <ArchitectureDiagram activeLayer={active} />
          <p
            aria-live="polite"
            className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            {active ? sections.find((s) => s.id === active)?.eyebrow : "Arquitectura del sitio"}
          </p>
        </div>
      </div>
    </div>
  );
}
