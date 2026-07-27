"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

const ways = [
  {
    eyebrow: "Donate",
    icon: "💚",
    title: "Fund a programme",
    desc: "Support soil testing, farmer orientation, women's enterprise work, or tree plantation drives. 80G registered — your donation qualifies for 50% tax deduction.",
    points: [
      "Transparent fund utilisation",
      "80G tax benefit",
      "Quarterly impact reports",
      "Name acknowledgement (optional)",
    ],
    cta: "Donate Now",
    href: "/contact",
    color: "var(--leaf-700)",
    bg: "rgba(61,133,26,0.06)",
  },
  {
    eyebrow: "Volunteer",
    icon: "🤝",
    title: "Give your time",
    desc: "Field visits, training support, digital content creation, documentation, or remote research — we work with volunteers across diverse skill sets.",
    points: [
      "Field work exposure",
      "Certificate of volunteering",
      "Learning & development",
      "Flexible time commitment",
    ],
    cta: "Apply to Volunteer",
    href: "/contact",
    color: "var(--water-600)",
    bg: "rgba(45,15,128,0.06)",
  },
  {
    eyebrow: "CSR Partnership",
    icon: "🏢",
    title: "CSR & Institutional Partners",
    desc: "Government bodies, NGOs, and corporate CSR teams — let's design a programme that fits your mandate. We are Section-8 registered and CSR-eligible.",
    points: [
      "Custom programme design",
      "Schedule VII CSR eligible",
      "Impact measurement & reporting",
      "Co-branding opportunities",
    ],
    cta: "Explore Partnership",
    href: "/partners",
    color: "#2d6b1f",
    bg: "rgba(45,107,31,0.06)",
  },
  {
    eyebrow: "Internship",
    icon: "🎓",
    title: "Intern with NISARG",
    desc: "Hands-on internships in rural development, sustainable agriculture, programme management, communications, and data analysis.",
    points: [
      "3–6 month programmes",
      "Field immersion",
      "Mentorship from practitioners",
      "Certificate & letter of recommendation",
    ],
    cta: "Apply for Internship",
    href: "/contact",
    color: "var(--turmeric-600)",
    bg: "rgba(216,155,46,0.07)",
  },
  {
    eyebrow: "Careers",
    icon: "💼",
    title: "Join the NISARG team",
    desc: "We are always looking for passionate individuals with backgrounds in agriculture, community development, research, and social entrepreneurship.",
    points: [
      "Full-time & contract roles",
      "Inclusive work culture",
      "Field + office balance",
      "Meaningful impact work",
    ],
    cta: "View Open Positions",
    href: "/contact",
    color: "var(--primary-blue)",
    bg: "rgba(32,5,99,0.05)",
  },
  {
    eyebrow: "Donate in Kind",
    icon: "📦",
    title: "In-kind support",
    desc: "Soil testing equipment, seeds, agricultural tools, printed materials, or digital infrastructure — in-kind donations directly support field activities.",
    points: [
      "Equipment & tools",
      "Seeds & planting material",
      "Digital & print resources",
      "Transport support",
    ],
    cta: "Discuss In-Kind Support",
    href: "/contact",
    color: "#2d6b1f",
    bg: "rgba(45,107,31,0.06)",
  },
];

export function GetInvolved() {
  useScrollReveal();
  return (
    <section className="get-involved-section" id="get-involved">
      <div className="wrap">
        <div className="gi-grid reveal-stagger">
          {ways.map((way) => (
            <div
              key={way.eyebrow}
              className="gi-card"
              style={
                {
                  "--gi-color": way.color,
                  "--gi-bg": way.bg,
                } as React.CSSProperties
              }
            >
              <div className="gi-icon">{way.icon}</div>
              <div className="eyebrow" style={{ color: way.color }}>
                {way.eyebrow}
              </div>
              <h3>{way.title}</h3>
              <p>{way.desc}</p>
              <ul className="gi-points">
                {way.points.map((pt, i) => (
                  <li key={i}>
                    <span style={{ color: way.color }}>✓</span> {pt}
                  </li>
                ))}
              </ul>
              <Link
                href={way.href}
                className="gi-btn"
                style={{ background: way.color }}
              >
                {way.cta} →
              </Link>
            </div>
          ))}
        </div>

        <div className="gi-note reveal">
          <div className="gi-note-inner">
            <div className="eyebrow" style={{ color: "var(--leaf-300)" }}>
              Why it matters
            </div>
            <h2>Every rupee, every hour counts.</h2>
            <p>
              NISARG Foundation is a lean, field-first organisation. Your time
              or contribution goes directly into community programmes — not
              overheads. We publish full fund utilisation reports annually.
            </p>
            <div className="gi-trust-badges">
              <span>✓ 12A Registered</span>
              <span>✓ 80G Certified</span>
              <span>✓ Section-8 Non-Profit</span>
              <span>✓ Annual Audit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
