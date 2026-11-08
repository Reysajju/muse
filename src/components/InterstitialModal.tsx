"use client";

import React, { useState, useEffect } from "react";
import { Clock, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import { ADSTERRA_CONFIG } from "./AdSlot";

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

  const banner300x250 = ADSTERRA_CONFIG.BANNERS["300x250"];
  const bannerSrcDoc = `<!DOCTYPE html>
<html>
  <head>
    <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }</style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '${banner300x250.key}',
        'format' : 'iframe',
        'height' : ${banner300x250.height},
        'width' : ${banner300x250.width},
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bicea.org/22/${banner300x250.key}"></script>
  </body>
</html>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl text-zinc-100 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle accent border at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-sm text-zinc-100">
              {type === "copy" ? "Unlocking Invite Code" : "Publishing Your Invite Code"}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{secondsLeft > 0 ? `${secondsLeft}s left` : "Ready"}</span>
          </div>
        </div>

        {/* Adsterra 300x250 Banner inside Modal */}
        <div className="my-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2 flex flex-col items-center justify-center overflow-hidden">
          <div className="flex items-center justify-between w-full text-[10px] text-zinc-500 uppercase tracking-wider font-mono pb-1 px-1">
            <span className="bg-zinc-800 text-zinc-400 px-1 rounded">Sponsor</span>
            <span>Adsterra Partner</span>
          </div>

          <div className="my-1 flex items-center justify-center overflow-hidden">
            <iframe
              srcDoc={bannerSrcDoc}
              width={banner300x250.width}
              height={banner300x250.height}
              title="Adsterra 300x250 Modal Banner"
              className="border-0 overflow-hidden"
              scrolling="no"
            />
          </div>

          {/* Adsterra Smartlink */}
          <a
            href={ADSTERRA_CONFIG.SMARTLINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            Visit Sponsor Offer <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Action description */}
        <div className="text-[11px] text-zinc-400 mb-2 flex items-center justify-between px-1">
          <span>
            {type === "copy"
              ? `Unlocking code ${targetCode ? `"${targetCode}"` : ""} for clipboard...`
              : "Verifying code format and rate limits before broadcast..."}
          </span>
          <span className="font-mono text-zinc-500">{progressPercent}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-amber-400 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-3.5 py-2.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            onClick={onComplete}
            disabled={!canProceed}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
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

        <p className="text-[10px] text-zinc-500 text-center mt-2.5">
          Free community directory. Codes expire after 30 copies.
        </p>
      </div>
    </div>
  );
}
