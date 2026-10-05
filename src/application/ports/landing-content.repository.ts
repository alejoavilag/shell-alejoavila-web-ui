import type { LandingContent } from "@/domain/content/landing";

export interface LandingContentRepository {
  load(): LandingContent;
}
