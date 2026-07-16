//@ts-nocheck
"use client";

import { useState } from "react";
import { MP_DISTRICTS, DistrictPath } from "./mpDistrictPaths";

/* ─── missing districts (approximate geometry) ─── */
const MISSING_DISTRICTS: DistrictPath[] = [
  {
    name: "Singrauli",
    d: "M 768,187 L 800,175 L 800,230 L 778,243 L 760,238 L 755,218 Z",
    cx: 778,
    cy: 213,
  },
  {
    name: "Alirajpur",
    d: "M 38,438 L 68,427 L 82,445 L 72,472 L 45,478 L 30,462 Z",
    cx: 58,
    cy: 455,
  },
  {
    name: "Niwari",
    d: "M 451,150 L 472,142 L 487,155 L 480,170 L 458,172 L 445,162 Z",
    cx: 466,
    cy: 158,
  },
];

const ALL_DISTRICTS: DistrictPath[] = [...MP_DISTRICTS, ...MISSING_DISTRICTS];

/* ─── types ─── */
export type InterventionType = "intensive" | "extensive" | "none";

export interface DistrictData {
  intervention: InterventionType;
  description: string;
}

export interface DistrictConfig {
  [key: string]: DistrictData;
}

/* ─── district configuration ─── */
export const DISTRICT_CONFIG: DistrictConfig = {
  Sehore: {
    intervention: "intensive",
    description:
      "Deep-engagement hub: soil health restoration, farmer training & FPO development.",
  },
  Barwani: {
    intervention: "extensive",
    description: "Women enterprise promotion across 16 villages in 4 blocks.",
  },
  Dhar: {
    intervention: "extensive",
    description: "Community outreach and agricultural awareness drives.",
  },
  Jhabua: {
    intervention: "extensive",
    description:
      "Tribal community mobilisation and sustainable livelihood programmes.",
  },
  Alirajpur: {
    intervention: "extensive",
    description: "Forest-fringe community engagement and NRM interventions.",
  },
  Mandsaur: {
    intervention: "extensive",
    description: "Farmer orientation on regenerative agriculture practices.",
  },
  Neemuch: {
    intervention: "extensive",
    description: "Organic farming awareness and soil testing protocol rollout.",
  },
  Ratlam: {
    intervention: "extensive",
    description: "Market linkage and FPO development workshops.",
  },
};

/* ─── color helpers ─── */
const COLORS = {
  intensive: "#4CAF50", // Vibrant grass green
  intensiveHover: "#388E3C",
  intensive_stroke: "#2E7D32",
  extensive: "#BBDEC1",
  extensiveHover: "#93C7A2",
  extensive_stroke: "#4CAF7C",
  inactive: "#E8EDF0",
  inactiveHover: "#D5DDE2",
  inactive_stroke: "#B8C4CB",
  selected: "#FFB300",
};

function getFill(name: string, hovered: boolean, selected: boolean) {
  const c = DISTRICT_CONFIG[name];
  if (selected) return COLORS.selected;
  if (!c) return hovered ? COLORS.inactiveHover : COLORS.inactive;
  if (c.intervention === "intensive")
    return hovered ? COLORS.intensiveHover : COLORS.intensive;
  return hovered ? COLORS.extensiveHover : COLORS.extensive;
}

function getStroke(name: string, selected: boolean) {
  if (selected) return "#E65100";
  const c = DISTRICT_CONFIG[name];
  if (!c) return COLORS.inactive_stroke;
  if (c.intervention === "intensive") return COLORS.intensive_stroke;
  return COLORS.extensive_stroke;
}

/* ─── component ─── */
interface MPMapProps {
  selectedName: string | null;
  onSelect: (name: string, data: DistrictData | null) => void;
}

