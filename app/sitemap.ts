import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: `https://www.sec.hn.cn${route}`,
    lastModified: new Date("2026-04-22"),
  }));
}
