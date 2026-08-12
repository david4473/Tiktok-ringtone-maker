import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Browse guides for turning TikTok sounds into ringtones, setting ringtones on iPhone and Android, and troubleshooting export issues.",
};

const guides = [
  {
    href: "/guides/iphone-ringtone",
    title: "How to set a TikTok ringtone on iPhone",
    description:
      "Learn the practical steps for exporting a TikTok sound as M4R and using it in an iPhone ringtone workflow.",
  },
  {
    href: "/guides/android-ringtone",
    title: "How to set a TikTok ringtone on Android",
    description:
      "Create an MP3 ringtone from TikTok audio and apply it on Android devices with fewer steps.",
  },
  {
    href: "/guides/tiktok-ringtone-troubleshooting",
    title: "TikTok ringtone troubleshooting guide",
    description:
      "Fix common problems with loading audio, exporting clips, and getting your ringtone ready for your phone.",
  },
];

export default function GuidesPage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            Guides
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            Helpful guides for TikTok ringtone creation
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tone-ink-soft)]">
            These guides are here to help you go from TikTok sound to finished
            ringtone with fewer dead ends.
          </p>
        </section>

        <section className="grid gap-4">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="tone-info-card block">
              <h2 className="text-xl font-black tracking-[-0.04em] text-[var(--tone-ink)]">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                {guide.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
