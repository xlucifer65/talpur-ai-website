"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, X, Mail, Clock } from "lucide-react";

// ── Stripped nav (no distractions) ───────────────────────────────────────────

function LPNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F1F5F9]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-syne font-bold text-xl text-[#111827] tracking-tight">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <defs>
              <radialGradient id="lp1" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#3B82F6" />
              </radialGradient>
              <radialGradient id="lp2" cx="62%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </radialGradient>
            </defs>
            <circle cx="9" cy="10" r="9" fill="url(#lp1)" />
            <circle cx="17" cy="10" r="9" fill="url(#lp2)" fillOpacity="0.85" />
          </svg>
          <span>talpur<span className="text-[#3B82F6]">.</span>ai</span>
        </Link>
        <a
          href="#audit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full font-dm"
          style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 4px 14px rgba(99,102,241,0.28)" }}
        >
          Get free audit <ArrowRight size={13} />
        </a>
      </div>
    </header>
  );
}

// ── Before / After comparison ─────────────────────────────────────────────────

const COMPARISONS = [
  {
    area: "Lead Follow-Up",
    before: "Sales reps manually follow up 2–3 days later. Most leads go cold.",
    after: "AI responds in under 60 seconds, qualifies intent, books the meeting.",
    metric: "2.7× more booked calls",
  },
  {
    area: "Customer Support",
    before: "Same 20 questions answered by your team every day, all day.",
    after: "AI resolves Tier-1 tickets instantly. Complex issues escalate with full context.",
    metric: "75% tickets auto-resolved",
  },
  {
    area: "Reporting & Ops",
    before: "Someone spends Friday pulling data into a spreadsheet nobody reads.",
    after: "Automated dashboards and decks delivered every Monday, always current.",
    metric: "18 hrs saved per week",
  },
];

// ── How it works (3 steps, not 4) ────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Free 45-min audit",
    desc: "We map your current workflows, find every hour being wasted, and show you exactly where AI pays off first.",
  },
  {
    n: "02",
    title: "We build it for you",
    desc: "Custom agents, automations, and integrations — built inside your existing tools. No new software to learn.",
  },
  {
    n: "03",
    title: "You get time back",
    desc: "Systems go live, run 24/7, and get smarter over time. We monitor and optimize so you don't have to.",
  },
];

// ── Industries ────────────────────────────────────────────────────────────────

