import type { MetadataRoute } from "next";
import { publicPagePaths, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPagePaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date("2026-07-04T00:00:00.000Z"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
