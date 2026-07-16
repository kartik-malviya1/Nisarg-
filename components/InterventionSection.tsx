//@ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MPMap, DistrictData, DISTRICT_CONFIG } from "./MPMap";

/* ─── constants ─── */
const INTENSIVE = ["Sehore"];
const EXTENSIVE = [
  "Barwani",
  "Dhar",
  "Jhabua",
  "Alirajpur",
  "Mandsaur",
  "Neemuch",
  "Ratlam",
];

const STATS = [
  { value: "8", label: "Districts", icon: "📍" },
  { value: "100+", label: "Villages", icon: "🏘" },
  { value: "800+", label: "Farmers", icon: "🌾" },
];

/* ─── fade-up variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── component ─── */
export function InterventionSection() {
  const [selected, setSelected] = useState<{
    name: string;
    data: DistrictData;
  } | null>(null);

  const handleSelect = (name: string, data: DistrictData | null) => {
    setSelected(name && data ? { name, data } : null);
  };

  return (
    <section className="intervention-section">
      {/* ── decorative blobs ── */}
      <div aria-hidden className="intervention-blobs">
        <div className="blob blob-tl" />
        <div className="blob blob-br" />
      </div>

      <div className="intervention-container">
        {/* ══ HEADER ══ */}
        <motion.div
          className="intervention-header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <span className="intervention-eyebrow">Where We Work</span>
          <h2 className="intervention-title">Intervention Area</h2>
          <p className="intervention-desc">
            NISARG Foundation works across <strong>Madhya Pradesh</strong>{" "}
            through two complementary models — intensive deep-engagement in our
            home district, and broad-reach programmes across seven more
            districts.
          </p>
        </motion.div>

        {/* ══ BODY: full-width stacked layout ══ */}
        <div className="intervention-body">
          {/* Top row with stats and districts list side-by-side on desktop */}
          <div className="intervention-top-row">
            {/* Stats row */}
            <motion.div
              className="int-stats"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              {STATS.map((s) => (
                <div key={s.label} className="int-stat">
                  <span className="int-stat-emoji">{s.icon}</span>
                  <span className="int-stat-value">{s.value}</span>
                  <span className="int-stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Mobile-only Legend (hidden on desktop, stacked below stats on mobile) */}
            <motion.div
              className="int-legend mobile-only-legend"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <p className="int-legend-heading">Map Legend</p>
              <div className="int-legend-items">
                <div className="int-legend-row">
                  <span
                    className="int-legend-swatch"
                    style={{ background: "#4CAF50" }}
                  />
                  <div>
                    <p className="int-legend-name">Intensive Intervention</p>
                    <p className="int-legend-hint">
                      Deep, long-term engagement
                    </p>
                  </div>
                </div>
                <div className="int-legend-row">
                  <span
                    className="int-legend-swatch"
                    style={{
                      background: "#BBDEC1",
                      border: "1.5px solid #4CAF7C",
                    }}
                  />
                  <div>
                    <p className="int-legend-name">Extensive Intervention</p>
                    <p className="int-legend-hint">Broad-reach programmes</p>
                  </div>
                </div>
                <div className="int-legend-row">
                  <span
                    className="int-legend-swatch"
                    style={{
                      background: "#E8EDF0",
                      border: "1.5px solid #B8C4CB",
                    }}
                  />
                  <div>
                    <p className="int-legend-name">Other Districts</p>
                    <p className="int-legend-hint">No current intervention</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* District list pills */}
            <motion.div
              className="int-districts"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              {/* Intensive */}
              <div className="int-district-group">
                <div className="int-district-group-header">
                  <span
                    className="int-swatch-dot"
                    style={{ background: "#4CAF50" }}
                  />
                  <span className="int-group-title">Intensive Area</span>
                </div>
                {INTENSIVE.map((d) => (
                  <button
                    key={d}
                    className={`int-district-pill int-pill-intensive ${selected?.name === d ? "active" : ""}`}
                    onClick={() =>
                      handleSelect(
                        d,
                        selected?.name === d ? null : DISTRICT_CONFIG[d],
                      )
                    }
                  >
                    <svg
                      width="10"
                      height="13"
                      viewBox="0 0 10 13"
                      fill="currentColor"
                    >
                      <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 8 5 8s5-4.25 5-8c0-2.76-2.24-5-5-5zm0 6.5C4.17 6.5 3.5 5.83 3.5 5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                    {d}
                  </button>
                ))}
              </div>

              {/* Extensive */}
              <div className="int-district-group">
                <div className="int-district-group-header">
                  <span
                    className="int-swatch-dot"
                    style={{ background: "#4CAF7C" }}
                  />
                  <span className="int-group-title">Extensive Area</span>
                </div>
                <div className="int-pills-grid">
                  {EXTENSIVE.map((d) => (
                    <button
                      key={d}
                      className={`int-district-pill int-pill-extensive ${selected?.name === d ? "active" : ""}`}
                      onClick={() =>
                        handleSelect(
                          d,
                          selected?.name === d ? null : DISTRICT_CONFIG[d],
                        )
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT PANEL: Map ── */}
          <motion.div
            className="intervention-right"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="int-map-card">
              {/* Map header bar */}
              <div className="int-map-header">
                <div className="int-map-title-group">
                  <span className="int-map-badge">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </svg>
                    Madhya Pradesh
                  </span>
                </div>
                <span className="int-map-hint">
                  Hover to explore · Click to select
                </span>
              </div>

              {/* SVG Map */}
              <div className="int-map-svg-wrapper">
                <MPMap
                  selectedName={selected?.name ?? null}
                  onSelect={handleSelect}
                />
              </div>

              {/* District info panel */}
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.name}
                    className="int-info-card"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className="int-info-accent"
                      style={{
                        background:
                          selected.data.intervention === "intensive"
                            ? "linear-gradient(90deg, #1A6B2E, #2E9E4A)"
                            : "linear-gradient(90deg, #4CAF7C, #6DD99A)",
                      }}
                    />
                    <div className="int-info-body">
                      <div>
                        <p className="int-info-type">
                          {selected.data.intervention === "intensive"
                            ? "Intensive Intervention"
                            : "Extensive Intervention"}
                        </p>
                        <h3 className="int-info-name">{selected.name}</h3>
                        <p className="int-info-desc">
                          {selected.data.description}
                        </p>
                      </div>
                      <button
                        className="int-info-close"
                        onClick={() => setSelected(null)}
                        aria-label="Close"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hint"
                    className="int-map-empty-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
                    </svg>
                    Click a highlighted district for details
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
