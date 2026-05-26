"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/db";

// ── Category colour map ──────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { badge: string; wave: string; dot: string }> = {
  "AI Strategy": {
    badge: "bg-[#3B82F6] text-white",
    wave: "#3B82F6",
    dot: "#60A5FA",
  },
  "Support Automation": {
    badge: "bg-[#8B5CF6] text-white",
    wave: "#8B5CF6",
    dot: "#A78BFA",
  },
  "Sales Automation": {
    badge: "bg-[#EC4899] text-white",
    wave: "#EC4899",
    dot: "#F472B6",
  },
};

function getCategoryConfig(cat: string) {
  return CATEGORY_CONFIG[cat] ?? { badge: "bg-[#6B7280] text-white", wave: "#6B7280", dot: "#9CA3AF" };
}

// ── Abstract card illustration ───────────────────────────────────────────────
function CardIllustration({ color, dot }: { color: string; dot: string }) {
  return (
    <div className="absolute top-0 right-0 w-44 h-36 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 176 144" fill="none" className="w-full h-full">
        {/* Large soft blob */}
        <circle cx="148" cy="28" r="70" fill={color} fillOpacity="0.10" />
        <circle cx="120" cy="8" r="44" fill={color} fillOpacity="0.08" />

        {/* Flowing curves */}
        <path
          d="M176 0 C160 30 140 50 176 90"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />
        <path
          d="M176 20 C148 55 120 60 176 100"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.15"
          strokeLinecap="round"
        />

        {/* 3D-style orb top-right */}
        <defs>
          <radialGradient id={`orb-${color.replace("#", "")}`} cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="50%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle
          cx="152"
          cy="22"
          r="20"
          fill={`url(#orb-${color.replace("#", "")})`}
        />
        <circle cx="120" cy="42" r="10" fill={color} fillOpacity="0.15" />

        {/* Dot grid */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={106 + col * 10}
              cy={80 + row * 10}
              r="1.2"
              fill={dot}
              fillOpacity="0.30"
            />
          ))
        )}
      </svg>
    </div>
  );
}

// ── Single blog card ─────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cfg = getCategoryConfig(post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative bg-white rounded-2xl flex flex-col overflow-hidden cursor-pointer group"
      style={{
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Illustration – sits behind everything */}
      <CardIllustration color={cfg.wave} dot={cfg.dot} />

      <div className="relative flex flex-col flex-1 p-6 lg:p-7">
        {/* Category badge */}
        <div className="mb-5">
          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold font-dm ${cfg.badge}`}>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-syne font-bold text-[17px] leading-snug text-[#111827] mb-3 group-hover:text-[#3B82F6] transition-colors duration-200 flex-1">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[#6B7280] font-dm text-sm leading-relaxed mb-6">
          {post.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] font-dm">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
            <span>{post.read_time}</span>
          </div>
          <span className="flex items-center gap-1.5 text-sm text-[#3B82F6] font-dm font-semibold group-hover:gap-2.5 transition-all duration-200">
            Read
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ── Hero decorative background ───────────────────────────────────────────────
function HeroDecoration() {
  return (
    <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 600 320" fill="none" className="absolute top-0 right-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="h1" cx="60%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="h2" cx="40%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbBig" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="orbSm" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <ellipse cx="480" cy="140" rx="220" ry="180" fill="url(#h1)" />
        <ellipse cx="360" cy="80" rx="180" ry="140" fill="url(#h2)" />

        {/* Flowing wave path */}
        <path
          d="M 300 300 Q 380 200 440 120 T 600 40"
          stroke="#C4B5FD"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 250 320 Q 340 220 420 140 T 600 80"
          stroke="#93C5FD"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* 3D orbs */}
        <circle cx="460" cy="100" r="55" fill="url(#orbBig)" />
        <circle cx="380" cy="55" r="28" fill="url(#orbSm)" />
        <circle cx="510" cy="170" r="18" fill="#818CF8" fillOpacity="0.12" />
        <circle cx="340" cy="160" r="12" fill="#60A5FA" fillOpacity="0.15" />

        {/* Dot grid */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={310 + col * 16}
              cy={200 + row * 16}
              r="1.5"
              fill="#818CF8"
              fillOpacity="0.22"
            />
          ))
        )}
      </svg>
    </div>
  );
}

// ── Main page component ──────────────────────────────────────────────────────
interface Props {
  posts: BlogPost[];
}

export default function BlogClientPage({ posts }: Props) {
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <main className="min-h-screen" style={{ background: "#FFFFFF" }}>
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden pt-32 pb-16 px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#F5F3FF 60%,#EFF6FF 100%)" }}
      >
        <HeroDecoration />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-[#3B82F6] tracking-[0.18em] uppercase font-dm mb-4">
              Our Thinking
            </p>
            <h1
              className="font-syne font-bold text-[#111827] leading-tight mb-5"
              style={{ fontSize: "clamp(2.4rem,6vw,4rem)" }}
            >
              Insights &amp; Analysis
            </h1>
            <p className="text-[#6B7280] font-dm text-lg leading-relaxed max-w-lg">
              AI strategy, automation patterns, and real-world implementation
              notes from the talpur.ai team.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Filter tabs + cards ── */}
      <div className="px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {categories.map((cat) => {
              const isActive = active === cat;
              const cfg = getCategoryConfig(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActive(isActive ? null : cat)}
                  className="px-5 py-2 rounded-full text-sm font-medium font-dm transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg,${cfg.wave},${cfg.dot})`,
                          color: "white",
                          border: "1px solid transparent",
                          boxShadow: `0 4px 14px ${cfg.wave}40`,
                        }
                      : {
                          background: "white",
                          color: "#374151",
                          border: "1px solid #E5E7EB",
                        }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
