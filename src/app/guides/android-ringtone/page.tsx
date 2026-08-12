import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Set a TikTok Ringtone on Android",
  description:
    "Learn how to convert a TikTok sound to an Android ringtone, export MP3 audio, and apply it in Android ringtone settings.",
};

export default function AndroidGuidePage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            Android Guide
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            How to make a TikTok sound your Android ringtone
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tone-ink-soft)]">
            Android ringtone setup is often simpler because `MP3` works well for
            many devices. This guide walks through the common flow.
          </p>
        </section>

        <section className="grid gap-4">
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">1. Paste the TikTok link</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Add the TikTok sound or video URL to the ringtone maker.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">2. Wait for the waveform preview</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Once the waveform loads, preview the audio and find the moment you
              want your phone to play.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">3. Export as MP3</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Use the Android export option to download an `MP3` ringtone file.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">4. Assign it in Android settings</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Open your ringtone or sound settings and select the downloaded
              file as your default ringtone or notification tone.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
