import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-black text-[var(--tone-ink)]">
              TikTok Ringtone Maker
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tone-ink-soft)]">
              Create ringtone clips from TikTok sounds for iPhone and Android.
              Please only convert and use audio you have the right to use.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-2 text-sm font-semibold text-[var(--tone-ink-soft)]"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:text-[var(--tone-accent)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-[var(--tone-border)] pt-4 text-xs leading-6 text-[var(--tone-muted)]">
          <p>
            This website is an independent web tool and is not affiliated with
            or endorsed by TikTok. TikTok is a trademark of its respective
            owner.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} TikTok Ringtone Maker. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
