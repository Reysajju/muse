import React from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { KeyRound, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | MuseCodes Hub",
  description: "Terms and conditions for using the MuseCodes community directory.",
};

export default function TermsPage() {
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
          <FileText className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider">Agreement</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-100 mb-6">Terms of Service</h1>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the MuseCodes website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">2. Community Submissions & 30-Copy Rule</h2>
            <p>
              Users submit invite codes on a voluntary basis. Each code is capped at a maximum of 30 copies before becoming automatically archived. You agree not to submit deceptive, fraudulent, or malicious codes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">3. Disclaimer of Warranties</h2>
            <p>
              Invite codes are submitted by third-party community members. We do not guarantee that every code will remain valid at the time of your redemption, as Muse may alter their referral rules at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-zinc-200">4. Unofficial Community Status</h2>
            <p>
              This is an independent community resource. Muse is a registered trademark of its respective owner.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
