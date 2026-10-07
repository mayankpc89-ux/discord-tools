import type { MetadataRoute } from "next";

const base = "https://discord-tools-two.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/timestamp",
    "/snowflake",
    "/permissions",
    "/color",
    "/markdown",
    "/emoji",
    "/invite",
  ];

  return paths.map((path, index) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}


