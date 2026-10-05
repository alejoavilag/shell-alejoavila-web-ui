import type { WidgetRegistryRepository } from "@/application/ports/widget-registry.repository";
import type { WidgetRelease } from "@/domain/widget/release";

const ORIGIN = "https://widgets.alejoavila.com/chat/";

function asRelease(payload: unknown): WidgetRelease {
  if (typeof payload !== "object" || payload === null) {
    throw new Error("The widget manifest is not an object");
  }

  const manifest = payload as Record<string, unknown>;
  const text = (key: string): string => {
    const value = manifest[key];
    if (typeof value !== "string" || !value) {
      throw new Error(`The widget manifest has no ${key}`);
    }
    return value;
  };

  return {
    name: text("name"),
    version: text("version"),
    entry: text("entry"),
    integrity: text("integrity"),
    element: text("element"),
    framework: text("framework"),
    bytes: typeof manifest["bytes"] === "number" ? manifest["bytes"] : 0,
  };
}

export function createHttpWidgetRegistry(origin = ORIGIN): WidgetRegistryRepository {
  return {
    origin: () => origin,

    async load(signal) {
      const response = await fetch(new URL("manifest.json", origin), {
        signal,
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        throw new Error(`The widget manifest answered ${response.status}`);
      }

      return asRelease(await response.json());
    },
  };
}
