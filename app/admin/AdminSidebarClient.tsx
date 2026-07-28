"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Mail,
  ExternalLink,
  ShieldCheck,
  LogOut,
  User,
  Menu,
  X,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Leaf,
  Bell,
  Search,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
    description: "Overview & stats",
  },
  {
    name: "Gallery Manager",
    href: "/admin/gallery",
    icon: ImageIcon,
    description: "Media assets",
  },
  {
    name: "Contact Submissions",
    href: "/admin/contact",
    icon: Mail,
    description: "User inquiries",
  },
];

function getPageTitle(pathname: string) {
  if (pathname === "/admin") return "Dashboard";
  if (pathname.startsWith("/admin/gallery")) return "Gallery Manager";
  if (pathname.startsWith("/admin/contact")) return "Contact Submissions";
  return "Admin";
}

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let currentPath = "";
  for (const part of parts) {
    currentPath += `/${part}`;
    crumbs.push({
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: currentPath,
    });
  }
  return crumbs;
}

export function AdminSidebarClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const breadcrumbs = getBreadcrumbs(pathname);
  const pageTitle = getPageTitle(pathname);

  // Generate initials for avatar
  const userName = user?.name || user?.email || "A";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen flex bg-[#f4f7f2] font-sans text-slate-900">
      {/* ===== SIDEBAR (Desktop) ===== */}
      <aside
        className={`
          hidden md:flex flex-col fixed top-0 left-0 h-screen z-40
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${collapsed ? "w-[76px]" : "w-[264px]"}
        `}
        style={{
          background: "linear-gradient(180deg, #0a1f12 0%, #122a1a 40%, #0f2418 100%)",
        }}
      >
        {/* Decorative gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(84,166,51,0.15), transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(126,200,80,0.08), transparent 50%)",
          }}
        />

        {/* Subtle border glow */}
        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/20 via-emerald-400/10 to-transparent" />

        {/* Logo Area */}
        <div className={`relative z-10 flex items-center gap-3 px-5 h-[72px] shrink-0 border-b border-white/[0.06] ${collapsed ? "justify-center px-0" : ""}`}>
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-emerald-500/20 blur-md animate-pulse" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Leaf className="w-5 h-5 text-white" />
            </div>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-[15px] font-extrabold tracking-tight text-white block leading-tight">
                NISARG
              </span>
              <span className="text-[10px] font-semibold text-emerald-400/70 tracking-widest uppercase">
                Admin Console
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {!collapsed && (
            <div className="px-3 mb-3">
              <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-[0.15em]">
                Management
              </span>
            </div>
          )}
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={`
                  group relative flex items-center gap-3 rounded-xl transition-all duration-200
                  ${collapsed ? "justify-center px-0 py-3 mx-auto w-12 h-12" : "px-3.5 py-2.5"}
                  ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div
                    className={`absolute left-0 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/30
                      ${collapsed ? "top-1/2 -translate-y-1/2 -left-1 w-[3px] h-5" : "top-1/2 -translate-y-1/2 -left-0.5 w-[3px] h-6"}`}
                    style={{
                      transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                )}

                <item.icon
                  className={`shrink-0 transition-transform duration-200 group-hover:scale-110
                    ${collapsed ? "w-5 h-5" : "w-[18px] h-[18px]"}
                    ${isActive ? "text-emerald-400" : ""}`}
                />

                {!collapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[13px] font-semibold block leading-tight ${isActive ? "text-emerald-200 font-bold" : ""}`}>
                        {item.name}
                      </span>
                      <span className="text-[10px] text-white/30 block mt-0.5">
                        {item.description}
                      </span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500/60" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer — User + Collapse Toggle */}
        <div className="relative z-10 border-t border-white/[0.06] p-3 space-y-2">
          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/[0.04] rounded-xl transition-all text-xs font-medium cursor-pointer"
          >
            {collapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>

          {/* User card */}
          {!collapsed ? (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 border border-emerald-500/20 flex items-center justify-center text-emerald-300 text-xs font-bold">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/80 truncate">
                  {user?.name || user?.email}
                </p>
                <p className="text-[10px] text-emerald-500/60 font-medium">
                  Administrator
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 border border-emerald-500/20 flex items-center justify-center text-emerald-300 text-[10px] font-bold">
                {initials}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== MOBILE SIDEBAR DRAWER ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 w-[280px] md:hidden
          flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "linear-gradient(180deg, #0a1f12 0%, #122a1a 40%, #0f2418 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(84,166,51,0.15), transparent 60%)",
          }}
        />

        {/* Mobile Header */}
        <div className="relative z-10 flex items-center justify-between px-5 h-[72px] shrink-0 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[15px] font-extrabold tracking-tight text-white block leading-tight">
                NISARG
              </span>
              <span className="text-[10px] font-semibold text-emerald-400/70 tracking-widest uppercase">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-white/50 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Nav */}
        <nav className="relative z-10 flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
                )}
                <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-emerald-400" : ""}`} />
                <div className="flex-1 min-w-0">
                  <span className={`text-[13px] font-semibold block ${isActive ? "text-emerald-200" : ""}`}>
                    {item.name}
                  </span>
                  <span className="text-[10px] text-white/30">{item.description}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-500/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="relative z-10 border-t border-white/[0.06] p-4 space-y-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 border border-emerald-500/20 flex items-center justify-center text-emerald-300 text-xs font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white/80 truncate">
                {user?.name || user?.email}
              </p>
              <p className="text-[10px] text-emerald-500/60 font-medium">
                Administrator
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-red-400/80 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all text-xs font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "md:ml-[76px]" : "md:ml-[264px]"
        }`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
          <div className="h-[64px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left: Mobile menu + Breadcrumbs */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={crumb.href}>
                    {i > 0 && <span className="text-slate-300">/</span>}
                    {i === breadcrumbs.length - 1 ? (
                      <span className="font-semibold text-slate-700">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="hover:text-slate-600 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <h1 className="sm:hidden text-sm font-bold text-slate-800 truncate">
                {pageTitle}
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-all border border-slate-200 hover:border-emerald-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Site</span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-xl transition-all border border-slate-200 hover:border-red-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>

              {/* Mobile: compact buttons */}
              <Link
                href="/"
                target="_blank"
                className="sm:hidden p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="md:hidden p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            NISARG Foundation · Admin Console v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
