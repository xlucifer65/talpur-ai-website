"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, AlertCircle, Clock, Mail } from "lucide-react";

function LPNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F1F5F9]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-syne font-bold text-xl text-[#111827] tracking-tight">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <defs>
              <radialGradient id="a1" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#3B82F6" />
              </radialGradient>
              <radialGradient id="a2" cx="62%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </radialGradient>
            </defs>
            <circle cx="9" cy="10" r="9" fill="url(#a1)" />
            <circle cx="17" cy="10" r="9" fill="url(#a2)" fillOpacity="0.85" />
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

const PAIN_POINTS = [
  {
    pain: "Your sales team spends hours chasing leads that already went cold.",
    fix: "AI engages every lead in under 60 seconds, qualifies intent, books the call.",
    icon: "📞",
  },
  {
    pain: "Your support inbox has the same 20 questions answered every single day.",
    fix: "AI resolves Tier-1 tickets instantly. Only complex issues reach your team.",
    icon: "🎧",
  },
  {
    pain: "Someone burns Friday afternoon pulling data into a report nobody reads.",
    fix: "Automated dashboards delivered every Monday — always current, zero manual work.",
    icon: "📊",
  },
  {
    pain: "New leads sit uncontacted for 2–3 days while your team handles other work.",
    fix: "24/7 AI follow-up that never sleeps, never forgets, never drops a lead.",
    icon: "⚡",
  },
];

const OUTCOMES = [
  { value: "43%", label: "faster response time" },
  { value: "2.7×", label: "more converted leads" },
  { value: "18 hrs", label: "saved per week" },
  { value: "30 days", label: "to go live" },
];

export default function LandingA() {
  return (
    <div className="min-h-screen bg-white font-dm">
      <LPNav />

      {/* ── Hero: Problem-led ── */}
      <section
        className="pt-32 pb-20 px-6 overflow-hidden relative"
        style={{ background: "linear-gradient(160deg,#FFFFFF 0%,#FFF7F5 50%,#FFF1F2 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 20%, rgba(252,165,165,0.12) 0%, transparent 60%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FECACA] bg-[#FFF5F5] mb-6"
              >
                <AlertCircle size={12} className="text-[#EF4444]" />
                <span className="text-xs font-semibold text-[#EF4444]">Sound familiar?</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-syne font-bold text-[#111827] leading-[1.1] tracking-tight mb-5"
                style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)" }}
              >
                Your team is spending
                <br />
                <span className="text-[#EF4444]">18+ hours a week</span>
                <br />
                on work AI can do in minutes.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#6B7280] text-base leading-relaxed mb-8 max-w-md"
              >
                Manual follow-ups. Repetitive support tickets. Weekly reports nobody wants to build.
                We replace all of it with AI — deployed in 30 days, running 24/7.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#audit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 6px 20px rgba(99,102,241,0.32)" }}
                >
                  Stop losing time — get a free audit <ArrowRight size={14} />
                </a>
              </motion.div>
            </div>

            {/* Pain cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-3"
            >
              {PAIN_POINTS.slice(0, 3).map(({ pain, icon }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4"
                  style={{ border: "1px solid #FEE2E2", boxShadow: "0 2px 12px rgba(239,68,68,0.06)" }}
                >
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <p className="text-sm text-[#374151] leading-relaxed">{pain}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Fix section ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold text-[#10B981] tracking-[0.18em] uppercase mb-3">The Fix</p>
            <h2 className="font-syne font-bold text-[#111827] leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              We build AI that handles it all —
              <br />
              <span className="text-[#6366F1]">so your team doesn't have to.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {PAIN_POINTS.map(({ fix, icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-6"
                style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                  style={{ background: "rgba(238,242,255,0.8)" }}>
                  {icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Check size={13} className="text-[#10B981] shrink-0" />
                    <span className="text-xs font-bold text-[#10B981] uppercase tracking-wide">Fixed</span>
                  </div>
                  <p className="text-sm text-[#374151] leading-relaxed">{fix}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes bar ── */}
      <section className="py-12 px-6" style={{ background: "linear-gradient(135deg,#F5F3FF,#EFF6FF)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {OUTCOMES.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="font-syne font-bold text-[#6366F1] mb-1" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>{value}</p>
                <p className="text-sm text-[#6B7280]">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-8 px-6 bg-white border-b border-[#F1F5F9]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs text-[#9CA3AF] mr-2">Built for:</span>
          {["Real Estate", "Ecommerce", "Agencies", "Sales Teams", "Logistics", "Customer Support"].map((ind) => (
            <span key={ind} className="text-xs font-medium text-[#6B7280] px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              {ind}
            </span>
          ))}
        </div>
      </section>

      {/* ── Audit CTA ── */}
      <section id="audit" className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-[#6366F1] tracking-[0.18em] uppercase mb-4">Free Audit — No Obligation</p>
            <h2 className="font-syne font-bold text-[#111827] leading-tight mb-4" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>
              Find out exactly how much time
              <span className="text-[#6366F1]"> AI can give back.</span>
            </h2>
            <p className="text-[#6B7280] mb-8 leading-relaxed">
              45-minute call. We map your workflows, identify every hour being wasted, and hand you a prioritised automation plan — yours to keep.
            </p>

            <div
              className="bg-white rounded-2xl p-8 text-left"
              style={{ border: "1px solid rgba(226,232,240,0.9)", boxShadow: "0 8px 32px rgba(99,102,241,0.08)" }}
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Your name</label>
                  <input type="text" placeholder="Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Work email</label>
                  <input type="email" placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all" />
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
              <Link href="/contact"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 6px 20px rgba(99,102,241,0.28)" }}
              >
                Book my free audit <ArrowRight size={14} />
              </Link>
              <div className="flex items-center justify-center gap-6 mt-4">
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]"><Clock size={11} /> 45 minutes</span>
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]"><Check size={11} className="text-[#10B981]" /> Free, no obligation</span>
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]"><Mail size={11} /> Reply within 2 hrs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-5 px-6 bg-white border-t border-[#F1F5F9] text-center">
        <p className="text-xs text-[#9CA3AF]">
          © 2025 Talpur.ai · <Link href="/" className="hover:text-[#6366F1] transition-colors">Back to main site</Link>
        </p>
      </footer>
    </div>
  );
}
