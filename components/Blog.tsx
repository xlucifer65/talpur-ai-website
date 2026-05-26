"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/db";

function PostCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col h-full p-6 lg:p-8 cursor-pointer hover:bg-white/[0.03] transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-accent-blue bg-badge border border-accent-blue/20 font-dm">
          {post.category}
        </span>
        {post.tag && (
          <span className="text-xs text-text-secondary font-dm border border-theme px-2 py-1">
            {post.tag}
          </span>
        )}
      </div>

      <h3 className="font-syne font-semibold text-xl lg:text-2xl text-text-primary leading-tight mb-3 group-hover:text-accent-blue transition-colors duration-200">
        {post.title}
      </h3>

      <p className="text-text-secondary font-dm text-sm leading-relaxed flex-1 mb-6">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-subtle">
        <div className="flex items-center gap-3 text-xs text-text-secondary font-dm">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{post.read_time}</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-accent-blue font-dm font-medium group-hover:gap-2.5 transition-all duration-200">
          Read more
          <ArrowRight size={12} />
        </span>
      </div>
    </motion.article>
  );
}

export default function Blog({ posts, settings = {} }: { posts: BlogPost[]; settings?: Record<string, string> }) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featured = posts.find((p) => p.featured);
  const others = posts.filter((p) => !p.featured);

  return (
    <section id="blog" className="py-24 lg:py-32 px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium text-accent-blue tracking-widest uppercase font-dm"
            >
              {s("blog_eyebrow", "Our thinking")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] text-text-primary mt-3 leading-tight"
            >
              {s("blog_headline_1", "Insights on what's")}
              <br />
              {s("blog_headline_2", "actually working")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-text-secondary font-dm max-w-lg"
            >
              {s("blog_paragraph", "AI strategy, automation patterns, and real-world implementation notes.")}
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="/blog"
            className="hidden lg:inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.10] hover:border-white/20 px-4 py-2.5 transition-all duration-200 font-dm bg-surface"
          >
            View all posts
            <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-0 border border-theme bg-surface">
          {featured && (
            <div className="border-b lg:border-b-0 lg:border-r border-theme">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="group h-full flex flex-col p-8 lg:p-10 cursor-pointer hover-overlay transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-accent-blue bg-badge border border-accent-blue/20 font-dm">
                    {featured.category}
                  </span>
                  <span className="text-xs text-text-secondary font-dm border border-theme px-2 py-1">
                    Featured
                  </span>
                </div>

                <h3 className="font-syne font-bold text-2xl lg:text-3xl xl:text-4xl text-text-primary leading-tight mb-4 group-hover:text-accent-blue transition-colors duration-200">
                  {featured.title}
                </h3>

                <p className="text-text-secondary font-dm leading-relaxed flex-1 mb-8 lg:text-lg">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-subtle">
                  <div className="flex items-center gap-3 text-xs text-text-secondary font-dm">
                    <span>{featured.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{featured.read_time}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-accent-blue font-dm font-medium group-hover:gap-3 transition-all duration-200">
                    Read more
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            </div>
          )}

          <div className="flex flex-col divide-y divide-theme">
            {others.map((post, i) => (
              <div key={post.id} className="flex-1">
                <PostCard post={post} index={i + 1} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:hidden mt-8 text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.10] hover:border-white/20 px-5 py-3 transition-all duration-200 font-dm bg-surface"
          >
            View all posts
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
