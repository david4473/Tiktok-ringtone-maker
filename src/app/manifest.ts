import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TikTok Ringtone Maker",
    short_name: "Toneify",
    description:
      "Convert TikTok sounds into custom iPhone and Android ringtones online.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef8f9",
    theme_color: "#ff6b4a",
    lang: "en",
  };
}
