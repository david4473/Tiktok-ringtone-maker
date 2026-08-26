"use client";

import useStateData from "@/hooks/useStateData";
import { formAction } from "@/utils/form-action";
import {
  AlertCircle,
  ArrowRight,
  Clipboard,
  LoaderCircle,
} from "lucide-react";
import { useState } from "react";

export default function Form() {
  const [url, setUrl] = useState<string>("");
  const { handleSetData, handleSubmitted, handleMessage, message, submitted } =
    useStateData();

  function isValidTikTokUrl(value: string) {
    try {
      const parsed = new URL(value);
      return parsed.hostname.includes("tiktok.com");
    } catch {
      return false;
    }
  }

  async function handleForm(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    handleSubmitted(true);
    handleMessage(null);

    try {
      if (!isValidTikTokUrl(url)) {
        handleSetData(null);
        handleMessage("Paste a valid TikTok post URL to load its sound.");
        return;
      }

      const data = await formAction(url);
      handleSetData(data);
      handleMessage(null);
    } catch (error) {
      handleSetData(null);
      handleMessage(
        error instanceof Error
          ? error.message
          : "Failed to fetch TikTok audio. Please try again.",
      );
    } finally {
      handleSubmitted(false);
    }
  }

  return (
    <div className="mx-auto w-full">
      <form onSubmit={handleForm} className="w-full">
        <div className="tone-form-shell grid gap-2 p-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[24px] bg-[var(--tone-paper-strong)] px-5 py-4">
            <span className="hidden text-sm font-extrabold text-[var(--tone-accent)] sm:inline">
              URL
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--tone-accent-soft)] text-[var(--tone-accent)] sm:hidden">
              <Clipboard className="h-4 w-4" />
            </span>
            <span className="sr-only">TikTok post URL</span>
            <input
              name="url"
              type="text"
              placeholder="Paste a TikTok video link"
              aria-label="TikTok post URL"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
              className="min-w-0 flex-1 border-0 bg-transparent text-lg font-semibold text-[var(--tone-ink)] outline-none placeholder:font-medium placeholder:text-[var(--tone-muted)]"
            />
          </label>

          <button
            type="submit"
            disabled={submitted}
            className="inline-flex h-16 cursor-pointer items-center justify-center gap-2 rounded-[22px] bg-[var(--tone-accent)] px-8 text-base font-extrabold text-white shadow-[0_18px_42px_-28px_var(--tone-shadow)] transition hover:bg-[var(--tone-accent-deep)] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[var(--tone-muted)] sm:min-w-[12rem]"
          >
            {submitted ? (
              <>
                Loading
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Get ringtone
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {message ? (
        <div className="mx-auto mt-3 flex max-w-2xl items-start gap-3 rounded-2xl border border-[var(--tone-error-border)] bg-[var(--tone-error-bg)] px-4 py-4 text-left text-sm text-[var(--tone-error-text)]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{message}</p>
        </div>
      ) : null}
    </div>
  );
}
