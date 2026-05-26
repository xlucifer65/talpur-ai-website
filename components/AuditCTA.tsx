"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "Map every manual process costing your team time",
  "Identify the highest-ROI automation opportunities",
  "Get a custom AI workflow blueprint for your business",
  "See what 30, 60, and 90-day automation looks like",
];

const painPoints = [
  { label: "Manual data entry", hours: "12 hrs/wk" },
  { label: "Lead follow-up delays", hours: "8 hrs/wk" },
  { label: "Report generation", hours: "6 hrs/wk" },
  { label: "CRM updates", hours: "5 hrs/wk" },
];

export default function AuditCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="audit" className="py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-blue/[0.05] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <div className="border border-theme glass p-10 lg:p-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-medium text-accent-blue tracking-widest uppercase font-dm mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              Free offer
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-syne font-bold text-[clamp(1.8rem,4vw,3rem)] text-text-primary leading-tight mb-4"
            >
              Get Your Free AI
              <br />
              <span className="text-accent-blue">Automation Audit</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-secondary font-dm leading-relaxed mb-8"
            >
              Most businesses are losing 30+ hours per week to manual work they don&apos;t know can be automated. In a free 45-minute audit, we map your operations and show you exactly where AI saves you time and money.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 mb-10"
            >
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-text-secondary font-dm">
                  <CheckCircle size={16} className="text-accent-blue mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </motion.ul>

            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors duration-200 border border-accent-blue group"
            >
              Book Your Free Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
            <p className="mt-3 text-xs text-text-secondary font-dm">No commitment. 45 minutes. Real insights.</p>
          </div>

          {/* Right: dashboard visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="border border-theme bg-surface p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-text-secondary font-dm">operations-audit.ai</span>
              </div>

              <div className="mb-5">
                <div className="text-xs text-text-secondary font-dm mb-3 uppercase tracking-widest">
                  Hidden manual work detected
                </div>
                <div className="space-y-3">
                  {painPoints.map((p, i) => (
                    <motion.div
                      key={p.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs text-text-secondary font-dm">{p.label}</span>
                        <div className="flex-1 h-px bg-white/[0.05]" />
                      </div>
                      <span className="text-xs text-red-400 font-dm font-medium ml-3">{p.hours}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-subtle pt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-text-secondary font-dm">Total recoverable time</div>
                  <div className="font-syne font-bold text-2xl text-accent-blue mt-0.5">31 hrs/wk</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-text-secondary font-dm">Automation potential</div>
                  <div className="font-syne font-bold text-2xl text-text-primary mt-0.5">High</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
