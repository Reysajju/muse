import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-10 px-4 sm:px-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-800/60">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-zinc-100">
                Muse<span className="text-amber-400">Codes</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                v1.0
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              A free community-driven directory to share and discover working Muse invite codes. Codes automatically expire after 30 successful claims to ensure high validity.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-time anti-spam verification</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] font-mono">
              Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  All Active Codes
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-amber-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/muse-invite-codes" className="hover:text-amber-400 transition-colors">
                  Muse Invite Guide
                </Link>
              </li>
              <li>
                <Link href="/muse-referral-code" className="hover:text-amber-400 transition-colors">
                  Referral FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] font-mono">
              Legal & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer row as strictly requested */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>
            Disclaimer: <strong className="text-zinc-400">Unofficial community site, not affiliated with Muse.</strong> All trademarks belong to their respective owners.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for the Muse community
          </p>
        </div>
      </div>
    </footer>
  );
}
