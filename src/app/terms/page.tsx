import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the terms of use for TikTok Ringtone Maker, including acceptable use, copyright responsibility, and service limitations.",
};

export default function TermsPage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            Terms of Use
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            Terms for using TikTok Ringtone Maker
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--tone-ink-soft)]">
            Last updated: April 1, 2026
          </p>
        </section>

        <section className="tone-panel px-6 py-8 sm:px-8">
          <div className="space-y-6 text-sm leading-7 text-[var(--tone-ink-soft)]">
            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Use of the service
              </h2>
              <p className="mt-2">
                TikTok Ringtone Maker provides tools for previewing and trimming
                audio. By using the site, you agree to use it lawfully and only
                for content you have the right to access, convert, or reuse.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Copyright and responsibility
              </h2>
              <p className="mt-2">
                You are responsible for making sure your use of any submitted
                audio complies with applicable copyright, licensing, and
                platform rules. Do not use this site to infringe the rights of
                others.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                No guarantees
              </h2>
              <p className="mt-2">
                The service is provided on an as-is basis. Availability,
                compatibility with third-party media sources, and export success
                may vary depending on the source content, network conditions,
                and device environment.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Changes to the service
              </h2>
              <p className="mt-2">
                The site may change, improve, suspend, or remove features at any
                time to maintain quality, security, performance, or legal
                compliance.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--tone-ink)]">
                Contact
              </h2>
              <p className="mt-2">
                Questions about these terms can be directed through the contact
                information published on the Contact page.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
