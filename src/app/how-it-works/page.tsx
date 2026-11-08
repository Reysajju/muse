import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdSlot } from "@/components/AdSlot";
import { KeyRound, Copy, CheckCircle, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";

export const metadata = {
  title: "How It Works | MuseCodes Community",
  description: "Learn how Muse invite codes work, how to copy and claim them, and how to share your own invite codes.",
};

export default function HowItWorksPage() {
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
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300"
          >
            ← Back to Directory
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Simple 3-Step Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-4">
            How Muse Invite Codes Work
          </h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Muse is an innovative canvas workspace for deep thinking and creative notes. New users require an invite or referral code to unlock membership privileges.
          </p>
        </div>

        {/* 3 Step Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-zinc-100">Browse Working Codes</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Check our live directory for available codes. Our system shows exactly how many claims remain (up to 30 copies max per code).
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800/60 text-xs text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Live status check
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-zinc-100">Tap Copy & 5s Sponsor</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Click Copy on any code. A quick 5-second sponsor message displays to keep this service 100% free, then the code is copied straight to your clipboard.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800/60 text-xs text-amber-400 flex items-center gap-1.5">
              <Copy className="w-4 h-4" /> One-click clipboard copy
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-zinc-100">Paste in Muse App</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Launch the Muse app or visit their onboarding page, paste your copied code into the invite box, and enjoy instant membership access.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800/60 text-xs text-blue-400 flex items-center gap-1.5">
              <ArrowRight className="w-4 h-4" /> Instant onboarding
            </div>
          </div>
        </div>

        <AdSlot format="728x90" />

        {/* The 30 Copy Rule Explanation */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 my-8">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100">Why the 30-Copy Maximum Limit?</h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Most app referral systems restrict invite code sharing to prevent abuse. By capping every code at exactly <strong>30 successful claims</strong>, our platform guarantees that visitors do not waste time attempting to use exhausted or dead codes. Once a code hits 30 copies, it is immediately marked as expired.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4 my-8">
          <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" /> Frequently Asked Questions
          </h2>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h3 className="text-sm font-semibold text-zinc-200">Is this service free to use?</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Yes, 100% free! We support the server hosting through non-intrusive sponsor ads.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h3 className="text-sm font-semibold text-zinc-200">Where do I find my Muse invite code to share?</h3>
            <p className="text-xs text-zinc-400 mt-1">
              In your Muse app, open Settings &gt; Membership or Invite Friends. Copy your personalized referral code and click "+ Share Code" on our home page.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h3 className="text-sm font-semibold text-zinc-200">What if a code doesn't work for me?</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Simply click the small "Report" link on the code card. If multiple users report a code, our system automatically removes it from the public directory.
            </p>
          </div>
        </div>

        <div className="text-center my-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm shadow-md transition-all"
          >
            Find Active Codes Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
