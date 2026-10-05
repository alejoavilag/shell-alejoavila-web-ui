"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { getWidgetRelease, type LoadableWidget } from "@/application/use-cases/get-widget-release";
import { shortDigest } from "@/domain/widget/release";
import { widgetRegistry } from "@/infrastructure/container";

type State =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "ready"; widget: LoadableWidget }
  | { phase: "failed"; reason: string };

async function mount(widget: LoadableWidget): Promise<void> {
  const existing = document.querySelector(`script[data-widget="${widget.release.name}"]`);

  if (!existing) {
    const script = document.createElement("script");
    script.type = "module";
    script.src = widget.url;
    script.integrity = widget.release.integrity;
    script.crossOrigin = "anonymous";
    script.dataset["widget"] = widget.release.name;

    const settled = new Promise<void>((resolve, reject) => {
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("El navegador rechazó el bundle")),
        { once: true },
      );
    });

    document.head.append(script);
    await settled;
  }

  await customElements.whenDefined(widget.release.element);
}

export function RuntimeWidget() {
  const anchor = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({ phase: "idle" });

  useEffect(() => {
    const element = anchor.current;
    if (!element) return;

    const controller = new AbortController();
    let started = false;

    const begin = async () => {
      if (started) return;
      started = true;
      setState({ phase: "loading" });

      try {
        const widget = await getWidgetRelease(widgetRegistry, controller.signal);
        await mount(widget);
        if (!controller.signal.aborted) setState({ phase: "ready", widget });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          phase: "failed",
          reason: error instanceof Error ? error.message : "No se pudo cargar",
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void begin();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);

  const release = state.phase === "ready" ? state.widget.release : null;

  const snippet =
    state.phase === "ready"
      ? [
          `<script type="module"`,
          `        src="${state.widget.url}"`,
          `        integrity="${release!.integrity}"`,
          `        crossorigin="anonymous"></script>`,
          ``,
          `<${release!.element}></${release!.element}>`,
        ].join("\n")
      : null;

  return (
    <div ref={anchor} className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-h-[18rem]">
        {state.phase === "ready" &&
          createElement(release!.element, { "aria-label": "Asistente sobre el perfil" })}

        {state.phase !== "ready" && (
          <div className="flex h-full min-h-[18rem] items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {state.phase === "failed"
                ? `El widget no cargó: ${state.reason}. La página sigue funcionando sin él, que es la idea de componer en runtime.`
                : "Cargando el widget desde su propio despliegue…"}
            </p>
          </div>
        )}
      </div>

      <dl className="h-fit divide-y divide-border rounded-2xl border border-border bg-surface font-mono text-xs">
        {[
          ["Origen", new URL(widgetRegistry.origin()).host],
          ["Versión", release ? `v${release.version}` : "—"],
          ["Framework", release?.framework ?? "—"],
          ["Tamaño", release ? `${(release.bytes / 1024).toFixed(1)} kB` : "—"],
          ["Integridad", release ? shortDigest(release) : "—"],
          ["Elemento", release ? `<${release.element}>` : "—"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-3">
            <dt className="tracking-[0.1em] text-text-muted uppercase">{label}</dt>
            <dd className="text-right break-all text-accent">{value}</dd>
          </div>
        ))}
      </dl>

      {snippet && (
        <div className="lg:col-span-2">
          <p className="font-mono text-[11px] tracking-[0.22em] text-text-muted uppercase">
            Móntalo en tu propio sitio
          </p>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-bg/60 p-4 font-mono text-[11px] leading-relaxed text-text-muted">
            {snippet}
          </pre>
        </div>
      )}
    </div>
  );
}
