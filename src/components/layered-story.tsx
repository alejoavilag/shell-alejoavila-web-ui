"use client";

import { useEffect, useRef, useState } from "react";
import { ArchitectureDiagram, LAYER_ORDER, type LayerId } from "./architecture-diagram";

export type Column = { label: string; sub: string; points: string[] };

export type Section = {
  id: LayerId;
  eyebrow: string;
  title: string;
  lead: string;
  points?: string[];
  columns?: Column[];
};

export function LayeredStory({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<LayerId | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = container.current?.querySelectorAll<HTMLElement>("[data-layer]");
    if (!nodes?.length) return;

    const visible = new Set<Element>();
    const distanceToCenter = (node: Element) => {
      const rect = node.getBoundingClientRect();
      return Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }

        if (!visible.size) return;

        const nearest = [...visible].reduce((best, node) =>
          distanceToCenter(node) < distanceToCenter(best) ? node : best,
        );
        setActive(nearest.getAttribute("data-layer") as LayerId);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const reached = active ? LAYER_ORDER.indexOf(active) : -1;
  const current = sections.find((section) => section.id === active);

  return (
    <div ref={container}>
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden items-center lg:flex"
        style={{ opacity: "var(--dark-mix)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl justify-end px-4">
          <ArchitectureDiagram
            activeLayer={active}
            className="h-[64svh] w-auto [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_58%,transparent_100%)]"
          />
        </div>
      </div>

      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center pb-5 lg:hidden"
        style={{ opacity: "var(--dark-mix)" }}
      >
        <p className="panel flex items-center gap-3 rounded-full px-4 py-2">
          <span aria-hidden className="flex items-center gap-1.5">
            {sections.map((section, index) => (
              <span
                key={section.id}
                className={`block h-1 rounded-full transition-all duration-500 ${
                  index === reached
                    ? "w-6 bg-accent"
                    : index < reached
                      ? "w-3 bg-accent/50"
                      : "w-3 bg-border-strong"
                }`}
              />
            ))}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            {current ? current.eyebrow : "Arquitectura"}
          </span>
        </p>
      </div>

      {sections.map((section) => (
        <section
          key={section.id}
          data-layer={section.id}
          aria-labelledby={`${section.id}-title`}
          className="relative z-10 flex min-h-svh snap-start items-center py-20"
        >
          <div className="mx-auto w-full max-w-6xl px-4 lg:pl-20">
            <article
              data-spine-box
              className="panel panel-pass rounded-2xl p-8 shadow-[0_0_60px_rgba(34,211,238,0.06)] sm:p-10 lg:max-w-[38rem]"
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
              <p className="mt-5 text-lg leading-relaxed text-text-muted">{section.lead}</p>

              {section.points && (
                <ul className="mt-8 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-text-muted">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.columns && (
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {section.columns.map((column) => (
                    <div
                      key={column.label}
                      className="rounded-xl border border-border bg-bg/40 p-5"
                    >
                      <p className="font-medium text-text">{column.label}</p>
                      <p className="mt-0.5 font-mono text-[11px] tracking-[0.1em] text-accent">
                        {column.sub}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {column.points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-sm text-text-muted">
                            <span
                              aria-hidden
                              className="mt-1.5 size-1 shrink-0 rounded-full bg-accent"
                            />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        </section>
      ))}
    </div>
  );
}
