"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Phone,
  Clock,
  Trash2,
  Eye,
  X,
  Loader2,
  Inbox,
  User,
  MessageSquare,
  Calendar,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

interface ContactItem {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

// Generate color from name for avatar
function getInitialColor(name: string) {
  const colors = [
    "from-emerald-400 to-emerald-600",
    "from-amber-400 to-amber-600",
    "from-sky-400 to-sky-600",
    "from-violet-400 to-violet-600",
    "from-rose-400 to-rose-600",
    "from-teal-400 to-teal-600",
    "from-indigo-400 to-indigo-600",
    "from-orange-400 to-orange-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function timeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return then.toLocaleDateString();
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [viewingContact, setViewingContact] = useState<ContactItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success && Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      }
    } catch (err) {
      console.error("Failed to fetch contact submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phoneNumber && c.phoneNumber.toLowerCase().includes(q)) ||
      c.message.toLowerCase().includes(q)
    );
  });

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    try {
      const res = await fetch(`/api/contact?id=${deleteTargetId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete contact record");
      }

      setDeleteTargetId(null);
      if (viewingContact?.id === deleteTargetId) {
        setViewingContact(null);
      }
      fetchContacts();
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Failed to delete message submission.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Contact Submissions
            </h1>
            <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {contacts.length} Inquiries
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1.5">
            Read and manage user inquiries, volunteer registrations, and
            partnership requests.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search contacts by name, email, phone, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Contact List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded-lg animate-pulse w-1/3" />
                <div className="h-3 bg-slate-50 rounded-lg animate-pulse w-2/3" />
              </div>
              <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No submissions found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
            {searchQuery
              ? "No messages match your search criteria. Try a different keyword."
              : "No user inquiries have been received yet. They will appear here when submitted through the website contact form."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {filteredContacts.map((item, i) => (
            <div
              key={item.id}
              className={`group flex items-start sm:items-center gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors cursor-pointer ${
                i !== filteredContacts.length - 1
                  ? "border-b border-slate-50"
                  : ""
              }`}
              onClick={() => setViewingContact(item)}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getInitialColor(
                  item.name
                )} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}
              >
                {getInitials(item.name)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-800">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                    · {timeAgo(item.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                  {item.email && (
                    <span className="flex items-center gap-1 font-medium">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {item.email}
                    </span>
                  )}
                  {item.phoneNumber && (
                    <span className="flex items-center gap-1 font-medium">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {item.phoneNumber}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {item.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewingContact(item);
                  }}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border border-transparent hover:border-emerald-200 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTargetId(item.id);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== VIEW DETAILS MODAL ===== */}
      {viewingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Contact Details
              </h3>
              <button
                onClick={() => setViewingContact(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Sender Card */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getInitialColor(
                    viewingContact.name
                  )} flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                >
                  {getInitials(viewingContact.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    {viewingContact.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Submitted{" "}
                    {new Date(viewingContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </span>
                  <p className="font-semibold text-slate-800 text-sm mt-1">
                    {viewingContact.email || "Not provided"}
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone
                  </span>
                  <p className="font-semibold text-slate-800 text-sm mt-1">
                    {viewingContact.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Full Message
                </span>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 leading-relaxed text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {viewingContact.message}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setDeleteTargetId(viewingContact.id);
                  }}
                  className="text-xs text-rose-500 font-bold hover:text-rose-700 flex items-center gap-1.5 px-3 py-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
                <div className="flex gap-2">
                  {viewingContact.email && (
                    <a
                      href={`mailto:${viewingContact.email}`}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Reply via Email
                    </a>
                  )}
                  <button
                    onClick={() => setViewingContact(null)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION ===== */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Delete Inquiry?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-[260px] mx-auto">
                This will permanently remove this contact submission from your
                database. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-xl transition-all cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
