"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodeCard } from "@/components/CodeCard";
import { AdSlot } from "@/components/AdSlot";
import { AddCodeModal } from "@/components/AddCodeModal";
import { ReportModal } from "@/components/ReportModal";
import { InterstitialModal } from "@/components/InterstitialModal";
import { MuseCode, AdminStats } from "@/lib/types";
import {
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  Inbox,
  Flame,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  ChevronDown,
} from "lucide-react";

const INITIAL_DISPLAY_COUNT = 24;
const LOAD_MORE_INCREMENT = 24;

export default function HomePage() {
  const [codes, setCodes] = useState<MuseCode[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "working" | "most_copied">("newest");
  const [recentlyCopiedId, setRecentlyCopiedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [reportingCode, setReportingCode] = useState<MuseCode | null>(null);

  // Interstitial copy flow state
  const [copyTargetCode, setCopyTargetCode] = useState<MuseCode | null>(null);
  const [isCopyAdOpen, setIsCopyAdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      query.set("sort", sortBy);

      const res = await fetch(`/api/codes?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setCodes(data.codes || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Failed to fetch codes:", err);
    } finally {
      setIsLoading(false);
    }
  }, [search, sortBy]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  // Reset pagination on search or sort change
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  }, [search, sortBy]);

  // When user clicks Copy button on a card:
  const handleInitiateCopy = (code: MuseCode) => {
    setCopyTargetCode(code);
    setIsCopyAdOpen(true);
  };

  // When 5s interstitial completes:
  const handleCompleteCopy = async () => {
    if (!copyTargetCode) return;
    setIsCopyAdOpen(false);

    try {
      const res = await fetch(`/api/codes/${copyTargetCode.id}/copy`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        // Copy to system clipboard
        await navigator.clipboard.writeText(data.code || copyTargetCode.code);
        setRecentlyCopiedId(copyTargetCode.id);

        // Update local state count
        setCodes((prev) =>
          prev.map((c) =>
            c.id === copyTargetCode.id
              ? {
                  ...c,
                  copyCount: data.copyCount,
                  status: data.copyCount >= 30 ? "exhausted" : c.status,
                }
              : c
          )
        );

        setToastMessage(`Copied "${data.code}"! (Remaining claims: ${data.remainingCopies}/30)`);
        setTimeout(() => setToastMessage(null), 4000);
        setTimeout(() => setRecentlyCopiedId(null), 3000);
      } else {
        alert(data.error || "Failed to copy code.");
      }
    } catch (err) {
      console.error("Error registering copy:", err);
      navigator.clipboard.writeText(copyTargetCode.code);
    }
  };

  const handleCodeAdded = (newCode: MuseCode) => {
    setCodes((prev) => [newCode, ...prev]);
    setToastMessage(`Code "${newCode.code}" published live!`);
    setTimeout(() => setToastMessage(null), 4000);
    fetchCodes();
  };

  // Sliced codes for high-speed mobile performance
  const visibleCodes = useMemo(() => {
    return codes.slice(0, visibleCount);
  }, [codes, visibleCount]);

  const hasMore = visibleCount < codes.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_INCREMENT);
  };

  // Structured Data (JSON-LD) for Search Engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MuseCodes Hub",
    url: "https://muse-dun.vercel.app",
    description: "Verified community hub for sharing and claiming working Muse app invite codes.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar onOpenAddModal={() => setIsAddOpen(true)} />

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-2.5 animate-in slide-in-from-top-4 max-w-md">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
          <a
            href="https://museapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 flex-shrink-0 ml-2"
          >
            Open Muse <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-28 sm:pb-16">
        {/* Top Adsterra Ad Banner */}
        <AdSlot format="728x90" />

        {/* Hero Section - Optimized for Desktop & Mobile */}
        <section className="text-center py-4 sm:py-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 mb-4 font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>600+ Working Muse Invite Codes 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
            Free Muse Invite Codes <br />
            <span className="text-amber-400">Copy or Share Yours</span>
          </h1>

          <p className="mt-3.5 text-xs sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto px-2">
            Find active community invite codes for the Muse app. Each code can be copied up to{" "}
            <strong className="text-zinc-200 font-semibold">30 times</strong> before expiring.
            Have a spare code? Share it with other creators in seconds.
          </p>

          {/* Quick Stats Counter */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:gap-12 text-zinc-400 border-y border-zinc-800/60 py-3.5 max-w-lg mx-auto text-xs">
            <div>
              <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono">
                {stats ? stats.activeCodes : codes.length}
              </p>
              <span className="text-[10px] sm:text-[11px] text-zinc-500">Active Codes</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div>
              <p className="text-base sm:text-lg font-bold text-amber-400 font-mono">
                {stats ? stats.totalCopies : 0}
              </p>
              <span className="text-[10px] sm:text-[11px] text-zinc-500">Codes Claimed</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div>
              <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">30 / 30</p>
              <span className="text-[10px] sm:text-[11px] text-zinc-500">Max Limit</span>
            </div>
          </div>
        </section>

        {/* Controls: Search, Filters, and Add Code CTA */}
        <section className="mt-2 mb-8 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input - 16px font on mobile prevents auto zoom */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search codes or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-base sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
              />
            </div>

            {/* Refresh & Add Code */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchCodes()}
                title="Refresh codes list"
                aria-label="Refresh codes"
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors active:scale-95"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={() => setIsAddOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your Code</span>
              </button>
            </div>
          </div>

          {/* Sort Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-zinc-500 text-[11px] font-mono uppercase mr-1 flex-shrink-0">Sort:</span>
            <button
              onClick={() => setSortBy("newest")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                sortBy === "newest"
                  ? "bg-zinc-800 text-amber-400 border border-zinc-700 font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Newest First</span>
            </button>

            <button
              onClick={() => setSortBy("working")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                sortBy === "working"
                  ? "bg-zinc-800 text-amber-400 border border-zinc-700 font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Most Available</span>
            </button>

            <button
              onClick={() => setSortBy("most_copied")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                sortBy === "most_copied"
                  ? "bg-zinc-800 text-amber-400 border border-zinc-700 font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Most Popular</span>
            </button>
          </div>
        </section>

        {/* Dynamic Code Cards Grid */}
        {isLoading && codes.length === 0 ? (
          /* Loading skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-44 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 animate-pulse flex flex-col justify-between"
              >
                <div className="h-4 bg-zinc-800 rounded w-1/3" />
                <div className="h-10 bg-zinc-800 rounded w-full my-2" />
                <div className="h-3 bg-zinc-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : codes.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-8 sm:p-14 text-center my-6 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mx-auto mb-4">
              <Inbox className="w-7 h-7 text-amber-400" />
            </div>

            <h3 className="text-xl font-bold text-zinc-100">No Codes Found</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              {search ? `No invite codes matched "${search}". Try searching for another code or reset filters.` : "All codes in this directory are submitted directly by users."}
            </p>

            <button
              onClick={() => {
                if (search) setSearch("");
                else setIsAddOpen(true);
              }}
              className="mt-6 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-lg shadow-amber-400/10 cursor-pointer active:scale-95"
            >
              {search ? <span>Clear Search</span> : <><Plus className="w-4 h-4" /><span>Add A Code</span></>}
            </button>
          </div>
        ) : (
          /* Grid of verified codes with interleaved native ad cards */
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-1 px-1">
              <span>Showing <strong>{visibleCodes.length}</strong> of <strong>{codes.length}</strong> invite codes</span>
              <span className="font-mono text-[11px] text-zinc-500">Updated Real-Time</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {visibleCodes.map((item, index) => {
                const shouldShowNativeAd = (index + 1) % 8 === 0;

                return (
                  <React.Fragment key={item.id}>
                    <CodeCard
                      code={item}
                      onCopyClick={handleInitiateCopy}
                      onReportClick={(c) => setReportingCode(c)}
                      isRecentlyCopied={recentlyCopiedId === item.id}
                    />

                    {shouldShowNativeAd && (
                      <AdSlot format="native" className="col-span-1" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Load More Button for Mobile Performance */}
            {hasMore && (
              <div className="pt-6 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4 text-amber-400" />
                  <span>Load More Codes ({codes.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12">
          <AdSlot format="728x90" />
        </div>
      </main>

      {/* Sticky Mobile "Add Code" Floating Button */}
      <div className="fixed bottom-16 right-4 z-40 sm:hidden">
        <button
          onClick={() => setIsAddOpen(true)}
          className="p-3.5 rounded-full bg-amber-400 text-zinc-950 shadow-2xl shadow-amber-400/30 font-bold flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Add Invite Code"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Sticky Adsterra Ad on Mobile at very bottom */}
      <AdSlot format="mobile-sticky" />

      {/* Modals */}
      <AddCodeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCodeAdded={handleCodeAdded}
      />

      <ReportModal
        isOpen={!!reportingCode}
        code={reportingCode}
        onClose={() => setReportingCode(null)}
        onReportSuccess={fetchCodes}
      />

      {/* 5-second Ad Modal on COPY action */}
      <InterstitialModal
        isOpen={isCopyAdOpen}
        type="copy"
        targetCode={copyTargetCode?.code}
        durationSeconds={5}
        onComplete={handleCompleteCopy}
        onCancel={() => setIsCopyAdOpen(false)}
      />

      <Footer />
    </div>
  );
}
