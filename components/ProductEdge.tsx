"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Brain } from "lucide-react";

interface Props {
  settings?: Record<string, string>;
}

export default function ProductEdge({ settings = {} }: Props) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  let card1Bullets: string[] = ["Intent capture across channels", "Automatic qualification & scoring", "Real-time data enrichment", "Smart routing to the right rep"];
  let card2Bullets: string[] = ["Learns from call transcripts", "Converts conversations to knowledge", "Continuously improves accuracy", "Reduces human agent dependency"];
  let founderTags: string[] = ["NVIDIA Certified", "Agile AI PM", "PMI-ACP", "9+ Years", "AI Automation Expert"];

  try { card1Bullets = JSON.parse(s("about_card1_bullets", JSON.stringify(card1Bullets))); } catch {}
  try { card2Bullets = JSON.parse(s("about_card2_bullets", JSON.stringify(card2Bullets))); } catch {}
  try { founderTags = JSON.parse(s("founder_tags", JSON.stringify(founderTags))); } catch {}

  const cards = [
    {
      id: "lead",
      badge: s("about_card1_badge", "Lead generation"),
      icon: Zap,
      title: s("about_card1_title", "AI Lead Generation Systems"),
      description: s("about_card1_description", "Systems that capture user intent across channels, qualify leads automatically, enrich data in real time, and route to the right sales rep — without manual work."),
      bullets: card1Bullets,
    },
    {
      id: "support",
      badge: s("about_card2_badge", "Self-improving"),
      icon: Brain,
      title: s("about_card2_title", "AI Support Learning Systems"),
      description: s("about_card2_description", "Systems that learn from call center conversations — converting transcripts into structured knowledge that continuously improves responses and reduces dependency on human agents."),
      bullets: card2Bullets,
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm"
          >
            {s("about_eyebrow", "Beyond automation")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] text-text-primary mt-3 leading-tight max-w-3xl"
          >
            {s("about_headline_1", "Systems > Prompts.")}
            <br />
            <span className="text-text-secondary font-medium">
              {s("about_headline_2", "Execution > Ideas.")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-text-secondary text-lg max-w-2xl font-dm leading-relaxed"
          >
            {s("about_paragraph", "We build AI execution infrastructure — not demos. Our systems work inside your existing tools, produce structured outputs, and keep humans in control of every critical decision.")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border border-theme">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`p-8 lg:p-10 ${
                  i === 0 ? "border-b lg:border-b-0 lg:border-r border-theme" : ""
                } group hover-overlay transition-colors duration-300 bg-surface`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-accent-blue bg-badge border border-accent-blue/20 font-dm tracking-wide">
                    {card.badge}
                  </span>
                  <div className="w-10 h-10 border border-theme flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all duration-300">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="font-syne font-semibold text-xl lg:text-2xl text-text-primary mb-4 leading-tight">
                  {card.title}
                </h3>

                <p className="text-text-secondary font-dm leading-relaxed text-sm lg:text-base mb-6">
                  {card.description}
                </p>

                <ul className="space-y-2.5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-text-secondary font-dm">
                      <span className="w-px h-3 bg-accent-blue/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Founder strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-16 border border-theme p-8 lg:p-10 grid lg:grid-cols-[1fr,auto] gap-8 items-center bg-surface"
        >
          <div>
            <div className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm mb-4">
              About the founder
            </div>
            <h3 className="font-syne font-semibold text-xl lg:text-2xl text-text-primary mb-3">
              {s("founder_name", "Mir Arshad Ali")}
            </h3>
            <p className="text-text-secondary font-dm leading-relaxed text-sm lg:text-base max-w-2xl">
              {s("founder_bio", "We build AI systems designed for execution — not just interaction. Led by Mir Arshad Ali, a NVIDIA Certified Agentic AI Professional with over 9 years of experience in workflow automation, Agile delivery, and enterprise AI systems architecture.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {founderTags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 text-xs text-text-secondary border border-theme font-dm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
