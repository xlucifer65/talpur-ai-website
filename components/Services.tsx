"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, BarChart2, Headphones, Megaphone, PieChart, ChevronUp, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/db";

// ── Page decoration ───────────────────────────────────────────────────────────
function PageDecoration() {
  return (
    <div className="absolute top-0 right-0 w-[50%] h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 700 480" fill="none" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="sv-o1" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="sv-o2" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#F9A8D4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="sv-o3" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#6EE7B7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="sv-bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="550" cy="200" rx="290" ry="260" fill="url(#sv-bg)" />
        <path d="M700 40 Q 560 110 480 210 T 300 400" stroke="#C4B5FD" strokeWidth="2" strokeOpacity="0.30" fill="none" strokeLinecap="round"/>
        <path d="M700 100 Q 550 170 460 270 T 280 450" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.22" fill="none" strokeLinecap="round"/>
        <path d="M700 10 Q 620 90 560 170 T 430 360" stroke="#F9A8D4" strokeWidth="1" strokeOpacity="0.18" fill="none" strokeLinecap="round"/>
        <circle cx="490" cy="140" r="44" fill="url(#sv-o1)" />
        <circle cx="600" cy="250" r="28" fill="url(#sv-o2)" />
        <circle cx="430" cy="270" r="18" fill="url(#sv-o3)" />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={380 + c * 22} cy={330 + r * 22} r="1.8" fill="#818CF8" fillOpacity="0.20" />
          ))
        )}
      </svg>
    </div>
  );
}

// ── Icon map ──────────────────────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, React.ElementType> = {
  "AI Strategy & Consulting": Brain,
  "Sales Automation & Lead Generation": BarChart2,
  "Customer Support Automation": Headphones,
  "Marketing Intelligence & Execution": Megaphone,
  "Business Intelligence & Reporting": PieChart,
};

function getIcon(title: string): React.ElementType {
  return SERVICE_ICONS[title] ?? Brain;
}

// ── Accordion row ─────────────────────────────────────────────────────────────
interface RowProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  isFirst: boolean;
}

function ServiceRow({ title, description, isOpen, onToggle, isFirst }: RowProps) {
  const Icon = getIcon(title);
  return (
    <div
      className={`bg-white ${isFirst ? "rounded-t-2xl" : ""} ${!isFirst && !isOpen ? "" : ""}`}
      style={{ borderBottom: "1px solid rgba(226,232,240,0.8)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50/50"
      >
        {/* Icon circle */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(238,242,255,0.9)", border: "1px solid rgba(99,102,241,0.15)" }}
        >
          <Icon size={18} className="text-[#6366F1]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <span className={`flex-1 font-syne font-semibold text-[15px] ${isOpen ? "text-[#111827]" : "text-[#374151]"}`}>
          {title}
        </span>

        {/* Toggle icon */}
        {isOpen ? (
          <ChevronUp size={18} className="text-[#6366F1] shrink-0" />
        ) : (
          <ArrowRight size={18} className="text-[#9CA3AF] shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 pl-20 text-[#6B7280] font-dm text-sm leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Default services (fallback if DB empty) ───────────────────────────────────
const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "AI Strategy & Consulting",
    description: "Developing tailored AI roadmaps and strategic guidance for transformative growth.",
  },
  {
    id: 2,
    title: "Sales Automation & Lead Generation",
    description: "Automated lead capture, qualification, and nurturing systems that work 24/7.",
  },
  {
    id: 3,
    title: "Customer Support Automation",
    description: "AI-powered support systems that resolve tickets, learn from history, and escalate when needed.",
  },
  {
    id: 4,
    title: "Marketing Intelligence & Execution",
    description: "Real-time analytics, automated campaigns, and competitive monitoring systems.",
  },
  {
    id: 5,
    title: "Business Intelligence & Reporting",
    description: "Automated reporting decks, KPI dashboards, and financial modelling — always current.",
  },
];

interface Props {
  services?: Service[];
  settings?: Record<string, string>;
}

export default function Services({ services = [], settings = {} }: Props) {
  const s = (key: string, fb: string) => settings[key] ?? fb;

  const rows =
    services.length > 0
      ? services.map((svc) => ({
          id: svc.id,
          title: svc.title,
          description: svc.insight,
        }))
      : DEFAULT_SERVICES;

  const [openId, setOpenId] = useState<number | string>(rows[0]?.id ?? 1);

  return (
    <section
      id="services"
      className="relative min-h-screen py-20 lg:py-28 px-6 lg:px-8 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#F5F3FF 50%,#EFF6FF 100%)" }}
    >
      <PageDecoration />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-bold text-[#3B82F6] tracking-[0.18em] uppercase font-dm mb-4">
            {s("services_eyebrow", "What We Do")}
          </p>
          <h2 className="font-syne font-bold text-[#111827] leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>
            {s("services_headline_1", "Five capabilities.")}
            <br />
            <span className="text-[#6366F1]">{s("services_headline_2", "One integrated system.")}</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        >
          {rows.map((row, i) => (
            <ServiceRow
              key={row.id}
              title={row.title}
              description={row.description}
              isOpen={openId === row.id}
              onToggle={() => setOpenId(openId === row.id ? -1 : row.id)}
              isFirst={i === 0}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
