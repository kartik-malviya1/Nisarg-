'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ExternalLink, Mail } from 'lucide-react'
import Link from 'next/link'

const partnerCategories = [
  {
    label: 'Technology & Training',
    partners: [
      {
        name: 'tanX Innovations',
        role: 'Technology & Training Partner',
        logo: '/Tanx logo.webp',
        website: 'https://www.tanxinnovations.com/',
        email: 'tanxinnovations@gmail.com',
        color: '#eb5823',
        description: 'tanX Innovations empowers rural communities with advanced digital literacy, technical training, and modern technical solutions for sustainable livelihood growth.',
      },
    ],
  },
  {
    label: 'Agriculture & Trade',
    partners: [
      {
        name: 'Solidaridad',
        role: 'Agriculture & Trade Partner',
        logo: '/Solidaridad logo.png',
        website: 'https://solidaridad.in/',
        email: 'info@solidaridad.in',
        color: '#ffcc00',
        description: 'Solidaridad is a global network organization working on sustainable, climate-resilient agriculture and fair trade practices to empower smallholder farming communities.',
      },
    ],
  },
  {
    label: 'Government Departments',
    partners: [
      {
        name: 'Department of Agriculture, MP',
        role: 'Soil Testing & Extension Coordination',
        logo: null,
        website: '#',
        email: 'agri.mp@gov.in',
        color: '#1e6b2e',
        description: 'Coordination on soil testing protocols, extension services, and farmer orientation across 8 districts of Madhya Pradesh.',
      },
      {
        name: 'ATMA — Agriculture Technology Management Agency',
        role: 'Farmer Training Support',
        logo: null,
        website: '#',
        email: 'atma@mp.gov.in',
        color: '#1e6b2e',
        description: 'Collaboration on Training of Trainers programmes, integrating regenerative agriculture into the existing ATMA extension network.',
      },
    ],
  },
  {
    label: 'CSR Partners',
    partners: [
      {
        name: 'CSR Partnership Opportunity',
        role: 'Corporate Social Responsibility',
        logo: null,
        website: '/get-involved',
        email: 'info@nisargfoundation.org',
        color: 'var(--primary-blue)',
        description: 'NISARG is 12A and 80G registered. CSR contributions qualify for tax benefits. We design custom programmes aligned with your CSR mandate and goals.',
      },
    ],
  },
  {
    label: 'Capacity Building',
    partners: [
      {
        name: 'FMSF — Financial Management Support Foundation',
        role: 'Governance & Capacity Building',
        logo: null,
        website: '#',
        email: 'fmsf@delhi.org',
        color: 'var(--water-600)',
        description: 'Collaborative capacity building on financial management, institutional accountability, and governance for civil society organisations.',
      },
    ],
  },
]

export function PartnersPage() {
  useScrollReveal()
  return (
    <section className="partners-page-section" id="partners-full">
      <div className="wrap">
        {partnerCategories.map((cat) => (
          <div key={cat.label} className="partner-category reveal">
            <h3 className="partner-cat-label">{cat.label}</h3>
            <div className="partner-row">
              {cat.partners.map((p) => (
                <div
                  key={p.name}
                  className="partner-card"
                  style={{ '--brand-color': p.color, '--brand-text': '#fff' } as React.CSSProperties}
                >
                  <div className="partner-card-header">
                    <div className="partner-logo-container">
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="partner-logo-img" />
                      ) : (
                        <div className="partner-logo-placeholder" style={{ background: p.color }}>
                          {p.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="partner-meta">
                      <h4 className="pname">{p.name}</h4>
                      <span className="prole">{p.role}</span>
                    </div>
                  </div>
                  <p className="partner-description">{p.description}</p>
                  <div className="partner-links">
                    <a href={p.website} target="_blank" rel="noopener noreferrer" className="partner-link-btn btn-website">
                      <ExternalLink size={16} />
                      <span>Visit Website</span>
                    </a>
                    <a href={`mailto:${p.email}`} className="partner-link-btn btn-email">
                      <Mail size={16} />
                      <span>Get in Touch</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="become-partner-cta reveal">
          <div className="bpc-inner">
            <div className="eyebrow" style={{ color: 'var(--leaf-300)' }}>Become a Partner</div>
            <h2>Let's design a programme together.</h2>
            <p>
              Whether you're a government body, NGO, corporate CSR team, or research institution —
              NISARG can co-design a programme that fits your mandate and creates measurable community impact.
            </p>
            <Link href="/get-involved" className="btn btn-primary">
              Start a Conversation →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
