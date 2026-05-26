"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp, Users, Mail, TrendingUp, Clock } from "lucide-react";
import type { Lead } from "@/lib/db";

type Status = Lead["status"];

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-green-50 text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-500 border-gray-200",
};

const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  closed: "Closed",
};

const SERVICE_LABELS: Record<string, string> = {
  strategy: "AI Strategy",
  sales: "Sales Automation",
  support: "Support Automation",
  marketing: "Marketing Intelligence",
  bi: "Business Intelligence",
  "not-sure": "Not sure yet",
};

const COMPANY_SIZE_LABELS: Record<string, string> = {
  "1-10": "1–10",
  "11-50": "11–50",
  "51-200": "51–200",
  "200-1000": "200–1,000",
  "1000+": "1,000+",
};

function LeadRow({ lead, onUpdate }: { lead: Lead; onUpdate: (l: Lead) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const [localStatus, setLocalStatus] = useState<Status>(lead.status);

  const patch = async (status: Status, updatedNotes?: string) => {
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes: updatedNotes ?? notes }),
    });
    setSaving(false);
    if (res.ok) onUpdate(await res.json());
  };

  const date = new Date(lead.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <>
      <tr
        className="border-b border-black/[0.06] hover:bg-black/[0.015] transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-3.5">
          <div className="font-dm text-sm font-medium text-text-primary">{lead.full_name}</div>
          <div className="font-dm text-xs text-text-secondary mt-0.5">{lead.work_email}</div>
        </td>
        <td className="px-4 py-3.5 hidden sm:table-cell">
          <div className="font-dm text-sm text-text-primary">{lead.company_name}</div>
          <div className="font-dm text-xs text-text-secondary mt-0.5">
            {COMPANY_SIZE_LABELS[lead.company_size] ?? lead.company_size} emp.
          </div>
        </td>
        <td className="px-4 py-3.5 hidden md:table-cell">
          <span className="font-dm text-xs text-text-secondary bg-surface border border-black/[0.06] px-2 py-1">
            {SERVICE_LABELS[lead.service] ?? lead.service}
          </span>
        </td>
        <td className="px-4 py-3.5 hidden lg:table-cell">
          <span className="font-dm text-xs text-text-secondary">{date}</span>
        </td>
        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
          <select
            value={localStatus}
            onChange={(e) => {
              const s = e.target.value as Status;
              setLocalStatus(s);
              patch(s);
            }}
            disabled={saving}
            className={`text-xs font-dm border px-2 py-1 cursor-pointer focus:outline-none appearance-none ${STATUS_STYLES[localStatus]}`}
          >
            {(Object.keys(STATUS_LABELS) as Status[]).map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3.5 text-text-secondary">
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </td>
      </tr>

      {expanded && (
        <tr className="bg-surface border-b border-black/[0.06]">
          <td colSpan={6} className="px-4 py-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-medium text-text-secondary font-dm mb-2 tracking-wide uppercase">Challenge</p>
                <p className="text-sm font-dm text-text-primary leading-relaxed">{lead.challenge}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs font-dm text-text-secondary bg-white border border-black/[0.08] px-2 py-1">
                    via {lead.referral}
                  </span>
                  <span className="text-xs font-dm text-text-secondary bg-white border border-black/[0.08] px-2 py-1 md:hidden">
                    {date}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary font-dm mb-2 tracking-wide uppercase">Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Internal notes..."
                  className="w-full bg-white border border-black/[0.10] px-3 py-2 text-sm font-dm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue/60 resize-none"
                />
                <button
                  onClick={() => patch(localStatus, notes)}
                  disabled={saving}
                  className="mt-2 text-xs font-dm text-white bg-accent-blue hover:bg-accent-blue-hover px-3 py-1.5 transition-colors disabled:opacity-40 border border-accent-blue"
                >
                  {saving ? "Saving..." : "Save notes"}
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function LeadsPanel({ leads, onUpdate }: { leads: Lead[]; onUpdate: (l: Lead) => void }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");

  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const thisWeek = leads.filter((l) => {
    const diff = (Date.now() - new Date(l.created_at).getTime()) / 86400000;
    return diff <= 7;
  }).length;

  const filtered = leads.filter((l) => {
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    const q = search.toLowerCase();
    return matchStatus && (!q ||
      l.full_name.toLowerCase().includes(q) ||
      l.work_email.toLowerCase().includes(q) ||
      l.company_name.toLowerCase().includes(q));
  });

  const stats = [
    { label: "Total", value: total, icon: Users },
    { label: "New", value: newCount, icon: Mail },
    { label: "Qualified", value: qualified, icon: TrendingUp },
    { label: "This week", value: thisWeek, icon: Clock },
  ];

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-black/[0.08] bg-white">
        {stats.map(({ label, value, icon: Icon }, i) => (
          <div key={label} className={`p-4 ${i < 3 ? "border-r border-black/[0.06]" : ""}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-text-secondary font-dm">{label}</span>
              <Icon size={13} className="text-text-secondary/40" />
            </div>
            <div className="font-syne font-bold text-2xl text-text-primary">{value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
          <input
            type="text"
            placeholder="Search name, email or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-black/[0.10] pl-8 pr-4 py-2 text-sm font-dm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue/60 transition-colors"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {(["all", "new", "contacted", "qualified", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 text-xs font-dm border transition-colors capitalize ${
                filterStatus === s
                  ? "bg-accent-blue text-white border-accent-blue"
                  : "bg-white text-text-secondary border-black/[0.08] hover:border-black/20"
              }`}
            >
              {s === "all" ? "All" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-black/[0.08] bg-white overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="py-14 text-center text-text-secondary font-dm text-sm">
            {leads.length === 0 ? "No leads yet. Form submissions will appear here." : "No leads match your filters."}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.06]">
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary font-dm tracking-wide">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary font-dm tracking-wide hidden sm:table-cell">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary font-dm tracking-wide hidden md:table-cell">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary font-dm tracking-wide hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary font-dm tracking-wide">Status</th>
                <th className="px-4 py-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <LeadRow key={lead.id} lead={lead} onUpdate={onUpdate} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {filtered.length > 0 && (
        <p className="text-xs text-text-secondary font-dm">Showing {filtered.length} of {leads.length} leads</p>
      )}
    </div>
  );
}
