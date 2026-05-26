import Database from "better-sqlite3";
import path from "path";

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "leads.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");

  _db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      work_email TEXT NOT NULL,
      company_name TEXT NOT NULL,
      company_size TEXT NOT NULL,
      service TEXT NOT NULL,
      challenge TEXT NOT NULL,
      referral TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      read_time TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      tag TEXT DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      slug TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quote TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      initials TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT NOT NULL,
      title TEXT NOT NULL,
      items TEXT NOT NULL DEFAULT '[]',
      insight TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  seedIfEmpty(_db);

  return _db;
}

function seedIfEmpty(db: Database.Database) {
  const blogCount = (db.prepare("SELECT COUNT(*) as c FROM blog_posts").get() as { c: number }).c;
  if (blogCount === 0) {
    const insertPost = db.prepare(`
      INSERT INTO blog_posts (title, category, date, read_time, excerpt, tag, featured, slug)
      VALUES (@title, @category, @date, @read_time, @excerpt, @tag, @featured, @slug)
    `);
    [
      {
        title: "Why most AI projects fail before they start",
        category: "AI Strategy",
        date: "May 2025",
        read_time: "6 min read",
        excerpt: "The problem isn't the technology. It's the lack of a clear problem worth solving. Here's how we approach AI feasibility before writing a single line of code.",
        tag: "Strategy",
        featured: 1,
        slug: "why-ai-projects-fail",
      },
      {
        title: "How self-improving support systems actually work",
        category: "Support Automation",
        date: "April 2025",
        read_time: "4 min read",
        excerpt: "A breakdown of how AI learns from call transcripts and converts conversations into structured, improving knowledge.",
        tag: "",
        featured: 0,
        slug: "self-improving-support-systems",
      },
      {
        title: "The 3 metrics that matter in AI lead generation",
        category: "Sales Automation",
        date: "March 2025",
        read_time: "5 min read",
        excerpt: "Intent score, enrichment accuracy, and routing speed. We break down what to measure and what to ignore.",
        tag: "",
        featured: 0,
        slug: "ai-lead-generation-metrics",
      },
    ].forEach((p) => insertPost.run(p));
  }

  const testCount = (db.prepare("SELECT COUNT(*) as c FROM testimonials").get() as { c: number }).c;
  if (testCount === 0) {
    const insertTest = db.prepare(`
      INSERT INTO testimonials (quote, name, role, initials, sort_order)
      VALUES (@quote, @name, @role, @initials, @sort_order)
    `);
    [
      {
        quote: "talpur.ai cut our support handling time by over 50% in the first month. The system learned from our existing tickets and just got smarter over time.",
        name: "Sarah M.",
        role: "Head of Operations, SaaS Company",
        initials: "SM",
        sort_order: 0,
      },
      {
        quote: "They built us a lead qualification system that runs 24/7. Our sales team now only speaks to pre-qualified, intent-scored prospects. Pipeline quality improved dramatically.",
        name: "James K.",
        role: "VP Sales, B2B Services Firm",
        initials: "JK",
        sort_order: 1,
      },
      {
        quote: "The AI strategy session alone saved us 6 months of wrong decisions. They mapped out exactly where AI would create real ROI for our business.",
        name: "Nadia R.",
        role: "CEO, Tech Startup",
        initials: "NR",
        sort_order: 2,
      },
    ].forEach((t) => insertTest.run(t));
  }

  const svcCount = (db.prepare("SELECT COUNT(*) as c FROM services").get() as { c: number }).c;
  if (svcCount === 0) {
    const insertSvc = db.prepare(`
      INSERT INTO services (number, title, items, insight, sort_order)
      VALUES (@number, @title, @items, @insight, @sort_order)
    `);
    [
      {
        number: "01",
        title: "AI Strategy & Consulting",
        items: JSON.stringify(["AI strategy & roadmap development", "Feasibility assessment for AI adoption", "Architecture & system design", "AI engineering consulting", "Data management & pipeline design"]),
        insight: "Start here — we assess where AI creates the most leverage in your specific business before a single line is written.",
        sort_order: 0,
      },
      {
        number: "02",
        title: "Sales Automation & Lead Generation",
        items: JSON.stringify(["Account intelligence (buyer intent tracking & scoring)", "Lead enrichment and routing", "Proposal & RFP generation systems", "AI-driven outbound and inbound lead capture"]),
        insight: "Increase conversion, reduce manual research, and accelerate deal cycles with always-on AI sales infrastructure.",
        sort_order: 1,
      },
      {
        number: "03",
        title: "Customer Support Automation",
        items: JSON.stringify(["AI-powered onboarding systems", "Tier-1 support automation (knowledge-based responses)", "Intelligent request routing", "Human + AI hybrid support systems"]),
        insight: "Not just automation — self-improving support infrastructure that learns from your call transcripts, FAQs, and historical tickets.",
        sort_order: 2,
      },
      {
        number: "04",
        title: "Marketing Intelligence & Execution",
        items: JSON.stringify(["Brand and campaign performance insights", "Automated campaign setup and execution", "Competitive monitoring systems", "Real-time analytics integration"]),
        insight: "Faster decisions using live data and automation — from insight to execution without manual bottlenecks.",
        sort_order: 3,
      },
      {
        number: "05",
        title: "Business Intelligence & Reporting",
        items: JSON.stringify(["Ad hoc business analysis", "Automated reporting decks (QBRs, investor reports)", "Financial and operational modeling", "Real-time KPI dashboards"]),
        insight: "Replace days of analyst work with instant insights — every metric, always current, always ready.",
        sort_order: 4,
      },
    ].forEach((s) => insertSvc.run(s));
  }

  const settingsCount = (db.prepare("SELECT COUNT(*) as c FROM site_settings").get() as { c: number }).c;
  if (settingsCount === 0) {
    const ins = db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)");
    const defaults: [string, string][] = [
      ["hero_eyebrow", "AI Execution Systems · Paris, France"],
      ["hero_headline_1", "We build AI agents that"],
      ["hero_highlight", "operate"],
      ["hero_headline_2", "inside your business"],
      ["hero_subheadline", "Automating workflows, generating leads, and reducing operational costs — across sales, support, marketing, and operations."],
      ["hero_cta_primary_text", "Explore our services"],
      ["hero_cta_secondary_text", "Read our thinking"],
      ["stat_1_value", "5×"],
      ["stat_1_label", "faster deployment vs in-house"],
      ["stat_2_value", "60%"],
      ["stat_2_label", "average support cost reduction"],
      ["stat_3_value", "Day 1"],
      ["stat_3_label", "ROI-focused from first session"],
      ["footer_tagline", "AI agents that operate inside your business."],
      ["footer_built_by", "Built in Paris · Powered by AI"],
      ["social_linkedin_url", ""],
      ["social_x_url", ""],
      ["social_upwork_url", ""],
      ["social_contra_url", ""],
      ["social_github_url", ""],
      ["social_instagram_url", ""],
      ["social_youtube_url", ""],
      // Nav
      ["nav_cta_text", "Book a strategy call"],
      // Services section
      ["services_eyebrow", "What we do"],
      ["services_headline_1", "Five capabilities."],
      ["services_headline_2", "One integrated system."],
      // About / Product Edge
      ["about_eyebrow", "Beyond automation"],
      ["about_headline_1", "Systems > Prompts."],
      ["about_headline_2", "Execution > Ideas."],
      ["about_paragraph", "We build AI execution infrastructure — not demos. Our systems work inside your existing tools, produce structured outputs, and keep humans in control of every critical decision."],
      ["about_card1_badge", "Lead generation"],
      ["about_card1_title", "AI Lead Generation Systems"],
      ["about_card1_description", "Systems that capture user intent across channels, qualify leads automatically, enrich data in real time, and route to the right sales rep — without manual work."],
      ["about_card1_bullets", JSON.stringify(["Intent capture across channels", "Automatic qualification & scoring", "Real-time data enrichment", "Smart routing to the right rep"])],
      ["about_card2_badge", "Self-improving"],
      ["about_card2_title", "AI Support Learning Systems"],
      ["about_card2_description", "Systems that learn from call center conversations — converting transcripts into structured knowledge that continuously improves responses and reduces dependency on human agents."],
      ["about_card2_bullets", JSON.stringify(["Learns from call transcripts", "Converts conversations to knowledge", "Continuously improves accuracy", "Reduces human agent dependency"])],
      // Founder
      ["founder_name", "Mir Arshad Ali"],
      ["founder_bio", "We build AI systems designed for execution — not just interaction. Led by Mir Arshad Ali, a NVIDIA Certified Agentic AI Professional with over 9 years of experience in workflow automation and Agile delivery. Our approach focuses on deterministic, reliable, and scalable AI systems that operate inside real business workflows — connecting tools, structuring actions, and keeping humans in control."],
      ["founder_tags", JSON.stringify(["NVIDIA Certified", "Agile AI PM", "PMI-ACP", "9+ Years", "Paris, France"])],
      // Testimonials section
      ["testimonials_eyebrow", "Client results"],
      ["testimonials_headline", "What our clients say"],
      // Blog section
      ["blog_eyebrow", "Our thinking"],
      ["blog_headline_1", "Insights on what's"],
      ["blog_headline_2", "actually working"],
      ["blog_paragraph", "AI strategy, automation patterns, and real-world implementation notes."],
      // Contact section
      ["contact_eyebrow", "Get in touch"],
      ["contact_headline", "Let's build something"],
      ["contact_subtext", "Tell us about your business and we'll get back within 24 hours."],
      ["contact_email", "hello@talpur.ai"],
      ["contact_location", "Paris, France"],
      ["contact_response_time", "Within 24 hours"],
      ["contact_calendly_url", ""],
      // Email
      ["notification_email", ""],
      ["smtp_host", ""],
      ["smtp_port", "587"],
      ["smtp_user", ""],
      ["smtp_pass", ""],
    ];
    for (const [key, value] of defaults) ins.run(key, value);
  }
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface Lead {
  id: number;
  full_name: string;
  work_email: string;
  company_name: string;
  company_size: string;
  service: string;
  challenge: string;
  referral: string;
  status: "new" | "contacted" | "qualified" | "closed";
  notes: string;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  read_time: string;
  excerpt: string;
  tag: string;
  featured: number;
  slug: string;
  created_at: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
  sort_order: number;
  created_at: string;
}

