"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

const inputClass = "w-full bg-surface border border-black/[0.10] px-3 py-2.5 text-sm font-dm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue/60 transition-colors";
const labelClass = "block text-xs text-text-secondary font-dm mb-1.5 tracking-wide uppercase";

function Field({ label, value, onChange, placeholder, multiline, rows = 3, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; rows?: number; hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} rows={rows} className={inputClass + " resize-none"} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} className={inputClass} />
      )}
      {hint && <p className="mt-1 text-xs text-text-secondary/60 font-dm">{hint}</p>}
    </div>
  );
}

function BulletsField({ label, value, onChange, hint }: {
  label: string; value: string; onChange: (v: string) => void; hint?: string;
}) {
  let bullets: string[] = [];
  try { bullets = JSON.parse(value); } catch {}
  const text = bullets.join("\n");

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        value={text}
        onChange={(e) => {
          const lines = e.target.value.split("\n").map((l) => l.trim()).filter(Boolean);
          onChange(JSON.stringify(lines));
        }}
        rows={4}
        placeholder="One bullet per line"
        className={inputClass + " resize-none"}
      />
      {hint && <p className="mt-1 text-xs text-text-secondary/60 font-dm">{hint}</p>}
    </div>
  );
}

function Section({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-black/[0.08] mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-syne font-semibold text-sm text-text-primary">{title}</span>
        {open ? <ChevronDown size={15} className="text-text-secondary" /> : <ChevronRight size={15} className="text-text-secondary" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-black/[0.06] pt-5">{children}</div>}
    </div>
  );
}

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => { setSettings(data); setLoading(false); });
  }, []);

  const set = (key: string) => (value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const get = (key: string, fallback = "") => settings[key] ?? fallback;

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-40 text-text-secondary font-dm text-sm">Loading...</div>;
  }

  return (
    <div className="max-w-2xl">

      {/* ── Navigation ── */}
      <Section title="Navigation">
        <Field label="CTA Button Text" value={get("nav_cta_text")} onChange={set("nav_cta_text")} placeholder="Book a strategy call" />
      </Section>

      {/* ── Hero ── */}
      <Section title="Hero Section" defaultOpen>
        <Field label="Eyebrow Text" value={get("hero_eyebrow")} onChange={set("hero_eyebrow")} placeholder="AI Execution Systems · Paris, France" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Headline Part 1" value={get("hero_headline_1")} onChange={set("hero_headline_1")} placeholder="We build AI agents that" />
          <Field label="Highlighted Word" value={get("hero_highlight")} onChange={set("hero_highlight")} placeholder="operate" />
          <Field label="Headline Part 2" value={get("hero_headline_2")} onChange={set("hero_headline_2")} placeholder="inside your business" />
        </div>
        <Field label="Subheadline" value={get("hero_subheadline")} onChange={set("hero_subheadline")} placeholder="Automating workflows..." multiline rows={3} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary Button" value={get("hero_cta_primary_text")} onChange={set("hero_cta_primary_text")} placeholder="Explore our services" />
          <Field label="Secondary Button" value={get("hero_cta_secondary_text")} onChange={set("hero_cta_secondary_text")} placeholder="Read our thinking" />
        </div>
      </Section>

      {/* ── Stats ── */}
      <Section title="Stats Bar">
        {[1, 2, 3].map((n) => (
          <div key={n} className="grid grid-cols-2 gap-3">
            <Field label={`Stat ${n} Value`} value={get(`stat_${n}_value`)} onChange={set(`stat_${n}_value`)} placeholder="5×" />
            <Field label={`Stat ${n} Label`} value={get(`stat_${n}_label`)} onChange={set(`stat_${n}_label`)} placeholder="faster deployment vs in-house" />
          </div>
        ))}
      </Section>

      {/* ── Services Section ── */}
      <Section title="Services Section Header">
        <Field label="Eyebrow" value={get("services_eyebrow")} onChange={set("services_eyebrow")} placeholder="What we do" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline Line 1" value={get("services_headline_1")} onChange={set("services_headline_1")} placeholder="Five capabilities." />
          <Field label="Headline Line 2" value={get("services_headline_2")} onChange={set("services_headline_2")} placeholder="One integrated system." />
        </div>
        <p className="text-xs text-text-secondary/60 font-dm">Individual services are managed in the Services tab.</p>
      </Section>

      {/* ── About ── */}
      <Section title="About Section">
        <Field label="Eyebrow" value={get("about_eyebrow")} onChange={set("about_eyebrow")} placeholder="Beyond automation" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline Line 1" value={get("about_headline_1")} onChange={set("about_headline_1")} placeholder="Systems > Prompts." />
          <Field label="Headline Line 2 (secondary)" value={get("about_headline_2")} onChange={set("about_headline_2")} placeholder="Execution > Ideas." />
        </div>
        <Field label="Paragraph" value={get("about_paragraph")} onChange={set("about_paragraph")} multiline rows={3} placeholder="We build AI execution infrastructure..." />
      </Section>

      {/* ── About Cards ── */}
      <Section title="About — Card 1 (Lead Generation)">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Badge" value={get("about_card1_badge")} onChange={set("about_card1_badge")} placeholder="Lead generation" />
          <Field label="Title" value={get("about_card1_title")} onChange={set("about_card1_title")} placeholder="AI Lead Generation Systems" />
        </div>
        <Field label="Description" value={get("about_card1_description")} onChange={set("about_card1_description")} multiline rows={3} />
        <BulletsField label="Bullet Points (one per line)" value={get("about_card1_bullets")} onChange={set("about_card1_bullets")} />
      </Section>

      <Section title="About — Card 2 (Support)">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Badge" value={get("about_card2_badge")} onChange={set("about_card2_badge")} placeholder="Self-improving" />
          <Field label="Title" value={get("about_card2_title")} onChange={set("about_card2_title")} placeholder="AI Support Learning Systems" />
        </div>
        <Field label="Description" value={get("about_card2_description")} onChange={set("about_card2_description")} multiline rows={3} />
        <BulletsField label="Bullet Points (one per line)" value={get("about_card2_bullets")} onChange={set("about_card2_bullets")} />
      </Section>

      {/* ── Founder ── */}
      <Section title="Founder">
        <Field label="Founder Name" value={get("founder_name")} onChange={set("founder_name")} placeholder="Mir Arshad Ali" />
        <Field label="Bio" value={get("founder_bio")} onChange={set("founder_bio")} multiline rows={5} />
        <BulletsField label="Tags (one per line)" value={get("founder_tags")} onChange={set("founder_tags")} hint="e.g. NVIDIA Certified" />
      </Section>

      {/* ── Testimonials ── */}
      <Section title="Testimonials Section Header">
        <Field label="Eyebrow" value={get("testimonials_eyebrow")} onChange={set("testimonials_eyebrow")} placeholder="Client results" />
        <Field label="Headline" value={get("testimonials_headline")} onChange={set("testimonials_headline")} placeholder="What our clients say" />
        <p className="text-xs text-text-secondary/60 font-dm">Individual testimonials are managed in the Testimonials tab.</p>
      </Section>

      {/* ── Blog ── */}
      <Section title="Blog Section Header">
        <Field label="Eyebrow" value={get("blog_eyebrow")} onChange={set("blog_eyebrow")} placeholder="Our thinking" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline Line 1" value={get("blog_headline_1")} onChange={set("blog_headline_1")} placeholder="Insights on what's" />
          <Field label="Headline Line 2" value={get("blog_headline_2")} onChange={set("blog_headline_2")} placeholder="actually working" />
        </div>
        <Field label="Paragraph" value={get("blog_paragraph")} onChange={set("blog_paragraph")} multiline rows={2} />
        <p className="text-xs text-text-secondary/60 font-dm">Individual blog posts are managed in the Blog Posts tab.</p>
      </Section>

      {/* ── Contact ── */}
      <Section title="Contact Section">
        <Field label="Eyebrow" value={get("contact_eyebrow")} onChange={set("contact_eyebrow")} placeholder="Get in touch" />
        <Field label="Headline" value={get("contact_headline")} onChange={set("contact_headline")} placeholder="Let's build something" />
        <Field label="Subtext" value={get("contact_subtext")} onChange={set("contact_subtext")} multiline rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email Address" value={get("contact_email")} onChange={set("contact_email")} placeholder="hello@talpur.ai" />
          <Field label="Location" value={get("contact_location")} onChange={set("contact_location")} placeholder="Paris, France" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Response Time" value={get("contact_response_time")} onChange={set("contact_response_time")} placeholder="Within 24 hours" />
          <Field label="Calendly URL" value={get("contact_calendly_url")} onChange={set("contact_calendly_url")} placeholder="https://calendly.com/..." hint="Leave blank to hide the Calendly link" />
        </div>
      </Section>

      {/* ── Footer ── */}
      <Section title="Footer">
        <Field label="Tagline" value={get("footer_tagline")} onChange={set("footer_tagline")} placeholder="AI agents that operate inside your business." />
        <Field label="Bottom Text" value={get("footer_built_by")} onChange={set("footer_built_by")} placeholder="Built in Paris · Powered by AI" />
      </Section>

      {/* ── Social Links ── */}
      <Section title="Social Links">
        <p className="text-xs text-text-secondary/60 font-dm -mt-1 mb-2">Leave blank to hide. Icons appear automatically when a URL is entered.</p>
        <Field label="LinkedIn URL" value={get("social_linkedin_url")} onChange={set("social_linkedin_url")} placeholder="https://linkedin.com/company/..." />
        <Field label="X (Twitter) URL" value={get("social_x_url")} onChange={set("social_x_url")} placeholder="https://x.com/..." />
        <Field label="Upwork URL" value={get("social_upwork_url")} onChange={set("social_upwork_url")} placeholder="https://www.upwork.com/..." />
        <Field label="Contra URL" value={get("social_contra_url")} onChange={set("social_contra_url")} placeholder="https://contra.com/..." />
        <Field label="GitHub URL" value={get("social_github_url")} onChange={set("social_github_url")} placeholder="https://github.com/..." />
        <Field label="Instagram URL" value={get("social_instagram_url")} onChange={set("social_instagram_url")} placeholder="https://instagram.com/..." />
        <Field label="YouTube URL" value={get("social_youtube_url")} onChange={set("social_youtube_url")} placeholder="https://youtube.com/..." />
      </Section>

      {/* ── Email Notifications ── */}
      <Section title="Email Notifications">
        <Field
          label="Send Notifications To"
          value={get("notification_email")}
          onChange={set("notification_email")}
          placeholder="you@gmail.com"
          hint="Every contact form submission gets emailed here."
        />
        <div className="border-t border-black/[0.06] pt-4 space-y-4">
          <p className="text-xs font-dm font-medium text-text-primary">SMTP Settings (your sending account)</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="SMTP Host" value={get("smtp_host")} onChange={set("smtp_host")} placeholder="smtp.gmail.com" />
            <Field label="SMTP Port" value={get("smtp_port")} onChange={set("smtp_port")} placeholder="587" />
          </div>
          <Field label="SMTP Email (sender)" value={get("smtp_user")} onChange={set("smtp_user")} placeholder="you@gmail.com" />
          <Field label="SMTP Password" value={get("smtp_pass")} onChange={set("smtp_pass")} placeholder="your password or app password" />
          <div className="bg-surface border border-black/[0.08] p-4 text-xs font-dm text-text-secondary space-y-1">
            <p className="font-medium text-text-primary mb-1">Common SMTP hosts</p>
            <p>Gmail → smtp.gmail.com / port 587 (use App Password)</p>
            <p>Outlook → smtp-mail.outlook.com / port 587</p>
            <p>Yahoo → smtp.mail.yahoo.com / port 587</p>
            <p>iCloud → smtp.mail.me.com / port 587</p>
            <p>Zoho → smtp.zoho.com / port 587</p>
            <p className="mt-2 text-text-secondary/60">Gmail App Password: myaccount.google.com/apppasswords</p>
          </div>
        </div>
      </Section>

      {/* Save button */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-40 transition-colors border border-accent-blue font-dm"
        >
          <Save size={14} />
          {saving ? "Saving..." : "Save all changes"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-dm">
            <CheckCircle size={14} />
            Saved — refresh the site to see changes
          </span>
        )}
      </div>
    </div>
  );
}
