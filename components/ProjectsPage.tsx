"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const projects = [
  {
    id: "1",
    category: "agri",
    tag: "OCT 2025 – JAN 2026",
    title: "Farmer Orientation on Regenerative Agriculture in Madhya Pradesh",
    challenge:
      "Farmers in 8 districts relied heavily on chemical inputs, leading to soil degradation and rising costs.",
    solution:
      "Partnered with tanX Innovations to conduct field-level orientations on regenerative vs. conventional farming, bio-inputs, and soil health.",
    activities: [
      "800 farmers oriented",
      "Regenerative farming demos",
      "Bio-input preparation workshops",
      "Soil biology explained",
    ],
    location:
      "8 Districts · Bhopal, Sehore, Vidisha, Raisen, Ujjain, Dewas, Neemuch, Ratlam",
    outcomes:
      "800 farmers sensitised; follow-up soil testing adopted by 45+ farmers",
    image: "/farmer-orientation.png",
    color: "var(--leaf-700)",
  },
  {
    id: "2",
    category: "women",
    tag: "JAN – MAR 2026",
    title:
      "Support Women Enterprises in Promotion and Marketing — Barwani District",
    challenge:
      "Women SHGs in Barwani lacked market access, packaging knowledge, and branding capabilities.",
    solution:
      "Gap assessment across 16 villages in 4 blocks, followed by enterprise orientation sessions and market linkage camps.",
    activities: [
      "Village assessment — 16 villages",
      "Packaging & branding training",
      "Market mela facilitation",
      "Buyer linkages established",
    ],
    location: "Barwani District, Madhya Pradesh",
    outcomes: "80+ women connected to buyers; SHG income improved 40–60%",
    image: "/women2.png",
    color: "var(--turmeric-600)",
  },
  {
    id: "3",
    category: "agri",
    tag: "MAY 2025",
    title:
      "Orientation of Soil Testing Protocol and Use of Soil Testing Reports",
    challenge:
      "Farmers lacked knowledge of how to collect samples and interpret soil test reports effectively.",
    solution:
      "Field-level training with Agriculture Department, covering sampling methodology and report interpretation.",
    activities: [
      "Sample collection training",
      "45 soil samples collected",
      "Report interpretation sessions",
      "District Agri Dept coordination",
    ],
    location: "45 Soil Samples · Sehore District",
    outcomes:
      "Accurate soil data for 45 farms; targeted fertiliser reduction planned",
    image: "/soil-testing.png",
    color: "var(--leaf-700)",
  },
  // {
  //   id: "4",
  //   category: "agri",
  //   tag: "TOT PROGRAMME",
  //   title: "Training of Trainers — Regenerative Agriculture & FPO Development",
  //   challenge:
  //     "Scale required a network of field-level trainers who could independently replicate orientation programmes.",
  //   solution:
  //     "Three-day Master Trainer programme with tanX Innovations and Solidaridad, covering regenerative agriculture and FPO governance.",
  //   activities: [
  //     "3-day intensive training",
  //     "30 participants trained",
  //     "4 states represented",
  //     "FPO management module",
  //   ],
  //   location: "30 Participants · 4 States · Bhopal",
  //   outcomes:
  //     "30 certified trainers now active across MP, Maharashtra, Rajasthan, and Gujarat",
  //   image: "/TOT.png",
  //   color: "var(--leaf-700)",
  // },
  {
    id: "5",
    category: "env",
    tag: "WORLD WATER DAY 2026",
    title: "World Water Day – Collective Commitment for a Sustainable Future",
    challenge:
      "Declining groundwater levels and water wastage in irrigated areas were threatening agricultural sustainability.",
    solution:
      "Community pledges on rainwater harvesting, water-recharge practices, and plant-a-tree campaigns.",
    activities: [
      "Community water pledges",
      "Plantation activity",
      "Rainwater harvesting demos",
      "Groundwater recharge awareness",
    ],
    location: "Sehore District, Madhya Pradesh",
    outcomes:
      "200+ community members pledged; 150 saplings planted on World Water Day",
    image: "/waterday.png",
    color: "#2d6b1f",
  },
  {
    id: "6",
    category: "env",
    tag: "EARTH DAY 2026",
    title: "Tree Plantation Drive — Earth Day Campaign",
    challenge:
      "Loss of tree cover in village common lands reduced biodiversity, shade, and agroforestry potential.",
    solution:
      "Coordinated plantation drive with students, farmers, and Panchayat members, focusing on native and fruit-bearing species.",
    activities: [
      "500+ saplings planted",
      "Native species prioritised",
      "Farmer volunteer mobilisation",
      "Panchayat partnership",
    ],
    location: "5 Villages · Sehore District",
    outcomes: "500 saplings; 5 village greening pacts signed for annual drives",
    image: "/earthday1.png",
    color: "#2d6b1f",
  },
  {
    id: "7",
    category: "gov",
    tag: "SEP 2025",
    title: "Capacity Building on NPO Governance and Financial Management",
    challenge:
      "Non-profits in rural areas lacked training on financial management, accountability, and institutional compliance.",
    solution:
      "Participation in FMSF Delhi's workshop on financial management and governance for civil society organisations.",
    activities: [
      "FMSF workshop participation",
      "Financial mgmt training",
      "Institutional accountability module",
      "CSO peer learning",
    ],
    location: "Bhopal, Madhya Pradesh",
    outcomes:
      "Improved internal governance systems adopted; financial reporting strengthened",
    image: "/capacity.png",
    color: "var(--water-700)",
  },
  {
    id: "8",
    category: "agri",
    tag: "ORGANIC FARMING",
    title: "Organic Farming Workshops — Rabi Season",
    challenge:
      "Farmers transitioning to organic faced knowledge gaps on crop planning, pest management, and certification.",
    solution:
      "Series of half-day workshops covering organic inputs, pest-management, and steps toward organic certification.",
    activities: [
      "Organic input demos",
      "Pest management using botanicals",
      "Crop planning for organics",
      "Certification pathway explained",
    ],
    location: "Sehore & Vidisha Districts",
    outcomes:
      "120 farmers attended; 18 farmers enrolled in organic certification process",
    image: "/photo2.png",
    color: "var(--leaf-700)",
  },
];

