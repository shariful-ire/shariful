import { getSections } from "@/lib/api/sections";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const sections = await getSections().catch(() => []);
  const lastModified = sections
    .map((s) => new Date(s.updatedAt))
    .sort((a, b) => b - a)[0];

  return [
    {
      url: SITE_URL,
      lastModified: lastModified || new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
