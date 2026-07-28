"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, ExternalLink } from "lucide-react";

export function Partners() {
  useScrollReveal();

  const partners = [
    {
      id: 2,
      name: "tanX Innovations",
      role: "Technology & Training Partner",
      logo: "/Tanx logo.webp",
      website: "https://www.tanxinnovations.com/",
      email: "tanxinnovations@gmail.com",
      color: "#eb5823",
      textColor: "#ffffff",
      description:
        "tanX Innovations empowers rural communities with advanced digital literacy, technical training, and modern technical solutions for sustainable livelihood growth.",
    },
  ];

  return (
    <section className="partners" id="partners">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Partners</div>
          <h2>Working together for scale.</h2>
          <p>
            NISARG collaborates with like-minded organizations, research
            institutions, and platforms to strengthen our programmes and expand
            our reach.
          </p>
        </div>

        <div className="partner-row">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="partner-card reveal"
              style={
                {
                  "--brand-color": partner.color,
                  "--brand-text": partner.textColor,
                } as React.CSSProperties
              }
            >
              <div className="partner-card-header">
                <div className="partner-logo-container">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="partner-logo-img"
                  />
                </div>
                <div className="partner-meta">
                  <h3 className="pname">{partner.name}</h3>
                  <span className="prole">{partner.role}</span>
                </div>
              </div>

              <p className="partner-description">{partner.description}</p>

              <div className="partner-links">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-link-btn btn-website"
                >
                  <ExternalLink size={16} />
                  <span>Visit Website</span>
                </a>
                <a
                  href={`mailto:${partner.email}`}
                  className="partner-link-btn btn-email"
                >
                  <Mail size={16} />
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