export interface Service {
  id: number;
  number: string;
  title: string;
  items: string; // JSON array string
  insight: string;
  sort_order: number;
  created_at: string;
}

// ── Leads ────────────────────────────────────────────────────────────────────

export function insertLead(data: Omit<Lead, "id" | "status" | "notes" | "created_at">): Lead {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO leads (full_name, work_email, company_name, company_size, service, challenge, referral)
    VALUES (@full_name, @work_email, @company_name, @company_size, @service, @challenge, @referral)
  `).run(data);
  return db.prepare("SELECT * FROM leads WHERE id = ?").get(result.lastInsertRowid) as Lead;
}

export function getAllLeads(): Lead[] {
  return getDb().prepare("SELECT * FROM leads ORDER BY created_at DESC").all() as Lead[];
}

export function updateLeadStatus(id: number, status: Lead["status"], notes?: string): Lead | null {
  const db = getDb();
  if (notes !== undefined) {
    db.prepare("UPDATE leads SET status = ?, notes = ? WHERE id = ?").run(status, notes, id);
  } else {
    db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, id);
  }
  return db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as Lead | null;
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return getDb().prepare("SELECT * FROM blog_posts ORDER BY featured DESC, created_at DESC").all() as BlogPost[];
}

export function insertPost(data: Omit<BlogPost, "id" | "created_at">): BlogPost {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO blog_posts (title, category, date, read_time, excerpt, tag, featured, slug)
    VALUES (@title, @category, @date, @read_time, @excerpt, @tag, @featured, @slug)
  `).run(data);
  return db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(result.lastInsertRowid) as BlogPost;
}

