"use client";

import { motion } from "framer-motion";
import { Search, Settings, Settings2, Rocket } from "lucide-react";

// ── Shared page background decoration ────────────────────────────────────────
function PageDecoration() {
  return (
    <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 700 480" fill="none" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="hw-o1" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="hw-o2" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#F9A8D4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="hw-o3" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#6EE7B7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="hw-bg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="580" cy="200" rx="280" ry="240" fill="url(#hw-bg)" />
        {/* Wave paths */}
        <path d="M700 50 Q 560 120 480 200 T 300 380" stroke="#C4B5FD" strokeWidth="2" strokeOpacity="0.35" fill="none" strokeLinecap="round"/>
        <path d="M700 120 Q 550 180 460 260 T 280 420" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.25" fill="none" strokeLinecap="round"/>
        <path d="M700 20 Q 600 100 520 180 T 360 340" stroke="#F9A8D4" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeLinecap="round"/>
        {/* Orbs */}
        <circle cx="480" cy="140" r="40" fill="url(#hw-o1)" />
        <circle cx="580" cy="240" r="26" fill="url(#hw-o2)" />
        <circle cx="420" cy="260" r="18" fill="url(#hw-o3)" />
        <circle cx="550" cy="340" r="14" fill="#C4B5FD" fillOpacity="0.25" />
        {/* Dot grid */}
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={400 + c * 22} cy={320 + r * 22} r="1.8" fill="#818CF8" fillOpacity="0.22" />
          ))
        )}
      </svg>
    </div>
  );
}

const STEPS = [
  {
    number: "01",
    Icon: Search,
    title: "Analyze Business Operations",
    description:
      "We map your current workflows, identify bottlenecks, and pinpoint exactly where manual work is costing you time and money. Ensure you see the bigger operational picture.",
    outcome: "Full operations audit delivered",
  },
  {
    number: "02",
    Icon: Settings,
    title: "Identify Automation Opportunities",
    description:
      "From repetitive tasks to complex multi-step processes, we find every opportunity where AI can replace manual effort, reduce errors, and accelerate throughput.",
    outcome: "Prioritized automation roadmap",
  },
  {
    number: "03",
    Icon: Settings2,
    title: "Build AI Workflow Systems",
    description:
      "We design and build custom AI agents, integrations, and workflow systems that operate inside your existing tools — CRM, email, Slack, databases, and more.",
    outcome: "Production-ready AI systems",
  },
  {
    number: "04",
    Icon: Rocket,
    title: "Deploy & Optimize",
    description:
      "Systems go live with full monitoring in place. We track performance, refine workflows, and continuously improve so your automation gets smarter over time.",
    outcome: "Ongoing optimization & support",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative min-h-screen py-20 lg:py-28 px-6 lg:px-8 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#F5F3FF 50%,#EFF6FF 100%)" }}
    >
      <PageDecoration />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-bold text-[#3B82F6] tracking-[0.18em] uppercase font-dm mb-4">
            Our Process
          </p>
          <h2 className="font-syne font-bold text-[#111827] leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>
            How we build your
            <br />
            <span className="text-[#6366F1]">automation system.</span>
          </h2>
          <p className="text-[#6B7280] font-dm text-base leading-relaxed max-w-lg">
            Every industry has different bottlenecks. We build systems that solve the real operational problems in your specific sector.
          </p>
        </motion.div>

        {/* Step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(({ number, Icon, title, description, outcome }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={{
                border: "1px solid rgba(226,232,240,0.8)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Number badge */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg,#818CF8,#6366F1)" }}
              >
                <span className="text-white font-syne font-bold text-xs">{number}</span>
              </div>

              {/* Icon */}
              <div className="mb-5">
                <Icon size={28} className="text-[#818CF8]" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-syne font-bold text-[17px] text-[#111827] leading-snug mb-3">
                {title}
              </h3>

              {/* Description */}
              <p className="text-[#6B7280] font-dm text-sm leading-relaxed flex-1 mb-5">
                {description}
              </p>

              {/* Outcome pill */}
              <div
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium font-dm text-[#6366F1]"
                style={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(238,242,255,0.6)" }}
              >
                <span className="text-[#9CA3AF]">&gt;</span>
                {outcome}
                <span className="ml-auto text-[#9CA3AF]">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
