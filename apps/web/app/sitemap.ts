import type { MetadataRoute } from "next";
import { getPublishedCatalogPaths } from "@/lib/catalog";
import { getLessonsForPath } from "@/lib/mdx";
import { getAppUrl } from "@/lib/env";
import { ALL_RESOURCES, RESOURCE_CATEGORIES } from "@/lib/data/resources";

function safeDate(value: string | null | undefined): Date {
  if (!value || value === "unknown") return new Date();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getAppUrl();
  const paths = await getPublishedCatalogPaths();

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/paths`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/setup-academy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/prompt-context-studio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/asset-vault`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/trust`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/troubleshooting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/compatibility`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/support`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Learning paths
  for (const p of paths) {
    if (p.status === "available") {
      entries.push({
        url: `${baseUrl}/paths/${p.slug}`,
        lastModified: safeDate(p.lastReviewedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      });

      const lessons = await getLessonsForPath(p.slug);
      for (const lesson of lessons) {
        entries.push({
          url: `${baseUrl}/learn/${p.slug}/${lesson.slug}`,
          lastModified: safeDate(lesson.lastReviewedAt),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Resource categories
  for (const cat of RESOURCE_CATEGORIES) {
    entries.push({
      url: `${baseUrl}/resources/${cat.key}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Individual resources
  for (const r of ALL_RESOURCES) {
    entries.push({
      url: `${baseUrl}/resources/${r.category}/${r.slug}`,
      lastModified: safeDate(r.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
