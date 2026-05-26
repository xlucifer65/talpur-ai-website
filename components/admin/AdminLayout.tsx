"use client";

import { useState } from "react";
import { LogOut, RefreshCw, LayoutDashboard, FileText, Star, Briefcase, Settings, Menu, X, Download } from "lucide-react";

export type AdminTab = "leads" | "blog" | "testimonials" | "services" | "works" | "settings";

const TABS: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: "leads", label: "Leads", icon: LayoutDashboard },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "works", label: "Works / Portfolio", icon: Star },
  { id: "settings", label: "Site Settings", icon: Settings },
];

interface Props {
  children: React.ReactNode;
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onRefresh: () => void;
  onLogout: () => void;
  loading?: boolean;
  leadCount?: number;
  newLeadCount?: number;
}

export default function AdminLayout({
  children,
  activeTab,
  onTabChange,
  onRefresh,
  onLogout,
  loading,
  leadCount = 0,
  newLeadCount = 0,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = ({ mobile = false }) => (
    <nav
      className={`${
        mobile
          ? "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-theme flex flex-col shadow-lg"
          : "hidden lg:flex w-56 flex-col border-r border-theme bg-surface"
      }`}
      aria-label="Admin navigation"
    >
      <div className="px-5 py-5 border-b border-theme flex items-center justify-between">
        <div>
          <h1 className="font-syne font-bold text-base text-text-primary">
            talpur<span className="text-accent-blue">.</span>ai
          </h1>
          <p className="text-xs text-text-secondary font-dm">Admin portal</p>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-text-secondary hover:text-text-primary">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 px-3 py-4 space-y-0.5">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              onTabChange(id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-dm transition-colors text-left ${
              activeTab === id
                ? "bg-accent-blue text-white"
                : "text-text-secondary hover:text-text-primary hover-overlay"
            }`}
          >
            <Icon size={15} />
            <span className="flex-1">{label}</span>
            {id === "leads" && newLeadCount > 0 && (
              <span
                className={`text-xs px-1.5 py-0.5 font-medium ${
                  activeTab === "leads"
                    ? "bg-surface/20 text-white"
                    : "bg-accent-blue/10 text-accent-blue"
                }`}
              >
                {newLeadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="px-3 pb-4 border-t border-theme pt-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-dm text-text-secondary hover:text-text-primary hover-overlay transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top bar (mobile + shared) */}
      <header className="bg-surface border-b border-theme px-4 lg:px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-text-secondary hover:text-text-primary"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
          <span className="font-syne font-bold text-base text-text-primary lg:hidden">
            talpur<span className="text-accent-blue">.</span>ai
          </span>
          <span className="hidden lg:block font-syne font-semibold text-sm text-text-primary capitalize">
            {TABS.find((t) => t.id === activeTab)?.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            title="Refresh"
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <a
            href="/api/admin/export"
            download="talpur-ai-sales-brief.pdf"
            title="Download sales brief"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-dm text-text-secondary hover:text-text-primary border border-theme hover:border-black/20 px-2.5 py-1.5 transition-all"
          >
            <Download size={12} />
            Sales Brief
          </a>
          <span className="hidden sm:block text-xs text-text-secondary font-dm border border-theme px-2 py-1">
            {leadCount} leads total
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar desktop */}
        <Sidebar />

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setSidebarOpen(false)}
            />
            <Sidebar mobile />
          </>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
