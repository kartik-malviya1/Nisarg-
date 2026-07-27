"use client";

import { useState, useEffect, useCallback } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORIES = ["All", "Field Work", "Workshops", "Community", "General"];

const IMAGES = [
  {
    id: 1,
    src: "/photo1.png",
    caption: "Farmer engagement and training program",
    category: "Field Work",
  },
  {
    id: 2,
    src: "/photo2.png",
    caption: "Soil testing and composition analysis workshop",
    category: "Workshops",
  },
  {
    id: 3,
    src: "/photo3.png",
    caption: "Women empowerment and leadership initiative",
    category: "Community",
  },
  {
    id: 4,
    src: "/photo4.png",
    caption: "Community gathering and local consensus assembly",
    category: "Community",
  },
  {
    id: 5,
    src: "/photo5.png",
    caption: "Regenerative agriculture field demonstration",
    category: "Field Work",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1488121926898-5ac6f574d96b?w=800&auto=format&fit=crop&q=80",
    caption: "Annual team review and project planning meeting",
    category: "General",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
    caption: "Regenerative sowing field trial in rural Sehore",
    category: "Field Work",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
    caption: "Bio-input preparation workshop and organic composting instruction",
    category: "Workshops",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&auto=format&fit=crop&q=80",
    caption: "Self-help group monthly assembly and financial empowerment review",
    category: "Community",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    caption: "Watershed monitoring and local community pond restoration",
    category: "Field Work",
  },
];

export function Gallery() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on selected category
  const filteredImages = IMAGES.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  // Count items per category
  const getCategoryCount = (category: string) => {
    if (category === "All") return IMAGES.length;
    return IMAGES.filter((img) => img.category === category).length;
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
    <section className="gallery-section" id="gallery" style={{ background: "var(--husk-50)", padding: "60px 0 110px" }}>
      <div className="wrap">
        {/* Category Filter Pills */}
        <div className="gallery-categories-container reveal">
          <div className="gallery-categories-pills">
            {CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null); // Reset lightbox when filter changes
                  }}
                  className={`category-pill ${isActive ? "active" : ""}`}
                >
                  <span>{cat}</span>
                  <span className="count-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="gallery-cards-grid reveal-stagger">
          {filteredImages.map((img, index) => (
            <div
              key={img.id}
              className="gallery-card-wrapper"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="gallery-card-image-box">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="gallery-card-img"
                />
                <div className="gallery-card-overlay">
                  <div className="zoom-icon-badge">
                    <ZoomIn className="zoom-svg" size={20} />
                  </div>
                </div>
              </div>
              <div className="gallery-card-caption-box">
                <span className="card-category-label">{img.category}</span>
                <p className="card-caption-text">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="gallery-lightbox-modal" onClick={handleClose}>
          {/* Backdrop Blur overlay */}
          <div className="lightbox-backdrop" />

          {/* Close button */}
          <button
            className="lightbox-close-btn"
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
            className="lightbox-nav-btn prev-btn"
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
            className="lightbox-image-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].caption}
              className="lightbox-img"
            />
            <div className="lightbox-caption-bar">
              <div className="lightbox-caption-header">
                <span className="lightbox-category-tag">
                  {filteredImages[lightboxIndex].category}
                </span>
                <span className="lightbox-counter">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
              <p className="lightbox-caption-text">
                {filteredImages[lightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="lightbox-nav-btn next-btn"
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
