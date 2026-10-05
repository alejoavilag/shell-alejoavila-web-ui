import type { WidgetRelease } from "@/domain/widget/release";

export interface WidgetRegistryRepository {
  origin(): string;
  load(signal?: AbortSignal): Promise<WidgetRelease>;
}
