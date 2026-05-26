"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Testimonial } from "@/lib/db";

type FormState = Omit<Testimonial, "id" | "created_at">;

const EMPTY: FormState = { quote: "", name: "", role: "", initials: "", sort_order: 99 };

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/20 overflow-y-auto">
      <div className="w-full max-w-xl bg-white border border-black/[0.08] shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
          <h2 className="font-syne font-semibold text-base text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><X size={18} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const inputClass = "w-full bg-surface border border-black/[0.10] px-3 py-2.5 text-sm font-dm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue/60 transition-colors";
const labelClass = "block text-xs text-text-secondary font-dm mb-1.5 tracking-wide";

function TestimonialForm({
  initial,
  onSave,
  onClose,
  saving,
}: {
  initial: FormState;
  onSave: (data: FormState) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const set = (k: keyof FormState, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = form.initials || form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    onSave({ ...form, initials });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Quote *</label>
        <textarea
          required
          value={form.quote}
          onChange={(e) => set("quote", e.target.value)}
          rows={4}
          placeholder="Client testimonial text..."
          className={inputClass + " resize-none"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Sarah M." className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Initials (auto if empty)</label>
          <input value={form.initials} onChange={(e) => set("initials", e.target.value)} placeholder="SM" maxLength={2} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Role / Company *</label>
        <input required value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Head of Operations, SaaS Company" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Sort order</label>
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => set("sort_order", parseInt(e.target.value) || 0)}
          className={inputClass}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-black/[0.06]">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-dm text-text-secondary border border-black/[0.08] hover:border-black/20 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-dm text-white bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-40 border border-accent-blue transition-colors">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default function TestimonialsPanel({
  testimonials,
  onUpdate,
}: {
  testimonials: Testimonial[];
  onUpdate: (t: Testimonial[]) => void;
}) {
  const [modal, setModal] = useState<null | { mode: "add" | "edit"; item?: Testimonial }>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleSave = async (data: FormState) => {
    setSaving(true);
    if (modal?.mode === "edit" && modal.item) {
      const res = await fetch(`/api/admin/testimonials/${modal.item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdate(testimonials.map((t) => (t.id === updated.id ? updated : t)));
      }
    } else {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const created = await res.json();
        onUpdate([...testimonials, created].sort((a, b) => a.sort_order - b.sort_order));
      }
    }
    setSaving(false);
    setModal(null);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    onUpdate(testimonials.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary font-dm">{testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="flex items-center gap-2 px-4 py-2 text-sm font-dm text-white bg-accent-blue hover:bg-accent-blue-hover border border-accent-blue transition-colors"
        >
          <Plus size={14} /> Add testimonial
        </button>
      </div>

      <div className="space-y-0 border border-black/[0.08] bg-white">
        {testimonials.length === 0 ? (
          <div className="py-14 text-center text-text-secondary font-dm text-sm">No testimonials yet.</div>
        ) : (
          testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`flex gap-4 p-5 ${i < testimonials.length - 1 ? "border-b border-black/[0.06]" : ""}`}
            >
              {/* Avatar */}
              <div className="w-9 h-9 bg-badge border border-accent-blue/15 flex items-center justify-center text-xs font-syne font-semibold text-accent-blue flex-shrink-0">
                {t.initials}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-dm text-text-primary leading-relaxed mb-2">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium font-dm text-text-primary">{t.name}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span className="text-xs font-dm text-text-secondary">{t.role}</span>
                </div>
              </div>

              <div className="flex items-start gap-1 flex-shrink-0">
                <button
                  onClick={() => setModal({ mode: "edit", item: t })}
                  className="p-1.5 text-text-secondary hover:text-accent-blue transition-colors"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="p-1.5 text-text-secondary hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modal && (
        <Modal
          title={modal.mode === "add" ? "Add testimonial" : "Edit testimonial"}
          onClose={() => setModal(null)}
        >
          <TestimonialForm
            initial={modal.item ? { quote: modal.item.quote, name: modal.item.name, role: modal.item.role, initials: modal.item.initials, sort_order: modal.item.sort_order } : EMPTY}
            onSave={handleSave}
            onClose={() => setModal(null)}
            saving={saving}
          />
        </Modal>
      )}

      {deleteId !== null && (
        <Modal title="Delete testimonial?" onClose={() => setDeleteId(null)}>
          <p className="text-sm font-dm text-text-secondary mb-5">This cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-dm text-text-secondary border border-black/[0.08] hover:border-black/20 transition-colors">
              Cancel
            </button>
            <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-sm font-dm text-white bg-red-500 hover:bg-red-600 border border-red-500 transition-colors">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
