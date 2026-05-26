"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/db";

export default function Testimonials({ testimonials, settings = {} }: { testimonials: Testimonial[]; settings?: Record<string, string> }) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm"
          >
            {s("testimonials_eyebrow", "Client results")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] text-text-primary mt-3 leading-tight"
          >
            {s("testimonials_headline", "What our clients say")}
          </motion.h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-0 border border-theme">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`p-8 lg:p-10 flex flex-col gap-6 ${
                i < 2 ? "border-r border-theme" : ""
              } hover-overlay transition-colors duration-300 relative group`}
              aria-label={`Testimonial from ${t.name}`}
            >
              {/* Large quote mark */}
              <span
                className="absolute top-6 right-8 font-syne text-7xl text-white/[0.05] leading-none select-none group-hover:text-white/[0.08] transition-colors"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1" aria-label="5 star rating">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-accent-blue text-accent-blue"
                  />
                ))}
              </div>

              <blockquote className="text-text-primary font-dm text-sm lg:text-base leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-subtle">
                <div
                  className="w-9 h-9 bg-badge border border-accent-blue/20 flex items-center justify-center text-xs font-syne font-semibold text-accent-blue flex-shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary font-dm">
                    {t.name}
                  </div>
                  <div className="text-xs text-text-secondary font-dm">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[85vw] snap-start border border-theme p-6 flex flex-col gap-5"
              aria-label={`Testimonial from ${t.name}`}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className="fill-accent-blue text-accent-blue"
                  />
                ))}
              </div>
              <blockquote className="text-text-primary font-dm text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-3 border-t border-subtle">
                <div className="w-8 h-8 bg-badge border border-accent-blue/20 flex items-center justify-center text-xs font-syne font-semibold text-accent-blue">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary font-dm">
                    {t.name}
                  </div>
                  <div className="text-xs text-text-secondary font-dm">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
