import type { WidgetRegistryRepository } from "@/application/ports/widget-registry.repository";
import { entryUrl, isWellFormed, type WidgetRelease } from "@/domain/widget/release";

export type LoadableWidget = {
  release: WidgetRelease;
  url: string;
};

export async function getWidgetRelease(
  registry: WidgetRegistryRepository,
  signal?: AbortSignal,
): Promise<LoadableWidget> {
  const release = await registry.load(signal);

  if (!isWellFormed(release)) {
    throw new Error("The widget manifest is missing a verifiable digest");
  }

  return { release, url: entryUrl(registry.origin(), release) };
}
