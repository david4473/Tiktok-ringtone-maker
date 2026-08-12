import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = "https://tiktok-ringtone-maker.vercel.app";
  const lastModified = new Date();

  return [
    {
      url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
