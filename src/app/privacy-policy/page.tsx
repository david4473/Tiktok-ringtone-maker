import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy for TikTok Ringtone Maker, including how the site handles submitted links, browser processing, analytics, and contact information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            Privacy Policy
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            Privacy Policy for TikTok Ringtone Maker
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--tone-ink-soft)]">
            Last updated: April 1, 2026
          </p>
        </section>

        <section className="tone-panel px-6 py-8 sm:px-8">
          <div className="space-y-6 text-sm leading-7 text-[var(--tone-ink-soft)]">
            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Information you provide
              </h2>
              <p className="mt-2">
                When you use this site, you may submit a TikTok URL so the app
                can fetch audio and prepare it for trimming. Submitted links are
                used only to provide the ringtone-making functionality.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                How audio is processed
              </h2>
              <p className="mt-2">
                The app retrieves audio related to the link you submit and uses
                browser-based processing tools to preview, trim, and export the
                ringtone clip. Audio processing may occur in your browser and
                through server requests needed to retrieve the media.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Analytics, cookies, and advertising
              </h2>
              <p className="mt-2">
                This site may use analytics, essential site functionality, and
                advertising-related technologies such as cookies or similar
                storage methods to understand performance, improve the service,
                and support monetization.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Third-party services
              </h2>
              <p className="mt-2">
                The site may rely on third-party infrastructure providers,
                hosting services, and media sources to deliver functionality.
                Those services may process technical data such as IP address,
                browser information, and request metadata as part of delivering
                their service.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Your choices
              </h2>
              <p className="mt-2">
                You can stop using the service at any time. You can also clear
                local browser data, cookies, or storage through your browser
                settings.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Contact
              </h2>
              <p className="mt-2">
                For privacy-related questions, visit the Contact page on this
                website and use the published support details.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
