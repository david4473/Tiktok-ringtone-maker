import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Ringtone Troubleshooting",
  description:
    "Fix common TikTok ringtone maker issues like loading failures, waveform errors, export problems, and weak network interruptions.",
};

export default function TroubleshootingGuidePage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            Troubleshooting
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            TikTok ringtone maker troubleshooting guide
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tone-ink-soft)]">
            If a TikTok sound does not load cleanly or the export fails, these
            are the first things to check.
          </p>
        </section>

        <section className="grid gap-4">
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              The waveform is stuck loading
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Check your network connection, reload the page, and try the link
              again. If the source is slow, wait for the app to finish its
              recovery download.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              Playback stops during preview
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              A weak connection can interrupt the initial stream. The app now
              falls back to a downloaded copy when possible, but retrying the
              same link can still help if the source was unstable.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              Export is not working
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Wait until the waveform is fully prepared, then export again. If
              the browser session is under memory pressure, refreshing and
              trimming a shorter clip may help.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              The file does not show up as a ringtone
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Make sure you exported the right format for your phone. iPhone
              needs `M4R`, while Android commonly uses `MP3`.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
