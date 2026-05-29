"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Clock, Mail, Shield } from "lucide-react";

function LPNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-syne font-bold text-xl text-[#111827] tracking-tight">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <defs>
              <radialGradient id="b1" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#3B82F6" />
              </radialGradient>
              <radialGradient id="b2" cx="62%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </radialGradient>
            </defs>
            <circle cx="9" cy="10" r="9" fill="url(#b1)" />
            <circle cx="17" cy="10" r="9" fill="url(#b2)" fillOpacity="0.85" />
          </svg>
          <span>talpur<span className="text-[#3B82F6]">.</span>ai</span>
        </Link>
        <a href="#audit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full font-dm"
          style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 4px 14px rgba(99,102,241,0.28)" }}
        >
          Get free audit <ArrowRight size={13} />
        </a>
      </div>
    </header>
  );
}

const TRUST = [
  { icon: Shield, text: "No contracts. Cancel anytime." },
  { icon: Clock, text: "Live in 30 days, guaranteed." },
  { icon: Check, text: "Free audit, no obligation." },
];

const SERVICES_SIMPLE = [
  { emoji: "⚡", label: "Sales & Lead Automation" },
  { emoji: "🎧", label: "Customer Support AI" },
  { emoji: "📊", label: "Reporting & Analytics" },
  { emoji: "📬", label: "Outreach & Follow-up" },
  { emoji: "🔗", label: "CRM & Tool Integrations" },
  { emoji: "🤖", label: "Custom AI Agents" },
];

export default function LandingB() {
  return (
    <div className="min-h-screen bg-white font-dm">
      <LPNav />

      {/* ── Hero: centered, dead simple ── */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-sm text-[#6B7280]">AI Automation · Deployed in 30 days</span>
          </div>

          {/* Headline */}
          <h1
            className="font-syne font-bold text-[#111827] leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem,7vw,5rem)" }}
          >
            Stop doing manually
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#6366F1,#3B82F6)" }}
            >
              what AI can own.
            </span>
          </h1>

          {/* One-liner */}
          <p className="text-[#6B7280] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            We build custom AI systems for your sales, support, and operations — and have them running inside your business in 30 days.
          </p>

          {/* Single primary CTA */}
          <a
            href="#audit"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white mb-5"
            style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 10px 32px rgba(99,102,241,0.38)", fontSize: "1rem" }}
          >
            Get my free operations audit
            <ArrowRight size={16} />
          </a>

          {/* Trust line */}
          <p className="text-sm text-[#9CA3AF]">Free · No obligation · Reply within 2 hrs</p>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-[#F1F5F9]"
          >
            {[
              { n: "43%", l: "Faster responses" },
              { n: "2.7×", l: "More leads converted" },
              { n: "18 hrs", l: "Saved per week" },
              { n: "30 days", l: "Average go-live" },
            ].map(({ n, l }) => (
              <div key={l} className="text-center">
                <p className="font-syne font-bold text-[#111827] text-2xl mb-0.5">{n}</p>
                <p className="text-xs text-[#9CA3AF]">{l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── What we automate ── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg,#F8F7FF,#EFF6FF)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-syne font-bold text-[#111827] mb-10" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
              What we automate for you
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SERVICES_SIMPLE.map(({ emoji, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl px-5 py-5 flex items-center gap-3 text-left"
                style={{ border: "1px solid rgba(226,232,240,0.9)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-syne font-semibold text-[#111827] text-sm">{label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-6"
          >
            {TRUST.map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Icon size={14} className="text-[#6366F1]" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-8 px-6 bg-white border-y border-[#F1F5F9]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs text-[#9CA3AF] mr-2">Industries we serve:</span>
          {["Real Estate", "Ecommerce", "Agencies", "Sales Teams", "Logistics", "Customer Support"].map((ind) => (
            <span key={ind} className="text-xs font-medium text-[#6B7280] px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              {ind}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA form ── */}
      <section id="audit" className="py-20 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-syne font-bold text-[#111827] mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)" }}>
              Book your free 45-min audit
            </h2>
            <p className="text-[#6B7280] text-sm mb-8">
              We'll map your workflows and show you exactly where AI pays off first.
            </p>

            <div
              className="bg-white rounded-2xl p-8 text-left"
              style={{ border: "1px solid rgba(226,232,240,0.9)", boxShadow: "0 8px 32px rgba(99,102,241,0.08)" }}
            >
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Name</label>
                  <input type="text" placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Email</label>
                  <input type="email" placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">What do you need automated?</label>
                  <select className="w-full px-4 py-3 rounded-xl text-sm border border-[#E5E7EB] text-[#374151] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all bg-white">
                    <option value="">Select one...</option>
                    <option>Lead follow-up & sales</option>
                    <option>Customer support</option>
                    <option>Reporting & analytics</option>
                    <option>Document & proposal generation</option>
                    <option>Scheduling & coordination</option>
                    <option>Not sure — show me what's possible</option>
                  </select>
                </div>
              </div>

              <Link href="/contact"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-sm"
                style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 6px 20px rgba(99,102,241,0.30)" }}
              >
                Book my free audit <ArrowRight size={14} />
              </Link>

              <div className="flex items-center justify-center gap-5 mt-4">
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]"><Clock size={11} /> 45 min call</span>
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]"><Check size={11} className="text-[#10B981]" /> No obligation</span>
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]"><Mail size={11} /> Within 2 hrs</span>
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
