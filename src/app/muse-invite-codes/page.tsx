import React from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AdSlot } from "@/components/AdSlot";
import { KeyRound, Sparkles, ShieldCheck, ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Muse Invite Codes (2026 Updated) – Free Working Codes Hub",
  description: "Looking for working Muse invite codes? Browse our verified community directory. Updated daily, 30 copy max rule per code.",
  keywords: ["Muse invite code", "Muse app code", "Muse invite codes 2026", "free Muse codes", "Muse canvas invite"],
};

export default function MuseInviteCodesSeoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Muse Invite Codes Directory",
    description: "Community directory for working Muse app invite codes.",
    publisher: {
      "@type": "Organization",
      name: "MuseCodes Hub",
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-colors"
          >
            Go to Codes Directory →
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-amber-400 mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5" /> 2026 Verified Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Latest Muse App Invite Codes
          </h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Muse is one of the most beloved spatial canvases for iPad, Mac, and Windows. If you are eager to get access or unlock community perks, explore our real-time user-shared invite codes.
          </p>
        </div>

        <div className="my-8">
          <AdSlot format="728x90" />
        </div>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-lg font-bold text-zinc-100 mb-2">Why Do You Need a Muse Invite Code?</h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Muse occasionally operates with invite-only onboarding windows or exclusive referral bonuses that grant extended trial periods, cloud storage upgrades, or beta canvas access. Having a fresh, working invite code ensures you bypass waiting queues.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-lg font-bold text-zinc-100 mb-2">How Does MuseCodes Ensure High Validity?</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mb-4">
              Unlike generic coupon websites that display expired codes from 5 years ago, MuseCodes enforces two strict automated safety filters:
            </p>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Max 30 Copies Cap:</strong> As soon as a code is copied 30 times, it is automatically marked as exhausted and removed from the active pool.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Community Report Shield:</strong> If 5 users report a code as non-functional, our system instantly hides it from the directory.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Zero Fake Codes:</strong> Every code is directly submitted by genuine users who have spare invites to give away.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 text-center rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-8">
          <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-zinc-100">Ready to grab your Muse invite code?</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto mb-5">
            Visit the live homepage to view all real-time submitted codes and claim yours in 1 click.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm shadow-md"
          >
            View Live Invite Codes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
