import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what TikTok Ringtone Maker does, who it is for, and how it helps you turn TikTok sounds into ringtones for iPhone and Android.",
};

export default function AboutPage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            About
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            A simple way to turn TikTok sounds into ringtones
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tone-ink-soft)]">
            TikTok Ringtone Maker is a browser-based tool for people who want to
            convert a memorable TikTok sound into a ringtone without opening a
            heavy audio editor. Paste a TikTok link, preview the waveform, trim
            the exact moment you want, and export the result in a format that
            works for your phone.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              Built for speed
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              The app is designed to get you from TikTok link to ringtone file
              quickly, with waveform trimming and streamlined exports.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              Built for clarity
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Instead of burying the action behind menus, the site focuses on a
              single task: helping you isolate the clip you actually want.
            </p>
          </article>
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              Built for phones
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Export `M4R` for iPhone ringtone workflows and `MP3` for Android
              devices using one lightweight web app.
            </p>
          </article>
        </section>

        <section className="tone-panel px-6 py-8 sm:px-8">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--tone-ink)]">
            What this site is for
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                Everyday ringtone creation
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                If you hear a catchy line, chorus, or trending audio clip on
                TikTok and want it as a ringtone, this site helps you extract
                that exact moment.
              </p>
            </div>
            <div className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                Quick preview and trimming
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                The waveform preview lets you trim with more confidence than a
                blind download-and-hope workflow.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
