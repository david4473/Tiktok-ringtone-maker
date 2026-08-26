# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who hear a TikTok sound and want to turn a short moment from it into a phone ringtone without using a desktop audio editor. Primary usage is quick, task-driven, and likely happens from a browser while the user already has a TikTok link.

## Product Purpose

TikTok Ringtone Maker converts a TikTok video or sound URL into an editable waveform, lets the user trim the useful section, and exports a ringtone file for iPhone or Android.

## Positioning

The product is a single-purpose browser workstation for going from TikTok URL to ringtone export with visible waveform trimming and phone-specific output formats.

## Operating Context

The core workflow is paste URL, fetch audio, prepare waveform, select a clip up to 30 seconds, preview it, and download `.m4r` or `.mp3`. Supporting routes explain iPhone setup, Android setup, troubleshooting, privacy, terms, contact, and product purpose.

## Capabilities and Constraints

The app uses Next.js App Router, a route handler proxy for audio loading, WaveSurfer regions for trim selection, FFmpeg in the browser for export, and React state for the active TikTok data. It must preserve existing SEO metadata, schema content, legal disclaimers, and the iPhone/Android export workflow.

## Brand Commitments

The existing name is TikTok Ringtone Maker. The product must remain clearly independent from TikTok and avoid implying affiliation or endorsement.

## Evidence on Hand

Real implementation exists in `src/app/page.tsx`, `src/components/form.tsx`, `src/components/Editor.tsx`, supporting guide routes under `src/app/guides`, and shared layout components in `src/components/SiteHeader.tsx` and `src/components/SiteFooter.tsx`. No user testimonials, customer logos, or performance benchmarks are present and future design work must not fabricate them.

## Product Principles

Keep the ringtone-making task first. Make state changes visible and recoverable. Preserve phone-format clarity. Avoid unnecessary menus between paste, trim, preview, and export. Keep legal and usage guidance discoverable without overwhelming the editor.

## Accessibility & Inclusion

Interactive controls need visible focus states, clear labels, readable contrast, keyboard-reachable actions, and reduced-motion support for interface transitions.
