"use client";

import { motion } from "framer-motion";
import { Home, ShoppingCart, Briefcase, Users, Truck, Headphones } from "lucide-react";

function PageDecoration() {
  return (
    <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 700 480" fill="none" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="sl-o1" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="sl-o2" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#F9A8D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="sl-o3" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#6EE7B7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="sl-bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="560" cy="190" rx="300" ry="260" fill="url(#sl-bg)" />
        {/* Flowing wave paths */}
        <path d="M700 30 Q 560 100 480 200 T 320 400" stroke="#C4B5FD" strokeWidth="2" strokeOpacity="0.30" fill="none" strokeLinecap="round"/>
        <path d="M700 90 Q 550 160 470 260 T 300 450" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.22" fill="none" strokeLinecap="round"/>
        <path d="M700 0 Q 620 80 560 160 T 440 350" stroke="#F9A8D4" strokeWidth="1" strokeOpacity="0.18" fill="none" strokeLinecap="round"/>
        {/* Orbs */}
        <circle cx="500" cy="130" r="44" fill="url(#sl-o1)" />
        <circle cx="600" cy="240" r="28" fill="url(#sl-o2)" />
        <circle cx="440" cy="260" r="20" fill="url(#sl-o3)" />
        <circle cx="560" cy="340" r="14" fill="#DDD6FE" fillOpacity="0.4" />
        {/* Dot grid */}
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={400 + c * 22} cy={330 + r * 22} r="1.8" fill="#818CF8" fillOpacity="0.20" />
          ))
        )}
      </svg>
    </div>
  );
}

const INDUSTRIES = [
  {
    Icon: Home,
    title: "Real Estate",
    description:
      "Agents spend hours manually following up leads, qualifying prospects, and updating CRM records — leading to high-value deals",
    iconColor: "#6366F1",
    iconBg: "rgba(238,242,255,0.8)",
  },
  {
    Icon: ShoppingCart,
    title: "Ecommerce",
    description:
      "Manual order management, repetitive customer support tickets, and disconnected sales channels clog ecomm and burn out teams.",
    iconColor: "#6366F1",
    iconBg: "rgba(238,242,255,0.8)",
  },
  {
    Icon: Briefcase,
    title: "Agencies",
    description:
      "Client reporting, project updates, ad proposal generation done manually — key info silved and not delivering actual work.",
    iconColor: "#EC4899",
    iconBg: "rgba(253,242,248,0.8)",
  },
  {
    Icon: Users,
    title: "Sales Teams",
    description:
      "High-volume teams are unqualified leads, poor visibility into follow-ups — losing deals to faster competitors.",
    iconColor: "#6366F1",
    iconBg: "rgba(238,242,255,0.8)",
  },
  {
    Icon: Truck,
    title: "Logistics & Operations",
    description:
      "Fragmented data across shipments, orders, and expensive manual coordination create poor margins.",
    iconColor: "#6366F1",
    iconBg: "rgba(238,242,255,0.8)",
  },
  {
    Icon: Headphones,
    title: "Customer Support",
    description:
      "Support team deals with repetitive tickets while complex issues go unresolved — leading to churn and poor CSAT scores.",
    iconColor: "#6366F1",
    iconBg: "rgba(238,242,255,0.8)",
  },
];

export default function Solutions() {
  return (
    <section
      id="solutions"
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
            By Industry
          </p>
          <h2 className="font-syne font-bold text-[#111827] leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>
            Automation built
            <br />
            <span className="text-[#6366F1]">for your industry.</span>
          </h2>
          <p className="text-[#6B7280] font-dm text-base leading-relaxed max-w-lg">
            Every industry has different bottlenecks. We build systems that solve the real operational problems in your specific sector.
          </p>
        </motion.div>

        {/* Industry cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map(({ Icon, title, description, iconColor, iconBg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 flex flex-col gap-3"
              style={{
                border: "1px solid rgba(226,232,240,0.8)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: iconBg }}
              >
                <Icon size={22} style={{ color: iconColor }} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-syne font-bold text-[17px] text-[#111827]">{title}</h3>

              {/* Description */}
              <p className="text-[#6B7280] font-dm text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
