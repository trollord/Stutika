import type { MetadataRoute } from "next";

import { legalNav, nav, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths: string[] = [
    ...nav.map((item) => item.href),
    ...legalNav.map((item) => item.href),
  ];

  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
