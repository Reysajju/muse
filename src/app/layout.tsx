import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "MuseCodes – Free Muse Invite Codes & Referral Hub",
  description:
    "Community-driven directory for sharing and copying working Muse app invite codes. Each code has a strict 30-copy limit to ensure freshness.",
  keywords: [
    "Muse invite code",
    "Muse codes",
    "Muse app invite",
    "free Muse code",
    "Muse referral",
  ],
  openGraph: {
    title: "MuseCodes – Free Muse Invite Codes & Referral Hub",
    description:
      "Find and share working Muse app invite codes with the community.",
    type: "website",
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
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans">
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
