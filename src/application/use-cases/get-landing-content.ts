import type { LandingContentRepository } from "@/application/ports/landing-content.repository";
import type { LandingContent } from "@/domain/content/landing";

export function getLandingContent(repository: LandingContentRepository): LandingContent {
  return repository.load();
}
