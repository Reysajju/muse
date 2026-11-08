"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MuseCode, CodeReport, AdminStats } from "@/lib/types";
import {
  KeyRound,
  ShieldAlert,
  Lock,
  Trash2,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Radio,
  FileSpreadsheet,
  Settings,
} from "lucide-react";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [codes, setCodes] = useState<MuseCode[]>([]);
  const [reports, setReports] = useState<CodeReport[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"codes" | "reports" | "ads">("codes");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin?key=${encodeURIComponent(passcode)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError("Invalid admin passcode.");
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setCodes(data.codes || []);
      setReports(data.reports || []);
      setStats(data.stats || null);
    } catch {
      setAuthError("Failed to connect to admin API.");
    } finally {
      setIsLoading(false);
    }
  };

  const reloadData = async () => {
    try {
      const res = await fetch(`/api/admin?key=${encodeURIComponent(passcode)}`);
      const data = await res.json();
      if (data.success) {
        setCodes(data.codes || []);
        setReports(data.reports || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "active" | "hidden" | "exhausted") => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify({
          action: "update",
          id,
          updates: { status: newStatus },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Code status updated.");
        reloadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetCopies = async (id: string) => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify({
          action: "update",
          id,
          updates: { copyCount: 0, status: "active" },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Copies counter reset to 0 (Active again).");
        reloadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCode = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this code from the database?")) {
      return;
    }
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify({
          action: "delete",
          id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Code permanently deleted.");
        reloadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-zinc-100">Admin Control Panel</h1>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            Enter the admin passcode to access live database controls and reports.
          </p>

          {authError && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Admin passcode"
              required
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-400 font-mono text-center tracking-widest"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>

          <p className="text-[11px] text-zinc-500 mt-4">
            Default local passcode: <code className="text-zinc-400 font-mono">museadmin2026</code>
          </p>

          <Link href="/" className="inline-block mt-4 text-xs text-zinc-400 hover:text-zinc-200">
            ← Return to public site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-zinc-950 font-black">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-zinc-100">
              MuseCodes <span className="text-amber-400">Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={reloadData}
              className="text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg"
            >
              Refresh
            </button>
            <Link
              href="/"
              className="text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-3 py-1.5 rounded-lg"
            >
              Live Site →
            </Link>
          </div>
        </div>
      </header>

      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-amber-400 text-zinc-950 font-bold text-xs px-4 py-2 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <span className="text-[11px] text-zinc-500 font-mono uppercase">Total Codes</span>
              <p className="text-2xl font-bold font-mono text-zinc-100 mt-1">{stats.totalCodes}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <span className="text-[11px] text-emerald-400 font-mono uppercase">Active Codes</span>
              <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{stats.activeCodes}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <span className="text-[11px] text-zinc-500 font-mono uppercase">Exhausted (30/30)</span>
              <p className="text-2xl font-bold font-mono text-zinc-400 mt-1">{stats.exhaustedCodes}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <span className="text-[11px] text-amber-400 font-mono uppercase">Total Copies</span>
              <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{stats.totalCopies}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <span className="text-[11px] text-red-400 font-mono uppercase">Reports</span>
              <p className="text-2xl font-bold font-mono text-red-400 mt-1">{stats.totalReports}</p>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6">
          <button
            onClick={() => setActiveTab("codes")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
              activeTab === "codes"
                ? "bg-zinc-800 text-amber-400 border border-zinc-700"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Manage Codes ({codes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
              activeTab === "reports"
                ? "bg-zinc-800 text-amber-400 border border-zinc-700"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>User Reports ({reports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("ads")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
              activeTab === "ads"
                ? "bg-zinc-800 text-amber-400 border border-zinc-700"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Adsterra Configuration</span>
          </button>
        </div>

        {/* Tab 1: Codes Table */}
        {activeTab === "codes" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
            {codes.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-xs">
                No codes currently stored in database. Submit one via the website!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Copies (Max 30)</th>
                      <th className="py-3 px-4">Reports</th>
                      <th className="py-3 px-4">Added</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-sans">
                    {codes.map((c) => (
                      <tr key={c.id} className="hover:bg-zinc-900/60">
                        <td className="py-3 px-4 font-mono font-bold text-zinc-100">
                          {c.code}
                          {c.notes && (
                            <span className="block text-[11px] font-sans font-normal text-zinc-500">
                              {c.notes}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              c.status === "active"
                                ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                                : c.status === "exhausted"
                                ? "bg-red-950/60 text-red-400 border border-red-800/40"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {c.copyCount} / {c.maxCopies || 30}
                        </td>
                        <td className="py-3 px-4 font-mono text-red-400">
                          {c.reportCount || 0}
                        </td>
                        <td className="py-3 px-4 text-zinc-500 text-[11px]">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          {c.status === "hidden" ? (
                            <button
                              onClick={() => handleUpdateStatus(c.id, "active")}
                              title="Restore code"
                              className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(c.id, "hidden")}
                              title="Hide code"
                              className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-amber-400"
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleResetCopies(c.id)}
                            title="Reset copies to 0 (re-activate)"
                            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-blue-400"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteCode(c.id)}
                            title="Delete permanently"
                            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Reports */}
        {activeTab === "reports" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="font-bold text-sm text-zinc-200 mb-4">User Reported Codes</h3>
            {reports.length === 0 ? (
              <p className="text-xs text-zinc-500">No reports logged yet. Community is clean!</p>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-amber-400">{r.code}</span>
                      <p className="text-zinc-300 mt-0.5">{r.reason}</p>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {new Date(r.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Adsterra Configuration */}
        {activeTab === "ads" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-400" />
              Adsterra Monetization Guide & Integration
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Why Adsterra over Google AdSense? Coupon, promo, and invite code sites often face "Thin Content" rejections from AdSense. Adsterra approves domains instantly, has no traffic minimums, and allows Native, 728x90, and Direct Link formats.
            </p>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="font-semibold text-zinc-200">How to plug in your real Adsterra keys:</h4>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                <li>Create an account at <a href="https://www.adsterra.com" target="_blank" className="text-amber-400 underline">adsterra.com</a>.</li>
                <li>Add your domain (e.g. your Vercel URL or custom domain).</li>
                <li>Choose "Banner 728x90", "Native Banner", and "Direct Link".</li>
                <li>
                  In your Vercel project settings (or in <code className="text-zinc-300 font-mono">.env.local</code>), set:
                  <pre className="bg-zinc-900 p-2.5 rounded-lg text-zinc-300 font-mono text-[11px] mt-1.5 overflow-x-auto">
NEXT_PUBLIC_ADSTERRA_KEY=your_adsterra_key_here
ADMIN_SECRET=your_custom_admin_password
                  </pre>
                </li>
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
