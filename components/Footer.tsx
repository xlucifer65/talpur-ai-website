"use client";

import { motion } from "framer-motion";

const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.FC> = {
  social_linkedin_url: LinkedinIcon,
  social_x_url: XIcon,
  social_instagram_url: InstagramIcon,
};

const SOCIAL_LABELS: Record<string, string> = {
  social_linkedin_url: "LinkedIn",
  social_x_url: "X (Twitter)",
  social_instagram_url: "Instagram",
};

interface Props {
  settings?: Record<string, string>;
}

export default function Footer({ settings = {} }: Props) {
  const s = (key: string, fallback = "") => settings[key] ?? fallback;

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  const socials = Object.keys(SOCIAL_ICONS)
    .filter((key) => s(key))
    .map((key) => ({ key, label: SOCIAL_LABELS[key], Icon: SOCIAL_ICONS[key] }));

  return (
    <footer className="border-t border-subtle py-12 lg:py-16 px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          {/* Logo + tagline */}
          <div>
            <a href="#" className="font-syne font-bold text-xl text-text-primary" aria-label="talpur.ai">
              talpur<span className="text-accent-blue">.</span>ai
            </a>
            <p className="mt-1.5 text-xs text-text-secondary font-dm max-w-[240px]">
              {s("footer_tagline", "AI automation systems that run your business.")}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 font-dm"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social */}
          {socials.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              {socials.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={s(key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`talpur.ai on ${label}`}
                  className="w-9 h-9 border border-theme hover:border-white/20 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-text-secondary font-dm">
            © 2025 talpur.ai. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary/50 font-dm">
            {s("footer_built_by", "AI Automation · Workflow Systems · Enterprise Ready")}
          </p>
        </div>
      </div>
    </footer>
  );
}
