"use client";

import Editor from "@/components/Editor";
import Form from "@/components/form";
import useStateData from "@/hooks/useStateData";
import {
  CheckCircle2,
  Download,
  FileAudio,
  Gauge,
  Scissors,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const toneModes = [
  { id: "white", label: "White" },
  { id: "dark", label: "Dark" },
  { id: "orange", label: "Orange" },
] as const;

type ToneMode = (typeof toneModes)[number]["id"];

export default function Home() {
  const { data, submitted } = useStateData();
  const [toneMode, setToneMode] = useState<ToneMode>("white");

  useEffect(() => {
    document.documentElement.dataset.toneMode = toneMode;
  }, [toneMode]);

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
    <div className="min-h-screen bg-[var(--tone-bg)] px-4 pb-8 pt-2 transition-colors duration-200 sm:px-6">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <section className="tone-hero px-0 pb-2 pt-10 text-center sm:pt-16">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto mb-7 flex w-fit rounded-full bg-[var(--tone-paper)] p-1">
              {toneModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  aria-pressed={toneMode === mode.id}
                  onClick={() => setToneMode(mode.id)}
                  className={`h-10 rounded-full px-5 text-sm font-extrabold transition ${
                    toneMode === mode.id
                      ? "bg-[var(--tone-accent)] text-white shadow-[0_12px_28px_-20px_var(--tone-shadow)]"
                      : "text-[var(--tone-ink-soft)] hover:text-[var(--tone-ink)]"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <h1 className="text-5xl font-black leading-[0.98] text-[var(--tone-ink)] sm:text-7xl lg:text-8xl">
              TikTok Ringtone Maker
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--tone-ink-soft)] sm:text-xl">
              Convert TikTok sounds into iPhone and Android ringtones from your
              browser. Paste a link, trim the clip, and download.
            </p>

            <div className="mx-auto mt-9 max-w-3xl">
              <Form />
              <p className="mt-4 text-sm leading-6 text-[var(--tone-ink-soft)]">
                Please only convert and use audio you have the right to use.
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-3 text-left">
              {[
                ["Fast trim", Scissors],
                ["Browser-based", Gauge],
                ["M4R export", Smartphone],
                ["MP3 export", Download],
              ].map(([label, Icon]) => (
                <div
                  key={label as string}
                  className="flex items-center gap-2 text-sm font-bold text-[var(--tone-ink-soft)]"
                >
                  <Icon className="h-4 w-4 text-[var(--tone-accent)]" />
                  {label as string}
                </div>
              ))}
            </div>
          </div>
        </section>

        {submitted ? (
          <section className="tone-panel tone-shimmer mx-auto flex min-h-[18rem] w-full max-w-3xl flex-col items-center justify-center px-6 py-10 text-center">
            <HashLoader color="var(--tone-accent)" size={42} />
            <p className="tone-kicker mt-7">Loading audio</p>
            <p className="mt-3 max-w-sm text-lg leading-8 text-[var(--tone-ink)]">
              Fetching the sound and preparing the trim region.
            </p>
          </section>
        ) : data ? (
          <section className="mx-auto w-full max-w-4xl">
            <Editor key={toneMode} />
          </section>
        ) : null}

        <section className="px-0 py-2">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-black text-[var(--tone-ink)] sm:text-4xl">
                How to make a ringtone from a TikTok video
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--tone-ink-soft)]">
                This TikTok ringtone maker keeps the workflow short: paste the
                video URL, choose the best part of the sound, then download the
                right file for your phone.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                [
                  "Paste a TikTok link",
                  "Drop in the TikTok URL for the sound or video you want to turn into a ringtone.",
                ],
                [
                  "Trim the best part",
                  "Use the waveform selector to pick the chorus, punchline, or drop you actually want to hear.",
                ],
                [
                  "Export for your phone",
                  "Download an M4R for iPhone or an MP3 for Android and set it as your ringtone.",
                ],
              ].map(([title, description], index) => (
                <article key={title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--tone-paper)] text-sm font-black text-[var(--tone-accent)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--tone-ink-soft)]">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-2">
          <article className="tone-info-card">
            <FileAudio className="mb-4 h-5 w-5 text-[var(--tone-accent)]" />
            <h2 className="text-2xl font-black text-[var(--tone-ink)]">
              Make the sound usable
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Trending TikTok sounds often become the exact clips people want as
              custom call tones, text tones, and alarm sounds. This tool turns
              TikTok audio into a trimmed ringtone file without a heavy editor.
            </p>
          </article>

          <article className="tone-info-card">
            <CheckCircle2 className="mb-4 h-5 w-5 text-[var(--tone-ready)]" />
            <h2 className="text-2xl font-black text-[var(--tone-ink)]">
              Built for phone formats
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Export a TikTok sound as `M4R` for iPhone ringtone workflows or as
              `MP3` for Android devices. The app focuses on the exact formats
              people usually need when searching for a TikTok to ringtone
              converter online.
            </p>
          </article>
        </section>

        <section className="px-0 py-2">
          <h2 className="text-3xl font-black text-[var(--tone-ink)]">
            TikTok ringtone maker FAQ
          </h2>
          <div className="mt-6 grid gap-4">
            <article className="pt-2">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                Can I turn a TikTok sound into an iPhone ringtone?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                Yes. Paste the TikTok link, trim the audio, and export the clip
                as an `M4R` ringtone file for iPhone.
              </p>
            </article>
            <article className="pt-2">
              <h3 className="text-lg font-bold text-[var(--tone-ink)]">
                Can I use this TikTok ringtone maker on Android?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
                Yes. Export your clip as an `MP3` file and use it in your
                Android ringtone settings.
              </p>
            </article>
            <article className="pt-2">
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

        <section className="grid gap-8 pt-2 sm:grid-cols-3">
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
