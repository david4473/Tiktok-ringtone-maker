import Link from "next/link";
import { AudioWaveform } from "lucide-react";

const navItems = [
  { href: "/", label: "Tool" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="px-4 py-5 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            aria-label="TikTok Ringtone Maker home"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--tone-accent)] text-white transition hover:bg-[var(--tone-accent-deep)]"
          >
            <AudioWaveform className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="truncate text-base font-black text-[var(--tone-ink)] sm:text-lg"
          >
            TikTok Ringtone Maker
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="flex items-center gap-1 overflow-x-auto text-sm font-semibold text-[var(--tone-ink-soft)]"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:text-[var(--tone-accent)] focus-visible:text-[var(--tone-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
