"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Mail,
  ArrowRight,
  Upload,
  Clock,
  User,
  Phone,
  TrendingUp,
  Activity,
  Eye,
  Sparkles,
} from "lucide-react";

// Animated counter hook
function useAnimatedCounter(target: number, duration = 1200, enabled = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!enabled || target === 0) {
      setCount(target);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, enabled]);

  return count;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    galleryCount: 0,
    contactCount: 0,
    loading: true,
  });

  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const [resGallery, resContact] = await Promise.all([
          fetch("/api/gallery"),
          fetch("/api/contact"),
        ]);

        const dataGallery = await resGallery.json();
        const dataContact = await resContact.json();

        setStats({
          galleryCount: dataGallery.images?.length || 0,
          contactCount: dataContact.contacts?.length || 0,
          loading: false,
        });

        if (dataContact.contacts) {
          setRecentContacts(dataContact.contacts.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load admin stats:", err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }

    loadStats();
  }, []);

  const animatedGallery = useAnimatedCounter(
    stats.galleryCount,
    1200,
    !stats.loading
  );
  const animatedContacts = useAnimatedCounter(
    stats.contactCount,
    1200,
    !stats.loading
  );

  // Generate color from name for avatar
  function getInitialColor(name: string) {
    const colors = [
      "from-emerald-400 to-emerald-600",
      "from-amber-400 to-amber-600",
      "from-sky-400 to-sky-600",
      "from-violet-400 to-violet-600",
      "from-rose-400 to-rose-600",
      "from-teal-400 to-teal-600",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        className="relative overflow-hidden rounded-2xl lg:rounded-3xl p-6 sm:p-8 shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, #0f2a18 0%, #1a4025 30%, #2c5234 60%, #1f4a2c 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(126,200,80,0.6), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, rgba(84,166,51,0.8), transparent 70%)",
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-[11px] font-bold text-emerald-300/80 uppercase tracking-widest">
                Admin Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Welcome back to your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-200">
                Management Dashboard
              </span>
            </h1>
            <p className="text-emerald-100/60 text-sm mt-3 max-w-xl leading-relaxed">
              Manage gallery media assets, captions, and view incoming contact
              inquiries from NISARG Foundation supporters.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/gallery"
              className="group px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white rounded-xl font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Upload Image</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Gallery Metric */}
        <Link
          href="/admin/gallery"
          className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden"
        >
          {/* Hover gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/0 group-hover:from-emerald-50/80 group-hover:to-green-50/40 transition-all duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-600 flex items-center justify-center group-hover:from-emerald-500 group-hover:to-green-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
                Manage
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Gallery Media
            </p>
            <h3 className="text-4xl font-black text-slate-900 mt-1.5 tabular-nums">
              {stats.loading ? (
                <span className="inline-block w-16 h-10 bg-slate-100 rounded-lg animate-pulse" />
              ) : (
                animatedGallery
              )}
            </h3>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>Active assets</span>
            </div>
          </div>
        </Link>

        {/* Contact Metric */}
        <Link
          href="/admin/contact"
          className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/80 group-hover:to-orange-50/40 transition-all duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 text-amber-600 flex items-center justify-center group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-amber-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 flex items-center gap-1.5 transition-colors">
                View All
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Contact Inquiries
            </p>
            <h3 className="text-4xl font-black text-slate-900 mt-1.5 tabular-nums">
              {stats.loading ? (
                <span className="inline-block w-16 h-10 bg-slate-100 rounded-lg animate-pulse" />
              ) : (
                animatedContacts
              )}
            </h3>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-600 font-semibold">
              <Activity className="w-3 h-3" />
              <span>Total submissions</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Contact Messages */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 inline-block" />
              Recent Contact Inquiries
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 ml-4">
              Latest messages from the website contact form
            </p>
          </div>
          <Link
            href="/admin/contact"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            View all ({stats.contactCount})
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-400">
              No contact submissions received yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Inquiries from the website contact form will appear here
            </p>
          </div>
        ) : (
          <div>
            {recentContacts.map((c, i) => (
              <div
                key={c.id}
                className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50/80 transition-colors ${
                  i !== recentContacts.length - 1
                    ? "border-b border-slate-50"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getInitialColor(
                    c.name
                  )} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}
                >
                  {c.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-800">
                      {c.name}
                    </span>
                    {c.email && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {c.email}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 max-w-lg">
                    {c.message}
                  </p>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href="/admin/contact"
                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors hidden sm:flex"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
