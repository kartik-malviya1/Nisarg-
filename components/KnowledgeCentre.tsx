'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const categories = ['All', 'Articles', 'Research', 'Publications', 'Toolkits', 'Policy Briefs']

const resources = [
  {
    cat: 'Articles',
    icon: '📄',
    title: 'Introduction to Regenerative Agriculture for Smallholder Farmers',
    desc: 'A practical guide covering soil biology, bio-input preparation, and transition planning for farmers moving away from chemical inputs.',
    date: 'Jan 2026',
    downloadable: false,
  },
  {
    cat: 'Toolkits',
    icon: '🔧',
    title: 'Soil Testing Field Guide — Sampling & Report Interpretation',
    desc: 'Step-by-step illustrated guide for collecting soil samples, understanding laboratory results, and making input decisions.',
    date: 'May 2025',
    downloadable: true,
  },
  {
    cat: 'Research',
    icon: '🔬',
    title: 'Comparative Study: Chemical vs. Natural Farming — Input Costs & Yield',
    desc: 'Field research from Sehore district comparing input costs, yield, and soil organic matter across conventional and natural farming plots.',
    date: 'Mar 2026',
    downloadable: false,
  },
  {
    cat: 'Publications',
    icon: '📚',
    title: 'NISARG Annual Report 2025–26',
    desc: 'Comprehensive report covering NISARG\'s programmes, financial summary, impact data, and future roadmap for 2026–27.',
    date: 'Apr 2026',
    downloadable: true,
  },
  {
    cat: 'Policy Briefs',
    icon: '📋',
    title: 'Policy Brief: Integrating Natural Farming into ATMA Extension Services',
    desc: 'Recommendations for incorporating regenerative agriculture training into existing Agriculture Technology Management Agency programmes.',
    date: 'Feb 2026',
    downloadable: true,
  },
  {
    cat: 'Toolkits',
    icon: '🔧',
    title: 'Women Enterprise Development Toolkit — SHG to Market',
    desc: 'Complete toolkit for SHG facilitators covering product development, packaging standards, pricing, and market linkage strategies.',
    date: 'Mar 2026',
    downloadable: true,
  },
  {
    cat: 'Articles',
    icon: '📄',
    title: 'WASH in Rural Communities: Lessons from Sehore',
    desc: 'Field observations on community-led water conservation, hygiene behaviour change, and rainwater harvesting practices.',
    date: 'Dec 2025',
    downloadable: false,
  },
  {
    cat: 'Research',
    icon: '🔬',
    title: 'FPO Governance Framework: What Works for Small Collectives',
    desc: 'Research on governance structures, financial management, and democratic participation in small-scale Farmer Producer Organisations.',
    date: 'Nov 2025',
    downloadable: false,
  },
]

export function KnowledgeCentre() {
  useScrollReveal()
  const [active, setActive] = useState('All')

  const displayed = active === 'All' ? resources : resources.filter(r => r.cat === active)

  return (
    <section className="knowledge-section" id="knowledge">
      <div className="wrap">
        <div className="filter-row reveal" style={{ justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="kc-grid reveal-stagger">
          {displayed.map((item, i) => (
            <div key={i} className="kc-card">
              <div className="kc-icon">{item.icon}</div>
              <span className="kc-cat">{item.cat}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <div className="kc-footer">
                <span className="kc-date">{item.date}</span>
                {item.downloadable ? (
                  <a href="/resources" className="kc-dl-btn">
                    ↓ Download
                  </a>
                ) : (
                  <span className="kc-read-btn">Read →</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="kc-cta reveal" style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '20px' }}>
            Want to collaborate on research or contribute knowledge resources?
          </p>
          <a href="/contact" className="btn btn-dark">
            Reach Out →
          </a>
        </div>
      </div>
    </section>
  )
}
