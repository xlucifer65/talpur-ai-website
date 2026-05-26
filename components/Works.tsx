"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

interface Work {
  id: number;
  title: string;
  category: string;
  description: string;
  outcome: string;
  tags: string;
  image_url: string;
  featured: number;
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  let tags: string[] = [];
  try { tags = JSON.parse(work.tags); } catch {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`border border-theme hover-overlay transition-colors duration-300 group ${work.featured ? "lg:col-span-2" : ""}`}
    >
      {/* Image area */}
      <div className={`bg-surface border-b border-theme flex items-center justify-center ${work.featured ? "h-72" : "h-48"} overflow-hidden relative`}>
        {work.image_url ? (
          <img src={work.image_url} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border border-theme flex items-center justify-center mx-auto mb-3">
                <span className="font-syne font-bold text-xl text-accent-blue">{work.category.slice(0,2).toUpperCase()}</span>
              </div>
              <span className="text-xs text-text-secondary font-dm">{work.category}</span>
            </div>
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
          </div>
        )}
        {work.featured === 1 && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent-blue text-white text-xs font-dm font-medium">
            Featured
          </div>
        )}
      </div>

      <div className="p-7">
        <div className="flex items-start justify-between mb-4">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-accent-blue bg-badge border border-accent-blue/20 font-dm">
            {work.category}
          </span>
          <ArrowUpRight size={15} className="text-text-secondary group-hover:text-accent-blue transition-colors" />
        </div>

        <h3 className="font-syne font-semibold text-xl text-text-primary mb-3 group-hover:text-accent-blue transition-colors duration-200">
          {work.title}
        </h3>

        <p className="text-text-secondary font-dm text-sm leading-relaxed mb-5">
          {work.description}
        </p>

        <div className="border-t border-theme pt-5">
          <div className="text-xs text-text-secondary font-dm mb-1 uppercase tracking-widest">Outcome</div>
          <p className="text-sm font-dm text-accent-blue font-medium">{work.outcome}</p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 border border-theme text-text-secondary font-dm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

const PLACEHOLDER_WORKS: Work[] = [
  {
    id: -1, featured: 1,
    title: "AI Lead Qualification System — Real Estate Agency",
    category: "Lead Generation",
    description: "Built a fully automated lead capture and qualification system. AI agents engage inbound leads instantly, score intent, enrich contact data, and route hot prospects to agents within 60 seconds — 24/7.",
    outcome: "5× faster response · 42% increase in qualified calls · Zero leads lost",
    tags: JSON.stringify(["AI Agents", "CRM Integration", "Make.com", "GPT-4"]),
    image_url: "",
  },
  {
    id: -2, featured: 0,
    title: "Automated Support Triage — SaaS Company",
    category: "Support Automation",
    description: "Deployed an AI triage and resolution system trained on historical ticket data. Tier-1 issues resolved automatically; complex tickets routed with full context to the right agent.",
    outcome: "75% tickets auto-resolved · Response time from 48hrs to 4hrs",
    tags: JSON.stringify(["AI Classification", "Zendesk", "OpenAI", "Zapier"]),
    image_url: "",
  },
  {
    id: -3, featured: 0,
    title: "Ecommerce Operations Automation",
    category: "Operations",
    description: "End-to-end automation of order management, inventory sync across Shopify and 3PL, and AI-powered refund processing — replacing 3 full-time operations roles.",
    outcome: "40 hrs/wk saved · 99.2% order accuracy · 3→1 ops headcount",
    tags: JSON.stringify(["Shopify", "3PL Integration", "Airtable", "Automation"]),
    image_url: "",
  },
  {
    id: -4, featured: 0,
    title: "Marketing Intelligence Dashboard",
    category: "Marketing Automation",
    description: "Automated campaign performance reporting, competitor monitoring, and content intelligence pipeline — turning manual analyst work into real-time operational insight.",
    outcome: "Daily reports automated · 6 hrs/wk analyst time eliminated",
    tags: JSON.stringify(["Data Pipeline", "GPT-4", "Google Sheets", "Make.com"]),
    image_url: "",
  },
];

interface Props {
  works: Work[];
}

export default function Works({ works }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const display = works.length > 0 ? works : PLACEHOLDER_WORKS;
  const isPlaceholder = works.length === 0;

  return (
    <div>
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={ref} className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
                className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm">
                Portfolio
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] text-text-primary mt-3 leading-tight max-w-2xl">
                Automation systems
                <br />
                <span className="text-text-secondary font-medium">we&apos;ve shipped.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-text-secondary font-dm max-w-xl">
                Real systems built for real businesses. Each project starts with understanding the operation before writing a single line of automation.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors border border-accent-blue">
                Start a project
              </Link>
            </motion.div>
          </div>

          {isPlaceholder && (
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
              className="mb-8 px-4 py-3 border border-accent-blue/20 bg-badge inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-xs text-accent-blue font-dm">
                Showing example projects — upload your own from the <a href="/admin" className="underline">admin panel</a>
              </span>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
            {display.map((work, i) => (
              <WorkCard key={work.id} work={work} index={i} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mt-16 border border-theme p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-syne font-semibold text-xl text-text-primary mb-2">Want results like these?</h3>
              <p className="text-text-secondary font-dm text-sm">Book a free 45-minute automation audit and see what we can build for your business.</p>
            </div>
            <Link href="/audit" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors border border-accent-blue flex-shrink-0">
              Get Free Audit <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
