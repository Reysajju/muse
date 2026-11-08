"use client";

import React from "react";
import Link from "next/link";
import { KeyRound, Plus, ShieldAlert } from "lucide-react";

interface NavbarProps {
  onOpenAddModal: () => void;
}

export function Navbar({ onOpenAddModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 font-black shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
            <KeyRound className="w-5 h-5 text-zinc-950" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-zinc-100">
                Muse<span className="text-amber-400">Codes</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                Community
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">
              Invite Code Sharing Directory
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/how-it-works"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-900/60 hidden sm:inline"
          >
            How it Works
          </Link>
          <Link
            href="/muse-invite-codes"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-900/60 hidden md:inline"
          >
            Guide
          </Link>
          <Link
            href="/admin"
            className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-900/60"
          >
            Admin
          </Link>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs transition-all shadow-sm active:scale-95 cursor-pointer ml-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Share Code</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
