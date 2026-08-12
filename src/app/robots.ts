import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://tiktok-ringtone-maker.vercel.app/sitemap.xml",
    host: "https://tiktok-ringtone-maker.vercel.app",
  };
}
