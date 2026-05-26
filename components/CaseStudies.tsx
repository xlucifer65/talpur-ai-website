"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    id: "saas-support",
    industry: "SaaS Company",
    challenge: "Support team handling 1,200+ tickets/month manually, 48-hour average response time, high agent burnout.",
    solution: "Deployed an AI triage system trained on historical tickets. Tier-1 issues resolved automatically. Complex cases routed with full context.",
    metrics: [
      { value: "75%", label: "tickets auto-resolved" },
      { value: "4 hrs", label: "average response time" },
      { value: "60%", label: "support cost reduction" },
    ],
    tag: "Support Automation",
  },
  {
    id: "real-estate-leads",
    industry: "Real Estate Agency",
    challenge: "Agents manually following up 300+ monthly leads. 60% of leads went cold due to slow response. No lead scoring system.",
    solution: "Built an AI lead qualification system with instant response, intent scoring, and CRM auto-population. Hot leads routed to agents within 60 seconds.",
    metrics: [
      { value: "5×", label: "faster lead response" },
      { value: "42%", label: "increase in qualified calls" },
      { value: "Zero", label: "leads lost to slow follow-up" },
    ],
    tag: "Lead Generation",
  },
  {
    id: "ecom-ops",
    industry: "Ecommerce Brand",
    challenge: "Order management, inventory updates, and customer refund processing required 3 full-time operations staff.",
    solution: "Automated order-to-fulfillment workflow, AI-powered refund processing, and inventory sync across Shopify, 3PL, and supplier systems.",
    metrics: [
      { value: "40 hrs", label: "saved per week" },
      { value: "99.2%", label: "order accuracy rate" },
      { value: "3→1", label: "ops headcount reduction" },
    ],
    tag: "Operations Automation",
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="py-24 lg:py-32 px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm"
            >
              Results
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] text-text-primary mt-3 leading-tight max-w-2xl"
            >
              What automation
              <br />
              <span className="text-text-secondary font-medium">actually delivers.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-8"
          >
            {[
              { value: "40+", label: "hrs saved weekly" },
              { value: "70%", label: "avg cost reduction" },
            ].map((m) => (
              <div key={m.label}>
                <div className="font-syne font-bold text-3xl text-text-primary">{m.value}</div>
                <div className="text-xs text-text-secondary font-dm mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="space-y-0 border border-theme">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`p-8 lg:p-10 grid lg:grid-cols-[1fr,1.2fr,auto] gap-8 items-start group hover-overlay transition-colors duration-300 ${
                i < cases.length - 1 ? "border-b border-theme" : ""
              }`}
            >
              {/* Left: meta */}
              <div>
                <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-accent-blue bg-badge border border-accent-blue/20 font-dm mb-4">
                  {c.tag}
                </span>
                <h3 className="font-syne font-semibold text-xl text-text-primary mb-3 group-hover:text-accent-blue transition-colors duration-200">
                  {c.industry}
                </h3>
                <p className="text-text-secondary font-dm text-sm leading-relaxed">
                  <span className="text-text-primary/60 font-medium">Challenge: </span>
                  {c.challenge}
                </p>
              </div>

              {/* Center: solution */}
              <div className="lg:border-l lg:border-subtle lg:pl-8">
                <div className="text-xs font-medium text-text-secondary font-dm tracking-wide uppercase mb-3">
                  Automation strategy
                </div>
                <p className="text-text-secondary font-dm text-sm leading-relaxed">
                  {c.solution}
                </p>
              </div>

              {/* Right: metrics */}
              <div className="flex lg:flex-col gap-6 lg:gap-5 lg:min-w-[140px]">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-syne font-bold text-2xl text-accent-blue">{m.value}</div>
                    <div className="text-xs text-text-secondary font-dm mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-text-secondary font-dm">
            Want results like these for your business?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-accent-blue-hover transition-colors font-dm"
          >
            Book a free automation audit
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