const categoryLabels: Record<string, string> = {
  all: "All Projects",
  agri: "Agriculture & Soil",
  women: "Women & Community",
  env: "Environment",
  gov: "Governance",
};

import { useState } from "react";

export function Projects() {
  useScrollReveal();
  const [active, setActive] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const displayed =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="projects-section" id="projects">
      <div className="wrap">
        <div className="filter-row reveal">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${active === key ? "active" : ""}`}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="proj-grid reveal-stagger">
          {displayed.map((proj) => (
            <div key={proj.id} className="proj-card">
              <div className="proj-img-wrap">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="proj-img"
                  loading="lazy"
                />
                <span className="proj-tag" style={{ background: proj.color }}>
                  {proj.tag}
                </span>
              </div>
              <div className="proj-body">
                <h3>{proj.title}</h3>
                <div className="proj-loc">📍 {proj.location}</div>

                <div
                  className={`proj-details ${expanded === proj.id ? "open" : ""}`}
                >
                  <div className="proj-section">
                    <strong>Challenge</strong>
                    <p>{proj.challenge}</p>
                  </div>
                  <div className="proj-section">
                    <strong>Solution</strong>
                    <p>{proj.solution}</p>
                  </div>
                  <div className="proj-section">
                    <strong>Key Activities</strong>
                    <ul className="proj-activities">
                      {proj.activities.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="proj-outcome">
                    <span>✓ Outcomes:</span> {proj.outcomes}
                  </div>
                </div>

                <button
                  className="proj-toggle"
                  style={{ color: proj.color }}
                  onClick={() =>
                    setExpanded(expanded === proj.id ? null : proj.id)
                  }
                >
                  {expanded === proj.id ? "Show less ↑" : "Read full story ↓"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
