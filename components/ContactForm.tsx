"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  workEmail: z.string().email("Please enter a valid work email"),
  companyName: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Please select a company size"),
  service: z.string().min(1, "Please select a service"),
  referral: z.string().min(1, "Please let us know how you found us"),
  challenge: z.string().min(50, "Please describe your challenge in at least 50 characters"),
});

type FormData = z.infer<typeof schema>;

const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "200-1000", label: "200–1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

const SERVICES = [
  { value: "ai-automation", label: "AI Automation Systems" },
  { value: "crm", label: "CRM Automation" },
  { value: "chatbot", label: "AI Chatbots" },
  { value: "workflow", label: "Workflow Integrations" },
  { value: "marketing", label: "Marketing Automation" },
  { value: "leads", label: "Lead Generation Systems" },
  { value: "agents", label: "AI Agents" },
  { value: "strategy", label: "AI Strategy & Consulting" },
  { value: "not-sure", label: "Not sure yet" },
];

const REFERRALS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "google", label: "Google" },
  { value: "referral", label: "Referral" },
  { value: "conference", label: "Conference" },
  { value: "other", label: "Other" },
];

// Shared input style
const inputCls =
  "w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] font-dm focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all duration-200";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-500 font-dm">{message}</p>;
}

// ── Sidebar decoration ────────────────────────────────────────────────────────
function SidebarDecoration() {
  return (
    <div className="absolute bottom-0 right-0 w-full h-40 overflow-hidden pointer-events-none rounded-b-2xl" aria-hidden="true">
      <svg viewBox="0 0 300 160" fill="none" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
        <defs>
          <radialGradient id="sd-o1" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <path d="M0 160 Q 80 100 160 120 T 300 80" stroke="#C4B5FD" strokeWidth="1.5" strokeOpacity="0.4" fill="none"/>
        <path d="M0 160 Q 90 110 180 130 T 300 100" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
        <circle cx="220" cy="90" r="28" fill="url(#sd-o1)" />
        <circle cx="160" cy="120" r="12" fill="#C4B5FD" fillOpacity="0.25" />
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={30 + c * 18} cy={128 + r * 14} r="1.4" fill="#818CF8" fillOpacity="0.22" />
          ))
        )}
      </svg>
    </div>
  );
}

