import type { LayerId } from "./layer";

export type ComponentId = "cdn" | "shell" | "widget" | "api" | "store";

export type ArchitectureComponent = {
  id: ComponentId;
  layer: LayerId;
  name: string;
  technology: string;
};

export type ArchitectureLink = {
  from: ComponentId;
  to: ComponentId;
  layer: LayerId;
};

export type ArchitectureBoundary = {
  layer: LayerId;
  name: string;
};

export type ArchitectureModel = {
  components: ArchitectureComponent[];
  links: ArchitectureLink[];
  boundary: ArchitectureBoundary;
  summary: string;
};

export function linkId(link: ArchitectureLink): string {
  return `${link.from}-${link.to}`;
}

export function componentsInLayer(
  model: ArchitectureModel,
  layer: LayerId,
): ArchitectureComponent[] {
  return model.components.filter((component) => component.layer === layer);
}

export function hasParallelComponents(model: ArchitectureModel, layer: LayerId): boolean {
  return componentsInLayer(model, layer).length > 1;
}
