import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      </body>
    </html>
  );
}
