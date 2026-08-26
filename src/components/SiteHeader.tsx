"use client";

import Link from "next/link";
import { AudioWaveform, Menu, X } from "lucide-react";
import { useState } from "react";
import { toneModes, useToneMode } from "@/utils/themeContext";

const navItems = [
  { href: "/", label: "Tool" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const { toneMode, setToneMode } = useToneMode();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <header className="px-4 py-5 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
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

          <div className="hidden rounded-full bg-[var(--tone-paper)] p-1 md:flex">
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

          <nav
            aria-label="Primary"
            className="hidden items-center justify-end gap-1 text-sm font-semibold text-[var(--tone-ink-soft)] md:flex"
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

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileSidebarOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--tone-accent)] text-white shadow-[0_14px_36px_-24px_var(--tone-shadow)] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
        />
      ) : null}

      <aside
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 h-dvh w-[min(22rem,88vw)] bg-[var(--tone-surface)] px-5 py-5 shadow-[-22px_0_70px_-46px_var(--tone-shadow)] transition-transform duration-200 md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-base font-black text-[var(--tone-ink)]">Menu</p>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileSidebarOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--tone-paper)] text-[var(--tone-ink)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="mt-8 grid gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              className="rounded-2xl px-4 py-3 text-lg font-extrabold text-[var(--tone-ink)] transition hover:bg-[var(--tone-paper)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <p className="mb-3 text-sm font-extrabold text-[var(--tone-ink-soft)]">
            Color mode
          </p>
          <div className="grid gap-2">
            {toneModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                aria-pressed={toneMode === mode.id}
                onClick={() => {
                  setToneMode(mode.id);
                  setMobileSidebarOpen(false);
                }}
                className={`h-12 rounded-2xl px-4 text-left text-base font-extrabold transition ${
                  toneMode === mode.id
                    ? "bg-[var(--tone-accent)] text-white"
                    : "bg-[var(--tone-paper)] text-[var(--tone-ink)]"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
