'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Coins, Sprout, Droplet, Users, Landmark } from 'lucide-react'

export function FocusAreas() {
  useScrollReveal()
  return (
    <section className="about-bg" id="focus" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Core focus areas</div>
          <h2>Five levers, one rural economy.</h2>
          <p>
            Every programme NISARG runs sits under one of these five pillars —
            chosen because none of them work in isolation.
          </p>
        </div>

        <div className="focus-grid reveal-stagger">
          <div className="focus-item">
            <Coins strokeWidth={1.6} />
            <h4>Sustainable Livelihoods</h4>
            <p>Diversified income opportunities for farming households.</p>
          </div>

          <div className="focus-item">
            <Sprout strokeWidth={1.6} />
            <h4>Natural &amp; Organic Farming</h4>
            <p>Regenerative practices that rebuild soil health.</p>
          </div>

          <div className="focus-item">
            <Droplet strokeWidth={1.6} />
            <h4>Water, Sanitation &amp; Hygiene</h4>
            <p>Conservation-first WASH awareness in villages.</p>
          </div>

          <div className="focus-item">
            <Users strokeWidth={1.6} />
            <h4>Women &amp; Youth Empowerment</h4>
            <p>Enterprise, leadership and skilling support.</p>
          </div>

          <div className="focus-item">
            <Landmark strokeWidth={1.6} />
            <h4>Local Governance</h4>
            <p>Stronger, more accountable village institutions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

