"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { InterstitialModal } from "@/components/InterstitialModal";
import { KeyRound, PlusCircle, ArrowLeft, AlertCircle } from "lucide-react";

export default function AddPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);

  const handleStartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = code.trim().toUpperCase();
    if (!clean) {
      setError("Please enter an invite code.");
      return;
    }
    if (!/^[A-Z0-9_\-]{3,24}$/.test(clean)) {
      setError("Invalid format. Use 3-24 uppercase letters, numbers, or dashes.");
      return;
    }

    // 5-second sponsor verification ad per user requirement
    setIsAdOpen(true);
  };

  const handleCompleteAdAndSave = async () => {
    setIsAdOpen(false);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          notes: notes.trim() || undefined,
          source: "web",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to publish code.");
        setIsLoading(false);
        return;
      }

      router.push(`/?search=${encodeURIComponent(code.trim().toUpperCase())}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error publishing code";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

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
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <PlusCircle className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider">Publish</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-100 mb-2">Share an Invite Code</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mb-8 leading-relaxed">
          Broadcast your Muse invite code to fellow creators. Each code is capped at 30 copies before automatic expiration.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleStartSubmit} className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase font-mono mb-1.5">
              Muse Invite Code <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. MUSE-ALPHA99"
              maxLength={24}
              className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-zinc-100 font-mono tracking-wider text-base focus:outline-none focus:border-amber-400"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Case-insensitive, letters, numbers, or dashes only.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase font-mono mb-1.5">
              Description / Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Valid for 2026 onboarding"
              maxLength={60}
              className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-zinc-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
            <p className="font-semibold text-zinc-200">5-Second Sponsor Check</p>
            <p className="mt-0.5">
              To stop automated bots, a quick 5-second countdown will display before your code goes live.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Publishing..." : "Publish Code (5s Ad)"}
          </button>
        </form>
      </main>

      <InterstitialModal
        isOpen={isAdOpen}
        type="add"
        targetCode={code.trim().toUpperCase()}
        durationSeconds={5}
        onComplete={handleCompleteAdAndSave}
        onCancel={() => setIsAdOpen(false)}
      />

      <Footer />
    </div>
  );
}
