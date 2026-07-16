"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Gallery() {
  useScrollReveal();

  const images = [
    {
      id: 1,
      src: "/photo1.png",
      caption: "Farmer engagement program",
      span: false,
    },
    {
      id: 2,
      src: "/photo2.png",
      caption: "Soil testing workshop",
      span: false,
    },
    {
      id: 3,
      src: "/photo3.png",
      caption: "Women empowerment initiative",
      span: true,
    },
    {
      id: 4,
      src: "/photo4.png",
      caption: "Community gathering",
      span: false,
    },
    {
      id: 5,
      src: "/photo5.png",
      caption: "Field demonstration",
      span: false,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1488121926898-5ac6f574d96b?w=600&h=400&fit=crop",
      caption: "Team meeting",
      span: false,
    },
  ];

  return (
    <section className="gallery-bg" id="gallery">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Photo gallery</div>
          <h2>Field work & community moments.</h2>
          <p>Highlights from our intervention areas and programmes.</p>
        </div>

        <div className="gallery-grid">
          {images.map((img) => (
            <div key={img.id} className={`g-item ${img.span ? "g-span2" : ""}`}>
              <img src={img.src} alt={img.caption} />
              <div className="cap">{img.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
