import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
];

export default sitemap;
