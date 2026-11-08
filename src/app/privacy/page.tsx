import React from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { KeyRound, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | MuseCodes Hub",
  description: "Privacy policy for MuseCodes directory, including data collection, cookies, and ad networks.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-zinc-950 font-black">
              <KeyRound className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-zinc-100">
              Muse<span className="text-amber-400">Codes</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <Shield className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider">Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-100 mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          <p>Last updated: November 2026</p>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">1. Information We Collect</h2>
            <p>
              MuseCodes is committed to user privacy. We do not require account registration or collect personal names, email addresses, or phone numbers to browse or copy invite codes.
            </p>
            <p>
              When you submit a new invite code, we generate an anonymous, irreversible cryptographic hash (SHA-256) of your IP address solely for rate limiting (max 5 submissions per 24 hours to prevent spam bots). We do not store raw IP addresses.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">2. Cookies and Advertising Partners</h2>
            <p>
              We partner with third-party advertising networks, such as Adsterra, to serve ads when you visit our website. These companies may use cookies or device identifiers to serve advertisements based on your prior visits to this website or other websites on the Internet.
            </p>
            <p>
              You can opt out of personalized advertising by visiting your browser settings or privacy protection extensions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">3. Disclaimer of Affiliation</h2>
            <p>
              MuseCodes is an independent, community-driven platform. We are not affiliated with, endorsed by, or sponsored by Muse, Muse Software Inc., or its affiliates. All trademarks and brand names are the property of their respective holders.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">4. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request code removal, please visit our{" "}
              <Link href="/contact" className="text-amber-400 hover:underline">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
