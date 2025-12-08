import { Downloader } from "@tobyg74/tiktok-api-dl";

async function retryDownload(url: string, versions: string[]) {
  for (const version of versions) {
    try {
      const response = await Downloader(url, {
        // prettier-ignore
        version: version as "v1" || "v2",
      });

      if (response.status == "success") {
        return { response, version };
      }
    } catch (error) {
      console.warn(`Failed to download file with: ${version}`, error);
    }

    return undefined;
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url && !url.includes("tiktok.com")) {
      new Response(
        JSON.stringify({ error: "Invalid URL, or missing Tiktok url" }),
        {
          status: 400,
        }
      );
    }

    const res = await retryDownload(url, ["v1", "v2"]);

    return new Response(
      JSON.stringify({
        data: res?.response,
        ver: res?.version,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending response:", error);
    new Response(
      JSON.stringify({
        error: "Failed to process Tiktok sound",
      }),
      {
        status: 500,
      }
    );
  }
}
