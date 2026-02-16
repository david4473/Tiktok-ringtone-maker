// @ts-check

import { Downloader} from "@tobyg74/tiktok-api-dl";

async function retryDownload(url: string, versions: ("v1" | "v2")[]) {
  for (const version of versions) {
    try {
      const response = await Downloader(url, { version });

      if (response.status === "success") {
        return { response, version };
      }
    } catch (error) {
      console.warn(`Failed to download file with: ${version}`, error);
    }
  }

  return null;
}

export async function getTikTokAudio(url: string) {
  if (!url || !url.includes("tiktok.com")) {
    throw new Error("Invalid TikTok URL");
  }

  const result = await retryDownload(url, ["v1", "v2"]);

  if (!result) {
    throw new Error("Failed to download TikTok audio");
  }

  return {
    data: result.response,
    ver: result.version,
  };
}
