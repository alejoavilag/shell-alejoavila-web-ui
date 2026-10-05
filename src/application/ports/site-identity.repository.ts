import type { SiteIdentity } from "@/domain/content/site";

export interface SiteIdentityRepository {
  load(): SiteIdentity;
}
