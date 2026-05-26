"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Cpu, BarChart2, Layers, Users, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const expertise = [
  { icon: Cpu,      label: "AI Systems Architecture",    desc: "Designing multi-agent AI pipelines, LLM integrations, and intelligent workflow systems from the ground up." },
  { icon: Layers,   label: "Workflow Automation",         desc: "Building end-to-end automation across CRM, email, databases, APIs, and no-code/low-code platforms." },
  { icon: BarChart2,label: "Business Process Optimization",desc: "Mapping operational bottlenecks and replacing manual effort with scalable, measurable automated processes." },
  { icon: Users,    label: "Agile Project Delivery",      desc: "PMI-ACP certified Agile practitioner with 9+ years delivering complex technical projects on time and on spec." },
  { icon: Globe,    label: "Enterprise SaaS",             desc: "Experience scaling automation systems for startups, agencies, and enterprise clients across multiple industries." },
  { icon: Award,    label: "NVIDIA Certified AI",         desc: "NVIDIA Certified Agentic AI Professional — trained in advanced AI agent design and deployment at scale." },
];

const timeline = [
  { year: "2015", title: "Operations & Project Management", body: "Began career in technical project management, leading cross-functional teams on complex business systems implementations." },
  { year: "2018", title: "Automation Consulting", body: "Shifted focus to workflow automation — building custom integrations, CRM systems, and no-code pipelines for service businesses." },
  { year: "2021", title: "AI Systems Development", body: "Early adopter of LLM-based automation. Built proprietary AI systems for lead generation, support, and marketing operations." },
  { year: "2023", title: "NVIDIA AI Certification", body: "Achieved NVIDIA Certified Agentic AI Professional status. Specialized in multi-agent orchestration and enterprise AI deployment." },
  { year: "2024", title: "Founded Talpur.ai", body: "Launched Talpur.ai to bring enterprise-grade AI automation to businesses of all sizes — with real results and no fluff." },
];

const values = [
  { title: "Execution over theory", body: "We don't sell AI strategy decks. We build systems that operate in your business on Day 1." },
  { title: "Measurable outcomes", body: "Every system we build has a clear metric. Hours saved, leads captured, cost reduced." },
  { title: "Business-first thinking", body: "Technology is the means — your operational goals are the end. We keep that priority clear." },
  { title: "Long-term partnerships", body: "We optimize continuously. Our systems get smarter as your business evolves." },
];

interface Props {
  settings?: Record<string, string>;
}

