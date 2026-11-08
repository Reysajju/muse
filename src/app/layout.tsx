import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://muse-dun.vercel.app"),
  title: "MuseCodes – Free Muse Invite Codes & Referral Hub (2026)",
  description:
    "Claim 600+ working Muse app invite codes with guaranteed 30-copy limits. Share yours with fellow creators. 100% free community hub.",
  keywords: [
    "Muse invite code",
    "Muse referral code",
    "Muse codes 2026",
    "Muse AI invite code",
    "free Muse invite code",
    "working Muse codes",
    "Muse app tokens",
  ],
  authors: [{ name: "MuseCodes Community" }],
  creator: "MuseCodes",
  publisher: "MuseCodes",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: "Free Muse Invite Codes (2026) – Copy or Share Yours",
    description:
      "Explore 600+ working Muse app invite codes with strict 30-copy limits so you never hit expired links. Fast one-click copy.",
    url: "https://muse-dun.vercel.app",
    siteName: "MuseCodes",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MuseCodes Hero Section Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Muse Invite Codes (2026) – Copy or Share Yours",
    description:
      "Explore 600+ working Muse app invite codes with strict 30-copy limits so you never hit expired links.",
    images: ["/opengraph-image"],
    creator: "@MuseCodes",
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-400 selection:text-zinc-950">
        {children}

        {/* Adsterra Popunder Script */}
        <Script
          id="adsterra-popunder"
          src="https://bicea.org/14/bb12f9ebf50e5fe179b168308d5612e0"
          strategy="afterInteractive"
        />

        {/* Adsterra Social Bar Script */}
        <Script
          id="adsterra-social-bar"
          src="https://afders.org/1/3935576bbe7bfd78d3b554940def07a9"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
