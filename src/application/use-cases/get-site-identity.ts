import type { SiteIdentityRepository } from "@/application/ports/site-identity.repository";
import type { SiteIdentity } from "@/domain/content/site";

export function getSiteIdentity(repository: SiteIdentityRepository): SiteIdentity {
  return repository.load();
}
