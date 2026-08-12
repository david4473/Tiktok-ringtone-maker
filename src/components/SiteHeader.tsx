import Link from "next/link";

const navItems = [
  { href: "/", label: "Tool" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-[1.7rem] border border-[var(--tone-border)] bg-white/82 px-5 py-4 shadow-[0_18px_40px_-32px_rgba(20,63,69,0.24)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="text-lg font-black tracking-[-0.04em] text-[var(--tone-ink)]"
          >
            TikTok Ringtone Maker
          </Link>
          <p className="mt-1 text-sm text-[var(--tone-ink-soft)]">
            Convert TikTok sounds into clean ringtone files online.
          </p>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--tone-ink-soft)]"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[var(--tone-border)] px-3 py-2 transition hover:border-[var(--tone-accent)] hover:text-[var(--tone-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
