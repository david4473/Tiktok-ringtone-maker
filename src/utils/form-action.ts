"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function formAction(url: string) {
  const req = await fetch(`${BASE_URL}/api/downloader`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const res = await req.json();

  return res;
}
