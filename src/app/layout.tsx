import type { Metadata } from "next";
import "./globals.css";
import { StateProvider } from "@/utils/stateContext";
import { ThemeProvider } from "@/utils/themeContext";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://tiktok-ringtone-maker.vercel.app"),
  title: {
    default: "TikTok Ringtone Maker | Convert TikTok Sounds to iPhone & Android Ringtones",
    template: "%s | TikTok Ringtone Maker",
  },
  description:
    "Convert TikTok sounds into custom iPhone and Android ringtones online. Paste a TikTok link, trim the audio, preview the waveform, and export an M4R or MP3 ringtone in seconds.",
  keywords: [
    "TikTok ringtone maker",
    "TikTok ringtone",
    "convert TikTok sound to ringtone",
    "TikTok to iPhone ringtone",
    "TikTok to Android ringtone",
    "make ringtone from TikTok",
    "TikTok audio trimmer",
    "M4R ringtone maker",
    "MP3 ringtone maker",
    "online ringtone maker",
  ],
  alternates: {
    canonical: "/",
  },
  category: "technology",
  applicationName: "TikTok Ringtone Maker",
  creator: "TikTok Ringtone Maker",
  publisher: "TikTok Ringtone Maker",
  authors: [{ name: "TikTok Ringtone Maker" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://tiktok-ringtone-maker.vercel.app/",
    siteName: "TikTok Ringtone Maker",
    title:
      "TikTok Ringtone Maker | Convert TikTok Sounds to iPhone & Android Ringtones",
    description:
      "Paste a TikTok link, trim the best part of the sound, and export a ringtone for iPhone or Android.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "TikTok Ringtone Maker | Convert TikTok Sounds to iPhone & Android Ringtones",
    description:
      "Trim TikTok audio online and export clean ringtone files for iPhone and Android.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <StateProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </StateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
