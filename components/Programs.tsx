"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProgramItem {
  id: string;
  category: "agri" | "women" | "gov";
  tag: string;
  title: string;
  description: string;
  location: string;
  image: string;
}

export function Programs() {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("all");

  const programs: ProgramItem[] = [
    {
      id: "1",
      category: "agri",
      tag: "OCT 2025 – JAN 2026",
      title: "Farmer Orientation on Regenerative Agriculture",
      description:
        "With tanX Innovations, 800 farmers oriented on regenerative vs. conventional, organic and natural farming, soil health and bio-inputs.",
      location:
        "8 districts · Bhopal, Sehore, Vidisha, Raisen, Ujjain, Dewas, Neemuch, Ratlam",
      image: "/photo1.png",
    },
    {
      id: "2",
      category: "women",
      tag: "JAN – MAR 2026",
      title: "Women Enterprise Promotion, Barwani",
      description:
        "Assessed 16 villages across 4 blocks for gaps in packaging, branding and market access, then ran orientation on market-driven enterprise growth.",
      location: "Barwani district, Madhya Pradesh",
      image: "/photo3.png",
    },
    {
      id: "3",
      category: "agri",
      tag: "MAY 2025",
      title: "Soil Testing Protocol Orientation",
      description:
        "Field-level training on sample collection and reading soil test reports, coordinated with the Agriculture Department.",
      location: "45 soil samples · Sehore district",
      image: "/photo2.png",
    },
    // {
    //   id: "4",
    //   category: "agri",
    //   tag: "TOT PROGRAMME",
    //   title:
    //     "Training of Trainers — Regenerative Agriculture & FPO Development",
    //   description:
    //     "A three-day Master Trainer programme with tanX Innovations and Solidaridad, building a network of resource persons.",
    //   location: "30 participants · 4 states · Bhopal",
    //   image: "/photo4.png",
    // },
    {
      id: "5",
      category: "gov",
      tag: "WORLD WATER DAY",
      title: "Collective Commitment for a Sustainable Future",
      description:
        "Community pledges on rainwater harvesting, water recharge and preventing wastage, paired with plantation activity.",
      location: "Sehore district, Madhya Pradesh",
      image: "/photo5.png",
    },
    {
      id: "6",
      category: "gov",
      tag: "SEP 2025",
      title: "Capacity Building on NPO Governance",
      description:
        "Participation in FMSF Delhi&apos;s workshop on financial management and institutional accountability for non-profits.",
      location: "Bhopal, Madhya Pradesh",
      image: "/capacity.png",
    },
  ];

  const displayedPrograms =
    activeFilter === "all"
      ? programs
      : programs.filter((p) => p.category === activeFilter);

  return (
    <section className="programs" id="programs">
      <div className="wrap">
        <div className="filter-row reveal">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
            data-filter="all"
          >
            All programmes
          </button>
          <button
            className={`filter-btn ${activeFilter === "agri" ? "active" : ""}`}
            onClick={() => setActiveFilter("agri")}
            data-filter="agri"
          >
            Agriculture &amp; Soil
          </button>
          <button
            className={`filter-btn ${activeFilter === "women" ? "active" : ""}`}
            onClick={() => setActiveFilter("women")}
            data-filter="women"
          >
            Women &amp; Community
          </button>
          <button
            className={`filter-btn ${activeFilter === "gov" ? "active" : ""}`}
            onClick={() => setActiveFilter("gov")}
            data-filter="gov"
          >
            Governance &amp; Awareness
          </button>
        </div>

        <div className="program-grid reveal-stagger">
          {displayedPrograms.map((program) => (
            <div
              key={program.id}
              className={`program-card cat-${program.category}`}
              data-cat={program.category}
            >
              <div className="program-img-wrapper">
                <img
                  src={program.image}
                  alt={program.title}
                  className="program-img"
                  loading="lazy"
                />
              </div>
              <div className="program-card-content">
                <span className="tag">{program.tag}</span>
                <h4>{program.title}</h4>
                <p>{program.description}</p>
                <div className="loc">
                  <svg
                    className="loc-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: "14px",
                      height: "14px",
                      flexShrink: 0,
                      opacity: 0.8,
                      color: "var(--primary-green)",
                    }}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{program.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
