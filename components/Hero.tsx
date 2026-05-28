"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  settings: Record<string, string>;
}

// ── Dashboard Mockup ──────────────────────────────────────────────────────────

function SidebarIcon({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={`w-6 h-6 flex items-center justify-center rounded-md ${active ? "bg-[#EEF2FF] text-[#6366F1]" : "text-[#94A3B8]"}`}>
      {children}
    </div>
  );
}

function DashboardCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[440px] ml-auto"
    >
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(167,139,250,0.28) 0%, rgba(99,102,241,0.12) 40%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="relative bg-white rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 20px 56px rgba(99,102,241,0.13), 0 4px 14px rgba(0,0,0,0.05)",
          border: "1px solid rgba(226,232,240,0.9)",
          transform: "perspective(1400px) rotateY(-3deg) rotateX(2.5deg)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F1F5F9]">
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#60A5FA,#818CF8)" }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="3" fill="white" /></svg>
          </div>
          <span className="text-xs font-semibold text-[#1E293B] tracking-tight">AI Operations Hub</span>
        </div>

        {/* Body */}
        <div className="flex" style={{ height: 290 }}>
          {/* Sidebar */}
          <div className="w-10 border-r border-[#F1F5F9] bg-[#FAFBFF] flex flex-col items-center py-3 gap-3 shrink-0">
            <SidebarIcon active>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </SidebarIcon>
            <SidebarIcon>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </SidebarIcon>
            <SidebarIcon>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </SidebarIcon>
            <SidebarIcon>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </SidebarIcon>
          </div>

          {/* Center */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="px-3 pt-3 pb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)", border: "1px solid #E0E7FF" }}>
                <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#6366F1,#818CF8)" }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2 4.5h5M4.5 2.5l2 2-2 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[10px] font-semibold text-[#374151]">Workflow <span className="text-[#9CA3AF] font-normal">|</span></span>
                <span className="text-[10px] font-bold text-[#6366F1]">Running</span>
              </div>
            </div>

            <div className="flex-1 px-3 pb-1">
              <svg viewBox="0 0 200 72" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.38"/>
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
                {[16, 32, 48, 64].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#E2E8F0" strokeWidth="0.5"/>)}
                <path d="M18,55 C30,50 45,38 60,30 C72,23 88,16 105,13 C118,11 135,18 152,15 C165,12 180,8 200,11 V70 H18 Z" fill="url(#areaGrad)"/>
                <path d="M18,55 C30,50 45,38 60,30 C72,23 88,16 105,13 C118,11 135,18 152,15 C165,12 180,8 200,11" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="152" cy="15" r="3" fill="#6366F1" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>

            <div className="flex border-t border-[#F1F5F9]">
              <div className="flex-1 px-3 py-2.5 border-r border-[#F1F5F9]">
                <p className="text-[9px] text-[#94A3B8] mb-1">Tasks Automated</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[15px] font-bold text-[#1E293B] leading-none">128</span>
                  <span className="text-[9px] font-semibold text-[#10B981]">+34%</span>
                </div>
              </div>
              <div className="flex-1 px-3 py-2.5">
                <p className="text-[9px] text-[#94A3B8] mb-1">Leads Converted</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[15px] font-bold text-[#1E293B] leading-none">2.7</span>
                  <span className="text-[9px] text-[#94A3B8]">×</span>
                  <span className="text-[9px] font-semibold text-[#10B981]">+61%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-[100px] border-l border-[#F1F5F9] bg-[#FAFBFF] flex flex-col shrink-0">
            {[
              { title: "Lead Generation", grad: "from-[#60A5FA] to-[#818CF8]" },
              { title: "Support Triage", grad: "from-[#A78BFA] to-[#F472B6]" },
              { title: "Invoice Flow", grad: "from-[#F472B6] to-[#FB923C]" },
            ].map((item, i) => (
              <div key={i} className={`flex-1 p-2.5 ${i > 0 ? "border-t border-[#F1F5F9]" : ""}`}>
                <div className="flex items-start gap-1.5 mb-2">
                  <div className={`w-4 h-4 rounded bg-gradient-to-br ${item.grad} shrink-0 mt-0.5`} />
                  <p className="text-[8px] font-semibold text-[#374151] leading-tight">{item.title}</p>
                </div>
                <div className="flex -space-x-1.5 mb-2">
                  {["#60A5FA", "#A78BFA", "#F472B6", "#34D399"].map((c, j) => (
                    <div key={j} className="w-[14px] h-[14px] rounded-full border-[1.5px] border-white" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex gap-1">
                  <div className="h-1.5 w-5 rounded-full bg-[#E2E8F0]" />
                  <div className="h-1.5 w-3 rounded-full bg-[#818CF8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Logo Bar ──────────────────────────────────────────────────────────────────

const INTEGRATIONS = [
  { name: "Make.com", color: "#6B1FF5" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Slack", color: "#4A154B" },
  { name: "Notion", color: "#1a1a2e" },
  { name: "Airtable", color: "#18BFFF" },
];

// ── Main Hero ─────────────────────────────────────────────────────────────────

export default function Hero({ settings }: Props) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;

  return (
    <>
      {/* ── Hero section ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 pb-12 px-6 lg:px-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#F5F3FF 40%,#EFF6FF 100%)" }}
      >
        <div className="absolute top-0 right-0 w-[55%] h-[75%] pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(167,139,250,0.20) 0%, rgba(196,181,253,0.10) 40%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[30%] h-[35%] pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(147,197,253,0.15) 0%, transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-5"
              >
                <div className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0" />
                <span className="text-sm text-[#6B7280] font-dm">
                  {s("hero_eyebrow", "AI Systems that Deliver Results")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-syne font-bold leading-[1.1] tracking-tight text-[#111827] mb-5"
                style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)" }}
              >
                {s("hero_headline_1", "We build AI systems")}
                <br />
                that{" "}
                <span className="text-[#6366F1]">{s("hero_highlight", "actually run")}</span>
                <br />
                {s("hero_headline_2", "your business.")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#6B7280] text-base leading-relaxed mb-7 font-dm max-w-[420px]"
              >
                {s("hero_subheadline", "Custom AI agents, automations, and workflows that handle real work — so you can focus on growth, not operations.")}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white font-dm"
                  style={{ background: "linear-gradient(135deg,#6366F1 0%,#3B82F6 100%)", boxShadow: "0 6px 20px rgba(99,102,241,0.32)" }}
                >
                  {s("hero_cta_primary_text", "Book a strategy call")}
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#374151] border border-[#D1D5DB] bg-white hover:bg-gray-50 transition-colors font-dm"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                  {s("hero_cta_secondary_text", "See our work")}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Inline stats */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-6"
              >
                {[
                  { value: s("stat_1_value", "43"), suffix: "%", label: s("stat_1_label", "Faster response time") },
                  { value: s("stat_2_value", "2.7"), suffix: "×", label: s("stat_2_label", "Lead conversion") },
                  { value: s("stat_3_value", "18"), suffix: " hrs", label: s("stat_3_label", "Hours saved per week") },
                ].map(({ value, suffix, label }) => (
                  <div key={label}>
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-syne font-bold text-[#111827] text-2xl">{value}</span>
                      <span className="font-syne font-bold text-[#6366F1] text-lg">{suffix}</span>
                    </div>
                    <p className="text-[#9CA3AF] font-dm text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right */}
            <div className="hidden lg:flex justify-end">
              <DashboardCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Integration bar ── */}
      <section className="py-6 px-6 lg:px-8 bg-white border-y border-[#F1F5F9]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="text-xs text-[#9CA3AF] font-dm tracking-wide">Integrates with your existing stack</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {INTEGRATIONS.map(({ name, color }) => (
              <span
                key={name}
                className="font-semibold text-[14px]"
                style={{ color, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
