import type { MetadataRoute } from "next";
import { getSiteIdentity } from "@/application/use-cases/get-site-identity";
import { canonical } from "@/domain/content/site";
import { siteIdentityRepository } from "@/infrastructure/container";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteIdentity(siteIdentityRepository);

  return [
    {
      url: canonical(site),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
