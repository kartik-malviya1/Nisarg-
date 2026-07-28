"use client";

import { useState, useEffect, useCallback } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight, Loader2, ImageOff } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORIES = ["All", "Field Work", "Workshops", "Community", "General"];

const FALLBACK_IMAGES = [
  {
    id: "fb-1",
    src: "/photo1.png",
    caption: "Farmer engagement and training program",
    category: "Field Work",
  },
  {
    id: "fb-2",
    src: "/photo2.png",
    caption: "Soil testing and composition analysis workshop",
    category: "Workshops",
  },
  {
    id: "fb-3",
    src: "/photo3.png",
    caption: "Women empowerment and leadership initiative",
    category: "Community",
  },
  {
    id: "fb-4",
    src: "/photo4.png",
    caption: "Community gathering and local consensus assembly",
    category: "Community",
  },
  {
    id: "fb-5",
    src: "/photo5.png",
    caption: "Regenerative agriculture field demonstration",
    category: "Field Work",
  },
  {
    id: "fb-6",
    src: "https://images.unsplash.com/photo-1488121926898-5ac6f574d96b?w=800&auto=format&fit=crop&q=80",
    caption: "Annual team review and project planning meeting",
    category: "General",
  },
];

interface GalleryItem {
  id: string;
  url: string;
  title: string | null;
  category: string | null;
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dbImages, setDbImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useScrollReveal([loading, activeCategory, dbImages.length]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success && Array.isArray(data.images)) {
          setDbImages(data.images);
        }
      } catch (err) {
        console.error("Failed to load gallery from API:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  // Combine DB images with fallback images if DB is empty
  const displayList = dbImages.length > 0
    ? dbImages.map((img) => ({
        id: img.id,
        src: img.url,
        caption: img.title || "Gallery image",
        category: img.category || "General",
      }))
    : FALLBACK_IMAGES;

  // Filter images based on selected category
  const filteredImages = displayList.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  // Count items per category
  const getCategoryCount = (category: string) => {
    if (category === "All") return displayList.length;
    return displayList.filter((img) => img.category === category).length;
  };

  // Lightbox handlers
  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : (prev as number) - 1
    );
  }, [lightboxIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : (prev as number) + 1
    );
  }, [lightboxIndex, filteredImages.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  // Scroll lock when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <section className="gallery-section" id="gallery" style={{ background: "var(--husk-50, #fcfaf7)", padding: "60px 0 110px" }}>
      <div className="wrap max-w-7xl mx-auto px-4">
        {/* Category Filter Pills */}
        <div className="gallery-categories-container reveal mb-8">
          <div className="gallery-categories-pills flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`category-pill px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#2c5234] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`count-badge px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-emerald-800 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && dbImages.length === 0 && (
          <div className="flex justify-center items-center py-16 text-emerald-800">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2 text-sm font-semibold">Loading gallery...</span>
          </div>
        )}

        {/* Empty Category State */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <ImageOff className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-gray-700">No images found</h4>
            <p className="text-xs text-gray-400">There are no images in the &quot;{activeCategory}&quot; category yet.</p>
          </div>
        )}

        {/* Gallery Cards Grid */}
        <div className="gallery-cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 reveal-stagger">
          {filteredImages.map((img, index) => (
            <div
              key={img.id}
              className="gallery-card-wrapper group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="gallery-card-image-box relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="gallery-card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="gallery-card-overlay absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="zoom-icon-badge bg-white/90 text-[#2c5234] p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="zoom-svg" size={20} />
                  </div>
                </div>
              </div>
              <div className="gallery-card-caption-box p-4 flex flex-col justify-between flex-1">
                <span className="card-category-label text-[10px] font-bold uppercase tracking-wider text-[#2c5234] bg-emerald-50 px-2.5 py-1 rounded-md w-fit mb-2">
                  {img.category}
                </span>
                <p className="card-caption-text text-sm font-semibold text-gray-800 line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="gallery-lightbox-modal fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="lightbox-backdrop fixed inset-0 bg-black/80 backdrop-blur-md" />

          {/* Close button */}
          <button
            className="lightbox-close-btn fixed top-6 right-6 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Left Arrow */}
          <button
            className="lightbox-nav-btn prev-btn fixed left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Centered Image Frame */}
          <div
            className="lightbox-image-container relative z-40 max-w-4xl max-h-[85vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 flex items-center justify-center overflow-hidden max-h-[70vh]">
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].caption}
                className="lightbox-img max-w-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="lightbox-caption-bar bg-stone-900 p-5 text-white border-t border-stone-800">
              <div className="lightbox-caption-header flex justify-between items-center mb-2">
                <span className="lightbox-category-tag text-xs font-bold uppercase tracking-wider bg-emerald-900/60 text-emerald-300 px-3 py-1 rounded-full">
                  {filteredImages[lightboxIndex].category}
                </span>
                <span className="lightbox-counter text-xs text-stone-400 font-mono">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
              <p className="lightbox-caption-text text-sm md:text-base font-medium text-stone-200">
                {filteredImages[lightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="lightbox-nav-btn next-btn fixed right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
