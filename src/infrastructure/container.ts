import { staticArchitectureRepository } from "./architecture/static-architecture.repository";
import { staticLandingContentRepository } from "./content/static-landing-content.repository";
import { staticSiteIdentityRepository } from "./content/static-site-identity.repository";

export const architectureRepository = staticArchitectureRepository;
export const landingContentRepository = staticLandingContentRepository;
export const siteIdentityRepository = staticSiteIdentityRepository;
