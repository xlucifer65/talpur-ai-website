"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Save, X, Star } from "lucide-react";

interface Work {
  id: number;
  title: string;
  category: string;
  description: string;
  outcome: string;
  tags: string;
  image_url: string;
  featured: number;
  sort_order: number;
}

const EMPTY: Omit<Work, "id"> = {
  title: "", category: "", description: "", outcome: "",
  tags: "[]", image_url: "", featured: 0, sort_order: 0,
};

const CATEGORIES = [
  "Lead Generation", "Support Automation", "Operations", "Marketing Automation",
  "CRM Automation", "Workflow Integration", "AI Chatbot", "AI Agent", "Other",
];

export default function WorksPanel({ token }: { token: string }) {
  const [works, setWorks] = useState<Work[]>([]);
  const [editing, setEditing] = useState<Work | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Work, "id">>(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/works", { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setWorks(await res.json());
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(EMPTY);
    setTagsInput("");
    setCreating(true);
    setEditing(null);
  }

  function openEdit(w: Work) {
    const tags = JSON.parse(w.tags || "[]");
    setForm({ ...w });
    setTagsInput(tags.join(", "));
    setEditing(w);
    setCreating(false);
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
  }

  async function save() {
    setSaving(true);
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
    const payload = { ...form, tags };
    if (creating) {
      await fetch("/api/admin/works", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
    } else if (editing) {
      await fetch(`/api/admin/works/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
    }
    await load();
    closeForm();
    setSaving(false);
  }

  async function del(id: number) {
    if (!confirm("Delete this work?")) return;
    await fetch(`/api/admin/works/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    await load();
  }

  const inputClass = "w-full bg-surface border border-theme px-3 py-2 text-sm text-text-primary font-dm focus:outline-none focus:border-accent-blue/60 transition-colors";
  const labelClass = "block text-xs text-text-secondary font-dm mb-1.5";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-syne font-semibold text-xl text-text-primary">Works / Portfolio</h2>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors border border-accent-blue">
          <Plus size={14} /> Add Work
        </button>
      </div>

      {/* Form */}
      {(creating || editing) && (
        <div className="mb-8 border border-theme p-6 bg-surface">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-syne font-semibold text-base text-text-primary">{creating ? "New Work" : "Edit Work"}</h3>
            <button onClick={closeForm} className="text-text-secondary hover:text-text-primary"><X size={16} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input className={inputClass} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project title" />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select className={inputClass + " appearance-none"} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea className={inputClass + " resize-none"} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What was built and how it works..." />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Outcome *</label>
              <input className={inputClass} value={form.outcome} onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))} placeholder="e.g. 5× faster response · 40hrs/wk saved" />
            </div>
            <div>
              <label className={labelClass}>Tags (comma-separated)</label>
              <input className={inputClass} value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="AI Agents, Make.com, GPT-4" />
            </div>
            <div>
              <label className={labelClass}>Image URL (optional)</label>
              <input className={inputClass} value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>Sort order</label>
              <input type="number" className={inputClass} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" id="featured" checked={form.featured === 1} onChange={e => setForm(f => ({ ...f, featured: e.target.checked ? 1 : 0 }))} className="accent-accent-blue" />
              <label htmlFor="featured" className="text-sm text-text-primary font-dm cursor-pointer">Featured (spans 2 columns)</label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover transition-colors border border-accent-blue disabled:opacity-50">
              <Save size={13} /> {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={closeForm} className="px-5 py-2.5 text-sm font-dm text-text-secondary border border-theme hover:border-theme transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      {works.length === 0 ? (
        <div className="border border-theme p-12 text-center">
          <p className="text-text-secondary font-dm text-sm mb-4">No works yet. Add your first project above.</p>
        </div>
      ) : (
        <div className="space-y-0 border border-theme">
          {works.map((w, i) => (
            <div key={w.id} className={`p-5 flex items-start justify-between gap-4 hover-overlay transition-colors ${i < works.length - 1 ? "border-b border-theme" : ""}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 bg-badge text-accent-blue border border-accent-blue/20 font-dm">{w.category}</span>
                  {w.featured === 1 && <Star size={12} className="text-accent-blue" />}
                </div>
                <p className="font-syne font-semibold text-base text-text-primary truncate">{w.title}</p>
                <p className="text-xs text-text-secondary font-dm mt-1 truncate">{w.outcome}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(w)} className="p-2 text-text-secondary hover:text-accent-blue border border-theme hover:border-accent-blue/30 transition-all">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => del(w.id)} className="p-2 text-text-secondary hover:text-red-400 border border-theme hover:border-red-400/30 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
