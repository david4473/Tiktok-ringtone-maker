"use server";

import { getTikTokAudio } from "@/lib/tiktok";

export async function formAction(url: string) {
  const result = await getTikTokAudio(url);
  return result;
}
