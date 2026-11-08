"use client";

import React, { useState } from "react";
import { X, PlusCircle, CheckCircle2, Share2, Copy, AlertCircle } from "lucide-react";
import { InterstitialModal } from "./InterstitialModal";
import { MuseCode } from "@/lib/types";

interface AddCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeAdded: (code: MuseCode) => void;
}

export function AddCodeModal({ isOpen, onClose, onCodeAdded }: AddCodeModalProps) {
  const [code, setCode] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [createdCode, setCreatedCode] = useState<MuseCode | null>(null);
  const [isCopiedShare, setIsCopiedShare] = useState(false);

  if (!isOpen) return null;

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

    // Per user requirement: trigger 5-second ad before confirmation and adding code!
    setIsAdOpen(true);
  };

  const handleAdFinishedAndSave = async () => {
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
        setError(data.error || "Failed to add code. Please try again.");
        setIsLoading(false);
        return;
      }

      setCreatedCode(data.code);
      onCodeAdded(data.code);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!createdCode) return;
    const text = encodeURIComponent(
      `Here is a working Muse invite code: ${createdCode.code} (Hurry, max 30 copies allowed!) Find more at ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleShareTwitter = () => {
    if (!createdCode) return;
    const text = encodeURIComponent(
      `Working Muse invite code: ${createdCode.code} \nClaim yours before 30 copies run out: ${window.location.origin}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const handleCopyLink = () => {
    if (!createdCode) return;
    navigator.clipboard.writeText(`${window.location.origin}/?search=${createdCode.code}`);
    setIsCopiedShare(true);
    setTimeout(() => setIsCopiedShare(false), 2000);
  };

  const handleResetAndClose = () => {
    setCode("");
    setNotes("");
    setError(null);
    setCreatedCode(null);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {createdCode ? (
            /* Success Screen */
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Your Code is Live!</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                Your invite code has been broadcast to the directory. Users can claim it up to 30 times.
              </p>

              <div className="my-5 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                <span className="text-[11px] font-mono uppercase text-zinc-500">Live Code</span>
                <p className="text-2xl font-mono font-bold text-amber-400 tracking-wider mt-0.5">
                  {createdCode.code}
                </p>
                <span className="text-[11px] text-zinc-400 mt-1 block">30 copies remaining</span>
              </div>

              <p className="text-xs font-medium text-zinc-400 mb-3">Share with friends:</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-emerald-400 hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> WhatsApp
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-blue-400 hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> X (Twitter)
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> {isCopiedShare ? "Copied Link" : "Copy Link"}
                </button>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full mt-6 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-800 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            /* Form Screen */
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-zinc-100">Share Your Invite Code</h3>
              </div>
              <p className="text-xs text-zinc-400 mb-5">
                Help fellow creators join Muse. Each code can be copied by up to 30 people.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleStartSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 font-mono">
                    Muse Invite Code <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. MUSE-ALPHA99"
                    maxLength={24}
                    required
                    className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-zinc-100 font-mono tracking-wider placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Uppercase alphanumeric. Automatically validated.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 font-mono">
                    Note / Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Just got this code, fresh & active!"
                    maxLength={60}
                    className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-zinc-100 text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-[11px] text-zinc-400 space-y-1">
                  <p className="font-semibold text-zinc-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    5-Second Verification Notice
                  </p>
                  <p>
                    A brief 5-second sponsor check runs before publishing your code to prevent spam bots.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg font-semibold text-sm bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-all shadow-md shadow-amber-400/10 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Publishing Code..." : "Continue to Publish (5s Ad)"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* 5-second Ad countdown modal before adding the code */}
      <InterstitialModal
        isOpen={isAdOpen}
        type="add"
        targetCode={code.trim().toUpperCase()}
        durationSeconds={5}
        onComplete={handleAdFinishedAndSave}
        onCancel={() => setIsAdOpen(false)}
      />
    </>
  );
}
