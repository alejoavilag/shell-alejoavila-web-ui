import { staticArchitectureRepository } from "./architecture/static-architecture.repository";
import { staticLandingContentRepository } from "./content/static-landing-content.repository";
import { staticSiteIdentityRepository } from "./content/static-site-identity.repository";
import { createHttpWidgetRegistry } from "./widget/http-widget-registry";

export const architectureRepository = staticArchitectureRepository;
export const landingContentRepository = staticLandingContentRepository;
export const siteIdentityRepository = staticSiteIdentityRepository;
export const widgetRegistry = createHttpWidgetRegistry();
