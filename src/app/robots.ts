import type { MetadataRoute } from "next";
import { getSiteIdentity } from "@/application/use-cases/get-site-identity";
import { canonical } from "@/domain/content/site";
import { siteIdentityRepository } from "@/infrastructure/container";

const ANSWER_ENGINES = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteIdentity(siteIdentityRepository);

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ANSWER_ENGINES.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: canonical(site, "/sitemap.xml"),
    host: site.url,
  };
}
