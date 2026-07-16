"use client";

interface DistrictTooltipProps {
  name: string;
  interventionType: string;
  description: string;
  x: number;
  y: number;
  visible: boolean;
}

export function DistrictTooltip({
  name,
  interventionType,
  description,
  x,
  y,
  visible,
}: DistrictTooltipProps) {
  if (!visible) return null;

  const tooltipWidth = 200;
  // Clamp x so tooltip doesn't go off-screen to the right
  const adjustedX = Math.min(x, 780 - tooltipWidth - 8);
  const adjustedY = y - 10;

  return (
    <foreignObject
      x={adjustedX}
      y={adjustedY - 90}
      width={tooltipWidth}
      height={90}
      style={{ overflow: "visible", pointerEvents: "none" }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "8px 12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          border: "1px solid #e5e7eb",
          fontSize: "12px",
          width: `${tooltipWidth}px`,
          pointerEvents: "none",
        }}
      >
        <p style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>
          {name}
        </p>
        <p
          style={{
            color: interventionType === "Intensive" ? "#2E7D32" : "#4caf50",
            fontSize: "11px",
            fontWeight: 600,
            marginBottom: "3px",
          }}
        >
          {interventionType} Intervention
        </p>
        <p style={{ color: "#666", fontSize: "11px", lineHeight: 1.4 }}>
          {description}
        </p>
      </div>
    </foreignObject>
  );
}