export function MPMap({ selectedName, onSelect }: MPMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleClick = (d: DistrictPath) => {
    const cfg = DISTRICT_CONFIG[d.name];
    if (!cfg) return;
    const isSame = selectedName === d.name;
    onSelect(isSame ? "" : d.name, isSame ? null : cfg);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
    // convert to viewBox coords
    const scaleX = 800 / rect.width;
    const scaleY = 520 / rect.height;
    setTooltipPos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  };

  const hoveredCfg = hovered ? DISTRICT_CONFIG[hovered] : null;
  const tooltipVisible = !!(hovered && hoveredCfg && tooltipPos);

  const percentX = tooltipPos ? (tooltipPos.x / 800) * 100 : 0;
  const percentY = tooltipPos ? (tooltipPos.y / 520) * 100 : 0;

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <svg
        viewBox="0 0 800 520"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="auto"
        style={{ display: "block" }}
        aria-label="Madhya Pradesh intervention map"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHovered(null);
          setTooltipPos(null);
        }}
      >
        <defs>
          <filter id="mp-shadow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="3"
              floodColor="#00000018"
            />
          </filter>
          <filter id="mp-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Thick outer outline drawn underneath to highlight Madhya Pradesh state boundary */}
        <g style={{ pointerEvents: "none" }}>
          {ALL_DISTRICTS.map((d) => (
            <path
              key={`outline-${d.name}`}
              d={d.d}
              fill="none"
              stroke="#54a633"
              strokeWidth={5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* All district paths */}
        <g filter="url(#mp-shadow)">
          {ALL_DISTRICTS.map((d) => {
            const isHov = hovered === d.name;
            const isSel = selectedName === d.name;
            const cfg = DISTRICT_CONFIG[d.name];
            return (
              <path
                key={d.name}
                d={d.d}
                fill={getFill(d.name, isHov, isSel)}
                stroke={getStroke(d.name, isSel)}
                strokeWidth={isSel ? 2 : isHov ? 1.4 : 0.6}
                strokeLinejoin="round"
                style={{
                  cursor: cfg ? "pointer" : "default",
                  transition: "fill 0.18s ease",
                }}
                onMouseEnter={() => setHovered(d.name)}
                onClick={() => handleClick(d)}
                aria-label={d.name}
                tabIndex={cfg ? 0 : -1}
                role={cfg ? "button" : undefined}
              />
            );
          })}
        </g>

        {/* Labels for all districts */}
        {ALL_DISTRICTS.map((d) => {
          const cfg = DISTRICT_CONFIG[d.name];
          const isSel = selectedName === d.name;

          if (cfg) {
            // Intervention districts (larger, highlighted green or white)
            const isIntensive = cfg.intervention === "intensive";
            const labelY = d.name === "Sehore" ? d.cy + 9 : d.cy + 4;

            return (
              <g key={`lbl-${d.name}`} style={{ pointerEvents: "none" }}>
                <text
                  x={d.cx}
                  y={labelY}
                  textAnchor="middle"
                  fontSize={isIntensive ? "11" : "9"}
                  fontWeight={isIntensive ? "800" : "600"}
                  fill={
                    isIntensive && !isSel
                      ? "#FFFFFF"
                      : isSel
                        ? "#5D4000"
                        : "#1B5E20"
                  }
                  stroke={isIntensive && !isSel ? "#134B19" : "none"}
                  strokeWidth={isIntensive && !isSel ? 0.55 : 0.4}
                  style={{
                    userSelect: "none",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: isIntensive ? "0.3px" : "0",
                  }}
                >
                  {d.name}
                </text>
              </g>
            );
          } else {
            // Other districts (smaller, neutral grey text for context)
            const labelY = d.name === "Bhopal" ? d.cy - 5 : d.cy + 3;

            return (
              <g key={`lbl-${d.name}`} style={{ pointerEvents: "none" }}>
                <text
                  x={d.cx}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="500"
                  fill="#5A6E5A"
                  opacity={0.85}
                  style={{
                    userSelect: "none",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {d.name}
                </text>
              </g>
            );
          }
        })}

        {/* North compass */}
        <g transform="translate(776,26)">
          <circle
            cx={0}
            cy={0}
            r={14}
            fill="white"
            stroke="#E5E7EB"
            strokeWidth={1}
          />
          <polygon points="0,-10 3.5,0 0,-3 -3.5,0" fill="#1A6B2E" />
          <polygon points="0,10 3.5,0 0,3 -3.5,0" fill="#D1D5DB" />
          <text
            x="0"
            y="24"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#374151"
            fontFamily="Inter, sans-serif"
          >
            N
          </text>
        </g>
      </svg>

      {/* HTML-based Tooltip Overlay */}
      {tooltipVisible && tooltipPos && (
        <div
          style={{
            position: "absolute",
            left: `${percentX}%`,
            top: `${percentY}%`,
            transform: `translate(${percentX > 70 ? "-105%" : "15px"}, ${percentY < 15 ? "15px" : "-105%"})`,
            pointerEvents: "none",
            zIndex: 50,
            background: "white",
            border: "1px solid #E2EDE2",
            borderRadius: "10px",
            padding: "10px 14px",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            width: "230px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            transition: "opacity 0.15s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              background:
                hoveredCfg?.intervention === "intensive"
                  ? "#4CAF50"
                  : "#4CAF7C",
              borderRadius: "10px 0 0 10px",
            }}
          />
          <div
            style={{
              fontWeight: 700,
              color: "#111827",
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {hovered}
          </div>
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              color:
                hoveredCfg?.intervention === "intensive"
                  ? "#2E7D32"
                  : "#4CAF7C",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {hoveredCfg?.intervention === "intensive"
              ? "Intensive"
              : "Extensive"}{" "}
            Intervention
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#4B5E4B",
              lineHeight: "1.4",
              fontFamily: "Inter, sans-serif",
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {hoveredCfg?.description}
          </div>
        </div>
      )}

      {/* HTML-based Map Legend Overlay (Desktop only, absolutely positioned inside the map container) */}
      <div
        className="map-legend-overlay"
        style={{
          position: "absolute",
          left: "20px",
          bottom: "600px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          border: "1px solid #E2EDE2",
          borderRadius: "14px",
          padding: "14px 18px",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          pointerEvents: "auto",
          zIndex: 10,
          width: "240px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#1A6B2E",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Map Legend
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3.5px",
                background: "#4CAF50",
                flexShrink: 0,
                marginTop: "2px",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1C2B1C",
                  lineHeight: 1.2,
                }}
              >
                Intensive Intervention
              </div>
              <div style={{ fontSize: "9.5px", color: "#8BA88B" }}>
                Deep, long-term engagement
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3.5px",
                background: "#BBDEC1",
                border: "1px solid #4CAF7C",
                flexShrink: 0,
                marginTop: "2px",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1C2B1C",
                  lineHeight: 1.2,
                }}
              >
                Extensive Intervention
              </div>
              <div style={{ fontSize: "9.5px", color: "#8BA88B" }}>
                Broad-reach programmes
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3.5px",
                background: "#E8EDF0",
                border: "1px solid #B8C4CB",
                flexShrink: 0,
                marginTop: "2px",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1C2B1C",
                  lineHeight: 1.2,
                }}
              >
                Other Districts
              </div>
              <div style={{ fontSize: "9.5px", color: "#8BA88B" }}>
                No current intervention
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
