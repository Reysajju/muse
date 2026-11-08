"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { KeyRound, Mail, CheckCircle2, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-zinc-950 font-black">
              <KeyRound className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-zinc-100">
              Muse<span className="text-amber-400">Codes</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <Mail className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-wider">Support</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-100 mb-2">Contact & Inquiries</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mb-8 leading-relaxed">
          Need a specific code removed, want to advertise with Adsterra sponsorship, or have feedback? Send us a message below.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-100">Message Received</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Thank you! Our moderation team will review your inquiry shortly.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 font-semibold text-xs"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase font-mono mb-1.5">
                Your Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase font-mono mb-1.5">
                Message or Removal Request
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your inquiry or provide the code you wish removed..."
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
