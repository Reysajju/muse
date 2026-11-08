"use client";

import React, { useState } from "react";
import { X, Flag, AlertTriangle, CheckCircle2 } from "lucide-react";
import { MuseCode } from "@/lib/types";

interface ReportModalProps {
  isOpen: boolean;
  code: MuseCode | null;
  onClose: () => void;
  onReportSuccess: () => void;
}

export function ReportModal({ isOpen, code, onClose, onReportSuccess }: ReportModalProps) {
  const [reason, setReason] = useState("Code is expired or full");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !code) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/codes/${code.id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to submit report.");
        setIsSubmitting(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onReportSuccess();
        onClose();
      }, 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error reporting code";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-zinc-100">Report Submitted</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Thank you for keeping MuseCodes clean and verified.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flag className="w-4 h-4 text-red-400" />
              <h3 className="font-bold text-base text-zinc-100">Report Invite Code</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Reporting code: <span className="font-mono font-semibold text-zinc-200">{code.code}</span>
            </p>

            {error && (
              <div className="mb-3 p-2 rounded bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Select Reason:
                </label>
                <div className="space-y-1.5">
                  {[
                    "Code is expired or full (30/30)",
                    "Code is invalid in Muse app",
                    "Fake / Spam entry",
                    "Other issue",
                  ].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 p-2 rounded-lg border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900 cursor-pointer text-xs text-zinc-300"
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        value={r}
                        checked={reason === r}
                        onChange={(e) => setReason(e.target.value)}
                        className="accent-amber-400"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:bg-zinc-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold text-xs text-white disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
