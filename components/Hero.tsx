"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Clock, Shield } from "lucide-react";

interface Props {
  settings: Record<string, string>;
}

const INTEGRATIONS = [
  { name: "Make.com", color: "#6B1FF5" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Slack", color: "#4A154B" },
  { name: "Notion", color: "#1a1a2e" },
  { name: "Airtable", color: "#18BFFF" },
];

const TRUST = [
  { icon: Shield, text: "No contracts. Cancel anytime." },
  { icon: Clock, text: "Live in 30 days, guaranteed." },
  { icon: Check, text: "Free audit, no obligation." },
];

export default function Hero({ settings }: Props) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;

  return (
    <>
      {/* ── Hero ── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center pt-16 pb-12 px-6 text-center overflow-hidden relative"
        style={{ background: "linear-gradient(160deg,#FFFFFF 0%,#F5F3FF 55%,#EFF6FF 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.14) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-sm text-[#6B7280] font-dm">
              {s("hero_eyebrow", "AI Automation · Deployed in 30 days")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-bold text-[#111827] leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem,7vw,5rem)" }}
          >
            {s("hero_headline_1", "Stop doing manually")}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#6366F1,#3B82F6)" }}
            >
              {s("hero_highlight", "what AI can own.")}
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6B7280] text-lg leading-relaxed mb-10 max-w-xl mx-auto font-dm"
          >
            {s("hero_subheadline", "We build custom AI systems for your sales, support, and operations — and have them running inside your business in 30 days.")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-white font-dm"
              style={{
                background: "linear-gradient(135deg,#6366F1,#3B82F6)",
                boxShadow: "0 10px 32px rgba(99,102,241,0.36)",
                fontSize: "1rem",
              }}
            >
              {s("hero_cta_primary_text", "Get my free operations audit")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-[#374151] border border-[#D1D5DB] bg-white hover:bg-gray-50 transition-colors font-dm"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
            >
              {s("hero_cta_secondary_text", "See our work")}
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-[#9CA3AF] font-dm mb-14"
          >
            Free · No obligation · Reply within 2 hrs
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 pt-10 border-t border-[#EDE9FE]"
          >
            {[
              { value: s("stat_1_value", "43"), suffix: "%", label: s("stat_1_label", "Faster response time") },
              { value: s("stat_2_value", "2.7"), suffix: "×", label: s("stat_2_label", "More leads converted") },
              { value: s("stat_3_value", "18"), suffix: " hrs", label: s("stat_3_label", "Saved per week") },
              { value: "30", suffix: " days", label: "Average go-live" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="font-syne font-bold text-[#111827] text-2xl">{value}</span>
                  <span className="font-syne font-bold text-[#6366F1] text-lg">{suffix}</span>
                </div>
                <p className="text-xs text-[#9CA3AF] font-dm mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Trust + integrations bar ── */}
      <section className="py-6 px-6 bg-white border-y border-[#F1F5F9]">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {TRUST.map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2 text-sm text-[#6B7280] font-dm">
                <Icon size={13} className="text-[#6366F1] shrink-0" />
                {text}
              </span>
            ))}
          </div>
          {/* Integrations */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-xs text-[#9CA3AF] font-dm">Integrates with:</span>
            {INTEGRATIONS.map(({ name, color }) => (
              <span key={name} className="font-semibold text-[13px]" style={{ color, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
