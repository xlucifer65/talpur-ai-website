"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import type { BlogPost } from "@/lib/db";

const CATEGORIES = ["AI Strategy", "Support Automation", "Sales Automation", "Marketing Intelligence", "Business Intelligence"];

type FormState = Omit<BlogPost, "id" | "created_at">;

const EMPTY: FormState = {
  title: "", category: CATEGORIES[0], date: "", read_time: "",
  excerpt: "", tag: "", featured: 0, slug: "",
};

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
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

function PostForm({
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
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    onSave({ ...form, slug });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Title *</label>
        <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Post title" className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category *</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tag</label>
          <input value={form.tag} onChange={(e) => set("tag", e.target.value)} placeholder="e.g. Strategy" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Date *</label>
          <input required value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="May 2025" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Read time *</label>
          <input required value={form.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="5 min read" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Excerpt *</label>
        <textarea required value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} placeholder="Short description..." className={inputClass + " resize-none"} />
      </div>
      <div>
        <label className={labelClass}>Slug (auto-generated if empty)</label>
        <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated-from-title" className={inputClass} />
      </div>
      <div className="flex items-center gap-3">
        <input
          id="featured"
          type="checkbox"
          checked={!!form.featured}
          onChange={(e) => set("featured", e.target.checked ? 1 : 0)}
          className="w-4 h-4 accent-accent-blue"
        />
        <label htmlFor="featured" className="text-sm font-dm text-text-primary cursor-pointer">Featured post</label>
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-black/[0.06]">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-dm text-text-secondary border border-black/[0.08] hover:border-black/20 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-dm text-white bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-40 border border-accent-blue transition-colors">
          {saving ? "Saving..." : "Save post"}
        </button>
      </div>
    </form>
  );
}

export default function BlogPanel({ posts, onUpdate }: { posts: BlogPost[]; onUpdate: (posts: BlogPost[]) => void }) {
  const [modal, setModal] = useState<null | { mode: "add" | "edit"; post?: BlogPost }>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleSave = async (data: FormState) => {
    setSaving(true);
    if (modal?.mode === "edit" && modal.post) {
      const res = await fetch(`/api/admin/blog/${modal.post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdate(posts.map((p) => (p.id === updated.id ? updated : p)));
      }
    } else {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const created = await res.json();
        onUpdate([created, ...posts]);
      }
    }
    setSaving(false);
    setModal(null);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    onUpdate(posts.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary font-dm">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="flex items-center gap-2 px-4 py-2 text-sm font-dm text-white bg-accent-blue hover:bg-accent-blue-hover border border-accent-blue transition-colors"
        >
          <Plus size={14} /> Add post
        </button>
      </div>

      <div className="border border-black/[0.08] bg-white">
        {posts.length === 0 ? (
          <div className="py-14 text-center text-text-secondary font-dm text-sm">No blog posts yet.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.06]">
                <th className="px-5 py-3 text-left text-xs font-dm text-text-secondary font-medium tracking-wide">Title</th>
                <th className="px-5 py-3 text-left text-xs font-dm text-text-secondary font-medium tracking-wide hidden md:table-cell">Category</th>
                <th className="px-5 py-3 text-left text-xs font-dm text-text-secondary font-medium tracking-wide hidden lg:table-cell">Date</th>
                <th className="px-5 py-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-black/[0.06] hover:bg-black/[0.015] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-dm text-sm font-medium text-text-primary">{post.title}</span>
                      {!!post.featured && <Star size={12} className="text-accent-blue fill-accent-blue flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-text-secondary font-dm mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs font-dm text-accent-blue bg-badge border border-accent-blue/15 px-2 py-1">{post.category}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-text-secondary font-dm">{post.date} · {post.read_time}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setModal({ mode: "edit", post })}
                        className="p-1.5 text-text-secondary hover:text-accent-blue transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(post.id)}
                        className="p-1.5 text-text-secondary hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit modal */}
      {modal && (
        <Modal
          title={modal.mode === "add" ? "Add blog post" : "Edit blog post"}
          onClose={() => setModal(null)}
        >
          <PostForm
            initial={modal.post ? { title: modal.post.title, category: modal.post.category, date: modal.post.date, read_time: modal.post.read_time, excerpt: modal.post.excerpt, tag: modal.post.tag, featured: modal.post.featured, slug: modal.post.slug } : EMPTY}
            onSave={handleSave}
            onClose={() => setModal(null)}
            saving={saving}
          />
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <Modal title="Delete post?" onClose={() => setDeleteId(null)}>
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
