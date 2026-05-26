"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, GripVertical } from "lucide-react";
import type { Service } from "@/lib/db";

type FormState = Omit<Service, "id" | "created_at">;

const EMPTY: FormState = { number: "", title: "", items: "[]", insight: "", sort_order: 99 };

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 bg-black/20 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white border border-black/[0.08] shadow-lg">
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

function ServiceForm({
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
  const [items, setItems] = useState<string[]>(() => {
    try { return JSON.parse(initial.items) as string[]; } catch { return []; }
  });
  const [newItem, setNewItem] = useState("");

  const set = (k: keyof FormState, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const addItem = () => {
    const trimmed = newItem.trim();
    if (trimmed) { setItems((prev) => [...prev, trimmed]); setNewItem(""); }
  };

  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  const updateItem = (i: number, val: string) =>
    setItems((prev) => prev.map((item, idx) => (idx === i ? val : item)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, items: JSON.stringify(items) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Number *</label>
          <input required value={form.number} onChange={(e) => set("number", e.target.value)} placeholder="01" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Sort order</label>
          <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", parseInt(e.target.value) || 0)} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Title *</label>
        <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Service title" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Service items</label>
        <div className="space-y-2 mb-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <GripVertical size={14} className="text-text-secondary/30 flex-shrink-0" />
              <input
                value={item}
                onChange={(e) => updateItem(i, e.target.value)}
                className={inputClass + " flex-1"}
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="p-1.5 text-text-secondary hover:text-red-500 flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(); } }}
            placeholder="Add item and press Enter"
            className={inputClass + " flex-1"}
          />
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-2 text-sm font-dm text-white bg-accent-blue hover:bg-accent-blue-hover border border-accent-blue transition-colors flex-shrink-0"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <div>
        <label className={labelClass}>Insight (shown expanded) *</label>
        <textarea
          required
          value={form.insight}
          onChange={(e) => set("insight", e.target.value)}
          rows={3}
          placeholder="The one-line insight shown when this service is expanded..."
          className={inputClass + " resize-none"}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-black/[0.06]">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-dm text-text-secondary border border-black/[0.08] hover:border-black/20 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-dm text-white bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-40 border border-accent-blue transition-colors">
          {saving ? "Saving..." : "Save service"}
        </button>
      </div>
    </form>
  );
}

export default function ServicesPanel({
  services,
  onUpdate,
}: {
  services: Service[];
  onUpdate: (s: Service[]) => void;
}) {
  const [modal, setModal] = useState<null | { mode: "add" | "edit"; item?: Service }>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleSave = async (data: FormState) => {
    setSaving(true);
    if (modal?.mode === "edit" && modal.item) {
      const res = await fetch(`/api/admin/services/${modal.item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdate(services.map((s) => (s.id === updated.id ? updated : s)));
      }
    } else {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const created = await res.json();
        onUpdate([...services, created].sort((a, b) => a.sort_order - b.sort_order));
      }
    }
    setSaving(false);
    setModal(null);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    onUpdate(services.filter((s) => s.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary font-dm">{services.length} service{services.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="flex items-center gap-2 px-4 py-2 text-sm font-dm text-white bg-accent-blue hover:bg-accent-blue-hover border border-accent-blue transition-colors"
        >
          <Plus size={14} /> Add service
        </button>
      </div>

      <div className="space-y-0 border border-black/[0.08] bg-white">
        {services.length === 0 ? (
          <div className="py-14 text-center text-text-secondary font-dm text-sm">No services yet.</div>
        ) : (
          services.map((svc, i) => {
            const items: string[] = (() => { try { return JSON.parse(svc.items) as string[]; } catch { return []; } })();
            return (
              <div
                key={svc.id}
                className={`p-5 ${i < services.length - 1 ? "border-b border-black/[0.06]" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-syne text-xs text-text-secondary tracking-widest font-medium">{svc.number}</span>
                      <h3 className="font-syne font-semibold text-sm text-text-primary">{svc.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {items.slice(0, 3).map((item, j) => (
                        <span key={j} className="text-xs font-dm text-text-secondary bg-surface border border-black/[0.06] px-2 py-0.5">
                          {item}
                        </span>
                      ))}
                      {items.length > 3 && (
                        <span className="text-xs font-dm text-text-secondary">+{items.length - 3} more</span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary font-dm italic line-clamp-1">&ldquo;{svc.insight}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setModal({ mode: "edit", item: svc })}
                      className="p-1.5 text-text-secondary hover:text-accent-blue transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteId(svc.id)}
                      className="p-1.5 text-text-secondary hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {modal && (
        <Modal
          title={modal.mode === "add" ? "Add service" : "Edit service"}
          onClose={() => setModal(null)}
        >
          <ServiceForm
            initial={modal.item
              ? { number: modal.item.number, title: modal.item.title, items: modal.item.items, insight: modal.item.insight, sort_order: modal.item.sort_order }
              : EMPTY
            }
            onSave={handleSave}
            onClose={() => setModal(null)}
            saving={saving}
          />
        </Modal>
      )}

      {deleteId !== null && (
        <Modal title="Delete service?" onClose={() => setDeleteId(null)}>
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
