"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { uploadImageWithProgress } from "@/lib/cloudinary";
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Plus,
} from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: string[];
}

interface UploadQueueItem {
  id: string;
  file: File;
  previewUrl: string;
  title: string;
  category: string;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  errorMsg?: string;
}

export default function UploadModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
}: UploadModalProps) {
  const [queue, setQueue] = useState<UploadQueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFiles = (files: FileList | File[]) => {
    const newItems: UploadQueueItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      // Extract filename without extension for default title
      const rawName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      const cleanName = rawName.replace(/[-_]/g, " ");

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        title: cleanName,
        category: categories.find((c) => c !== "All") || "Field Work",
        progress: 0,
        status: "idle",
      });
    }

    setQueue((prev) => [...prev, ...newItems]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveItem = (id: string) => {
    setQueue((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const handleUpdateItem = (
    id: string,
    field: "title" | "category",
    value: string
  ) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleReset = () => {
    queue.forEach((x) => URL.revokeObjectURL(x.previewUrl));
    setQueue([]);
    setIsUploading(false);
  };

  const executeUploads = async () => {
    if (queue.length === 0) return;
    setIsUploading(true);

    const uploadPromises = queue.map(async (item) => {
      if (item.status === "success") return;

      setQueue((prev) =>
        prev.map((x) => (x.id === item.id ? { ...x, status: "uploading" } : x))
      );

      try {
        // 1. Upload to Cloudinary with real-time progress
        const cloudinaryRes = await uploadImageWithProgress(
          item.file,
          (progress) => {
            setQueue((prev) =>
              prev.map((x) => (x.id === item.id ? { ...x, progress } : x))
            );
          }
        );

        // 2. Save metadata in Prisma DB via API
        const dbRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: item.title || "Untitled Photo",
            category: item.category || "General",
            url: cloudinaryRes.secure_url,
          }),
        });

        if (!dbRes.ok) {
          const errData = await dbRes.json();
          throw new Error(errData.error || "Failed to save to database");
        }

        setQueue((prev) =>
          prev.map((x) =>
            x.id === item.id
              ? { ...x, status: "success", progress: 100 }
              : x
          )
        );
      } catch (err: any) {
        console.error("Upload error for file:", item.file.name, err);
        setQueue((prev) =>
          prev.map((x) =>
            x.id === item.id
              ? {
                  ...x,
                  status: "error",
                  errorMsg: err.message || "Upload failed",
                }
              : x
          )
        );
      }
    });

    await Promise.all(uploadPromises);
    setIsUploading(false);

    const hasFailures = queue.some((x) => x.status === "error");
    if (!hasFailures) {
      setTimeout(() => {
        handleReset();
        onSuccess();
        onClose();
      }, 800);
    } else {
      onSuccess(); // refresh gallery for successfully uploaded items
    }
  };

  const validCategories = categories.filter((c) => c !== "All");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={() => {
        if (!isUploading) {
          handleReset();
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2c5234] flex items-center justify-center shadow-md shadow-emerald-900/20">
              <Upload className="w-5 h-5 text-black font-bold" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Upload Gallery Photos
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Upload multiple images directly to Cloudinary & NISARG Gallery
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (!isUploading) {
                handleReset();
                onClose();
              }
            }}
            disabled={isUploading}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* File input hidden */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Empty state Drop Zone */}
          {queue.length === 0 && (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center p-10 sm:p-14 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? "border-[#2c5234] bg-emerald-50/60 scale-[0.99]"
                  : "border-slate-300 hover:border-[#2c5234] bg-slate-50/50 hover:bg-emerald-50/20"
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 text-[#2c5234] flex items-center justify-center mb-4 border border-emerald-200/60 shadow-sm">
                <Upload className="h-8 w-8" />
              </div>
              <h4 className="font-extrabold text-base text-slate-800">
                Drag & drop multiple images here
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 max-w-sm leading-relaxed">
                Select photos from your device. Supports JPG, PNG, WEBP.
                Multiple selection supported.
              </p>
              <button
                type="button"
                className="mt-5 bg-[#2c5234] hover:bg-[#1f3b25] text-black font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-black font-bold" />
                <span className="text-black font-bold">Choose Image Files</span>
              </button>
            </div>
          )}

          {/* Queue List Cards */}
          {queue.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Selected Photos ({queue.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-xs font-bold text-[#2c5234] hover:text-[#1f3b25] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add More</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isUploading}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3.5 max-h-[45vh] overflow-y-auto pr-1">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-slate-200 rounded-2xl bg-white shadow-sm hover:border-slate-300 transition-all relative overflow-hidden"
                  >
                    {/* Thumbnail preview */}
                    <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                      <img
                        src={item.previewUrl}
                        alt="Upload preview"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Metadata form fields */}
                    <div className="flex-1 min-w-0 grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                          Photo Title / Caption
                        </label>
                        <input
                          type="text"
                          placeholder="Image title"
                          value={item.title}
                          onChange={(e) =>
                            handleUpdateItem(item.id, "title", e.target.value)
                          }
                          disabled={isUploading}
                          className="w-full h-9 text-xs px-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2c5234] font-medium text-slate-900 bg-slate-50 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                          Category
                        </label>
                        <select
                          value={item.category}
                          onChange={(e) =>
                            handleUpdateItem(item.id, "category", e.target.value)
                          }
                          disabled={isUploading}
                          className="w-full h-9 text-xs px-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2c5234] font-semibold text-slate-900 bg-slate-50 focus:bg-white transition-all cursor-pointer"
                        >
                          {validCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Progress Bar & Status Alerts */}
                      <div className="sm:col-span-2 pt-1">
                        {item.status === "uploading" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold text-[#2c5234]">
                              <span>Uploading to Cloudinary...</span>
                              <span>{item.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-[#2c5234] rounded-full transition-all duration-150"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {item.status === "success" && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200/60 w-fit">
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span>Uploaded & Saved successfully!</span>
                          </div>
                        )}

                        {item.status === "error" && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 w-fit">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">
                              {item.errorMsg || "Upload error."}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Item button */}
                    <div className="shrink-0 flex items-center justify-center pl-1">
                      <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                        title="Remove image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/80 flex justify-between items-center gap-3">
          <button
            type="button"
            disabled={isUploading}
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="px-5 py-2.5 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          {queue.length > 0 && (
            <button
              type="button"
              onClick={executeUploads}
              disabled={isUploading}
              className="bg-[#2c5234] hover:bg-[#1f3b25] text-black font-bold text-xs rounded-xl px-6 py-2.5 flex items-center gap-2 shadow-md shadow-emerald-900/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span className="text-black font-bold">
                    Uploading ({queue.filter((q) => q.status === "success").length}/{queue.length})
                  </span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 text-black font-bold" />
                  <span className="text-black font-bold">
                    Start Uploading ({queue.length} {queue.length === 1 ? "Image" : "Images"})
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
