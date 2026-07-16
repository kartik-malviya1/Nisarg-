'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Impact() {
  useScrollReveal()
  return (
    <section className="impact" id="impact">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow" style={{ color: 'var(--turmeric-300)' }}>
            Our impact
          </div>
          <h2 style={{ color: 'var(--husk-50)' }}>
            Measurable outcomes across communities.
          </h2>
          <p style={{ color: 'var(--husk-100)' }}>
            Since our inception, we&apos;ve worked directly with thousands of
            farming families and village institutions.
          </p>
        </div>

        <div className="reveal">
          <div className="impact-grid">
            <div className="impact-cell">
              <span className="stat-num">800+</span>
              <div className="stat-label">Farmers Engaged</div>
            </div>
            <div className="impact-cell">
              <span className="stat-num">8</span>
              <div className="stat-label">Districts Active</div>
            </div>
            <div className="impact-cell">
              <span className="stat-num">45K</span>
              <div className="stat-label">Hectares Covered</div>
            </div>
            <div className="impact-cell">
              <span className="stat-num">2026–31</span>
              <div className="stat-label">10L Farmer Target</div>
            </div>
          </div>

          <div className="impact-tags">
            <span>Soil Health</span>
            <span>Livelihoods</span>
            <span>Water Conservation</span>
            <span>Women Empowerment</span>
            <span>Youth Training</span>
            <span>Governance</span>
          </div>
        </div>
      </div>
    </section>
  )
}
