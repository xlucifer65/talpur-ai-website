"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Sun, Moon, Search } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { NAV_LINKS } from "@/lib/constants";

function TalpurIcon() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ti1" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>
        <radialGradient id="ti2" cx="62%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </radialGradient>
      </defs>
      <circle cx="9" cy="10" r="9" fill="url(#ti1)" />
      <circle cx="17" cy="10" r="9" fill="url(#ti2)" fillOpacity="0.85" />
    </svg>
  );
}

interface Props {
  settings?: Record<string, string>;
}

export default function Nav({ settings = {} }: Props) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isDark = theme === "dark";

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-xl border-b border-[#F1F5F9]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-syne font-bold text-xl text-[#111827] tracking-tight"
              aria-label="Talpur.ai home"
            >
              <TalpurIcon />
              <span>talpur<span className="text-[#3B82F6]">.</span>ai</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#374151] hover:text-[#111827] transition-colors duration-200 font-dm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: search + theme toggle + CTA + hamburger */}
            <div className="flex items-center gap-2">
              {/* Search icon */}
              <button
                className="hidden lg:flex p-2 text-[#6B7280] hover:text-[#111827] transition-colors"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 transition-all duration-200"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isDark ? "moon" : "sun"}
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              )}

              <Link
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full transition-colors duration-200 font-dm"
                style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 4px 14px rgba(99,102,241,0.30)" }}
              >
                {s("nav_cta_text", "Book a strategy call")}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>

              <button
                className="lg:hidden p-2 text-[#6B7280] hover:text-[#111827] transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-theme">
              <span className="font-syne font-bold text-xl text-text-primary">
                talpur<span className="text-accent-blue">.</span>ai
              </span>
              <div className="flex items-center gap-3">
                {mounted && (
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="p-2 border border-theme text-text-secondary hover:text-text-primary transition-all"
                    aria-label="Toggle theme"
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                  </button>
                )}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-text-secondary hover:text-text-primary"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <motion.nav
              className="flex flex-col gap-1 px-6 pt-8 flex-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-3xl font-syne font-semibold text-text-primary py-3 border-b border-theme hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors rounded-xl"
                >
                  {s("nav_cta_text", "Book a strategy call")}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