export default function About({ settings = {} }: Props) {
  const s = (key: string, fb: string) => settings[key] ?? fb;
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-blue/[0.05] blur-[140px]" />
        </div>
        <div className="max-w-7xl mx-auto relative" ref={heroRef}>
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm">
            About Talpur.ai
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-text-primary mt-4 mb-6 max-w-4xl">
            We build AI systems that{" "}
            <span className="text-accent-blue">actually run</span>
            <br />your business.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-text-secondary text-lg lg:text-xl max-w-2xl leading-relaxed font-dm">
            Talpur.ai is an AI automation agency specializing in building intelligent workflow systems, AI agents, and operational infrastructure for businesses that want to scale without proportionally scaling headcount.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors border border-accent-blue">
              Work with us <ArrowRight size={14} />
            </Link>
            <Link href="/works" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-text-primary border border-theme hover:border-accent-blue/40 hover:text-accent-blue transition-all">
              See our work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Founder section */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-20 items-start">
            {/* Left: founder card */}
            <div>
              <div className="border border-theme p-8 bg-background">
                {/* Avatar placeholder — premium initials block */}
                <div className="w-20 h-20 bg-badge border border-accent-blue/30 flex items-center justify-center mb-6">
                  <span className="font-syne font-bold text-2xl text-accent-blue">MA</span>
                </div>
                <h2 className="font-syne font-bold text-2xl text-text-primary mb-1">
                  {s("founder_name", "Mir Arshad Ali")}
                </h2>
                <p className="text-sm text-accent-blue font-dm mb-5">Founder & AI Automation Architect</p>
                <div className="space-y-2">
                  {["NVIDIA Certified Agentic AI Professional", "PMI-ACP · Agile Certified", "9+ Years in AI & Operations", "Enterprise Automation Consulting", "Workflow Systems Architecture"].map(tag => (
                    <div key={tag} className="flex items-center gap-2 text-xs text-text-secondary font-dm">
                      <span className="w-1 h-1 rounded-full bg-accent-blue flex-shrink-0" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: bio content */}
            <div>
              <span className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm">The founder</span>
              <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,2.8rem)] text-text-primary mt-3 mb-6 leading-tight">
                Built on 9 years of making
                <br />
                <span className="text-text-secondary font-medium">operations work better.</span>
              </h2>

              <div className="space-y-5 text-text-secondary font-dm leading-relaxed">
                <p>
                  {s("founder_bio_1",
                    "Mir Arshad Ali founded Talpur.ai after nearly a decade of leading complex automation and AI projects across startups, agencies, and enterprise clients. His background isn't purely technical — it's operational. He understands what it actually costs a business when processes are slow, manual, or fragmented."
                  )}
                </p>
                <p>
                  {s("founder_bio_2",
                    "Certified by NVIDIA as an Agentic AI Professional, and holding a PMI-ACP in Agile delivery, Mir brings a rare combination: the technical depth to architect multi-agent AI systems, and the business judgment to know which problems are worth solving first."
                  )}
                </p>
                <p>
                  {s("founder_bio_3",
                    "Talpur.ai was built on the conviction that most businesses are leaving enormous operational efficiency on the table — not from lack of effort, but from lack of the right systems. Every client engagement starts with understanding the business before writing a single line of automation."
                  )}
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-6">
                {[
                  { v: "9+",   l: "Years experience" },
                  { v: "50+",  l: "Automation systems built" },
                  { v: "100%", l: "Execution-focused" },
                ].map(m => (
                  <div key={m.l} className="border-l-2 border-accent-blue pl-4">
                    <div className="font-syne font-bold text-2xl text-text-primary">{m.v}</div>
                    <div className="text-xs text-text-secondary font-dm mt-0.5">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise grid */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm">Core expertise</span>
            <h2 className="font-syne font-bold text-[clamp(2rem,4vw,3rem)] text-text-primary mt-3 leading-tight">
              What we know deeply.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-theme">
            {expertise.map((ex, i) => {
              const Icon = ex.icon;
              return (
                <motion.div key={ex.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`p-7 group hover-overlay transition-colors duration-300 border-b border-theme ${i % 3 !== 2 ? "lg:border-r border-theme" : ""}`}>
                  <div className="w-10 h-10 border border-theme flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all duration-300 mb-5">
                    <Icon size={17} />
                  </div>
                  <h3 className="font-syne font-semibold text-base text-text-primary mb-2">{ex.label}</h3>
                  <p className="text-text-secondary font-dm text-sm leading-relaxed">{ex.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm">Journey</span>
            <h2 className="font-syne font-bold text-[clamp(2rem,4vw,3rem)] text-text-primary mt-3 leading-tight">
              How we got here.
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-theme" style={{ background: "var(--border-soft)" }} />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-8 items-start">
                  <div className="w-[104px] flex-shrink-0 text-right">
                    <span className="font-syne font-bold text-sm text-accent-blue">{t.year}</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-accent-blue border-2 border-background flex-shrink-0 mt-0.5 relative z-10" />
                  <div className="flex-1 pb-2">
                    <h3 className="font-syne font-semibold text-base text-text-primary mb-1">{t.title}</h3>
                    <p className="text-text-secondary font-dm text-sm leading-relaxed">{t.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm">How we work</span>
            <h2 className="font-syne font-bold text-[clamp(2rem,4vw,3rem)] text-text-primary mt-3 leading-tight">
              What we believe.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-0 border border-theme">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 lg:p-10 hover-overlay transition-colors duration-300 ${i < 2 ? "border-b border-theme" : ""} ${i % 2 === 0 ? "border-r border-theme" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent-blue" />
                  <h3 className="font-syne font-semibold text-lg text-text-primary">{v.title}</h3>
                </div>
                <p className="text-text-secondary font-dm text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-surface">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 border border-theme p-10 lg:p-14">
          <div>
            <h2 className="font-syne font-bold text-[clamp(1.8rem,4vw,2.8rem)] text-text-primary leading-tight mb-3">
              Ready to automate your operations?
            </h2>
            <p className="text-text-secondary font-dm max-w-lg">
              Book a free 45-minute audit. We'll map your business and show you exactly where AI creates real ROI.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors border border-accent-blue">
              Book Free Consultation <ArrowRight size={14} />
            </Link>
            <Link href="/works" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-text-primary border border-theme hover:border-accent-blue/40 hover:text-accent-blue transition-all">
              See our work
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
