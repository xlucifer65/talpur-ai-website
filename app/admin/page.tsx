"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout, { type AdminTab } from "@/components/admin/AdminLayout";
import LeadsPanel from "@/components/admin/LeadsPanel";
import BlogPanel from "@/components/admin/BlogPanel";
import TestimonialsPanel from "@/components/admin/TestimonialsPanel";
import ServicesPanel from "@/components/admin/ServicesPanel";
import SettingsPanel from "@/components/admin/SettingsPanel";
import WorksPanel from "@/components/admin/WorksPanel";
import type { Lead, BlogPost, Testimonial, Service } from "@/lib/db";

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) { onLogin(); }
    else { setError("Incorrect password."); setPassword(""); }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-syne font-bold text-2xl text-text-primary">
            talpur<span className="text-accent-blue">.</span>ai
          </h1>
          <p className="text-sm text-text-secondary font-dm mt-1">Admin portal</p>
        </div>
        <form onSubmit={submit} className="border border-theme bg-surface p-8">
          <label htmlFor="pw" className="block text-xs text-text-secondary font-dm mb-2 tracking-wide">Password</label>
          <input
            id="pw" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password" autoFocus
            className="w-full bg-background border border-theme px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 font-dm focus:outline-none focus:border-accent-blue/60 mb-4 transition-colors"
          />
          {error && <p className="text-xs text-red-400 font-dm mb-4">{error}</p>}
          <button type="submit" disabled={loading || !password}
            className="w-full py-3 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-40 transition-colors border border-accent-blue font-dm">
            {loading ? "Checking..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface AppData {
  leads: Lead[];
  posts: BlogPost[];
  testimonials: Testimonial[];
  services: Service[];
}

function Dashboard() {
  const [tab, setTab] = useState<AdminTab>("leads");
  const [data, setData] = useState<AppData>({ leads: [], posts: [], testimonials: [], services: [] });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [leadsRes, postsRes, testimonialsRes, servicesRes] = await Promise.all([
      fetch("/api/admin/leads"),
      fetch("/api/admin/blog"),
      fetch("/api/admin/testimonials"),
      fetch("/api/admin/services"),
    ]);
    const [leads, posts, testimonials, services] = await Promise.all([
      leadsRes.json(), postsRes.json(), testimonialsRes.json(), servicesRes.json(),
    ]);
    setData({ leads, posts, testimonials, services });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
    setToken(document.cookie.match(/admin_token=([^;]+)/)?.[1] ?? "");
  }, [fetchAll]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.reload();
  };

  const newLeadCount = data.leads.filter((l) => l.status === "new").length;

  return (
    <AdminLayout
      activeTab={tab} onTabChange={setTab} onRefresh={fetchAll}
      onLogout={handleLogout} loading={loading}
      leadCount={data.leads.length} newLeadCount={newLeadCount}
    >
      {loading && data.leads.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-text-secondary font-dm text-sm">Loading...</div>
      ) : (
        <>
          {tab === "leads" && (
            <LeadsPanel leads={data.leads}
              onUpdate={(updated) => setData((d) => ({ ...d, leads: d.leads.map((l) => (l.id === updated.id ? updated : l)) }))} />
          )}
          {tab === "blog" && <BlogPanel posts={data.posts} onUpdate={(posts) => setData((d) => ({ ...d, posts }))} />}
          {tab === "testimonials" && <TestimonialsPanel testimonials={data.testimonials} onUpdate={(testimonials) => setData((d) => ({ ...d, testimonials }))} />}
          {tab === "services" && <ServicesPanel services={data.services} onUpdate={(services) => setData((d) => ({ ...d, services }))} />}
          {tab === "works" && <WorksPanel token={token} />}
          {tab === "settings" && <SettingsPanel />}
        </>
      )}
    </AdminLayout>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/leads").then((res) => setAuthed(res.status !== 401));
  }, []);

  if (authed === null) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard />;
}
