'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 2v20M5 8l7-6 7 6M5 16l7 6 7-6" />
            </svg>
            <h4>Sustainable Livelihoods</h4>
            <p>Diversified income opportunities for farming households.</p>
          </div>

          <div className="focus-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 22s8-4.5 8-11.8C20 5.5 16.4 2 12 2S4 5.5 4 10.2C4 17.5 12 22 12 22Z" />
              <path d="M12 15V9M9 12h6" />
            </svg>
            <h4>Natural &amp; Organic Farming</h4>
            <p>Regenerative practices that rebuild soil health.</p>
          </div>

          <div className="focus-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13Z" />
            </svg>
            <h4>Water, Sanitation &amp; Hygiene</h4>
            <p>Conservation-first WASH awareness in villages.</p>
          </div>

          <div className="focus-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="9" cy="8" r="3" />
              <circle cx="17" cy="9" r="2.4" />
              <path d="M3 21c0-4 3-6.5 6-6.5s6 2.5 6 6.5M15 21c0-3-1.6-5-3-6" />
            </svg>
            <h4>Women &amp; Youth Empowerment</h4>
            <p>Enterprise, leadership and skilling support.</p>
          </div>

          <div className="focus-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 2 3 6v2c0 8 4 11 9 14 5-3 9-6 9-14V6l-9-4Z" />
            </svg>
            <h4>Local Governance</h4>
            <p>Stronger, more accountable village institutions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
