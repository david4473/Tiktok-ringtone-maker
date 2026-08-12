import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Set a TikTok Ringtone on iPhone",
  description:
    "Learn how to convert a TikTok sound to an iPhone ringtone, export an M4R file, and finish the iPhone ringtone setup workflow.",
};

export default function IphoneGuidePage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            iPhone Guide
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            How to turn a TikTok sound into an iPhone ringtone
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tone-ink-soft)]">
            If you want a TikTok sound as your iPhone ringtone, the main goal is
            to export a clean `M4R` file and move it into your usual iPhone
            ringtone setup flow.
          </p>
        </section>

        <section className="grid gap-4">
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">1. Copy the TikTok link</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Start with the TikTok video or sound URL you want to use.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">2. Paste the link into the tool</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Load the audio, wait for the waveform, and preview the sound.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">3. Trim the exact clip you want</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Pick the part that sounds best as a ringtone, usually a memorable
              hook, lyric, or audio punchline.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">4. Export the file as M4R</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Choose the iPhone export option so the ringtone downloads in `M4R`
              format, which is the format most commonly used for iPhone ringtone
              imports.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">5. Finish the iPhone import workflow</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Use your preferred Apple-compatible method to import the `M4R`
              file and assign it as your ringtone in iPhone settings.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
