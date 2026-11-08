"use client";

import React, { useState, useEffect } from "react";
import { Clock, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";

interface InterstitialModalProps {
  isOpen: boolean;
  type: "copy" | "add";
  targetCode?: string;
  durationSeconds?: number;
  onComplete: () => void;
  onCancel?: () => void;
}

export function InterstitialModal({
  isOpen,
  type,
  targetCode,
  durationSeconds = 5,
  onComplete,
  onCancel,
}: InterstitialModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(durationSeconds);
      setCanProceed(false);
      return;
    }

    setSecondsLeft(durationSeconds);
    setCanProceed(false);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanProceed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, durationSeconds]);

  if (!isOpen) return null;

  const progressPercent = Math.round(
    ((durationSeconds - secondsLeft) / durationSeconds) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl text-zinc-100 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle accent border at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-base text-zinc-100">
              {type === "copy" ? "Unlocking Invite Code" : "Publishing Your Invite Code"}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{secondsLeft > 0 ? `${secondsLeft}s left` : "Ready"}</span>
          </div>
        </div>

        {/* Adsterra / Sponsor Card Area */}
        <div className="my-5 rounded-xl border border-zinc-800/90 bg-zinc-900/60 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-wider font-mono mb-2">
            <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">Sponsor Message</span>
            <span>Adsterra Partner</span>
          </div>

          <h4 className="text-base font-semibold text-zinc-100 mt-1">
            Free High-Speed VPN & Developer Toolkit 2026
          </h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            Support our free invite code hub! Check out special partner offers for secure browsing, verified developer deals, and cloud credits.
          </p>

          <a
            href="https://www.adsterra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            Visit Sponsor Website <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Information text about the action */}
        <div className="text-xs text-zinc-400 mb-5 flex items-center justify-between px-1">
          <span>
            {type === "copy"
              ? `Preparing code ${targetCode ? `"${targetCode}"` : ""} for clipboard...`
              : "Verifying code format and rate limits before broadcast..."}
          </span>
          <span className="font-mono text-zinc-500">{progressPercent}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-amber-400 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            onClick={onComplete}
            disabled={!canProceed}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              canProceed
                ? "bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-lg shadow-amber-400/10 cursor-pointer"
                : "bg-zinc-800/80 text-zinc-500 cursor-not-allowed"
            }`}
          >
            {canProceed ? (
              <>
                <span>{type === "copy" ? "Continue & Copy Code" : "Confirm & Publish Code"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <span>Please wait ({secondsLeft}s)...</span>
            )}
          </button>
        </div>

        <p className="text-[11px] text-zinc-500 text-center mt-3">
          Free community directory. Codes expire after 30 copies.
        </p>
      </div>
    </div>
  );
}