export function updatePost(id: number, data: Partial<Omit<BlogPost, "id" | "created_at">>): BlogPost | null {
  const db = getDb();
  const fields = Object.keys(data).map((k) => `${k} = @${k}`).join(", ");
  db.prepare(`UPDATE blog_posts SET ${fields} WHERE id = @id`).run({ ...data, id });
  return db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id) as BlogPost | null;
}

export function deletePost(id: number): void {
  getDb().prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export function getAllTestimonials(): Testimonial[] {
  return getDb().prepare("SELECT * FROM testimonials ORDER BY sort_order ASC, created_at ASC").all() as Testimonial[];
}

export function insertTestimonial(data: Omit<Testimonial, "id" | "created_at">): Testimonial {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO testimonials (quote, name, role, initials, sort_order)
    VALUES (@quote, @name, @role, @initials, @sort_order)
  `).run(data);
  return db.prepare("SELECT * FROM testimonials WHERE id = ?").get(result.lastInsertRowid) as Testimonial;
}

export function updateTestimonial(id: number, data: Partial<Omit<Testimonial, "id" | "created_at">>): Testimonial | null {
  const db = getDb();
  const fields = Object.keys(data).map((k) => `${k} = @${k}`).join(", ");
  db.prepare(`UPDATE testimonials SET ${fields} WHERE id = @id`).run({ ...data, id });
  return db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id) as Testimonial | null;
}

export function deleteTestimonial(id: number): void {
  getDb().prepare("DELETE FROM testimonials WHERE id = ?").run(id);
}

// ── Services ──────────────────────────────────────────────────────────────────

export function getAllServices(): Service[] {
  return getDb().prepare("SELECT * FROM services ORDER BY sort_order ASC").all() as Service[];
}

export function insertService(data: Omit<Service, "id" | "created_at">): Service {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO services (number, title, items, insight, sort_order)
    VALUES (@number, @title, @items, @insight, @sort_order)
  `).run(data);
  return db.prepare("SELECT * FROM services WHERE id = ?").get(result.lastInsertRowid) as Service;
}

export function updateService(id: number, data: Partial<Omit<Service, "id" | "created_at">>): Service | null {
  const db = getDb();
  const fields = Object.keys(data).map((k) => `${k} = @${k}`).join(", ");
  db.prepare(`UPDATE services SET ${fields} WHERE id = @id`).run({ ...data, id });
  return db.prepare("SELECT * FROM services WHERE id = ?").get(id) as Service | null;
}

export function deleteService(id: number): void {
  getDb().prepare("DELETE FROM services WHERE id = ?").run(id);
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export function getAllSettings(): Record<string, string> {
  const rows = getDb().prepare("SELECT key, value FROM site_settings").all() as { key: string; value: string }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function updateSettings(settings: Record<string, string>): void {
  const db = getDb();
  const stmt = db.prepare("INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))");
  const updateMany = db.transaction((entries: [string, string][]) => {
    for (const [key, value] of entries) stmt.run(key, value);
  });
  updateMany(Object.entries(settings));
}
