import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact TikTok Ringtone Maker for support, privacy requests, or business inquiries.",
};

const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com";

export default function ContactPage() {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="tone-panel px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--tone-ink-soft)]">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--tone-ink)] sm:text-5xl">
            Contact TikTok Ringtone Maker
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tone-ink-soft)]">
            For support, privacy requests, or business inquiries, use the email
            address below.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              Support email
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tone-ink-soft)]">
              <a
                href={`mailto:${supportEmail}`}
                className="font-semibold text-[var(--tone-accent)]"
              >
                {supportEmail}
              </a>
            </p>
            <p className="mt-3 text-xs leading-6 text-[var(--tone-ink-soft)]">
              Set `NEXT_PUBLIC_SUPPORT_EMAIL` in your environment so this page
              shows your real support address in production.
            </p>
          </article>

          <article className="tone-info-card">
            <h2 className="text-lg font-bold text-[var(--tone-ink)]">
              What to include
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tone-ink-soft)]">
              If you are reporting a problem, include the TikTok link you used,
              the device or browser, and a short description of what happened so
              support can reproduce the issue faster.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
