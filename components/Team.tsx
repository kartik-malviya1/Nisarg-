"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  const leadersData = [
    {
      id: 1,
      name: "Jeet Parmar",
      role: "Chief Executive Officer & Director",
      background: "#54a633",
      photo: "/jeet-parmar.png",
      bio: "Development professional with 18+ years of experience in natural resource management, sustainable agriculture, WASH, and rural livelihoods. Specializes in participatory planning, capacity-building for CSOs, Gram Panchayats, and FPOs. Previously led climate-resilient agriculture initiatives and women-led programs.",
    },
    {
      id: 2,
      name: "Dr. Vishal Nayak",
      role: "Director",
      background: "#200563",
      photo: "/dr-vishal.png",
      bio: "Results-driven development specialist with 20+ years in technical advisory, program implementation, and rigorous MEL frameworks. PhD in Sociology focused on vulnerable communities. Spearheaded nationwide technical assistance and quality assurance systems. Led livelihood portfolios for major international development organizations.",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Jyoti Mewada",
      role: "Consultant",
      qualification: "MBA, B.Sc.",
      experience: "10 years in NRM and Health Sector",
    },
    {
      id: 2,
      name: "Indrapal Mewada",
      role: "Consultant",
      qualification: "M.Sc. (Agriculture)",
      experience: "9 years in agriculture and community development",
    },
    {
      id: 3,
      name: "Deepak Malviya",
      role: "Consultant",
      qualification: "M.Sc. (Agriculture)",
      experience: "5 years in agriculture and FPOs",
    },
    {
      id: 4,
      name: "Dharam Narvariya",
      role: "Consultant",
      qualification: "BA",
      experience: "14 years in social development and agriculture",
    },
    {
      id: 5,
      name: "Shilpa Thakur",
      role: "Community Mobiliser",
      qualification: "M.A. (Sociology)",
      experience: "Field Team - 2024",
    },
    {
      id: 6,
      name: "Sunita Solanki",
      role: "Community Mobiliser",
      qualification: "M.A. (Sociology)",
      experience: "Field Team - 2024",
    },
  ];

  useScrollReveal(containerRef);

  return (
    <section className="team-section" ref={containerRef} id="team">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head reveal">
          <div className="eyebrow">Our People</div>
          <h2>Dedicated leaders building a sustainable future.</h2>
        </div>

        {/* Leadership Section */}
        <div className="leaders-container">
          <div className="leaders-grid">
            {leadersData.map((leader) => (
              <div key={leader.id} className="leader-card reveal">
                <div
                  className="leader-visual"
                  style={{ backgroundColor: leader.background }}
                >
                  <div className="leader-avatar">
                    {leader.photo ? (
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        className="leader-photo-img"
                      />
                    ) : (
                      <svg viewBox="0 0 120 120" className="avatar-placeholder">
                        <circle
                          cx="60"
                          cy="60"
                          r="60"
                          fill="currentColor"
                          opacity="0.1"
                        />
                        <circle
                          cx="60"
                          cy="40"
                          r="20"
                          fill="currentColor"
                          opacity="0.2"
                        />
                        <ellipse
                          cx="60"
                          cy="85"
                          rx="30"
                          ry="25"
                          fill="currentColor"
                          opacity="0.2"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="leader-content">
                  <h3>{leader.name}</h3>
                  <p className="leader-role">{leader.role}</p>
                  <p className="leader-bio">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Grid Section */}
        <div className="team-grid-section">
          <h3 className="team-subsection-title">Core Team</h3>
          <div className="team-grid reveal">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member-card">
                <div className="member-avatar-small">
                  <svg viewBox="0 0 100 100" className="avatar-small">
                    <circle
                      cx="50"
                      cy="50"
                      r="50"
                      fill="var(--primary-green)"
                      opacity="0.1"
                    />
                    <circle
                      cx="50"
                      cy="35"
                      r="16"
                      fill="var(--primary-green)"
                      opacity="0.15"
                    />
                    <ellipse
                      cx="50"
                      cy="70"
                      rx="25"
                      ry="20"
                      fill="var(--primary-green)"
                      opacity="0.15"
                    />
                  </svg>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-qual">{member.qualification}</p>
                  <p className="member-exp">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="team-values reveal">
          <div className="values-header">
            <h3>What drives our team</h3>
          </div>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="var(--primary-green)"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 24L22 30L32 18"
                    stroke="var(--primary-green)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4>Farmer-First Approach</h4>
              <p>
                Every decision centers on farmer needs and sustainable
                livelihoods
              </p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="var(--primary-green)"
                    strokeWidth="2"
                  />
                  <path
                    d="M24 14V34M14 24H34"
                    stroke="var(--primary-green)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="8"
                    stroke="var(--primary-green)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4>Holistic Impact</h4>
              <p>Balancing society, environment, and economic growth</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="var(--primary-green)"
                    strokeWidth="2"
                  />
                  <path
                    d="M24 12C28.42 12 32 15.58 32 20C32 24.42 24 36 24 36C24 36 16 24.42 16 20C16 15.58 19.58 12 24 12Z"
                    stroke="var(--primary-green)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="20" r="2" fill="var(--primary-green)" />
                </svg>
              </div>
              <h4>Community Led</h4>
              <p>Co-creating solutions with local communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
