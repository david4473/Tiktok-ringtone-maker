"use client";

import Editor from "@/components/Editor";
import Form from "@/components/form";
import useStateData from "@/hooks/useStateData";
import { AudioLines, Scissors, ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";
import { HashLoader } from "react-spinners";

export default function Home() {
  const { data, submitted } = useStateData();
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TikTok Ringtone Maker",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description:
      "Convert TikTok sounds into custom iPhone and Android ringtones online by trimming audio and exporting M4R or MP3 files.",
    url: "https://tiktok-ringtone-maker.vercel.app/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I turn a TikTok sound into a ringtone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paste a TikTok video link, wait for the waveform to load, trim the exact part you want, then export the ringtone as M4R for iPhone or MP3 for Android.",
        },
      },
      {
        "@type": "Question",
        name: "Can I make iPhone and Android ringtones from TikTok audio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The app lets you export M4R files for iPhone and MP3 files for Android so you can use the same TikTok sound on either device.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install software to use this TikTok ringtone maker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Everything runs in the browser, so you can trim the audio, preview it, and export your ringtone online without installing a desktop app.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--tone-bg)] px-4 py-6 sm:px-6 sm:py-10">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <section className="tone-hero overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-14">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--tone-border)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--tone-ink-soft)]">
            <AudioLines className="h-3.5 w-3.5" />
            TikTok Ringtone Maker
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-6xl">
            Convert TikTok sounds into iPhone and Android ringtones.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--tone-ink-soft)] sm:text-lg">
            Paste a TikTok link, preview the waveform, trim the exact clip you
            want, and export a ringtone for iPhone or Android in seconds.
          </p>

          <div className="mt-8">
            <Form />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--tone-ink-soft)]">
            <span className="tone-badge">TikTok to ringtone converter</span>
            <span className="tone-badge">Fast waveform trimming</span>
            <span className="tone-badge">iPhone and Android export</span>
          </div>
        </section>

        {submitted ? (
          <div className="tone-panel flex min-h-[26rem] w-full flex-col items-center justify-center px-6 py-10 text-center">
            <HashLoader color="#ff6b4a" size={42} />
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
              Loading audio
            </p>
            <p className="mt-3 max-w-sm text-lg leading-8 text-[var(--tone-ink)]">
              Fetching the sound and preparing the trim region.
            </p>
          </div>
        ) : data ? (
          <Editor />
        ) : (
          <div className="tone-panel flex min-h-[24rem] w-full flex-col items-center justify-center px-6 py-10 text-center">
            <AudioLines className="h-12 w-12 text-[var(--tone-accent)]" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
              Editor ready
            </p>
            <p className="mt-3 max-w-md text-lg leading-8 text-[var(--tone-ink)]">
              Your waveform editor will appear here as soon as you load a TikTok
              link above.
            </p>
          </div>
        )}

        <section className="grid gap-4 pt-2 sm:grid-cols-3">
          <div className="tone-info-card">
            <div className="tone-info-icon">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[var(--tone-ink)]">
              Simple flow
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
              Paste the link first. Everything else stays out of the way until
              the audio is ready.
            </p>
          </div>

          <div className="tone-info-card">
            <div className="tone-info-icon">
              <Scissors className="h-4 w-4" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[var(--tone-ink)]">
              Trim precisely
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
              Wait for the selector to load, then drag the region until the cut
              feels exactly right.
            </p>
          </div>

          <div className="tone-info-card">
            <div className="tone-info-icon">
              <Smartphone className="h-4 w-4" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[var(--tone-ink)]">
              Export cleanly
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
              Choose `.m4r` for iPhone or `.mp3` for Android and save your tone.
            </p>
          </div>
        </section>

        <section className="tone-panel px-6 py-8 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--tone-ink)]">
              How to make a ringtone from a TikTok video
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--tone-ink-soft)]">
              This TikTok ringtone maker is designed for speed. Paste the video
              URL, let the audio load, drag the waveform handles to isolate the
              best moment, then download your ringtone in the right format for
              your phone.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                1. Paste a TikTok link
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
                Drop in the TikTok URL for the sound or video you want to turn
                into a ringtone.
              </p>
            </article>
            <article className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                2. Trim the best part
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
                Use the waveform selector to pick the chorus, punchline, or drop
                you actually want to hear when your phone rings.
              </p>
            </article>
            <article className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                3. Export for your phone
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
                Download an `M4R` for iPhone or an `MP3` for Android and set it
                as your ringtone.
              </p>
            </article>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="tone-info-card">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--tone-ink)]">
              Why people search for a TikTok ringtone maker
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Trending TikTok sounds often become the exact clips people want as
              custom call tones, text tones, and alarm sounds. This tool makes
              that process simpler by turning TikTok audio into a trimmed
              ringtone file without forcing you through a heavy desktop editor.
            </p>
          </article>

          <article className="tone-info-card">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--tone-ink)]">
              Built for iPhone and Android ringtone formats
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Export a TikTok sound as `M4R` for iPhone ringtone workflows or as
              `MP3` for Android devices. The app focuses on the exact formats
              people usually need when searching for a TikTok to ringtone
              converter online.
            </p>
          </article>
        </section>

        <section className="tone-panel px-6 py-8 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--tone-ink)]">
            TikTok ringtone maker FAQ
          </h2>
          <div className="mt-6 grid gap-4">
            <article className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                Can I turn a TikTok sound into an iPhone ringtone?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                Yes. Paste the TikTok link, trim the audio, and export the clip
                as an `M4R` ringtone file for iPhone.
              </p>
            </article>
            <article className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                Can I use this TikTok ringtone maker on Android?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                Yes. Export your clip as an `MP3` file and use it in your
                Android ringtone settings.
              </p>
            </article>
            <article className="tone-info-card">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                Do I need to download software?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                No. The trimming and export flow runs in your browser, so you
                can make a ringtone from TikTok audio online.
              </p>
            </article>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Link href="/guides/iphone-ringtone" className="tone-info-card block">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              iPhone ringtone guide
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
              Learn the practical flow for exporting an `M4R` file and using it
              with iPhone ringtone setup.
            </p>
          </Link>

          <Link href="/guides/android-ringtone" className="tone-info-card block">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              Android ringtone guide
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
              Export an `MP3` ringtone from TikTok audio and apply it on Android
              with fewer steps.
            </p>
          </Link>

          <Link href="/about" className="tone-info-card block">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              About this tool
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tone-ink-soft)]">
              Read more about how the TikTok ringtone maker works, what it is
              designed for, and the usage guidelines.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
