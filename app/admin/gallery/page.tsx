"use client";

import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  Trash2,
  Edit2,
  Upload,
  X,
  Loader2,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  Filter,
  Grid3X3,
  Calendar,
  Sparkles,
} from "lucide-react";

import UploadModal from "@/components/admin/gallery/UploadModal";

const CATEGORIES = ["All", "Field Work", "Workshops", "Community", "General"];

interface GalleryItem {
  id: string;
  url: string;
  title: string | null;
  category: string | null;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Edit form states
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("General");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setImages(data.images);
      }
    } catch (err) {
      console.error("Failed to load gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Filtered images
  const filteredImages = images.filter((img) => {
    const matchesCategory =
      selectedCategory === "All" || img.category === selectedCategory;
    const matchesQuery =
      !searchQuery ||
      (img.title &&
        img.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (img.category &&
        img.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  // Edit Submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      setIsUpdating(true);
      const res = await fetch(`/api/gallery/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update image.");
      }

      setEditingItem(null);
      fetchImages();
    } catch (err: any) {
      console.error("Edit error:", err);
      alert("Failed to update gallery image details.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Submission
  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    try {
      const res = await fetch(`/api/gallery/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete image.");
      }

      setDeleteTargetId(null);
      fetchImages();
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Failed to delete image.");
    }
  };

  // Category color map
  function getCategoryColor(cat: string) {
    const map: Record<string, string> = {
      "Field Work": "bg-emerald-50 text-emerald-700 border-emerald-200",
      Workshops: "bg-sky-50 text-sky-700 border-sky-200",
      Community: "bg-violet-50 text-violet-700 border-violet-200",
      General: "bg-slate-50 text-slate-600 border-slate-200",
    };
    return map[cat] || map.General;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Gallery Manager
            </h1>
            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              {images.length} Assets
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1.5">
            Upload, edit captions and categories, or remove photos from the
            public site.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="group bg-[#2c5234] hover:bg-[#1f3b25] text-black font-bold rounded-xl text-xs px-5 py-3 flex items-center gap-2 shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto justify-center"
        >
          <PlusCircle className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300 text-black" />
          <span className="text-black font-bold">Upload Image</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by caption or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-[#2c5234] text-black shadow-md border border-[#1f3b25]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 font-semibold"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="aspect-[4/3] bg-slate-100 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-100 rounded-lg animate-pulse w-3/4" />
                <div className="h-3 bg-slate-50 rounded-lg animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No images found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 mb-6 leading-relaxed">
            {searchQuery || selectedCategory !== "All"
              ? "No media images match your current filter criteria."
              : "Your gallery is empty."}
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-6 py-3 bg-[#2c5234] hover:bg-[#1f3b25] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-black" />
            <span className="font-bold text-black">Upload Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title || "Gallery photo"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        setEditingItem(img);
                        setEditTitle(img.title || "");
                        setEditCategory(img.category || "General");
                      }}
                      className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-lg transition-all shadow-sm cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(img.id)}
                      className="p-2 bg-white/90 hover:bg-white text-rose-600 rounded-lg transition-all shadow-sm cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border backdrop-blur-md ${getCategoryColor(
                    img.category || "General",
                  )}`}
                >
                  {img.category || "General"}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
                  {img.title || "No caption provided"}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(img.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex gap-1 sm:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingItem(img);
                        setEditTitle(img.title || "");
                        setEditCategory(img.category || "General");
                      }}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(img.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== UPLOAD MODAL ===== */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={fetchImages}
        categories={CATEGORIES}
      />

      {/* ===== EDIT MODAL ===== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                  <Edit2 className="w-4 h-4 text-white" />
                </div>
                Edit Image Details
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="aspect-[16/9] rounded-xl overflow-hidden max-h-44 bg-slate-100 shadow-sm">
                <img
                  src={editingItem.url}
                  alt={editingItem.title || "Preview"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Title / Caption
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50 focus:bg-white text-slate-900 font-medium transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50 focus:bg-white text-slate-900 font-semibold transition-all"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2.5 bg-[#2c5234] hover:bg-[#1f3b25] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-900/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      <span className="text-black font-bold">Saving...</span>
                    </>
                  ) : (
                    <span className="text-black font-bold">Save Changes</span>
                  )}
                </button>
              </div>
            </form>
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
                Delete Image?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-[260px] mx-auto">
                This will permanently remove this photo from the gallery. This
                action cannot be undone.
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
