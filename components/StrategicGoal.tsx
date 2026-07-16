'use client'

import { useScrollReveal, useCountAnimation } from '@/hooks/useScrollReveal'

export function StrategicGoal() {
  useScrollReveal()
  useCountAnimation()

  return (
    <section className="goal-band" id="goal">
      <div className="eyebrow">Strategic goal · 2026 – 2031</div>
      <div className="goal-number reveal">
        <span data-lakh-big="10">0</span>
      </div>
      <p className="goal-sub">
        farmers across India adopting sustainable agriculture — through natural
        farming, regenerative agriculture and organic value-chain development.
      </p>
      <div className="goal-meta">
        <div>
          <span className="stat-num" data-lakh="1">
            0
          </span>{' '}
          <span style={{ fontSize: '13px' }}>hectares</span>
          <div className="stat-label">
            of farmland brought under improved practice
          </div>
        </div>
        <div>
          <span className="stat-num">2026–31</span>
          <div className="stat-label">Five-year scale-up window</div>
        </div>
        <div>
          <span className="stat-num">Multi-state</span>
          <div className="stat-label">Expansion beyond Madhya Pradesh</div>
        </div>
      </div>
    </section>
  )
}
