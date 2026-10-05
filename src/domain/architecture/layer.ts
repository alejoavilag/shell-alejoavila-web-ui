export type LayerId = "edge" | "frontend" | "backend" | "data" | "infra";

export const LAYER_ORDER: readonly LayerId[] = [
  "edge",
  "frontend",
  "backend",
  "data",
  "infra",
];

export type LayerProgress = "pending" | "visited" | "active";

export function layerPosition(layer: LayerId): number {
  return LAYER_ORDER.indexOf(layer);
}

export function layerProgress(layer: LayerId, active: LayerId | null): LayerProgress {
  if (!active) return "pending";

  const position = layerPosition(layer);
  const reached = layerPosition(active);

  if (position === reached) return "active";
  return position < reached ? "visited" : "pending";
}
