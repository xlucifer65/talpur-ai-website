"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  settings: Record<string, string>;
}

// ── Dashboard Mockup ─────────────────────────────────────────────────────────

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
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[480px] ml-auto"
    >
      {/* Soft glow behind card */}
      <div
        className="absolute -inset-6 rounded-3xl"
        style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(167,139,250,0.30) 0%, rgba(99,102,241,0.15) 40%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative bg-white rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 24px 64px rgba(99,102,241,0.14), 0 4px 16px rgba(0,0,0,0.06)",
          border: "1px solid rgba(226,232,240,0.9)",
          transform: "perspective(1400px) rotateY(-3deg) rotateX(2.5deg)",
        }}
      >
        {/* ── Card header ── */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F1F5F9]">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#60A5FA,#818CF8)" }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <circle cx="4.5" cy="4.5" r="3" fill="white" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-[#1E293B] tracking-tight">AI Operations Hub</span>
        </div>

        {/* ── Body ── */}
        <div className="flex" style={{ height: 310 }}>
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
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </SidebarIcon>
            <SidebarIcon>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </SidebarIcon>
          </div>

          {/* Center – main area */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Workflow badge */}
            <div className="px-3 pt-3 pb-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
                style={{ background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)", border: "1px solid #E0E7FF" }}
              >
                <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#6366F1,#818CF8)" }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2 4.5h5M4.5 2.5l2 2-2 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[10px] font-semibold text-[#374151]">Workflow<span className="text-[#9CA3AF] font-normal">|</span></span>
                <span className="text-[10px] font-bold text-[#6366F1]">Running</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>

            {/* Chart */}
            <div className="flex-1 px-3 pb-1">
              <svg viewBox="0 0 200 72" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.40"/>
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.03"/>
                  </linearGradient>
                </defs>
                {/* Faint grid */}
                {[16, 32, 48, 64].map(y => (
                  <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#E2E8F0" strokeWidth="0.5"/>
                ))}
                {/* Y labels */}
                {[["350", 13], ["250", 29], ["150", 45]].map(([v, y]) => (
                  <text key={v as string} x="2" y={y as number} fill="#CBD5E1" fontSize="6">{v}</text>
                ))}
                {/* Area */}
                <path d="M18,55 C30,50 45,38 60,30 C72,23 88,16 105,13 C118,11 135,18 152,15 C165,12 180,8 200,11 V70 H18 Z" fill="url(#areaGrad)"/>
                {/* Line */}
                <path d="M18,55 C30,50 45,38 60,30 C72,23 88,16 105,13 C118,11 135,18 152,15 C165,12 180,8 200,11" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round"/>
                {/* Highlight dot */}
                <circle cx="152" cy="15" r="3" fill="#6366F1" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>

            {/* Metric tiles */}
            <div className="flex border-t border-[#F1F5F9]">
              <div className="flex-1 px-3 py-2.5 border-r border-[#F1F5F9]">
                <p className="text-[9px] text-[#94A3B8] mb-1">Workflow Status</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[15px] font-bold text-[#1E293B] leading-none">128</span>
                  <span className="text-[9px] font-semibold text-[#10B981]">+34%</span>
                </div>
                <p className="text-[8px] text-[#94A3B8] mt-0.5">Tasks automated</p>
              </div>
              <div className="flex-1 px-3 py-2.5">
                <p className="text-[9px] text-[#94A3B8] mb-1">Customer Support</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[15px] font-bold text-[#1E293B] leading-none">322</span>
                  <span className="text-[9px] text-[#94A3B8]">×</span>
                  <span className="text-[9px] font-semibold text-[#10B981]">+68%</span>
                </div>
                <p className="text-[8px] text-[#94A3B8] mt-0.5">Hour success 113%</p>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-[108px] border-l border-[#F1F5F9] bg-[#FAFBFF] flex flex-col shrink-0">
            {[
              { title: "Lead Optimization", grad: "from-[#60A5FA] to-[#818CF8]" },
              { title: "Customer Support", grad: "from-[#A78BFA] to-[#F472B6]" },
              { title: "Invoice Processing", grad: "from-[#F472B6] to-[#FB923C]" },
            ].map((item, i) => (
              <div key={i} className={`flex-1 p-2.5 ${i > 0 ? "border-t border-[#F1F5F9]" : ""}`}>
                <div className="flex items-start gap-1.5 mb-2">
                  <div className={`w-4 h-4 rounded bg-gradient-to-br ${item.grad} shrink-0 mt-0.5`} />
                  <p className="text-[8px] font-semibold text-[#374151] leading-tight">{item.title}</p>
                </div>
                {/* Avatars */}
                <div className="flex -space-x-1.5 mb-2">
                  {["#60A5FA", "#A78BFA", "#F472B6", "#34D399"].map((c, j) => (
                    <div key={j} className="w-[14px] h-[14px] rounded-full border-[1.5px] border-white" style={{ background: c }} />
                  ))}
                  <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-white bg-[#F1F5F9] flex items-center justify-center">
                    <span style={{ fontSize: 5 }} className="text-[#94A3B8] font-bold">+2</span>
                  </div>
                </div>
                {/* Pill controls */}
                <div className="flex gap-1">
                  <div className="h-1.5 w-5 rounded-full bg-[#E2E8F0]" />
                  <div className="h-1.5 w-3 rounded-full bg-[#818CF8]" />
                  <div className="h-1.5 w-3 rounded-full bg-[#F472B6]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Logo Bar ─────────────────────────────────────────────────────────────────

function StripeLogo() {
  return (
    <span className="font-bold text-[17px] text-[#1a1a2e] tracking-tight" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", letterSpacing: "-0.5px" }}>
      stripe
    </span>
  );
}

function NotionLogo() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-5 h-5 bg-[#1a1a2e] text-white text-[10px] font-black flex items-center justify-center rounded-sm select-none">N</span>
      <span className="font-semibold text-[15px] text-[#1a1a2e]">Notion</span>
    </span>
  );
}

function MondayLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-0.5 items-center">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F6396D] inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00] inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#00C875] inline-block" />
      </span>
      <span className="font-bold text-[15px] text-[#1a1a2e]">monday<span className="font-normal">.com</span></span>
    </span>
  );
}

function VercelLogo() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="14" height="12" viewBox="0 0 116 100" fill="#1a1a2e"><path d="M57.5 0L115 100H0L57.5 0z"/></svg>
      <span className="font-semibold text-[15px] text-[#1a1a2e]">Vercel</span>
    </span>
  );
}

function LinearLogo() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="16" height="16" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="linGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5E6AD2"/>
            <stop offset="100%" stopColor="#A78BFA"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#linGrad)"/>
        <path d="M22 70L70 22M22 52L52 22M22 34L34 22M48 78L78 48M64 78L78 64" stroke="white" strokeWidth="9" strokeLinecap="round"/>
      </svg>
      <span className="font-semibold text-[15px] text-[#1a1a2e]">Linear</span>
    </span>
  );
}

// ── Process Card Illustrations ────────────────────────────────────────────────

function IllustrationDiscover() {
  return (
    <div className="relative h-[140px] overflow-hidden" style={{ background: "linear-gradient(160deg,#DBEAFE 0%,#EDE9FE 100%)" }}>
      {/* Floating shapes */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2">
        {/* Main sphere */}
        <div
          className="w-20 h-20 rounded-full"
          style={{
            background: "linear-gradient(135deg,#93C5FD 0%,#818CF8 60%,#6366F1 100%)",
            boxShadow: "0 12px 32px rgba(99,102,241,0.45), inset -4px -6px 12px rgba(0,0,0,0.15), inset 3px 4px 8px rgba(255,255,255,0.3)",
          }}
        />
      </div>
      {/* Search icon badge */}
      <div
        className="absolute top-4 right-8 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#60A5FA,#6366F1)", boxShadow: "0 6px 16px rgba(99,102,241,0.4)", transform: "rotate(12deg)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </div>
      {/* Small orb bottom left */}
      <div
        className="absolute bottom-4 left-8 w-6 h-6 rounded-full"
        style={{ background: "linear-gradient(135deg,#C4B5FD,#818CF8)", boxShadow: "0 4px 10px rgba(129,140,248,0.4)" }}
      />
      {/* Tiny sparkle */}
      <div className="absolute top-6 left-10 w-3 h-3 rounded-full bg-blue-200/60" />
    </div>
  );
}

function IllustrationBuild() {
  return (
    <div className="relative h-[140px] overflow-hidden" style={{ background: "linear-gradient(160deg,#EDE9FE 0%,#FCE7F3 100%)" }}>
      {/* Map pin */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div
          className="w-14 h-14 rounded-full"
          style={{
            background: "linear-gradient(135deg,#C4B5FD 0%,#A78BFA 50%,#7C3AED 100%)",
            boxShadow: "0 10px 28px rgba(124,58,237,0.4), inset -3px -4px 10px rgba(0,0,0,0.18), inset 2px 3px 7px rgba(255,255,255,0.3)",
          }}
        />
        <div className="w-3 h-5 -mt-0.5" style={{ background: "linear-gradient(180deg,#7C3AED,#5B21B6)", clipPath: "polygon(50% 100%,0 0,100% 0)" }} />
        <div className="w-6 h-1.5 rounded-full bg-purple-300/50 mt-0.5" />
      </div>
      {/* Cloud shapes */}
      <div className="absolute top-5 right-7 flex">
        <div className="w-4 h-4 rounded-full bg-purple-200/70" />
        <div className="w-5 h-5 rounded-full bg-purple-200/70 -ml-2 -mt-1" />
        <div className="w-4 h-4 rounded-full bg-purple-200/70 -ml-1.5" />
      </div>
      <div className="absolute bottom-5 left-8 w-5 h-5 rounded-full bg-violet-200/60" />
    </div>
  );
}

function IllustrationDeploy() {
  return (
    <div className="relative h-[140px] overflow-hidden" style={{ background: "linear-gradient(160deg,#FCE7F3 0%,#FEE2E2 100%)" }}>
      {/* Sign post */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div
          className="w-16 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#F472B6 0%,#EC4899 50%,#DB2777 100%)", boxShadow: "0 8px 22px rgba(236,72,153,0.4)" }}
        >
          <span className="text-white font-bold text-base font-syne">OZ</span>
        </div>
        <div className="w-2 h-8" style={{ background: "linear-gradient(180deg,#EC4899,#F9A8D4)" }} />
        <div className="w-10 h-1.5 rounded-full bg-pink-300/60" />
      </div>
      {/* Document lines right side */}
      <div className="absolute top-8 right-7 space-y-1.5">
        <div className="w-9 h-1.5 rounded-full bg-pink-200/70" />
        <div className="w-6 h-1.5 rounded-full bg-pink-200/70" />
        <div className="w-8 h-1.5 rounded-full bg-pink-200/70" />
      </div>
      <div className="absolute bottom-5 left-8 w-5 h-5 rounded-full bg-rose-200/60" />
    </div>
  );
}

function IllustrationOptimize() {
  return (
    <div className="relative h-[140px] overflow-hidden" style={{ background: "linear-gradient(160deg,#EDE9FE 0%,#E0E7FF 100%)" }}>
      {/* Rocket body */}
      <div className="absolute top-4 left-1/2 -translate-x-6">
        <div
          className="w-12 h-16"
          style={{
            background: "linear-gradient(135deg,#C4B5FD 0%,#8B5CF6 50%,#6D28D9 100%)",
            borderRadius: "50% 50% 35% 35% / 60% 60% 40% 40%",
            boxShadow: "0 10px 28px rgba(109,40,217,0.4), inset -2px -3px 8px rgba(0,0,0,0.2)",
          }}
        />
        {/* Flame */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full blur-sm" style={{ background: "linear-gradient(180deg,#FDE68A,#FB923C)" }} />
      </div>
      {/* Person silhouette */}
      <div className="absolute bottom-5 right-8">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-300 to-violet-400 mx-auto" />
        <div className="w-7 h-6 rounded-t-xl bg-gradient-to-br from-violet-400 to-purple-500 mt-0.5" />
      </div>
      <div className="absolute top-6 right-10 w-4 h-4 rounded-full bg-indigo-200/60" />
    </div>
  );
}

// ── Main Hero export ──────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    Illustration: IllustrationDiscover,
    title: "Discover",
    description: "We audit your operations and identify high-impact opportunities.",
    stat: "+43%",
    statLabel: "Faster response time",
    statSub: "Business since pilot",
  },
  {
    Illustration: IllustrationBuild,
    title: "Build",
    description: "We design and build custom AI workflows and agents that fit your business.",
    stat: "2.7×",
    statLabel: "Lead conversion",
    statSub: "Benchmark clients",
  },
  {
    Illustration: IllustrationDeploy,
    title: "Build",
    description: "We design and build custom AI workflows and agents that fit your business.",
    stat: "61%",
    statLabel: "Faster Reply Time",
    statSub: "Marketplace Pipeline",
  },
  {
    Illustration: IllustrationOptimize,
    title: "Optimize",
    description: "We monitor performance, iterate and scale your systems over time.",
    stat: "24×",
    statLabel: "More Leads",
    statSub: "Series More Sooner.",
  },
];

export default function Hero({ settings }: Props) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;

  return (
    <>
      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#F5F3FF 40%,#EFF6FF 100%)" }}
      >
        {/* Background blob */}
        <div
          className="absolute top-0 right-0 w-[55%] h-[80%] pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(167,139,250,0.22) 0%, rgba(196,181,253,0.12) 40%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[30%] h-[40%] pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(147,197,253,0.18) 0%, transparent 60%)" }}
        />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── Left column ── */}
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-5"
              >
                <div className="w-2 h-2 rounded-full bg-[#3B82F6] shrink-0" />
                <span className="text-sm text-[#6B7280] font-dm">
                  {s("hero_eyebrow", "AI Systems that Deliver Results")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-syne font-bold leading-[1.1] tracking-tight text-[#111827] mb-5"
                style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}
              >
                {s("hero_headline_1", "We build AI systems")}
                <br />
                that{" "}
                <span className="text-[#3B82F6]">
                  {s("hero_highlight", "actually run")}
                </span>
                <br />
                {s("hero_headline_2", "your business.")}
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#6B7280] text-base leading-relaxed mb-8 font-dm max-w-[440px]"
              >
                {s(
                  "hero_subheadline",
                  "Custom AI agents, automations, and workflows that handle real work — so you can focus on growth, not operations."
                )}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white font-dm"
                  style={{
                    background: "linear-gradient(135deg,#6366F1 0%,#3B82F6 100%)",
                    boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
                  }}
                >
                  {s("hero_cta_primary_text", "Book a strategy call")}
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#374151] border border-[#D1D5DB] bg-white hover:bg-gray-50 transition-colors font-dm"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  {s("hero_cta_secondary_text", "See our work")}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* ── Right column ── */}
            <div className="hidden lg:flex justify-end">
              <DashboardCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo Bar ── */}
      <section className="py-7 px-6 lg:px-8 bg-white border-b border-[#F1F5F9]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            <StripeLogo />
            <NotionLogo />
            <MondayLogo />
            <VercelLogo />
            <LinearLogo />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center font-syne font-bold text-[#111827] leading-tight mb-10"
            style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)" }}
          >
            AI solutions built for{" "}
            <span className="text-[#3B82F6]">real business impact.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg,rgba(238,242,255,0.85) 0%,rgba(245,240,255,0.90) 50%,rgba(235,245,255,0.85) 100%)",
              border: "1px solid rgba(196,181,253,0.25)",
              boxShadow: "0 8px 32px rgba(139,92,246,0.08)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(196,181,253,0.25)]">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="px-10 py-8 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)" }}
                  />
                  <div className="flex items-baseline">
                    <span className="font-syne font-bold text-[#111827]" style={{ fontSize: "clamp(2.8rem,6vw,4rem)", lineHeight: 1 }}>
                      {s("stat_1_value", "43")}
                    </span>
                    <span className="font-syne font-bold text-[#111827] text-2xl">%</span>
                  </div>
                </div>
                <p className="text-[#6B7280] font-dm text-sm">{s("stat_1_label", "Faster response time")}</p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="px-10 py-8 text-center"
              >
                <div className="flex items-baseline justify-center mb-2">
                  <span className="font-syne font-bold text-[#111827]" style={{ fontSize: "clamp(2.8rem,6vw,4rem)", lineHeight: 1 }}>
                    {s("stat_2_value", "2.7")}
                  </span>
                  <span className="font-syne font-bold text-[#111827] text-3xl">×</span>
                </div>
                <p className="text-[#6B7280] font-dm text-sm">{s("stat_2_label", "Lead conversion")}</p>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="px-10 py-8 text-center"
              >
                <div className="flex items-baseline justify-center mb-2">
                  <span className="font-syne font-bold text-[#111827]" style={{ fontSize: "clamp(2.8rem,6vw,4rem)", lineHeight: 1 }}>
                    {s("stat_3_value", "18")}
                  </span>
                  <span className="font-syne font-bold text-[#111827] text-xl ml-1">hrs/week</span>
                </div>
                <p className="text-[#6B7280] font-dm text-sm">{s("stat_3_label", "Performance: time")}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Process Cards ── */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header row */}
          <div className="flex items-start justify-between gap-6 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="font-syne font-bold text-[#111827] leading-tight"
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}
            >
              AI solutions built for
              <br />
              <span className="text-[#3B82F6]">real business impact.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="shrink-0 mt-2"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#374151] border border-[#D1D5DB] bg-white hover:bg-gray-50 transition-colors font-dm whitespace-nowrap"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                Book a strategy call
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map(({ Illustration, title, description, stat, statLabel, statSub }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden bg-white flex flex-col"
                style={{
                  border: "1px solid rgba(226,232,240,0.8)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                {/* Illustration */}
                <Illustration />

                {/* Content */}
                <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
                  {/* Step badge */}
                  <span
                    className="self-start text-[10px] font-bold text-[#9CA3AF] border border-[#E5E7EB] rounded-full px-2.5 py-0.5 font-dm mb-2.5"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-syne font-bold text-[17px] text-[#111827] mb-1.5">{title}</h3>
                  <p className="text-xs text-[#6B7280] font-dm leading-relaxed flex-1 mb-4">{description}</p>

                  {/* Stat badge */}
                  <div
                    className="rounded-xl px-3 py-3"
                    style={{ background: "linear-gradient(135deg,rgba(224,231,255,0.7) 0%,rgba(237,233,254,0.7) 100%)" }}
                  >
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="font-syne font-bold text-[#111827]" style={{ fontSize: "1.35rem", lineHeight: 1 }}>{stat}</span>
                      <span className="text-[11px] text-[#6B7280] font-dm">{statLabel}</span>
                    </div>
                    <p className="text-[10px] text-[#9CA3AF] font-dm">{statSub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
