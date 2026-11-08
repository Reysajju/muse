"use client";

import React, { useEffect, useRef } from "react";
import { ExternalLink, Sparkles } from "lucide-react";

interface AdSlotProps {
  format?: "banner-728x90" | "banner-300x250" | "native" | "mobile-sticky";
  className?: string;
  adsterraKey?: string;
}

export function AdSlot({ format = "banner-728x90", className = "", adsterraKey }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const key = adsterraKey || process.env.NEXT_PUBLIC_ADSTERRA_KEY;

  useEffect(() => {
    // If real Adsterra key is provided, dynamically inject their script
    if (key && containerRef.current) {
      containerRef.current.innerHTML = "";
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `//www.profitablecreativeformat.com/${key}/invoke.js`;
      containerRef.current.appendChild(script);
    }
  }, [key]);

  if (format === "mobile-sticky") {
    return (
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-zinc-900/95 border-t border-zinc-800 backdrop-blur-md p-2 flex items-center justify-center md:hidden ${className}`}>
        <div ref={containerRef} className="w-full max-w-[320px] h-[50px] flex items-center justify-between px-3 bg-zinc-800/80 rounded border border-zinc-700/60">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300 font-semibold uppercase">Ad</span>
            <span className="text-xs text-zinc-300 font-medium">Exclusive Deals & Offers</span>
          </div>
          <a
            href="https://www.adsterra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Visit <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  if (format === "banner-300x250") {
    return (
      <div className={`w-full max-w-[300px] mx-auto rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 flex flex-col justify-between overflow-hidden ${className}`}>
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium text-zinc-400">Sponsored Partner</span>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 bg-zinc-800/70 px-1.5 py-0.5 rounded">Adsterra Ad</span>
        </div>
        <div ref={containerRef} className="my-4 py-6 text-center">
          <p className="text-sm font-semibold text-zinc-200">Looking for Web Hosting & Domains?</p>
          <p className="text-xs text-zinc-400 mt-1">Get high-performance cloud hosting starting at $2.99/mo with 99.9% uptime.</p>
        </div>
        <a
          href="https://www.adsterra.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 text-center text-xs font-medium text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          Check Offer <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (format === "native") {
    return (
      <div className={`rounded-xl border border-dashed border-zinc-800/90 bg-zinc-900/40 p-4 transition-all hover:border-zinc-700/80 ${className}`}>
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">Sponsored</span>
          <span className="text-[11px] text-zinc-500">Adsterra Native</span>
        </div>
        <div ref={containerRef}>
          <h4 className="text-sm font-semibold text-zinc-200">Boost Your Daily App Workflow</h4>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
            Top productivity tools and invite benefits recommended by our community members.
          </p>
        </div>
      </div>
    );
  }

  // Default: banner-728x90
  return (
    <div className={`w-full max-w-4xl mx-auto rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 md:p-4 my-6 ${className}`}>
      <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-zinc-800/60 mb-2">
        <span className="uppercase tracking-wider font-mono text-[10px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">Advertisement</span>
        <span>Adsterra Network</span>
      </div>
      <div ref={containerRef} className="flex flex-col sm:flex-row items-center justify-between gap-3 py-2">
        <div>
          <p className="text-sm font-semibold text-zinc-200">Get Instant Cloud Credits & Developer Deals</p>
          <p className="text-xs text-zinc-400 mt-0.5">Special partner discounts verified for Muse community members.</p>
        </div>
        <a
          href="https://www.adsterra.com"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
        >
          Explore Deal <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