// ── Page decoration ───────────────────────────────────────────────────────────
function PageDecoration() {
  return (
    <div className="absolute top-0 right-0 w-[50%] h-[55%] overflow-hidden pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 700 400" fill="none" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="cf-o1" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="cf-bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="560" cy="160" rx="280" ry="220" fill="url(#cf-bg)" />
        <path d="M700 20 Q 560 90 480 190 T 320 360" stroke="#C4B5FD" strokeWidth="2" strokeOpacity="0.28" fill="none" strokeLinecap="round"/>
        <path d="M700 80 Q 550 150 460 240 T 280 400" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.20" fill="none" strokeLinecap="round"/>
        <circle cx="490" cy="110" r="40" fill="url(#cf-o1)" />
        <circle cx="580" cy="210" r="22" fill="#F9A8D4" fillOpacity="0.4" />
        {/* Stars/sparkles */}
        <path d="M560 80 L562 74 L564 80 L570 82 L564 84 L562 90 L560 84 L554 82 Z" fill="#C4B5FD" fillOpacity="0.5"/>
        <path d="M620 140 L622 136 L624 140 L628 142 L624 144 L622 148 L620 144 L616 142 Z" fill="#93C5FD" fillOpacity="0.5"/>
      </svg>
    </div>
  );
}

export default function ContactForm({ settings = {} }: { settings?: Record<string, string> }) {
  const s = (key: string, fallback: string) => settings[key] ?? fallback;
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
    else alert("Something went wrong. Please try again.");
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 px-6 lg:px-8 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#F5F3FF 50%,#EFF6FF 100%)" }}
    >
      <PageDecoration />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-bold text-[#3B82F6] tracking-[0.18em] uppercase font-dm mb-4">
            {s("contact_eyebrow", "Get in touch")}
          </p>
          <h2 className="font-syne font-bold text-[#111827] leading-tight mb-3" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>
            {s("contact_headline", "Let's build something")}
            <br />
            <span className="text-[#6366F1]">automation system</span>
          </h2>
          <p className="text-[#6B7280] font-dm text-base">
            {s("contact_subtext", "Tell us about your business and we'll get back within 24 hours.")}
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid lg:grid-cols-[1fr,300px] bg-white rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(226,232,240,0.8)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
          }}
        >
          {/* ── Left: form ── */}
          <div className="p-8 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-5" role="status">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(238,242,255,0.8)" }}
                >
                  <CheckCircle size={26} className="text-[#6366F1]" />
                </div>
                <div>
                  <h3 className="font-syne font-semibold text-xl text-[#111827] mb-2">Message received</h3>
                  <p className="text-[#6B7280] font-dm text-sm max-w-xs">
                    We've received your message. Expect a reply within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#374151] font-dm mb-1.5 font-medium">
                      Full name <span className="text-[#6366F1]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      autoComplete="name"
                      className={inputCls}
                      {...register("fullName")}
                    />
                    <FieldError message={errors.fullName?.message} />
                  </div>
                  <div>
                    <label className="block text-xs text-[#374151] font-dm mb-1.5 font-medium">
                      Work email <span className="text-[#6366F1]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      className={inputCls}
                      {...register("workEmail")}
                    />
                    <FieldError message={errors.workEmail?.message} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#374151] font-dm mb-1.5 font-medium">
                      Company name <span className="text-[#6366F1]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      autoComplete="organization"
                      className={inputCls}
                      {...register("companyName")}
                    />
                    <FieldError message={errors.companyName?.message} />
                  </div>
                  <div>
                    <label className="block text-xs text-[#374151] font-dm mb-1.5 font-medium">
                      Company size <span className="text-[#6366F1]">*</span>
                    </label>
                    <select defaultValue="" className={inputCls + " appearance-none cursor-pointer"} {...register("companySize")}>
                      <option value="" disabled>Select size</option>
                      {COMPANY_SIZES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <FieldError message={errors.companySize?.message} />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#374151] font-dm mb-1.5 font-medium">
                      Select service <span className="text-[#6366F1]">*</span>
                    </label>
                    <select defaultValue="" className={inputCls + " appearance-none cursor-pointer"} {...register("service")}>
                      <option value="" disabled>Select service</option>
                      {SERVICES.map((sv) => <option key={sv.value} value={sv.value}>{sv.label}</option>)}
                    </select>
                    <FieldError message={errors.service?.message} />
                  </div>
                  <div>
                    <label className="block text-xs text-[#374151] font-dm mb-1.5 font-medium">
                      Select source <span className="text-[#6366F1]">*</span>
                    </label>
                    <select defaultValue="" className={inputCls + " appearance-none cursor-pointer"} {...register("referral")}>
                      <option value="" disabled>Select source</option>
                      {REFERRALS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    <FieldError message={errors.referral?.message} />
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label className="block text-xs text-[#374151] font-dm mb-1.5 font-medium">
                    Tell us about your challenge <span className="text-[#6366F1]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe the workflow, process, or challenge you want to address with AI automation."
                    className={inputCls + " resize-none"}
                    {...register("challenge")}
                  />
                  <FieldError message={errors.challenge?.message} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white font-dm disabled:opacity-50 transition-opacity"
                  style={{ background: "linear-gradient(135deg,#6366F1,#3B82F6)", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send message <ArrowRight size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: contact details ── */}
          <div
            className="relative p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[#F1F5F9] overflow-hidden"
            style={{ background: "linear-gradient(160deg,#FAFBFF 0%,#F5F3FF 100%)" }}
          >
            <SidebarDecoration />

            <div className="relative">
              <h3 className="font-syne font-bold text-[17px] text-[#111827] mb-6">
                Contact details
              </h3>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#6366F1] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#9CA3AF] font-dm mb-0.5">Email</p>
                    <a
                      href={`mailto:${s("contact_email", "hello@talpur.ai")}`}
                      className="text-sm font-medium text-[#111827] hover:text-[#6366F1] transition-colors font-dm"
                    >
                      {s("contact_email", "hello@talpur.ai")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#6366F1] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#9CA3AF] font-dm mb-0.5">We'll be in touch</p>
                    <span className="text-sm font-medium text-[#111827] font-dm">
                      {s("contact_response_time", "Within 24 hours")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#6366F1] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#9CA3AF] font-dm mb-0.5">We're located</p>
                    <span className="text-sm font-medium text-[#111827] font-dm">
                      {s("contact_location", "Paris, France")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-6">
                <h4 className="font-syne font-semibold text-sm text-[#111827] mb-4">
                  What happens after you submit?
                </h4>
                <ol className="space-y-3">
                  {[
                    "We'll review your inquiry within 24 hours",
                    "We'll contact you to schedule a discovery call",
                    "We deliver a tailored automation roadmap",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#6B7280] font-dm">
                      <span className="text-[#9CA3AF] font-medium shrink-0">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
