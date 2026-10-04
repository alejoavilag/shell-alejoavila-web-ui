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
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container}>
      <div
        className="pointer-events-none fixed inset-y-0 z-20 hidden w-[20rem] items-center lg:flex lg:right-[calc(max(1rem,50%-36rem)+1rem)]"
        style={{ opacity: "var(--dark-mix)" }}
      >
        <div className="panel w-full rounded-2xl p-5 shadow-[0_0_70px_rgba(34,211,238,0.08)]">
          <ArchitectureDiagram activeLayer={active} />
          <p
            aria-live="polite"
            className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            {active ? sections.find((s) => s.id === active)?.eyebrow : "Arquitectura del sitio"}
          </p>
        </div>
      </div>

      {sections.map((section) => (
        <section
          key={section.id}
          data-layer={section.id}
          aria-labelledby={`${section.id}-title`}
          className="flex min-h-dvh snap-start items-center py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-4 lg:pr-[22rem] lg:pl-20">
            <article
              data-spine-box
              className="panel panel-pass rounded-2xl p-8 shadow-[0_0_60px_rgba(34,211,238,0.05)] sm:p-10"
            >
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
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
            </article>
          </div>
        </section>
      ))}
    </div>
  );
}
