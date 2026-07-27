'use client'

import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="cta-banner" id="cta">
      <div className="wrap">
        <div className="cta-inner">
          <div className="cta-text">
            <div className="eyebrow" style={{ color: 'var(--leaf-300)' }}>
              Get Involved
            </div>
            <h2>
              Building sustainable rural communities — together.
            </h2>
            <p>
              Join us as a partner, donor, volunteer, or ally. Every contribution
              helps a farming family restore its land and livelihood.
            </p>
          </div>
          <div className="cta-actions">
            <Link href="/programs" className="btn btn-primary">
              Explore Our Work
            </Link>
            <Link href="/get-involved" className="btn btn-ghost">
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