const INDUSTRIES = ["Real Estate", "Ecommerce", "Agencies", "Sales Teams", "Logistics", "Customer Support"];

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-dm">
      <LPNav />

      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 px-6 text-center overflow-hidden relative"
        style={{ background: "linear-gradient(160deg,#FFFFFF 0%,#F5F3FF 55%,#EFF6FF 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.16) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E0E7FF] bg-white mb-7"
            style={{ boxShadow: "0 2px 8px rgba(99,102,241,0.10)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
            <span className="text-xs font-semibold text-[#6366F1] tracking-wide">AI Automation Agency · Real Results</span>
          </motion.div>

          {/* Stats headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-bold text-[#111827] leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.4rem,6vw,4.2rem)" }}
          >
            <span className="text-[#6366F1]">43% faster</span> responses.{" "}
            <span className="text-[#3B82F6]">2.7× more leads.</span>
            <br />
            <span className="text-[#111827]">18 hours back every single week.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6B7280] text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            We build AI systems that handle your sales follow-up, customer support, and operations
            — so your team stops doing repetitive work and starts closing more.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="#audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 8px 28px rgba(99,102,241,0.35)" }}
            >
              Get my free audit <ArrowRight size={16} />
            </a>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-[#374151] border border-[#D1D5DB] bg-white hover:bg-gray-50 transition-colors"
            >
              See client results
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#9CA3AF]"
          >
            {["No upfront cost for the audit", "Results in 30 days or we keep building", "Integrates with tools you already use"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={13} className="text-[#10B981] shrink-0" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Industries strip ── */}
      <section className="py-5 px-6 border-y border-[#F1F5F9] bg-white">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs text-[#9CA3AF] mr-2">We work with:</span>
          {INDUSTRIES.map((ind) => (
            <span key={ind} className="text-xs font-medium text-[#6B7280] px-3 py-1.5 rounded-full border border-[#E5E7EB] bg-[#FAFAFA]">
              {ind}
            </span>
          ))}
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#F8F7FF 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold text-[#3B82F6] tracking-[0.18em] uppercase mb-3">The Difference</p>
            <h2 className="font-syne font-bold text-[#111827] leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              What changes when AI<br />
              <span className="text-[#6366F1]">handles the repetitive work.</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {COMPARISONS.map(({ area, before, after, metric }, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                <div className="grid md:grid-cols-[1fr_1fr_160px]">
                  {/* Before */}
                  <div className="p-6 border-b md:border-b-0 md:border-r border-[#F1F5F9]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                        <X size={10} className="text-[#EF4444]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Before</span>
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{before}</p>
                  </div>

                  {/* After */}
                  <div className="p-6 border-b md:border-b-0 md:border-r border-[#F1F5F9]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
                        <Check size={10} className="text-[#10B981]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">After</span>
                    </div>
                    <p className="text-sm text-[#374151] leading-relaxed font-medium">{after}</p>
                  </div>

                  {/* Metric */}
                  <div className="p-6 flex flex-col justify-center items-center text-center"
                    style={{ background: "linear-gradient(135deg,rgba(238,242,255,0.7),rgba(237,233,254,0.7))" }}>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">{area}</p>
                    <p className="font-syne font-bold text-[#6366F1] text-lg leading-tight">{metric}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold text-[#3B82F6] tracking-[0.18em] uppercase mb-3">Simple Process</p>
            <h2 className="font-syne font-bold text-[#111827] leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              From audit to running in
              <span className="text-[#6366F1]"> 30 days.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(({ n, title, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(100%_-_12px)] w-6 h-px bg-[#E0E7FF] z-10" />
                )}
                <div
                  className="bg-white rounded-2xl p-6 h-full"
                  style={{ border: "1px solid rgba(226,232,240,0.9)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "linear-gradient(135deg,#818CF8,#6366F1)" }}
                  >
                    <span className="text-white font-syne font-bold text-sm">{n}</span>
                  </div>
                  <h3 className="font-syne font-bold text-[#111827] text-lg mb-2">{title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit CTA (anchor: audit) ── */}
      <section
        id="audit"
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg,#F5F3FF 0%,#EFF6FF 100%)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-[#6366F1] tracking-[0.18em] uppercase mb-4">Free Operations Audit</p>
            <h2 className="font-syne font-bold text-[#111827] leading-tight mb-4" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              See exactly where AI can save
              <span className="text-[#6366F1]"> your team 18+ hours.</span>
            </h2>
            <p className="text-[#6B7280] mb-8 leading-relaxed">
              45-minute call. We map your workflows, identify the biggest time leaks, and show you a prioritised automation roadmap — no obligation.
            </p>

            {/* Mini contact form */}
            <div
              className="bg-white rounded-2xl p-8 text-left"
              style={{ border: "1px solid rgba(226,232,240,0.9)", boxShadow: "0 8px 32px rgba(99,102,241,0.08)" }}
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Your name</label>
                  <input
                    type="text"
                    placeholder="Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Work email</label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Biggest time waster right now</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#374151] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all bg-white">
                  <option value="">Select one...</option>
                  <option>Manual lead follow-up</option>
                  <option>Customer support tickets</option>
                  <option>Reporting & data entry</option>
                  <option>Proposal / document creation</option>
                  <option>Scheduling & coordination</option>
                  <option>Other</option>
                </select>
              </div>
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 6px 20px rgba(99,102,241,0.30)" }}
              >
                Book my free audit <ArrowRight size={14} />
              </Link>
              <div className="flex items-center justify-center gap-6 mt-4">
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <Clock size={11} /> 45 minutes
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <Check size={11} className="text-[#10B981]" /> Free, no obligation
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <Mail size={11} /> Response within 2 hrs
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-5 px-6 bg-white border-t border-[#F1F5F9] text-center">
        <p className="text-xs text-[#9CA3AF]">
          © 2025 Talpur.ai · <Link href="/" className="hover:text-[#6366F1] transition-colors">Back to main site</Link>
        </p>
      </footer>
    </div>
  );
}
