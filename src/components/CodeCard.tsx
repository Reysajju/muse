"use client";

import React, { useState } from "react";
import { MuseCode } from "@/lib/types";
import { Copy, Check, Flag, Clock, Users, ShieldAlert, Sparkles } from "lucide-react";

interface CodeCardProps {
  code: MuseCode;
  onCopyClick: (code: MuseCode) => void;
  onReportClick: (code: MuseCode) => void;
  isRecentlyCopied?: boolean;
}

function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function CodeCard({
  code,
  onCopyClick,
  onReportClick,
  isRecentlyCopied = false,
}: CodeCardProps) {
  const maxCopies = code.maxCopies || 30;
  const copiesLeft = Math.max(0, maxCopies - (code.copyCount || 0));
  const isExhausted = code.copyCount >= maxCopies || code.status === "exhausted";

  return (
    <div
      className={`group relative rounded-xl border bg-zinc-900/60 p-4 transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/90 flex flex-col justify-between ${
        isExhausted
          ? "border-zinc-800/50 opacity-60"
          : "border-zinc-800/80 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Top row: Status Badge & Time */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-1.5">
          {isExhausted ? (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium bg-red-950/40 text-red-400 border border-red-800/40">
              <ShieldAlert className="w-3 h-3" />
              Exhausted (30/30)
            </span>
          ) : copiesLeft <= 5 ? (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium bg-amber-950/40 text-amber-400 border border-amber-800/40">
              <Clock className="w-3 h-3" />
              Only {copiesLeft} left
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
              <Sparkles className="w-3 h-3" />
              Working ({copiesLeft} copies left)
            </span>
          )}
        </div>

        <span className="text-zinc-500 text-[11px] font-mono flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {timeAgo(code.createdAt)}
        </span>
      </div>

      {/* Middle row: The Invite Code */}
      <div className="my-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-500">
            Invite Code
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            {code.copyCount}/{maxCopies} used
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between rounded-lg bg-zinc-950/80 border border-zinc-800/90 px-3.5 py-2.5">
          <code className="font-mono text-lg font-bold tracking-wider text-zinc-100 select-all">
            {code.code}
          </code>

          <button
            onClick={() => onCopyClick(code)}
            disabled={isExhausted}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              isRecentlyCopied
                ? "bg-emerald-500 text-zinc-950"
                : isExhausted
                ? "bg-zinc-800/60 text-zinc-500 cursor-not-allowed"
                : "bg-amber-400 hover:bg-amber-300 text-zinc-950 cursor-pointer shadow-sm active:scale-95"
            }`}
          >
            {isRecentlyCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : isExhausted ? (
              <span>Full</span>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {code.notes && (
          <p className="mt-2 text-xs text-zinc-400 italic line-clamp-1">
            "{code.notes}"
          </p>
        )}
      </div>

      {/* Bottom row: Copy count progress bar & Report */}
      <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-zinc-400" />
          <span>{code.copyCount} {code.copyCount === 1 ? "person" : "people"} claimed</span>
        </div>

        <button
          onClick={() => onReportClick(code)}
          className="hover:text-red-400 transition-colors flex items-center gap-1 text-[11px]"
        >
          <Flag className="w-3 h-3" />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
}
