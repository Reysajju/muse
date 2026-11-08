import React from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AdSlot } from "@/components/AdSlot";
import { KeyRound, Gift, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Muse Referral Code & Discount Perks – Unofficial Hub",
  description: "Learn how to use Muse referral codes for discounts and subscription perks. Share your own code with our community.",
};

export default function MuseReferralCodePage() {
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
            ← Back to Directory
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-amber-400 mb-3 font-mono">
            <Gift className="w-3.5 h-3.5" /> Rewards & Referral Info
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Muse Referral Program & Codes
          </h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Everything you need to know about Muse referral links, invite benefits, and how to maximize your membership value.
          </p>
        </div>

        <AdSlot format="728x90" />

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed my-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-base font-bold text-zinc-100 mb-2">How Does the Muse Referral Program Work?</h2>
            <p className="text-zinc-400">
              When an existing Muse user invites friends, both the inviter and the new member often receive bonus perks such as free months of membership, additional board space, or special early access to experimental tools.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-base font-bold text-zinc-100 mb-2">Where to Paste Your Referral Code?</h2>
            <ol className="list-decimal list-inside space-y-1.5 text-zinc-400 mt-2">
              <li>Download the Muse app on your device (iOS, Mac, or Windows).</li>
              <li>During the welcome or account sign-up flow, look for the "Have an Invite or Referral Code?" prompt.</li>
              <li>Paste the code copied from our directory.</li>
              <li>Complete your account setup to unlock your bonuses.</li>
            </ol>
          </div>
        </div>

        <div className="text-center my-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm shadow-md"
          >
            Browse Working Codes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
